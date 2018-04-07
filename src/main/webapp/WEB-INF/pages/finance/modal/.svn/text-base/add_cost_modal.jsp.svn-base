<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>

<div class="modal fade" id="myModal_create" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">

		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h3>添加明细</h3>
				</div>
				
				<div class="modal-body">
					<form class="form-horizontal" id="detail1" role="form" >
						<div class="col-sm-6">
							<div class="form-group">
								<label >流水类型</label>
								 <select class="form-control" style="width:240px;" id="flowType2" name="bill.fundFlow">
									<option>收入</option>
									<option>支出</option>
								</select>
							</div>
							<div class="form-group" >
								<label >房源名称 <span style="color: red" id="housingName1"></span></label>
                                <select class="form-control" onchange="addCostRoom(this);" style="width:240px;" id="housingName2"></select>
							</div>
							<div class="form-group">
								<label >费用名称 </label>
								 <select class="form-control" style="width:240px;" id="costName2" name="costName">
									<option>租金</option>
									<option>押金</option>
									<option>水费</option>
									<option>电费</option>
									<option>燃气费</option>
									<option>物业费</option>
									<option>服务费</option>
									<option>维修费</option>
									<option>保洁费</option>
									<option>材料费</option>
									<option>有线电视</option>
									<option>宽带</option>
									<option>卫生</option>
									<option>其他</option>
							</select>
							</div>
							<div class="form-group">
								<label >交易时间 <span style="color: red" id="transactionTime1"></span></label>
								<input type="text"  class="form-control" onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd'})"
										id="transactionTime2" name="bill.actualTransactionDate"	placeholder="请输入交易时间"	style="width:240px;"/>
							</div>
							<div class="form-group">
								<label >支付流水号</label>
								<input type="text" class="form-control" id="batch2" name="bill.batch" style="width:240px;"
									placeholder="请输入支付流水号">
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label >收款人/付款人<span style="color: red" id="transactionObjectName1"></span></label>
									<input type="text" class="form-control" name="bill.transactionObjectName" id="transactionObjectName2" style="width:240px;"
										placeholder="请输入收款人/付款人姓名">
							</div>
							<div class="form-group">
								<label >房间名称  <span style="color: red" id="roomName1"></span></label>
								<select class="form-control"  style="width:240px;" id="transactionRoom2" name="bill.rentalRoomId"></select>
							</div>
							<div class="form-group">
								<label >费用金额 <span style="color: red" id="cost1"></span></label>
									<input type="text" class="form-control" id="feeAmount2"  style="width:240px;"
										placeholder="请输入费用金额">
								<input type="text" style="display: none;" class="form-control" id="feeAmount_add_cost" name="feeAmount" value=""/>
						</div>
							<div class="form-group">
								<label >支付方式</label>
									<select class="form-control" style="width:240px;" name="bill.paymentMethod">
                                        <option>支付宝</option>
                                        <option>滴答付</option>
                                        <option>微信</option>
                                        <option>现金</option>
                                        <option>转账</option>
                                        <option>线下POS</option>
                                        <option>水滴金融</option>
                                        <option>连连支付</option>
                                        <option>其他</option>
									</select>
							</div>
						</div>

						<div class="form-group col-sm-12">
							<label >流水备注</label>
							 <textarea class="form-control" rows="3" name="bill.billNote" placeholder="请输入流水备注"></textarea>
						</div>

						<div class="form-group " >
							<div class="col-sm-offset-10 col-sm-2">
								<button type="button" class="btn btn-default" onclick="addCost();" >提交</button>
							</div>
						</div>
					</form>
					
				</div>
				
				<div class="modal-footer">
					<a href="#" class="btn btn-default" data-dismiss="modal">Close</a>
				</div>
			</div>
		</div>
	</div>
