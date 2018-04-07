package com.ace.acemanager.service.rental;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ace.acemanager.common.AcceptPojo;
import com.ace.acemanager.pojo.RentalMeterRead;

public interface RentalMeterReadService {

	/**
     * 通过合同id查询抄表
     * @param billId
     * @return
     */
    List<RentalMeterRead> selectByMeter(Integer rentalContractId);
    
    /**
     * 抄表
     * @param record
     * @return
     */
    int checkMeterRead (AcceptPojo pojo,Integer billId) throws Exception;
    
    /**
     * 通过账单id及费用名称查明细id
     * @param billId
     * @param costName
     * @return
     */
    int selectByMeterByOtherId(@Param("billId") Integer billId,@Param("costName") String costName);
    
    /**
     * 通过账单id查询抄表
     * @param billId
     * @return
     */
    List<RentalMeterRead> selectByMeterByBillId(Integer billId);
}
