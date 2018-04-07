package com.ace.acemanager.service.authority;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.authority.AuthorityMapper;
import com.ace.acemanager.pojo.Authority;

@Service
public class AuthorityServiceImpl implements AuthorityService {
	@Resource
	private AuthorityMapper authorityMapper;
	
	@Override
	public int selectByQuery(Authority ahtority) throws Exception {
		
		return authorityMapper.selectByQuery(ahtority);
	}

	@Override
	public int deleteByPrimaryKey(Integer id) throws Exception {
		
		return authorityMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(Authority record) throws Exception {
		
		return authorityMapper.insert(record);
	}

	@Override
	public int insertSelective(Authority record) throws Exception {
		
		return authorityMapper.insertSelective(record);
	}

	@Override
	public Authority selectByPrimaryKey(Integer id) throws Exception {
		
		return authorityMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(Authority record) throws Exception {
		
		return authorityMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(Authority record) throws Exception {
		
		return authorityMapper.updateByPrimaryKey(record);
	}

	@Override
	public int deleteByRoleId(Integer roleId) throws Exception {
		return authorityMapper.deleteByRoleId(roleId);
	}

	@Override
	public int inserts(List<Authority> list) throws Exception {
		// TODO Auto-generated method stub
		return authorityMapper.inserts(list);
	}

	@Override
	public int countRoleFunc(Authority authority) throws Exception {
		// TODO Auto-generated method stub
		return authorityMapper.countRoleFunc(authority);
	}

}
