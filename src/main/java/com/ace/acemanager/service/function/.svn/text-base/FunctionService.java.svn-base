package com.ace.acemanager.service.function;

import java.util.List;

import com.ace.acemanager.pojo.Authority;
import com.ace.acemanager.pojo.Function;

public interface FunctionService {
	
	/**
	 * 授权查看页面获取一级功能列表
	 * @param function
	 * @return
	 * @throws Exception
	 */
	List<Function> getSubFuncList(Function function) throws Exception;
	
	/**
	 * 根据权限查找功能列表 roleId
	 * @param authority
	 * @return
	 * @throws Exception
	 */
	List<Function>  getMainFunctionList(Authority authority) throws Exception;
   
	/**
	 * 根据主菜单id获取子菜单
	 * @param function
	 * @return
	 * @throws Exception
	 */
	List<Function> getSubFunctionList(Function function) throws Exception;
	
	
	Function selectByPrimaryKey(Integer id)throws Exception;
	
}
