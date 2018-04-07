package com.ace.acemanager.service.rental;

import java.util.List;

import javax.annotation.Resource;

import com.ace.acemanager.dao.finance.FinanceCostMapper;
import com.ace.acemanager.pojo.FinanceCost;
import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.finance.FinanceBillMapper;
import com.ace.acemanager.pojo.FinanceBill;

@Service
public class RentalBillServiceImpl implements RentalBillService {

	@Resource
	private FinanceBillMapper financeBillMapper;

	@Resource
	private FinanceCostMapper financeCostMapper;
	
	@Override
	public List<FinanceBill> listByCheckBill(FinanceBill bill) {
		// TODO Auto-generated method stub
		return financeBillMapper.listByCheckBill(bill);
	}

	@Override
	public int updateByPrimaryKeySelective(FinanceBill record) {
		// TODO Auto-generated method stub
		return financeBillMapper.updateByPrimaryKeySelective(record);
	}

	/**
	 * 删除Bill
	 * @Override
	 */
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return financeBillMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int payBill(FinanceBill bill) {
		int num = 1;
		bill.setBillStatus("已支付");
		List<FinanceCost> costList = financeCostMapper.listCostByBillId(bill.getId());
		for(int i=0;i<costList.size();i++){
			if(costList.get(i).getFeeAmount() == null){
				FinanceCost cost = costList.get(i);
				cost.setFeeAmount((float)0);
				num = financeCostMapper.updateByPrimaryKey(cost);
			}
		}
		int num2 = financeBillMapper.updateByPrimaryKeySelective(bill);
		return num*num2;
	}

}
