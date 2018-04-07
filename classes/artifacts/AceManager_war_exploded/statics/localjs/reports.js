/**
 * 报表模块js文件
 * @author Liuqi
 * 2017-7-24
 */
$(document).ready(function() {

	selectNowDate();

	$("#serachDayReportForm :submit").click(function() {
		autoChangeReportTitle();
	});

});

/**
 * 下拉框自动显示当前年、月、日
 */
function selectNowDate() {
	var $st = $("#searchTime");
	if ($st != null && $st != "") {
		autoChangeReportTitle();
	} else {
		var nowDateStr = DateFormat.getNowDateString("yyyy-MM-dd");
		$("#searchTime").val(nowDateStr);
	}
}

/**
 * 日期字符串 按 "-" 分割
 * @param dateStr
 * @returns
 */
function splitUtil(dateStr) {
	return dateStr.split("-");
}

/**
 * 自动更新Title
 */
function autoChangeReportTitle() {
	var a = splitUtil($("#searchTime").val());
	$("#reportTitle").find("[name='y']").html(a[0]);
	$("#reportTitle").find("[name='m']").html(a[1]);
	$("#reportTitle").find("[name='d']").html(a[2]);
}
