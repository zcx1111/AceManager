package com.ace.acemanager.controller;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ace.acemanager.common.Constants;
import com.ace.acemanager.common.PageSupport;
import com.ace.acemanager.pojo.RentalCommunity;
import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalRoom;
import com.ace.acemanager.pojo.User;
import com.ace.acemanager.service.rental.RentalBasicService;
import com.alibaba.fastjson.JSON;
/**
 * 租务基础业务Controller
 * @author Liuqi
 * 2017-7-11
 */
@Controller
@RequestMapping("/rentalBasic")
public class RentalBasicController extends BaseController {
	private Logger logger = Logger.getLogger(RentalBasicController.class);

	@Resource
	private RentalBasicService rentalBasicService;

	/**
	 * 进入租务版块首页 
	 */
	@RequestMapping("/rentalIndex.html")
	public String rentalIndex() {
		if (null == this.getCurrentUser()) {
			return "redirect:/";
		}
		return "rental/rental";
	}

	/**
	 *  查询指定用户下的房源所涉及到的小区列表
	 * @return
	 */
	@RequestMapping(value = "/communityList.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object getCommunityList(String prov, String city) {
		User loginUser = this.getCurrentUser();
		if (null != loginUser) {//当前用户存在
			try {
				logger.debug("当前登录用户===>" + loginUser.getId() + "\t" + loginUser.getUsername());
				RentalCommunity community = new RentalCommunity();
				community.setUserId(loginUser.getId());
				//省市动态查询条件
				if ("不限".equals(prov) && "不限".equals(city)) {//查全部
					community.setProvince(null);
					community.setCity(null);
				} else {
					community.setProvince(prov);
					community.setCity(city);
				}
				//获取所有小区列表
				List<RentalCommunity> communityList = rentalBasicService.getCommunityListByUserId(community);
				//返回小区列表json串
				String communityListJsonStr = JSON.toJSONStringWithDateFormat(communityList, "yyyy-MM-dd HH:mm:ss");
				logger.debug("小区列表JSON===>" + communityListJsonStr);
				return communityListJsonStr;
			} catch (Exception e) {
				e.printStackTrace();
				return "failed";
			}
		} else {
			return "noLogin";
		}
	}

