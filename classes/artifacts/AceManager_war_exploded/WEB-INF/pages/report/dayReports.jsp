<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../common/head.jsp"%>
<!-- 营业报告_日报表	start -->
<style>
.result-data-head {
	font-size: 24px;
	color: orange;
	height: 85px;
	line-height: 85px;
	text-align: center;
	border-bottom: solid 4px #59acff;
	font-weight: bold;
}
.table-hover tbody tr td {
	font-size: 16px;
	text-align: center;
	vertical-align: middle;
}
.table-bordered tbody tr td {
	font-size: 16px;
	text-align: center;
	vertical-align: middle;
}
</style>
<div class="box col-lg-10 col-sm-10 ">
<!-- 面包屑导航 -->
<%--<div>
	<ul class="breadcrumb">
		<li><a href="#">报表</a></li>
		<li><a href="#">营业报告</a></li>
		<li><a href="#">日报表</a></li>
	</ul>
</div>
--%><div class="row">
    <div class="box col-md-12">
        <div class="box-inner">
            <div class="box-content row">
                <div class="col-lg-12 col-md-12">
                	<div class="col-md-12 form-inline">
		               	<form id="serachDayReportForm" action="${pageContext.request.contextPath}/report/dayReports.html" method="post">
		               	<!-- 时间选择 -->
		               		<input type="hidden" id="todayDate" name="todayDate" value="">
							<input type="text" id="searchTime" name="searchTime" class="Wdate form-control" 
							onfocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'todayDate\')}'})"
							placeholder="输入查询时间" size="25" value="${serachTime }">
							
							<button type="submit" id="searchBtn" class="btn btn-success" style="margin-left:55px">查询</button>
							<button type="button" class="btn btn-info" style="margin-left: 580px">导出报表</button>
						</form>
					</div>
			<!-- 日报表标题 -->
			<h1 id="reportTitle" class="result-data-head"><span name="y"></span>年<span name="m"></span>月<span name="d"></span>日运营报告</h1>
			<!-- 运营状况-房源状况   start -->
			<table class="table table-striped table-bordered table-hover">
			  <tbody>
				<tr>
					<td colspan="5" style="color:blue;font-weight: bold;">运营状况-房源状况</td>
				</tr>
				<tr>
					<td>总房间数</td>
					<td>已租房间数</td>
					<td>空置房间数</td>
					<td>停用房间数</td>
					<td>入住率</td>
				</tr>
				<tr style="height: 60px">
					<td>${reportResult.totalRoomCount }间</td>
					<td>${reportResult.onrentRoom }间</td>
					<td>${reportResult.emptyRoom }间</td>
					<td>${reportResult.stopUseRoom }间</td>
					<td>
						<fmt:formatNumber type="number" value="${reportResult.inrentPercent*100}" maxFractionDigits="2"/>%
					</td>
				</tr>
				<tr>
					<td>新增房间数</td>
					<td>删除房间数</td>
					<td>新租房间数</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr style="height: 60px">
					<td>${reportResult.newlyaddRoom }间</td>
					<td>${reportResult.delRoom }间</td>
					<td>${reportResult.newlyrentRoom }间</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
			  </tbody>
			</table>
			<!-- 运营状况-房源状况   end -->
			<!-- 运营状况-业务情况   start -->
			<table class="table table-striped table-bordered table-hover">
			  <tbody>
				<tr>
					<td colspan="4" style="color:blue;font-weight: bold;">运营状况-业务情况</td>
				</tr>
				<tr>
					<td>新增客户数</td>
					<td>跟进中</td>
					<td>签约数</td>
					<td>业务处理率</td>
				</tr>
				<tr style="height: 60px">
					<td>0人</td>
					<td>0人</td>
					<td>0人</td>
					<td>0%</td>
				</tr>
			  </tbody>
			</table>
			<!-- 运营状况-业务情况   end -->
			<!-- 运营状况-账单情况   start -->
			<table class="table table-striped table-bordered table-hover">
			 <tbody>
				<tr>
					<td colspan="5" style="color:blue;font-weight: bold;">运营状况-账单情况</td>
				</tr>
				<tr>
					<td>总账单数</td>
					<td>应收款账单数</td>
					<td>应付款账单数</td>
					<td>待收款账单数</td>
					<td>待付款账单数</td>
				</tr>
				<tr style="height: 60px">
					<td>8个</td>
					<td>6个</td>
					<td>2个</td>
					<td>1个</td>
					<td>2个</td>
				</tr>
			  </tbody>
			</table>
			<!-- 运营状况-账单情况   end -->
			<!-- 财务情况（流水）  start -->
			<table class="table table-striped table-bordered">
			  <tbody>
				<tr>
					<td colspan="2" style="color:blue;font-weight: bold;">财务情况（流水）</td>
				</tr>
				<tr>
					<td>
						<!-- 当日现金收支 -->
						<table class="table table-bordered">
							<tr>
								<td style="color:blue;font-weight: bold;font-size: 13px">当日现金收支</td>
							</tr>
							<tr style="height: 60px">
								<td>
									<p>应收已收：4940元</p>
									<p>应收未收：800元</p>
									<p>回款率：86.06%</p>
									<p>&nbsp;</p>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<!-- 现金收入 -->
						<table class="table table-bordered">
							<tr>
								<td style="color:blue;font-weight: bold;font-size: 13px">现金收入</td>
							</tr>
							<tr style="height: 60px">
								<td>
									<p>现金总收入：65269元</p>
									<p>其中：租金收入：18190元</p>
									<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;押金收入：46500元</p>
									<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;杂费收入：579元</p>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<!-- 现金支出 -->
						<table class="table table-bordered">
							<tr>
								<td style="color:blue;font-weight: bold;font-size: 13px">现金支出</td>
							</tr>
							<tr style="height: 60px">
								<td>
									<p>现金总支出：0元</p>
									<p>其中：租金支出：0元</p>
									<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;押金支出：0元</p>
									<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;杂费支出：0元</p>
								</td>
							</tr>
						</table>					
					</td>
					<td>
						<!-- 明日租金预期 -->
						<table class="table table-bordered">
							<tr>
								<td style="color:blue;font-weight: bold;font-size: 13px">明日租金预期</td>
							</tr>
							<tr style="height: 60px">
								<td>
									<p>预计租金收支差：2400元</p>
									<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加：预计租金收入：2400元</p>
									<p>减：预计租金支出：0元</p>
									<p>&nbsp;</p>
								</td>
							</tr>
						</table>					
					</td>
				</tr>
				</tbody>
			</table>
			<!-- 财务情况（流水）  end -->	
				</div>
            </div>
        </div>
    </div>
</div>
</div>
<!-- 营业报告_日报表	end -->
<%@include file="../common/foot.jsp"%>
<script src="${pageContext.request.contextPath}/statics/localjs/reports.js"></script>
<script src="${pageContext.request.contextPath}/statics/localjs/DateFormat.js"></script>
<script type="text/javascript">
	var temp = new Date();
	temp.setDate(temp.getDate() - 1);
	var todayDate = DateFormat.getDateString(temp,"yyyy-MM-dd");
	$("#todayDate").val(todayDate);
</script>