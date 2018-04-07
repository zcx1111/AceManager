package com.ace.acemanager.service.finance;

import com.ace.acemanager.common.AcceptPojo;
import com.ace.acemanager.pojo.FinanceBill;
import com.ace.acemanager.pojo.RentalHouse;
import com.ace.acemanager.pojo.RentalRoom;

import java.util.Date;
import java.util.List;

public interface FinanceBillService {

	/**
     * 查询含抄表Bill
     * @param bill
     * @return
     */
    List<FinanceBill> listByCheckBill(FinanceBill bill);
    
    /**
     * 查询的Bill(ByBill属性)
     * @param bill
     * @return
     */
    List<FinanceBill> CheckListByBill(FinanceBill bill);
    
    /**
     * 查询Bill详情
     * @param id
     * @return
     */
    FinanceBill selectByPrimaryKey(Integer id);
    
    /**
     * 查询Bill详情(包含room)
     * @param id
     * @return
     */
    FinanceBill selectByRoomKey(Integer id);
    
    /**
	 * 删除Bill
	 * @param id
	 * @return
	 */
    int deleteByPrimaryKey(Integer id);
    
    /**
     * 编辑Bill
     * @param record
     * @return
     */
    int updateByPrimaryKeySelective(FinanceBill record);
    
    /**
     * 新增Bill
     * @param record
     * @return
     */
    int insertSelective(FinanceBill record);
    
    /**
     * 添加Bill(含有costList)
     * @param pojo
     * @return
     */
    int aceAddBill(AcceptPojo pojo) throws Exception;
    
    /**
     * 编辑账单
     * @param pojo
     * @return
     * @throws Exception
     */
    int aceUpdateBillAndCost(AcceptPojo pojo) throws Exception;
    
    /**
     * 分页条件查询Bill
     * @param bill
     * @return
     */
    List<FinanceBill> CheckListBillByPage(FinanceBill bill);
    /**
     * 财务收支金额统计
     * @param fundFlow
     * @return
     */
    Float financeStatistics(Integer userId,String fundFlow,String billStatus);
    
    /**
     * 催租
     * @return
     */
    boolean sendMessage(Integer billId);


    /**
     * 根据日期和用户id查询该用户下所有 房间 的账单总和
     * @param date
     * @param userId
     * @return
     */
    Float getRoomTotalMoneyByDate( Date date, Integer userId);

    /**
     * 根据日期查询 该用户下未支付的账单金额总和
     * @param date
     * @param userId
     * @return
     */
    Float getRoomNonPayedMoneyByDate(Date date, Integer userId);

    /**
     * 根据日期获取所有 在这之前的未支付租房账单
     * @param date
     * @param userId
     * @return
     */
    List<FinanceBill> getAllNonPayedRoomBills(Date date, Integer userId) throws Exception;


    /**
     *  根据日期获取所有 在这之前的未支付业主账单
     * @param date
     * @param userId
     * @return
     */
    List<FinanceBill> getAllNonPayedHouseBills(Date date, Integer userId);

    /**
     * 查找账号下的所有房源
     * @param userId
     * @return
     */
    List<RentalHouse> listRentalHouseByUserId(Integer userId);

    /**
     * 查找房源下的所有房间
     * @param houseId
     * @return
     */
    List<RentalRoom> listRentalRoomByHouseId(Integer houseId);
}
