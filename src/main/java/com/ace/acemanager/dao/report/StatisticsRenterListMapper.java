package com.ace.acemanager.dao.report;

import com.ace.acemanager.pojo.StatisticsRenterList;

public interface StatisticsRenterListMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(StatisticsRenterList record);

    int insertSelective(StatisticsRenterList record);

    StatisticsRenterList selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StatisticsRenterList record);

    int updateByPrimaryKey(StatisticsRenterList record);
}