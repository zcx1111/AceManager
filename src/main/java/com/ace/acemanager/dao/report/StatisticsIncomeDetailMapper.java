package com.ace.acemanager.dao.report;

import com.ace.acemanager.pojo.StatisticsIncomeDetail;

public interface StatisticsIncomeDetailMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(StatisticsIncomeDetail record);

    int insertSelective(StatisticsIncomeDetail record);

    StatisticsIncomeDetail selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StatisticsIncomeDetail record);

    int updateByPrimaryKey(StatisticsIncomeDetail record);
}