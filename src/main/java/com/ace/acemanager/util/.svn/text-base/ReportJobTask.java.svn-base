package com.ace.acemanager.util;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.ace.acemanager.common.Constants;
import com.ace.acemanager.dao.report.StatisticsDayReportMapper;
import com.ace.acemanager.dao.user.UserMapper;
import com.ace.acemanager.pojo.User;
/**
 * Quartz定时任务实现类
 * 	主要任务:调用MySQL存储过程
	 	      根据年、月、日、所有主账号ID 从各核心业务表中抓取数据并统计相关信息,并将统计结果存入`statistics_day_report`表中
 * @author Liuqi
 * 2017-7-25
 */
public class ReportJobTask {
	private Logger logger = Logger.getLogger(ReportJobTask.class);

	@Resource
	private StatisticsDayReportMapper statisticsDayReportMapper;
	@Resource
	private UserMapper userMapper;

	/**
	 * 日报表统计任务
	 */
	public void dayReportCounting() {
		logger.debug("日报表统计任务  start #######");
		try {
			//统计条件确定
			//1、所有主账号ID
			List<User> mainAccountUsers = userMapper.getUsersByParentId(0);
			//2、统计时间：前一天的数据
			Date countPeriod = new Date();
			countPeriod.setTime(new Date().getTime() - Constants.DAY_MS);
			//统一格式 yy 
			String countPeriodStr = new SimpleDateFormat("yyyy-MM-dd").format(countPeriod);
			String[] split = countPeriodStr.split("-");
			String year = split[0];
			String month = split[1];
			String day = split[2];

			for (User u : mainAccountUsers) {
				HashMap<String, String> condition = new HashMap<>();
				condition.put("loginUserId", u.getId().toString());
				condition.put("year", year);
				condition.put("month", month);
				condition.put("day", day);

				//调用存储过程统计
				logger.debug("统计  " + countPeriodStr + " " + u.getId() + " 号主账号  数据 #######");
				statisticsDayReportMapper.proDayReportsByMainAccountIdInsert(condition);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
