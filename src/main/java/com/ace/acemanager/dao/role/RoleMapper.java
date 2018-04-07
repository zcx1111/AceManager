package com.ace.acemanager.dao.role;

import java.util.List;

import com.ace.acemanager.pojo.Role;
import com.ace.acemanager.pojo.User;

public interface RoleMapper {
	
	/**
	 * role表中的下一个值
	 * @return
	 * @throws Exception
	 */
	int nextNum()throws Exception;
	
	/**
	 * 根据主账号id查询角色列表  (create_by = 0 or id)
	 * @param user
	 * @return
	 */
	List<Role> getRoles(User user) throws Exception;
	
    int deleteByPrimaryKey(Integer id)throws Exception;

    int insert(Role record)throws Exception;

    int insertSelective(Role record)throws Exception;

    Role selectByPrimaryKey(Integer id)throws Exception;

    int updateByPrimaryKeySelective(Role record)throws Exception;

    int updateByPrimaryKey(Role record)throws Exception;
}