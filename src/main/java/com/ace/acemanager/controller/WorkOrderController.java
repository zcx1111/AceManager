package com.ace.acemanager.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ace.acemanager.common.ConcurrentUpdate;
import com.ace.acemanager.common.Constants;
import com.ace.acemanager.common.PageSupport;
import com.ace.acemanager.common.RedisAPI;
import com.ace.acemanager.pojo.User;
import com.ace.acemanager.pojo.WorkOrder;
import com.ace.acemanager.service.user.UserService;
import com.ace.acemanager.service.work.WorkOrderHistoryService;
import com.ace.acemanager.service.work.WorkOrderService;
import com.alibaba.fastjson.JSON;
import com.mysql.jdbc.StringUtils;

@Controller
@RequestMapping("/work")
public class WorkOrderController extends BaseController {

	Logger logger = Logger.getLogger(WorkOrderController.class);
	@Autowired
	public WorkOrderService orderService;
	@Autowired
	public WorkOrderHistoryService historyService;
	@Autowired
	public UserService userService;
	@Resource
	private RedisAPI redisAPI;
	@RequestMapping(value = "/delete/{id}", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String deleteOrder(@PathVariable int  id){
		String json="";
		try{
			historyService.deleteOrderHistory(id);
			orderService.deleteWorkOrder(id);
			json=JSON.toJSONString("success");
		}catch(Exception e){
			e.printStackTrace();
		}
		return json;
	}
	@RequestMapping(value = "/deal/{id}", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String dealOrder(@PathVariable int  id){
		User user = super.getCurrentUser();
		if(user==null){
			return "failed";
		}
		String json="";
		try{
			historyService.dealOrderHistory(super.getCurrentUser().getId(), id);
			orderService.dealWorkOrder(id);
			json=JSON.toJSONString("success");
		}catch(Exception e){
			e.printStackTrace();
		}
		return json;
	}
	
	//更改业务单进度
	@RequestMapping(value = "/status", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String statusOrder(WorkOrder order){
		User user = super.getCurrentUser();
		if(user==null){
			return "failed";
		}
		String json="";
		try{
		
			WorkOrder data =orderService.selectByPrimaryKey(order.getId());
			//nextId==null
	
			if(data.getNextId()==null){
					json="nonext";
				}
			//既不是主帐号，也不是下一个处理人，没有权限跟进
			 else if(Integer.valueOf(data.getOwnerId())!=Integer.valueOf( user.getId())
					 &&Integer.valueOf( data.getNextId())!=Integer.valueOf( user.getId())){
				json="notyou";
			}
			else{
			historyService.statusOrderHistory(order.getStatus().toString(), 
			order.getRemarks(), super.getCurrentUser().getId(), order.getId());
			orderService.statusWorkOrder(data,order,data.getNextId());
			json="success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return JSON.toJSONString(json);
	}
	
	@RequestMapping(value = "/distribution", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String distributionOrder(WorkOrder order) {
		String json = "";
		User user = super.getCurrentUser();
		if (user == null) {
			return "failed";
		}
		try {
			int orderId = order.getId();
			int userId = user.getId();
			WorkOrder name = orderService.selectByPrimaryKey(order.getId());
			if (name.getNextId() == order.getNextId()) {
				json = "isyou";
			} else {
				String before = "";
				if (name.getNextUser() != null) {
					before = name.getNextUser().getName();
				}
				String after = userService.selectByPrimaryKey(order.getNextId()).getName();
				historyService.distributionOrderHistory(before, after, userId, orderId);
				orderService.distributionWorkOrder(order);
				json = "success";
				String lock = orderId + "distribution";
				ConcurrentUpdate.deleteKey(lock);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}
	@RequestMapping(value = "/owner/{user}/{order}", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getUserList(@PathVariable("user") int userid,@PathVariable("order")int orderId, HttpServletResponse response){
		String json="";
		try {
			if (super.getCurrentUser() == null) {
				response.sendRedirect("/AceManager/login.html");
			} else {
				String lock = orderId + "distribution";
				if (ConcurrentUpdate.isUpdate(lock)) {
					User user = new User();
					user.setId(userid);
					user.setParentId(userid);	
					json=JSON.toJSONString(userService.getOrderUsers(user));
				} else {
					json=JSON.toJSONString("distributionlock");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}
	@RequestMapping(value = "/insert", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String insertOrder(WorkOrder order){
		User user = super.getCurrentUser();
		if(user==null){
			return "failed";
		}
		try {
			orderService.insertWorkOrder(order,user);
			historyService.insertOrderHistory(order, user.getId());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
	}
	//当编辑模态框关闭时清除lock
	@RequestMapping(value = "/unlock/{id}", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String unlock(@PathVariable("id") int id, HttpServletResponse response){
		String lock = id + "order";
		ConcurrentUpdate.deleteKey(lock);
		return null;
	}
	//当分配模态框框关闭时清除distributionlock
	@RequestMapping(value = "/unlockdistribution/{id}", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String unlockDistribution(@PathVariable("id") int id, HttpServletResponse response){
		String lock = id + "distribution";
		ConcurrentUpdate.deleteKey(lock);
		return null;
	}
	@RequestMapping(value = "/updateSearch/{id}", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String editSearch(@PathVariable("id") int id, HttpServletResponse response) {
		String json = "";
		try {
			if (super.getCurrentUser() == null) {
				response.sendRedirect("/AceManager/login.html");
			} else {
				String lock = id + "order";
				if (ConcurrentUpdate.isUpdate(lock)) {
					List<Object> jsonList = new ArrayList<Object>();
					jsonList.add(orderService.selectByPrimaryKey(id));
					jsonList.add(historyService.listOrderHistoryById(id));
					json = JSON.toJSONString(jsonList);
				} else {
					json=JSON.toJSONString("lock");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}
	@RequestMapping(value = "/update", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String updateOrder(WorkOrder order) {
		String json="1";
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			order.setBookTime(sdf.parse(order.getBookTimeStr()));
			WorkOrder compare = orderService.selectByPrimaryKey(order.getId());
			String id = order.getId() + "order";
			if (!compare.toString().equals(order.toString())){
				historyService.updateOrderHistroy(order, compare, super.getCurrentUser().getId());
				orderService.updateWorkOrder(order);
			}
			ConcurrentUpdate.deleteKey(id);
			json = "success";
		}catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}
	@RequestMapping(value = "/order/{id}", produces = "application/json; charset=utf-8")
	@ResponseBody
	public Object details(@PathVariable("id") int id, HttpServletResponse response) {
		String json = "";
		try {
			if (super.getCurrentUser() == null) {
				response.sendRedirect("/AceManager/login.html");
			} else {
				List<Object> jsonList = new ArrayList<Object>();
				jsonList.add(orderService.selectByPrimaryKey(id));
				jsonList.add(historyService.listOrderHistoryById(id));
				json = JSON.toJSONString(jsonList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}

	@RequestMapping(value = "/title", produces = "text/html; charset=utf-8")
	public ModelAndView list() {
		ModelAndView mav = new ModelAndView();
		User user = super.getCurrentUser();
		if (user == null) {
			mav.setViewName("login");
			return mav;
		} else {
			try {
				WorkOrder order = new WorkOrder();
				if (user.getParentId() == 0) {
					order.setOwnerId(user.getId());
				} else {
					order.setOwnerId(user.getParentId());
				}
				order.setTitle(1);
				order.setPageSize(Constants.ORDER_PAGESIZE);
				order.setStartNum(0);
				PageSupport ps = new PageSupport();
				ps.setCurrPageNo(1);
				ps.setPageSize(Constants.ORDER_PAGESIZE);
				ps.setTotalCount(orderService.countOrder(order));
				ps.setItems(orderService.listWorkOrder(order));
				ps.setCount(orderService.countOrderGroupBy(order));
				mav.addObject("page", ps);
				mav.setViewName("work/work");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return mav;
	}

	@RequestMapping(value = "/search", produces = "application/json; charset=utf-8")
	@ResponseBody
	public Object search(@RequestParam(value = "title") String title,
			@RequestParam(value = "source", required = false) String source,
			@RequestParam(value = "engency", required = false) String engency,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "start_time", required = false) Date start_time,
			@RequestParam(value = "end_time", required = false) Date end_time,
			@RequestParam(value = "searchStr", required = false) String searchStr,
			@RequestParam(value = "pageNo", defaultValue = "1", required = false) int pageNo,
			HttpServletResponse response) {
		String json = "";
		try {
			WorkOrder order = new WorkOrder();
			User user = super.getCurrentUser();
			if(user==null){
				response.sendRedirect("/AceManager/login.html");
			}
			if (user.getParentId() == 0) {
				order.setOwnerId(user.getId());
			} else {
				order.setOwnerId(user.getParentId());
			}
			if (!StringUtils.isNullOrEmpty(title))
				order.setTitle(Integer.parseInt(title));
			if (!StringUtils.isNullOrEmpty(source))
				order.setSource(Integer.parseInt(source));
			if (!StringUtils.isNullOrEmpty(engency))
				order.setEngency(Integer.parseInt(engency));
			if (!StringUtils.isNullOrEmpty(status))
				order.setStatus(Integer.parseInt(status));
			if (start_time != null)
				order.setStartTime(start_time);
			if (end_time != null)
				order.setEndTime(end_time);
			if (!StringUtils.isNullOrEmpty(searchStr))
				order.setSearchStr(searchStr);
			order.setPageSize(Constants.ORDER_PAGESIZE);
			order.setStartNum((pageNo - 1) * order.getPageSize());
			PageSupport ps = new PageSupport();
			ps.setCurrPageNo(pageNo);
			ps.setPageSize(Constants.ORDER_PAGESIZE);
			ps.setTotalCount(orderService.countOrder(order));
			ps.setCount(orderService.countOrderGroupBy(order));
			ps.setItems(orderService.listWorkOrder(order));
			json = JSON.toJSONString(ps);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}

	@RequestMapping(value = "", produces = "text/html; charset=utf-8")
	public ModelAndView redirect() {
		ModelAndView mav = new ModelAndView();
		if (super.getCurrentUser() == null) {
			mav.setViewName("login");
			return mav;
		}
		mav.setViewName("forward: work/title");
		return mav;
	}
}
