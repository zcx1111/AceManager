package com.ace.acemanager.service.report;
import java.util.HashMap;

import com.ace.acemanager.pojo.StatisticsDayReport;
/**
 * 日报表Service接口
 * @author Liuqi
 * 2017-7-24
 */
public interface StatisticsDayReportService {

	/**
	 * 调用MySQL存储过程
	 * 	根据年、月、日、主账号ID 从各业务表中抓取数据并统计相关信息,并将统计结果存入`statistics_day_report`表中
	 * @param timeAndMainAccount
	 * @return
	 */
	void proDayReportsByMainAccountIdInsert(HashMap<String, String> timeAndMainAccount);

	/**
	 * 根据主账号ID、年、月、日查询日报表数据
	 * @param dayReport
	 * @return
	 */
	StatisticsDayReport getDayReportsByMainAccountIdAndTime(StatisticsDayReport dayReport);

}
