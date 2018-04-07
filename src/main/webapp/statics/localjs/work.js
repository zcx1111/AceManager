//业务单进度ajax
function stautsOrder_ajax(){
	$.ajax({
		url : contextPath + "/work/status",
		data : $("#statusOrderForm").serialize(),
		dataType : "json",
		success : function(data) {
			if(data=="success"){
			magicAlert("更改业务单进度成功!请刷新页面","success");
			location.reload();
			}else if(data=="notyou"){
				magicAlert("您不是当前跟进人，没有权限跟进业务单","failed");
			}else if(data=="nonext"){
				magicAlert("请先分配业务单，然后进行操作","failed");
			}else{
			magicAlert("更改业务单进度失败!","success");		
			}
		},
		error : function(){
			magicAlert("失败","failed");
		}
	});
}
//分配业务单ajax
function distributionOrder_ajax(){
	$.ajax({
		type : "POST",
		url : contextPath + "/work/distribution",
		data : $("#distributionOrderForm").serialize(),
		dataType : "html",
		success : function(data) {
			if(data == "isyou"){
				magicAlert("处理人正是您，无需分配!","success");
			}else if(data == "success"){
				magicAlert("分配成功!","success");
				location.reload();
			}else{
				magicAlert("分配失败,请重试!","failed");
			}
		},
		error : function(){
			magicAlert("error","failed");
		}
	});
}
//更新业务单提交ajax
function updateOrder_ajax(){
	$.ajax({
		type : "POST",
		url : contextPath + "/work/update",
		data : $("#editOrderFrom").serialize(),
		dataType : "html",
		success : function(data) {
			if(data == "success"){
				magicAlert("更新成功!请刷新页面","success");
				 location.reload();
			}else{
				magicAlert("提交失败!","success");		
				}
		},
		error : function(){
			magicAlert("error","failed");
		}
	});
}
//添加业务单提交ajax
function insertOrder_ajax(){
	$.ajax({
		type : "POST",
		url : contextPath + "/work/insert",
		data : $("#insertOrderFrom").serialize(),
		dataType : "html",
		success : function(data) {
			if(data == "success"){
				magicAlert("添加业务单成功!","success");
				$("#insert_order_modal").modal("hide");
				 location.reload();
			}else{
				magicAlert("添加失败,请重试!","failed");
			}
		},
		error : function(){
			magicAlert("error","failed");
		}
	});
}
function magicAlert(keywords,success_failed){
   $("#toastr #info").text(keywords);//写入操作结果信息
   $("#toastr").css("display","block");//显示弹窗
   var $p = $("#toastr").find("p");
   var $i = $("#toastr").find("i");
   if(success_failed == "success"){//成功样式
	   $p.attr("class","alert alert-success");
	   $i.attr("class","glyphicon glyphicon-ok");
   }else if(success_failed == "failed"){//失败样式
	   $p.attr("class","alert alert-danger");
	   $i.attr("class","glyphicon glyphicon-remove");
   }
   setTimeout(function(){$("#toastr").css("display","none");},2000);//2秒后弹窗消失
}
function noPermitInput(e){       
       var evt = window.event || e ;     
        if(isIE()){     
            evt.returnValue=false; //ie 禁止键盘输入     
        }else{     
            evt.preventDefault(); //fire fox 禁止键盘输入     
        }        
}     
function isIE() {     
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 1)     
        return true;     
    else     
        return false;     
}     
function getEngencyStar(engency){
	if(engency==1){
		return "<i class='font red glyphicon glyphicon-star'/>";
	}else if (engency==2){
		return "<i class='font yellow glyphicon glyphicon-star'/>";
	}else if	(engency==3){
		return "<i class='font green glyphicon glyphicon-star'/>";
	}
}
function getTitle(title){
	if (title == 1) {
		return '待分配';
	} else if (title == 2) {
		return '跟进中';
	} else if (title == 3) {
		return '已完成';
	}
}
function getGender(gender){
	if (gender == 0) {
		return '男';
	} else if (gender == 1) {
		return '女';
	} else if (gender == 2) {
		return '未知';
	}
}
function getEngency(engency){
	if (engency == 1) {
		return '<span class="font red">紧急</span>';
	} else if (engency == 2) {
		return '<span class="font yellow">正常</span';
	} else if (engency == 3) {
		return '<span class="font green">延后</span>';
	}
}
function getHouseType(houseType){
	if (houseType == 1) {
		return '合住主卧';
	} else if (houseType == 2) {
		return '合住单间独卫';
	} else if (houseType == 3) {
		return '合住单间';
	} else if (houseType == 4) {
		return '整租1室户';
	} else if (houseType == 5) {
		return '整租2室户';
	}
}
function getStatus(status){
	if (status == 0) {
		return '';
	}
	if (status == 2) {
		return '待处理';
	} else if (status == 3) {
		return '已去电';
	} else if (status == 4) {
		return '已带看';
	} else if (status == 5) {
		return '推迟';
	} else if (status == 6) {
		return '无效';
	} else if (status == 7) {
		return '已签约';
	}
}
function getSource(source){
	if (source == 1) {
		return '58同城';
	} else if (source == 2) {
		return '赶集网';
	} 
}
$(document).ready(function(){
	//删除业务单确认
	$(function(){
		$("body").on('click','#deleteOrder',function(){
		  var statu = confirm("确认删除吗?"+$("#doOrder_id").val());
		  if(!statu){
		   return false;
		  }
		  $.ajax({
		    url:contextPath+"/work/delete/"+$("#doOrder_id").val(),
		    dataType:"json",
		    success:function(msg){
		      if(msg == "success"){
		    	  magicAlert("删除成功!","success");
		       location.reload();
		      }else{
		    	  magicAlert("删除失败!","failed");
		      }      
		    },
		    error:function(){
		    	  magicAlert("删除失败!","failed");
		    }
		   })
		 });
		 });
	//签约
	$("body").on('click','#dealOrder',function(){
		 $.ajax({
				url : contextPath+"/work/deal/"+$("#doOrder_id").val(),
				dataType : 'json',
				success:function(data){
					if(data=="success"){
						magicAlert("签约成功!","success");
						location.reload();
					}
				},
				error:function(){
					  magicAlert("签约失败!","failed");
				   }
				})
		 });
	//点击确定，更新业务单进度
	$('#status_submit').click(function(){
		$("#statusOrderForm").submit();
	})
	//当编辑模态框取消时，取消lock	
	 $('#edit_order_modal').on('hide.bs.modal', function () {
		 $.ajax({
				url : contextPath+"/work/unlock/"+$('#edit_order_id').val(),
				})
		 });
	//当分配模态框取消时，取消distributionlock	
	 $('#distribution_order_modal').on('hide.bs.modal', function () {
		 $.ajax({
				url : contextPath+"/work/unlockdistribution/"+$('#doOrder_id').val(),
				})
		 });
	//通过分配按钮，发送请求到controlloer,若返回为distributionlock，提示正在分配，返回数据，填值进入分配模态框
	$("body").on('click','#distributionButton',function(){
		var userId=$("#doOrder_owner").val();
		var orderId = $("#doOrder_id").val();
		$.ajax({
			url : contextPath+"/work/owner/"+userId+"/"+orderId,
			type : 'get',
			dataType : 'json',
			success : function(data) {
				if(data=="distributionlock"){
					magicAlert("已有同事在修改分配业务单!","failed");
				}else{
					$("#distirbution_order_id").val($("#doOrder_id").val())
					$("#distribution_order").empty();
					$("#distribution_order").append(`<option value="" disabled selected hidden>分配下一位处理人</option>`);
					for(var i=0;i<data.length;i++){
						$("#distribution_order").append(`<option value="`+data[i].id+`" >`+data[i].name+`</option>`)
					}
					$('#distribution_order_modal').modal('show');
				}
			},
			error : function(xhr, textStatus, errorThrown) {
		}
	});
})
	//通过编辑按钮，发送请求到controlloer,若返回为lock，提示正在编辑，返回数据，填值进入详情模态框
	$("body").on('click','#editButton',function(){
		var orderId = $("#doOrder_id").val();
		$.ajax({
			url : contextPath+"/work/updateSearch/"+orderId,
			type : 'get',
			dataType : 'json',
			success : function(data) {
				if(data=="lock"){
					magicAlert("已有同事在修改当前业务单!","failed");
				}else{
					$("#edit_order_id").val(data[0].id);
					$("#edit_customername").val(data[0].customerName);
					GenderSelected = $("#edit_customergender option").each(function() {    
					    var op = $(this).val();
					    if(op==data[0].customerGender){
					    	$(this).attr("selected","selected");
					    }
					});
					$("#edit_customerphone").val(data[0].customerPhone);
					SourceSelected = $("#edit_source option").each(function() {    
					    var op = $(this).val();
					    if(op==data[0].source){
					    	$(this).attr("selected","selected");
					    }
					});
					EngencySelected = $("#edit_engency option").each(function() {    
					    var op = $(this).val();
					    if(op==data[0].engency){
					    	$(this).attr("selected","selected");
					    }
					});
					$("#edit_houseTime").val(DateFormat.getDateString(new Date(data[0].houseTime),"yyyy-MM-dd "));
					$("#edit_bookArea").val(data[0].bookArea);
					HouseTypeSelected = $("#edit_houseType option").each(function() {    
					    var op = $(this).val();
					    if(op==data[0].houseType){
					    	$(this).attr("selected","selected");
					    }
					});
					$("#edit_maxMoney").val(data[0].maxMoney);
					$("#edit_minMoney").val(data[0].minMoney);
					$("#editBookTimeStr").val(DateFormat.getDateString(new Date(data[0].bookTime),"yyyy-MM-dd HH:mm:ss"));
					var bookTime =new Date(data[0].bookTime);
					var ymd=(bookTime.getFullYear()+"-"+(bookTime.getMonth()+1)+"-"+bookTime.getDate());
					var hms=(" "+bookTime.getHours()+":"+bookTime.getMinutes()+":"+bookTime.getSeconds());
					$("#edit_bookTime_ymd").val(ymd);
					$("#edit_bookTime_hms").val(hms);
					$("#edit_houseMonth").val(data[0].houseMonth);
					$("#edit_customerPeople").val(data[0].customerPeople);
					$("#edit_remarks").val(data[0].remarks);
					$('#edit_order_modal').modal('show');
				}
			},
			error : function(xhr, textStatus, errorThrown) {
		}
	});
})
	//业务单详情
	$('#detail_order_modal').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget);
		var orderId = button.attr('id');
		$.ajax({
			url : contextPath+"/work/order/"+orderId,
			type : 'get',
			dataType : 'json',
			success : function(data) {
				if(data!=null){
				$("#detail_title").html(getTitle(data[0].title));
				if(data[0].nextUser!=null){
					$("#detail_next_user").removeClass("font red").addClass("font green").html(data[0].nextUser.name);
				}else{
					$("#detail_next_user").removeClass("font green").addClass("font red").html("当前业务单没有跟进人");
				}
				$('#doOrder_id').val(data[0].id);
				$("#doOrder_owner").val(data[0].ownerId);
				$('#status_remarks').val(data[0].remarks);
				$('#status_status').empty();
				//权限前置操作
				$('#doOrder').empty();
				$("#status_foot").hide();
				//待分配状态所涉及的权限
				if(data[0].status==0){
					//删除权限
					if(hasDel==true){
						$('#doOrder').append(`<button type="button" class="btn btn-danger" value="" id="deleteOrder" >
								删除</button>`);
					}
					//修改权限，涉及到进度，编辑
					if(hasEdit==true){
						$('#doOrder').append(`<button type="button" class="btn btn-warning" id="editButton"
								value="">编辑</button>`);
						$('#status_status').append(`<option value="1">跟进中</option>
								<option value="6">无效</option>`);
						$('#status_id').val(data[0].id);
						$("#status_foot").show();
					}
					//分配权限
					if(hasDis==true){
						$('#doOrder').append(`<button type="button" class="btn btn-info" id="distributionButton">分配</button>`);						
					}
				}
				//跟进中状态所涉及的权限
				else if(data[0].status>=2&&data[0].status<6){
					//删除权限
					if(hasDel==true){
						$('#doOrder').append(`<button type="button" class="btn btn-danger" value="" id="deleteOrder" >
								删除</button>`);
					}
					//修改权限，涉及到进度(包括签约),编辑
					if(hasEdit==true){
						$('#doOrder').append(`<button type="button" class="btn btn-warning" id="editButton">编辑</button>`);
						$('#doOrder').append(`<button type="button" class="btn btn-success" id="dealOrder">签约</button>`);
						$('#status_id').val(data[0].id);
						$('#status_status').append(`
								<option value="3">已去电</option>
								<option value="4">已带看</option>
								<option value="5">推迟</option>
								<option value="100">放弃</option>
								<option value="6">无效</option>`);
						$("#status_foot").show();
					}
					//分配权限
					if(hasDis==true){
						$('#doOrder').append(`<button type="button" class="btn btn-info" id="distributionButton">分配</button>`);
					}
				}
				//已完成状态所涉及的权限
				else{
					//删除权限
					if(hasDel==true){
						$('#doOrder').append(`<button type="button" class="btn btn-danger" value="" id="deleteOrder" >
								删除</button>`);
					}
				}
				$('#doOrder').append(`<button type="button" class="btn btn-default"
				data-dismiss="modal">关闭</button>`);
				//权限操作结束
				
				//以下是数据显示
				$("#detail_resource").html(getSource(data[0].source));
				$("#detail_engency").html(getEngency(data[0].engency));
				$("#detail_status").html(getStatus(data[0].status));
				$("#detail_create_time").html(DateFormat.getDateString(new Date(data[0].createTime),"yyyy-MM-dd HH:mm:ss"));
				$("#detail_max_money").html(data[0].maxMoney);
				$("#detail_min_money").html(data[0].minMoney);
				$("#detail_book_time").html(DateFormat.getDateString(new Date(data[0].bookTime),"yyyy-MM-dd HH:mm:ss"));
				$("#detail_book_area").html(data[0].bookArea);
				$("#detail_check_in_time").html(DateFormat.getDateString(new Date(data[0].houseTime),"yyyy-MM-dd"));
				$("#detail_rent_month").html(data[0].houseMonth);
				$("#detail_rent_people").html(data[0].customerPeople);
				$("#detail_house_type").html(getHouseType(data[0].houseType));
				$("#detail_customer_name").html(data[0].customerName);
				$("#detail_customer_gender").html(getGender(data[0].customerGender))
				$("#detail_customer_phone").html(data[0].customerPhone);
				$("#detail_remarks").html(data[0].remarks);
				$("#distributionButton").val(data[0].ownerId);
				//显示业务单详情
				$("#orderHistory").empty();
				if(data[1]!=null){
					for(var i=0;i<data[1].length;i++){
						if(data[1][i].orderProperty=="create"){
							$("#orderHistory").append(`<tr><td class="font red">`+data[1][i].historyUser.name+
									`</td><td class="font yellow">`+DateFormat.getDateString(new Date(data[1][i].updateTime),"yyyy-MM-dd HH:mm:ss")+
									`</td><td>添加客户</td></tr>`);
						}else if(data[1][i].orderProperty=="入住时间"){
							$("#orderHistory").append(`<tr><td class="font red">`+data[1][i].historyUser.name+
									`</td><td class="font yellow">`+DateFormat.getDateString(new Date(data[1][i].updateTime),"yyyy-MM-dd HH:mm:ss")
									+`</td><td>将`+data[1][i].orderProperty+
									`由</td><td>`+DateFormat.getDateString(new Date(data[1][i].orderBefore),"yyyy-MM-dd ")
									+`</td><td>修改为&nbsp;&nbsp;&nbsp;`
									+DateFormat.getDateString(new Date(data[1][i].orderAfter),"yyyy-MM-dd ")+`</td></tr>`);
						}else if(data[1][i].orderProperty=="next"){
							if(data[1][i].orderBefore==""){
								$("#orderHistory").append(`<tr><td class="font red">`+data[1][i].historyUser.name+
										`</td><td class="font yellow">`+DateFormat.getDateString(new Date(data[1][i].updateTime),"yyyy-MM-dd HH:mm:ss")
										+`</td><td>将业务单分配给</td><td>`+data[1][i].orderAfter+`</td></tr>`);
							}else{
								$("#orderHistory").append(`<tr><td class="font red">`+data[1][i].historyUser.name+
										`</td><td class="font yellow">`+DateFormat.getDateString(new Date(data[1][i].updateTime),"yyyy-MM-dd HH:mm:ss")
										+`</td><td>将业务单从</td><td>`+data[1][i].orderBefore+`<td>分配给&nbsp;&nbsp;&nbsp;`+data[1][i].orderAfter+`</td></tr>`);
								}
						}else if(data[1][i].orderProperty=="status"){
							$("#orderHistory").append(`<tr><td class="font red">`+data[1][i].historyUser.name+
									`</td><td class="font yellow">`+DateFormat.getDateString(new Date(data[1][i].updateTime),"yyyy-MM-dd HH:mm:ss")
									+`</td><td>将业务单进度从</td><td>`+data[1][i].orderBefore+`<td>跟进为&nbsp;&nbsp;&nbsp;`+data[1][i].orderAfter+`</td></tr>`);
						}else{
							$("#orderHistory").append(`<tr><td class="font red">`+data[1][i].historyUser.name+
									`</td><td class="font yellow">`+DateFormat.getDateString(new Date(data[1][i].updateTime),"yyyy-MM-dd HH:mm:ss")
									+`</td><td>将`+data[1][i].orderProperty+
									`</td><td>由`+data[1][i].orderBefore+`</td><td>修改为&nbsp;&nbsp;&nbsp;`
									+data[1][i].orderAfter+`</td>
									</tr>`);
						}
					}
				}
			}
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		});
	})
	//分配确认
	$("#distribution_order_submit").click(function(){
		$("#distributionOrderForm").submit();
	})
	//编辑业务单提交
	$("#edit_order_submit").click(function(){
		$("#edit_bookTimeStr").val($("#edit_bookTime_ymd").val()+$("#edit_bookTime_hms").val());
		$("#editOrderFrom").submit();
	})
	//新增业务单模态框，点击确定按钮触发拼接ymd+hms和表调验证
	$("#order_insert").click(function(){
		$("#bookTimeStr").val($("#bookTime_ymd").val() + $("#bookTime_hms").val());
		$("#insertOrderFrom").submit();
	})
	//已完成首页查询ajax
	$("body").on('click','.completed_min_page',function(){
		$(this).parents("ul").children().removeClass("active");
       	$(this).parents("ul").children(":eq(1)").addClass("active");
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":3,
				"pageNo":$(this).attr("value"),
				"source":$("#completed_source").val(),
				"status":$("#completed_status").val(),
				"start_time":$("#completed_start_time").val(),
				"end_time":$("#completed_end_time").val(),
				"searchStr":$("#completed_searchStr").val()
				},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";
		       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
		       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += updateTime + '</td>';//跟进时间
		       		trStr += '<td>'+ getSource(result.items[i].source)+'</td>';		//来源
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
		       		trStr += '<td>'
		       		trStr +=getHouseType(result.items[i].houseType);
			       	trStr +='</td>';//户型
		       		trStr += '<td>'
		       		trStr +=getStatus(result.items[i].status);
			       	trStr	+='</td>';//进度
			       	trStr += '<td>' ;
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#completed_tbody").html(trStr);
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
	})
	//已完成尾页查询ajax
	$("body").on('click','.completed_max_page',function(){
		$(this).parents("ul").children().removeClass("active");
    	$(this).parents("ul").children().last().prev().addClass("active");
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":3,
				"pageNo":$(this).attr("value"),
				"source":$("#completed_source").val(),
				"status":$("#completed_status").val(),
				"start_time":$("#completed_start_time").val(),
				"end_time":$("#completed_end_time").val(),
				"searchStr":$("#completed_searchStr").val()
				},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";
		       		if(result.items[i].engency==1){
		       			trStr +='<td><i class="font red glyphicon glyphicon-star"></i>' ;//紧急状态	
		       		}else if (result.items[i].engency==2){
		       			trStr +='<td><i class="font yellow glyphicon glyphicon-star"></i>' ;//正常状态	
		       		}
		       		else if(result.items[i].engency==3){
		       			trStr +='<td><i class="font green glyphicon glyphicon-star"></i>' ;//延后状态	
		       		}
		       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += updateTime + '</td>';//跟进时间
		       		trStr += '<td>' + getSource(result.items[i].source)+ '</td>';
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
		       		trStr += '<td>'
		       		trStr +=getHouseType(result.items[i].houseType);
			       	trStr +='</td>';//户型
		       		trStr += '<td>'
		       		trStr +=getStatus(result.items[i].status);
			       	trStr	+='</td>';//进度
			       	trStr += '<td>' ;
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#completed_tbody").html(trStr);
		     
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
	})
	//已完成分页
	$("body").on('click','.completed_page',function(){
		$(this).parents("ul").children().removeClass("active");
       	$(this).parents("li").addClass("active");
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":3,
				"pageNo":$(this).html(),
				"source":$("#completed_source").val(),
				"status":$("#completed_status").val(),
				"start_time":$("#completed_start_time").val(),
				"end_time":$("#completed_end_time").val(),
				"searchStr":$("#completed_searchStr").val()
				},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";
		       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
		       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += updateTime + '</td>';//跟进时间
		       		trStr += '<td>' + getSource(result.items[i].source) +'</td>';
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
		       		trStr +='<td>';
		       		trStr +=getHouseType(result.items[i].houseType)
		       		trStr +='</td>';
			    	trStr += '<td>'
			    	trStr +=getStatus(result.items[i].status);
			       	trStr	+='</td>';//进度
			       	trStr += '<td>' ;
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#completed_tbody").html(trStr);
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
	})
	//已完成搜索ajax
	$('#completed_search').click(function(){
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":3,
				"source":$("#completed_source").val(),
				"status":$("#completed_status").val(),
				"start_time":$("#completed_start_time").val(),
				"end_time":$("#completed_end_time").val(),
				"searchStr":$("#completed_searchStr").val()},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";
		       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
		       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += updateTime + '</td>';//跟进时间
		       		trStr += '<td>'+getSource(result.items[i].source)+ '</td>';
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '月</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '人</td>';//人数	
		       		trStr += '<td>'
		       		trStr	+=getHouseType(result.items[i].houseType)
			       	trStr	+='</td>';//户型
		       		trStr += '<td>'
		       		trStr +=getStatus(result.items[i].status);
			       	trStr	+='</td>';//进度
			       	trStr += '<td>' ;
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#completed_tbody").html(trStr);
		       	var pageStr="";
		       	if(result.totalPageCount>1){
		       	  	pageStr+="<li><a class='completed_min_page' value='1'>首页</a></li>";
		       	for(var j=1;j<=result.totalPageCount;j++){
		       		if(j==1){
			       		pageStr+="<li class='active'><a class='completed_page'>";
			       		pageStr+=j+"</a></li>"
		       		}else{
		       		pageStr+="<li><a class='completed_page'>";
		       		pageStr+=j+"</a></li>"
		       		}
		       	}
		       	pageStr+="<li><a class='completed_max_page' value="
		       	pageStr+=result.totalPageCount+">尾页</a></li>";
		       	}
		       	
		       	$("#completed_pageul").html(pageStr);
		    	//对已完成表头操作
		       	$("#completed_count").html(result.totalCount)
		       	if(result.count.length==0){
		       		$("#completed_count_invalid").html(0);
		       		$("#completed_count_deal").html(0);
		       	}else if	(result.count.length==1){
		       		if(result.count[0].count_status==6){
		       			$("#completed_count_invalid").html(result.count[0].count_num);
		       			$("#completed_count_deal").html(0);
		       		}else if(result.count[0].count_status==7){
		       			$("#completed_count_invalid").html(0);
			       		$("#completed_count_deal").html(result.count[0].count_num);
		       		}
		       	}else if(result.count.length==2){
		       		$("#completed_count_invalid").html(result.count[0].count_num);
		       		$("#completed_count_deal").html(result.count[1].count_num);
		       	}
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
});
	//跟进中首页查询ajax
	$("body").on('click','.follow_min_page',function(){
		$(this).parents("ul").children().removeClass("active");
       	$(this).parents("ul").children(":eq(1)").addClass("active");
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":2,
				"pageNo":$(this).attr("value"),
				"source":$("#follow_source").val(),
				"engency":$("#follow_engency").val(),
				"status":$("#follow_status").val(),
				"start_time":$("#follow_start_time").val(),
				"end_time":$("#follow_end_time").val(),
				"searchStr":$("#follow_searchStr").val()
				},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";

		       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
		       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += updateTime + '</td>';//跟进时间
		       		trStr += '<td>' + getSource(result.items[i].source) + '</td>';
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
		       		trStr += '<td>'
		       		trStr +=getHouseType(result.items[i].houseType);
			       	trStr +='</td>';//户型
		       		trStr += '<td>'
		       		trStr +=getStatus(result.items[i].status);
			       	trStr	+='</td>';//进度
			       	trStr += '<td>' 
			       		trStr += '<td>' ;
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#follow_tbody").html(trStr)
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
	})
	//跟进中尾页查询ajax
	$("body").on('click','.follow_max_page',function(){
		$(this).parents("ul").children().removeClass("active");
    	$(this).parents("ul").children().last().prev().addClass("active");
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":2,
				"pageNo":$(this).attr("value"),
				"source":$("#follow_source").val(),
				"engency":$("#follow_engency").val(),
				"status":$("#follow_status").val(),
				"start_time":$("#follow_start_time").val(),
				"end_time":$("#follow_end_time").val(),
				"searchStr":$("#follow_searchStr").val()
				},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";

		       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
		       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += updateTime + '</td>';//跟进时间
		       		trStr += '<td>' + getSource(result.items[i].source)+ '</td>';
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
		       		trStr += '<td>'
		       		trStr +=getHouseType(result.items[i].houseType);
			       	trStr +='</td>';//户型
		       		trStr += '<td>'
		       		trStr +=getStatus(result.items[i].status);
			       	trStr	+='</td>';//进度
			       	trStr += '<td>' ;
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#follow_tbody").html(trStr);
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
	})
	//跟进中分页查询ajax
	$("body").on('click','.follow_page',function(){
		$(this).parents("ul").children().removeClass("active");
       	$(this).parents("li").addClass("active");
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":2,
				"pageNo":$(this).html(),
				"source":$("#follow_source").val(),
				"engency":$("#follow_engency").val(),
				"status":$("#follow_status").val(),
				"start_time":$("#follow_start_time").val(),
				"end_time":$("#follow_end_time").val(),
				"searchStr":$("#follow_searchStr").val()
				},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";

		       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
		       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += updateTime + '</td>';//跟进时间
		       		trStr += '<td>' + getSource(result.items[i].source) + '</td>';
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
		       		trStr +='<td>';
		       		trStr +=getHouseType(result.items[i].houseType)
		       		trStr +='</td>';
			    	trStr += '<td>'
			    	trStr +=getStatus(result.items[i].status);
			       	trStr	+='</td>';//进度
			       	trStr += '<td>' ;
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#follow_tbody").html(trStr);
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
	})
	//跟进中搜索ajax
	$('#follow_search').click(function(){
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":2,
				"source":$("#follow_source").val(),
				"engency":$("#follow_engency").val(),
				"status":$("#follow_status").val(),
				"start_time":$("#follow_start_time").val(),
				"end_time":$("#follow_end_time").val(),
				"searchStr":$("#follow_searchStr").val()},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";

		       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
		       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += updateTime + '</td>';//跟进时间
		       		trStr += '<td>' + getSource(result.items[i].source)	+ '</td>';
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '月</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '人</td>';//人数	
		       		trStr += '<td>'
		       		trStr	+=getHouseType(result.items[i].houseType)
			       	trStr	+='</td>';//户型
		       		trStr += '<td>'
		       		trStr +=getStatus(result.items[i].status);
			       	trStr	+='</td>';//进度
			       	trStr += '<td>' ;
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#follow_tbody").html(trStr);
		       	var pageStr="";
		       	if(result.totalPageCount>1){
		       	  	pageStr+="<li><a class='follow_min_page' value='1'>首页</a></li>";
		       	for(var j=1;j<=result.totalPageCount;j++){
		       		if(j==1){
			       		pageStr+="<li class='active'><a class='follow_page'>";
			       		pageStr+=j+"</a></li>"
		       		}else{
		       		pageStr+="<li><a class='follow_page'>";
		       		pageStr+=j+"</a></li>"
		       		}
		       	}
		       	pageStr+="<li><a class='follow_max_page' value="
		       	pageStr+=result.totalPageCount+">尾页</a></li>";
		       	}
		       	$("#follow_pageul").html(pageStr);
		      //对标头数据操作
		      //对跟进中标头数据操作
		       	$("#follow_count").html(result.totalCount)
		       	if(result.count.length==0){
		       		$("#follow_count_todo").html(0);
		       		$("#follow_count_called").html(0);
		       		$("#follow_count_seen").html(0);
		       		$("#follow_count_delay").html(0);
		       	}else if	(result.count.length==1){
		       		if(result.count[0].count_status==2){
		       			$("#follow_count_todo").html(result.count[0].count_num);
		       			$("#follow_count_called").html(0);
			       		$("#follow_count_seen").html(0);
			       		$("#follow_count_delay").html(0);
		       		}else if(result.count[0].count_status==3){
		       			$("#follow_count_todo").html(0);
		       			$("#follow_count_called").html(result.count[0].count_num);
			       		$("#follow_count_seen").html(0);
			       		$("#follow_count_delay").html(0);
		       		}else if(result.count[0].count_status==4){
		       			$("#follow_count_todo").html(0);
		       			$("#follow_count_called").html(0);
			       		$("#follow_count_seen").html(result.count[0].count_num);
			       		$("#follow_count_delay").html(0);
		       		}else if(result.count[0].count_status==5){
		       			$("#follow_count_todo").html(0);
		       			$("#follow_count_called").html(0);
			       		$("#follow_count_seen").html(0);
			       		$("#follow_count_delay").html(result.count[0].count_num);
		       		}
		       	}else if(result.count.length==2){
		       		if(result.count[0].count_status==2&&result.count[1].count_status==3){
		       			$("#follow_count_todo").html(result.count[0].count_num);
		       			$("#follow_count_called").html(result.count[1].count_num);
			       		$("#follow_count_seen").html(0);
			       		$("#follow_count_delay").html(0);
		       		}else if(result.count[0].count_status==2&&result.count[1].count_status==4){
		       			$("#follow_count_todo").html(result.count[0].count_num);
		       			$("#follow_count_called").html(0);
			       		$("#follow_count_seen").html(result.count[1].count_num);
			       		$("#follow_count_delay").html(0);
		       		}else if(result.count[0].count_status==2&&result.count[1].count_status==5){
		       			$("#follow_count_todo").html(result.count[0].count_num);
		       			$("#follow_count_called").html(0);
			       		$("#follow_count_seen").html(0);
			       		$("#follow_count_delay").html(result.count[1].count_num);
		       		}else if(result.count[0].count_status==3&&result.count[1].count_status==4){
		       			$("#follow_count_todo").html(0);
		       			$("#follow_count_called").html(result.count[0].count_num);
			       		$("#follow_count_seen").html(result.count[1].count_num);
			       		$("#follow_count_delay").html(0);
		       		}else if(result.count[0].count_status==3&&result.count[1].count_status==5){
		       			$("#follow_count_todo").html(0);
		       			$("#follow_count_called").html(result.count[0].count_num);
			       		$("#follow_count_seen").html(0);
			       		$("#follow_count_delay").html(result.count[1].count_num);
		       		}else if(result.count[0].count_status==4&&result.count[1].count_status==5){
		       			$("#follow_count_todo").html(0);
		       			$("#follow_count_called").html(0);
			       		$("#follow_count_seen").html(result.count[0].count_num);
			       		$("#follow_count_delay").html(result.count[1].count_num);
		       		}
		       	}else if(result.count.length==3){
		       		if(result.count[0].count_status==2&&result.count[1].count_status==3&&result.count[2].count_status==4){
		       			$("#follow_count_todo").html(result.count[0].count_num);
		       			$("#follow_count_called").html(result.count[1].count_num);
			       		$("#follow_count_seen").html(result.count[2].count_num);
			       		$("#follow_count_delay").html(0);
		       		}else if(result.count[0].count_status==2&&result.count[1].count_status==3&&result.count[2].count_status==5){
		       			$("#follow_count_todo").html(result.count[0].count_num);
		       			$("#follow_count_called").html(result.count[1].count_num);
			       		$("#follow_count_seen").html(0);
			       		$("#follow_count_delay").html(result.count[2].count_num);
		       		}else if(result.count[0].count_status==2&&result.count[1].count_status==4&&result.count[2].count_status==5){
		       			$("#follow_count_todo").html(result.count[0].count_num);
		       			$("#follow_count_called").html(0);
			       		$("#follow_count_seen").html(result.count[1].count_num);
			       		$("#follow_count_delay").html(result.count[2].count_num);
		       		}else if(result.count[0].count_status==3&&result.count[1].count_status==4&&result.count[2].count_status==5){
		       			$("#follow_count_todo").html(0);
		       			$("#follow_count_called").html(result.count[0].count_num);
			       		$("#follow_count_seen").html(result.count[1].count_num);
			       		$("#follow_count_delay").html(result.count[2].count_num);
		       		}
		       	}else if(result.count.length==4){
		       		$("#follow_count_todo").html(result.count[0].count_num);
	       			$("#follow_count_called").html(result.count[1].count_num);
		       		$("#follow_count_seen").html(result.count[2].count_num);
		       		$("#follow_count_delay").html(result.count[3].count_num);
		       	}
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
});
	//点击选项卡产生ajax事件，传值到新的选项卡
	$('a[data-toggle="tab"]').on('show.bs.tab', function (event) {
		var tabpane  = $(event.target );
		var tabId = tabpane.attr('id');
		//待分配选项卡
		if(tabId=="unallocated_tab"){
			$.ajax({
				url : contextPath+"/work/search",
				type : 'get',
				data:{"title":1},
				resultType : 'json',
				success : function(result) {
					var trStr = "";
			       	for(var i = 0;i<result.items.length;i++){
			       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
			       		trStr += 'id='+result.items[i].id+">";
			       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
			       		var createTime =DateFormat.getDateString(new Date(result.items[i].createTime),"yyyy-MM-dd HH:mm:ss")
			       		trStr += createTime + '</td>';//创建时间
			       		trStr += '<td>'+ getSource(result.items[i].source) + '</td>';
			       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
			       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
			       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
			       		trStr += '<td>' + bookTime+ '</td>';//预约时间
			       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
			       		var housetime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
			       		trStr += '<td>' + housetime + '</td>';//入住时间
			       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
			       		trStr += '<td>' + result.items[i].houseMonth + '月</td>';//租期
			       		trStr += '<td>' + result.items[i].customerPeople + '人</td>';//人数	
			       		trStr +='<td>';
			       		getHouseType(result.items[i].houseType)
			       		trStr +='</td>';
			       		trStr += '<td>' ;
			       		if(result.items[i].nextUser!=null){ 
			       			trStr +=result.items[i].nextUser.name ;//下一处理人
			       		}
			       		trStr	+= '</td>';
			       		trStr += '</tr>';
			       	}
			       	$("#unallocated_tbody").html(trStr);
			      //对待分配表头操作
			       	$("#unallocated_count").html(result.totalCount)
			       	if(result.count.length==0){
			       		$("#unallocated_count_quick").html(0);
			       		$("#unallocated_count_normal").html(0);
			       		$("#unallocated_count_slow").html(0);
			       	}else if	(result.count.length==1){
			       		if(result.count[0].count_engency==1){
			       			$("#unallocated_count_quick").html(result.count[0].count_num);
			       			$("#unallocated_count_normal").html(0);
				       		$("#unallocated_count_slow").html(0);
			       		}else if(result.count[0].count_engency==2){
			       			$("#unallocated_count_quick").html(0);
				       		$("#unallocated_count_normal").html(result.count[0].count_num);
				       		$("#unallocated_count_slow").html(0);
			       		}else if(result.count[0].count_engency==3){
			       			$("#unallocated_count_quick").html(0);
				       		$("#unallocated_count_normal").html(0);
			       			$("#unallocated_count_slow").html(result.count[0].count_num);
			       		}
			       	}else if(result.count.length==2){
			       		if(result.count[0].count_engency==1&&result.count[1].count_engency==2){
			       			$("#unallocated_count_quick").html(result.count[0].count_num);
			       			$("#unallocated_count_normal").html(result.count[1].count_num);
				       		$("#unallocated_count_slow").html(0);
			       		}else if(result.count[0].count_engency==1&&result.count[1].count_engency==3){
			       			$("#unallocated_count_quick").html(result.count[0].count_num);
			       			$("#unallocated_count_normal").html(0);
				       		$("#unallocated_count_slow").html(result.count[1].count_num);
			       		}else if(result.count[0].count_engency==2&&result.count[1].count_engency==3){
			       			$("#unallocated_count_quick").html(0);
				       		$("#unallocated_count_normal").html(result.count[0].count_num);
			       			$("#unallocated_count_slow").html(result.count[1].count_num);
			       		}
			       	}else if(result.count.length==3){
			       		$("#unallocated_count_quick").html(result.count[0].count_num);
			       		$("#unallocated_count_normal").html(result.count[1].count_num);
		       			$("#unallocated_count_slow").html(result.count[2].count_num);
			       	}
				},
				error : function(xhr, textStatus, errorThrown) {
				}
			})
		}
		//跟进中选项卡
		else if(tabId=="follow_tab"){
			$.ajax({
				url : contextPath+"/work/search",
				type : 'get',
				data:{"title":2},
				resultType : 'json',
				success : function(result) {
					var trStr = "";
			       	for(var i = 0;i<result.items.length;i++){
			       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
			       		trStr += 'id='+result.items[i].id+">";
			       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
			       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
			       		trStr += updateTime + '</td>';//跟进时间
			       		trStr += '<td>'
			       		if(result.items[i].source==1)		trStr +="58同城";
			       		if(result.items[i].source==2)		trStr +="赶集网";
			       		trStr += '</td>'
			       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
			       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
			       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
			       		trStr += '<td>' + bookTime+ '</td>';//预约时间
			       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
			       		var housetime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
			       		trStr += '<td>' + housetime + '</td>';//入住时间
			       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
			       		trStr += '<td>' + result.items[i].houseMonth + '月</td>';//租期
			       		trStr += '<td>' + result.items[i].customerPeople + '人</td>';//人数	
			       		trStr +='<td>'+getHouseType(result.items[i].houseType) +'</td>';
			       		trStr += '<td>'+getStatus(result.items[i].status) +'</td>';//进度
			       		trStr += '<td>' ;
			       		if(result.items[i].nextUser!=null){ 
			       			trStr +=result.items[i].nextUser.name ;//下一处理人
			       		}
			       		trStr	+= '</td>';
			       		trStr += '</tr>';
			       	}
			       	$("#follow_tbody").html(trStr);
			    	var pageStr="";
			       	if(result.totalPageCount>1){
			       	pageStr+="<li><a class='follow_min_page' value='1'>首页</a></li>";
			       		for(var j=1;j<=result.totalPageCount;j++){
			       		if(j==1){
				       		pageStr+="<li class='active'><a class='follow_page'>";
				       		pageStr+=	j+"</a></li>"
			       		}else{
			       		pageStr+="<li><a class='follow_page'>";
			       		pageStr+=j+"</a></li>"
			       		}
			       	}
			       	pageStr+="<li><a class='follow_max_page' value="
			       	pageStr+=result.totalPageCount+">尾页</a></li>";
			       	}
			       	$("#follow_pageul").html(pageStr);
			       	//对跟进中表头操作
			       	$("#follow_count").html(result.totalCount)
			       	if(result.count.length==0){
			       		$("#follow_count_todo").html(0);
			       		$("#follow_count_called").html(0);
			       		$("#follow_count_seen").html(0);
			       		$("#follow_count_delay").html(0);
			       	}else if	(result.count.length==1){
			       		if(result.count[0].count_status==2){
			       			$("#follow_count_todo").html(result.count[0].count_num);
			       			$("#follow_count_called").html(0);
				       		$("#follow_count_seen").html(0);
				       		$("#follow_count_delay").html(0);
			       		}else if(result.count[0].count_status==3){
			       			$("#follow_count_todo").html(0);
			       			$("#follow_count_called").html(result.count[0].count_num);
				       		$("#follow_count_seen").html(0);
				       		$("#follow_count_delay").html(0);
			       		}else if(result.count[0].count_status==4){
			       			$("#follow_count_todo").html(0);
			       			$("#follow_count_called").html(0);
				       		$("#follow_count_seen").html(result.count[0].count_num);
				       		$("#follow_count_delay").html(0);
			       		}else if(result.count[0].count_status==5){
			       			$("#follow_count_todo").html(0);
			       			$("#follow_count_called").html(0);
				       		$("#follow_count_seen").html(0);
				       		$("#follow_count_delay").html(result.count[0].count_num);
			       		}
			       	}else if(result.count.length==2){
			       		if(result.count[0].count_status==2&&result.count[1].count_status==3){
			       			$("#follow_count_todo").html(result.count[0].count_num);
			       			$("#follow_count_called").html(result.count[1].count_num);
				       		$("#follow_count_seen").html(0);
				       		$("#follow_count_delay").html(0);
			       		}else if(result.count[0].count_status==2&&result.count[1].count_status==4){
			       			$("#follow_count_todo").html(result.count[0].count_num);
			       			$("#follow_count_called").html(0);
				       		$("#follow_count_seen").html(result.count[1].count_num);
				       		$("#follow_count_delay").html(0);
			       		}else if(result.count[0].count_status==2&&result.count[1].count_status==5){
			       			$("#follow_count_todo").html(result.count[0].count_num);
			       			$("#follow_count_called").html(0);
				       		$("#follow_count_seen").html(0);
				       		$("#follow_count_delay").html(result.count[1].count_num);
			       		}else if(result.count[0].count_status==3&&result.count[1].count_status==4){
			       			$("#follow_count_todo").html(0);
			       			$("#follow_count_called").html(result.count[0].count_num);
				       		$("#follow_count_seen").html(result.count[1].count_num);
				       		$("#follow_count_delay").html(0);
			       		}else if(result.count[0].count_status==3&&result.count[1].count_status==5){
			       			$("#follow_count_todo").html(0);
			       			$("#follow_count_called").html(result.count[0].count_num);
				       		$("#follow_count_seen").html(0);
				       		$("#follow_count_delay").html(result.count[1].count_num);
			       		}else if(result.count[0].count_status==4&&result.count[1].count_status==5){
			       			$("#follow_count_todo").html(0);
			       			$("#follow_count_called").html(0);
				       		$("#follow_count_seen").html(result.count[0].count_num);
				       		$("#follow_count_delay").html(result.count[1].count_num);
			       		}
			       	}else if(result.count.length==3){
			       		if(result.count[0].count_status==2&&result.count[1].count_status==3&&result.count[2].count_status==4){
			       			$("#follow_count_todo").html(result.count[0].count_num);
			       			$("#follow_count_called").html(result.count[1].count_num);
				       		$("#follow_count_seen").html(result.count[2].count_num);
				       		$("#follow_count_delay").html(0);
			       		}else if(result.count[0].count_status==2&&result.count[1].count_status==3&&result.count[2].count_status==5){
			       			$("#follow_count_todo").html(result.count[0].count_num);
			       			$("#follow_count_called").html(result.count[1].count_num);
				       		$("#follow_count_seen").html(0);
				       		$("#follow_count_delay").html(result.count[2].count_num);
			       		}else if(result.count[0].count_status==2&&result.count[1].count_status==4&&result.count[2].count_status==5){
			       			$("#follow_count_todo").html(result.count[0].count_num);
			       			$("#follow_count_called").html(0);
				       		$("#follow_count_seen").html(result.count[1].count_num);
				       		$("#follow_count_delay").html(result.count[2].count_num);
			       		}else if(result.count[0].count_status==3&&result.count[1].count_status==4&&result.count[2].count_status==5){
			       			$("#follow_count_todo").html(0);
			       			$("#follow_count_called").html(result.count[0].count_num);
				       		$("#follow_count_seen").html(result.count[1].count_num);
				       		$("#follow_count_delay").html(result.count[2].count_num);
			       		}
			       	}else if(result.count.length==4){
			       		$("#follow_count_todo").html(result.count[0].count_num);
		       			$("#follow_count_called").html(result.count[1].count_num);
			       		$("#follow_count_seen").html(result.count[2].count_num);
			       		$("#follow_count_delay").html(result.count[3].count_num);
			       	}
				},
				error : function(xhr, textStatus, errorThrown) {
				}
			})
		}
		//已完成
		else if(tabId=="completed_tab"){
			$.ajax({
				url : contextPath+"/work/search",
				type : 'get',
				data:{"title":3},
				resultType : 'json',
				success : function(result) {
					var trStr = "";
			       	for(var i = 0;i<result.items.length;i++){
			       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
			       		trStr += 'id='+result.items[i].id+">";

			       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
			       		var updateTime =DateFormat.getDateString(new Date(result.items[i].updateTime),"yyyy-MM-dd HH:mm:ss")
			       		trStr += updateTime + '</td>';//跟进时间
			       		trStr += '<td>'
			       		trStr	+=getSource(result.items[i].source)
			       		trStr += '</td>'
			       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
			       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
			       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
			       		trStr += '<td>' + bookTime+ '</td>';//预约时间
			       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
			       		var housetime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
			       		trStr += '<td>' + housetime + '</td>';//入住时间
			       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
			       		trStr += '<td>' + result.items[i].houseMonth + '月</td>';//租期
			       		trStr += '<td>' + result.items[i].customerPeople + '人</td>';//人数	
			       		trStr +='<td>';
			       		trStr	+=getHouseType(result.items[i].houseType)
			       		trStr +='</td>';
			       		trStr +='<td>';
			       		trStr +=getStatus(result.items[i].status);
			       		trStr +='</td>';
			       		trStr += '<td>' ;
			       		if(result.items[i].nextUser!=null){ 
			       			trStr +=result.items[i].nextUser.name ;//下一处理人
			       		}
			       		trStr	+= '</td>';
			       		trStr += '</tr>';
			       	}
			       	$("#completed_tbody").html(trStr);
			       	var pageStr="";
			       	if(result.totalPageCount>1){
			       	pageStr+="<li><a class='completed_min_page' value='1'>首页</a></li>";
			       		for(var j=1;j<=result.totalPageCount;j++){
			       		if(j==1){
				       		pageStr+="<li class='active'><a class='completed_page'>";
				       		pageStr+=	j+"</a></li>"
			       		}else{
			       		pageStr+="<li><a class='completed_page'>";
			       		pageStr+=j+"</a></li>"
			       		}
			       	}
			       	pageStr+="<li><a class='completed_max_page' value="
			       	pageStr+=result.totalPageCount+">尾页</a></li>";
			       	}
			       	$("#completed_pageul").html(pageStr);
			      	//对已完成表头操作
			       	$("#completed_count").html(result.totalCount)
			       	if(result.count.length==0){
			       		$("#completed_count_invalid").html(0);
			       		$("#completed_count_deal").html(0);
			       	}else if	(result.count.length==1){
			       		if(result.count[0].count_status==6){
			       			$("#completed_count_invalid").html(result.count[0].count_num);
			       			$("#completed_count_deal").html(0);
			       		}else if(result.count[0].count_engency==7){
			       			$("#completed_count_invalid").html(0);
				       		$("#completed_count_deal").html(result.count[0].count_num);
			       		}
			       	}else if(result.count.length==2){
			       		$("#completed_count_invalid").html(result.count[0].count_num);
			       		$("#completed_count_deal").html(result.count[1].count_num);
			       	}
				},
				error : function(xhr, textStatus, errorThrown) {
				}
			})
		}
	})
		
	//待分配首页查询
	$("body").on('click','.unallocated_min_page',function(){
		$(this).parents("ul").children().removeClass("active");
       	$(this).parents("ul").children(":eq(1)").addClass("active");
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":1,
				"pageNo":$(this).attr("value"),
				"source":$("#unallocated_resource").val(),
				"engency":$("#unallocated_engency").val(),
				"start_time":$("#unallocated_startTime").val(),
				"end_time":$("#unallocated_endTime").val(),
				"searchStr":$("#unallocated_searchStr").val()},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";
		       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
		       		var createTime =DateFormat.getDateString(new Date(result.items[i].createTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += createTime + '</td>';//跟进时间
		       		trStr += '<td>'+ getSource(result.items[i].source)+ '</td>';
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
		       		trStr += '<td>'
		       		trStr	+=getHouseType(result.items[i].houseType)
			       	trStr	+='</td>';//户型
		       		trStr += '<td>' ;
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#unallocated_tbody").html(trStr);
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
	})
	//待分配尾页查询
	$("body").on('click','.unallocated_max_page',function(){
		$(this).parents("ul").children().removeClass("active");
    	$(this).parents("ul").children().last().prev().addClass("active");
		$.ajax({
			url : contextPath+"/work/search",
			type : 'get',
			data:{
				"title":1,
				"pageNo":$(this).attr("value"),
				"source":$("#unallocated_resource").val(),
				"engency":$("#unallocated_engency").val(),
				"start_time":$("#unallocated_startTime").val(),
				"end_time":$("#unallocated_endTime").val(),
				"searchStr":$("#unallocated_searchStr").val()},
			resultType : 'json',
			success : function(result) {
				var trStr = "";
		       	for(var i = 0;i<result.items.length;i++){
		       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
		       		trStr += 'id='+result.items[i].id+">";
		       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
		       		var createTime =DateFormat.getDateString(new Date(result.items[i].createTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += createTime + '</td>';//跟进时间
		       		trStr += '<td>'+ getSource(result.items[i].source)+ '</td>';
		       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
		       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
		       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
		       		trStr += '<td>' + bookTime+ '</td>';//预约时间
		       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
		       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
		       		trStr += '<td>' + checkIntime + '</td>';//入住时间
		       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
		       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
		       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
		       		trStr	+='<td>';
		       		trStr	+=getHouseType(result.items[i].houseType)
		       		trStr += '</td>' ;
		       		trStr	+='<td>';
		       		if(result.items[i].nextUser!=null){ 
		       			trStr +=result.items[i].nextUser.name ;//下一处理人
		       		}
		       		trStr	+= '</td>';
		       		trStr += '</tr>';
		     	}
		       	$("#unallocated_tbody").html(trStr);
		    
			},
			error : function(xhr, textStatus, errorThrown) {
			}
		})
	})
		//待分配分页查询
		$("body").on('click','.unallocated_page',function(){
			$(this).parents("ul").children().removeClass("active");
	       	$(this).parents("li").addClass("active");
			$.ajax({
				url : contextPath+"/work/search",
				type : 'get',
				data:{
					"title":1,
					"pageNo":$(this).html(),
					"source":$("#unallocated_resource").val(),
					"engency":$("#unallocated_engency").val(),
					"start_time":$("#unallocated_startTime").val(),
					"end_time":$("#unallocated_endTime").val(),
					"searchStr":$("#unallocated_searchStr").val()},
				resultType : 'json',
				success : function(result) {
					var trStr = "";
			       	for(var i = 0;i<result.items.length;i++){
			       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
			       		trStr += 'id='+result.items[i].id+">";
			       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
			       		var createTime =DateFormat.getDateString(new Date(result.items[i].createTime),"yyyy-MM-dd HH:mm:ss")
			       		trStr += createTime + '</td>';//跟进时间
			       		trStr += '<td>'+ getSource(result.items[i].source)+ '</td>';
			       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
			       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
			       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
			       		trStr += '<td>' + bookTime+ '</td>';//预约时间
			       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
			       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
			       		trStr += '<td>' + checkIntime + '</td>';//入住时间
			       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
			       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
			       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
			       		trStr	+="<td>"+getHouseType(result.items[i].houseType)+"</td>";
			       		trStr += '<td>' ;
			       		if(result.items[i].nextUser!=null){ 
			       			trStr +=result.items[i].nextUser.name ;//下一处理人
			       		}
			       		trStr	+= '</td>';
			       		trStr += '</tr>';
			     	}
			       	$("#unallocated_tbody").html(trStr);
				},
				error : function(xhr, textStatus, errorThrown) {
				}
			})
		})
		//待分配搜索ajax
		$('#unallocated_search').click(function(){
			$("#searchDetail").slideUp(500,function(){
				$.ajax({
					url : contextPath+"/work/search",
					type : 'get',
					data:{
						"title":1,
						"source":$("#unallocated_resource").val(),
						"engency":$("#unallocated_engency").val(),
						"start_time":$("#unallocated_startTime").val(),
						"end_time":$("#unallocated_endTime").val(),
						"searchStr":$("#unallocated_searchStr").val()},
					resultType : 'json',
					success : function(result) {
						var trStr = "";
				       	for(var i = 0;i<result.items.length;i++){
				       		trStr +='<tr data-toggle="modal" data-target="#detail_order_modal" style="font-size: 12px"';
				       		trStr += 'id='+result.items[i].id+">";
				       		trStr +='<td>'+getEngencyStar(result.items[i].engency);//状态的logo
				       		var createTime =DateFormat.getDateString(new Date(result.items[i].createTime),"yyyy-MM-dd HH:mm:ss")
				       		trStr += createTime + '</td>';//跟进时间
				       		trStr += '<td>'+ getSource(result.items[i].source)+'</td>';
				       		trStr += '<td>' + result.items[i].customerName + '</td>';//客户姓名
				       		trStr += '<td>' + result.items[i].customerPhone + '</td>';//联系方式
				       		var bookTime = DateFormat.getDateString(new Date(result.items[i].bookTime),"yyyy-MM-dd HH:mm:ss")
				       		trStr += '<td>' + bookTime+ '</td>';//预约时间
				       		trStr += '<td>' + result.items[i].bookArea + '</td>';//预约区域
				       		var checkIntime = DateFormat.getDateString(new Date(result.items[i].houseTime),"yyyy-MM-dd ")
				       		trStr += '<td>' + checkIntime + '</td>';//入住时间
				       		trStr += '<td>' + result.items[i].maxMoney+'-'+result.items[i].minMoney + '</td>';//价格
				       		trStr += '<td>' + result.items[i].houseMonth + '</td>';//租期
				       		trStr += '<td>' + result.items[i].customerPeople + '</td>';//人数	
				       		trStr += '<td>'
				       		trStr	+=getHouseType(result.items[i].houseType)
					       	trStr	+'</td>';//户型
				       		trStr += '<td>' ;
				       		if(result.items[i].nextUser!=null){ 
				       			trStr +=result.items[i].nextUser.name ;//下一处理人
				       		}
				       		trStr	+= '</td>';
				       		trStr += '</tr>';
				     	}
				       	$("#unallocated_tbody").html(trStr);
				       	//对页数进行操作
				       	var pageStr="";
				       	if(result.totalPageCount>1){
				       	  	pageStr+="<li><a class='unallocated_min_page' value='1'>首页</a></li>";
				       	for(var j=1;j<=result.totalPageCount;j++){
				       		if(j==1){
					       		pageStr+="<li class='active'><a class='unallocated_page'>";
					       		pageStr+=j+"</a></li>"
				       		}else{
				       		pageStr+="<li><a class='unallocated_page'>";
				       		pageStr+=j+"</a></li>"
				       		}
				       	}
				       	pageStr+="<li><a class='unallocated_max_page' value="
				       	pageStr+=result.totalPageCount+">尾页</a></li>";
				       	}
				       	$("#unallocated_pageul").html(pageStr);
				       	$("#searchDetail").slideDown(500);
				       	//对标头数据操作
				       	$("#unallocated_count").html(result.totalCount)
				       	if(result.count.length==0){
				       		$("#unallocated_count_quick").html(0);
				       		$("#unallocated_count_normal").html(0);
				       		$("#unallocated_count_slow").html(0);
				       	}else if	(result.count.length==1){
				       		if(result.count[0].count_engency==1){
				       			$("#unallocated_count_quick").html(result.count[0].count_num);
				       			$("#unallocated_count_normal").html(0);
					       		$("#unallocated_count_slow").html(0);
				       		}else if(result.count[0].count_engency==2){
				       			$("#unallocated_count_quick").html(0);
					       		$("#unallocated_count_normal").html(result.count[0].count_num);
					       		$("#unallocated_count_slow").html(0);
				       		}else if(result.count[0].count_engency==3){
				       			$("#unallocated_count_quick").html(0);
					       		$("#unallocated_count_normal").html(0);
				       			$("#unallocated_count_slow").html(result.count[0].count_num);
				       		}
				       	}else if(result.count.length==2){
				       		if(result.count[0].count_engency==1&&result.count[1].count_engency==2){
				       			$("#unallocated_count_quick").html(result.count[0].count_num);
				       			$("#unallocated_count_normal").html(result.count[1].count_num);
					       		$("#unallocated_count_slow").html(0);
				       		}else if(result.count[0].count_engency==1&&result.count[1].count_engency==3){
				       			$("#unallocated_count_quick").html(result.count[0].count_num);
				       			$("#unallocated_count_normal").html(0);
					       		$("#unallocated_count_slow").html(result.count[1].count_num);
				       		}else if(result.count[0].count_engency==2&&result.count[1].count_engency==3){
				       			$("#unallocated_count_quick").html(0);
					       		$("#unallocated_count_normal").html(result.count[0].count_num);
				       			$("#unallocated_count_slow").html(result.count[1].count_num);
				       		}
				       	}else if(result.count.length==3){
				       		$("#unallocated_count_quick").html(result.count[0].count_num);
				       		$("#unallocated_count_normal").html(result.count[1].count_num);
			       			$("#unallocated_count_slow").html(result.count[2].count_num);
				       	}
					},
					error : function(xhr, textStatus, errorThrown) {
					}
				})
			});	
			
		});
	});