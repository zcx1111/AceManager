package com.ace.acemanager.dao.finance;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ace.acemanager.pojo.FinanceCost;

public interface FinanceCostMapper {
	/**
	 * 通过id删除Cost
	 * @param costId
	 * @return
	 */
    int deleteByPrimaryKey(Integer id);

    int insert(FinanceCost record);

    /**
     * 添加Cost
     * @param record
     * @return
     */
    int insertSelective(FinanceCost record);

    /**
     * 通过id查看Cost
     * @param id
     * @return
     */
    FinanceCost selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FinanceCost record);

    int updateByPrimaryKey(FinanceCost record);
    
    /**
     * 条件查询Cost
     * @param cost
     * @return
     */
    List<FinanceCost> listCheckCost(FinanceCost cost);
    
    /**
     * 通过billId查询CostList
     * @param id
     * @return
     */
    List<FinanceCost> listCostByBillId(Integer id);

    /**
     * ***zkq***
     * 批量插入 costs
     * @param costs
     * @return
     */
    int insertList(@Param("costs") List<FinanceCost> costs);

    /**
     * 通过合同id删除所有明细
     * @param contractId
     * @return
     */
    int deleteByContractId(@Param("contractId") Integer contractId);

    /**
     * 根据合同id和账单状态删除明细
     * @param contractId
     * @return
     */
    int deleteByContractIdAndBillStatus(@Param("contractId") Integer contractId, @Param("status") String status);
}