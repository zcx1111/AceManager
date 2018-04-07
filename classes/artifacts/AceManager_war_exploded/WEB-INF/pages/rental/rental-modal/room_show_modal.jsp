<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/7/10
  Time: 11:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div class="modal fade bs-example-modal-lg" id="roomShowModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">
					<span name="communityName"></span>
					<small name="houseAddress"></small>
				</h4>
				房间状态：	<span class="text-info" name="roomStatus"></span>
			</div>
			<div class="modal-body">
				<!--TODO 做成hidden-->
				房间号:
				<input type="text" readonly="readonly" name="room-id">
				房源号:
				<input type="text" readonly="readonly" name="house-id">
				小区号:
				<input type="text" name="CID" value=""/>
				<ul class="nav nav-pills nav-tabs" id="roomTab">
					<li class="active"><a href="#room-info-div" name="room_detail">房间详情</a></li>
					<li><a href="#renter-contract-div" class="need-attr-room-id need-attr-house-id"   name="rent_contract">租房合同</a></li>
					<li><a href="#renter-bill-div" class="need-attr-room-id need-attr-house-id" name="tenant">租客账单</a></li>
				</ul>
				<div id="roomTabContent" class="tab-content">
					<!-- 房间信息start -->
					<div class="tab-pane active" id="room-info-div">
						<div class="row">
							<div class="col-md-6">
							</div>
							<div class="text-right col-md-6">
								<br>
								<button class="btn btn-info" id="room-edit">编辑</button>
								<button class="btn btn-danger" data-toggle="modal" data-target="#delRoomModal">删除</button>
							</div>
						</div>
					<form action="#" method="post" id="modifyRoomForm">
						<input type="hidden" name="id" value="">
						<table>
							<tr>
								<td><h4 class="text-info"><strong>房间信息</strong></h4></td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>房间名称：</td>
								<td><input type="text" class="form-control" readonly="readonly" name="roomName" value=""></td>
							</tr>
							<tr class="rentStation">
								<td><h4 class="text-info"><strong>出租情况</strong></h4></td>
								<td>&nbsp;</td>
							</tr>
							<tr class="rentStation">
								<td>租客：</td>
								<td><span name="clienteleName"></span></td>
							</tr>
							<tr class="rentStation">
								<td>实际入住周期：</td>
								<td>
									<span name="startDate"></span>&nbsp;~&nbsp;<span name="endDate"></span>
								</td>
							</tr>
							<tr class="rentStation">
								<td>租房状态：</td>
								<td>
									<span name="rommStatus"></span>
								</td>
							</tr>
							<tr>
								<td><h4 class="text-info"><strong>房间备注</strong></h4></td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>房间备注：</td>
								<td>
									<textarea class="form-control" name="remark" value="" readonly="readonly" cols="50" rows="3"></textarea>
								</td>
							</tr>
						</table>
					</form>
					</div>
					<!-- 房间信息end -->
					<!-- 租房合同start -->
					<div class="tab-pane" id="renter-contract-div">

					</div>
					<!-- 租房合同end -->
					<!-- 租客账单start -->
					<div class="tab-pane" id="renter-bill-div">
						<div class="text-right">
							<button class="btn btn-default" id="addBill_room" data-target="#addBillModal" data-toggle="modal" data-room-id="">添加账单</button>
						</div>
						<strong>待处理账单:</strong>
						<table class="table table-bordered table-hover">
							<tr>
								<th>账单周期</th>
								<th>账单状态</th>
								<th>账单金额</th>
								<th>应收款日期</th>
								<th>操作</th>
							</tr>
							<tbody id="tbody_pending_room"></tbody>
						</table>
						<strong>未来账单:</strong>
						<table class="table table-bordered table-hover">
							<tr>
								<th>账单周期</th>
								<th>账单金额</th>
								<th>应收款日期</th>
								<th>操作</th>
							</tr>
							<tbody id="future_room"></tbody>
						</table>
						<strong>已处理账单</strong>
						<table class="table table-bordered table-hover">
							<tr>
								<th>账单周期</th>
								<th>账单金额</th>
								<th>实收租日期</th>
								<th>操作</th>
							</tr>
							<tbody id="manage_room"></tbody>
						</table>
					</div>
					<!-- 租客账单end -->
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
			</div>
		</div>
	</div>
</div>
