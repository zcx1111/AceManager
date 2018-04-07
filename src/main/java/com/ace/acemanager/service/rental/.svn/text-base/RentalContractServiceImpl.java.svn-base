package com.ace.acemanager.service.rental;

import com.ace.acemanager.common.Constants;
import com.ace.acemanager.dao.finance.FinanceBillMapper;
import com.ace.acemanager.dao.finance.FinanceCostMapper;
import com.ace.acemanager.dao.rental.basic.RentalHouseMapper;
import com.ace.acemanager.dao.rental.basic.RentalRoomMapper;
import com.ace.acemanager.dao.rental.contract.*;
import com.ace.acemanager.pojo.*;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Project <AceManager>
 * Created by zkq on 2017/7/11 16:30.
 */
@Service
public class RentalContractServiceImpl implements RentalContractService {

    private static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    private static Calendar calendar;
    private Logger logger = Logger.getLogger(RentalContractServiceImpl.class);

    @Resource
    private RentalContractMapper contractMapper;
    @Resource
    private RentalAnnexMapper annexMapper;
    @Resource
    private RentalOtherCostInfoMapper otherCostInfoMapper;
    @Resource
    private RentalHouseMapper houseMapper;
    @Resource
    private RentalRoomMapper roomMapper;
    @Resource
    private RentalMeterReadMapper meterReadMapper;
    @Resource
    private RentalInfoMapper infoMapper;
    @Resource
    private FinanceBillMapper billMapper;
    @Resource
    private FinanceCostMapper costMapper;

    private static Calendar getCalendar() {
        if (calendar == null) {
            calendar = Calendar.getInstance();
        }
        return calendar;
    }

//    @Override
//    public int addContract(RentalContract contract) throws Exception {
//        return contractMapper.insertSelective(contract);
//    }

//    @Override
//    public int delContractById(Integer id) throws Exception {
//        return contractMapper.deleteByPrimaryKey(id);
//    }

    @Override
    public int updateContract(RentalContract contract) throws Exception {
        return contractMapper.updateByPrimaryKeySelective(contract);
    }

    @Override
    public RentalContract getContractById(Integer id) throws Exception {
        return contractMapper.selectByPrimaryKey(id);
    }

    @Override
    public RentalRoom getRoomById(Integer id) throws Exception {
        return roomMapper.getRoomById(id);
    }

    @Override
    public RentalContract getEffectiveContractByHouseId(Integer houseId) throws Exception {
        List<RentalContract> contractList = contractMapper.getContractsByHouseIdAndStatus(houseId, Constants.RENTAL_CONTRACT_EFFECTIVE);
        if (contractList.size() > 0) {
            return contractList.get(0);
        }
        return null;
    }

    @Override
    public RentalContract getEffectiveContractByRoomId(Integer roomId) throws Exception {
        List<RentalContract> contractList = contractMapper.getContractsByRoomIdAndStatus(roomId, Constants.RENTAL_CONTRACT_EFFECTIVE);
        if (contractList.size() > 0) {
            return contractList.get(0);
        }
        return null;
    }

//    @Override
//    public List<RentalContract> getContractsByHouseIdAndStatus(Integer houseId, String Status) throws Exception {
//        return contractMapper.getContractsByHouseIdAndStatus(houseId, Status);
//    }

    @Override
    public String aceSaveOwnerContract(RentalContract contract) throws Exception {
        String result = verifyContract(contract);
        if (!result.equals(Constants.RENTAL_CONTRACT_LEGAL)) {
            return result;
        }
        if (hasEffectiveContractByHouseId(contract.getHouseId())) {
            return "已有生效合同，无法添加";
        }
        RentalHouse house = houseMapper.getHouseById(contract.getHouseId());
        if (house.getIsDelete() == 1) {//房间已经删除 则不能添加
            return "该房间已经删除";
        }
        completeContract(contract);
        completeRentalInfos(contract);
        completeOtherCostInfos(contract);
        List<FinanceBill> billList = generateBills(contract);
        ArrayList<RentalMeterRead> meterReads = new ArrayList<>();
        ArrayList<FinanceCost> costs = new ArrayList<>();
        billMapper.insertList(billList);    //批量插入bill
        for (FinanceBill bill : billList) {
            for (FinanceCost cost : bill.getCostList()) {       //设置id
                cost.setBillId(bill.getId());
                costs.add(cost);
            }
        }
        meterReadMapper.insertList(meterReads);
        costMapper.insertList(costs);
        return "true";
    }


