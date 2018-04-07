<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../common/head.jsp"%>
<style>
.table-hover thead tr th{
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
		<li><a href="#">业主/租客/房源清单</a></li>
		<li><a href="#">业主清单报表</a></li>
	</ul>
</div>
--%><!-- 业主清单报表     start-->
<div class="row">
	<div class="box col-md-12">
		<div class="box-inner">
			<div class="box-content row">
				<div class="col-lg-12 col-md-12" >
					<div class="col-md-12 form-inline">
						<!-- 开始截止时间 -->
						<input type="text" class="form-control Wdate" id="startTime" placeholder="开始时间" style="width: 118px"
						name="startTime" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" /> &nbsp;-&nbsp;
						<input type="text" class="form-control Wdate" id="endTime" name="endTime" placeholder="结束时间" style="width: 118px"
						onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 合同状态 -->
						<select class="form-control" id="">
							<option>合同状态</option>
							<option>不限</option>
							<option>生效</option>
							<option>正常退租</option>
							<option>提前退租</option>
							<option>已超期</option>
						</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 两个按钮 -->
						<button type="button" class="btn btn-info">重置</button>
						<button type="button" class="btn btn-info" style="margin-left: 470px">导出报表</button>
					</div>
					<br><br><hr>
			<span style="color: orange;font-weight: bold;font-size: 22px">云梦山庄业主列表</span>&nbsp;&nbsp;
			<span style="color:black;font-size: 9px;">所有业主：<span style="color: blue;">34</span>人&nbsp;&nbsp;
													     托管中：<span style="color: blue;">12</span>人</span>
			<table class="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th>序号</th>
						<th>合同状态</th>
						<th>房源信息</th>
						<th>业主姓名</th>
						<th>联系方式</th>
						<th>托管时长</th>
						<th>创建时间</th>
						<th>开始时间</th>
						<th>到期时间</th>
						<th>支付方式</th>
						<th>月租金</th>
						<th>押金</th>
						<th>续租次数</th>
						<th>退租时间</th>
						<th>退租类型</th>
						<th>实际入住周期</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>0</td>
						<td>正常退租</td>
						<td>55555555551栋1单元1楼1号</td>
						<td>123</td>
						<td>暂无</td>
						<td>12月</td>
						<td>2017.06.30 14:39:31</td>
						<td>2017.06.30</td>
						<td>2018.06.29</td>
						<td>押1付1</td>
						<td>111</td>
						<td>111</td>
						<td>&nbsp;</td>
						<td>2018-06-29</td>
						<td>正常退租</td>
						<td>12个月0天</td>
					</tr>
					<tr>
						<td>1</td><td>正常退租</td><td>55555555551栋1单元1楼1号</td><td>123</td><td>暂无</td><td>12月</td>
						<td>2017.06.30 14:39:31</td><td>2017.06.30</td><td>2018.06.29</td><td>押1付1</td><td>111</td>
						<td>111</td><td>&nbsp;</td><td>2018-06-29</td><td>正常退租</td><td>12个月0天</td>
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
<!-- 业主清单报表     end-->
<%@include file="../common/foot.jsp"%>