	/**
	 * 获取指定小区下的房源列表
	 * @param communityId
	 * @return
	 */
	@RequestMapping(value = "/houseList.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object getHouseList(Integer communityId) {
		logger.debug("小区ID====>" + communityId);
		String houseListJsonStr = "";
		User loginUser = this.getCurrentUser();
		if (null != loginUser && null != communityId) {
			//当前登录用户id
			Integer userId = loginUser.getId();
			//根据该小区下的房源列表
			List<RentalHouse> houseList = new ArrayList<RentalHouse>();
			try {
				houseList = rentalBasicService.getHouseListByCommunityIdAndUserId(userId, communityId);
				houseListJsonStr = JSON.toJSONStringWithDateFormat(houseList, "yyyy-MM-dd HH:mm:ss");
				logger.debug("房源列表JSON====>" + houseListJsonStr);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			houseListJsonStr = "noData";
		}
		return houseListJsonStr;
	}

	/**
	 * 根据房源Id获取其下房间列表
	 * @param houseId
	 * @return
	 */
	@RequestMapping(value = "/getRoomsByHouseId.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object getRoomsByHouseId(Integer houseId, Integer currPageNo, String roomStatus) {
		logger.debug("房源ID====>" + houseId + "当前页===>" + currPageNo + "所查询房间状态===>" + roomStatus);
		PageSupport pageSupport = new PageSupport();
		RentalRoom room = new RentalRoom();
		String resultJsonStr = "";
		try {
			if (null != houseId) {
				room.setHouseId(houseId);

				//房间状态动态查询
				if ("全部".equals(roomStatus)) {
					room.setStatus(null);
				} else {
					room.setStatus(roomStatus);
				}

				Integer totalCount = rentalBasicService.count(room);
				//根据条件设置分页参数
				pageSupport.setTotalCount(totalCount);
				pageSupport.setCurrPageNo(currPageNo);

				room.setStartNum((pageSupport.getCurrPageNo() - 1) * pageSupport.getPageSize());
				room.setPageSize(pageSupport.getPageSize());

				//查询
				List<RentalRoom> result = rentalBasicService.getRoomsByHouseId(room);
				if (null != result) {
					//遍历房间,设置每个房间的温馨提示
					for (RentalRoom r : result) {
						rentalBasicService.addTipsForRoom(r);
						rentalBasicService.setFirstPayingBillIdForRoom(r);
					}
					pageSupport.setItems(result);
					resultJsonStr = JSON.toJSONStringWithDateFormat(pageSupport, "yyyy-MM-dd HH:mm:ss");
					logger.debug("分页组件信息JSON串====>" + resultJsonStr);
				} else {
					pageSupport.setItems(null);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJsonStr;
	}
	/**
	 * 根据房源ID查询房源详情
	 * @param communityId
	 * @return
	 * XXX 请勿轻易修改
	 */
	@RequestMapping(value = "/getHouseDetailByHouseId.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object getHouseDetailByHouseId(Integer houseId) {
		logger.debug("房源ID====>" + houseId);
		String resultJsonStr = "";
		if (null != houseId) {
			RentalHouse house = new RentalHouse();
			house.setId(houseId);
			try {
				RentalHouse result = rentalBasicService.getHouseDetailByHouseId(house);
				resultJsonStr = JSON.toJSONStringWithDateFormat(result, "yyyy-MM-dd");
				logger.debug("根据houseId查询的房源详情JSON串===>" + resultJsonStr);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return resultJsonStr;
	}

	/**
	 * 查询指定房源下的在租房间数
	 * @param houseId
	 * @return
	 */
	@RequestMapping(value = "/getOnrentRoomCount.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object getOnrentRoomCount(Integer houseId) {
		Integer roomCount = null;
		RentalHouse house = new RentalHouse();
		house.setId(houseId);
		try {
			roomCount = rentalBasicService.getOnrentRoomCount(house);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return roomCount.toString();
	}

	/**
	 * 增加房源
	 * TODO 还有一个逻辑未处理：增加一个房源时，所录入相同的小区名称或地址，不会重新再新建一个小区
	 * 		而是将这个房源并入到已存在的小区下。
	 * @param house
	 * @return
	 */
	@RequestMapping(value = "/addHouse.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object addHouse(RentalHouse house) {
		//当前登陆用户
		User loginUser = this.getCurrentUser();
		//设置房源的创建者
		house.setCreateUserId(loginUser.getId());
		//设置房源的管理者(当前用户的主账号)
		if (loginUser.getParentId() == 0) {//当前用户是主账号
			house.setManagerUserId(loginUser.getId());
		} else {//当前用户为子账号
			house.setManagerUserId(loginUser.getParentId());
		}
		try {

			return rentalBasicService.aceAddHouse(house);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "failed";
	}

	/**
	 * 修改房源
	 * @param house
	 * @return
	 */
	@RequestMapping(value = "/updateHouse.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object updateHouse(RentalHouse house) {
		try {
			if (rentalBasicService.aceUpdateHouse(house)) {
				return "success";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "failed";
	}

	/**
	 * 根据房源Id获取房间列表信息
	 * @param house
	 * @return
	 */
	@RequestMapping(value = "/getRoomsForRoomInfo.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object getRoomsForRoomInfo(Integer houseId) {
		String resultJsonStr = "";
		if (null != houseId) {
			RentalHouse house = new RentalHouse();
			house.setId(houseId);
			try {
				List<RentalRoom> roomsList = rentalBasicService.getRoomsForRoomInfo(house);
				resultJsonStr = JSON.toJSONStringWithDateFormat(roomsList, "yyyy-MM-dd HH:mm:ss");
				logger.debug("根据房源Id获取房间列表信息JSON串===>" + resultJsonStr);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return resultJsonStr;
	}

	/**
	 * 增加房间
	 * @param houseId
	 * @return
	 */
	@RequestMapping(value = "/addRoomForHouse.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object addRoomForHouse(Integer houseId) {
		String resultJsonStr = "failed";
		if (null != houseId) {
			RentalRoom room = new RentalRoom();
			room.setHouseId(houseId);
			try {
				//增加
				rentalBasicService.aceAddRoomForHouse(room);
				resultJsonStr = "success";
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return resultJsonStr;
	}

	/**
	 * 根据房间Id获取指定房间详情
	 * @param roomId
	 * @return
	 */
	@RequestMapping(value = "/getRoomDetailByRoomId.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object getRoomDetailByRoomId(Integer roomId) {
		logger.debug("所查询的房间ID===>" + roomId);
		String resultJsonStr = "failed";
		if (null != roomId) {
			RentalRoom roomDetail;
			try {
				roomDetail = rentalBasicService.getRoomDetailByRoomId(roomId);
				resultJsonStr = JSON.toJSONStringWithDateFormat(roomDetail, "yyyy-MM-dd HH:mm:ss");
				logger.debug(roomId + " 号房间详情JSON串===>" + resultJsonStr);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return resultJsonStr;
	}

	/**
	 * 停用房源
	 * @param houseId
	 * @return
	 */
	@RequestMapping(value = "/disableHouseByHouseId.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object disableHouseByHouseId(Integer houseId) {
		String resultJsonStr = "failed";
		try {
			if (rentalBasicService.canDisableHouse(houseId) && rentalBasicService.aceDisableHouse(houseId)) {
				resultJsonStr = "success";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJsonStr;
	}

	/**
	 * 启用房源
	 * @param houseId
	 * @return
	 */
	@RequestMapping(value = "/ableHouseByHouseId.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object ableHouseByHouseId(Integer houseId) {
		String resultJsonStr = "failed";
		try {
			if (rentalBasicService.aceAbleHouse(houseId)) {
				resultJsonStr = "success";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJsonStr;
	}

	/**
	 * 删除房源
	 * @param houseId
	 * @return
	 */
	@RequestMapping(value = "/deleteHouseByHouseId.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object deleteHouseByHouseId(Integer houseId) {
		String resultJsonStr = "failed";
		try {
			String reason = rentalBasicService.canDeleteHouse(houseId);
			if ("allowed_del_House".equals(reason)) {
				//满足删除房源的条件,执行删除
				if (rentalBasicService.aceDeleteHouse(houseId)) {
					resultJsonStr = "success";
				}
			} else {
				//返回不能删除的理由
				resultJsonStr = reason;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJsonStr;
	}

	/**
	 * 删除房间
	 * @param houseId
	 * @return
	 */
	@RequestMapping(value = "/deleteRoomByRoomId.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object deleteRoomByRoomId(Integer roomId) {
		String resultJsonStr = "failed";
		try {
			if (rentalBasicService.canDeleteRoom(roomId)) {
				//满足删除房间的条件,删除房间
				rentalBasicService.aceDeleteRoom(roomId);
				resultJsonStr = "success";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJsonStr;
	}

	/**
	 * 根据房间Id更新房间信息
	 * @param room
	 * @return
	 */
	@RequestMapping(value = "/modifyRoomByRoomId.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object modifyRoomByRoomId(RentalRoom room) {
		String resultJsonStr = "failed";
		room.setModifiedTime(new Date());
		try {
			if (rentalBasicService.modifyRoomByRoomId(room)) {
				resultJsonStr = "success";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJsonStr;
	}

	/**
	 * 动态获取存在小区所涉及的省市级联
	 * @return
	 */
	@RequestMapping(value = "/getProAndCityCascade.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object getProAndCityCascade() {
		String resultJsonStr = "failed";
		try {
			resultJsonStr = rentalBasicService.getProAndCityCascade(this.getCurrentUser());
			logger.debug("省市级联JSON===>" + resultJsonStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJsonStr;
	}

	@RequestMapping(value = "/getDifferentStatusRoomCount.html", produces = "text/html;charset=UTF-8")
	@ResponseBody
	public Object getDifferentStatusRoomCount() {
		String resultJsonStr = "failed";
		Integer userId = getCurrentUser().getId();
		try {
			Integer rentedCount = rentalBasicService.getRoomCountByRoomStatus(Constants.RENTAL_ROOM_STATUS_RENTED, userId);
			Integer stopUseCount = rentalBasicService.getRoomCountByRoomStatus(Constants.RENTAL_ROOM_STATUS_STOPUSE, userId);
			Integer emptyCount = rentalBasicService.getRoomCountByRoomStatus(Constants.RENTAL_ROOM_STATUS_EMPTY, userId);
			Integer totalCount = rentedCount + stopUseCount + emptyCount;
			resultJsonStr = "{\"totalCount\":\"" + totalCount + "\",\"rentedCount\":\"" + rentedCount + "\",\"stopUseCount\":\"" + stopUseCount + "\",\"emptyCount\":\"" + emptyCount + "\"}";

			logger.debug("topbar各房间状态数JSON===>" + resultJsonStr);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return resultJsonStr;
	}

}
