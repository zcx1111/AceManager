<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!-- 增加业务单模态框（insert_order_modal） -->
	<div class="modal fade bs-example-modal-lg" id="insert_order_modal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">添加业务单</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" role="form" id="insertOrderFrom">
						<table>
							<tr>
								<td class="col-sm-2 control-label">客户姓名:</td>
								<td class="col-sm-4">
									<input class="form-control" placeholder="请输入客户姓名" name="customerName">
								</td>
								<td class="col-sm-2 control-label">性别:</td>
								<td class="col-sm-4">
									<select class="form-control" name="customerGender">
										<option value="" disabled selected hidden>请选择性别</option>
										<option value="0">男</option>
										<option value="1">女</option>
										<option value="1">未知</option>
									</select>
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">联系方式:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请输入联系方式" class="form-control" name="customerPhone" />
								</td>
								<td class="col-sm-2 control-label">来源:</td>
								<td class="col-sm-4">
									<select class="form-control" name="source">
										<option value="" disabled selected hidden>请选择客户来源</option>
										<option value="1">58同城</option>
										<option value="2">赶集网</option>
									</select>
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">紧急程度:</td>
								<td class="col-sm-4">
									<select class="form-control" name="engency">
										<option value="" disabled selected hidden>请选择紧急程度</option>
										<option value="1">紧急</option>
										<option value="2">正常</option>
										<option value="3">延后</option>
									</select>
								</td>
								<td class="col-sm-2 control-label">入住时间:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请选择入住时间" name="houseTime"
										style="ime-mode: disabled" class="Wdate form-control" 
										onkeypress="noPermitInput(event)"
										onClick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:new Date()})" />
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">地段需求:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请输入地段" class=" form-control"  name="bookArea" />
								</td>
								<td class="col-sm-2 control-label">户型:</td>
								<td class="col-sm-4">
									<select class="form-control" name="houseType" >
										<option value="" disabled selected hidden>请选择户型</option>
										<option value="1">合住主卧</option>
										<option value="2">合住单间独卫</option>
										<option value="3">合住单间</option>
										<option value="4">整租1室户</option>
										<option value="5">整租2室户</option>
									</select>
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">最大月租金:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请输入最大月租金" class="form-control" value=""
										 id="insert_maxMoney" name="maxMoney"/>
								</td>
								<td class="col-sm-2 control-label">最小月租金:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请输入最小月租金" class="form-control" value="" 
										id="insert_minMoney" name="minMoney" />
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">预约日期:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请选择预约日期" id="bookTime_ymd" 
										onkeypress="noPermitInput(event)" class="Wdate form-control"
										onClick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:new Date()})"/>
								</td>
								<td class="col-sm-2 control-label">预约时间:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请选择预约时间"  id="bookTime_hms" 
										onkeypress="noPermitInput(event)" class="Wdate form-control"  
										onClick="WdatePicker({dateFmt:' HH:mm:ss',minDate:'9:00:00',maxDate:'17:30:00'})" />
								<input type="hidden" name="bookTimeStr" id="bookTimeStr">
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">租期:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请输入租期" class="form-control" name="houseMonth" />
								</td>
								
								<td class="col-sm-2 control-label">人数:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请输入住人数" class="form-control" name="customerPeople"/>
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">备注:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请添加备注" class="form-control" name="remarks" />
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="order_insert">增加</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
</body>
</html>