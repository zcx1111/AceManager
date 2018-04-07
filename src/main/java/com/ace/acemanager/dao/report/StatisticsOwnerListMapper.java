package com.ace.acemanager.dao.report;

import com.ace.acemanager.pojo.StatisticsOwnerList;

public interface StatisticsOwnerListMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(StatisticsOwnerList record);

    int insertSelective(StatisticsOwnerList record);

    StatisticsOwnerList selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StatisticsOwnerList record);

    int updateByPrimaryKey(StatisticsOwnerList record);
}