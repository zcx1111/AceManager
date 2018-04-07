package com.ace.acemanager.controller;
import com.ace.acemanager.common.Constants;
import com.ace.acemanager.pojo.User;
import org.apache.log4j.Logger;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
/**
 * BaseController
 * @author bdqn_hl
 * @date 2014-3-1
 */
public class BaseController {
	@SuppressWarnings("unused")
	private Logger logger = Logger.getLogger(BaseController.class);

	//private AuthUser currentUser;

	/**
	 * 获取session中的当前用户
	 * @return
	 */
	public User getCurrentUser() {
		/**
		 *FIXME Session bug待修复
		 */
		/*if (null == this.currentUser) {
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
			HttpSession session = request.getSession(false);
			if (null != session) {
				currentUser = (AuthUser) session.getAttribute(Constants.SESSION_USER);
			} else {
				currentUser = null;
			}
		}*/
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession(false);
		User currentUser;
		if (null != session) {
			currentUser = (User) session.getAttribute(Constants.SESSION_USER);
		} else {
			currentUser = null;
		}
		return currentUser;
	}

	/*public void setCurrentUser(AuthUser currentUser) {
		this.currentUser = currentUser;
	}*/

	/**
	 * SpringMVC处理日期
	 * @param dataBinder
	 */
	@InitBinder
	public void InitBinder(WebDataBinder dataBinder) {
		dataBinder.registerCustomEditor(Date.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String value) {
				try {
					setValue(new SimpleDateFormat("yyyy-MM-dd").parse(value));
				} catch (ParseException e) {
					setValue(null);
				}
			}
			@Override
			public String getAsText() {
				return new SimpleDateFormat("yyyy-MM-dd").format((Date) getValue());
			}
		});
	}

}
