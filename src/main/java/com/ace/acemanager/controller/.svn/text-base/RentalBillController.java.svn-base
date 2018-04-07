package com.ace.acemanager.controller;

import java.util.List;

import javax.annotation.Resource;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ace.acemanager.common.AcceptPojo;
import com.ace.acemanager.pojo.FinanceBill;
import com.ace.acemanager.pojo.FinanceCost;
import com.ace.acemanager.pojo.RentalContract;
import com.ace.acemanager.pojo.RentalMeterRead;
import com.ace.acemanager.service.finance.FinanceBillService;
import com.ace.acemanager.service.finance.FinanceCostService;
import com.ace.acemanager.service.rental.RentalBillService;
import com.ace.acemanager.service.rental.RentalContractService;
import com.ace.acemanager.service.rental.RentalMeterReadService;
import com.alibaba.fastjson.JSON;

@Controller
@RequestMapping(value="/rentalBill",produces = "text/html;charset=UTF-8")
public class RentalBillController extends BaseController {

	private Logger logger = Logger.getLogger(RentalBillController.class);
	
	@Resource
	private RentalBillService rentalBillService;
	
	@Resource
	private FinanceBillService financeBillService;
	
	@Resource
	private FinanceCostService financeCostService;
	
	@Resource
	private RentalMeterReadService rentalMeterReadService;
	
	@Resource
	private RentalContractService rentalContractService;
	
	/**
	 * 通过房源id查Bill列表
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getByHouseId/{id}")
	public @ResponseBody String listByCheck(@PathVariable int id){
		logger.debug("通过房源id："+id+"查Bill列表");
		RentalContract contract = null;
		List<FinanceBill> billList = null;
		try {
			contract = rentalContractService.getEffectiveContractByHouseId(id);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(contract != null){
			FinanceBill bill = new FinanceBill();
			bill.setRentalContractId(contract.getId());
			billList = rentalBillService.listByCheckBill(bill);
		}
		String json = JSON.toJSONString(billList);
		return json;
	}
	
	/**
	 * 通过房间id查Bill列表
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getByRoomId/{id}")
	public @ResponseBody String listBillByRoomId(@PathVariable int id){
		logger.debug("通过房间id："+id+"查Bill列表");
		RentalContract contract = null;
		List<FinanceBill> billList = null;
		try {
			contract = rentalContractService.getEffectiveContractByRoomId(id);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(contract != null){
			FinanceBill bill = new FinanceBill();
			logger.debug("合同Id========》"+contract.getId());
			bill.setRentalContractId(contract.getId());
			billList = rentalBillService.listByCheckBill(bill);
		}
		String json = JSON.toJSONString(billList);
		return json;
	}
	
	/**
	 * 编辑账单
	 * @param pojo
	 * @return
	 */
	@RequestMapping(value="/updateBill")
	public @ResponseBody String updateBill(AcceptPojo pojo){
		int num = 0;
		try {
			num = financeBillService.aceUpdateBillAndCost(pojo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String json = String.valueOf(num);
		return json;
	}
	
	/**
	 * 通过房间id查询合同
	 * @param roomId
	 * @return
	 */
	@RequestMapping(value="/getContractsByRoomId/{roomId}")
	public @ResponseBody String getContractsByRoomIdAndStatus(@PathVariable Integer roomId){
		RentalContract contract = null;
		try {
			contract = rentalContractService.getEffectiveContractByRoomId(roomId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String json = JSON.toJSONString(contract);
		return json;
	}
	
	/**
	 * 通过房源id查询合同
	 * @param houseId
	 * @return
	 */
	@RequestMapping(value="/getContractsByHouseId/{houseId}")
	public @ResponseBody String getContractsByHouseIdAndStatus(@PathVariable Integer houseId){
		RentalContract contract = null;
		try {
			contract = rentalContractService.getEffectiveContractByHouseId(houseId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String json = JSON.toJSONString(contract);
		return json;
	}
	
	/**
	 * 添加账单
	 * @param pojo
	 * @return
	 */
	@RequestMapping(value="/addBill")
	public @ResponseBody String addBill(AcceptPojo pojo){
		int num = 0;
		try {
			num = financeBillService.aceAddBill(pojo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String json = String.valueOf(num);
		return json;
	}
	
	/**
	 * 抄表查询
	 * @param billId
	 * @return
	 */
	@RequestMapping(value="getMeterByBillId/{billId}")
	public @ResponseBody String getMeterByBillId(@PathVariable int billId){
		List<RentalMeterRead> meterList = rentalMeterReadService.selectByMeterByBillId(billId);
		String json = JSON.toJSONString(meterList);
		return json;
	}
	
	/**
	 * 抄表
	 * @param billId
	 * @return
	 */
	@RequestMapping(value="/addMeter/{billId}")
	public @ResponseBody String addMeter(AcceptPojo pojo,@PathVariable Integer billId){
		int num = 0;
		try {
			num = rentalMeterReadService.checkMeterRead(pojo,billId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String str = String.valueOf(num);
		return str;
	}
	
	/**
	 * 交租
	 * @param bill
	 * @return
	 */
	@RequestMapping(value="/payBill")
	public @ResponseBody String updateBill(@ModelAttribute FinanceBill bill){
		logger.debug(bill.getId());
		int num = 0;
		bill.setBillStatus("已支付");
		try{
			num = rentalBillService.payBill(bill);
		}catch (Exception e){
			e.printStackTrace();
		}
		String json = String.valueOf(num);
		return json;
	}
	
	/**
	 * 删除账单
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/delBill/{id}",produces = "text/json;charset=UTF-8")
	public @ResponseBody String delBill(@PathVariable int id){
		int numb = financeBillService.deleteByPrimaryKey(id);
		List<FinanceCost> list = financeCostService.listCostByBillId(id);
		for(int i=0;i<list.size();i++){
			logger.debug(list.get(i).getId());
			financeCostService.deleteByPrimaryKey(list.get(i).getId());
		}
		String json = String.valueOf(numb);
		return json; 
	}
}
