package com.ace.acemanager.realm;

import java.util.Iterator;

import javax.annotation.Resource;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import com.ace.acemanager.pojo.User;
import com.ace.acemanager.service.user.UserService;

public class MyRealm extends AuthorizingRealm{
	
	@Resource
	private UserService userService;
	
	/**
	 * 为当前登录的用户授予角色和权限
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		String username = (String)principals.getPrimaryPrincipal();
		SimpleAuthorizationInfo aInfo = new SimpleAuthorizationInfo();
		//aInfo.setRoles(userService.getRoles(username));
		try {
			aInfo.setStringPermissions(userService.getFunctions(username));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return aInfo;
	}
	
	/**
	 * 验证当前登录的用户
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		String username = (String)token.getPrincipal();
		User user = null;
		try {
			 user = userService.getUserByName(username);
			 if(user != null){
				 AuthenticationInfo autInfo = new SimpleAuthenticationInfo(user.getUsername(),user.getPassword(),"ace");
				 return autInfo;
			 }
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}
	

}
