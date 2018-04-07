package com.ace.acemanager.service.rental;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ace.acemanager.common.AcceptPojo;
import com.ace.acemanager.dao.finance.FinanceBillMapper;
import com.ace.acemanager.dao.finance.FinanceCostMapper;
import com.ace.acemanager.dao.rental.contract.RentalMeterReadMapper;
import com.ace.acemanager.pojo.FinanceBill;
import com.ace.acemanager.pojo.FinanceCost;
import com.ace.acemanager.pojo.RentalMeterRead;

@Service
public class RentalMeterReadServiceImpl implements RentalMeterReadService{

	@Resource
	private RentalMeterReadMapper rentalMeterReadMapper;
	
	@Resource
	private FinanceCostMapper financeCostMapper;
	
	@Resource
	private FinanceBillMapper financeBillMapper;
	
	@Override
	public List<RentalMeterRead> selectByMeter(Integer billId) {
		// TODO Auto-generated method stub
		return rentalMeterReadMapper.selectByMeter(billId);
	}

	@Override
	public int checkMeterRead(AcceptPojo pojo,Integer billId) throws Exception{
		// TODO Auto-generated method stub
		int numall = 1;
		for(int i = 0;i<pojo.getCost().size();i++){
			RentalMeterRead read = pojo.getRead().get(i);
			int num = rentalMeterReadMapper.updateByPrimaryKeySelective(read);
			FinanceCost cost = pojo.getCost().get(i);
			int costId = this.selectByMeterByOtherId(billId,cost.getCostName());
			cost.setId(costId);
			System.out.println("抄表费用=======================》"+cost.getFeeAmount());
			int num1 = financeCostMapper.updateByPrimaryKeySelective(cost);
			FinanceBill bill = financeBillMapper.getBillIdByCostId(costId);
			bill.setTotalMoney(bill.getTotalMoney()+cost.getFeeAmount());
			int num2 = financeBillMapper.updateByPrimaryKeySelective(bill);
			numall = numall*num*num1*num2;
		}
		return numall;
	}


	@Override
	public List<RentalMeterRead> selectByMeterByBillId(Integer billId) {
		// TODO Auto-generated method stub
		return rentalMeterReadMapper.selectByMeterByBillId(billId);
	}

	@Override
	public int selectByMeterByOtherId(Integer billId, String costName) {
		// TODO Auto-generated method stub
		return rentalMeterReadMapper.selectByMeterByOtherId(billId, costName);
	}

	
}
