package com.ace.acemanager.dao.user;

import java.util.List;
import java.util.Set;

import com.ace.acemanager.pojo.User;

/**
 * @author Muqiye
 *@version1.0
 *@since 2017.7.16
 */
public interface UserMapper {
	
	/**
	 * 根据roleId查询用户数
	 * @param roleId
	 * @return
	 * @throws Exception
	 */
	int countRole(Integer roleId) throws Exception;
	
	/**
	 * 根据用户名获取角色名列表
	 * @param username
	 * @return
	 * @throws Exception
	 */
	//String getRole(String username) throws Exception;
	
	/**
	 * 根据用户名获取功能名列表
	 * @param username
	 * @return
	 * @throws Exception
	 */
	Set<String> getFunctions(String username) throws Exception;
	
	/**
	 * 根据登录用户名获取用户数据
	 * @param username
	 * @return
	 * @throws Exception
	 */
	User getUserByName(String username)throws Exception;
	
	
	/**
	 * 根据主账号id 和parent id = 主账号id 查询拥有分配权限的用户
	 * @param parentId
	 * @return
	 */
	List<User> getOrderUsers(User user)throws Exception;
	
	/**
	 * 根据子账号id查询父账号
	 * @param user
	 * @return
	 * @throws Exception
	 */
	User getUserBySub(User user)throws Exception;
	
	/**
	 * 获取用户列表
	 * @param id
	 * @return
	 * @throws Exception
	 */
	//List<User> getUsers(User User) throws Exception;
	
	/**
	 * 根据查询条件获取用户列表
	 * @param id
	 * @return
	 * @throws Exception
	 */
	//List<User> getUsersBySearch(User User) throws Exception;
	
	/**
	 * 根据登录账号+密码验证登录信息
	 * @param User
	 * @return
	 * @throws Exception
	 */
	User getLoginUser(User User) throws Exception;
	
	/**
	 * 根据主键id获取用户
	 * @param id
	 * @return
	 * @throws Exception
	 */
	User selectByPrimaryKey(Integer id)throws Exception;
	
	/**
	 * 根据主键id删除用户
	 * @param id
	 * @return
	 * @throws Exception
	 */
    int deleteByPrimaryKey(Integer id)throws Exception;
    
    /**
     * 新增用户
     * @param record
     * @return
     * @throws Exception
     */
    int insert(User record)throws Exception;
    
    /**
     * 严格新增用户
     * @param record
     * @return
     * @throws Exception
     */
    int insertSelective(User record)throws Exception;
    
    /**
     * 严格修改用户信息
     * @param record
     * @return
     * @throws Exception
     */
    int updateByPrimaryKeySelective(User record)throws Exception;
    
    /**
     * 修改用户信息
     */
    int updateByPrimaryKey(User record)throws Exception;
    
    /**
     * 主账号通过自身id 查询子账号的个数
     * @param parentId
     * @return
     * @throws Exception
     */
    int count(Integer parentId) throws Exception;
    
    /**
     * 主账号通过自身id 查询子账号列表
     * @param parentId
     * @return
     * @throws Exception
     */
    List<User> getUsersByParentId(Integer parentId) throws Exception;
    
    /**
     * 判断登录账号是否存在
     * @param User
     * @return
     * @throws Exception
     */
    int usernameIsExist(User user)  throws Exception;
}