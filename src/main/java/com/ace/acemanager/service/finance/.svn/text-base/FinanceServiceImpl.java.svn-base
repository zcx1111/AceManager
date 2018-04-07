package com.ace.acemanager.service.finance;

import com.ace.acemanager.common.AcceptPojo;
import com.ace.acemanager.common.Constants;
import com.ace.acemanager.dao.finance.FinanceBillMapper;
import com.ace.acemanager.dao.finance.FinanceCostMapper;
import com.ace.acemanager.dao.rental.basic.RentalHouseMapper;
import com.ace.acemanager.dao.rental.basic.RentalRoomMapper;
import com.ace.acemanager.dao.rental.contract.RentalContractMapper;
import com.ace.acemanager.pojo.*;
import com.ace.acemanager.util.MessageAPI;
import com.aliyuncs.exceptions.ClientException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class FinanceServiceImpl implements FinanceBillService {
	public static SimpleDateFormat  format = new SimpleDateFormat("yyyy-MM-dd");
	
	@Resource
	private FinanceBillMapper financeBillMapper;
	
	@Resource
	private FinanceCostMapper financeCostMapper;
	
	@Resource
	private RentalContractMapper rentalContractMapper;

	@Resource
	private RentalHouseMapper rentalHouseMapper;

	@Resource
	private RentalRoomMapper rentalRoomMapper;
	
	@Override
	public List<FinanceBill> listByCheckBill(FinanceBill bill) {
		// TODO Auto-generated method stub
		return financeBillMapper.listByCheckBill(bill);
	}

	@Override
	public FinanceBill selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return financeBillMapper.selectByPrimaryKey(id);
	}

	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return financeBillMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(FinanceBill record) {
		// TODO Auto-generated method stub
		return financeBillMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int insertSelective(FinanceBill record) {
		// TODO Auto-generated method stub
		return financeBillMapper.insertSelective(record);
	}

	@Override
	public List<FinanceBill> CheckListByBill(FinanceBill bill) {
		// TODO Auto-generated method stub
		return financeBillMapper.CheckListByBill(bill);
	}

	@Override
	public int aceAddBill(AcceptPojo pojo) throws Exception{
		// TODO Auto-generated method stub
		float totalMoney = (float) 0.0;
		for(int i=0;i<pojo.getCost().size();i++){
			totalMoney += pojo.getCost().get(i).getFeeAmount();
		}
		FinanceBill bill = pojo.getBill().get(0);
		RentalContract contract = rentalContractMapper.selectByPrimaryKey(bill.getRentalContractId());
		bill.setBillStatus("待支付");
		bill.setTotalMoney(totalMoney);
		if(contract.getContractType().equals("托管")){
			bill.setTransactionObject("业主");
			bill.setFundFlow("支出");
			bill.setRentalHouseId(contract.getHouseId());
		}else{
			bill.setTransactionObject("租客");
			bill.setFundFlow("收入");
			bill.setRentalHouseId(contract.getRoomId());
		}
		int num = financeBillMapper.insertSelective(bill);
		int billId = bill.getId();
		for(int i=0;i<pojo.getCost().size();i++){
			FinanceCost cost = pojo.getCost().get(i);
			cost.setBillId(billId);
		}
		int num1 = financeCostMapper.insertList(pojo.getCost());
		return num*num1;
	}

	@Override
	public int aceUpdateBillAndCost(AcceptPojo pojo) throws Exception {
		// TODO Auto-generated method stub
		int num = 1;
		FinanceBill bill = pojo.getBill().get(0);
		List<FinanceCost> costList = financeCostMapper.listCostByBillId(bill.getId());
		for(int i=0;i<costList.size();i++){
			int num1 = financeCostMapper.deleteByPrimaryKey(costList.get(i).getId());
			num = num*num1;
		}
		float totalMoney = (float) 0.0;
		for(int i=0;i<pojo.getCost().size();i++){
			FinanceCost cost = pojo.getCost().get(i);
			cost.setBillId(bill.getId());
			totalMoney += cost.getFeeAmount();
		}
		int num2 = financeCostMapper.insertList(pojo.getCost());
		bill.setTotalMoney(totalMoney);
		int num3 = financeBillMapper.updateByPrimaryKeySelective(bill);
		return num*num2*num3;
	}

	@Override
	public FinanceBill selectByRoomKey(Integer id) {
		// TODO Auto-generated method stub
		return financeBillMapper.selectByRoomKey(id);
	}

	@Override
	public List<FinanceBill> CheckListBillByPage(FinanceBill bill) {
		// TODO Auto-generated method stub
		return financeBillMapper.CheckListBillByPage(bill);
	}

	@Override
	public Float financeStatistics(Integer userId,String fundFlow,String billStatus) {
		// TODO Auto-generated method stub
		return financeBillMapper.financeStatistics(userId,fundFlow,billStatus);
	}

	@Override
	public boolean sendMessage(Integer billId) {
		// TODO Auto-generated method stub
		FinanceBill bill = financeBillMapper.selectByPrimaryKey(billId);
		List<RentalContract> list = rentalContractMapper.getContractsByRoomIdAndStatus(bill.getRentalRoomId(), Constants.RENTAL_CONTRACT_EFFECTIVE);
		boolean b = false;
		try {
			System.out.println("测试发送信息！");
			b = MessageAPI.sendPressRentMoneyMessage(list.get(0).getPhoneNumber(), bill.getTransactionObjectName(), bill.getTotalMoney(), bill.getReceiptDate());
			System.out.println("发送后"+b);
		} catch (ClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(b);
		return b;
	}


	@Override
	public Float getRoomTotalMoneyByDate(Date date, Integer userId) {
		Float money = financeBillMapper.getRoomTotalMoneyByDate(format.format(date), userId);
		if (money == null) {
			money = 0F;
		}
		return money;
	}

	@Override
	public Float getRoomNonPayedMoneyByDate(Date date, Integer userId) {
		Float money = financeBillMapper.getRoomNonPayedMoneyByDate(format.format(date), userId);
		if (money == null) {
			money = 0F;
		}
		return money;
	}

    @Override
    public List<FinanceBill> getAllNonPayedRoomBills(Date date, Integer userId) throws Exception {
		return financeBillMapper.getAllNonPayedRoomBills(format.format(date), userId);
    }

	@Override
	public List<FinanceBill> getAllNonPayedHouseBills(Date date, Integer userId) {
		return financeBillMapper.getAllNonPayedHouseBills(format.format(date),userId);
	}

	@Override
	public List<RentalHouse> listRentalHouseByUserId(Integer userId) {
		return rentalHouseMapper.getHouseListByUserId(userId);
	}

	@Override
	public List<RentalRoom> listRentalRoomByHouseId(Integer houseId) {
		RentalRoom room = new RentalRoom();
		room.setHouseId(houseId);
		room.setStartNum(0);
		room.setPageSize(1000);
		return rentalRoomMapper.getRoomsByHouseId(room);
	}


}
