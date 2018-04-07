package com.ace.acemanager.controller;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ace.acemanager.common.Constants;
import com.ace.acemanager.pojo.StatisticsDayReport;
import com.ace.acemanager.pojo.User;
import com.ace.acemanager.service.report.StatisticsDayReportService;
/**
 * 报表模块Controller
 * @author Liuqi
 * 2017-7-24
 */
@Controller
@RequestMapping("/report")
public class ReportController extends BaseController {
	private Logger logger = Logger.getLogger(ReportController.class);

	@Resource
	private StatisticsDayReportService statisticsDayReportService;

	/**
	 * 营业报告 - 日报表
	 * @return
	 */
	@RequestMapping(value = "/dayReports.html")
	public String dayReportList(Date searchTime, Model model) {
		//session中用户
		User loginUser = getCurrentUser();
		//首次进入页面，查询的是前一天的统计数据
		Integer mainAccountId = null;
		if (null == searchTime) {
			searchTime = new Date();
			searchTime.setTime(new Date().getTime() - Constants.DAY_MS);
		}

		String searchTimeStr = new SimpleDateFormat("yyyy-MM-dd").format(searchTime);
		String[] split = searchTimeStr.split("-");
		String year = split[0];
		String month = split[1];
		String day = split[2];
		//保证yyyy-MM-dd格式
		month = month.length() == 1 ? "0" + month : month;
		day = day.length() == 1 ? "0" + day : day;

		if (null != loginUser) {
			logger.debug("统计报表时间====>" + searchTimeStr);

			//获取主账号ID
			mainAccountId = loginUser.getParentId() == 0 ? loginUser.getId() : loginUser.getParentId();

			StatisticsDayReport dayReport = new StatisticsDayReport();
			dayReport.setMainAccountId(mainAccountId);
			dayReport.setYear(year);
			dayReport.setMonth(month);
			dayReport.setDay(day);

			StatisticsDayReport reportResult = statisticsDayReportService.getDayReportsByMainAccountIdAndTime(dayReport);

			if (null != reportResult) {//若表中存在此条数据，则不用调用存储过程去抓取
				//存入model
				model.addAttribute("reportResult", reportResult);
			} else {
				//否则， 调用存储过程日报表的数据抓取
				logger.debug("日报表   " + searchTimeStr + " 的数据抓取===>");
				HashMap<String, String> condition = new HashMap<>();
				condition.put("loginUserId", loginUser.getId().toString());
				condition.put("year", year);
				condition.put("month", month);
				condition.put("day", day);

				statisticsDayReportService.proDayReportsByMainAccountIdInsert(condition);

				reportResult = statisticsDayReportService.getDayReportsByMainAccountIdAndTime(dayReport);
				model.addAttribute("reportResult", reportResult);

			}
			//搜索日期回显
			model.addAttribute("serachTime", searchTimeStr);
			return "/report/dayReports";
		} else {
			return "redirect:/";
		}

	}
	/*------------------------------------------华丽丽的分割线------------------------------------------*/
	/*--------------------------------------------敬请期待--------------------------------------------*/
	/**
	 * 营业报告 - 月报表
	 * @return
	 */
	@RequestMapping("/monthReports.html")
	public String monthReportList() {
		return "/report/monthReports";
	}

	/**
	 * 营业明细 - 支出明细
	 * @return
	 */
	@RequestMapping("/expenseDetail.html")
	public String expenseDetailList() {
		return "/report/expenseDetail";
	}

	/**
	 * 营业明细 - 收入明细
	 * @return
	 */
	@RequestMapping("/incomeDetail.html")
	public String incomeDetailList() {
		return "/report/incomeDetail";
	}

	/**
	 * 营业明细 - 押金明细
	 * @return
	 */
	@RequestMapping("/cashDetail.html")
	public String cashDetailList() {
		return "/report/cashDetail";
	}

	/**
	 * 清单报表 - 业主清单报表
	 * @return
	 */
	@RequestMapping("/ownerCheckListReports.html")
	public String ownerCheckList() {
		return "/report/ownerCheckListReports";
	}

	/**
	 * 清单报表 - 租客清单报表
	 * @return
	 */
	@RequestMapping("/renterCheckListReports.html")
	public String renterCheckList() {
		return "/report/renterCheckListReports";
	}

	/**
	 * 清单报表 - 房源统计报表
	 * @return
	 */
	@RequestMapping("/availabilityStatics.html")
	public String availabilityStaticsList() {
		return "/report/availabilityStatics";
	}

}
