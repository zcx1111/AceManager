package com.ace.acemanager.dao.finance;

import com.ace.acemanager.pojo.FinanceBill;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FinanceBillMapper {
	/**
	 * 删除Bill
	 * @param id
	 * @return
	 */
    int deleteByPrimaryKey(Integer id);

    int insert(FinanceBill record);

    /**
     * 新增Bill
     * @param record
     * @return
     */
    int insertSelective(FinanceBill record);

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
     * 编辑Bill
     * @param record
     * @return
     */
    int updateByPrimaryKeySelective(FinanceBill record);

    int updateByPrimaryKey(FinanceBill record);
    
    /**
     * 条件查询含抄表Bill
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
     * ***zkq***
     * 批量插入账单
     */
    int insertList(List<FinanceBill> list);
    
    /**
     * 查看bill通过costId
     * @param costId
     * @return
     */
    FinanceBill getBillIdByCostId(Integer costId);

    /**
     * 根据账单状态和合同id获取账单数量
     * @param contractId
     * @param status
     * @return
     */
    int getBillCountByContractIdAndStatus(@Param("contractId") Integer contractId, @Param("status") String ... status);


    /**
     * 根据合同id删除所有账单
     * @param contractId
     * @return
     */
    int deleteByContractId(@Param("contractId") Integer contractId);

    /**
     * 根据账单id和 bill状态删除账单
     * @param contractId
     * @param status
     * @return
     */
    int deleteByContractIdAndStatus(@Param("contractId") Integer contractId, @Param("status") String status);
    
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
    Float financeStatistics(@Param("userId") Integer userId,@Param("fundFlow") String fundFlow,@Param("billStatus") String billStatus);


    /**
     * 根据日期和用户id查询该用户下所有 房间 的账单总和
     * @param date
     * @param userId
     * @return
     */
    Float getRoomTotalMoneyByDate(@Param("date") String date, @Param("userId") Integer userId);

    /**
     * 根据日期和主账户id查询该用户下所有 房间 应收款账单总和
     * @param date 时间 （该时间之前）
     * @param userId 主账户id
     */
    Float getRoomNonPayedMoneyByDate(@Param("date") String date, @Param("userId") Integer userId);

    /**
     * 根据时间获取未支付账单租房账单列表
     * @param date
     * @param userId
     * @return
     */
    List<FinanceBill> getAllNonPayedRoomBills(@Param("date") String date, @Param("userId") Integer userId);


    /**
     * 根据时间获取未支付的 房间账单列表
     * @param date
     * @param userId
     * @return
     */
    List<FinanceBill> getAllNonPayedHouseBills(@Param("date") String date, @Param("userId") Integer userId);

}