<%--
  Created by IntelliJ IDEA.
  User: lq
  Date: 2017/7/10
  Time: 11:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<div class="modal fade" id="addRoomConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h3>添加房间</h3>
			</div>
			<div class="modal-body">
				<p class="lead">
					您确定要在 <strong class="red" name="house-id"></strong> 号房源添加房间？
				</p>
			</div>
			<div class="modal-footer">
				<a href="javascript:void(0);" class="btn btn-default" data-dismiss="modal">取消</a> 
				<a href="javascript:void(0);" name="addRoomConfirmBtn" data-dismiss="modal" class="btn btn-primary">确定</a>
			</div>
		</div>
	</div>
</div>