    @Override
    public String aceSaveRentContract(RentalContract contract) throws Exception {
        String result = verifyContract(contract); //判断合同是否合法
        if (!result.equals(Constants.RENTAL_CONTRACT_LEGAL)) {
            return result;
        }
        RentalRoom room = roomMapper.getRoomById(contract.getRoomId());//获取房间
        if (room == null || !Constants.RENTAL_ROOM_STATUS_EMPTY.equals(room.getStatus()) ||     //只有"空置"状态下的房间才允许添加合同
                room.getIsDelete() == 1) {      //isDelete = 1 已经删除
            return "该房间不允许添加合同";
        }
        if (hasEffectiveContractByRoomId(contract.getRoomId())) {
            return "已有生效合同，无法添加";
        }
        completeContract(contract);
        completeRentalInfos(contract);
        completeOtherCostInfos(contract);
        List<FinanceBill> billList = generateBills(contract);
        ArrayList<RentalMeterRead> meterReads = new ArrayList<>();
        ArrayList<FinanceCost> costs = new ArrayList<>();
        billMapper.insertList(billList);    //批量插入bill
        for (FinanceBill bill : billList) {
            for (FinanceCost cost : bill.getCostList()) {       //设置id
                cost.setBillId(bill.getId());
                costs.add(cost);
            }
        }
        meterReadMapper.insertList(meterReads);//插入读表信息
        costMapper.insertList(costs);//插入账单明细
        room.setStatus(Constants.RENTAL_ROOM_STATUS_RENTED);
        room.setModifiedTime(new Date());//更新修改时间
        roomMapper.updateRoomById(room);//更新房间状态
        return "true";
    }

    @Override
    public String aceReletContract(RentalContract contract) throws Exception {
        String result = verifyReletContract(contract);
        if (!result.equals(Constants.RENTAL_CONTRACT_LEGAL)) {  //判断合同信息是否合法
            return result;
        }
        if (!canReletContract(contract.getId())) { //判断是否能续租
            return "还有未完成账单，无法续租";
        }
        meterReadMapper.deleteByContractId(contract.getId());//删除以前的读表信息
        otherCostInfoMapper.deleteByContractId(contract.getId());//删除以前的杂费信息
        contract.setEndDate(contract.getRentalInfos().get(contract.getRentalInfos().size() - 1).getRentEndTime());//重新设置合同结束日子
        updateContract(contract); //更新合同
        completeRentalInfos(contract);//创建保存新的租赁信息
        completeOtherCostInfos(contract); //创建保存新的杂费信息
        contract.setStartDate(contract.getRentalInfos().get(0).getRentStartTime());
        List<FinanceBill> billList = generateBills(contract);//创建账单

        ArrayList<RentalMeterRead> meterReads = new ArrayList<>();
        ArrayList<FinanceCost> costs = new ArrayList<>();
        billMapper.insertList(billList);    //批量插入bill
        for (FinanceBill bill : billList) {
            for (FinanceCost cost : bill.getCostList()) {       //业主合同，设置id
                cost.setBillId(bill.getId());
                costs.add(cost);
            }
        }
        meterReadMapper.insertList(meterReads);
        costMapper.insertList(costs);
        return "true";
    }

    @Override
    public Boolean aceDeleteOwnerContract(Integer contractId) throws Exception {
        deleteContract(contractId);     //删除合同
        return true;
    }

    @Override
    public Boolean aceDeleteRentContract(Integer contractId) throws Exception {
        RentalContract contract = contractMapper.selectByPrimaryKey(contractId);
        RentalRoom room = roomMapper.getRoomById(contract.getRoomId());     //获取房间
        room.setStatus(Constants.RENTAL_ROOM_STATUS_EMPTY);     //将房间设置为空置
        room.setModifiedTime(new Date());       //更新修改时间
        roomMapper.updateRoomById(room);        //更新房间
        deleteContract(contractId);         //删除合同
        return true;
    }

