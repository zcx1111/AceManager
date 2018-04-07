<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>

<div class="modal fade bs-example-modal-lg" id="addBillModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel"
     aria-hidden="true">

    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3>添加账单<span class="text-info" name="bill-id"></span></h3>
            </div>
         <form id="addBillAll" method="get">
            <div class="modal-body">
                <table style="width: 100%">
                    <tr>
                        <td><h3><strong>基本信息</strong></h3></td>
                    </tr>
                    <tr>
                        <td>业主姓名</td>
                        <td><input type="text" style="width: 30%;" class="form-control" id="add_clienteleName" name="bill[0].transactionObjectName" value="">
                        	<input type="text" style="display: none;" class="form-control" id="add_contractId" name="bill[0].rentalContractId" value="">
                        </td>
                    </tr>
                    <tr>
                        <td>账单周期</td>
                        <td>
                            <div class="row">
                                <div class="col-md-4">
                                    <input type="text" class="form-control Wdate" name="bill[0].billStartDate"
                                           onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control Wdate" name="bill[0].billEndDate"
                                           onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>应收款日期</td>
                        <td>
                            <div class="row">
                                <div class="col-md-4">
                                    <input type="text" class="form-control Wdate" name="bill[0].receiptDate"
                                           onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><h3><strong>费用信息</strong></h3></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="row">
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="水费">水费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="电费">电费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="燃气费">燃气费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="物业费">物业费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="物业费">服务费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="保洁费">保洁费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="row">
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="维修费">维修费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="材料费">材料费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="有线电视">有线电视&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="宽带">宽带&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="卫生">卫生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                                <div class="col-md-2">
                                    <label><input type="checkbox" class="addBillExtras" value="其他">其他&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="tab_tr">
                        <td><h3><strong>账单备注</strong></h3></td>
                    </tr>
                    <tr>
                        <td colspan="2"><textarea style="resize: none" name="bill[0].billNote" class="form-control"></textarea></td>
                    </tr>
                </table>
            </div>
            </form>
            <div class="modal-footer">
                <a href="#" class="btn btn-default" data-dismiss="modal">取消</a>
                <a href="#" onclick="addBill()" class="btn btn-primary" data-dismiss="modal">保存</a>
            </div>
        </div>
    </div>
</div>
