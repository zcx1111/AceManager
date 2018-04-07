<%--
  Created by IntelliJ IDEA.
  User: zkq
  Date: 2017/7/10
  Time: 11:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<div class="modal fade bs-example-modal-lg" id="abandonHouseModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel"
     aria-hidden="true">

    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form id="abandonHouseForm">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h3>退租信息&nbsp;<small class="community-name text-info"></small>
                    </h3>
                </div>
                <div class="modal-body">
                    <input type="text" name="contract.id" hidden>
                    <table style="width: 100%">
                        <tr>
                            <td>房源信息：<span class="house-info text-info"></span></td>
                            <td>房源地址：<span class="house-address text-info"></span></td>
                        </tr>
                        <tr>
                            <td>业主姓名：<span class="text-info clientele-name"></span></td>
                            <td>联系电话：<span class="text-info phone-number"></span></td>
                        </tr>
                        <tr>
                            <td>合同押金：<span class="text-info deposit"></span>元</td>
                            <td>支付方式：<span class="text-info pay-type"></span>月/付</td>
                        </tr>
                        <tr>
                            <td>合同周期：<span class="text-info contract-start-date"></span>&nbsp;至&nbsp;<span
                                    class="text-info contract-end-date"></span></td>
                            <td>
                                <div class="row ">
                                    <div class="col-md-3">退租时间:</div>
                                    <div class="col-md-9">
                                        <input type="text" class="Wdate form-control" name="contract.abandonDate"
                                               onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" size="21"/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">退租原因</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <textarea name="contract.abandonRemark" class="form-control"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td><h3>费用处理</h3></td>
                        </tr>
                    </table>
                    <table style="width: 100%">
                        <tr>
                            <td colspan="2">
                                <div class="row">
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="水费">水费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="电费">电费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="燃气费">燃气费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="物业费">物业费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="物业费">服务费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="保洁费">保洁费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="row">
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="维修费">维修费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="材料费">材料费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="有线电视">有线电视&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="宽带">宽带&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="卫生">卫生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="abandonHouseExtras" value="其他">其他&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="costListTr">
                            <td width="30%">房租</td>
                            <td>
                                <div class="row">
                                    <div class="col-md-3">
                                        <input type="text" name="cost[0].costName" class="costName" value="租金" hidden>
                                        <input type="text" name="cost[0].feeAmount" class="feeAmount" value="0" hidden>
                                        <select class="form-control money-select" onchange="abandonCostMoney(this)">
                                            <option value="1">应收</option>
                                            <option value="-1">应退</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 input-group ">
                                        <input type="text" class="form-control money-input" value="0" onchange="abandonCostMoney(this)">
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="costListTr">
                            <td>押金</td>
                            <td>
                                <div class="row">
                                    <div class="col-md-3">
                                        <input type="text" name="cost[1].costName" class="costName" value="押金" hidden>
                                        <input type="text" name="cost[1].feeAmount" class="feeAmount" value="0" hidden>
                                        <select class="form-control money-select" onchange="abandonCostMoney(this)">
                                            <option value="1">应收</option>
                                            <option value="-1">应退</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 input-group ">
                                        <input type="text" class="form-control money-input" onchange="abandonCostMoney(this)"
                                               value="0">
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </form>
            <div class="modal-footer">
                <a href="#" class="btn btn-default" data-dismiss="modal">取消</a>
                <a href="#" class="btn btn-primary" onclick="abandonContract($('#abandonHouseForm'))">确定</a>
            </div>
        </div>
    </div>
</div>

