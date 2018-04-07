/**
 * Project <AceManager>
 * Created by zkq on 2017/6/29 9:46.
 */

$(document).ready(function () {
    //菜单栏切换
    $('[id $= "Tab" ] a').click(function (e) {
        e.preventDefault();
        var target = e.target;
        switch ($(target).attr("name")) {
            case "house_detail":
                get_house_detail(target);
                break;
            case "custody_contract":
                get_custody_contract(target);
                break;
            case "rental_bill":
                get_rental_bill(target);
                break;
            case "rent_contract":
                get_rent_contract(target);
                break;
            case "room_detail":
                get_room_detail(target);
                break;
            case "tenant":
                get_room_bill(target);
                break;
            default:
                break;
        }
        $(this).tab('show');
    });


    //删除房源模态框
    $('#delHouseModal').on('show.bs.modal', function (event) {
        addHouseId(this, event);
    });

    //停用房源模态框
    $('#disableHouseModal').on('show.bs.modal', function (event) {
        addHouseId(this, event);
    });

    //添加房间模态框
    $('#addRoomConfirmModal').on('show.bs.modal', function (event) {
        addHouseId(this, event);
    });

    //退租房源模态框
    $('#abandonHouseModal').on('show.bs.modal', function () {
        $(this).find('[name = endTime]').val(DateFormat.getNowDateString('yyyy-MM-dd'));      //点击时设置时间
    });

    //退租房间模态框
    $('#abandonRoomModal').on('show.bs.modal', function () {
        $(this).find('[name = endTime]').val(DateFormat.getNowDateString('yyyy-MM-dd'));      //点击时设置时间
    });

    //续租模态框
    $('#reletRoomModal,#signedRoomModal,#signedHouseModal,#reletHouseModal').on('show.bs.modal', function () {         //初始化下拉框
        var $chooseMonth = $(this).find('.chooseMonth');
        for (var i = 2; i <= 24; i++) {
            $chooseMonth.append('<option value="' + i + '">' + i + '</option>')
        }
    });

    $('#signedRoomModal,#signedHouseModal').on('show.bs.modal', function () {    // 初始化时间
        var date = new Date();
        $(this).find('.startDate').val(DateFormat.getNowDateString("yyyy-MM-dd"));
        date.setMonth(date.getMonth() + 1);
        $(this).find('.endDate').val(DateFormat.getDateString(date, "yyyy-MM-dd"));
    });

    //选择日期
    $('#reletHouseModal,#reletRoomModal,#signedRoomModal,#signedHouseModal').find('.chooseMonth').change(function () {
        setEndDate($(this).parents(' tr'));
    });

    //编辑账单模态框
    $('#editBillModal').on('show.bs.modal', function (event) {
        editBillId(this, event);
    });

    //添加账单模态框
    $("#addBillModal").on('show.bs.modal', function (event) {
        addBillModal(this, event);
    });

    //账单查看模态框
    $('#showBillModal,#delBillModal').on('show.bs.modal', function (event) {
        ShowBillId(this, event);
    });

    //收租模态框触法事件
    $('#payForBillModal').on('show.bs.modal', function (event) {
        $(this).find('[name = realDate]').val(DateFormat.getNowDateString("yyyy-MM-dd HH:mm:ss"));         //点击时设置时间
    });

    //抄表模态框
    $("#addMeterModal").on('show.bs.modal', function (event) {
        addMeterReadId(this, event);
    });

    //houseModal 模态框
    $('#houseModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var houseId = button.data('house-id');
        $(this).find('[name = house-id]').html(houseId);
        $(this).find('.need-attr-house-id').attr('data-house-id', houseId);
        $('#houseTab').find(' a[ name = house_detail ]').click();
    });

    //roomShowModal 模态框
    $('#roomShowModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var houseId = button.data('house-id');
        var roomId = button.data('room-id');
        $(this).find('[name = room-id]').val(roomId);
        $(this).find('[name = house-id]').val(houseId);
        $(this).find('.need-attr-room-id').attr('data-room-id', roomId);
        $(this).find('.need-attr-house-id').attr('data-house-id', houseId);
        $('#roomTab').find(' a[ name = room_detail ]').click();
    });

});

//为模态框添加house-id
function addHouseId(obj, event) {
    var button = $(event.relatedTarget);
    var houseId = button.attr('data-house-id');
    $(obj).find('[name = house-id]').html(houseId);
}
