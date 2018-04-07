package com.ace.acemanager.dao.rental.contract;

import com.ace.acemanager.pojo.RentalMeterRead;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RentalMeterReadMapper {
    int deleteByPrimaryKey(Integer id);

    int insertSelective(RentalMeterRead record);

    RentalMeterRead selectByPrimaryKey(Integer id);

    /**
     * 修改抄表
     * @param record
     * @return
     */
    int updateByPrimaryKeySelective(RentalMeterRead record);

    int updateByPrimaryKey(RentalMeterRead record);   

    /**
     * 批量插入 meterReads
     * @param meterReads
     * @return
     */
    int insertList(@Param("meterReads") List<RentalMeterRead> meterReads);

    /**
     * 通过账单id查询抄表
     * @param billId
     * @return
     */
    List<RentalMeterRead> selectByMeterByBillId(Integer billId);
    
    /**
     * 通过合同id查询抄表
     * @param billId
     * @return
     */
    List<RentalMeterRead> selectByMeter(Integer rentalContractId);
     
    /**
     * 通过账单id及费用名称查明细id
     * @param billId
     * @param costName
     * @return
     */
    int selectByMeterByOtherId(@Param("billId") Integer billId,@Param("costName") String costName);

    /**
     * 根据合同id 查询杂费id 再 删除读表信息
     */
    int deleteByContractId(@Param("contractId") Integer contractId);
}