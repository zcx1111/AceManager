package com.ace.acemanager.service.rental;

import java.util.List;

import com.ace.acemanager.pojo.FinanceBill;

public interface RentalBillService {

	/**
     * 条件查询Bill
     * @param bill
     * @return
     */
    List<FinanceBill> listByCheckBill(FinanceBill bill);
    
    /**
     * 编辑Bill
     * @param record
     * @return
     */
    int updateByPrimaryKeySelective(FinanceBill record);
    
    /**
	 * 删除Bill
	 * @param id
	 * @return
	 */
    int deleteByPrimaryKey(Integer id);

    /**
     * 交租
     * @param bill
     * @return
     */
    int payBill(FinanceBill bill);
}
