<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
						<div class="col-md-12 column" style="margin-left:20px;">
							
							<!-- 搜索栏 -->
							<div class="row" >
								<form role="form" id="check_list_cost" class="form-inline ">
									<div class="form-group">
										  <input type="text" id="costStartTime" name="bill.billStartDate" class="form-control" onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'costEndTime\')}'})"
											placeholder="开始时间"	style="width: 100px;"/>-
										<input type="text" id="costEndTime" name="bill.billEndDate" class="form-control" onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'costStartTime\')}'})"
											placeholder="结束时间"	style="width: 100px;"/>
									</div>
									<div class="form-group">
										<select class="form-control" style="width:110px;"
										 id="moneyFlow" name="bill.fundFlow" >
											<option value="">资金流向</option>
											<option value="">不限</option>
											<option>收入</option>
											<option>支出</option>
										</select>
									</div>
									<div class="form-group">
										<select class="form-control" style="width:110px;" id="costName" name="costName">
											<option value="">费用名称</option>
											<option value="">不限</option>
									        <option>租金</option>
									        <option>押金</option>
									        <option>水费</option>
									        <option>电费</option>
									        <option>燃气费</option>
									        <option>物业费</option>
									        <option>服务费</option>
									        <option>维修费</option>
									        <option>保洁费</option>
									        <option>材料费</option>
									        <option>有线电视</option>
									        <option>宽带</option>
									        <option>卫生</option>
									        <option>其他</option>
									      </ul>
										</select>
									</div>
									<div class="form-group">
										<div class="input-group">
											<input type="text" class="form-control" id="check" name="bill.roomName" placeholder="房间信息、交易对象姓名">
											<span class="input-group-btn" >
												<button class="btn btn-default onclick_reset" onclick="getListCost(1);" type="button">
													<i class="glyphicon glyphicon-search"></i></button>
											</span>
										</div>
									</div>
									<div class="form-group">
										<button type="reset" onclick="resetFun()"  class="btn">重置</button>
									</div>
									<div class="pull-right">
										<div class="form-group">
											<shiro:hasPermission name="finance_flow_add">
											<button type="button" class="btn" data-toggle="modal" data-target="#myModal_create" >添加明细</button>
											</shiro:hasPermission>
										</div>
										<div class="form-group">
											<button type="button" class="btn btn-info" >导出报表</button>
										</div>
									</div>
								</form>
								<hr>
							</div>
							<!-- end 搜索栏 -->
							
							<!-- 统计栏 -->
							<div class=" row" style="margin-left:20px;">
								<div class="col-md-3 col-sm-3 col-xs-6">
									<a data-toggle="tooltip" title="" class="well top-block"
										href="#" >
										<div>收入金额（元）</div>
										<div><span style="color:green;font-size: 20px;">${income }</span></div> </a>
								</div>

								<div class="col-md-3 col-sm-3 col-xs-6">
									<a data-toggle="tooltip" title="" class="well top-block"
										href="#" >
										<div>支出金额（元）</div>
										<div><span style="color:red;font-size: 20px;">${payment }</span></div> </a>
								</div>

								<div class="col-md-3 col-sm-3 col-xs-6">
									<a data-toggle="tooltip" title="" class="well top-block"
										href="#" >
										<div>收入支出差（元）</div>
										<div><span style="color:#CD853F;font-size: 20px;">${exposure }</span></div> </a>
								</div>

							</div>
							<!-- end 统计栏 -->
							
							<div class="box-content">

									<!--获取 流水明细 列表-->
									<table 
										class="table table-striped table-bordered table-hover responsive">
										<thead>
											<tr style="background-color: aquamarine ">
												<th>交易日期</th>
												<th>房间信息</th>
												<th>交易对象姓名</th>
												<th>费用名称</th>
												<th>费用周期</th>
												<th>资金流向</th>
												<th>费用金额</th>
											</tr>
										</thead>
										<tbody id="tbody_costList">
											
											<!-- flowDetail 流水明细 -->

											<!-- end flowDetail 流水明细 -->
										</tbody>
									</table>
								<div id="page_num" style="font-weight: bold;"><!-- 加载分页信息 --></div>
								<!-- end 流水明细 -->
								<center>
									<ul style="text-align:center;" class="pagination" id="pagination_page">
										<!-- 加载分页 -->
									</ul>
								</center>
							</div>
						</div>
						<!-- end 主体栏 -->
				</div>
			</div>
		</div>
		<!--/row-->
    <!-- content ends -->
    <!--/#content.col-md-0-->
<!--/fluid-row-->

   

    <hr>
    <!-- 明细详情 模态框 -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">

		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h3>明细详情 
						<span class="text-info" name="payment-id"></span>
						<shiro:hasPermission name="finance_flow_del">
						<button type="button" class="pull-right" id="butDel" data-toggle="modal" data-target="#myModal-del" data-payment-id="">删除</button>
						</shiro:hasPermission>
					</h3>
				</div>
				<div class="modal-body">
					<table>
					<tbody>
						<tr>
							<td>交易房间</td>
							<td> <span id=transactionRoom></span></td>
						</tr>
						<tr>
							<td>交易对象姓名</td>
							<td> <span id=transactionObjectName></span></td>
						</tr>
						<tr>
							<td>交易日期</td>
							<td> <span id=transactionTime></span></td>
						</tr>
						<tr>
							<td>流水备注</td>
							<td> <span id=flowMemo-detail></span></td>
						</tr>
						<tr>
							<td>费用名称</td>
							<td> <span id=costNameModal></span></td>
						</tr>
						<tr>
							<td>资金流向</td>
							<td> <span id=moneyFlowModal></span></td>
						</tr>
						<tr>
							<td>交易金额</td>
							<td> <span id=feeAmount></span>元</td>
						</tr>
						<tr>
							<td>支付方式</td>
							<td> <span id=paymentMethod></span></td>
						</tr>
						<tr>
							<td>交易流水号</td>
							<td> <span id=batch></span></td>
						</tr>
					</tbody>
				</table>
				</div>
				<div class="modal-footer">
					<a href="#" class="btn btn-default" data-dismiss="modal">Close</a>
				</div>
			</div>
		</div>
	</div>
	<!-- end 明细详情 模态框 -->
	
	<!-- 删除明细 -->
	<div class="modal fade" id="myModal-del" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">

		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h3>明细详情  <span class="text-info" id="paymentDelId" name="paymentid"></span></h3>
				</div>
				<div class="modal-body">
					<h3>确认删除明细,删除后不可恢复</h3>
				</div>
				<div class="modal-footer">
					<a href="#" class="btn btn-default" data-dismiss="modal">Close</a>
					<a href="#" class="btn btn-default" onclick="del()">是</a>
				</div>
			</div>
		</div>
	</div>
	<!-- end 删除明细 -->
	
	<!-- 创建明细模态框 -->
	<%@include file="modal/add_cost_modal.jsp" %>
	<!--end 创建明细模态框 -->
    

 	<%@include file="../common/foot.jsp"%>
    <script src="${pageContext.request.contextPath}/statics/localjs/finance_payment.js"></script>