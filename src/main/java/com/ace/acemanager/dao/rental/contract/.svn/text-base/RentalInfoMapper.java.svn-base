package com.ace.acemanager.dao.rental.contract;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ace.acemanager.pojo.RentalInfo;

public interface RentalInfoMapper {
    int deleteByPrimaryKey(Integer id);


    int insertSelective(RentalInfo record);

    RentalInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RentalInfo record);

    int updateByPrimaryKey(RentalInfo record);

    /**
     * 根据合同id获取租赁信息
     * @param contractId
     * @return
     */
    List<RentalInfo> getRentalInfoListByContractId(@Param("contractId") Integer contractId);

    /**
     * 批量插入租赁信息
     * @param list
     * @return
     */
    int insertList(List<RentalInfo> list);

    /**
     * 根据账单id删除分段信息
     * @return
     */
    int deleteByContractId(@Param("contractID") Integer contractID);
}