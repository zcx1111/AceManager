/**
 * 获取未支付的 应收账单
 */
function getNonPayedRoomBills() {
    var date = DateFormat.getNowDateString("yyyy-MM-dd");
    $.ajax({
        url: contextPath + "/main/getNonPayedRoomBills.html",
        data: {"date": date},
        dataType: "json",
        success: function (data) {
            if (data == null || data == '') {
                return;
            }
            $("#nonPayedRoomBillsSup").html(data.length == 0 ? "" : data.length);
            var $tbody = $("#nonPayedRoomBillsTab").find("tbody");
            var trStr = "";
            for (var i in data) {
                trStr += `<tr data-toggle="xsd-drawer" >
                                <td>` + data[i].receiptDate + `</td>
                                <td>` + data[i].house.community.communityName + data[i].house.building + `栋` +
                    data[i].house.unit + `单元` + data[i].house.floor + `楼` + data[i].house.no + `号` + data[i].room.roomName + `</td>
                                <td>` + data[i].transactionObjectName + `</td>
                                <td>` + data[i].totalMoney + `</td>
                                <td>
                                    <a class="xsd-color-primary btn-link" data-toggle="modal" data-bill-id="` + data[i].id + `" data-target="#billMassageModal" >催租</a>
                                    <a class="xsd-color-primary btn-link" data-toggle="modal" data-bill-id="` + data[i].id + `" data-target="#payForBillModal" >收租</a>
                                </td>
                            </tr>`;
            }
            $tbody.html(trStr);
        }
    });
}

/**
 * 获取未支付的 应付账单
 */
function getNonPayedHouseBills() {
    var date = DateFormat.getNowDateString("yyyy-MM-dd");
    $.ajax({
        url: contextPath + "/main/getNonPayedHouseBills.html",
        data: {"date": date},
        dataType: "json",
        success: function (data) {
            if (data == null || data == '') {
                return;
            }
            $("#nonPayedHouseBillsSup").html(data.length == 0 ? "" : data.length);
            var $tbody = $("#nonPayedHouseBillsTab").find("tbody");
            var trStr = "";
            for (var i in data) {                         //TODO 绑定付款
                trStr += `<tr data-toggle="xsd-drawer" data-target="#handleHouseOrder">
                                            <td>` + data[i].receiptDate + `</td>
                                            <td>` + data[i].house.community.communityName + data[i].house.building + `栋` +
                    data[i].house.unit + `单元` + data[i].house.floor + `楼` + data[i].house.no + `号` + `</td>
                                            <td>` + data[i].transactionObjectName + `</td>
                                            <td>` + data[i].totalMoney + `</td>
                                            <td><a  class="xsd-color-primary btn-link" data-toggle="modal"  data-bill-id="` + data[i].id + `" data-target="#payForBillModal"  >付款</a></td>
                                        </tr>`;
            }
            $tbody.html(trStr);

        }

    });

}

/**
 * 获取到期的租房合同
 */
function getPendingRoomContractsTab() {
    var date = DateFormat.getNowDateString("yyyy-MM-dd");
    $.ajax({
        url: contextPath + "/main/getOutOfDateRoomContracts.html",
        data: {"date": date},
        dataType: "json",
        success: function (data) {
            var $tbody = $("#pendingRoomContractsTab").find("tbody");
            var trStr = "";
            if (data == null || data == "") {
                return;
            }
            $("#pendingRoomContractsSup").html(data.length == 0 ? "" : data.length);
            for (var i in data) {
                trStr += `<tr data-toggle="xsd-drawer" >
                                            <td>` + data[i].endDate + `</td>
                                            <td>` + data[i].house.community.communityName + data[i].house.building + `栋` +
                    data[i].house.unit + `单元` + data[i].house.floor + `楼` + data[i].house.no + `号` + data[i].room.roomName + `</td>
                                            <td>` + data[i].clienteleName + `</td>
                                            <td>
                                                <a class="xsd-color-primary btn-link" data-toggle="modal" onclick="abandonRoomConfirmModalButtonClick(this)" data-contract-id="`+data[i].id+`"  >退租</a>
                                                <a class="xsd-color-primary btn-link" data-toggle="modal" onclick="reletRoomModalButtonClick(this)" data-contract-id="`+data[i].id+`">续租</a></td>
                                        </tr>
`;
                $tbody.html(trStr);
            }
        }


    });
}

/**
 * 获取到期的租房合同
 */
function getPendingHouseContractsTab() {
    var date = DateFormat.getNowDateString("yyyy-MM-dd");
    $.ajax({
        url: contextPath + "/main/getOutOfDateHouseContracts.html",
        data: {"date": date},
        dataType: "json",
        success: function (data) {
            var $tbody = $("#pendingHouseContractsTab").find("tbody");
            var trStr = "";
            if (data == null || data == "") {
                return;
            }
            $("#pendingHouseContractsSup").html(data.length == 0 ? "" : data.length);
            for (var i in data) {
                trStr += `<tr data-toggle="xsd-drawer" >
                                            <td>` + data[i].endDate + `</td>
                                            <td>` + data[i].house.community.communityName + data[i].house.building + `栋` +
                    data[i].house.unit + `单元` + data[i].house.floor + `楼` + data[i].house.no + `号` + `</td>
                                            <td>` + data[i].clienteleName + `</td>
                                            <td>
                                                <a class="xsd-color-primary btn-link" data-toggle="modal" onclick="abandonHouseConfirmModalButtonClick(this)" data-contract-id="`+data[i].id+`" >退租</a>
                                                <a class="xsd-color-primary btn-link" data-toggle="modal" onclick="reletHouseModalButtonClick(this)" data-contract-id="`+data[i].id+`">续租</a></td>
                                        </tr>
`;
                $tbody.html(trStr);
            }
        }


    });
}

$(document).ready(function () {

    $("[id $= 'Modal']").on("hide.bs.modal", function () {
        $("#myIndexTab").find(" .active a").click();
    });
    getNonPayedHouseBills();
    getPendingRoomContractsTab();
    getPendingHouseContractsTab();
    $('[id $= "Tab" ] a').click(function (e) {
        e.preventDefault();
        var target = e.target;
        switch ($(target).attr("name")) {
            case "nonPayedRoomBills":
                getNonPayedRoomBills();
                break;
            case "nonPayedHouseBills":
                getNonPayedHouseBills();
                break;
            case "pendingRoomContracts":
                getPendingRoomContractsTab();
                break;
            case "pendingHouseContracts":
                getPendingHouseContractsTab();
                break;
            default:
                break;
        }
        $(this).tab('show');

    });


    WdatePicker({
        eCont: 'calendar',
        onpicked: function (dp) {
            alert('你选择的日期是:' + dp.cal.getDateStr())
        }
    })
    /* $("#tab1 table tr,#tab2 table tr").not(":last").click(function(){
       $("#showBillModal").modal('show');
    })
    $("#tab3 table tr").not(":last").click(function(){

    }) */

    //弹窗示例
    $("#testAlert").click(function () {
        //写入操作结果信息
        $("#toastr #info").text("测试弹窗");
        //显示弹窗
        $("#toastr").css("display", "block");
        //2秒后弹窗消失
        setTimeout(function () {
            $("#toastr").css("display", "none");
        }, 2000);
    })

    $(" body").find("[name = nonPayedRoomBills]").click();

    var now = new Date();
    now.setDate(now.getDate() - 1);
    $("#dayReport").html(now.getDate());
    now = new Date();
    now.setMonth(now.getMonth() - 1);
    $("#monthReport").html(now.getMonth()+1);

});