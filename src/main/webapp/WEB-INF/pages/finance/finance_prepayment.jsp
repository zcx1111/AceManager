<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@include file="../common/head.jsp"%>

        <div id="content" class="col-lg-10 col-sm-10">
            <!-- content starts -->
          <div class="row">
          	<div class="row clearfix">
							<!-- 主体栏 -->
							<div class="col-md-12 column" style="margin-left:10px;">
							<!-- 搜索栏 -->
							<div class="row" >
								<form role="form" class="form-inline "  id="budget_form">
								<!-- <div class="col-md-11 column"> -->
									<div class="form-group">
										<input type="text" id="billStartTime" name="billStartDate" class="form-control "
											onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'billEndTime\')}'})"
											placeholder="开始时间"	style="width: 100px;"/>-
										<input type="text" id="billEndTime" name="billEndDate" class="form-control" 
											onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'billStartTime\')}'})"
											placeholder="结束时间"	style="width: 100px;"/>
									</div>
									<div class="form-group">
										<div class="input-group">
											<input type="text" style="display: none;" name="fundFlow" value="${fundflow }">
											<input type="text" class="form-control" id="check" name="roomName" placeholder="房间信息、交易对象姓名">
											<span class="input-group-btn" >
												<button class="btn btn-default onclick_reset" onclick="getBudget(1)" type="button">
													<i class="glyphicon glyphicon-search"></i></button> 
											</span>
										</div>
									</div>
									<div class="form-group">
										<button type="reset" onclick="resetFun()" class="btn">重置</button>
									</div>
									<div class="form-group pull-right">
										<button type="reset" class="btn">导出报表</button>
									</div>
								<!-- </div> -->
								</form>
								<hr>
							</div>
							<!-- 统计栏 -->
							<div class=" row" style="margin-left:20px;">
								<div class="col-md-3 col-sm-3 col-xs-6">
									<a data-toggle="tooltip" title="" class="well top-block" >
										<div>预计收入金额（元）</div>
										<div><span style="color:green;font-size: 20px;">${income }</span></div> </a>
								</div>

								<div class="col-md-3 col-sm-3 col-xs-6">
									<a data-toggle="tooltip" title="" class="well top-block" >
										<div>预计支出金额（元）</div>
										<div><span style="color:red;font-size: 20px;">${payment }</span></div> </a>
								</div>

								<div class="col-md-3 col-sm-3 col-xs-6">
									<a data-toggle="tooltip" title="" class="well top-block" >
										<div>预计收支差（元）</div>
										<div><span style="color:#CD853F;font-size: 20px;">${exposure }</span></div> </a>
								</div>
								
							</div>
							
							<div class="box-content">
									<!-- <div class="alert alert-info">
										For help with such table please check <a
											href="http://datatables.net/" target="_blank">http://datatables.net/</a>
									</div> -->
									
									<!-- 收入预算 -->
									<table 
										class="table table-striped table-bordered table-hover responsive">
										<thead>
											<tr>
												<th>预计交易时间</th>
												<th>账单周期</th>
												<th>房间信息</th>
												<th>交易对象</th>
												<th>交易对象姓名</th>
												<th>资金流向</th>
												<th>账单金额</th>
											</tr>
										</thead>
										<tbody id="tbody_budgetList">
										</tbody>
									</table>
									<!-- end 收入预算 -->
								<div id="page_budget_num" style="font-weight: bold;"><!-- 加载分页信息 --></div>
								<center>
									<ul style="text-align:center;" class="pagination" id="pagination_budget_page">
										<!-- 加载分页 -->
									</ul>
								</center>

								</div>
							</div>
						</div>
					</div>
		</div>
    </div><!--/#content.col-md-0-->
</div><!--/fluid-row-->

   

    <hr>
    <!-- 模态框 -->
    <div class="modal fade" id="budget_detail" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">

		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h3>预算详情</h3>
				</div>
				<div class="modal-body">
					<table>
					<tbody>
						<tr>
							<td>交易房源</td>
							<td> <span id="roomName"></span></td>
						</tr>
						<tr>
							<td>交易对象</td>
							<td> <span id="transactionObject_detail"></span></td>
						</tr>
						<tr>
							<td>交易对象姓名</td>
							<td> <span id="transactionObjectName"></span></td>
						</tr>
						<tr>
							<td>账单周期</td>
							<td> <span id="billStartTime_dudget_detail"></span>至
								<span id="billEndTime_detail"></span></td>
						</tr>
						<tr>
							<td>应缴租日期</td>
							<td> <span id="receiptDate_detail"></span></td>
						</tr>
						<tr>
							<td>交易金额</td>
							<td> <span id="totalMoney_detail"></span></td>
						</tr>
						<tr>
							<td>其中：</td>
							<td></td>
						</tr>
					</tbody>
					
				</table>
				<table>
					<tbody id="tbody1"></tbody>
				</table>
				</div>
				<div class="modal-footer">
					<a href="#" class="btn btn-default" data-dismiss="modal">Close</a>
				</div>
			</div>
		</div>
	</div>

	<%@include file="../common/foot.jsp"%>
    <script src="${pageContext.request.contextPath}/statics/localjs/finance_prepayment.js"></script>
<script type="text/javascript" src="http://ip.chinaz.com/getip.aspx"></script>