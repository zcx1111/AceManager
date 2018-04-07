<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib  uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div class="tab-pane active" id="unallocated">
	<div class="row">
		<div class="col-md-2 col-sm-3 col-xs-6">
			<a data-toggle="tooltip" title="" class="well top-block">
				<div>当前租客</div>
				<div class="font blue" id="unallocated_count">${page.totalCount }</div>
			</a>
		</div>
		<c:forEach var="index" items="${page.count}">
			<div class="col-md-2 col-sm-3 col-xs-6">
			<a data-toggle="tooltip" title="" class="well top-block">
				<c:if test="${index.count_engency==1}">
				<div>紧急</div>
				<div class="font red" id="unallocated_count_quick">${index.count_num}</div>
				</c:if>
				<c:if test="${index.count_engency==2}">
				<div>正常</div>
				<div class="font red" id="unallocated_count_normal">${index.count_num}</div>
				</c:if>
				<c:if test="${index.count_engency==3}">
				<div>延迟</div>
				<div class="font red" id="unallocated_count_slow">${index.count_num}</div>
				</c:if>
			</a>
		</div>
		</c:forEach>
	</div>
	<div class="row" id="search">
		<div class="col-md-2">
			<select class="form-control" id="unallocated_resource">
				<option value="" disabled selected hidden>来源</option>
				<option value="">不限</option>
				<option value="1">58同城</option>
				<option value="2">赶集网</option>
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control" id="unallocated_engency">
				<option value="" disabled selected hidden>紧急状态</option>
				<option value="">不限</option>
				<option value="1">紧急</option>
				<option value="2">正常</option>
				<option value="3">延迟</option>
			</select>
		</div>
		<div class="col-md-2">
			<input type="text" placeholder="开始时间" class="Wdate form-control"
				id="unallocated_startTime" name="endTime"
				style="ime-mode: disabled" onkeypress="noPermitInput(event)"
				onClick="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'unallocated_endTime\')}'})" 
				size="21"/>						
		</div>
		<div class="col-md-2">
			<input type="text" placeholder="结束时间" class="Wdate form-control"
				id="unallocated_endTime" name="endTime"
				style="ime-mode: disabled" onkeypress="noPermitInput(event)"
				onClick="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'unallocated_startTime\')}'})" 
				size="21"/>

		</div>
		<div class="form-group has-success col-md-2">
			<input type="text" class="form-control" id="unallocated_searchStr"
				placeholder="输入搜索内容">
		</div>
		<div class="form-group has-success col-md-2">
			<button class="btn btn-success" id="unallocated_search">搜索</button>
		</div>

	</div>

	<div id="searchDetail">
		<table border="0">
			<!--表头-->
			<thead>
				<tr>
					<th class="table-top">创建时间</th>
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
					<th>处理人</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<!--表格体-->
			<tbody id="unallocated_tbody">
				<c:forEach var="index" items="${page.items}">
					<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px" id="${index.id }">
						<td class="table-top">
							<c:if test="${index.engency==1}">
								<i class="font red glyphicon glyphicon-star"></i>
							</c:if> 
							<c:if test="${index.engency==2}">
								<i class="font yellow glyphicon glyphicon-star"></i>
							</c:if> 
							<c:if test="${index.engency==3}">
								<i class="font green glyphicon glyphicon-star"></i>
							</c:if> 
								<span>
								 <fmt:formatDate value="${index.createTime}" pattern="yyyy/MM/dd  HH:mm:ss" />
							</span>
						</td>
						<td>
						        <c:if test="${index.source==1}">58同城</c:if>
						        <c:if test="${index.source==2}">赶集网</c:if>
						</td>
						<td>${index.customerName }</td>
						<td>${index.customerPhone }</td>
						<td><fmt:formatDate value="${index.bookTime}"
								pattern="yyyy/MM/dd  HH:mm:ss" /></td>
						<td>${index.bookArea }</td>
						<td><fmt:formatDate value="${index.houseTime}"
								pattern="yyyy/MM/dd " /></td>
						<td>${index.maxMoney}-${index.minMoney }</td>
						<td>${index.houseMonth}月</td>
						<td>${index.customerPeople }人</td>
						<td>
							<c:if test="${index.houseType==1}">合住主卧</c:if>
							<c:if test="${index.houseType==2}">合住单间独卫</c:if>
							<c:if test="${index.houseType==3}">合住单间</c:if>
							<c:if test="${index.houseType==4}">整租1室户</c:if>
							<c:if test="${index.houseType==5}">整租2室户</c:if>
						</td>
						<td>
							<c:if test="${index.nextUser!=null}">
								${index.nextUser.name}
							</c:if>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		<!--分页-->
		<div>
			<ul class="pagination" id="unallocated_pageul">	
				<c:if test="${page.totalPageCount>1}" >
					<li><a class="unallocated_min_page" value="1">首页</a></li>
					<c:forEach var="temp" begin="1" step="1" end="${page.totalPageCount}">
						<c:if test="${temp==1}">
							<li class="active"><a class="unallocated_page">${temp}</a></li>
						</c:if>
						<c:if test="${temp>1}">
						<li><a class="unallocated_page" value="${temp}">${temp}</a></li>
						</c:if>
					</c:forEach>
					<li><a class="unallocated_max_page" value="${page.totalPageCount}">尾页</a></li>
				</c:if>
			</ul>
		</div>
	</div>
</div>