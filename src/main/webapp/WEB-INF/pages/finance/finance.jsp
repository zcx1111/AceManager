<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
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
							<div class="col-md-12 column" >
							<!-- 搜索栏 -->
							<div class="row" style="margin-left:10px;">
								<form role="form" id="check_bill_list" class="form-inline " action="${pageContext.request.contextPath}/finance/list">
									<div class="form-group">
										<input type="text" id="costStartTime" name="billStartDate"  class="form-control" onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'costEndTime\')}'})"
											placeholder="开始时间"	style="width: 100px;"/>-
										<input type="text" id="costEndTime" name="billEndDate" class="form-control" onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'costStartTime\')}'})"
											placeholder="结束时间"	style="width: 100px;"/>
									</div>
									<div class="form-group">
										<select class="form-control" id="transactionObject" name="transactionObject" style="width:110px;">
										<option value="">交易对象</option>
										<option>不限</option>
										<option>租客</option>
										<option>业主</option>
									</select>
									</div>
									<div class="form-group">
										<select class="form-control" id="moneyFlow" name="fundFlow" style="width:110px;">
										<option value="">资金流向</option>
										<option value="">不限</option>
										<option>收入</option>
										<option>支出</option>
									</select>
									</div>
									<div class="form-group">
										<select class="form-control" id="transactionMode" name="paymentMethod" style="width:110px;">
											<option value="">交易方式</option>
											<option>支付宝</option>
									        <option>滴答付</option>
									        <option>微信</option>
									        <option>现金</option>
									        <option>转账</option>
									        <option>系统标记为已支付</option>
									        <option>线下POS</option>
									        <option>水滴金融</option>
									        <option>连连支付</option>
									        <option>其他</option>
										</select>
									</div>
									<div class="form-group">
										<div class="input-group">
											<input type="text" class="form-control" id="check" name="roomName" placeholder="房间信息、交易对象姓名">
											<span class="input-group-btn" >
												<button class="btn btn-default onclick_reset" onclick="getListBill(1)" type="button">
													<i class="glyphicon glyphicon-search"></i></button> 
											</span>
										</div>
									</div>
									<div class="form-group">
										<button type="reset" onclick="resetFun()" class="btn">重置</button>
									</div>
									<div class="form-group pull-right">
										<button type="reset" onclick="execl();" class="btn btn-info">导出报表</button>
									</div>
								</form>
								<hr>
							</div>

							<!-- 统计栏 -->
							<div class=" row" style="margin-left:20px;">
								<div class="col-md-3 col-sm-3 col-xs-6">
									<a data-toggle="tooltip" title="" class="well top-block"
										href="#" data-original-title="6 new members.">
										<div>收入金额（元）</div>
										<div><span style="color:green;font-size: 20px;">${income }</span></div> </a>
								</div>

								<div class="col-md-3 col-sm-3 col-xs-6">
									<a data-toggle="tooltip" title="" class="well top-block"
										href="#" data-original-title="4 new pro members.">
										<div>支出金额（元）</div>
										<div><span style="color:red;font-size: 20px;">${payment }</span></div> </a>
								</div>

								<div class="col-md-3 col-sm-3 col-xs-6">
									<a data-toggle="tooltip" title="" class="well top-block"
										href="#" data-original-title="$34 new sales.">
										<div>收入支出差（元）</div>
										<div><span style="color:#CD853F;font-size: 20px;">${exposure }</span></div> </a>
								</div>
								
							</div>
							<!-- <hr> -->
							<div class="box-content">
									<!-- 收支流水 -->
									
									<table id="finance_table"
										class="table table-striped table-bordered table-hover responsive">
										<thead>
											<tr style="background-color: aquamarine ">
												<th>交易日期</th>
												<th>交易编号</th>
												<th>房间信息</th>
												<th>交易对象</th>
												<th>交易对象姓名</th>
												<th>交易方式</th>
												<th>资金流向</th>
												<th>费用金额</th>
											</tr>
										</thead>
										<tbody id="tbody_billList">
										<!-- 加载收支流水列表 -->
										</tbody>
									</table>

									<div id="page_num" style="font-weight: bold;"><!-- 加载分页信息 --></div>
									<!-- end 收支流水 -->

									<center>
								<ul style="text-align:center;" class="pagination" id="pagination_page">
									<!-- 加载分页 -->
								</ul>
									</center>

							</div>
							</div>
						</div>
					</div>
		</div>
		<!--/row-->
    <!-- content ends -->
    </div><!--/#content.col-md-0-->
</div><!--/fluid-row-->

   

    <hr>
    <!-- 模态框 -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">

		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h3>交易详情 </h3>
				</div>
				<div class="modal-body">
					<table>
						<tbody>
							<tr>
								<td>交易编号</td>
								<td> <span id=billId></span></td>
							</tr>
							<tr>
								<td>交易房间</td>
								<td> <span id=roomName></span></td>
							</tr>
							<tr>
								<td>交易对象</td>
								<td> <span id=transactionObject-detail></span></td>
							</tr>
							<tr>
								<td>交易对象姓名</td>
								<td> <span id=transactionObjectName></span></td>
							</tr>
							<tr>
								<td>交易日期</td>
								<td> <span id=actualTransactionDate></span></td>
							</tr>
							<tr>
								<td>资金流向</td>
								<td> <span id=fundFlow></span></td>
							</tr>
							<tr>
								<td>交易流水号</td>
								<td> <span id=batch></span></td>
							</tr>
							<tr>
								<td>交易金额</td>
								<td> <span id=totalMoney></span>元</td>
							</tr>
							<tr>
								<td>其中:</td>
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
      	<script src="${pageContext.request.contextPath}/statics/localjs/finance.js"></script>