    /**
     * 删除合同操作
     *
     * @param contractId 合同id
     * @throws Exception 数据库操作异常
     */
    private void deleteContract(Integer contractId) throws Exception {
        meterReadMapper.deleteByContractId(contractId);//先删除读表信息
        otherCostInfoMapper.deleteByContractId(contractId);//再删除杂费信息
        costMapper.deleteByContractId(contractId);//先删除账单明细
        billMapper.deleteByContractId(contractId);//再删除账单信息
        infoMapper.deleteByContractId(contractId);//删除租赁信息
        contractMapper.deleteByPrimaryKey(contractId);//删除合同
    }


    @Override
    public Integer getUnpaidBillCountByContractId(Integer contractId) throws Exception {
        return billMapper.getBillCountByContractIdAndStatus(contractId, Constants.RENTAL_STATUS_OVERDUE, Constants.RENTAL_STATUS_UNPAID);
    }

    @Override
    public String aceAbandonContract(RentalContract contract, List<FinanceCost> costs) throws Exception {
        if (contract == null) {
            return "非法合同";
        }
        RentalContract contractDB = contractMapper.selectByPrimaryKey(contract.getId());
        if (contractDB == null) {
            return "找不到合同";
        }
        contract.setStatus(Constants.RENTAL_CONTRACT_EXPIRED);//到期
        contractMapper.updateByPrimaryKeySelective(contract);//更新合同状态
        costMapper.deleteByContractIdAndBillStatus(contract.getId(), Constants.RENTAL_STATUS_UNPAID);//先删除未支付账单明细
        billMapper.deleteByContractIdAndStatus(contract.getId(), Constants.RENTAL_STATUS_UNPAID);//再删除未支付账单
        if (costs != null && costs.size() > 0) {
            FinanceBill bill = new FinanceBill();
            bill.setTransactionObjectName(contractDB.getClienteleName());//交易对象姓名
            bill.setRentalContractId(contractDB.getId()); //账单设置合同id
            Date now = new Date();
            bill.setBillStartDate(now);//账单开始时间
            bill.setBillEndDate(now);//账单结束时间
            bill.setReceiptDate(now);//应处理时间
            bill.setActualTransactionDate(now);//应处理时间
            bill.setPaymentMethod(Constants.RENTAL_PAY_TYPE_SYSTEM);//支付方式 系统标记为已支付
            bill.setBillStatus(Constants.RENTAL_STATUS_PAID);//已支付
            if (contractDB.getContractType().equals(Constants.RENTAL_CONTRACT_RENT)) {      //租房合同
                RentalRoom room = new RentalRoom();
                room.setId(contractDB.getRoomId());
                room.setStatus(Constants.RENTAL_ROOM_STATUS_EMPTY);//将房间设置为空置
                room.setModifiedTime(new Date());//更新修改时间
                roomMapper.updateRoomById(room);//更新房间
                bill.setRentalRoomId(contractDB.getRoomId());//设置房间id
                bill.setTransactionObject(Constants.RENTAL_FINANCE_RENTAL);
            } else if (contractDB.getContractType().equals(Constants.RENTAL_CONTRACT_CUSTODY)) {    //托管合同
                RentalHouse house = houseMapper.getHouseById(contractDB.getHouseId());//获取房源
                bill.setRentalHouseId(house.getId());//房源id
                bill.setTransactionObject(Constants.RENTAL_FINANCE_OWNER);
            }
            Float count = 0F;
            for (FinanceCost cost : costs) {
                count += cost.getFeeAmount();
            }
            bill.setTotalMoney(count);
            if (count < 0) {
                bill.setFundFlow(Constants.RENTAL_FUNDFLOW_OUT);//支出
            } else {
                bill.setFundFlow(Constants.RENTAL_FUNDFLOW_IN); //收入
            }
            billMapper.insertSelective(bill);//插入账单
            for (FinanceCost cost : costs) {
                cost.setBillId(bill.getId());
            }
            costMapper.insertList(costs);//批量插入账单明细
        }
        return "true";
    }

