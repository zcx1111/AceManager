package com.ace.acemanager.service.finance;

import java.util.List;

import com.ace.acemanager.pojo.FinanceCost;

public interface FinanceCostService {

	/**
     * 条件查询Cost
     * @param cost
     * @return
     */
    List<FinanceCost> listCheckCost(FinanceCost cost);
    
    /**
     * 通过id查看Cost
     * @param id
     * @return
     */
    FinanceCost selectByPrimaryKey(Integer id);
    
    /**
	 * 通过id删除Cost
	 * @param costId
	 * @return
	 */
    int deleteByPrimaryKey(Integer id);
    
    /**
     * 通过billId查询CostList
     * @param id
     * @return
     */
    List<FinanceCost> listCostByBillId(Integer id);
    
    /**
     * 添加Cost
     * @param record
     * @return
     */
    int insertSelective(FinanceCost record);
    
    /**
     * 添加Cost
     * @param record
     * @return
     */
    int aceInsertSelective(FinanceCost record) throws Exception;
    
}
