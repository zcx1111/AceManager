package com.ace.acemanager.service.work;

import java.util.List;

import com.ace.acemanager.pojo.WorkOrder;
import com.ace.acemanager.pojo.WorkOrderHistory;

public interface WorkOrderHistoryService {
	List<WorkOrderHistory> listOrderHistoryById(Integer id) throws Exception;
	//删除业务单时，删除业务单所有历史
	void deleteOrderHistory(Integer orderId) throws Exception;
	//新增业务单时，增加业务单创建历史
	void insertOrderHistory(WorkOrder insert,Integer UserId) throws Exception;
	//分配时，增加业务单分配历史
	void distributionOrderHistory(String beforename,String nextname,Integer userId,Integer orderId) throws Exception;
	//已知业务单存在,更新修改业务单历史
	void updateOrderHistroy(WorkOrder insert,WorkOrder data,Integer UserId) throws Exception;
	//更新进度时，增加业务单进度历史
	void statusOrderHistory(String beforename,String remarks,Integer userId,Integer orderId) throws Exception;
	//业务单签约时，删除除status,create,next之外的历史
	void dealOrderHistory(Integer userId,Integer orderId);
}
