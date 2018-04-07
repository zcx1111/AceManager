<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/7/10
  Time: 11:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<div class="modal fade" id="delHouseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h3>删除房源</h3>
			</div>
			<div class="modal-body">
				<p>
					您确定要删除该房源吗？删除后与<span style="font-size: 30px" class="red" name="house-id"></span>房源相对应的信息将被删除！
				</p>
			</div>
			<div class="modal-footer">
				<a href="#" class="btn btn-default" data-dismiss="modal">取消</a> 
				<a href="#" class="btn btn-primary" data-dismiss="modal" id="deleteHouseConfirmBtn">确定</a>
			</div>
		</div>
	</div>
</div>
