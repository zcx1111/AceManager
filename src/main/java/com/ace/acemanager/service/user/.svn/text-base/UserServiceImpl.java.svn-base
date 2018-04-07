package com.ace.acemanager.service.user;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.rental.basic.RentalHouseMapper;
import com.ace.acemanager.dao.user.UserMapper;
import com.ace.acemanager.pojo.User;


/**
 * @author Muqiye
 * @version 1.0
 * @since 2017.7.16
 */
@Service
public class UserServiceImpl implements UserService {
	
	@Resource
	private UserMapper userMapper;
	@Resource
	private RentalHouseMapper rentalHouseMapper;
	@Override
	public User getLoginUser(User User) throws Exception {
		return userMapper.getLoginUser(User);
	}

	@Override
	public User selectByPrimaryKey(Integer id) throws Exception {
		return userMapper.selectByPrimaryKey(id);
	}

	@Override
	public int deleteByPrimaryKey(Integer id) throws Exception {
		return userMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(User record) throws Exception {
		return userMapper.insert(record);
	}

	@Override
	public int insertSelective(User record) throws Exception {
		
		return userMapper.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelective(User record) throws Exception {
		
		return userMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(User record) throws Exception {
		
		return userMapper.updateByPrimaryKey(record);
	}

	@Override
	public int count(Integer parentId) throws Exception {
		
		return userMapper.count(parentId);
	}

	@Override
	public List<User> getUsersByParentId(Integer parentId) throws Exception {
		
		List<User> list =userMapper.getUsersByParentId(parentId);
		if(list != null){
			for(int i=0;i<list.size();i++){
				int count = rentalHouseMapper.getHouseListByUserId(list.get(i).getId()).size();
				list.get(i).setHouseCount(count);
			}
		}
		return list;
	}

	@Override
	public int usernameIsExist(User user) throws Exception {
		
		return userMapper.usernameIsExist(user);
	}

	@Override
	public User getUserBySub(User user) throws Exception {
		return userMapper.getUserBySub(user);
	}

	@Override
	public List<User> getOrderUsers(User user) throws Exception {
		
		return userMapper.getOrderUsers(user);
	}

	@Override
	public User getUserByName(String username) throws Exception {
		
		return userMapper.getUserByName(username);
	}

	/*@Override
	public String getRole(String username) throws Exception {
		
		return userMapper.getRole(username);
	}*/

	@Override
	public Set<String> getFunctions(String username) throws Exception {
		
		return userMapper.getFunctions(username);
	}

	@Override
	public int countRole(Integer roleId) throws Exception {
		return userMapper.countRole(roleId);
	}

	@Override
	public User gerUserAllInfoById(Integer id) {
		User user=null;
		try {
			user = userMapper.selectByPrimaryKey(id);
			int count = rentalHouseMapper.getHouseListByUserId(id).size();
			user.setHouseCount(count);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}
	
	
	
}