    @Override
    public RentalRoom getRoomDetailByRoomId(Integer roomId) throws Exception {
        RentalRoom room = roomMapper.getRoomById(roomId);//获取房间信息
        RentalHouse house = new RentalHouse();
        house.setId(room.getHouseId());
        house = houseMapper.getHouseDetailByHouseId(house);//获取房间信息
        room.setHouse(house);
        return room;
    }

    @Override
    public List<RentalContract> getHistoryContractByRoomId(Integer roomId) throws Exception {
        return contractMapper.getContractsByRoomIdAndStatus(roomId, Constants.RENTAL_CONTRACT_EXPIRED);
    }

    @Override
    public List<RentalContract> getHistoryContractByHouseId(Integer houseId) throws Exception {
        return contractMapper.getContractsByHouseIdAndStatus(houseId, Constants.RENTAL_CONTRACT_EXPIRED);
    }

    @Override
    public List<RentalContract> getOutOfDateRoomContracts(Date date, Integer userId) {
        return contractMapper.getOutOfDateRoomContracts(format.format(date), userId);
    }

    @Override
    public List<RentalContract> getOutOfDateHouseContracts(Date date, Integer userId) throws Exception {
        return contractMapper.getOutOfDateHouseContracts(format.format(date), userId);
    }

    @Override
    public Integer getContractsCountByHouseIdAndStatus(Integer houseId, String status) throws Exception {
        if (status == null) {
            return null;
        }
        return contractMapper.getContractsCountByHouseIdAndStatus(houseId, status);
    }

    @Override
    public Integer getContractsCountByRoomIdAndStatus(Integer roomId, String status) throws Exception {
        if (status == null) {
            return null;
        }
        return contractMapper.getContractsCountByRoomIdAndStatus(roomId, status);
    }

    @Override
    public Boolean hasEffectiveContractByHouseId(Integer houseId) throws Exception {
        return contractMapper.getContractsCountByHouseIdAndStatus(houseId, Constants.RENTAL_CONTRACT_EFFECTIVE) > 0;
    }

    @Override
    public Boolean hasEffectiveContractByRoomId(Integer roomId) throws Exception {
        return contractMapper.getContractsCountByRoomIdAndStatus(roomId, Constants.RENTAL_CONTRACT_EFFECTIVE) > 0;
    }

    @Override
    public RentalHouse getHouseDetailByHouseId(RentalHouse house) throws Exception {
        return houseMapper.getHouseDetailByHouseId(house);
    }

    @Override
    public Boolean canReletContract(Integer contractId) throws Exception {
        return billMapper.getBillCountByContractIdAndStatus(contractId, Constants.RENTAL_STATUS_UNPAID, Constants.RENTAL_STATUS_OVERDUE) == 0;
    }

    @Override
    public Boolean canDeleteContract(Integer contractId) throws Exception {
        return billMapper.getBillCountByContractIdAndStatus(contractId, Constants.RENTAL_STATUS_PAID) == 0;
    }


