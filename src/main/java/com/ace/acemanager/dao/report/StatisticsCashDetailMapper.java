package com.ace.acemanager.dao.report;

import com.ace.acemanager.pojo.StatisticsCashDetail;

public interface StatisticsCashDetailMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(StatisticsCashDetail record);

    int insertSelective(StatisticsCashDetail record);

    StatisticsCashDetail selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StatisticsCashDetail record);

    int updateByPrimaryKey(StatisticsCashDetail record);
}