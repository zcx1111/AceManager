<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>

<div class="modal fade" id="payForBillModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
        <input type="hidden" name="CID" value=""> 
        <form id="bill_pay_form" method="get">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3>确认交租<span class="text-info" id="bill_pay_id" name="bill-id"></span> </h3>
            </div>
            
            <div class="modal-body">
            
                <table>
                    <tr>
                        <td><h3><strong>基本信息</strong></h3></td>
                    </tr>
                    <tr style="display: none">
                        <td>账单id</td>
                        <td><input type="text" id="billId_pay" class="form-control" readonly="readonly" name="id" value=""></td>
                    </tr>
                    <tr>
                        <td>账单房源</td>
                        <td><input type="text" id="houseId_pay" class="form-control" readonly="readonly" value="1933老场坊1栋1楼1号"></td>
                    </tr>
                    <tr>
                        <td>姓名</td>
                        <td><input type="text" id="transactionObjectName_pay" class="form-control" readonly="readonly" value="小明"></td>
                    </tr>
                    <tr>
                        <td>账单周期</td>
                        <td>
                            <div class="row">
                                <div class="col-md-4">
                                    <input type="text" id="billStartDate_pay" class="form-control" readonly="readonly" value="2017-07-08">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="billEndDate_pay" class="form-control" readonly="readonly" value="2017-07-30">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>应付款时间</td>
                        <td>
                            <input type="text" id="receiptDate_pay" class="form-control" readonly="readonly" value="2017-07-19">
                        </td>
                    </tr>
                    <tr>
                        <td><h3><strong>费用信息</strong></h3></td>
                    </tr>
                    <tbody id="cost_pay_detail">
                    <tr>
                        <td>房屋租金</td>
                        <td>
                            <input type="text" class="form-control" readonly="readonly" value="800">
                        </td>
                    </tr>
                    <tr>
                        <td>房屋押金</td>
                        <td>
                            <input type="text" class="form-control" readonly="readonly" value="1500">
                        </td>
                    </tr>
                    </tbody>
                    <tr>
                        <td>费用总计</td>
                        <td><input type="text" id="totalMoney_pay" class="form-control" readonly="readonly" value="2300"></td>
                    </tr>
                    <tr>
                        <td><h3><strong>支付信息</strong></h3></td>
                    </tr>
                    <tr>
                        <td>付款方式</td>
                        <td>
                            <select class="form-control" name="paymentMethod">
                            		<option value="">交易方式</option>
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
                        </td>
                    </tr>
                    <tr>
                        <td>支付流水号</td>
                        <td><input type="text" name="batch" class="form-control"></td>
                    </tr>
                    <tr>
                        <td>实际支付日期</td>
                        <td><input type="text" readonly="readonly" name="actualTransactionDate" class="form-control Wdate"
                                   onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" size="21"></td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-default" data-dismiss="modal">取消</a>
                <button type="button" onclick="" class="btn btn-primary submit_payBill" >提交</button>
            </div>
            </form>
        </div>
    </div>
</div>