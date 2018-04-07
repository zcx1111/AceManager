package com.ace.acemanager.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ace.acemanager.common.PageSupport;
import com.ace.acemanager.common.RedisAPI;
import com.ace.acemanager.pojo.Authority;
import com.ace.acemanager.pojo.CommunityHouse;
import com.ace.acemanager.pojo.Function;
import com.ace.acemanager.pojo.Menu;
import com.ace.acemanager.pojo.RentalCommunity;
import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalHouseUser;
import com.ace.acemanager.pojo.Role;
import com.ace.acemanager.pojo.RoleFunctions;
import com.ace.acemanager.pojo.User;
import com.ace.acemanager.service.authority.AuthorityService;
import com.ace.acemanager.service.function.FunctionService;
import com.ace.acemanager.service.rental.RentalBasicService;
import com.ace.acemanager.service.rental.RentalCommunityService;
import com.ace.acemanager.service.rental.RentalHouseService;
import com.ace.acemanager.service.rental.RentalHouseUserService;
import com.ace.acemanager.service.role.RoleService;
import com.ace.acemanager.service.user.UserService;
import com.alibaba.fastjson.JSON;
import com.mysql.jdbc.StringUtils;

@Controller
public class AuthorityController extends BaseController {
	private Logger logger = Logger.getLogger(LoginController.class);
	@Resource
	private UserService userService;
	@Resource
	private RoleService roleService;
	@Resource
	private FunctionService functionService;
	@Resource
	private RedisAPI redisAPI;
	@Resource
	private AuthorityService authorityService;
	@Resource
	private RentalBasicService rentalBasicService;
	@Resource
	private RentalCommunityService rentalCommunityService;
	@Resource
	private RentalHouseService rentalHouseService;
	@Resource
	private RentalHouseUserService rentalHouseUserService;
	@RequestMapping("/authority.html")
	public String index(Model model) {
		List<User> userList = null;
		List<Role> roleList = null;
		User user = this.getCurrentUser();
		if (null != user) {
			try {
				userList = userService.getUsersByParentId(user.getId());
				model.addAttribute("userList", userList);
				logger.debug("打印子账号信息" + userList.get(0).toString());
				roleList = roleService.getRoles(user);
				logger.debug("打印角色信息" + roleList.get(0).toString());
				model.addAttribute("roleList", roleList);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "authority/authority";
		}
		return "redirect:/";
	}

	// 获取菜单功能列表
	@RequestMapping(value = "/authority/getfuncs.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object functions(Integer roleId) {
		logger.debug("获取所有功能================》id=====:" + roleId);
		String result = "nodata";
		String key = "functionList";
		if (!redisAPI.exist(key)) {
			try {
				List<Function> fList = new ArrayList<Function>();
				for (int i = 2; i <= 6; i++) {
					Function func = this.recursiveTree(i);
					fList.add(func);
				}
				result = JSON.toJSONString(fList);
				redisAPI.set(key, result);
				logger.debug("第一次获取result=======" + result);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			result = redisAPI.get(key);
			logger.debug("functionList from redis" + result);
		}
		return result;
	}

	/**
	 * 递归获取所有子功能
	 * 
	 * @param id
	 * @return
	 */
	public Function recursiveTree(Integer id) {
		Function func = null;
		// 根据id获取节点对象
		try {
			func = functionService.selectByPrimaryKey(id);
			List<Function> childFuncs = functionService.getSubFuncList(func);
			for (Function f : childFuncs) {
				logger.debug("打印子功能================");
				logger.debug(f.toString());
				Function childf = recursiveTree(f.getId());
				func.getSubFuncs().add(childf);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return func;
	}

	@RequestMapping(value = "/authority/accountCreate.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object accountCreate(@RequestParam String mobile, @RequestParam String password, @RequestParam int user_type,
			@RequestParam String name, @RequestParam(required = false, value = "remark") String remark) {
		String result = "failed";
		User loginUser = this.getCurrentUser();

		if (loginUser != null) {
			String username = mobile + "@" ; 
			try {
				username += userService.selectByPrimaryKey(loginUser.getId()).getSuffix();
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			User createUser = new User();
			createUser.setUsername(username);
			createUser.setMobile(mobile);
			createUser.setPassword(password);
			createUser.setName(name);
			createUser.setParentId(loginUser.getId());
			createUser.setBrand(loginUser.getBrand());
			createUser.setCompany(loginUser.getCompany());
			createUser.setProvince(loginUser.getProvince());
			createUser.setCity(loginUser.getCity());
			createUser.setSuffix(loginUser.getSuffix());
			createUser.setRemark(remark);
			createUser.setUserType(user_type);
			switch (user_type) {
			case 1:
				createUser.setUserTypeName("员工");
				break;
			case 2:
				createUser.setUserTypeName("股东");
				break;
			case 3:
				createUser.setUserTypeName("合伙人");
				break;
			default:
				createUser.setUserTypeName("员工");
				break;
			}
			createUser.setCreateTime(new Date());
			createUser.setModifiedTime(new Date());

			try {
				userService.insertSelective(createUser);
				logger.debug("员工信息:" + createUser.toString());
				result = JSON.toJSONString(createUser);
				logger.debug("存入数据库的员工信息" + result);
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return result;
	}

	/**
	 * 根据页面传来的roleId和functionId查询是否有记录
	 * 
	 * @param roleId
	 * @param funcId
	 * @return
	 */
	@RequestMapping(value = "/authority/getAuthorityDefault.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object getAuthorityDefault(Integer roleId, Integer funcId) {
		logger.debug("getAuthorityDefault=========>roleId" + roleId + "=========funcId" + funcId);
		String result = "false";
		Authority auth = new Authority();
		auth.setRoleId(roleId);
		auth.setFunctionId(funcId);
		int flag = 0;
		try {
			flag = authorityService.selectByQuery(auth);
			if (flag > 0) {
				result = "success";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@RequestMapping(value = "/authority/delRole.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object delRole(Integer roleId) {
		String result = "failed";
		int count = 0;
		try {
			count = userService.countRole(roleId);
			if (count > 0) {
				result = "hasUser";// 该角色下有用户
			} else {// 没有用户删除权限表、角色表中数据
					// 批量删除权限表里所有roleid为n的数据
					// TODO 角色下没有任何功能
				authorityService.deleteByRoleId(roleId);
				// 删除角色表中数据
				if (roleService.deleteByPrimaryKey(roleId) > 0) {
					result = "success";
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@RequestMapping(value = "/authority/addRole.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object addRole(String[] ids, String roleName) {
		// List<String> idList = Arrays.asList(ids);
		User curUser = this.getCurrentUser();
		List<Authority> auths = new ArrayList<Authority>();
		String result = "nodata";
		if (curUser != null) {
			try {
				Role role = new Role();
				role.setRoleCode("role" + roleService.nextNum());
				role.setCreateBy(curUser.getId());
				role.setRoleName(roleName);
				role.setCreateTime(new Date());
				role.setModifiedTime(new Date());
				role.setStarted(1);
				if (roleService.insertSelective(role) <= 0) {
					result = "addRoleFailed";
				}
				// 概况
				Authority a = new Authority();
				a.setCreateBy(curUser.getUsername());
				a.setCreateTime(new Date());
				a.setModifiedTime(new Date());
				a.setFunctionId(1);
				a.setRoleId(role.getId());
				a.setUserTypeId(curUser.getUserType());
				authorityService.insertSelective(a);
				for (int i = 0; i < ids.length; i++) {
					Authority auth = new Authority();
					auth.setCreateBy(curUser.getUsername());
					auth.setCreateTime(new Date());
					auth.setModifiedTime(new Date());
					auth.setFunctionId(Integer.valueOf(ids[i]));
					auth.setRoleId(role.getId());
					auth.setUserTypeId(curUser.getUserType());
					auths.add(auth);
				}
				if (authorityService.inserts(auths) <= 0) {
					result = "addAuthFailed";
				} else {
					result = JSON.toJSONString(roleService.selectByPrimaryKey(role.getId()));

				}
				logger.debug(result);
				logger.debug("=============" + role.toString());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	@RequestMapping(value = "/authority/modRole.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object modRole(String[] ids, Integer roleId, String roleName) {
		String result = "failed";
		// 根据function id 和 roleId查询
		User curUser = this.getCurrentUser();
		try {
			Role record = new Role();
			record.setId(roleId);
			record.setRoleName(roleName);
			roleService.updateByPrimaryKeySelective(record);
			authorityService.deleteByRoleId(roleId);
			if (ids != null) {
				for (int i = 0; i < ids.length; i++) {
					Authority auth = new Authority();
					auth.setRoleId(roleId);
					auth.setFunctionId(Integer.valueOf(ids[i]));
					Authority a = new Authority();
					a.setCreateBy(curUser.getUsername());
					a.setCreateTime(new Date());
					a.setModifiedTime(new Date());
					a.setFunctionId(1);
					a.setRoleId(roleId);
					a.setUserTypeId(curUser.getUserType());
					authorityService.insertSelective(a);
					if (authorityService.countRoleFunc(auth) <= 0) {
						auth.setCreateBy(curUser.getUsername());
						auth.setCreateTime(new Date());
						auth.setModifiedTime(new Date());
						auth.setUserTypeId(curUser.getUserType());
						authorityService.insertSelective(auth);
					}
				}
			}

			// 修改redis缓存中旧信息
			if (redisAPI.exist("menuList" + roleId)) {
				List<Menu> menuList = new ArrayList<Menu>();
				Authority authority = new Authority();
				authority.setRoleId(roleId);
				List<Function> mList = functionService.getMainFunctionList(authority);
				// 主菜单不等于空
				if (mList != null) {
					for (Function function : mList) {
						Menu menu = new Menu();
						menu.setMainMenu(function);
						function.setRoleId(roleId);
						// 子菜单列表
						List<Function> subList = functionService.getSubFunctionList(function);
						if (null != subList) {
							menu.setSubMenus(subList);
						}
						menuList.add(menu);
					}
				}
				redisAPI.set("menuList" + roleId, JSON.toJSONString(mList));
			}
			result = "success";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@RequestMapping(value = "/authority/getRoleList.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object getRoleList() {
		String result = "nodata";
		try {
			List<Role> roles = roleService.getRoles(getCurrentUser());
			result = JSON.toJSONString(roles);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@RequestMapping(value = "/authority/allotRole.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object allotRole(Integer userId, Integer roleId) {
		String result = "failed";
		User user = new User();
		try {
			user.setId(userId);
			user.setRoleId(roleId);
			user.setRoleName(roleService.selectByPrimaryKey(roleId).getRoleName());
			userService.updateByPrimaryKeySelective(user);
			result = JSON.toJSONString(userService.selectByPrimaryKey(userId));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@RequestMapping(value = "/authority/houseManage.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object houseManage(Integer userId, Integer curPageNo, String communityName,String tag) {
		String result = "nodata";
		User curUser = this.getCurrentUser();
		RentalCommunity rc = new RentalCommunity();
		if(curPageNo==null){
			curPageNo =1;
		}
		if (StringUtils.isNullOrEmpty(communityName)) {
			rc.setCommunityName(null);
		} else {
			rc.setCommunityName(communityName);
		}
		rc.setUserId(curUser.getParentId()==0?curUser.getId():curUser.getParentId());
		int totalCount = rentalCommunityService.countCommunityListByPage(rc);
		PageSupport page = new PageSupport();
		page.setPageSize(10);
		page.setTotalCount(totalCount);
		page.setCurrPageNo(curPageNo);
		
		rc.setStartNum((page.getCurrPageNo() - 1) * page.getPageSize());
		rc.setPageSize(page.getPageSize());
		
		//List<CommunityHouse> chs = new ArrayList<CommunityHouse>();
		List<RentalCommunity> rcs = rentalCommunityService.getCommunityListByPage(rc);
		for (RentalCommunity rentalCommunity : rcs) {
				RentalHouse rh = new RentalHouse();
				rh.setCommunityId(rentalCommunity.getId());
				rh.setManagerUserId(curUser.getParentId()==0?curUser.getId():curUser.getParentId());
				List<RentalHouse> rentalHouses = rentalHouseService.getRentalHousesByCascade(rh);
				rentalCommunity.setRentalHouses(rentalHouses);
		}
		page.setItems(rcs);
		result = JSON.toJSONString(page);
		logger.debug("============>"+result);
		return result;
	}
	
	@RequestMapping(value = "/authority/houseChoose.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object houseChoose(Integer userId,Integer houseId){
		String result = "false";
		RentalHouseUser rentalHouseUser = new RentalHouseUser();
		rentalHouseUser.setHouseId(houseId);
		rentalHouseUser.setUserId(userId);
		int count = rentalHouseUserService.countByHIdAndUId(rentalHouseUser);
		if(count>0){
			result = "success";
		}
		return result;
	}
	@RequestMapping(value = "/authority/allotHouse.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object allotHouse(String allot,Integer userId){
		String result = "false";
		User curUser = this.getCurrentUser();
		if("allotAll".equals(allot)){
			//先删除该用户已分配的房源
			rentalHouseUserService.delRentalHouseByUserId(userId);
			//获取主账号下的所有房源
			List<RentalHouse> rentalHouses =rentalHouseService.getHouseListByUserId(curUser.getId());
			List<RentalHouseUser> rentalHouseUsers = new ArrayList<RentalHouseUser>();
			for(RentalHouse rentalHouse:rentalHouses){
				RentalHouseUser rHouseUser = new RentalHouseUser();
				rHouseUser.setHouseId(rentalHouse.getId());
				rHouseUser.setUserId(userId);
				rHouseUser.setCreateTime(new Date());
				rHouseUser.setModifiedTime(new Date());
				rentalHouseUsers.add(rHouseUser);
			}
			int count = rentalHouseUserService.insertsHU(rentalHouseUsers);
			if(count>0){
				result="success";
			}
		}else{
			rentalHouseUserService.delRentalHouseByUserId(userId);
			result="success";
		}
		return result;
	}
	
	@RequestMapping(value = "/authority/SingleAllotHouse.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object SingleAllotHouse(Integer houseId,Integer userId,String allot){
		String result = "false";
		RentalHouseUser rentalHouseUser = new RentalHouseUser();
		rentalHouseUser.setHouseId(houseId);
		rentalHouseUser.setUserId(userId);
		int count = rentalHouseUserService.countByHIdAndUId(rentalHouseUser);
		if("yes".equals(allot)){
			if(count<=0){
				rentalHouseUser.setCreateTime(new Date());
				rentalHouseUser.setModifiedTime(new Date());
				rentalHouseUserService.addHUR(rentalHouseUser);
				result = "success";
			}
		}else if("no".equals(allot)){
			if(count>0){
				rentalHouseUserService.delByUserAndHouseId(rentalHouseUser);
				result = "success";
			}
		}
		return result;
	}
	@RequestMapping(value = "/authority/hideAllotThis.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object hideAllotThis(Integer curPageNo,Integer userId,String communityName){
		String result = "false";
		
		return result;
	}
	@RequestMapping(value = "/authority/getHouseCount.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object getHouseCount(Integer userId){
		String result = "nodata";
		User user = userService.gerUserAllInfoById(userId);
		result = Integer.valueOf(user.getHouseCount()).toString();
		return result;
	}
	
	@RequestMapping(value = "/authority/hasSuffix.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object hasSuffix(){
		String result = "false";
		User curUser = this.getCurrentUser();
		if(curUser.getSuffix()!=null){
			result = curUser.getSuffix();
		}
		return result;
	}

}
