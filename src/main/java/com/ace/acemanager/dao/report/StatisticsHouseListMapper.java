package com.ace.acemanager.dao.report;

import com.ace.acemanager.pojo.StatisticsHouseList;

public interface StatisticsHouseListMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(StatisticsHouseList record);

    int insertSelective(StatisticsHouseList record);

    StatisticsHouseList selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StatisticsHouseList record);

    int updateByPrimaryKey(StatisticsHouseList record);
}