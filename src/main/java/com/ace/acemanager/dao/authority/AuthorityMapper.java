package com.ace.acemanager.dao.authority;

import java.util.List;

import com.ace.acemanager.pojo.Authority;

public interface AuthorityMapper {
	
	/**
	 * 根据roleId 与FunctionId查询是否有数据
	 * @param authority
	 * @return
	 * @throws Exception
	 */
	int countRoleFunc(Authority authority) throws Exception;
	
	/**
	 * 批量增加权限数据
	 * @param list
	 * @return
	 * @throws Exception
	 */
	int inserts(List<Authority> list)throws Exception;
	
	/**
	 * 根据roleid 和 functionId 查询条数
	 * @param roleId
	 * @param funcId
	 * @return
	 * @throws Exception
	 */
	int selectByQuery(Authority ahtority) throws Exception;
	
	/**
	 * 删除权限表中为该roleId的数据
	 * @param roleId
	 * @return
	 * @throws Exception
	 */
	int deleteByRoleId(Integer roleId) throws Exception;
	
    int deleteByPrimaryKey(Integer id)throws Exception;

    int insert(Authority record)throws Exception;

    int insertSelective(Authority record)throws Exception;

    Authority selectByPrimaryKey(Integer id)throws Exception;

    int updateByPrimaryKeySelective(Authority record)throws Exception;

    int updateByPrimaryKey(Authority record)throws Exception;
}