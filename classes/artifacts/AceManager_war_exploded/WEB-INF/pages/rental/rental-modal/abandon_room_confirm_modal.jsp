<%--
  Created by IntelliJ IDEA.
  User: zkq
  Date: 2017/7/10
  Time: 11:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<div class="modal fade" id="abandonRoomConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3>房间退租</h3>
            </div>
            <div class="modal-body">
                <p class="lead"><span class="abandonInfo"></span></p>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-default" data-dismiss="modal">取消</a>
                <span class="abandonRoomModalButton">
                    <button href="#" class="btn btn-danger need-contract-id" data-dismiss="modal" data-toggle="modal"
                            onclick="abandonRoomModalButtonClick(this)">确定</button>
                </span>
            </div>
        </div>
    </div>
</div>
