<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>

<div class="modal fade" id="showBillModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3>账单查看 <span class="text-info" name="bill-id"></span></h3>
            </div>
            <div class="modal-body">
                <div style="float: right" class="bill_deal">
                    <button class="btn btn-link need-attr-bill-id"  data-toggle="modal"
                            data-target="#payForBillModal">
                        确认交租
                    </button>
                    <button class="btn btn-link need-attr-bill-id" data-toggle="modal"
                            data-target="#delBillModal"> 删除
                    </button>
                    <button class="btn btn-link need-attr-bill-id"  data-toggle="modal"
                            data-target="#editBillModal" data-dismiss="modal"> 编辑
                    </button>
                </div>

                <table width="100%">
                	
                    <tr>
                        <td><h4><strong>基本信息</strong></h4></td>
                    </tr>
                    <tr>
                        <td>业主姓名</td>
                        <td><input class="form-control" readonly="readonly" value="张三" id="transactionObjectName_detail"></td>
                    </tr>
                    <tr>
                        <td>账单周期</td>
                        <td><input class="form-control" readonly="readonly" id="billStartDate_detail" value="2018.11.01"></td>
                        <td><input class="form-control" readonly="readonly" id="billEndDate_detail" value="2018.11.30"></td>
                    </tr>
                    <tr>
                        <td>应收租日期</td>
                        <td><input class="form-control" readonly="readonly" id="receiptDate_detail" value="2018.10.31"></td>
                    </tr>
                    <tr>
                        <td><h4><strong>费用信息</strong></h4></td>
                        <td>（费用总计：<sapn id=totalMoney_detail1></sapn> 元 ）</td>
                    </tr>
                    <tbody id="bill_tbody_detail">
                    <tr>
                        <td>房屋租金</td>
                        <td><span class="text-info">0</span>元</td>
                    </tr>
                    <tr>
                        <td>房屋押金</td>
                        <td><span class="text-info">0</span>元</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-default" data-dismiss="modal">取消</a>
                <a href="#" class="btn btn-primary" data-dismiss="modal">保存</a>
            </div>
        </div>
    </div>
</div>