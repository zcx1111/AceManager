package com.ace.acemanager.service.work;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.work.WorkOrderMapper;
import com.ace.acemanager.pojo.User;
import com.ace.acemanager.pojo.WorkOrder;

@Service("OrderService")
public class WorkOrderServiceImpl implements WorkOrderService {
	@Autowired
	public WorkOrderMapper orderMapper;

	@Override
	public int dealWorkOrder(Integer orderId) throws Exception {
		// TODO Auto-generated method stub
		WorkOrder order =orderMapper.selectByPrimaryKey(orderId);
		order.setUpdateTime(new Date());
		order.setTitle(3);
		order.setStatus(7);
		return orderMapper.dealOrder(order);
	}
	
	/**根据controlloer从页面接收到的含有id,remarks,status的order
	根据id查询dataOrder,更新remarks,根据status的值进行更新
	当传入的status==100（无效）,dataOrder settile(1)待分配
	status==6 dataorder settile(3) 
	else```` 
	*/
	@Override
	public int statusWorkOrder(WorkOrder data,WorkOrder update,Integer userId) throws Exception {
		if(update.getStatus().toString().equals("100")){//放弃业务单，
			data.setTitle(1);
			data.setStatus(0);
			data.setNextId(null);
		}else if(update.getStatus().toString().equals("6")){//无效业务单
			data.setTitle(3);
		}else if(update.getStatus().toString().equals("1")){//待分配转跟进中
			data.setTitle(2);
			data.setStatus(2);
		}else{				//跟进中 3,4,5
			data.setStatus(update.getStatus());
		}
		data.setRemarks(update.getRemarks());
		data.setUpdateTime(new Date());
		orderMapper.statusOrder(data);
		return 0;
	}

	@Override
	public WorkOrder selectByPrimaryKey(int id) throws Exception {
		return orderMapper.selectByPrimaryKey(id);
	}

	@Override
	public int insertWorkOrder(WorkOrder order,User user) throws Exception {
		if(user==null){
			return 0;
		}else{
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				if(order.getBookTimeStr()!=null)
				order.setBookTime(sdf.parse(order.getBookTimeStr()));
				order.setTitle(1);
				order.setStatus(0);
				order.setCreateId(user.getId());
				if(user.getParentId()==0){
					order.setOwnerId(user.getId());
				}else{
					order.setOwnerId(user.getParentId());
				}
				order.setCreateTime(new Date());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return orderMapper.insertOrder(order);
		}
	}

	@Override
	public int deleteWorkOrder(int orderId) throws Exception {
		orderMapper.deleteOrderBefore(orderId);
		return orderMapper.deleteOrder(orderId);
	}

	@Override
	public int updateWorkOrder(WorkOrder order) throws Exception{
		order.setUpdateTime(new Date());
		return orderMapper.updateOrder(order);
	}

	@Override
	public List<WorkOrder> listWorkOrder(WorkOrder workOrder) throws Exception {
		return orderMapper.listWorkOrder(workOrder);
	}

	@Override
	public int countOrder(WorkOrder workOrder) throws Exception{
		return orderMapper.countOrder(workOrder);
	}

	@Override
	public List<WorkOrder> countOrderGroupBy(WorkOrder workOrder) throws Exception {
		return orderMapper.countOrderGroupBy(workOrder);
	}

	@Override
	public int distributionWorkOrder(WorkOrder workOrder) throws Exception {
		workOrder.setUpdateTime(new Date());
		return orderMapper.distributionOrder(workOrder);
	}


}
