package com.ace.acemanager.service.work;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.work.WorkOrderHistoryMapper;
import com.ace.acemanager.dao.work.WorkOrderMapper;
import com.ace.acemanager.pojo.WorkOrder;
import com.ace.acemanager.pojo.WorkOrderHistory;
@Service("HistoryService")
public class WorkOrderHistroyServiceImpl implements WorkOrderHistoryService{
	@Autowired
	public WorkOrderHistoryMapper historyMapper;
	@Autowired
	public WorkOrderMapper orderMapper;
	@Override
	public void deleteOrderHistory(Integer orderId) throws Exception {
		historyMapper.deleteHistory(orderId);
	}
	@Override
	public void dealOrderHistory(Integer userId, Integer orderId) {
		WorkOrder data = orderMapper.selectByPrimaryKey(orderId);
		historyMapper.deleteDealHistory(orderId);
		WorkOrderHistory insert =new  WorkOrderHistory();
		insert.setOrderId(orderId);
		insert.setUserId(userId);
		insert.setOrderProperty("status");
		insert.setOrderBefore(this.getStatus(data.getStatus().toString()));
		insert.setOrderAfter("已签约");
		historyMapper.insertWorkOrderHistroy(insert);
	}
	@Override
	public void statusOrderHistory(String afterstatus, String remarks,Integer userId, Integer orderId)
			throws Exception {
		WorkOrderHistory insert =new  WorkOrderHistory();
		insert.setOrderId(orderId);
		insert.setUserId(userId);
		//备注
		WorkOrder data = orderMapper.selectByPrimaryKey(orderId);
		if(!data.getRemarks().equals(remarks)){
		insert.setOrderProperty("备注");
		insert.setOrderBefore(data.getRemarks());
		insert.setOrderAfter(remarks);
		insert.setUpdateTime(new Date());
		historyMapper.insertWorkOrderHistroy(insert);
		}
		if (afterstatus.equals("1")) {
			insert.setOrderProperty("status");
			insert.setOrderBefore("待分配");
			insert.setOrderAfter("待处理");
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}//跟进中的进度 
		else if (afterstatus.equals("3") || afterstatus.equals("4") || afterstatus.equals("5")) {
			insert.setOrderProperty("status");
			insert.setOrderBefore(this.getStatus(data.getStatus().toString()));
			insert.setOrderAfter(this.getStatus(afterstatus));
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		
		} 
		//放弃的进度
		else if (afterstatus.equals("100")) {
			insert.setOrderProperty("status");
			insert.setOrderBefore(this.getStatus(data.getStatus().toString()));
			insert.setOrderAfter("放弃");
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		} 
		//无效的进度
		else if (afterstatus.equals("6")) {
			insert.setOrderProperty("status");
			insert.setOrderBefore(this.getStatus(data.getStatus().toString()));
			insert.setOrderAfter(this.getStatus(afterstatus));
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
	}
	@Override
	public List<WorkOrderHistory> listOrderHistoryById(Integer id) {
		return historyMapper.listOrderHistory(id);
	}
	@Override
	public void insertOrderHistory(WorkOrder update,Integer userId) {
		WorkOrderHistory insert =new  WorkOrderHistory();
		insert.setOrderId(update.getId());
		insert.setOrderProperty("create");
		insert.setUserId(userId);
		insert.setOrderBefore("0");
		insert.setOrderAfter("1");
		insert.setUpdateTime(new Date());
		historyMapper.insertWorkOrderHistroy(insert);
	}
	@Override
	public void distributionOrderHistory(String beforename,String nextname,Integer userId,Integer orderId) {
		WorkOrderHistory insert = new WorkOrderHistory();
		insert.setOrderId(orderId);
		insert.setUserId(userId);
		insert.setOrderProperty("next");
		insert.setOrderBefore(beforename);
		insert.setOrderAfter(nextname);
		insert.setUpdateTime(new Date());
		historyMapper.insertWorkOrderHistroy(insert);
	}
	@Override
	public void updateOrderHistroy(WorkOrder update, WorkOrder data,Integer userId) {
		WorkOrderHistory insert =new  WorkOrderHistory();
		insert.setOrderId(update.getId());
		insert.setUserId(userId);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		if(!update.getCustomerName().equals(data.getCustomerName())){
			insert.setOrderProperty("客户姓名");
			insert.setOrderBefore(data.getCustomerName());
			insert.setOrderAfter(update.getCustomerName());
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!update.getCustomerGender().toString().equals(data.getCustomerGender().toString())){
			insert.setOrderProperty("性别");
			insert.setOrderBefore(this.getGender(data.getCustomerGender().toString()));
			insert.setOrderAfter(this.getGender(update.getCustomerGender().toString()));
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!update.getCustomerPhone().equals(data.getCustomerPhone())){
			insert.setOrderProperty("联系方式");
			insert.setOrderBefore(data.getCustomerPhone());
			insert.setOrderAfter(update.getCustomerPhone());
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!update.getSource().toString().equals(data.getSource().toString())){
			insert.setOrderProperty("来源");
			insert.setOrderBefore(this.getSource(data.getSource().toString()));
			insert.setOrderAfter(this.getSource(update.getSource().toString()));
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!update.getEngency().toString().equals(data.getEngency().toString())){
			insert.setOrderProperty("紧急程度");
			insert.setOrderBefore(this.getEngency(data.getEngency().toString()));
			insert.setOrderAfter(this.getEngency(update.getEngency().toString()));
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!(update.getHouseTime().toString()).equals(data.getHouseTime().toString())){
			insert.setOrderProperty("入住时间");
			insert.setOrderBefore(sdf.format(data.getHouseTime()));
			insert.setOrderAfter(sdf.format(update.getHouseTime()));
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!update.getBookArea().equals(data.getBookArea())){
			insert.setOrderProperty("地段需求");
			insert.setOrderBefore(data.getBookArea());
			insert.setOrderAfter(update.getBookArea());
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(update.getHouseType()!=data.getHouseType()){
			insert.setOrderProperty("户型");
			insert.setOrderBefore(this.getHouseType(data.getHouseType().toString()));
			insert.setOrderAfter(this.getHouseType(update.getHouseType().toString()));
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!update.getMaxMoney().toString().equals(data.getMaxMoney().toString())){
			insert.setOrderProperty("最大月租金");
			insert.setOrderBefore(data.getMaxMoney().toString()+"元");
			insert.setOrderAfter(update.getMaxMoney().toString()+"元");
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!update.getMinMoney().toString().equals(data.getMinMoney().toString())){
			insert.setOrderProperty("最小月租金");
			insert.setOrderBefore(data.getMinMoney().toString()+"元");
			insert.setOrderAfter(update.getMinMoney().toString()+"元");
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!(update.getBookTime().toString()).equals(data.getBookTime().toString())){
			insert.setOrderProperty("预约时间");
			insert.setOrderBefore(sdf.format(data.getBookTime()));
			insert.setOrderAfter(sdf.format(update.getBookTime()));
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}

		if(!update.getHouseMonth().toString().equals(data.getHouseMonth().toString())){
			insert.setOrderProperty("租期");
			insert.setOrderBefore(data.getHouseMonth().toString()+"月");
			insert.setOrderAfter(update.getHouseMonth().toString()+"月");
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!(update.getCustomerPeople().toString()).equals(data.getCustomerPeople().toString())){
			insert.setOrderProperty("客户人数");
			insert.setOrderBefore(data.getCustomerPeople().toString()+"人");
			insert.setOrderAfter(update.getCustomerPeople().toString()+"人");
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
		if(!update.getRemarks().equals(data.getRemarks())){
			insert.setOrderProperty("备注");
			insert.setOrderBefore(data.getRemarks());
			insert.setOrderAfter(update.getRemarks());
			insert.setUpdateTime(new Date());
			historyMapper.insertWorkOrderHistroy(insert);
		}
	}
	public String getTitle(String title){
		if (title.equals("1")) {
			return "待分配";
		} else if (title.equals("2")) {
			return "跟进中";
		} else if (title.equals("3")) {
			return "已完成";
		}else{
			return "";
		}
	}
	public String  getGender(String gender){
		if (gender.equals("0")) {
			return "男";
		} else if (gender.equals("1")) {
			return "女";
		} else if (gender.equals("2")) {
			return "未知";
		}else{
			return "";
		}
	}
	public String getEngency(String engency){
		if (engency .equals("1") ) {
			return "紧急";
		} else if (engency .equals("2") ) {
			return "正常";
		} else if (engency .equals("3") )  {
			return "延后";
		}else{
			return "";
		}
	}
	public String getHouseType(String houseType){
		if (houseType.equals("1")) {
			return "合住主卧";
		} else if (houseType.equals("2")) {
			return "合住单间独卫";
		} else if (houseType.equals("3")) {
			return "合住单间";
		} else if (houseType.equals("4")) {
			return "整租1室户";
		} else if (houseType.equals("5")) {
			return "整租2室户";
		}else{
			return "";
		}
	}
	public String getStatus(String status){
		if (status.equals("2")) {
			return "待处理";
		} else if  (status.equals("3")) {
			return "已去电";
		} else if (status.equals("4")){
			return "已带看";
		} else if  (status.equals("5")) {
			return "推迟";
		} else if  (status.equals("6")) {
			return "无效";
		} else if  (status.equals("7")) {
			return "已签约";
		}else{
			return "";
		}
	}
	public String getSource(String source){
		if (source.equals("1")) {
			return "58同城";
		} else  {
			return "赶集网";
		} 
	}
}
