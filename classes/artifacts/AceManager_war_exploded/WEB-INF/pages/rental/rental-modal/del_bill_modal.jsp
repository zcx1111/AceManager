<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>

<div class="modal fade" id="delBillModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3>删除账单<span class="text-info" name="bill-id"></span></h3>
            </div>
            <div class="modal-body">
                <p>您确定要删除该账单吗？删除后无法恢复！</p>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-default" data-dismiss="modal">取消</a>
                <a href="#" onclick="delBillById()" class="btn btn-primary" data-dismiss="modal">确定</a>
            </div>
        </div>
    </div>
</div>