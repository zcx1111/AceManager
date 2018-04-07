package com.ace.acemanager.service.finance;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.finance.FinanceCostMapper;
import com.ace.acemanager.pojo.FinanceBill;
import com.ace.acemanager.pojo.FinanceCost;

@Service
public class FinanceCostServiceImpl implements FinanceCostService {

	@Resource
	private FinanceCostMapper financeCostMapper;
	
	@Resource
	private FinanceBillService financeBillService;
	
	/**
	 * 条件查询Cost
	 * @Override
	 */
	public List<FinanceCost> listCheckCost(FinanceCost cost) {
		// TODO Auto-generated method stub
		return financeCostMapper.listCheckCost(cost);
	}

	/**
	 * 通过id查看Cost
	 * @Override
	 */
	public FinanceCost selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return financeCostMapper.selectByPrimaryKey(id);
	}

	/**
	 * 通过id删除Cost
	 * @Override
	 */
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return financeCostMapper.deleteByPrimaryKey(id);
	}

	@Override
	public List<FinanceCost> listCostByBillId(Integer id) {
		// TODO Auto-generated method stub
		return financeCostMapper.listCostByBillId(id);
	}

	@Override
	public int insertSelective(FinanceCost record) {
		// TODO Auto-generated method stub
		return financeCostMapper.insertSelective(record);
	}

	@Override
	public int aceInsertSelective(FinanceCost cost) throws Exception{
		// TODO Auto-generated method stub
		FinanceBill bill = cost.getBill();
		if(bill.getFundFlow().equals("收入")){
			bill.setTransactionObject("租客");
		}
		if(bill.getFundFlow().equals("支出")){
			bill.setTransactionObject("业主");
		}
		bill.setBillStatus("已支付");
		bill.setTotalMoney(cost.getFeeAmount());
		bill.setReceiptDate(bill.getActualTransactionDate());
		financeBillService.insertSelective(bill);
		
		cost.setBillId(bill.getId());
		int num1 = financeCostMapper.insertSelective(cost);
		
		return num1;
	}

}
