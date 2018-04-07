package com.ace.acemanager.dao.work;

import java.util.List;

import com.ace.acemanager.pojo.WorkOrder;

public interface WorkOrderMapper {
	//根据查询业务单详情
	WorkOrder selectByPrimaryKey(Integer id);
	//增加业务单
	int insertOrder(WorkOrder workOrder);
	//更新业务单
	int updateOrder(WorkOrder workOrder);
	//分配业务单
	int distributionOrder(WorkOrder workOrder);
	//更新业务单进度
	int statusOrder(WorkOrder workOrder);
	//签约业务单
	int dealOrder(WorkOrder workOrder);
	//删除业务单
	int deleteOrder(int workOrderId);
	//删除业务单之前清空外键
	int deleteOrderBefore(int workOrderId);
	//分页显示status=未分配的业务单
	List<WorkOrder> listWorkOrder(WorkOrder workOrder);
	//显示count(*)
	int countOrder(WorkOrder workOrder);
	//显示count(*) group by
 	List<WorkOrder> countOrderGroupBy(WorkOrder workOrder);
}