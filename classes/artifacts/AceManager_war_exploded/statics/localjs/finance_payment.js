
$(document).ready(function () {
	getListCost(1);

	//明细详情模态框
    $('#myModal').on('show.bs.modal', function(event) {
    	costDetail(this,event);
	});

    //删除明细模态框
    $('#myModal-del').on('show.bs.modal', function(event) {
        delCost(this,event);
    });

    $("#myModal_create").on('show.bs.modal', function(event) {
        addCostHouse();
    });

});


//添加明细验证
function addCost(){
	var pass = true;
	var p2 = /^[0-9]+(.[0-9]{2})?$/;
	var flowType = $("#flowType2").val();
	var p = $("#transactionObjectName2").val();
	var h = $("#housingName2").val();
	var r = $("#transactionRoom2").val();
	var c = $("#feeAmount2").val();
	var t = $("#transactionTime2").val();

    if(flowType == "支出"){
        $("#feeAmount_add_cost").val($("#feeAmount2").val()*(-1));
    }else{
        $("#feeAmount_add_cost").val($("#feeAmount2").val());
    }

	if(trim(p) == ''){//收款人
		$("#transactionObjectName1").text("*请输入收款人");
		pass = false;
	}else{
		$("#transactionObjectName1").text("");
	}
	
	if(h == ''){
		$("#housingName1").text("*请输入房源名称");
		pass = false;
	}else{
		$("#housingName1").text("");
	}

	 if(r == ''){
		$("#roomName1").text("*请输入房间名称");
		pass = false;
	}else{
		$("#roomName1").text("");
	}
	
	if(trim(c) == ''){
		$("#cost1").text("*请输入费用金额");
		pass = false;
	}else{
		var pattern = new RegExp(p2);
		if(!pattern.test(c))
		{
			$("#cost1").text("*请输入正确的费用金额:如11.11或11");
			pass=false;
		}else{
			$("#cost1").text("");
		}
	}
	
	if(t == ''){
		$("#transactionTime1").text("*请输入交易时间");
		pass = false;
	}else{
		$("#transactionTime1").text("");
	} 

    if(pass) {
	    if(confirm("确认提交?")) {

            $.ajax({
                url: contextPath + "/finance/updateCost",
                type: "POST",
                data: $("#detail1").serialize(),
                success: function (result) {
                    if (result == "0") {
                        magicAlert("添加明细失败！", "failed");
                    } else {
                        magicAlert("添加明细成功！", "success");
                        $("#myModal_create").modal("hide");
                        getListCost(1);
                    }
                },
                error: function () {
                    magicAlert("error", "failed");
                }
            });
        }else{
	        return false;
        }
    }else{
	    magicAlert("填写格式错误！","failed");
    }

	};
	
function trim(str){ //删除左右两端的空格
     return str.replace(/(^\s*)|(\s*$)/g, "");
 }

//查询流水明细列表
function getListCost(currPageNo){
    var strTr = "";
    var list = "";
    $.ajax({
        url:contextPath + "/finance/listCostByPage/"+currPageNo,
        data:$("#check_list_cost").serialize(),
        success:function(resultJson){
            if(resultJson === "noLogin"){
                magicAlert("请重新登陆！","success");
                resetLogin();
            }
            var page = eval("("+resultJson+")");
            var items = page.items;
            for(var i=0;i<items.length;i++){
                strTr +='<tr data-toggle="modal" data-target="#myModal" id="'+items[i].id+'">' +
                    '<td style="text-align:center">'+items[i].bill.actualTransactionDate+'</td>';
                if(items[i].rentalRoom != null){
                    strTr +='<td style="text-align:center">'+items[i].bill.house.community.communityName+''+items[i].bill.house.building+'栋'+items[i].bill.room.house.unit+'单元'+items[i].bill.room.house.floor+'楼'+items[i].bill.room.house.no+'号'+items[i].bill.room.roomName+'</td>';
                }else{
                    strTr +='<td style="text-align:center">'+items[i].bill.house.community.communityName+''+items[i].bill.house.building+'栋'+items[i].bill.house.unit+'单元'+items[i].bill.house.floor+'楼'+items[i].bill.house.no+'号</td>';
                }
                strTr +='<td style="text-align:center">'+items[i].bill.transactionObjectName+'</td>' +
                    '<td style="text-align:center">'+items[i].costName+'</td>';
                if(items[i].bill.billStartDate != null){
                    strTr +='<td style="text-align:center">'+items[i].bill.billStartDate+'至'+items[i].bill.billEndDate+'</td>';
                }else{
                    strTr +='<td style="text-align:center" class="center">-</td>';
                }
                strTr +='<td style="text-align:center">'+items[i].bill.fundFlow+'</td>' +
                    '<td style="text-align:center;';
                if(items[i].bill.fundFlow == '支出'){
                    strTr += 'color: red"';
                }
                if(items[i].bill.fundFlow == '收入'){
                    strTr += 'color: green"';
                }
                strTr +=' >'+items[i].feeAmount+'</td></tr>';
            }


            //首页
            list += '<li><a href="javascript:void(0)" title="首页" onclick="getListCost(1);">首页</a></li>';
            //上一页
            list += '<li><a href="javascript:void(0)" title="上一页" onclick="getListCost('+(page.currPageNo-1)+');"><i class="glyphicon glyphicon-chevron-left"></i></a></li>';
            //前2
            for ( var i = 0; i < page.prevPages.length; i++) {
                list += '<li><a href="javascript:void(0)" onclick="getListCost('+page.prevPages[i]+');">'+page.prevPages[i]+'</a></li>';
            }
            //当前页
            list += '<li class="active"><a href="javascript:void(0)">'+page.currPageNo+'</a></li>';
            //后2
            for ( var i = 0; i < page.nextPages.length; i++) {
                list += '<li><a href="javascript:void(0)" onclick="getListCost('+page.nextPages[i]+');">'+page.nextPages[i]+'</a></li>';
            }
            //下一页
            list += '<li><a href="javascript:void(0)" title="下一页" onclick="getListCost('+(page.currPageNo+1)+');"><i class="glyphicon glyphicon-chevron-right"></i></a></li>';
            //尾页
            list += '<li><a href="javascript:void(0)" title="尾n页" onclick="getListCost('+page.totalPageCount+');">尾页</a></li>';

            $("#tbody_costList").html(strTr);
            $("#page_num").html('共'+page.totalCount+'条记录 &nbsp;&nbsp;'+page.currPageNo+'/'+page.totalPageCount+'页');
            $("#pagination_page").html(list);
        },
		error:function () {
			magicAlert("error","failed");
        }
    });
}

