<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>

<div class="modal fade" id="addMeterModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
        <form id="check_read_form" method="get">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3>抄表<span class="text-info" id="meter_by_bill_id" name="bill-id"></span> </h3>
            </div>
            
            <div class="modal-body">
            	<div class="meter_read_div"></div>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-default" data-dismiss="modal">取消</a>
                <button type="button" onclick="" class="btn btn-primary submit_meter" >提交</button>
            </div>
            </form>
        </div>
    </div>
</div>