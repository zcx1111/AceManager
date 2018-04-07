package com.ace.acemanager.controller;

import java.text.ParseException;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ace.acemanager.common.Constants;
import com.ace.acemanager.common.PageSupport;
import com.ace.acemanager.pojo.FinanceBill;
import com.ace.acemanager.pojo.FinanceCost;
import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalRoom;
import com.ace.acemanager.pojo.User;
import com.ace.acemanager.service.finance.FinanceBillService;
import com.ace.acemanager.service.finance.FinanceCostService;
import com.alibaba.fastjson.JSON;


@Controller
@RequestMapping(value="/finance",produces = "text/html;charset=UTF-8")
public class FinanceController extends BaseController {

	private Logger logger = Logger.getLogger(FinanceController.class);
	
	@Resource
	private FinanceBillService financeBillService;
	
	@Resource
	private FinanceCostService financeCostService;

	
	/**
	 * 收支流水页面
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/list")
	public String financeList(Model model){

		Float income = financeBillService.financeStatistics(this.getUserId(),Constants.RENTAL_FUNDFLOW_IN,Constants.RENTAL_STATUS_PAID);//收入统计
		Float payment = financeBillService.financeStatistics(this.getUserId(),Constants.RENTAL_FUNDFLOW_OUT,Constants.RENTAL_STATUS_PAID);//支出统计
		Float exposure = income + payment;//收支差
		
		model.addAttribute("income",income );
		model.addAttribute("payment",payment );
		model.addAttribute("exposure",exposure );
		return "finance/finance";
	}
	
	/**
	 * 收支流水/条件查询收支流水(异步，分页)
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping(value="/listByPage/{currPageNo}")
	public @ResponseBody String listAllBillByPage(@ModelAttribute FinanceBill bill,@PathVariable Integer currPageNo) throws ParseException{
		bill.setBillStatus(Constants.RENTAL_STATUS_PAID);

		if(this.getUserId() == 0){
			return "noLogin";
		}

		bill.setUserId(this.getUserId());
		
		if(bill.getTransactionObject() != null&&bill.getTransactionObject().equals("")){//交易对象
			bill.setTransactionObject(null);
		}
		if(bill.getFundFlow() != null&&bill.getFundFlow().equals("")){//资金流向
			bill.setFundFlow(null);
		}
		if(bill.getPaymentMethod() != null && bill.getPaymentMethod().equals("")){//交易方式
			bill.setPaymentMethod(null);
		}
		if(bill.getBillStartDate() != null && bill.getBillStartDate().equals("")){
			bill.setBillStartDate(null);
		}
		if(bill.getBillEndDate() != null && bill.getBillEndDate().equals("")){
			bill.setBillEndDate(null);
		}
		if(bill.getRoomName() != null && bill.getRoomName().equals("")){
			bill.setRoomName(null);
		}
		List<FinanceBill> list = financeBillService.CheckListBillByPage(bill);
	
		PageSupport pageSupport = new PageSupport();
		if(currPageNo == null){
			currPageNo = 1;
		}
		pageSupport.setPageSize(10);//每页条数
		pageSupport.setTotalCount(list.size());//计算总页数
		pageSupport.setCurrPageNo(currPageNo);//当前页数
		bill.setStartNum((pageSupport.getCurrPageNo() - 1) * pageSupport.getPageSize());
		bill.setPageSize(pageSupport.getPageSize());
		List<FinanceBill> billList = financeBillService.CheckListBillByPage(bill);
		pageSupport.setItems(billList);
		String json = JSON.toJSONString(pageSupport);
		
		return json;
	} 

	/**
	 * 通过账单id查询收支详情
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getBillById/{id}",produces = "text/html;charset=UTF-8")
	public @ResponseBody  String getBillById(@PathVariable Integer id){
		logger.debug("通过id查询Bill详情");
		FinanceBill bill = financeBillService.selectByPrimaryKey(id);
		String json = JSON.toJSONString(bill);
		return json;
	}
	
	/**
	 * 发送短信
	 * @param billId
	 * @return
	 */
	@RequestMapping(value="/sendMassageById/{billId}")
	public @ResponseBody String sendMassageById(@PathVariable Integer billId){
		boolean b = financeBillService.sendMessage(billId);
		String json = String.valueOf(b);
		return json;
	}
	
