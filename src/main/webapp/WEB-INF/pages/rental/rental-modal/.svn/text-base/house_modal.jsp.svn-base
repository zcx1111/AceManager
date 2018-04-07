<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/7/10
  Time: 11:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>


<div class="modal fade bs-example-modal-lg" id="houseModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="houseModalLabel">
                	[<span name="house-id"></span>]
                    <strong name="communityName"></strong>
                    <small name="commAddress"></small>
                </h4>
                
            </div>
            <div class="modal-body">
                <strong style="font-size: large" name="communityAddress"></strong>
                <br>
                租房方式：<span class="text-info" name="rental_type"></span> | 房间间数：<span class="text-info" name="roomCount"></span> 间 | 已租间数：<span
                    class="text-info" name="onRentCount"></span> 间 &nbsp;&nbsp;&nbsp;
                    <strong style="color: red;" name="isDisable"></strong>
                <hr>


                <ul class="nav nav-pills nav-tabs " id="houseTab">
                    <li class="active"><a href="#house-resource-info-div" name="house_detail" class="need-attr-house-id">房源详情</a></li>
                    <li><a href="#owner-contract-div" name="custody_contract" class="need-attr-house-id">托管合同</a></li>
                    <li><a href="#owner-bill-div" name="rental_bill" class="need-attr-house-id">业主账单</a></li>
                </ul>
                <div id="houseTabContent" class="tab-content">
                    <!-- 房屋信息start -->
	                    <div class="tab-pane active" id="house-resource-info-div">
	                        <div class="text-right">
	                            <br>
	                            <button class="need-attr-house-id btn btn-info" data-toggle="modal" data-target="#addRoomConfirmModal">添加房间</button>
	                            <button id="house-edit" type="button" class="need-attr-house-id btn btn-info">编辑</button>
	                            <button id="disableAndAbleBtn" class="need-attr-house-id" data-toggle="modal" data-target="#disableHouseModal"><!-- ajax动态填充: "停用"/"启用" --></button>
	                            <button class="need-attr-house-id btn btn-danger" data-toggle="modal" data-target="#delHouseModal">删除</button>
	                        </div>
						
						<input type="hidden" name="CID" value=""/>
                		<form action="#" id="modifyHouseDetialFrom" method="post">
                			<!-- 房源主键id -->
                			<input type="hidden" name="id" value=""/>
	                        <h4><strong>房源信息</strong></h4>
	                        <table id="cityAssit">
	                            <tr>
	                                <td style="width: 110px">小区名称：</td>
	                                <td><input type="text" class="form-control my-dis" disabled="true" name="community.communityName" value=""/></td>
	                            </tr>
	                            <tr>
	                                <td>房源信息：</td>
	                                <td id="house-info" name="commAddress"></td>
	                            </tr>
	                            <tr>
	                                <td>出租方式：</td>
	                                <td id="rent-type">
	                                	<select class="form-control my-dis" name="rentalType" disabled="true">
	                                		<option value="整租">整租</option>
	                                		<option value="合租">合租</option>
	                                	</select>
	                                </td>
	                            </tr>
	                            <tr id="house-city">
	                                <td>所在城市：</td>
	                                <td name="city">
	                                	<select class="prov form-control my-dis" name="community.province" disabled="true"></select>
	                                </td>
	                                <td style="width: 300px">
	                                	<select class="city form-control my-dis" name="community.city"></select>
	                                </td>
	                            </tr>
	                            <tr id="house-area">
	                                <td>所在区域：</td>
	                                <td id="house-district" name="area">
	                                	<select class="dist form-control my-dis" name="community.area"></select>
	                                </td>
	                            </tr>
	                            <tr>
	                                <td>小区地址：</td>
	                                <td><input type="text" class="form-control my-dis" disabled="true" name="community.communityAddress"/></td>
	                            </tr>
	                            <tr>
	                                <td>房屋装修中：</td>
	                                <td name="inDecorate">
	                                </td>
	                            </tr>
	                  <!-- 房源是否装修隐藏域 -->
	                  <input type="hidden" name="inRenovation" value="未装修"/>
	                            <tr>
	                            	<td>&nbsp;</td>
									<td style="width: 300px">
										<input type="hidden" id="decorationStartTime" name="decorationStartTime" class="Wdate form-control" 
										onfocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'decorationEndTime\')}'})" 
										placeholder="输入装修开始时间" size="35" value="">
									</td>
									<td>
										<input type="hidden" id="decorationEndTime" name="decorationEndTime" class="Wdate form-control" 
										onfocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'decorationStartTime\')}'})" 
										placeholder="输入装修结束时间" size="35" value="">
									</td>	                                
	                            </tr>
	                        </table>
                            <h4><strong>房间信息</strong></h4>
                            <div style="width: 50%">
                                &nbsp;&nbsp;<span>房间数量：</span>
                                &nbsp;&nbsp;<span id="house-room-count" name="roomCount"></span> 间
                                &nbsp;&nbsp;<div name="roomsList" class="text-info">
                                				<ul style="list-style-type:none; padding-left: 50px">
                                				</ul>
                                			</div>
                            </div>
	                        <h4><strong>房源备注</strong></h4>
	                        <div style="width: 50%;margin-left: 45px">
<%--	                            <input type="text" class="form-control my-dis" disabled="true" name="remark" value=""/>--%>
	                            <textarea rows="4" cols="45" class="form-control my-dis" disabled="true" name="remark" value=""></textarea>
	                        </div>
                        </form>
                    </div>
                    <!-- 房屋信息end -->

                    <!-- 业主合同start -->
                    <div class="tab-pane" id="owner-contract-div">

                    </div>
                    <!-- 业主合同end -->

                    <!-- 业主账单start -->
                    <div class="tab-pane" id="owner-bill-div">
                        <div class="text-right">
                        	<button class="btn btn-default" id="addBill" data-target="#addBillModal" data-toggle="modal" data-house-id="">添加账单</button>
                            <!-- <button type="button"  class="btn btn-link">添加账单</button> -->
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
                            <tbody id="tbody_pending"></tbody>
                            
                        </table>

                        <strong>未来账单:</strong>
                        <table class="table table-bordered table-hover">
                        	
                            <tr>
                                <th>账单周期</th>
                                <th>账单金额</th>
                                <th>应收款日期</th>
                                <th>操作</th>
                            </tr>
                            <tbody id="future"></tbody>
                        </table>

                        <strong>已处理账单:</strong>
                        <table  class="table table-bordered table-hover">
                        	
                            <tr>
                                <th>账单周期</th>
                                <th>账单金额</th>
                                <th>实收租日期</th>
                                <th>操作</th>
                            </tr>
                            <tbody id="manage"></tbody>
                        </table>
                    </div>
                    <!-- 业主账单end -->
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
