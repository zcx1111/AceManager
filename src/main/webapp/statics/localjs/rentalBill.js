/**
 * Created by Administrator on 2017/7/13.
 */

$(document).ready(function () {
    //添加明细
    $('[class = addBillExtras]').change(function () {
        if ($(this).prop('checked')) {                      //被选中
            var newTr = `<tr class="financeCostListTr" name="` + $(this).val() + `">
                            <td>` + $(this).val() + `<input type="text" hidden class="costName" value="` + $(this).val() + `"></td>
                            <td>
                                <div class="row">
                                    <div class="col-md-3">
                                        <select class="form-control select_cost_bill" onchange="financeCostMoney(this)">
                                            <option value="1">应收</option>
                                            <option value="-1">应付</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 input-group">
                                        <input type="text" onchange="financeCostMoney(this)"  class="form-control feeAmountOld">
                                        <input type="text" style="display:none;" name="" class="form-control feeAmount">
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
            $(this).parents('table').find('.tab_tr').before(newTr);
        } else {                                             //被取消选中
            $(this).parents('table').find('[name = ' + $(this).val() + ']').remove();
        }
        editFinanceCost($(this).parents(".modal"));
    });

    //交租模态框
    $('#payForBillModal').on('show.bs.modal', function (event) {
        addBillId(this, event);
    });

    //催租模态框
    $('#billMassageModal').on('show.bs.modal', function (event) {
        sendBillMassage(this, event);
    })
});

/*cyx 房源账单列表start*/
function get_rental_bill(target) {
    //TODO 获取托管合同信息 操作对应div
    var $div = $($(target).attr("href"));
    var houseId = $(target).attr("data-house-id");
    $('#addBill').attr('data-house-id', houseId);
    var trStrpend = "";
    var trStr = "";
    var trStrpro = "";
    $.ajax({
        url:contextPath+"/rentalBill/getByHouseId/"+houseId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            var num = 0;
            if(result == null){
                $("#tbody_pending").html("");
                $("#future").html("");
                $("#manage").html("");
            }else {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].billStatus == "已支付") {//已处理账单
                        trStrpro += '<tr >';
                        trStrpro += '<td >' + result[i].billStartDate + "至" + result[i].billEndDate + '</td>';
                        trStrpro += '<td >' + result[i].totalMoney + '元</td>';
                        trStrpro += '<td >' + result[i].actualTransactionDate + '</td>';
                        trStrpro += '<td > <button class="btn btn-default" data-toggle="modal" ' +
                            'data-target="#showBillModal" data-bill-id="' + result[i].id + '">查看 </button> ' +
                            '</button></td>';
                        trStrpro += '</tr>';
                    } else {
                        if (num < 1) {//待处理账单
                            num += 1;
                            trStrpend += '<tr >';//拼接处规范的表格形式
                            trStrpend += '<td >' + result[i].billStartDate + "至" + result[i].billEndDate + '</td>';//账单周期
                            trStrpend += '<td >' + result[i].billStatus + '</td>';//账单状态
                            trStrpend += '<td >' + result[i].totalMoney + '元</td>';//账单金额
                            trStrpend += '<td >' + result[i].receiptDate + '</td>';
                            trStrpend += '<td > <button class="btn btn-default" data-toggle="modal" ' +
                                'data-target="#showBillModal" data-bill-id="' + result[i].id + '">查看 </button> ';
                            if (result[i].readList.length != 0) {
                                trStrpend += '<button class="btn btn-default" data-toggle="modal" data-target="#addMeterModal" data-bill-id="' + result[i].id + '">抄表</button>';
                            }
                            trStrpend += '<button class="btn btn-default" data-toggle="modal" data-target="#delBillModal" ' +
                                ' data-bill-id="' + result[i].id + '">删除</button>' +
                                '<button class="btn btn-default" data-target="#payForBillModal"' +
                                'data-toggle="modal" data-bill-id="' + result[i].id + '">确认交租 </button></td>';
                            trStrpend += '</tr>';
                        } else {//未来账单
                            trStr += '<tr >';//拼接处规范的表格形式
                            trStr += '<td >' + result[i].billStartDate + "至" + result[i].billEndDate + '</td>';//账单周期
                            trStr += '<td >' + result[i].totalMoney + '元</td>';//账单金额
                            trStr += '<td >' + result[i].receiptDate + '</td>';
                            trStr += '<td > <button class="btn btn-default" data-toggle="modal" ' +
                                'data-target="#showBillModal" data-bill-id="' + result[i].id + '">查看 </button> ' +
                                '<button class="btn btn-default" data-toggle="modal" data-target="#delBillModal" ' +
                                ' data-bill-id="' + result[i].id + '">删除' +
                                '</button></td>';
                            trStr += '</tr>';
                        }
                    }
                }
                $("#tbody_pending").html(trStrpend);
                $("#future").html(trStr);
                $("#manage").html(trStrpro);
            }
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}
/*cyx 账单列表*/

/*cyx 房源账单详情 start*/
function ShowBillId(obj, event) {
    var button = $(event.relatedTarget);
    var billId = button.attr('data-bill-id');
    $(obj).find('[name = bill-id]').html(billId);
    $(obj).find('.need-attr-bill-id').attr('data-bill-id', billId);
    $("#showBillModal").find('.bill_deal').show();
    $.ajax({
        url:contextPath+"/finance/getBillById/"+billId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            if(result.billStatus == "已支付"){
                $("#showBillModal").find('.bill_deal').hide();
            }
            $("#transactionObjectName_detail").val(result.transactionObjectName);
            $("#billStartDate_detail").val(result.billStartDate);
            $("#billEndDate_detail").val(result.billEndDate);
            $("#receiptDate_detail").val(result.receiptDate);
            $("#totalMoney_detail1").text(result.totalMoney);
            var strStr1 = "";
            for(var i=0;i<result.costList.length;i++){
                strStr1 += '<tr>';
                strStr1 += '<td>'+result.costList[i].costName+'</td>';
                if(result.costList[i].feeAmount == null){
                    strStr1 += '<td>待抄表</td>';
                }else{
                    strStr1 += '<td>'+result.costList[i].feeAmount+'</td>';
                }
                strStr1 += '</tr>';
            }
            $("#bill_tbody_detail").html(strStr1);
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}
/*cyx 账单详情 start*/

/* 交租模块start */

//进入交租模态框
function addBillId(obj, event) {
    var button = $(event.relatedTarget);
    var billId = button.attr('data-bill-id');
    $(obj).find('[name = bill-id]').html(billId);
    $(obj).find('.need-attr-bill-id').attr('data-bill-id', billId);
    $.ajax({
        url:contextPath+"/finance/getBillById/"+billId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            if(result.rentalRoomId != null){
                payBillByRoom(billId);
            }
            if(result.rentalHouseId != null){
                payBillByHouse(billId);
            }
        }
    });
}

//房源交租
function payBillByHouse(billId){
    $("#payForBillModal").find('.submit_payBill').attr('onclick','payBill(-1)');
    $.ajax({
        url:contextPath+"/finance/getBillById/"+billId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            $("#billId_pay").val(result.id);
            $("#houseId_pay").val(result.house.community.communityName+"小区"+result.house.building+"栋"+result.house.unit+"单元"+result.house.floor+"楼层"+result.house.no+"号");
            $("#transactionObjectName_pay").val(result.transactionObjectName);
            $("#billStartDate_pay").val(result.billStartDate);
            $("#billEndDate_pay").val(result.billEndDate);
            $("#receiptDate_pay").val(result.receiptDate);
            $("#totalMoney_pay").val(result.totalMoney);
            var strStrpay = "";
            for(var i=0;i<result.costList.length;i++){
                strStrpay += '<tr>';
                strStrpay += '<td>'+result.costList[i].costName+'</td>';
                strStrpay += '<td><input type="text" class="form-control" readonly="readonly" value="'+result.costList[i].feeAmount+'"></td>';
                strStrpay += '</tr>';
            }
            $("#cost_pay_detail").html(strStrpay);
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//房间交租
function payBillByRoom(billId){
    $("#payForBillModal").find('.submit_payBill').attr('onclick','payBill(1)');
    $.ajax({
        url:contextPath+"/finance/getBillByRoom/"+billId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            $("#payForBillModal").find('[name = CID]').val(result.room.house.community.communityName);
            $("#billId_pay").val(result.id);
            $("#houseId_pay").val(result.room.house.community.communityName+"小区"+result.room.house.building+"栋"+result.house.unit+"单元"+result.room.house.floor+"楼层"+result.room.house.no+"号"+result.room.roomName);
            $("#transactionObjectName_pay").val(result.transactionObjectName);
            $("#billStartDate_pay").val(result.billStartDate);
            $("#billEndDate_pay").val(result.billEndDate);
            $("#receiptDate_pay").val(result.receiptDate);
            $("#totalMoney_pay").val(result.totalMoney);
            var strStrpay = "";
            for(var i=0;i<result.costList.length;i++){
                strStrpay += '<tr>';
                strStrpay += '<td>'+result.costList[i].costName+'</td>';
                strStrpay += '<td><input type="text" class="form-control" readonly="readonly" value="'+result.costList[i].feeAmount+'"></td>';
                strStrpay += '</tr>';
            }
            $("#cost_pay_detail").html(strStrpay);
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//交租
function payBill(num) {
    $.ajax({
        url:contextPath+"/rentalBill/payBill",
        data:$("#bill_pay_form").serialize(),
        success:function(result){
            if(result == "0"){
                magicAlert("交租失败","failed");
            }else{
                magicAlert("交租成功","success");
                $("#payForBillModal").modal("hide");
                $("#showBillModal").modal("hide");
                if(num == 1){
                    $('#roomTab').find('.active').find(' a').click();
                }
                if(num == -1){
                    $('#houseTab').find('.active').find(' a').click();
                }
            }
        }
    });
}

/* 交租模块end */

/* 添加账单模块start */

//添加账单模态框
function addBillModal(obj,event){
    var button = $(event.relatedTarget);
    var houseId = button.attr('data-house-id');
    var roomId = button.attr('data-room-id');
    $(obj).find('[name = bill-id]').html(houseId);
    $(obj).find('.need-attr-bill-id').attr('data-bill-id', houseId);
    if(houseId != null){
        addBillByHouse(houseId);
    }
    if(roomId != null){
        addBillByRoom(roomId);
    }
}

//添加账单模态框通过houseId填充数据
function addBillByHouse(houseId){
    $.ajax({
        url:contextPath+"/rentalBill/getContractsByHouseId/"+houseId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            $("#add_clienteleName").val(result.clienteleName);
            $("#add_contractId").val(result.id);
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//添加账单模态框通过roomId填充数据
function addBillByRoom(roomId){
    $.ajax({
        url:contextPath+"/rentalBill/getContractsByRoomId/"+roomId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            $("#add_clienteleName").val(result.clienteleName);
            $("#add_contractId").val(result.id);
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//添加账单
function addBill(){
    $.ajax({
        url:contextPath+"/rentalBill/addBill",
        data:$("#addBillAll").serialize(),
        success:function(result){
            if(result == "0"){
                magicAlert("添加账单失败！","failed");
            }else{
                magicAlert("添加账单成功！","success");
                $("#addBillModal").modal("hide");
                $('#houseTab').find('.active').find(' a').click();
            }
        }
    });
}

/* 添加账单end */

//删除账单
function delBillById(){
    var id = $("#delBillModal").find('[name = bill-id]').html();
    $.ajax({
        url:contextPath+"/rentalBill/delBill/"+id,
        success:function(result){
            if(result == 0){
                magicAlert("删除账单失败！","failed");
            }else{
                magicAlert("删除账单成功！","success");
                $("#delBillModal").modal("hide");
                $('#houseTab').find('.active').find(' a').click();
            }
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//编辑账单模态框
function editBillId(obj, event){
    var button = $(event.relatedTarget);
    var billId = button.attr('data-bill-id');
    $(obj).find('[name = bill-id]').html(billId);
    $(obj).find('.need-attr-bill-id').attr('data-bill-id', billId);
    var editBill = "";
    $("#editBillModal").find('.financeCostListTr').remove();
    $.ajax({
        url:contextPath+"/finance/getBillById/"+billId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            $("#edit_billId").val(result.id);
            $("#update_Name").val(result.transactionObjectName);
            $("#edit_bill_startTime").val(result.billStartDate);
            $("#edit_bill_endTime").val(result.billEndDate);
            $("#edit_bill_receiptDate").val(result.receiptDate);
            $("#edit_bill_billNote").text(result.billNote);
            for(var i=0;i<result.costList.length;i++){
                $(".addBillExtras").each(function(){
                    if(result.costList[i].costName == $(this).val()){
                        $(this).prop("checked",true);
                    }
                });
                editBill +=`<tr class="financeCostListTr" name="` + result.costList[i].costName + `">
                            <td>` + result.costList[i].costName + `<input type="text" hidden class="costName" value="` + result.costList[i].costName + `"></td>
                            <td>
                                <div class="row">
                                    <div class="col-md-3">
                                        <select class="form-control select_cost_bill" onchange="financeCostMoney(this)">
                                            <option  value="1">应收</option>
                                            <option  value="-1">应付</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 input-group">
                                        <input type="text" onchange="financeCostMoney(this)" value="`+ Math.abs(result.costList[i].feeAmount)+`"  class="form-control feeAmountOld">
                                        <input type="text" style="display:none;" name="" class="form-control feeAmount">
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
            }
            $("#editBillModal").find('.tab_tr').before(editBill);
            $("#editBillModal").find('.financeCostListTr').each(function (i) {
                if(result.costList[i].feeAmount<0){
                    $(this).find('.select_cost_bill').find("[value = '-1']").prop("selected",true);
                }else{
                    $(this).find('.select_cost_bill').find("[value = '1']").prop("selected",true);
                }
                $(this).find(".costName").attr("name", "cost[" + i + "].costName");
                $(this).find(".feeAmount").attr("name", "cost[" + i + "].feeAmount");
                $(this).find(".feeAmountOld").change();
            })
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//编辑账单
function updateBill(){
    $.ajax({
        url:contextPath+"/rentalBill/updateBill",
        data:$("#updateBillAll").serialize(),
        success:function(result){
            if(result == "0"){
                magicAlert("编辑账单失败","failed");
            }else{
                magicAlert("编辑账单成功","success");
                $("#editBillModal").modal("hide");
                $("#showBillModal").modal("hide");
                $('#houseTab').find('.active').find(' a').click();
            }

        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//抄表模态框
function addMeterReadId(obj,event){
    var button = $(event.relatedTarget);
    var billId = button.attr('data-bill-id');
    $(obj).find('[name = bill_id]').html(billId);
    $(obj).find('.need-attr-bill-id').attr('meter_by_bill_id', billId);
    $("#meter_by_bill_id").html(billId);
    $.ajax({
        url:contextPath+"/finance/getBillById/"+billId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            if(result.rentalRoomId != null){
                readMeter(billId,1);
            }
            if(result.rentalHouseId != null){
                readMeter(billId,-1);
            }
        }
    });
}

//填充抄表模态框
function readMeter(billId,num){
    $("#addMeterModal").find('.submit_meter').attr('onclick','checkMeter('+num+')');
    var i = 0;
    $.ajax({
        url:contextPath+"/rentalBill/getMeterByBillId/"+billId,
        success:function(resultJson){
            var result = eval("("+resultJson+")");
            var strMeter = "";
            for(i=0;i<result.length;i++){
                strMeter += '<table>';
                strMeter += '<thead><h3><strong>'+result[i].meterType+'</strong></h3></thead>';
                strMeter += '<tbody>';
                strMeter += '<tr>' +
                    '<td width="50%">总价（元）</td>' +
                    '<td width="50%"><span> 单价（元/'+result[i].rentalOtherCostInfo.unitName+'）</span></td>' +
                    '</tr>';
                strMeter += '<tr style="display: none">' +
                    '<td width="50%"><input type="text" name="read['+i+'].id" id="rid" readonly="readonly" class="form-control" value="'+result[i].id+'"></td>' +
                    '<td width="50%"><input type="text" id="otherId" name="cost['+i+'].costName" readonly="readonly" class="form-control" value="'+result[i].meterType+'"></td>' +
                    '</tr>';
                strMeter += '<tr>' +
                    '<td width="50%"><input type="text" readonly="readonly" id="feeAmount" name="cost['+i+'].feeAmount" class="form-control feeAmount" value=""></td>' +
                    '<td width="50%">' +
                    '<input type="text" readonly="readonly" id="unitPrice" class="form-control unitPrice" value="'+result[i].rentalOtherCostInfo.unitPrice+'"></td>' +
                    '</tr>';
                strMeter += '<tr><td width="50%">上次水表读数</td><td width="50%">上次抄表时间</td></tr>';
                strMeter += '<tr><td width="50%"><input type="text" readonly="readonly" class="form-control meterNumberOld" value="'+result[i].meterNumber+'"></td>' +
                    '<td width="50%"><input type="text" class="form-control" readonly="readonly" value="'+result[i].readTime+'"></td></tr>';
                strMeter += '<tr><td width="50%">本次水表读数</td><td width="50%">本次抄表时间</td></tr>';
                strMeter += '<tr><td width="50%"><input type="text" name="read['+i+'].meterNumber" class="form-control meterNumber" onblur="addMeterNum(this,'+num+')" value="'+result[i].meterNumber+'"></td>' +
                    '<td width="50%"><input type="text" name="read['+i+'].readTime"  class="form-control" onFocus="WdatePicker({lang:\'zh-cn\',dateFmt:\'yyyy-MM-dd\'})"/></td></tr>';
                strMeter += '</tbody>';
                strMeter += '</table>';
            }
            $("#addMeterModal").find('.meter_read_div').html(strMeter);
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//抄表查总费用
function addMeterNum(obj,num) {
    var $table = $(obj).parents("table");
    var oldNum = $table.find('.meterNumberOld').val();
    var newNum = $table.find('.meterNumber').val();
    var price = $table.find('.unitPrice').val();
    var fee = $table.find('.feeAmount').val((newNum-oldNum)*price*num);
}

//抄表
function checkMeter(num) {
    var billId = $("#meter_by_bill_id").html();
    $.ajax({
        url:contextPath+"/rentalBill/addMeter/"+billId,
        data:$("#check_read_form").serialize(),
        success:function(result){
            if(result == "0"){
                magicAlert("抄表失败","failed");
            }else{
                magicAlert("抄表成功","success");
                $("#addMeterModal").modal("hide");
                if(num == 1){
                    $('#roomTab').find('.active').find(' a').click();
                }
                if(num == -1){
                    $('#houseTab').find('.active').find(' a').click();
                }

            }
        }
    });
}

/*function total(obj){
    var $tr = $(obj).parents("tr");
    var fee = $tr.find('.feeAmountOld').val();
    var option = $tr.find('.option').val();
    $tr.find('.feeAmount').val(fee*option);
}*/

function editFinanceCost($div){
    $div.find(".financeCostListTr").each(function (i) {
        $(this).find(".costName").attr("name", "cost[" + i + "].costName");
        $(this).find(".feeAmount").attr("name", "cost[" + i + "].feeAmount");
    });
}

//计算明细费用
function financeCostMoney(target) {
    var $tr = $(target).parents(".financeCostListTr");
    $tr.find(".feeAmount").val(parseFloat($tr.find(".feeAmountOld").val()) * parseFloat($tr.find(".select_cost_bill").val()));
}

/*房间账单模块*/

//房间账单
function get_room_bill(target){
    var $div = $($(target).attr("href"));
    var houseId = $(target).attr("data-house-id");
    var roomId = $(target).attr("data-room-id");
    $('#addBill_room').attr('data-room-id', roomId);
    var trStrpend = "";
    var trStr = "";
    var trStrpro = "";
    $.ajax({
        url:contextPath+"/rentalBill/getByRoomId/"+roomId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            var num = 0;
            if(result == null){
                $("#tbody_pending_room").html("");
                $("#future_room").html("");
                $("#manage_room").html("");
            }else {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].billStatus == "已支付") {//已处理账单
                        trStrpro += '<tr >';
                        trStrpro += '<td >' + result[i].billStartDate + "至" + result[i].billEndDate + '</td>';
                        trStrpro += '<td >' + result[i].totalMoney + '元</td>';
                        trStrpro += '<td >' + result[i].actualTransactionDate + '</td>';
                        trStrpro += '<td > <button class="btn btn-default" data-toggle="modal" ' +
                            'data-target="#showBillModal" data-bill-id="' + result[i].id + '">查看 </button> ' +
                            '</button></td>';
                        trStrpro += '</tr>';
                    } else {
                        if (num < 1) {//待处理账单
                            num += 1;
                            trStrpend += '<tr >';//拼接处规范的表格形式
                            trStrpend += '<td >' + result[i].billStartDate + "至" + result[i].billEndDate + '</td>';//账单周期
                            trStrpend += '<td >' + result[i].billStatus + '</td>';//账单状态
                            trStrpend += '<td >' + result[i].totalMoney + '元</td>';//账单金额
                            trStrpend += '<td >' + result[i].receiptDate + '</td>';
                            trStrpend += '<td > <button class="btn btn-default" data-toggle="modal" ' +
                                'data-target="#showBillModal" data-bill-id="' + result[i].id + '">查看 </button> ';
                            if (result[i].readList.length != 0) {
                                trStrpend += '<button class="btn btn-default" data-toggle="modal" data-target="#addMeterModal" data-bill-id="' + result[i].id + '">抄表</button>';
                            }
                            trStrpend += '<button class="btn btn-default" data-toggle="modal" data-target="#delBillModal" ' +
                                ' data-bill-id="' + result[i].id + '">删除</button>' +
                                '<button class="btn btn-default" data-target="#payForBillModal"' +
                                'data-toggle="modal" data-bill-id="' + result[i].id + '">确认交租 </button></td>';
                            trStrpend += '</tr>';
                        } else {//未来账单
                            trStr += '<tr >';//拼接处规范的表格形式
                            trStr += '<td >' + result[i].billStartDate + "至" + result[i].billEndDate + '</td>';//账单周期
                            trStr += '<td >' + result[i].totalMoney + '元</td>';//账单金额
                            trStr += '<td >' + result[i].receiptDate + '</td>';
                            trStr += '<td > <button class="btn btn-default" data-toggle="modal" ' +
                                'data-target="#showBillModal" data-bill-id="' + result[i].id + '">查看 </button> ' +
                                '<button class="btn btn-default" data-toggle="modal" data-target="#delBillModal" ' +
                                ' data-bill-id="' + result[i].id + '">删除' +
                                '</button></td>';
                            trStr += '</tr>';
                        }
                    }
                }
                $("#tbody_pending_room").html(trStrpend);
                $("#future_room").html(trStr);
                $("#manage_room").html(trStrpro);
            }
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//填充发送消息模态框
function sendBillMassage(obj,event){
    var button = $(event.relatedTarget);
    var billId = button.attr('data-bill-id');
    $(obj).find('[name = bill_id]').html(billId);
    $(obj).find('.need-attr-bill-id').attr('send_by_bill_id', billId);
    $.ajax({
        url:contextPath+"/finance/getBillById/"+billId,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            $("#billMassageModal").find('.billStartDate_send').html(result.billStartDate);
            $("#billMassageModal").find('.billEndDate_send').html(result.billEndDate);
            $("#billMassageModal").find('.totalMoney_send').html(result.totalMoney);
            $("#billMassageModal").find('.receiptDate_send').html(result.receiptDate);
            $("#billMassageModal").find('.transactionObjectName_send').html(result.transactionObjectName);
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//发送短信息
function sendMassage(target){
    var billId = $(target).attr("send_by_bill_id");
    $.ajax({
        url:contextPath+"/finance/sendMassageById/"+billId,
        success:function(result){
            if(result == "true"){
                magicAlert("消息发送成功","success");
                $("#billMassageModal").modal("hide");
                $('#roomTab').find('.active').find(' a').click();
            }else{
                magicAlert("消息发送失败","failed");
            }
        },
        error:function(){
            magicAlert("error","failed");
        }
    });
}