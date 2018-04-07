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
		<li><a href="#">房源统计报表</a></li>
	</ul>
</div>
--%><!-- 房源统计报表     start-->
<div class="row">
	<div class="box col-md-12">
		<div class="box-inner">
			<div class="box-content row">
				<div class="col-lg-12 col-md-12" >
					<div class="col-md-12 form-inline">
						<!-- 开始截止时间 -->
						<input type="text" class="form-control Wdate" id="startTime" placeholder="录入时间" style="width: 118px"
						name="startTime" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" /> &nbsp;-&nbsp;
						<input type="text" class="form-control Wdate" id="endTime" name="endTime" placeholder="截止时间" style="width: 118px"
						onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- 是否录入 -->
						<select class="form-control" id="">
							<option>业主合同</option>
							<option>不限</option>
							<option>已录入</option>
							<option>未录入</option>
						</select>&nbsp;&nbsp;&nbsp;&nbsp;					
						<!-- 两个按钮 -->
						<button type="button" class="btn btn-info">重置</button>
						<button type="button" class="btn btn-info" style="margin-left: 470px">导出报表</button>
					</div>
					<br><br><hr>
			<span style="color: orange;font-weight: bold;font-size: 22px">云梦山庄房源统计列表</span>&nbsp;&nbsp;
			<span style="color:black;font-size: 9px;">房源数：<span style="color: blue;">127</span>套&nbsp;&nbsp;
													     房间数：<span style="color: blue;">10</span>人</span>
			<table class="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th>录入时间</th>
						<th>业主合同</th>
						<th>城市</th>
						<th>区域</th>
						<th>板块</th>
						<th>小区</th>
						<th>门牌号</th>
						<th>出租方式</th>
						<th>房间数</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>2016.10.19</td>
						<td>已录入</td>
						<td>上海</td>
						<td>虹口</td>
						<td>临平路</td>
						<td>1933老场坊</td>
						<td>1933老场坊1栋1楼1号</td>
						<td>合租</td>
						<td>122</td>
					</tr>
					<tr>
						<td>2016.10.19</td><td>已录入</td><td>上海</td><td>虹口</td>
						<td>临平路</td><td>1933老场坊</td><td>1933老场坊1栋1楼1号</td><td>合租</td><td>122</td>
					</tr>
					<tr>
						<td>2016.10.19</td><td>已录入</td><td>上海</td><td>虹口</td>
						<td>临平路</td><td>1933老场坊</td><td>1933老场坊1栋1楼1号</td><td>合租</td><td>122</td>
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
<!-- 房源统计报表     end-->
<%@include file="../common/foot.jsp"%>