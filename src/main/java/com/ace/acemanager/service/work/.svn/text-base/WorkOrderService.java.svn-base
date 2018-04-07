package com.ace.acemanager.service.work;

import java.util.List;

import com.ace.acemanager.pojo.User;
import com.ace.acemanager.pojo.WorkOrder;

public interface WorkOrderService {

	WorkOrder selectByPrimaryKey(int id) throws Exception ;
	//传入表单传来的值，与当前登录用户
	int insertWorkOrder(WorkOrder workOrder,User user ) throws Exception;
	int deleteWorkOrder(int  orderId) throws Exception;
	//分配业务单
	int distributionWorkOrder(WorkOrder workOrder) throws Exception;
	//更新业务单
	int updateWorkOrder(WorkOrder workOrder) throws Exception;
	//更新业务单进度,当放弃时，userid=null
	int statusWorkOrder(WorkOrder data,WorkOrder update,Integer userId) throws Exception;
	//签约业务单
	int dealWorkOrder(Integer orderId) throws Exception;
	List<WorkOrder> listWorkOrder(WorkOrder workOrder) throws Exception;
	int countOrder(WorkOrder workOrder) throws Exception;
	//显示count(*) group by
	List<WorkOrder> countOrderGroupBy(WorkOrder workOrder) throws Exception;
}
