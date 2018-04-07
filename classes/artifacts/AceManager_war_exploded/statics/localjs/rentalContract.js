/**
 * Project <AceManager>
 * Created by zkq on 2017/7/13 22:26.
 */

$(document).ready(function () {


    //添加杂费
    $('[class = houseExtras]').change(function () {
        if ($(this).prop('checked')) {                      //被选中
            var newTr;
            switch ($(this).val()) {
                case '电费':
                    newTr = getOtherCostDiv('电费', '度');
                    break;
                case '水费':
                    newTr = getOtherCostDiv('水费', '吨');
                    break;
                case '燃气费':
                    newTr = getOtherCostDiv('燃气费', '立方');
                    break;
                default:
                    newTr = `<tr class="otherCostInfosTr" name="` + $(this).val() + `">
                            <td>` + $(this).val() + `<input type="text" hidden class="costName" value="` + $(this).val() + `"></td>
                            <td colspan="10">
                            <div class="row">
                                <div class="col-md-3 firstOtherCostDiv">收费类型
                                    <label>
                                        <select class="form-control costType" name="">
                                            <option selected value="固定收费">固定收费</option>
                                        </select>
                                    </label>
                                </div>
                                <div class="col-md-3">
                                价格
                                <div class=" input-group">
                                    <input type="text" class="form-control totalPrice">
                                    <span class="input-group-addon ">元/<span>月</span></span>
                                </div>
                                </div>
                            </div>
                        </td>
                        </tr>`;
                    break;
            }
            $(this).parents(' table').find('tr:last').after(newTr);
        } else {                                             //被取消选中
            $(this).parents(' table').find('[name = ' + $(this).val() + ']').remove();
        }
        editRentalOtherCostInfo($(this).parents(".modal"));
    });


    //点击切换分段类型
    $("#signedHouseModal,#reletHouseModal,#signedRoomModal,#reletRoomModal").find('input[name = subsectionType]').change(function () {
        var $modal = $(this).parents('.modal');
        if ($(this).val() === "普通") {
            $modal.find('.addInfoBtn').hide();
            $modal.find('.rentalInfoTr').first().siblings('.rentalInfoTr').remove();
        } else {
            $modal.find('.addInfoBtn').show();
        }
    });

    //点击添加分段信息
    $("#signedHouseModal,#reletHouseModal,#signedRoomModal,#reletRoomModal").find('.addInfoBtn').click(function () {
        var $modal = $(this).parents('.modal');
        var $newTr = $modal.find('.rentalInfoTr').last().clone(true);
        //添加进table
        $modal.find('.afterLastInfo').before($newTr);
        var $last = $modal.find('.rentalInfoTr').last();
        $last.find('.startDate').attr('readonly', 'readonly').val($last.prev().find('.endDate').val());
        $last.find('.chooseMonth').change();
        //动态修改租赁信息name
        editRentalInfosName($modal);
    });

    //签约模态框 end


    //退杂费
    $('[class = abandonHouseExtras]').change(function () {
        if ($(this).prop('checked')) {                      //被选中
            var newTr = `<tr class="costListTr" name="` + $(this).val() + `">
                            <td>` + $(this).val() + `</td>
                            <td>
                                <div class="row">
                                    <div class="col-md-3">
                                    <input type="text" class="costName" value="` + $(this).val() + `" hidden> 
                                    <input type="text" class="feeAmount" value="0" hidden> 
                                        <select class="form-control money-select" onchange="abandonCostMoney(this)">
                                            <option value="1">应收</option>
                                            <option value="-1">应退</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 input-group" >
                                        <input type="text" class="form-control money-input" onchange="abandonCostMoney(this)" value="0">
                                        <span class="input-group-addon">元</span>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
            $(this).parents('table').find('tr:last').after(newTr);
        } else {                                             //被取消选中
            $(this).parents('table').find('[name = ' + $(this).val() + ']').remove();
        }
        $(this).parents('table').find('.costListTr').each(function (i) {
            $(this).find(".costName").attr("name", "cost[" + i + "].costName");
            $(this).find(".feeAmount").attr("name", "cost[" + i + "].feeAmount");
        })
    });

});


//点击编辑合同按钮
function editContractBtnClick(btn) {
    var $button = $(btn);
    var $modal = $($button.attr("data-modal-target"));
    var contractId = $button.attr('data-contract-id');
    var url = "";
    if ($button.attr("data-modal-target") === '#editHouseContractModal') {
        url = "/rentalContract/getOwnerContractById.html";
    } else if ($button.attr("data-modal-target") === '#editRoomContractModal') {
        url = "/rentalContract/getRentContractById.html";
    }
    $.ajax({
        url: contextPath + url,
        data: {"contractId": contractId},
        dataType: "json",
        success: function (data) {
            $modal.find(".house-info").html(data[1].community.communityName);
            $modal.find(".house-address").html(data[1].community.province + " " + data[1].community.city + " " + data[1].community.area + " " + data[1].community.communityAddress);
            $modal.find("[name = id]").val(data[0].id);
            $modal.find("[name = clienteleName]").val(data[0].clienteleName);
            $modal.find("[name = phoneNumber]").val(data[0].phoneNumber);
            $modal.find("[name = certificateType]").find("[value = " + data[0].certificateType + "]").prop("selected", true);
            $modal.find("[name = certificateNo]").val(data[0].certificateNo);
            $modal.find("[name = remark]").val(data[0].remark);
            if (canDeleteContract(contractId)) {
                $modal.find(".deleteSpan").show();//显示删除按钮
            } else {
                $modal.find(".deleteSpan").hide();//隐藏删除按钮
            }
            $modal.modal("show");
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//退租是计算金额
function abandonCostMoney(target) {
    var $tr = $(target).parents(".costListTr");
    $tr.find(".feeAmount").val(parseFloat($tr.find(".money-input").val()) * parseFloat($tr.find(".money-select").val()));
}

//zkq 托管合同 start
function get_custody_contract(target) {
    var $div = $($(target).attr("href"));
    var houseId = $(target).attr("data-house-id");

    $.getJSON(
        contextPath + "/rentalContract/getOwnerContract.html",
        {"houseId": houseId},
        function (data) {
            if (data === null) {
                $div.html(`<div class="row center">
                              <h3 class="text-info ">当前无生效合同</h3>
                          </div>
                          <div class="row center">
                              <button class="btn btn-success need-attr-house-id" data-toggle="modal" onclick="toAddOwnerContract(this)">点击签约</button>
                          </div>
                `);
            } else {
                var rentalInfos = "";
                for (var i = 0; i < data.rentalInfos.length; i++) {
                    rentalInfos += `
                        <tr>
                            <td>分段` + (i + 1) + `</td>
                            <td>租赁时间：<span class="text-info">` + data.rentalInfos[i].rentStartTime + `</span> 至 <span class="text-info">` + data.rentalInfos[i].rentEndTime + `</span></td>
                            <td>租金：<span class="text-info">` + data.rentalInfos[i].rentMoney + `</span>元/月</td>
                        </tr>`;
                }
                var otherCostInfo = "";
                for (var i = 0; i < data.otherCostInfos.length; i++) {
                    otherCostInfo += `
                            <tr>
                                <td class="text-info">` + data.otherCostInfos[i].costName + `</td>
                                ` + (data.otherCostInfos[i].costType == "固定收费" ? `
                                <td>固定每月收费</td>
                                <td >费用金额：<span class="text-info">` + data.otherCostInfos[i].totalPrice + `</span> 元/月</td>` : `
                                <td>抄表收费</td>
                                <td >费用金额：<span class="text-info">` + data.otherCostInfos[i].unitPrice + `</span> 元/` + data.otherCostInfos[i].unitName + `</td>
                                `) + `
                            </tr>
                    `
                }
                $div.html(`
                        <h2>
                            <strong class="text-primary">生效合同&nbsp;&nbsp;<small>(` + data.startDate + ` 至 ` + data.endDate + `)</small></strong>
                            <div style="float: right">
                                <button class="btn btn-default need-attr-contract-id" disabled> 打印</button>
                                <button class="btn btn-default need-attr-contract-id"  data-modal-target="#editHouseContractModal" onclick="editContractBtnClick(this)"> 编辑 </button>
                                <button class="btn btn-primary need-attr-contract-id"  data-modal-target="#reletHouseModal" onclick="reletHouseModalButtonClick(this)" > 续租 </button>
                                <button class="btn btn-warning need-attr-contract-id"  data-modal-target="#abandonHouseConfirmModal" onclick="abandonHouseConfirmModalButtonClick(this)"> 退租 </button>
                            </div>
                        </h2>
                        <hr>
                        <h4><strong>基本信息：</strong></h4>
                        <table>
                            <tr>
                                <td>租客姓名:</td>
                                <td class="text-info">` + data.clienteleName + `</td>
                            </tr>
                            <tr>
                                <td>手机号码:</td>
                                <td class="text-info">` + data.phoneNumber + `</td>
                            </tr>
                            <tr>
                                <td>` + data.certificateType + `号:</td>
                                <td class="text-info">` + data.certificateNo + `</td>
                            </tr>
                            <tr>
                                <td>证件附件:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>合同附件:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>合同备注</td>
                                <td class="text-info"><textarea readonly style="width: 200%;height: 100px" class="form-control"> ` + data.remark + `</textarea></td>
                            </tr>
                        </table>

                        <h4><strong>租赁信息：</strong></h4>

                        <table>
                            ` + rentalInfos + `
                            <tr>
                                <td>押金</td>
                                <td><span class="text-info">` + data.deposit + `</span>元</td>
                            </tr>
                            <tr>
                                <td>支付方式</td>
                                <td><span class="text-info">` + data.payType + `</span>月/付</td>
                            </tr>
                            <tr>
                                <td>` + data.rentType + `</td>
                                <td>` + (data.rentType == '固定交租日' ? `每月` + data.rentDate + `日` : `提前` + data.rentDate + `天`) + `</td>
                            </tr>
                        </table>

                        <h4><strong>杂费信息：</strong></h4>

                        <table>
                        ` + otherCostInfo + `
                        </table>
                    `);
                addId($div.get(0), "need-attr-contract-id", "data-contract-id", data.id);
            }
            $div.append(`
                        <hr>
                        <h3>
                            <button type="button" class="btn btn-link need-attr-house-id" onclick="getHouseHistoryContracts(this,'` + $(target).attr("href") + `')">
                                    <i class="glyphicon glyphicon-info-sign"></i>&nbsp;&nbsp;历史合同</button>
                        </h3>
                        <center><table   class="table table-bordered table-striped table-hover historyTable"></table></center>
                        `
            );
            addId($div.get(0), "need-attr-house-id", "data-house-id", houseId);
        }
    );

}

function getHouseHistoryContracts(btn, div) {
    var $div = $(div);
    var houseId = $(btn).attr("data-house-id");
    $.ajax({
        url: contextPath + "/rentalContract/getHouseHistoryContracts",
        data: {"houseId": houseId},
        dataType: "json",
        success: function (data) {

            if (data == null || data.length <= 0) {
                $div.find(".historyTable").html(`
                <tr><td><h4 style="text-align: center" class="text-primary">暂无历史合同</h4></td></tr>
`)
            } else {
                var trStr = `<tr>
                            <td>业主姓名</td>
                            <td>开始时间</td>
                            <td>结束时间</td>
                            <td>退租时间</td>
                            <td>退租原因</td>
                        </tr>`;
                for (var i in data) {
                    trStr += `<tr>
                                <td>` + data[i].clienteleName + `</td>
                                <td>` + data[i].startDate + `</td>
                                <td>` + data[i].endDate + `</td>
                                <td>` + (data[i].abandonDate == null ? `-` : data[i].abandonDate) + `</td>
                                <td>` + (data[i].abandonRemark == null ? `-` : data[i].abandonRemark) + `</td>
                            </tr>`
                }
                $div.find(".historyTable").html(trStr);
            }
        }

    });
}

//zkq 托管合同 end

//添加房源id
function addId(obj, clz, attr, id) {
    $(obj).find('.' + clz).attr(attr, id);
}

function setEndDate($tr) {
    var startDate = $tr.find('.startDate').val();
    var date = DateFormat.parseDate(startDate, "yyyy-MM-dd");
    date.setMonth(date.getMonth() + parseInt($tr.find('.chooseMonth').val()));
    var date = date.getFullYear() + '-' + (date.getMonth() + 1 ) + '-' + date.getDate();
    $tr.find('.endDate').val(date);
    $tr.next().find('.startDate').val(date);
    $tr.next().find(' .chooseMonth').change();
    countMoney($tr.parents(' .modal'));
}

function countMoney($div) {
    var count = 0;
    $div.find('.rentalInfoTr').each(function () {
        count += parseFloat($(this).find('.rentMoney').val()) * parseFloat($(this).find(' .chooseMonth').val());
    });
    $div.find('.totalRentalMoney').html(count);
}

function getOtherCostDiv(name, unit) {
    var div = `<tr class="otherCostInfosTr" name="` + name + `">
                        <td>` + name + `<input type="text" hidden class="costName" value="` + name + `"></td>
                        <td colspan="10">
                            <div class="row">
                                <div class="col-md-3 firstOtherCostDiv">收费类型
                                    <label>
                                        <select class="form-control costType" onchange="selectOtherCost(this,'` + unit + `')">
                                            <option selected value="固定收费">固定收费</option>
                                            <option  value="抄表收费">抄表收费</option>
                                        </select>
                                    </label>
                                </div>
                                <div class="col-md-3">
                                价格
                                <div class=" input-group">
                                    <input type="text" class="form-control totalPrice">
                                    <span class="input-group-addon">元/<span>月</span></span>
                                </div>
                                </div>
                            </div>
                        </td>
                    </tr>`;
    return div;
}

function selectOtherCost(obj, unit) {
    var baseDiv = `<div class="col-md-3">
                          价格
                          <div class=" input-group">
                              <input type="text" class="form-control totalPrice" >
                              <span class="input-group-addon">元/<span>月</span></span>
                          </div>
                    </div> `;
    var meterDiv = `<div class="col-md-3">
                          价格
                          <div class=" input-group">
                              <input type="text" class="form-control unitPrice">
                              <input type="text" hidden class="unitName" value="` + unit + `"> 
                              <span class="input-group-addon">元/<span>` + unit + `</span></span>
                          </div>
                    </div> 
                    <div class="col-md-3">
                                  <input type="text" hidden class="meterType" value="` + $(obj).parents(" tr").attr("name") + `">
                          当前读数<input type="text" class="form-control meterNumber">
                      </div>
                      <div class="col-md-3">
                         读表时间<input type="text" class="form-control Wdate readTime" value="" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" >
                    </div>`;
    var $div = $(obj).parents('.firstOtherCostDiv');
    $div.nextAll().remove();
    if ($(obj).val() === "抄表收费") {
        $div.after(meterDiv);
    } else {
        $div.after(baseDiv);
    }
    editRentalOtherCostInfo($(obj).parents(".modal"));
}

function editRentalInfosName($div) {
    $div.find(".rentalInfoTr").each(function (i) {
        $(this).find(".rentMoney").attr("name", "rentalInfos[" + i + "].rentMoney");
        $(this).find(".startDate").attr("name", "rentalInfos[" + i + "].rentStartTime");
        $(this).find(".chooseMonth").attr("name", "rentalInfos[" + i + "].chooseMonth");
        $(this).find(".endDate").attr("name", "rentalInfos[" + i + "].rentEndTime");
    });
}

function editRentalOtherCostInfo($div) {
    $div.find(".otherCostInfosTr").each(function (i) {
        $(this).find(".costName").attr("name", "otherCostInfos[" + i + "].costName");
        $(this).find(".costType").attr("name", "otherCostInfos[" + i + "].costType");
        $(this).find(".totalPrice").attr("name", "otherCostInfos[" + i + "].totalPrice");
        $(this).find(".unitPrice").attr("name", "otherCostInfos[" + i + "].unitPrice");
        $(this).find(".unitName").attr("name", "otherCostInfos[" + i + "].unitName");
        $(this).find(".meterType").attr("name", "otherCostInfos[" + i + "].meterRead.meterType");
        $(this).find(".meterNumber").attr("name", "otherCostInfos[" + i + "].meterRead.meterNumber");
        $(this).find(".readTime").attr("name", "otherCostInfos[" + i + "].meterRead.readTime");
    });
}

//签约 托管合同
function addOwnerContract() {
    $.ajax({
        url: contextPath + "/rentalContract/addOwnerContract.html",
        data: $("#addOwnerContractForm").serialize(),
        type: "post",
        success: function (data) {
            if (data === "true") {
                magicAlert("成功", "success");
                $("#signedHouseModal").modal('hide');
            } else {
                magicAlert(data, "failed");
            }
            $('#houseTab').find('.active').find(' a').click();
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//签约 租房合同
function addRentContract() {
    $.ajax({
        url: contextPath + "/rentalContract/addRentContract.html",
        data: $("#addRentContractForm").serialize(),
        type: "post",
        success: function (data) {
            if (data === "true") {
                magicAlert("成功", "success");
                $("#signedRoomModal").modal('hide');
            } else {
                magicAlert(data, "failed");
            }
            $('#roomTab').find('.active').find(' a').click();
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//签约 托管合同模态框
function toAddOwnerContract(btn) {
    var $button = $(btn);
    var houseId = $button.attr('data-house-id');
    $("#signedHouseModal").find("[name = houseId]").val(houseId);
    $.ajax({
        url: contextPath + "/rentalBasic/getHouseDetailByHouseId.html",
        data: {'houseId': houseId},
        dataType: "json",
        success: function (data) {
            $("#signedHouseModal").find(".house-info").html(data.community.communityName);
            $("#signedHouseModal").find(".house-address").html(data.community.province + " " + data.community.city + " " + data.community.area + " " + data.community.communityAddress);
            $("#signedHouseModal").modal("show");
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//修改 合同
function updateContract(from) {
    var fromData = $(from).serialize();
    $.ajax({
        url: contextPath + "/rentalContract/updateContract.html",
        data: fromData,
        success: function (data) {
            ajaxSuccess(data);
            $("#editHouseContractModal").modal("hide");
            $("#editRoomContractModal").modal("hide");
            $('#houseTab').find('.active').find(' a').click();
            $('#roomTab').find('.active').find(' a').click();
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//续租房源（业主）合同模态框 start
function toReletHouseContractModal(contractId, $modal) {
    $.ajax({
        url: contextPath + "/rentalContract/getOwnerContractById.html",
        data: {"contractId": contractId},
        dataType: "json",
        success: function (data) {
            $modal.find(".house-info").html(data[1].community.communityName);
            $modal.find(".house-address").html(data[1].community.province + " " + data[1].community.city + " " + data[1].community.area + " " + data[1].community.communityAddress);
            $modal.find("[name = id]").val(data[0].id);
            $modal.find("[name = clienteleName]").val(data[0].clienteleName);
            $modal.find("[name = phoneNumber]").val(data[0].phoneNumber);
            $modal.find("[name = certificateType]").val(data[0].certificateType);
            $modal.find("[name = certificateNo]").val(data[0].certificateNo);
            $modal.find("[name = deposit]").val(data[0].deposit);
            $modal.find("[name = contractType]").val(data[0].contractType);
            $modal.find("[name = 'rentalInfos[0].rentStartTime']").val(data[0].endDate).change();
            $modal.find(".houseId").val(data[0].houseId);
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//续租房间(租客)合同模态框 start
function toReletRoomContractModal(contractId, $modal) {
    $.ajax({
        url: contextPath + "/rentalContract/getRentContractById.html",
        data: {"contractId": contractId},
        dataType: "json",
        success: function (data) {
            $modal.find(".house-info").html(data[1].community.communityName + " ( " + data[2].roomName + " )");
            $modal.find(".house-address").html(data[1].community.province + " " + data[1].community.city + " " + data[1].community.area + " " + data[1].community.communityAddress);
            $modal.find("[name = id]").val(data[0].id);
            $modal.find("[name = clienteleName]").val(data[0].clienteleName);
            $modal.find("[name = phoneNumber]").val(data[0].phoneNumber);
            $modal.find("[name = certificateType]").val(data[0].certificateType);
            $modal.find("[name = certificateNo]").val(data[0].certificateNo);
            $modal.find("[name = deposit]").val(data[0].deposit);
            $modal.find("[name = contractType]").val(data[0].contractType);
            $modal.find("[name = 'rentalInfos[0].rentStartTime']").val(data[0].endDate).change();
            $modal.find(".roomId").val(data[0].roomId);
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//续租房源合同模态框 end

//续租 合同
function reletContract($form) {
    $.ajax({
        url: contextPath + "/rentalContract/reletContract.html",
        data: $form.serialize(),
        success: function (data) {
            ajaxSuccess(data);
            $("#reletHouseModal").modal('hide');
            $("#reletRoomModal").modal('hide');
            $('#houseTab').find('.active').find(' a').click();
            $('#roomTab').find('.active').find(' a').click();
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//成功弹出框
function ajaxSuccess(data) {
    if (data === "true") {
        magicAlert("成功", "success");
    } else {
        magicAlert(data, "failed");
    }
}

//删除业主合同
function deleteOwnerContract(contractId) {
    $.ajax({
        url: contextPath + "/rentalContract/deleteOwnerContract.html",
        data: {contractId: contractId},
        success: function (data) {
            ajaxSuccess(data);
            $("#editHouseContractModal").modal('hide');
            $('#houseTab').find('.active').find(' a').click();
        }
    });
}

//删除业主合同
function deleteRentContract(contractId) {
    $.ajax({
        url: contextPath + "/rentalContract/deleteRentContract.html",
        data: {contractId: contractId},
        success: function (data) {
            ajaxSuccess(data);
            $("#editRoomContractModal").modal('hide');
            $('#roomTab').find('.active').find(' a').click();
        }
    });
}

//能否删除合同
function canDeleteContract(contractId) {
    var result = false;
    $.ajax({
        url: contextPath + "/rentalContract/canDeleteContract.html",
        data: {contractId: contractId},
        async: false,
        success: function (data) {
            result = data === "true";
        },
        error: function () {
            result = false;
        }
    });
    return result;
}

//续租房源按钮点击
function reletHouseModalButtonClick(btn) {
    var contractId = $(btn).attr("data-contract-id");
    $.ajax({
        url: contextPath + "/rentalContract/canReletContract.html",
        data: {"contractId": contractId},
        success: function (data) {
            if (data === "true") {
                toReletHouseContractModal(contractId, $("#reletHouseModal"));
                $("#reletHouseModal").modal("show");
            } else {
                magicAlert(data, "failed");
            }
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//续租房间按钮点击
function reletRoomModalButtonClick(btn) {
    var contractId = $(btn).attr("data-contract-id");
    $.ajax({
        url: contextPath + "/rentalContract/canReletContract.html",
        data: {"contractId": contractId},
        success: function (data) {
            if (data === "true") {
                toReletRoomContractModal(contractId, $("#reletRoomModal"));
                $("#reletRoomModal").modal("show");
            } else {
                magicAlert(data, "failed");
            }
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//房源退租确定模态框
function abandonHouseConfirmModalButtonClick(btn) {
    var contractId = $(btn).attr("data-contract-id");
    var $abandonHouseConfirmModal = $('#abandonHouseConfirmModal');
    $.ajax({
        url: contextPath + "/rentalContract/getUnpaidBillCountByContractId.html",
        data: {"contractId": contractId},
        success: function (data) {
            var count = parseInt(data);
            if (count > 0) {
                $abandonHouseConfirmModal.find(".abandonInfo").html("您还有<strong class='text-danger'>" + count + "</strong>个账单未处理，是否确认退租?");
            } else {
                $abandonHouseConfirmModal.find(".abandonInfo").html("所有账单已经处理完成！");
            }
            $abandonHouseConfirmModal.modal('show');
            $abandonHouseConfirmModal.find(".need-contract-id").attr("data-contract-id", contractId);
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//房间退租确定模态框
function abandonRoomConfirmModalButtonClick(btn) {
    var contractId = $(btn).attr("data-contract-id");
    var $abandonRoomConfirmModal = $('#abandonRoomConfirmModal');
    $.ajax({
        url: contextPath + "/rentalContract/getUnpaidBillCountByContractId.html",
        data: {"contractId": contractId},
        success: function (data) {
            var count = parseInt(data);
            if (count > 0) {
                $abandonRoomConfirmModal.find(".abandonInfo").html("您还有<strong class='text-danger'>" + count + "</strong>个账单未处理，是否确认退租?");
            } else {
                $abandonRoomConfirmModal.find(".abandonInfo").html("所有账单已经处理完成！");
            }
            $abandonRoomConfirmModal.modal('show');
            $abandonRoomConfirmModal.find(".need-contract-id").attr("data-contract-id", contractId);
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//确定退租房源合同按钮点击
function abandonHouseModalButtonClick(btn) {
    var contractId = $(btn).attr("data-contract-id");
    $.ajax({
        url: contextPath + "/rentalContract/getOwnerContractById.html",
        data: {"contractId": contractId},
        dataType: "json",
        success: function (data) {
            var $modal = $("#abandonHouseModal");
            var houseInfo = data[1].building + `栋` + data[1].unit + `单元` + data[1].floor + `楼` + data[1].no + `号`;
            $modal.find(".community-name").html(data[1].community.communityName);
            $modal.find(".house-address").html(data[1].community.province + " " + data[1].community.city + " " + data[1].community.area + " " + data[1].community.communityAddress);
            $modal.find(".house-info").html(houseInfo);
            $modal.find(".contract-start-date").html(data[0].startDate);
            $modal.find(".contract-end-date").html(data[0].endDate);
            $modal.find(".clientele-name").html(data[0].clienteleName);
            $modal.find(".phone-number").html(data[0].phoneNumber);
            $modal.find(".deposit").html(data[0].deposit);
            $modal.find(".pay-type").html(data[0].payType);
            $modal.find("[name = 'contract.abandonDate']").val(DateFormat.getNowDateString("yyyy-MM-dd"));
            $modal.find("[name = 'contract.id']").val(data[0].id);
            $modal.modal("show");
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//确定退租房源合同按钮点击
function abandonRoomModalButtonClick(btn) {
    var contractId = $(btn).attr("data-contract-id");
    $.ajax({
        url: contextPath + "/rentalContract/getRentContractById.html",
        data: {"contractId": contractId},
        dataType: "json",
        success: function (data) {
            var $modal = $("#abandonRoomModal");
            var houseInfo = data[1].building + `栋` + data[1].unit + `单元` + data[1].floor + `楼` + data[1].no + `号  (` + data[2].roomName + `)`;
            $modal.find(".community-name").html(data[1].community.communityName);
            $modal.find(".house-address").html(data[1].community.province + " " + data[1].community.city + " " + data[1].community.area + " " + data[1].community.communityAddress);
            $modal.find(".house-info").html(houseInfo);
            $modal.find(".contract-start-date").html(data[0].startDate);
            $modal.find(".contract-end-date").html(data[0].endDate);
            $modal.find(".clientele-name").html(data[0].clienteleName);
            $modal.find(".phone-number").html(data[0].phoneNumber);
            $modal.find(".deposit").html(data[0].deposit);
            $modal.find(".pay-type").html(data[0].payType);
            $modal.find("[name = 'contract.abandonDate']").val(DateFormat.getNowDateString("yyyy-MM-dd"));
            $modal.find("[name = 'contract.id']").val(data[0].id);
            $modal.modal("show");
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//退租 房源合同
function abandonContract($form) {
    $.ajax({
        url: contextPath + "/rentalContract/abandonContract.html",
        data: $form.serialize(),
        success: function (data) {
            ajaxSuccess(data);
            $("#abandonHouseModal").modal('hide');
            $("#abandonRoomModal").modal('hide');
            $('#houseTab').find('.active').find(' a').click();
            $('#roomTab').find('.active').find(' a').click();
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}

//获取租房合同
function get_rent_contract(target) {
    var $div = $($(target).attr("href"));
    var roomId = $(target).attr("data-room-id");
    var houseId = $(target).attr("data-house-id");

    // magicAlert(roomId,"success");
    $.getJSON(
        contextPath + "/rentalContract/getRentContract.html",
        {"roomId": roomId},
        function (data) {
            if (data === null) {
                $.ajax({
                    url: contextPath + "/rentalContract/getRoomStatus",
                    data: {"roomId": roomId},
                    async: false,
                    success: function (roomStatus) {
                        $div.html(`<div class="row center">
                              <h3 class="text-info ">当前无生效合同</h3>
                          </div>
                          ` + (roomStatus == "停用" ? `` :
                            `<div class="row center">
                              <button class="btn btn-success need-attr-room-id need-attr-house-id" onclick="toAddRentContract(this)"
                               data-toggle="modal"  >点击签约</button>
                            </div>`)
                            + `
                `);
                    }
                });

            } else {
                var rentalInfos = "";
                for (var i = 0; i < data.rentalInfos.length; i++) {
                    rentalInfos += `
                        <tr>
                            <td>分段` + (i + 1) + `</td>
                            <td>租赁时间：<span class="text-info">` + data.rentalInfos[i].rentStartTime + `</span> 至 <span class="text-info">` + data.rentalInfos[i].rentEndTime + `</span></td>
                            <td>租金：<span class="text-info">` + data.rentalInfos[i].rentMoney + `</span>元/月</td>
                        </tr>`;
                }
                var otherCostInfo = "";
                for (var i = 0; i < data.otherCostInfos.length; i++) {
                    otherCostInfo += `
                            <tr>
                                <td class="text-info">` + data.otherCostInfos[i].costName + `</td>
                                ` + (data.otherCostInfos[i].costType == "固定收费" ? `
                                <td>固定每月收费</td>
                                <td >费用金额：<span class="text-info">` + data.otherCostInfos[i].totalPrice + `</span> 元/月</td>` : `
                                <td>抄表收费</td>
                                <td >费用金额：<span class="text-info">` + data.otherCostInfos[i].unitPrice + `</span> 元/` + data.otherCostInfos[i].unitName + `</td>
                                `) + `
                            </tr>
                    `
                }
                $div.html(`
                        <h2>
                            <strong class="text-primary">生效合同&nbsp;&nbsp;<small>(` + data.startDate + ` 至 ` + data.endDate + `)</small></strong>
                            <div style="float: right">
                                <button class="btn btn-default need-attr-contract-id" disabled> 打印</button>
                                <button class="btn btn-default need-attr-contract-id"  data-modal-target="#editRoomContractModal" onclick="editContractBtnClick(this)"> 编辑 </button>
                                <button class="btn btn-primary need-attr-contract-id"  data-modal-target="#reletRoomModal" onclick="reletRoomModalButtonClick(this)"> 续租 </button>
                                <button class="btn btn-warning need-attr-contract-id"  data-modal-target="#abandonRoomModal" onclick="abandonRoomConfirmModalButtonClick(this)"> 退租 </button>
                            </div>
                        </h2>
                        <hr>
                        <h4><strong>基本信息：</strong></h4>
                        <table>
                            <tr>
                                <td>租客姓名:</td>
                                <td class="text-info">` + data.clienteleName + `</td>
                            </tr>
                            <tr>
                                <td>手机号码:</td>
                                <td class="text-info">` + data.phoneNumber + `</td>
                            </tr>
                            <tr>
                                <td>` + data.certificateType + `号:</td>
                                <td class="text-info">` + data.certificateNo + `</td>
                            </tr>
                            <tr>
                                <td>证件附件:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>合同附件:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>合同备注</td>
                                <td class="text-info"><textarea readonly style="width: 200%;height: 100px" class="form-control"> ` + data.remark + `</textarea></td>
                            </tr>
                        </table>

                        <h4><strong>租赁信息：</strong></h4>

                        <table>
                            ` + rentalInfos + `
                            <tr>
                                <td>押金</td>
                                <td><span class="text-info">` + data.deposit + `</span>元</td>
                            </tr>
                            <tr>
                                <td>支付方式</td>
                                <td><span class="text-info">` + data.payType + `</span>月/付</td>
                            </tr>
                            <tr>
                                <td>` + data.rentType + `</td>
                                <td>` + (data.rentType == '固定交租日' ? `每月` + data.rentDate + `日` : `提前` + data.rentDate + `天`) + `</td>
                            </tr>
                        </table>

                        <h4><strong>杂费信息：</strong></h4>

                        <table>
                        ` + otherCostInfo + `
                        </table>
                    `);
                addId($div.get(0), "need-attr-contract-id", "data-contract-id", data.id);
            }
            $div.append(`
                        <hr>
                        <h3>
                            <button type="button" class="btn btn-link need-attr-room-id" onclick="getRoomHistoryContracts(this,'` + $(target).attr("href") + `')">
                                    <i class="glyphicon glyphicon-info-sign"></i>&nbsp;&nbsp;历史合同</button>
                        </h3>
                        <center><table class="table table-bordered table-striped table-hover historyTable"></table></center>
                        `
            );
            addId($div.get(0), "need-attr-room-id", "data-room-id", roomId);
            addId($div.get(0), "need-attr-house-id", "data-house-id", houseId);
        }
    );
}

function getRoomHistoryContracts(btn, div) {
    var $div = $(div);
    var roomId = $(btn).attr("data-room-id");
    $.ajax({
        url: contextPath + "/rentalContract/getRoomHistoryContracts",
        data: {"roomId": roomId},
        dataType: "json",
        success: function (data) {
            if (data == null || data.length <= 0) {
                $div.find(".historyTable").html(`
                <tr><td><h4 style="text-align: center" class="text-primary">暂无历史合同</h4></td></tr>
`)
            } else {
                var trStr = `<tr>
                            <td>租客姓名</td>
                            <td>开始时间</td>
                            <td>结束时间</td>
                            <td>退租时间</td>
                            <td>退租原因</td>
                        </tr>`;
                for (var i in data) {
                    trStr += `<tr>
                                <td>` + data[i].clienteleName + `</td>
                                <td>` + data[i].startDate + `</td>
                                <td>` + data[i].endDate + `</td>
                                <td>` + (data[i].abandonDate == null ? `-` : data[i].abandonDate) + `</td>
                                <td>` + (data[i].abandonRemark == null ? `-` : data[i].abandonRemark) + `</td>
                            </tr>`
                }
                $div.find(".historyTable").html(trStr);
            }
        }

    });
}


//to添加租房合同模态框
function toAddRentContract(btn) {
    var $button = $(btn);
    var houseId = $button.attr('data-house-id');
    var roomId = $button.attr('data-room-id');
    var $signedRoomModal = $("#signedRoomModal");
    $signedRoomModal.find("[name = houseId]").val(houseId);
    $signedRoomModal.find("[name = roomId]").val(roomId);
    $.ajax({
        url: contextPath + "/rentalContract/getRoomDetailByRoomId.html",
        data: {'roomId': roomId},
        dataType: "json",
        success: function (data) {
            $signedRoomModal.find("[name = CID]").val(data.house.community.id);
            $signedRoomModal.find(".house-info").html(data.house.community.communityName + " " + data.house.building + "栋" + data.house.unit + "单元" + data.house.floor + "楼" + data.house.no + "号 （" + data.roomName + ")");
            $signedRoomModal.find(".house-address").html(data.house.community.province + " " + data.house.community.city + " " + data.house.community.area + " " + data.house.community.communityAddress);
            $signedRoomModal.modal("show");
        },
        error: function () {
            magicAlert("发生错误啦!", "failed");
        }
    });
}
