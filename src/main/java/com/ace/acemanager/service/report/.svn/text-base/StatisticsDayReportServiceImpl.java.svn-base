package com.ace.acemanager.service.report;
import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ace.acemanager.dao.report.StatisticsDayReportMapper;
import com.ace.acemanager.pojo.StatisticsDayReport;
/**
 * 日报表Service接口实现类
 * @author Liuqi
 * 2017-7-24
 */
@Service
public class StatisticsDayReportServiceImpl implements StatisticsDayReportService {

	private Logger logger = Logger.getLogger(StatisticsDayReportServiceImpl.class);

	@Resource
	StatisticsDayReportMapper statisticsDayReportMapper;

	@Override
	public void proDayReportsByMainAccountIdInsert(HashMap<String, String> timeAndMainAccount) {
		statisticsDayReportMapper.proDayReportsByMainAccountIdInsert(timeAndMainAccount);
	}

	@Override
	public StatisticsDayReport getDayReportsByMainAccountIdAndTime(StatisticsDayReport dayReport) {
		return statisticsDayReportMapper.getDayReportsByMainAccountIdAndTime(dayReport);
	}

}
