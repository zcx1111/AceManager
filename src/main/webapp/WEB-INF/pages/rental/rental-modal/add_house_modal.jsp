<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/7/10
  Time: 11:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<div class="modal fade bs-example-modal-lg" id="addHouseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h3>添加房源</h3>
			</div>
			<div class="modal-body">
				<form action="#" method="post" id="addHouseForm">
					<table>
						<tr id="house_city_form">
							<td class="text-info" style="width: 90px">选择小区所在城市</td>
							<td><select class="prov form-control" name="community.province"></select></td>
							<td><select class="city form-control" name="community.city" disabled="disabled"></select></td>
							<td><select class="dist form-control" name="community.area" disabled="disabled"></select></td>
						</tr>
						<tr>
							<td class="text-info">小区名称</td>
<%--							<td colspan="2"><input type="text" name="community.communityName" class="form-control"></td>--%>
							<td colspan="2">
								<input list="comms" class="form-control" id="test67" name="community.communityName"/>
								<datalist id="comms"><!-- ajax后台动态填充已添加过的小区名称 --></datalist>
							</td>
						</tr>
						<tr>
							<td class="text-info">小区地址</td>
							<td colspan="2"><input type="text" name="community.communityAddress" class="form-control"></td>
						</tr>
						<tr>
							<td class="text-info">房源地址</td>
							<td>
								<div class=" input-group">
									<input class="form-control" name="building" type="text"> <span class="input-group-addon">栋/号</span>
								</div>
								<label for="building" class="error"></label>
							</td>
							<td>
								<div class=" input-group">
									<input class="form-control" name="unit" type="text"> <span class="input-group-addon">单元</span>
								</div>
								<label for="unit" class="error"></label>
							</td>
							<td>
								<div class=" input-group">
									<input class="form-control" name="floor" type="text"> <span class="input-group-addon">楼层</span>
								</div>
								<label for="floor" class="error"></label>
							</td>
							<td>
								<div class=" input-group">
									<input class="form-control" name="no" type="text"> <span class="input-group-addon">号</span>
								</div>
								<label for="no" class="error"></label>
							</td>
						</tr>
						<tr>
							<td class="text-info">房屋装修中</td>
							<td><label> <input type="checkbox" name="inRenovation"> 装修中 </label></td>
							<td>
								<input type="hidden" id="decorationStartTime_add" name="decorationStartTime" class="Wdate form-control" 
								onfocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'decorationEndTime_add\')}'})" 
								placeholder="输入装修开始时间" size="35" value="">
							</td>
							<td>
								<input type="hidden" id="decorationEndTime_add" name="decorationEndTime" class="Wdate form-control" 
								onfocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'decorationStartTime_add\')}'})" 
								placeholder="输入装修结束时间" size="35" value="">
							</td>
						</tr>
						<tr>
							<td class="text-info">出租方式</td>
							<td><label> <input type="radio" name="rentalType" value="整租"> 整租 </label><label for="rentalType" class="error"></label></td>
							<td><label> <input type="radio" name="rentalType" value="合租"> 合租 </label><label for="rentalType" class="error"></label></td>
							<td style="display: none;">
								<span class="text-info">房间间数</span>
								<input class="form-control" type="text" name="roomCount" value="" placeholder="输入房间间数"/>
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div class="modal-footer">
				<a href="javascrip:void(0);" class="btn btn-default" data-dismiss="modal">取消</a> 
				<a href="javascrip:void(0);" class="btn btn-primary" id="addHouseConfirm">保存</a>
			</div>
		</div>
	</div>
</div>
