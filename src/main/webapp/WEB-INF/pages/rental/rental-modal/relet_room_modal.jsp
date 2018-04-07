<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>

<div class="modal fade bs-example-modal-lg" id="reletRoomModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel"
     aria-hidden="true">

    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3>房源续租</h3>
            </div>
            <div class="modal-body">
                <form id="reletRoomContractForm">
                    <table id="reletHouseTable" style="width: 100%;text-align: center">
                        <tr>
                            <td colspan="10">
                                <h4 class="red">房间信息</h4>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 12%">房间信息</td>
                            <td class="text-info"><span class="house-info"></span><input type="text" name="id" hidden>
                                <input type="text" hidden name="contractType">
                                <input type="text" hidden name="roomId" class="roomId"></td>
                        </tr>
                        <tr>
                            <td>房间地址</td>
                            <td class="text-info"><span class="house-address"></span></td>
                        </tr>
                        <tr>
                            <td colspan="10">
                                <h4 class="red">租客信息</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>租客姓名</td>
                            <td class="text-info"><input type="text" name="clienteleName" readonly="readonly"
                                                         class="form-control"></td>
                        </tr>
                        <tr>
                            <td>手机号码</td>
                            <td class="text-info "><input type="text" name="phoneNumber" readonly="readonly"
                                                          class="form-control"></td>
                        </tr>
                        <tr>
                            <td>证件类型</td>
                            <td class="text-info "><input type="text" name="certificateType" readonly="readonly"
                                                          class="form-control"></td>
                        </tr>
                        <tr>
                            <td>证件号码</td>
                            <td class="text-info "><input type="text" name="certificateNo" readonly="readonly"
                                                          class="form-control"></td>
                        </tr>
                        <tr>
                            <td colspan="10">
                                <h4 class="red">租赁信息</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>押金</td>
                            <td char="text-info"><input class="form-control" name="deposit" readonly="readonly"></td>
                        </Tr>
                        <tr>
                            <td><label><input type="radio" checked name="subsectionType" value="普通">普通合同</label></td>
                            <td><label><input type="radio" name="subsectionType" value="分段">分段合同</label>&nbsp;&nbsp;
                                <button type="button" class="btn btn-link addInfoBtn" style="display: none;">添加分段
                                </button>
                            </td>
                        </tr>
                        <tr class="rentalInfoTr">
                            <td>分段信息</td>
                            <td colspan="9">
                                <div class="row firstRentalInfo">
                                    <div class="col-md-3">
                                        <div class="input-group">
                                            <input type="text" class="rentMoney form-control" value="0"
                                                   name="rentalInfos[0].rentMoney"
                                                   onkeyup="value=value.replace(/[^\d.]/g,'');countMoney($(this).parents(' div.modal-body'))">
                                            <span class="input-group-addon">元/月</span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="input-group">
                                            <select name="rentalInfos[0].chooseMonth" class="form-control chooseMonth">
                                                <option value="1">1</option>
                                            </select>
                                            <span class="input-group-addon">个月</span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control Wdate startDate"
                                               name="rentalInfos[0].rentStartTime"
                                               onchange="setEndDate($(this).parents(' tr'))"
                                               readonly="readonly">
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control Wdate endDate"
                                               name="rentalInfos[0].rentEndTime" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="afterLastInfo">
                            <td>租金</td>
                            <td>共 <span class="text-info totalRentalMoney">0</span> 元</td>
                        </tr>
                        <tr>
                            <td>支付方式</td>
                            <td class="input-group">
                                <input type="text" name="payType" class="form-control">
                                <span class="input-group-addon">月/付</span>
                            </td>
                        </tr>
                        <tr>
                            <td>收租方式</td>
                            <td>
                                <select name="rentType" class="form-control">
                                    <option value="提前日交租">提前日交租</option>
                                    <option value="固定日交租">固定日交租</option>
                                </select>
                            </td>
                            <td class="input-group">
                                <input type="text" name="rentDate" class="form-control">
                                <span class="input-group-addon">日</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="10">
                                <h4 class="red">杂费信息</h4>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="10">
                                <div class="row">
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="水费">水费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="电费">电费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="燃气费">燃气费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="物业费">物业费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="物业费">服务费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="保洁费">保洁费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="10">
                                <div class="row">
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="维修费">维修费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="材料费">材料费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="有线电视">有线电视&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="宽带">宽带&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="卫生">卫生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label><input type="checkbox" class="houseExtras" value="其他">其他&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-default" data-dismiss="modal">取消</a>
                <a href="#" class="btn btn-primary" onclick="reletContract($('#reletRoomContractForm'))">保存</a>
            </div>
        </div>
    </div>
</div>