    /**
     * 生成账单
     *
     * @param contract
     */
    private List<FinanceBill> generateBills(RentalContract contract) throws Exception {
        String transactionObject = null;    //  交易对象
        String fundFlow = null;     //资金流向
        String status = Constants.RENTAL_STATUS_UNPAID;     //  交易状态
        int sign = 1;
        Date current = contract.getStartDate();
        if (contract.getContractType().equals(Constants.RENTAL_CONTRACT_CUSTODY)) {//托管合同
            transactionObject = Constants.RENTAL_FINANCE_OWNER;//业主
            fundFlow = Constants.RENTAL_FUNDFLOW_OUT;//支出
            sign = -1;  //托管合同 cost为负数
        }
        if (contract.getContractType().equals(Constants.RENTAL_CONTRACT_RENT)) {//租房合同
            transactionObject = Constants.RENTAL_FINANCE_RENTAL;//对象为租客
            fundFlow = Constants.RENTAL_FUNDFLOW_IN;//收入
            sign = 1;   //租房合同 cost为正数
        }
        ArrayList<FinanceBill> bills = new ArrayList<>();
        for (RentalInfo rentalInfo : contract.getRentalInfos()) {       //生成账单
            for (int i = 0; i < rentalInfo.getChooseMonth() / contract.getPayType(); i++) { //正常周期账单
                FinanceBill bill = new FinanceBill();
                bill.setBillStartDate(current);
                if (contract.getRentType().equals(Constants.RENTAL_RENT_ADVANCE)) {
                    bill.setReceiptDate(addDay(current, contract.getRentDate() * -1));//应收款日期为开始时间提前
                }
                if (contract.getRentType().equals(Constants.RENTAL_RENT_REGULAR)) {
                    bill.setReceiptDate(setCalendarDay(current, contract.getRentDate()));   //应收款日期为每月固定日期
                }
                current = addMonth(current, contract.getPayType());
                bill.setBillEndDate(current);
                ArrayList<FinanceCost> costList = new ArrayList<>();
                FinanceCost cost = new FinanceCost();
                cost.setCostName(Constants.RENTAL_COSTNAME_RENT);//'租金'
                cost.setFeeAmount(contract.getPayType() * rentalInfo.getRentMoney() * sign);         //* sign因为租房合同为支出，标记为负数
                costList.add(cost);
                if (contract.getOtherCostInfos() != null) {                             //根据杂费生成账单明细 cost
                    for (RentalOtherCostInfo otherCostInfo : contract.getOtherCostInfos()) {
                        cost = new FinanceCost();
                        cost.setCostName(otherCostInfo.getCostName());
                        if (otherCostInfo.getMeterRead() == null) {
                            cost.setFeeAmount(otherCostInfo.getTotalPrice() * contract.getPayType() * sign);
                        }
                        costList.add(cost);
                    }
                }

                bill.setCostList(costList);
                bills.add(bill);
            }
            int month = rentalInfo.getChooseMonth() % contract.getPayType();

            if (month != 0) {         //不足时间账单
                FinanceBill bill = new FinanceBill();
                bill.setBillStartDate(current);
                if (contract.getRentType().equals(Constants.RENTAL_RENT_ADVANCE)) {
                    bill.setReceiptDate(addDay(current, contract.getRentDate() * -1));  //提前日交租  应收款日期为开始时间提前
                }
                if (contract.getRentType().equals(Constants.RENTAL_RENT_REGULAR)) {
                    bill.setReceiptDate(setCalendarDay(current, contract.getRentDate()));    //固定日交租 应收款日期为每月固定日期
                }
                current = addMonth(current, month);
                bill.setBillEndDate(current);
                ArrayList<FinanceCost> costList = new ArrayList<>();
                FinanceCost cost = new FinanceCost();
                cost.setCostName(Constants.RENTAL_COSTNAME_RENT);//租金
                cost.setFeeAmount(month * rentalInfo.getRentMoney() * sign);//  租金乘上系数和剩下的月数
                costList.add(cost);

                if (contract.getOtherCostInfos() != null) {                         //根据杂费生成账单明细 cost
                    for (RentalOtherCostInfo otherCostInfo : contract.getOtherCostInfos()) {
                        cost = new FinanceCost();
                        cost.setCostName(otherCostInfo.getCostName());
                        if (otherCostInfo.getMeterRead() == null) { //如果没有抄表信息
                            cost.setFeeAmount(otherCostInfo.getTotalPrice() * month * sign); //直接设置金额
                        }
                        costList.add(cost);
                    }
                }

                bill.setCostList(costList);
                bills.add(bill);
            }
        }

        FinanceBill first = bills.get(0);   //给第一个账单设置押金 并修正付款时间
        if (contract.getDeposit() != null) {    //没有押金则不设置
            FinanceCost cost = new FinanceCost();
            cost.setCostName(Constants.RENTAL_COSTNAME_DEPOSIT);//"押金"
            cost.setFeeAmount(contract.getDeposit() * sign);    //押金乘上系数
            first.getCostList().add(cost);
        }
        first.setReceiptDate(contract.getStartDate());

        for (FinanceBill bill : bills) {
            bill.setRentalContractId(contract.getId());     //绑定合同ID
//            logger.debug(contract.getId() + "   bill->>----" + bill.getRentalContractId());
            bill.setTransactionObject(transactionObject);   //设置交易对象
            bill.setFundFlow(fundFlow);                     //设置资金流向
            bill.setBillStatus(status);                     //设置状态 （待支付）
            bill.setTransactionObjectName(contract.getClienteleName()); //交易对象名称
            bill.setRentalHouseId(contract.getHouseId());       //业主合同有houseId
            bill.setRentalRoomId(contract.getRoomId());         //租客合同有roomId
            Float count = 0F;
            for (FinanceCost financeCost : bill.getCostList()) {
                if (financeCost.getFeeAmount() != null) {
                    count += financeCost.getFeeAmount();
                }
            }
            bill.setTotalMoney(count);      //设置总金额
        }
        return bills;
    }


