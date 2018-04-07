package com.ace.acemanager.dao.work;

import java.util.List;

import com.ace.acemanager.pojo.WorkOrderHistory;

public interface WorkOrderHistoryMapper {
	//按条插入业务单历史
	int insertWorkOrderHistroy(WorkOrderHistory record);
	//签约业务单时，删除除create,next,stauts之外的记录
	int deleteDealHistory(int WorkOrderId);
	//删除业务单时，删除搜索记录
	int deleteHistory(int WorkOrderId);
	/**
	 * 根据传入的业务单Id,返回相关业务单历史
	*/
	List<WorkOrderHistory> listOrderHistory(int workOrderId);
}