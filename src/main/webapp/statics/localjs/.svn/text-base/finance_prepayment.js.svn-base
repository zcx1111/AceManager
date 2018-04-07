$(document).ready(function(){
    getBudget(1);
});

//账单详情
$('#budget_detail').on('show.bs.modal', function(event) {

		var button = $(event.relatedTarget);
		var recipient = button.attr("id");
		$.ajax({
			url:contextPath+"/finance/getBillById/"+recipient,
			success:function(resultJson){
				var result = eval("("+resultJson+")");
                if(result.rentalRoomId != null){
                    $("#roomName").text(result.room.house.community.communityName+''+result.house.building+'栋'+result.room.house.unit+'单元'+result.room.house.floor+'楼'+result.room.house.no+'号'+result.room.roomName);
                }
                if(result.rentalHouseId != null){
                    $("#roomName").text(result.house.community.communityName+''+result.house.building+'栋'+result.house.unit+'单元'+result.house.floor+'楼'+result.house.no+'号');
                }
				$("#transactionObject_detail").text(result.transactionObject);
				$("#transactionObjectName").text(result.transactionObjectName);
				$("#billStartTime_dudget_detail").text(result.billStartDate);
				$("#billEndTime_detail").text(result.billEndDate);
				$("#totalMoney_detail").text(result.totalMoney);
				$("#receiptDate_detail").text(result.receiptDate);
		      	$("#fundFlow").text(result.fundFlow);
		      	$("#batch").text(result.batch);
		       	var trStr = "";
		       	for(var i = 0;i<result.costList.length;i++){
		       		trStr += '<tr >';//拼接处规范的表格形式
		       		trStr += '<td >' + result.costList[i].costName + '</td>';//费用名称
		       		trStr += '<td >' + result.costList[i].feeAmount + '</td>';//费用金额
		       		trStr += '</tr>';
		       	}
		       	$("#tbody1").html(trStr);
			},
			error:function(XMLHttpRequest,textStatus){
				magicAlert("error","failed");
			}
	});
	});

//预算列表
function getBudget(currPageNo){
    var strTr = "";
    var list = "";
	$.ajax({
		url:contextPath+"/finance/getBudget/"+currPageNo,
		data:$("#budget_form").serialize(),
		success:function(result){
            if(result === "noLogin"){
                magicAlert("请重新登陆！","success");
                resetLogin();
            }
			var page = eval("("+result+")");
			var items = page.items;
            for(var i=0;i<items.length;i++){
                strTr +='<tr data-toggle="modal" data-target="#budget_detail" id="'+items[i].id+'">' +
                    '<td style="text-align:center"">'+items[i].receiptDate+'</td>' +
                    '<td style="text-align:center"">'+items[i].billStartDate+'至'+items[i].billEndDate+'</td>';
                if(items[i].rentalRoomId != null){
                    strTr +='<td style="text-align:center"">'+items[i].house.community.communityName+''+items[i].house.building+'栋'+items[i].room.house.unit+'单元'+items[i].room.house.floor+'楼'+items[i].room.house.no+'号'+items[i].room.roomName+'</td>';
                }
                if(items[i].rentalHouseId != null){
                    strTr +='<td style="text-align:center"">'+items[i].house.community.communityName+''+items[i].house.building+'栋'+items[i].house.unit+'单元'+items[i].house.floor+'楼'+items[i].house.no+'号</td>';
                }
				/*strTr +='<td style="text-align:center"">'+items[i].house.community.communityName+''+items[i].house.building+'栋'+items[i].house.unit+'单元'+items[i].house.floor+'楼'+items[i].house.no+'号'+items[i].room.roomName+'</td>' +*/
                strTr +='<td style="text-align:center"">'+items[i].transactionObject+'</td>' +
                    '<td style="text-align:center"">'+items[i].transactionObjectName+'</td>' +
                    '<td style="text-align:center"">'+items[i].fundFlow+'</td>' +
                    '<td style="text-align:center;';
                if(items[i].fundFlow == '支出'){
                    strTr += 'color: red"';
                }
                if(items[i].fundFlow == '收入'){
                    strTr += 'color: green"';
                }
                strTr +=' >'+items[i].totalMoney+'</td></tr>';
            }


            //首页
            list += '<li><a href="javascript:void(0)" title="首页" onclick="getBudget(1);">首页</a></li>';
            //上一页
            list += '<li><a href="javascript:void(0)" title="上一页" onclick="getBudget('+(page.currPageNo-1)+');"><i class="glyphicon glyphicon-chevron-left"></i></a></li>';
            //前2
            for ( var i = 0; i < page.prevPages.length; i++) {
                list += '<li><a href="javascript:void(0)" onclick="getBudget('+page.prevPages[i]+');">'+page.prevPages[i]+'</a></li>';
            }
            //当前页
            list += '<li class="active"><a href="javascript:void(0)">'+page.currPageNo+'</a></li>';
            //后2
            for ( var i = 0; i < page.nextPages.length; i++) {
                list += '<li><a href="javascript:void(0)" onclick="getBudget('+page.nextPages[i]+');">'+page.nextPages[i]+'</a></li>';
            }
            //下一页
            list += '<li><a href="javascript:void(0)" title="下一页" onclick="getBudget('+(page.currPageNo+1)+');"><i class="glyphicon glyphicon-chevron-right"></i></a></li>';
            //尾页
            list += '<li><a href="javascript:void(0)" title="尾n页" onclick="getBudget('+page.totalPageCount+');">尾页</a></li>';

            $("#tbody_budgetList").html(strTr);
            $("#page_budget_num").html('共'+page.totalCount+'条记录 &nbsp;&nbsp;'+page.currPageNo+'/'+page.totalPageCount+'页');
            $("#pagination_budget_page").html(list);
        },
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