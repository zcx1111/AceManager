package com.ace.acemanager.dao.rental.contract;

import com.ace.acemanager.pojo.RentalOtherCostInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RentalOtherCostInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insertSelective(RentalOtherCostInfo record);

    RentalOtherCostInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RentalOtherCostInfo record);

    int updateByPrimaryKey(RentalOtherCostInfo record);

    RentalOtherCostInfo getOtherCostInfoListByContractId(@Param("contractId") Integer contractId);

    /**
     * 批量插入并返回主键
     * @param list
     * @return
     */
    int insertList(List<RentalOtherCostInfo> list);

    /**
     * 根据合同id删除杂费
     * @param contractId
     * @return
     */
    int deleteByContractId(@Param("contractId") Integer contractId);
}