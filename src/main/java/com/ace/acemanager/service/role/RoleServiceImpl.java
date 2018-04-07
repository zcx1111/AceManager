package com.ace.acemanager.service.role;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.role.RoleMapper;
import com.ace.acemanager.pojo.Role;
import com.ace.acemanager.pojo.User;

@Service
public class RoleServiceImpl implements RoleService {

	@Resource
	private RoleMapper roleMapper;

	@Override
	public List<Role> getRoles(User user) throws Exception {
		return roleMapper.getRoles(user);
	}

	@Override
	public int deleteByPrimaryKey(Integer id) throws Exception {
		return roleMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(Role record) throws Exception {
		return roleMapper.insert(record);
	}

	@Override
	public int insertSelective(Role record) throws Exception {
		return roleMapper.insertSelective(record);
	}

	@Override
	public Role selectByPrimaryKey(Integer id) throws Exception {
		return roleMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(Role record) throws Exception {
		return roleMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(Role record) throws Exception {
		return roleMapper.updateByPrimaryKey(record);
	}

	@Override
	public int nextNum() throws Exception {
		// TODO Auto-generated method stub
		return roleMapper.nextNum();
	}

}
