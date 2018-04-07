<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!-- 业务单详情模态框（detail_order_modal）-->
	<div class="modal fade bs-example-modal-lg" id="detail_order_modal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h3 class="text-left" >
						客户详情 -<span id="detail_title" class="font blue"></span>记录
						
						(跟进人： <span id="detail_next_user"></span> 
							     <span id="detail_status" ></span>)
					</h3>
				</div>
				<div class="modal-body">
					<table>
						<tr>
							<td>
								客户姓名:<strong><span id="detail_customer_name"></span></strong></td>
							<td>
								创建时间:<strong><span id="detail_create_time"></span>
								(<span class="color-yellow" id="detail_engency"></span>)
								</strong>
								</td>
						</tr>
						<tr>
							<td>
								客户性别:<strong><span id="detail_customer_gender"></span></strong> 
							</td>
							<td>
								联系方式:<strong><span id="detail_customer_phone"></span></strong>
							</td>
							<td>
								客户来源:<strong><span id="detail_resource"></span></strong></td>
							<td>
								预约时间:<strong><span id="detail_book_time"></span></strong>
							</td>
						</tr>
						<tr>
							<td>
								地段需求:<strong><span id="detail_book_area"></span></strong></td>
							<td>
								入住时间:<strong><span id="detail_check_in_time"></span></strong></td>
							<td>
								期望租金:<strong><span id="detail_max_money"></span>- 
								<span id="detail_min_money"></span></strong></td>
							
						</tr>
						<tr>
							<td>
								租期时长:<strong><span id="detail_rent_month"></span></strong>个月</td>
							<td>
								户型要求:<strong><span id="detail_house_type"></span></strong></td>
							<td>
								租住人数:<strong><span id="detail_rent_people"></span></strong>人</td>
							<td>
								备注:<span id="detail_remarks"></span></td>
						</tr>	
						</table>
						<input type="hidden" id="doOrder_id" value="">
						<input type="hidden" id="doOrder_owner" value="">
						<div class="form-group text-right" id="doOrder">
							
						</div>
						<div class="form-group">
							 <table id="orderHistory">
							 </talbe>
						</div>
					</table>
				</div>
				<div class="modal-footer" id="status_foot">
					<form  class="form-horizontal" role="form"  id="statusOrderForm">
					<input type="hidden" value="" name="id" id="status_id">
					<div class="col-sm-2">
						<select class="form-control" id="status_status" name="status">
						</select>
					</div>
					<div class="col-sm-8">
						<input type="text" class="form-control" placeholder="更新备注信息"
							value="" name="remarks" id="status_remarks">
					</div>
					<div class="col-sm-2">
						<button type="button" class="btn btn-primary" id="status_submit">确定</button>
					</div>
					</form>
				</div>
			</div>
		</div>
	</div>

</body>
</html>