    /**
     * 设置固定时间交租
     *
     * @return
     */
    private Date setCalendarDay(Date date, Integer day) {
        Calendar calendar = getCalendar();
        calendar.setTime(date);
        calendar.set(Calendar.DATE, day);
        return calendar.getTime();
    }

    /**
     * 加减日期
     *
     * @return
     */
    private Date addDay(Date date, Integer day) {
        Calendar calendar = getCalendar();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, day);
        return calendar.getTime();
    }

    /**
     * 月份增加
     *
     * @param date
     * @param month
     * @return
     */
    private Date addMonth(Date date, Integer month) {
        Calendar calendar = getCalendar();
        calendar.setTime(date);
        calendar.add(Calendar.MONTH, month);
        return calendar.getTime();
    }


    /**
     * 完成并保存度表信息
     *
     * @param otherCostInfo
     */
    private RentalMeterRead getMeterRead(RentalOtherCostInfo otherCostInfo) throws Exception {
        RentalMeterRead meterRead = otherCostInfo.getMeterRead();
        if (meterRead != null) {
            meterRead.setMeterType(otherCostInfo.getCostName());
            meterRead.setOtherCostInfoId(otherCostInfo.getId());
            return meterRead;
        } else {
            return null;
        }
    }

    /**
     * 完成并保存杂费信息
     *
     * @param contract
     */
    private void completeOtherCostInfos(RentalContract contract) throws Exception {
        if (contract.getOtherCostInfos() == null) {
            return;
        }
        ArrayList<RentalOtherCostInfo> otherCostInfos = new ArrayList<>();
        for (RentalOtherCostInfo otherCostInfo : contract.getOtherCostInfos()) {
            otherCostInfo.setContractId(contract.getId());
            otherCostInfos.add(otherCostInfo);
        }
        otherCostInfoMapper.insertList(otherCostInfos);
        //otherCostInfos插入后生成id 再赋给 meterRead
        ArrayList<RentalMeterRead> meterReads = new ArrayList<>();
        for (RentalOtherCostInfo otherCostInfo : otherCostInfos) {
            RentalMeterRead meterRead = getMeterRead(otherCostInfo);
            if (meterRead != null) {
                meterReads.add(meterRead);
            }
        }
        meterReadMapper.insertList(meterReads);
    }

    /**
     * 完成并保存租赁分段信息
     *
     * @param contract
     */
    private void completeRentalInfos(RentalContract contract) throws Exception {
        ArrayList<RentalInfo> rentalInfos = new ArrayList<>();
        for (RentalInfo rentalInfo : contract.getRentalInfos()) {
            rentalInfo.setContractId(contract.getId());
            rentalInfos.add(rentalInfo);
        }
        infoMapper.insertList(rentalInfos);
    }

    /**
     * 完成并保存具体合同信息
     *
     * @param contract
     */
    private void completeContract(RentalContract contract) throws Exception {
        //设置合同开始结束时间
        List<RentalInfo> rentalInfos = contract.getRentalInfos();
        contract.setStartDate(rentalInfos.get(0).getRentStartTime());
        contract.setEndDate(rentalInfos.get(rentalInfos.size() - 1).getRentEndTime());
        contract.setStatus(Constants.RENTAL_CONTRACT_EFFECTIVE);
        contractMapper.insertSelective(contract);
    }

    /**
     * 判断合同是否合法
     *
     * @param contract
     * @return
     */
    private String verifyContract(RentalContract contract) throws Exception {
        if (contract == null || contract.getContractType() == null ||
                contract.getRentDate() == null || contract.getRentDate() <= 0 ||
                contract.getPayType() == null || contract.getPayType() <= 0 ||
                contract.getClienteleName() == null || contract.getDeposit() == null || contract.getCertificateNo() == null) {   //没有合同或合同类型
            return "合同不合法";
        }

        if (contract.getContractType().equals(Constants.RENTAL_CONTRACT_CUSTODY)) {//是托管合同
            if (contract.getHouseId() == null || contract.getHouseId() <= 0) {     //房源id不合法
                return "房源不合法";
            }
        }
        if (contract.getContractType().equals(Constants.RENTAL_CONTRACT_RENT)) {//是租房合同
            if (contract.getRoomId() == null || contract.getRoomId() <= 0) {     //房间id不合法
                return "房间不合法";
            }
        }
        if (contract.getRentalInfos() == null || contract.getRentalInfos().size() <= 0) {
            return "无租赁信息";
        } else {
            for (RentalInfo rentalInfo : contract.getRentalInfos()) {
                if (!verifyRentalInfo(rentalInfo)) {
                    return "租赁信息不合法";
                }
            }
        }
        if (contract.getOtherCostInfos() != null && contract.getOtherCostInfos().size() > 0) {
            for (RentalOtherCostInfo otherCostInfo : contract.getOtherCostInfos()) {
                if (!verifyOtherCostInfo(otherCostInfo)) {
                    return "杂费信息不合法";
                }
            }
        }
        return Constants.RENTAL_CONTRACT_LEGAL;
    }

    /**
     * 验证续租合同
     *
     * @param contract
     * @return
     * @throws Exception
     */
    private String verifyReletContract(RentalContract contract) throws Exception {
        if (contract == null || contract.getRentType() == null || contract.getRentDate() == null ||
                contract.getPayType() == null || contract.getSubsectionType() == null) {
            return "合同不合法";
        }
        if (contract.getRentalInfos() == null || contract.getRentalInfos().size() <= 0) {
            return "无租赁信息";
        } else {
            for (RentalInfo rentalInfo : contract.getRentalInfos()) {
                if (!verifyRentalInfo(rentalInfo)) {
                    return "租赁信息不合法";
                }
            }
        }
        if (contract.getOtherCostInfos() != null && contract.getOtherCostInfos().size() > 0) {
            for (RentalOtherCostInfo otherCostInfo : contract.getOtherCostInfos()) {
                if (!verifyOtherCostInfo(otherCostInfo)) {
                    return "杂费信息不合法";
                }
            }
        }
        return Constants.RENTAL_CONTRACT_LEGAL;
    }

    /**
     * 判断杂费信息是否合法
     *
     * @param otherCostInfo
     * @return
     */
    private boolean verifyOtherCostInfo(RentalOtherCostInfo otherCostInfo) throws Exception {
        if (otherCostInfo.getCostType() == null || otherCostInfo.getCostName() == null) {
            return false;
        }
        if (otherCostInfo.getCostType().equals(Constants.RENTAL_COST_METER_READER)) {   //抄表收费
            if (otherCostInfo.getUnitPrice() == null || otherCostInfo.getUnitName() == null || otherCostInfo.getUnitPrice() < 0) {
                return false;
            }
            RentalMeterRead meterRead = otherCostInfo.getMeterRead();
            if (meterRead == null || meterRead.getReadTime() == null || meterRead.getMeterNumber() == null) { //无抄表信息 不合法
                return false;
            }
        }
        if (otherCostInfo.getCostType().equals(Constants.RENTAL_COST_REGULAR)) {//固定收费
            if (otherCostInfo.getTotalPrice() == null || otherCostInfo.getTotalPrice() < 0) {//金额错误
                return false;
            }
        }
        return true;
    }

    /**
     * 判断租赁信息是否合法
     *
     * @param rentalInfo
     * @return
     */
    private boolean verifyRentalInfo(RentalInfo rentalInfo) throws Exception {
        Float rentMoney = rentalInfo.getRentMoney();
        if (rentMoney == null || rentMoney <= 0 || rentalInfo.getRentStartTime() == null || rentalInfo.getRentEndTime() == null) {
            return false;
        }
        return true;
    }


}
