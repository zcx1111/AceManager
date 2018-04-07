<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../common/head.jsp"%>
<style>
.table-hover th{
	text-align:center;
	vertical-align: middle;
}
.table-hover td{
	text-align:center; 
	vertical-align: middle;
}
.table-hover tbody tr td{
	font-size: 8px;
	color: #a38e76;
}
</style>
<div class="box col-lg-10 col-sm-10 ">
<!-- 面包屑导航 -->
<%--<div>
	<ul class="breadcrumb">
		<li><a href="#">报表</a></li>
		<li><a href="#">营业明细</a></li>
		<li><a href="#">收入明细</a></li>
	</ul>
</div>
--%><!-- 营业明细_收入明细     start-->
<div class="row">
	<div class="box col-md-12">
		<div class="box-inner">
			<div class="box-content row">
				<div class="col-lg-12 col-md-12" >
					<div class="col-md-12 form-inline">
						<!-- 费用类型 -->
						<select class="form-control" id="">
							<option>费用类型</option>
							<option>不限</option>
							<option>房租</option>
							<option>杂费</option>
						</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 费用名称 -->
						<select class="form-control" id="">
							<option>费用名称</option>
							<option>不限</option>
							<option>水费</option>
							<option>电费</option>
							<option>天然气费</option>
							<option>物业费</option>
						</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 支付方式 -->
						<select class="form-control" id="">
							<option>支付方式</option>
							<option>不限</option>
							<option>支付宝</option>
							<option>微信</option>
							<option>QQ钱包</option>
							<option>银行转账</option>				
						</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 支出类型 -->
						<select class="form-control" id="">
							<option>支出类型</option>
							<option>不限</option>
							<option>托管合同支出</option>
							<option>退组结算</option>
						</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 起始截止时间 -->
						<input type="text" class="form-control Wdate" id="startTime" placeholder="开始时间" style="width: 118px"
						name="startTime" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" /> &nbsp;-&nbsp;
						<input type="text" class="form-control Wdate" id="endTime" name="endTime" placeholder="结束时间" style="width: 118px"
						onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 两个按钮 -->
						<button type="button" class="btn btn-info">重置</button>
						<button type="button" class="btn btn-info" style="margin-left: 60px">导出报表</button>
					</div>
					<br><br><hr>
			<h4 style="color: orange;font-weight: bold;">云梦山庄收入明细报表</h4>					
			<table class="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th>日期</th>
						<th>收款人</th>
						<th>人员类型</th>
						<th>交易信息</th>
						<th>支付方式</th>
						<th>收入类型</th>
						<th>费用类型</th>
						<th>费用名称</th>
						<th>账单周期</th>
						<th>费用金额</th>
						<th>备注</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>2017.06.30 00:00:00</td>
						<td>Simon</td>
						<td>业主</td>
						<td>樟盛苑11栋3单元3楼444室</td>
						<td>支付宝</td>
						<td>托管合同</td>
						<td>房租</td>
						<td>租金</td>
						<td>2017.03.01-2017.08.31</td>
						<td>-18000</td>
						<td>暂无</td>
					</tr>
					<tr>
						<td>2017.06.30 00:00:00</td><td>Simon</td><td>业主</td><td>樟盛苑11栋3单元3楼444室</td><td>支付宝</td>
						<td>托管合同</td><td>房租</td><td>租金</td><td>2017.03.01-2017.08.31</td><td>-18000</td><td>暂无</td>
					</tr>
					<tr>
						<td>2017.06.30 00:00:00</td><td>Simon</td><td>业主</td><td>樟盛苑11栋3单元3楼444室</td><td>支付宝</td>
						<td>托管合同</td><td>房租</td><td>租金</td><td>2017.03.01-2017.08.31</td><td>-18000</td><td>暂无</td>
					</tr>
					<tr>
						<td>2017.06.30 00:00:00</td><td>Simon</td><td>业主</td><td>樟盛苑11栋3单元3楼444室</td><td>支付宝</td>
						<td>托管合同</td><td>房租</td><td>租金</td><td>2017.03.01-2017.08.31</td><td>-18000</td><td>暂无</td>
					</tr>
					<tr>
						<td>2017.06.30 00:00:00</td><td>Simon</td><td>业主</td><td>樟盛苑11栋3单元3楼444室</td><td>支付宝</td>
						<td>托管合同</td><td>房租</td><td>租金</td><td>2017.03.01-2017.08.31</td><td>-18000</td><td>暂无</td>
					</tr>
				</tbody>
			</table>					
			<!-- 翻页条 -->
			<center>
				<ul class="pagination pagination-centered">
					<li><a href="#">上一页</a></li>
					<li><a href="#">1</a></li>
					<li><a href="#">2</a></li>
					<li class="active"><a href="#">3</a></li>
					<li><a href="#">4</a></li>
					<li><a href="#">5</a></li>
					<li><a href="#">下一页</a></li>
				</ul>
			</center>
				</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 营业明细_收入明细     end-->
<%@include file="../common/foot.jsp"%>