package com.ace.acemanager.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ace.acemanager.pojo.User;
import com.ace.acemanager.service.user.UserService;
import com.alibaba.fastjson.JSON;

@Controller
public class UserController extends BaseController{
	@Resource
	private UserService  userService;
	
	/*@RequestMapping(value = "/general/accountSetting.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object accountSetting(){
		String result = "nodata";
		User 
		return result;
	}*/
	
	@RequestMapping(value = "/general/modMainAccount.html", produces = { "text/html;charset=UTF-8" })
	@ResponseBody
	public Object accountSetting(String user,HttpSession session){
		String result = "false";
		User u=JSON.parseObject(user, User.class);
		u.setId(this.getCurrentUser().getId());
		u.setModifiedTime(new Date());
		try {
			userService.updateByPrimaryKeySelective(u);
			result = "success";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	
}
