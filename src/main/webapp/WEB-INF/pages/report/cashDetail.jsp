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
		<li><a href="#">押金明细</a></li>
	</ul>
</div>
--%><!-- 营业明细_押金明细     start-->
<div class="row">
	<div class="box col-md-12">
		<div class="box-inner">
			<div class="box-content row">
				<div class="col-lg-12 col-md-12" >
					<div class="col-md-12 form-inline">
						<!-- 人员类型 -->
						<select class="form-control" id="">
							<option>人员类型</option>
							<option>业主</option>
							<option>租客</option>
							<option>其他</option>
						</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 资金流向 -->
						<select class="form-control" id="">
							<option>资金流向</option>
							<option>不限</option>
							<option>收入</option>
							<option>支出</option>
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
						<!-- 合同类型 -->
						<select class="form-control" id="">
							<option>合同类型</option>
							<option>不限</option>
							<option>托管合同</option>
							<option>租客合同</option>
						</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 开始截止时间 -->
						<input type="text" class="form-control Wdate" id="startTime" placeholder="开始时间" style="width: 118px"
						name="startTime" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" /> &nbsp;-&nbsp;
						<input type="text" class="form-control Wdate" id="endTime" name="endTime" placeholder="结束时间" style="width: 118px"
						onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 两个按钮 -->
						<button type="button" class="btn btn-info">重置</button>
						<button type="button" class="btn btn-info" style="margin-left: 85px">导出报表</button>
					</div>
					<br><br><hr>
			<h4 style="color: orange;font-weight: bold;">云梦山庄押金明细报表</h4>					
			<table class="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th>日期</th>
						<th>交易人</th>
						<th>人员类型</th>
						<th>交易信息</th>
						<th>资金流向</th>
						<th>支付方式</th>
						<th>合同类型</th>
						<th>合同周期</th>
						<th>费用金额</th>
						<th>备注</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>2017.07.13 00:00:00</td>
						<td>Simon</td>
						<td>租客</td>
						<td>223创意园13栋单元3楼3室房间006</td>
						<td>收入</td>
						<td>微信</td>
						<td>租客合同</td>
						<td>2017.06.14-2017.07.13</td>
						<td>500</td>
						<td>备注</td>
					</tr>
					<tr>
						<td>2017.07.13 00:00:00</td><td>Simon</td><td>租客</td><td>223创意园13栋单元3楼3室房间006</td>
						<td>收入</td><td>微信</td><td>租客合同</td><td>2017.06.14-2017.07.13</td><td>500</td><td>备注</td>
					</tr>
						<td>2017.07.13 00:00:00</td><td>Simon</td><td>租客</td><td>223创意园13栋单元3楼3室房间006</td>
						<td>收入</td><td>微信</td><td>租客合同</td><td>2017.06.14-2017.07.13</td><td>500</td><td>备注</td>
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
<!-- 营业明细_押金明细     end-->
<%@include file="../common/foot.jsp"%>