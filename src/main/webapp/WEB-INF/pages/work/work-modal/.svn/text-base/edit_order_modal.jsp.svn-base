<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!-- 业务单编辑模态框（edit_order_Modal） -->
	<div class="modal fade bs-example-modal-lg" id="edit_order_modal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">
						<p class="font green">编辑业务单</p>
					</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" role="form" id="editOrderFrom">
						<table>
							<tr>
								<input type="hidden" id="edit_order_id" name="id" >
								<td class="col-sm-2 control-label">客户姓名:</td>
								<td class="col-sm-4">
									<input class="form-control" id="edit_customername" name="customerName">
								</td>
								<td class="col-sm-2 control-label">性别:</td>
								<td class="col-sm-4">
									<select class="form-control" id="edit_customergender" name="customerGender" >
										<option value="0">男</option>
										<option value="1">女</option>
										<option value="2">未知</option>
									</select>
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">联系方式:</td>
								<td class="col-sm-4">
									<input type="text" id="edit_customerphone" class="form-control" name="customerPhone" />
								</td>
								<td class="col-sm-2 control-label">来源:</td>
								<td class="col-sm-4">
									<select class="form-control" name="source" id="edit_source">
										<option value="1">58同城</option>
										<option value="2">赶集网</option>
									</select>
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">紧急程度:</td>
								<td class="col-sm-4">
									<select class="form-control" name="engency" id="edit_engency">
										<option value="1">紧急</option>
										<option value="2">正常</option>
										<option value="3">延后</option>
									</select>
								</td>
								<td class="col-sm-2 control-label">入住时间:</td>
								<td class="col-sm-4">
									<input type="text" id="edit_houseTime" name="houseTime"
										style="ime-mode: disabled" class="Wdate form-control" 
										onkeypress="noPermitInput(event)"
										onClick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:new Date()})" />
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">地段需求:</td>
								<td class="col-sm-4">
									<input type="text" id="edit_bookArea" class=" form-control"  name="bookArea" />
								</td>
								<td class="col-sm-2 control-label">户型:</td>
								<td class="col-sm-4">
									<select class="form-control" id="edit_houseType" name="houseType">
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
									<input type="text" id="edit_maxMoney" class="form-control" value=""
										 id="insert_maxMoney" name="maxMoney"/>
								</td>
								<td class="col-sm-2 control-label">最小月租金:</td>
								<td class="col-sm-4">
									<input type="text" id="edit_minMoney" class="form-control" value="" 
										id="insert_minMoney" name="minMoney" />
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">预约日期:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请选择预约日期" id="edit_bookTime_ymd" 
										onkeypress="noPermitInput(event)" class="Wdate form-control"
										onClick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:new Date()})"
										value=""/>
								</td>
								<td class="col-sm-2 control-label">预约时间:</td>
								<td class="col-sm-4">
									<input type="text" placeholder="请选择预约时间"  id="edit_bookTime_hms" 
										onkeypress="noPermitInput(event)" class="Wdate form-control"  
										onClick="WdatePicker({dateFmt:' HH:mm:ss',minDate:'9:00:00',maxDate:'17:30:00'})"
										value=""/>
								<input type="hidden" name="bookTimeStr" id="edit_bookTimeStr">
							</tr>
							<tr>
								<td class="col-sm-2 control-label">租期:</td>
								<td class="col-sm-4">
									<input type="text" class="form-control"  id="edit_houseMonth" name="houseMonth" />
								</td>
								
								<td class="col-sm-2 control-label">人数:</td>
								<td class="col-sm-4">
									<input type="text" class="form-control" id="edit_customerPeople"  name="customerPeople"/>
								</td>
							</tr>
							<tr>
								<td class="col-sm-2 control-label">备注:</td>
								<td class="col-sm-4">
									<input type="text"  class="form-control" id="edit_remarks" name="remarks" />
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-warning" id="edit_order_submit">提交</button>
					<button type="button" class="btn btn-info" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>

	<!-- /.modal -->
	</div>

</body>
</html>