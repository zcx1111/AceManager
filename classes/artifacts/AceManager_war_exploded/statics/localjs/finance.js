$(document).ready(function () {
	getListBill(1);
});

//收支详情
$('#myModal').on('show.bs.modal', function(event) {

		var button = $(event.relatedTarget);
		var recipient = button.attr("id");
		var trStr = '';
		
		$.ajax({
			url:contextPath+"/finance/getBillById/"+recipient,
			success:function(resultjson){
				var result = eval("("+resultjson+")");
				$("#billId").text(result.id);
				if(result.rentalRoomId != null){
                    $("#roomName").text(result.room.house.community.communityName+''+result.house.building+'栋'+result.room.house.unit+'单元'+result.room.house.floor+'楼'+result.room.house.no+'号'+result.room.roomName);
				}
                if(result.rentalHouseId != null){
                    $("#roomName").text(result.house.community.communityName+''+result.house.building+'栋'+result.house.unit+'单元'+result.house.floor+'楼'+result.house.no+'号');
                }
				$("#transactionObject-detail").text(result.transactionObject);
				$("#transactionObjectName").text(result.transactionObjectName);
				$("#actualTransactionDate").text(result.actualTransactionDate);
		      	$("#fundFlow").text(result.fundFlow);
		      	$("#batch").text(result.batch);
		       	$("#totalMoney").text(result.totalMoney);
		       	for(var i = 0;i<result.costList.length;i++){
		       		trStr += '<tr >';//拼接处规范的表格形式
		       		trStr += '<td >' + result.costList[i].costName + '</td>';//数据表的主键值
		       		trStr += '<td >' + result.costList[i].feeAmount + '</td>';//对应数组表的字段值
		       		trStr += '</tr>';
		       	}
		       	$("#tbody1").html(trStr);
			},
			error:function(XMLHttpRequest,textStatus){
				alert("error");
				alert(XMLHttpRequest.readyState);
				alert(textStatus)
			}
		});
    
	});

//查询收支流水
function getListBill(currPageNo){
	var strTr = "";
	var list = "";
	$.ajax({
		url:contextPath + "/finance/listByPage/"+currPageNo,
		data:$("#check_bill_list").serialize(),
		success:function(resultJson){
			if(resultJson === "noLogin"){
				magicAlert("请重新登陆！","success");
                resetLogin();
			}
			var page = eval("("+resultJson+")");
			var items = page.items;
			for(var i=0;i<items.length;i++){
				strTr +='<tr data-toggle="modal" data-target="#myModal" id="'+items[i].id+'">' +
					'<td style="text-align:center">'+items[i].actualTransactionDate+'</td>' +
					'<td style="text-align:center">'+items[i].id+'</td>';
				if(items[i].rentalRoomId != null){
					strTr +='<td style="text-align:center">'+items[i].house.community.communityName+''+items[i].house.building+'栋'+items[i].room.house.unit+'单元'+items[i].room.house.floor+'楼'+items[i].room.house.no+'号'+items[i].room.roomName+'</td>';
				}else if(items[i].rentalHouseId != null){
					strTr +='<td style="text-align:center">'+items[i].house.community.communityName+''+items[i].house.building+'栋'+items[i].house.unit+'单元'+items[i].house.floor+'楼'+items[i].house.no+'号</td>';
				}
                strTr +='<td style="text-align:center">'+items[i].transactionObject+'</td>' +
					'<td style="text-align:center">'+items[i].transactionObjectName+'</td>' +
					'<td style="text-align:center">'+items[i].paymentMethod+'</td>' +
					'<td style="text-align:center">'+items[i].fundFlow+'</td>' +
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
            list += '<li><a href="javascript:void(0)" title="首页" onclick="getListBill(1);">首页</a></li>';
            //上一页
            list += '<li><a href="javascript:void(0)" title="上一页" onclick="getListBill('+(page.currPageNo-1)+');"><i class="glyphicon glyphicon-chevron-left"></i></a></li>';
            //前2
            for ( var i = 0; i < page.prevPages.length; i++) {
                list += '<li><a href="javascript:void(0)" onclick="getListBill('+page.prevPages[i]+');">'+page.prevPages[i]+'</a></li>';
            }
            //当前页
            list += '<li class="active"><a href="javascript:void(0)">'+page.currPageNo+'</a></li>';
            //后2
            for ( var i = 0; i < page.nextPages.length; i++) {
                list += '<li><a href="javascript:void(0)" onclick="getListBill('+page.nextPages[i]+');">'+page.nextPages[i]+'</a></li>';
            }
            //下一页
            list += '<li><a href="javascript:void(0)" title="下一页" onclick="getListBill('+(page.currPageNo+1)+');"><i class="glyphicon glyphicon-chevron-right"></i></a></li>';
            //尾页
            list += '<li><a href="javascript:void(0)" title="尾n页" onclick="getListBill('+page.totalPageCount+');">尾页</a></li>';

			$("#tbody_billList").html(strTr);
			$("#page_num").html('共'+page.totalCount+'条记录 &nbsp;&nbsp;'+page.currPageNo+'/'+page.totalPageCount+'页');
			$("#pagination_page").html(list);
		}
	});
}

//延迟加载
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

/*
function execl(){
    /!*var curTbl = document.getElementById(tableid);*!/

    var oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel

    var oWB = oXL.Workbooks.Add(); //获取workbook对象

    var oSheet = oWB.ActiveSheet; //激活当前sheet

    var sel = document.body.createTextRange();

    sel.moveToElementText($("#finance_table")); //把表格中的内容移到TextRange中

    sel.select(); //全选TextRange中内容

    sel.execCommand("Copy"); //复制TextRange中内容

    oSheet.Paste(); //粘贴到活动的EXCEL中

    oXL.Visible = true; //设置excel可见属性

}*/
