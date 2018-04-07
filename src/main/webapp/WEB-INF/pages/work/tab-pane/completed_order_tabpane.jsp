<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<div class="tab-pane" id="completed">
	<div class="row">
		<div class="col-md-2 col-sm-3 col-xs-6">
			<a data-toggle="tooltip" title="" class="well top-block">
				<div>当前租客</div>
				<div class="font blue"  id="completed_count"></div>
			</a>
		</div>
		<div class="col-md-2 col-sm-3 col-xs-6">
			<a data-toggle="tooltip" title="" class="well top-block">
				<div>无效</div>
				<div class="font red" id="completed_count_invalid">18</div>
			</a>
		</div>
		<div class="col-md-2 col-sm-3 col-xs-6">
			<a class="well top-block">
				<div>已签约</div>
				<div class="font yellow" id="completed_count_deal">13320</div>
			</a>
		</div>
	</div>

	<div class="row">
		<div class="col-md-2">
			<select class="form-control" id="completed_source">
				<option value="" disabled selected hidden>来源</option>
				<option value="">不限</option>
				<option value="1">58同城</option>
				<option value="2">赶集网</option>
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control" id="completed_status">
				<option value="" disabled selected hidden>业务单进度</option>
				<option value="">不限</option>
				<option value="6">无效</option>
				<option value="7">已签约</option>
			</select>
		</div>
		<div class="col-md-2">
			<input type="text" placeholder="开始时间" class="Wdate form-control"
				id="completed_start_time" 
				style="ime-mode: disabled" onkeypress="noPermitInput(event)"
				onClick="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'completed_end_time\')}'})" 
				size="21" value="" />
		</div>
		<div class="col-md-2">
			<input type="text" placeholder="结束时间" class="Wdate form-control"
				id="completed_end_time" 
				style="ime-mode: disabled" onkeypress="noPermitInput(event)"
				onClick="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'completed_start_time\')}'})" 
				size="21" value="" />
		</div>
		<div class="form-group has-success col-md-2">
			<input type="text" class="form-control" id="completed_searchStr"
				placeholder="输入搜索内容">
		</div>
		<div class="form-group has-success col-md-2">
			<button class="btn btn-success" id="completed_search">搜索</button>
		</div>
	</div>
		<div id="searchDetail">
		<table border="0">
			<!--表头-->
			<thead>
				<tr>
					<th class="table-top">跟进时间</th>
					<th>来源</th>
					<th>姓名</th>
					<th>联系方式</th>
					<th>预约时间</th>
					<th>预约区域</th>
					<th>入住时间</th>
					<th>价格</th>
					<th>租期</th>
					<th>人数</th>
					<th>户型</th>
					<th>进度</th>
					<th>处理人</th>
				</tr>
			</thead>
			<!--表格体-->
			<tbody id="completed_tbody">
			</tbody>
		</table>
		<!--分页-->
		<div>
			<ul class="pagination" id="completed_pageul">
			</ul>
		</div>
	</div>
</div>