	/**
	 * 通过id查询收支详情(包含房间信息)
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getBillByRoom/{id}",produces = "text/html;charset=UTF-8")
	public @ResponseBody  String getBillByRoom(@PathVariable Integer id){
		logger.debug("通过id查询Bill详情");
		FinanceBill bill = financeBillService.selectByRoomKey(id);
		String json = JSON.toJSONString(bill);
		return json;
	}
	
	/**
	 * 流水明细页面
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/listAllCost")
	public String costList(Model model){

		Float income = financeBillService.financeStatistics(this.getUserId(),Constants.RENTAL_FUNDFLOW_IN,Constants.RENTAL_STATUS_PAID);//收入统计
		Float payment = financeBillService.financeStatistics(this.getUserId(),Constants.RENTAL_FUNDFLOW_OUT,Constants.RENTAL_STATUS_PAID);//支出统计
		Float exposure = income + payment;//收支差
		
		model.addAttribute("income",income );
		model.addAttribute("payment",payment );
		model.addAttribute("exposure",exposure );
		return "finance/finance_payment";
	}
	
	
	/**
	 * 删除账单
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/delBill/{id}")
	public @ResponseBody String delBill(@PathVariable int id){
		logger.debug("通过id删除Bill详情");
		int num = financeBillService.deleteByPrimaryKey(id);
		String json = JSON.toJSONString(num);
		return json;
	}
	
	/**
	 * 删除明细
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/delCost/{id}")
	public @ResponseBody String delCost(@PathVariable Integer id){
		int num = 0;
		num = financeCostService.deleteByPrimaryKey(id);
		String json = String.valueOf(num);
		return json;
	}
	
	/**
	 * 添加明细
	 * @param cost
	 * @return
	 */
	@RequestMapping(value="/updateCost")
	public @ResponseBody String updateCost1(@ModelAttribute FinanceCost cost) {
		int num = 0;
		try {
			num = financeCostService.aceInsertSelective(cost);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String str = String.valueOf(num);
		return str;
	}
	
	/**
	 * 流水明细/条件查询明细(分页)
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping(value="/listCostByPage/{currPageNo}")
	public @ResponseBody String listAllCost(@ModelAttribute FinanceCost cost,@PathVariable Integer currPageNo) throws ParseException{

		if(this.getUserId() == 0){
			return "noLogin";
		}

		cost.getBill().setUserId(this.getUserId());
		
		if(cost.getBill()!=null){
			cost.getBill().setBillStatus(Constants.RENTAL_STATUS_PAID);

		}else {
			FinanceBill bill = new FinanceBill();
			bill.setBillStatus(Constants.RENTAL_STATUS_PAID);
			cost.setBill(bill);
		}
		if(cost.getCostName() != null&&cost.getCostName().equals("")){//费用名称
			cost.setCostName(null);
		}
		if(cost.getBill().getFundFlow() != null&&cost.getBill().getFundFlow().equals("")){//资金流向
			cost.getBill().setFundFlow(null);
		}
		if(cost.getBill().getBillStartDate() != null && cost.getBill().getBillStartDate().equals("")){
			cost.getBill().setBillStartDate(null);
		}
		if(cost.getBill().getBillEndDate() != null && cost.getBill().getBillEndDate().equals("")){
			cost.getBill().setBillEndDate(null);
		}
		if(cost.getBill().getRoomName() !=null && cost.getBill().getRoomName().equals("")){
			cost.getBill().setRoom(null);
		}
		List<FinanceCost> list = financeCostService.listCheckCost(cost);
		
		PageSupport pageSupport = new PageSupport();
		pageSupport.setPageSize(10);//每页条数
		pageSupport.setTotalCount(list.size());//计算总页数
		pageSupport.setCurrPageNo(currPageNo);//当前页数
		cost.setStartNum((pageSupport.getCurrPageNo() - 1) * pageSupport.getPageSize());
		cost.setPageSize(pageSupport.getPageSize());
		List<FinanceCost> costList = financeCostService.listCheckCost(cost);
		pageSupport.setItems(costList);
		String json = JSON.toJSONString(pageSupport);
		return json;
	}

	/**
	 * 查询明细详情
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getCostById/{id}")
	public @ResponseBody String getCostById(@PathVariable int id){
		FinanceCost cost = financeCostService.selectByPrimaryKey(id);
		String json = JSON.toJSONString(cost);
		return json;
	}
	
	/**
	 * 收入预算
	 * @return
	 */
	@RequestMapping(value="/budget/income")
	public String listBudgetByIncome(Model model){

		Float income = financeBillService.financeStatistics(this.getUserId(),Constants.RENTAL_FUNDFLOW_IN,Constants.RENTAL_STATUS_UNPAID);//收入统计
		Float payment = financeBillService.financeStatistics(this.getUserId(),Constants.RENTAL_FUNDFLOW_OUT,Constants.RENTAL_STATUS_UNPAID);//支出统计
		Float exposure = income + payment;//收支差
		
		model.addAttribute("income",income );
		model.addAttribute("payment",payment );
		model.addAttribute("exposure",exposure );
		model.addAttribute("fundflow", "收入");
		return "finance/finance_prepayment";
	}
	
	/**
	 * 支出预算
	 * @return
	 */
	@RequestMapping(value="/budget/payment")
	public String listBudgetByPayment(Model model){

		Float income = financeBillService.financeStatistics(this.getUserId(),Constants.RENTAL_FUNDFLOW_IN,Constants.RENTAL_STATUS_UNPAID);//收入统计
		Float payment = financeBillService.financeStatistics(this.getUserId(),Constants.RENTAL_FUNDFLOW_OUT,Constants.RENTAL_STATUS_UNPAID);//支出统计
		Float exposure = income + payment;//收支差
		
		model.addAttribute("income",income );
		model.addAttribute("payment",payment );
		model.addAttribute("exposure",exposure );
		model.addAttribute("fundflow", "支出");
		return "finance/finance_prepayment";
	}
	
	/**
	 * 预算
	 * @param bill
	 * @param currPageNo
	 * @return
	 */
	@RequestMapping(value="/getBudget/{currPageNo}")
	public @ResponseBody String listIncomePage(@ModelAttribute FinanceBill bill,@PathVariable Integer currPageNo){
		bill.setBillStatus(Constants.RENTAL_STATUS_UNPAID);

		if(this.getUserId() == 0){
			return "noLogin";
		}

		bill.setUserId(this.getUserId());
		
		if(bill.getBillStartDate() != null && bill.getBillStartDate().equals("")){//开始时间
			bill.setBillStartDate(null);
		}
		if(bill.getBillEndDate() != null && bill.getBillEndDate().equals("")){//结束时间
			bill.setBillEndDate(null);
		}
		if(bill.getRoomName() != null && bill.getRoomName().equals("")){
			bill.setRoomName(null);
		}
		List<FinanceBill> list = financeBillService.CheckListBillByPage(bill);
		
		PageSupport pageSupport = new PageSupport();
		if(currPageNo == null){
			currPageNo = 1;
		}
		pageSupport.setPageSize(10);//每页条数
		pageSupport.setTotalCount(list.size());//计算总页数
		pageSupport.setCurrPageNo(currPageNo);//当前页数
		bill.setStartNum((pageSupport.getCurrPageNo() - 1) * pageSupport.getPageSize());
		bill.setPageSize(pageSupport.getPageSize());
		List<FinanceBill> billList = financeBillService.CheckListBillByPage(bill);
		pageSupport.setItems(billList);
		String json = JSON.toJSONString(pageSupport);
		
		return json;
	}
	
	/**
	 * 查询主账号下属房源
	 * @return
	 */
	@RequestMapping(value="/getListHouse")
	public @ResponseBody String getListHouse(){
		List<RentalHouse> houseList = financeBillService.listRentalHouseByUserId(this.getUserId());
		String json = JSON.toJSONString(houseList);
		return json;
	}
	
	/**
	 * 查询房源下所有房间
	 * @param houseId
	 * @return
	 */
	@RequestMapping(value="/getListRoom/{houseId}")
	public @ResponseBody String getListRoom(@PathVariable Integer houseId){
		List<RentalRoom> roomList = financeBillService.listRentalRoomByHouseId(houseId);
		String json = JSON.toJSONString(roomList);
		return json;
	}
	
	/**
	 * 获取主账号的id
	 * @return
	 */
	public int getUserId(){
		User user = super.getCurrentUser();
		int userId ;
		if(user == null){
			userId = 0;
		}else if(user.getParentId() !=0){
			userId = user.getParentId();
		}else{
			userId = user.getId();
		}
		return userId;
	}
}