//明细详情
function costDetail(obj, event){
    var button = $(event.relatedTarget);
    var recipient = button.attr("id");
    $(this).find("[name = 'payment-id']").html(recipient);
    $("#butDel").attr("data-payment-id",recipient);
    $.ajax({
        url:contextPath+"/finance/getCostById/"+recipient,
        success:function(resultjson){
            var result = eval("("+resultjson+")");
            if(result.bill.rentalRoomId != null){
                $("#transactionRoom").text(result.bill.room.house.community.communityName+''+result.bill.house.building+'栋'+result.bill.room.house.unit+'单元'+result.bill.room.house.floor+'楼'+result.bill.room.house.no+'号'+result.bill.room.roomName);
            }
            if(result.bill.rentalHouseId != null){
                $("#transactionRoom").text(result.bill.house.community.communityName+''+result.bill.house.building+'栋'+result.bill.house.unit+'单元'+result.bill.house.floor+'楼'+result.bill.house.no+'号');
            }
            $("#transactionObjectName").text(result.bill.transactionObjectName);
            $("#transactionTime").text(result.bill.actualTransactionDate);
            $("#flowMemo-detail").text(result.bill.billNote);
            $("#costNameModal").text(result.costName);
            $("#moneyFlowModal").text(result.bill.fundFlow);
            $("#feeAmount").text(result.feeAmount);
            $("#paymentMethod").text(result.bill.paymentMethod);
            $("#batch").text(result.bill.batch);
        },
        type:"post",
        error:function(){
            magicAlert("error","failed");
        }
    });
}

//删除模态框
function delCost(obj,event){
    var button = $(event.relatedTarget);
    var flowDetailId = button.attr("data-payment-id");
    $("#paymentDelId").text(flowDetailId);
}

//删除明细
function del(){
    var costId = $("#paymentDelId").text();
	$.post(contextPath+"/finance/delCost/"+$("#paymentDelId").text(),
        function(result){
            if(result == "1"){
                magicAlert("删除成功！","success");
                $("#myModal-del").modal("hide");
                $("#myModal").modal("hide");
                getListCost(1);
            }else{
                magicAlert("删除失败！","failed");
            }
	});
}

//加载房源
function addCostHouse(){
    $.ajax({
        url:contextPath+"/finance/getListHouse",
        success:function(resultJson){
            var result = eval("("+resultJson+")");
            $("#housingName2").empty();
            $("#housingName2").append("<option value=''>请选择房源</option>");
            for(var i=0;i<result.length;i++){
                $("#housingName2").append("<option class='addOption' value='"+result[i].id+"'>"+result[i].building+"栋"+result[i].unit+"单元"+result[i].floor+"楼"+result[i].no+"号</option>");
            }
        },
        error:function () {
            magicAlert("error","failed");
        }
    });
}

//加载房间
function addCostRoom(){
    var houseId = $("#housingName2").val();
    $.ajax({
        url:contextPath+"/finance/getListRoom/"+houseId,
        success:function(resultJson){
            $("#transactionRoom2").empty();
            var result = eval("("+resultJson+")");
            for(var i=0;i<result.length;i++){
                $("#transactionRoom2").append("<option value='"+result[i].id+"'>"+result[i].roomName+"</option>");
            }
        },
        error:function () {
            magicAlert("error","failed");
        }
    });
}

function resetFun(){
    setTimeout(function () {
        $('.onclick_reset').click();
    },50);

}

function resetLogin(){
    setTimeout(function () {
        window.location.href = contextPath+"/login.html";
    },1000);
}