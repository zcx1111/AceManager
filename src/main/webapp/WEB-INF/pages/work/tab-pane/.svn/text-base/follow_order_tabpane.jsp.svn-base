<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div class="tab-pane" id="follow">
	<div class="row">
		<div class="col-md-2 col-sm-3 col-xs-6">
			<a data-toggle="tooltip" title="" class="well top-block">
				<div>当前租客</div>
				<div class="font blue" id="follow_count"></div>
			</a>
		</div>
		<div class="col-md-2 col-sm-3 col-xs-6">
			<a data-toggle="tooltip" title="" class="well top-block">
				<div>待处理</div>
				<div class="font red" id="follow_count_todo"></div>
			</a>
		</div>
		<div class="col-md-2 col-sm-3 col-xs-6">
			<a class="well top-block">
				<div>已去电</div>
				<div class="font yellow" id="follow_count_called"></div>
			</a>
		</div>
		<div class="col-md-2 col-sm-3 col-xs-6">
			<a class="well top-block">
				<div>已带看</div>
				<div class="font yellow" id="follow_count_seen"></div>
			</a>
		</div>
		<div class="col-md-2 col-sm-3 col-xs-6">
			<a data-toggle="tooltip" title="" class="well top-block">
				<div>推迟</div>
				<div class="font green" id="follow_count_delay"></div>
			</a>
		</div>
	</div>

	<div class="row">
		<div class="col-md-2">
			<select class="form-control" id="follow_source">
				<option value="" disabled selected hidden>来源</option>
				<option value="">不限</option>
				<option value="1">58同城</option>
				<option value="2">赶集网</option>
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control" id="follow_engency">
				<option value="" disabled selected hidden>紧急状态</option>
				<option value="">不限</option>
				<option value="1">紧急</option>
				<option value="2">正常</option>
				<option value="3">延迟</option>
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control" id="follow_status">
				<option value="" disabled selected hidden>业务单进度</option>
				<option value="">不限</option>
				<option value="2">待处理</option>
				<option value="3">已去电</option>
				<option value="4">已带看</option>
				<option value="5">推迟</option>
			</select>
		</div>
		<div class="col-md-2">
			<input type="text" placeholder="开始时间" class="Wdate form-control"
				id="follow_start_time" 
				style="ime-mode: disabled" onkeypress="noPermitInput(event)"
				onClick="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'follow_end_time\')}'})" 
				size="21" value="" />
		</div>
		<div class="col-md-2">
			<input type="text" placeholder="结束时间" class="Wdate form-control"
				id="follow_end_time" 
				style="ime-mode: disabled" onkeypress="noPermitInput(event)"
				onClick="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'follow_start_time\')}'})" 
				size="21" value="" />
		</div>
		<div class="form-group has-success col-md-1">
			<input type="text" class="form-control" id="follow_searchStr"
				placeholder="搜索">
		</div>
		<div class="form-group has-success col-md-1">
			<button class="btn btn-success" id="follow_search">搜索</button>
		</div>
	</div>
	<div id="searchDetail">
		<table border="0" >
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
			<tbody id="follow_tbody">
			</tbody>
		</table>
		<!--分页-->
		<div>
			<ul class="pagination" id="follow_pageul">
			</ul>
		</div>
	</div>
</div>