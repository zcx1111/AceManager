/**
 * Created by Liuqi on 2017/7/13.
 */
//全局变量 
var communityInfosObj = new Array();//小区信息数组
var down_up_arrow_dom ="";//房源下拉按钮DOM

$(document).ready(function() {
	
	//加载左侧小区列表
	getCommunityList(true,null);
	
	//动态获取存在小区所涉及的省市级联
	getProAndCityCascade();
	
	//获取“全部” “已租” “停用” “空置”的房间数量
	getDifferentStatusRoomCount();
	
	/*加载   “全部小区”  start*/
	$("#allCommunityListA").click(function(){
		$("#houseListSpan").nextAll().remove();
		$(this).parent().siblings().each(function(index){
			//遍历所有小区<a>标签,依次发送ajax请求
			var $a = $(this).find("a");
			var cid = $a.attr("communityId");
			$.getJSON(
				contextPath+"/rentalBasic/houseList.html",
				{"communityId":cid},
				function(data){
					getHouseListByCommunityId_callback(communityInfosObj[index],data);
				}
			);			
		});
	});
	/*加载   “全部小区”  end*/
	
	/*房源装修中始末时间框展现   start */
	$("#addHouseModal").find("[name='inRenovation']").click(function(){
		var $td = $(this).parents("tr:first").find("td:gt(1)")
		if($(this).get(0).checked){
			//选中装修
			$td.find("input").attr("type","text");
		}else{
			$td.find("input").attr("type","hidden").val("");
			$("#decorationStartTime-error").remove();
			$("#decorationEndTime-error").remove();
		}
	});
	/*房源装修中始末时间框展现   end */
	
	/*整租 合租 选择房间框展现   start*/
	$("#addHouseModal").find("[name='rentalType']").click(function(){
		var $td = $(this).parents("tr").find("td:eq(3)");
		if($(this).val() == "合租"){
			$td.css("display","block");
		}else{
			$td.css("display","none");
			$(this).parents("tr").find("[name='roomCount']").val("");
		}
	});	
	/*整租 合租 选择房间框展现   end*/
	
	//增加房源提交
	$("#addHouseConfirm").click(function(){
		$("#addHouseForm").submit();
	});

    /*房源编辑      start*/
    $('#house-edit').click(function () { 	
    	var state = $(this).html();
    	var $form = $("#modifyHouseDetialFrom");
    	var $start = $form.find("[name='decorationStartTime']");
    	var $end = $form.find("[name='decorationEndTime']");
    	if(state == "编辑"){//点击编辑
    		$(this).html("保存").attr("class","btn btn-success need-attr-house-id");
    		//解除只读
    		$form.find("[disabled='true']").removeAttr("disabled");
    		$form.find("[disabled='disabled']").removeAttr("disabled");
    		//装修
    		$form.find("[name='inDecorate']").parent().append(`<td><label><input type="radio" checked="checked" name="in_Renovation" value="no"/>选择不装修</label>
    															   <label><input type="radio" name="in_Renovation" value="yes"/>选择装修</label></td>`);
    		$form.find("[name='in_Renovation']").click(function(){
    			if($(this).val() == "yes"){
    				$start.attr("type","text");
    				$end.attr("type","text");
    				$form.find("[name='inRenovation']").val("装修中");
    			}else{
    				$form.find("[name='inRenovation']").val("未装修");
    				$start.val("");
    				$end.val("");
    				$start.attr("type","hidden");
    				$end.attr("type","hidden");
    			}
    		});
    	}else{//点击保存
    		$(this).html("编辑").attr("class","btn btn-info need-attr-house-id");
    		$form.find("[name='inDecorate']").parent().find("td:eq(2)").remove();
			$start.attr("type","hidden");
			$end.attr("type","hidden");
			//ajax提交保存操作
			$.ajax({
				type : "POST",
				data : $form.serialize(),
				url : contextPath+"/rentalBasic/updateHouse.html",
				dataType : "html",
				success : function(data) {
					if(data == "success"){
						magicAlert("修改房源成功!","success");
						//自动点击房源详情选项卡
						$form.parents(".modal-body").find("[name='house_detail']").click();
					}else{
						magicAlert("修改房源失败,请重试!","failed");
					}
				},
				error : function(){
					magicAlert("error","failed");
				}
			});
			$form.find(".my-dis").attr("disabled",true);
    	}
    });
	/*房源编辑      end*/

    /*编辑房间       start*/
    $("#room-edit").click(function(){
    	var state = $(this).html();
    	if(state == "编辑"){//点击编辑
    		$(this).html("保存").attr("class","btn btn-success");
    		//解除只读
    		$("#roomShowModal").find("[readonly='readonly']").removeAttr("readonly");
    	}else{//点击保存
    		$(this).html("编辑").attr("class","btn btn-info");
    		$("#roomShowModal").find("[name='roomName']").attr("readonly","readonly");
    		$("#roomShowModal").find("[name='remark']").attr("readonly","readonly");
			//ajax提交保存操作
			$.ajax({
				type : "POST",
				data : $("#modifyRoomForm").serialize(),
				url : contextPath+"/rentalBasic/modifyRoomByRoomId.html",
				dataType : "html",
				success : function(data) {
					if(data == "success"){
						magicAlert("修改房间信息成功!","success");
						$("#roomShowModal").find("[name='room_detail']").click();
					}else{
						magicAlert("修改房间信息失败,请重试!","failed");
					}
				},
				error : function(){
					magicAlert("error","failed");
				}
			});   		
    	}
    });
    /*编辑房间       end*/
    
    //编辑房源-省市级初始化
    $("#cityAssit").citySelect({
        prov: "湖南",
        city: "长沙"
    });
    
    //增加房间 
    $("#addRoomConfirmModal").find("[name='addRoomConfirmBtn']").click(function(){
    	var houseId = $("#addRoomConfirmModal").find("[name='house-id']").html();
    	$.ajax({
    		type : "POST",
    		url : contextPath + "/rentalBasic/addRoomForHouse.html",
    		data : {"houseId":houseId},
    		dataType : "html",
    		async : false,
    		success : function(data) {
    			if(data == "success"){
    				magicAlert("增加房间成功!","success"); 		
    			}else{
    				magicAlert("服务器繁忙,请登陆后重试!","failed");
    			}
    		},
    		error : function(){
    			magicAlert("error","failed");
    		}
    	});	    	
    });

    /*
     * 增加房间确认的模态框消失后
     *  刷新房源详情选项卡
     */
    $("#addRoomConfirmModal").on("hide.bs.modal", function (e) {
    	$("#houseTabContent").parents(".modal-body").find("[name='house_detail']").click();
    	getDifferentStatusRoomCount();
    });
  
    /*
     * #房源模态框,#房间模态框,#签约模态框消失后
     * 	刷新当前小区信息，并且选中上一次选中的小区
     */
    $("#houseModal,#roomShowModal,#signedRoomModal").on("hide.bs.modal", function (e) {
    	flashIndexInfoAfterUpperModal($(this).find("[name='CID']").val(),null);
    	getDifferentStatusRoomCount();
    });
    
    /*
     * #收款模态框消失后
     * 	刷新当前小区信息，并且选中上一次选中的小区
     */
    $("#payForBillModal").on("hide.bs.modal", function (e) {
    	flashIndexInfoAfterUpperModal(null,$(this).find("[name='CID']").val());
    	getDifferentStatusRoomCount();
    });
    
    /*
     * #增加房源模态框消失后
     * 	刷新省市级联下拉框
     */
    $("#addHouseModal").on("hide.bs.modal", function (e) {
    	getProAndCityCascade();
    	getDifferentStatusRoomCount();
    });
    
    //停用房源操作
    $("#disableHouseModal").find("[name='disableHouseConfirmBtn']").click(function(){
    	$.ajax({
    		type : "POST",
    		url : contextPath + "/rentalBasic/disableHouseByHouseId.html",
    		data : {"houseId":$("#houseModal").find("[name='house-id']").html()},
    		dataType : "html",
    		success : function(data) {
    			if(data == "success"){
    				magicAlert("停用房源成功!","success");
    			}else if(data == "failed"){
    				magicAlert("有房间在出租中,无法停用,请退租后再处理!","failed");
    			}
    			$("#houseModal").find("[name='house_detail']").click();
    		},
    		error : function(){
    			magicAlert("error","error");
    		}	
    	});
    });
    
    //启用房源操作
    $("#disableAndAbleBtn").click(function(){
    	if($(this).html() == "启用"){
        	$.ajax({
        		type : "POST",
        		url : contextPath + "/rentalBasic/ableHouseByHouseId.html",
        		data : {"houseId":$("#houseModal").find("[name='house-id']").html()},
        		dataType : "html",
        		success : function(data) {
        			if(data == "success"){
        				magicAlert("启用房源成功!","success");
        			}else if(data == "failed"){
        				magicAlert("启用失败,请重试!","failed");
        			}
        			$("#houseModal").find("[name='house_detail']").click();
        		},
        		error : function(){
        			magicAlert("error","error");
        		}
        	});
    	}
    });
    
    //删除房源操作
    $("#deleteHouseConfirmBtn").click(function(){
    	$.ajax({
    		type : "POST",
    		url : contextPath + "/rentalBasic/deleteHouseByHouseId.html",
    		data : {"houseId":$("#houseModal").find("[name='house-id']").html()},
    		dataType : "html",
    		success : function(data) {
    			if(data == "success"){
    				magicAlert("删除房源成功!","success");
    			}else{
    				magicAlert(data,"failed");
    			}
    		},
    		error : function(){
    			magicAlert("error","error");
    		}
    	});
    });
    
    //删除房间操作
    $("#deleteRoomConfirmBtn").click(function(){
    	$.ajax({
    		type : "POST",
    		url : contextPath + "/rentalBasic/deleteRoomByRoomId.html",
    		data : {"roomId":$("#roomShowModal").find("[name='room-id']").val()},
    		dataType : "html",
    		success : function(data) {
    			if(data == "success"){
    				magicAlert("删除房间成功!","success");
    			}else{
    				magicAlert("该房间已出租,不能删除!","failed");
    			}
    		},
    		error : function(){
    			magicAlert("error","error");
    		}
    	});    	
    });
    
    //省市级联动态搜索
    $("#house_cites").find(".prov,.city").change(function(){
    	var prov = "";
    	var city = "";
    	setTimeout(function(){
    		prov = $("#house_cites").find(".prov").val();
    		city = $("#house_cites").find(".city").val();
    		var condition = {"prov":prov,"city":city};
    		getCommunityList(true,condition);
    	},50);
    });
    
    //顶部searchBar房间状态动态搜索
    $("#roomStatusSearch").find("li").click(function(){
    	$("#roomStatusSearch").find("li").removeClass("active").find("a").css("background-color","");
    	$(this).addClass("active").find("a").css("background-color","#2fa4e7");
    	var roomStatus = $(this).find("a").html().substring(0,2);
    	
    	var $down_up_arrow = $("a.btn.btn-minimize.btn-round.btn-default");

    	$("div[class='box-content']").not(":first").hide();
    	
    	getRoomsByHouseId($down_up_arrow,1,roomStatus);
    	
    });
    
    /**
     * 增加房源模态框 弹出前的准备
     */
    $('#addHouseModal').on('show.bs.modal', function (event) {
    	//1、初始化省市区三级联动
        $("#house_city_form").citySelect({
            prov: "湖南",
            city: "长沙"
        });
    });
    
});

/**
 * 加载左侧小区列表 
 * @param isDisplayFist
 * @returns
 */
function getCommunityList(isDisplayFist,condition){
	//isDisplayFist :为true则获取列表后自动显示第一个小区下的房源信息
	//condition:省市动态条件查询
	$.ajax({
		type : "POST",
		url : contextPath + "/rentalBasic/communityList.html",
		dataType : "html",
		data : condition,
		success : function(data) {
			if (data == "noLogin") {
				magicAlert("请先登录!","success");
			} else if (data == "failed") {
				magicAlert("获取失败!","failed");
			} else {
				//清空communityListUl里面下面除了第一个li的内容
				$("#communityListUl li:gt(0)").remove();
				var result = $.parseJSON(data);
				for ( var i = 0; i < result.length; i++) {
					communityInfosObj[i] = result[i];
					$("#communityListUl").append("<li><a class='ajax-link community' communityId='"+result[i].id+"' href='javascript:void(0);'" +
												" onclick='getHouseListByCommunityId(communityInfosObj["+i+"]);'><span>" + 
												result[i].communityName + "</span></a></li>");
					
					//2、获取现存的小区名称，顺便在增加房源的模态框中的小区名称输入下拉框展现小区名称
					$("#comms").append(`<option label="`+result[i].province+` `+result[i].city+` `+result[i].area+`" 
										value="`+result[i].communityName+`">`);
					
				}
				$("#allCommunityListA h5").html("全部小区("+result.length+")");
			    //初次加载即显示第一个小区的房源列表
				if(isDisplayFist){
					$("#communityListUl li:eq(1) a").click();
				}
			}
		},
		error : function(){
			magicAlert("error","failed");
		}
	});
}

/**
 * 根据左侧小区加载其下房源框 
 * @param communityInfo
 */
function getHouseListByCommunityId(communityInfo){
	$("#houseListSpan").nextAll().remove();
	$.ajax({
		type : "POST",
		url : contextPath + "/rentalBasic/houseList.html",
		data : {"communityId":communityInfo.id},
		dataType : "html",
		success : function(data) {
			if(data == "noData"){
				magicAlert("服务器繁忙，请登陆后重试！","failed");
			}else{
				getHouseListByCommunityId_callback(communityInfo,JSON.parse(data));
			}
		},
		error : function(){
			magicAlert("error","failed");
		}
	});	
}

/**
 * 加载房源框回调函数
 * @param communityInfo
 * @param data
 * @returns
 */
function getHouseListByCommunityId_callback(communityInfo,data){
	var houseCardDiv = "";
	for ( var i = 0; i < data.length; i++) {
		houseCardDiv += `
		<div class="row">
			<div class="box col-md-12">
			<div class="box-inner">
				<div class="box-header well" data-original-title="">
					<h2>
						`+communityInfo.communityName+`
						<button class="btn-link" data-toggle="modal" data-target="#houseModal" data-house-id="`+data[i].id+`" 
							data-communityname="`+communityInfo.communityName+`"  style="text-decoration:none">
							<small><span>`+data[i].building+`栋`+data[i].unit+`单元`+data[i].floor+`楼`+data[i].no+`号</span> &nbsp;<i class=" glyphicon glyphicon-info-sign"></i> </small>
						</button>
					</h2>
					<div class="box-icon">
						<a href="javascript:void(0);" class="btn btn-minimize btn-round btn-default"><i class="glyphicon glyphicon-chevron-down"></i> </a>
					</div>
				</div>
				<div class="box-content">
					<table class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th style="text-align:center">房间名</th>
								<th style="text-align:center">房间状态</th>
								<th style="text-align:center">租户</th>
								<th style="text-align:center">温馨提示</th>
								<th style="text-align:center">操作</th>
							</tr>
						</thead>
						<tbody>
							<!--房间列表：ajax异步填充-->
							<tr>
								<td colspan = "5">
								<div style="width:740px;height:350px;text-align: center;vertical-align: middle;display: table-cell; ">
									<img src="`+contextPath+`/statics/img/ajax-loaders/ajax-loader-6.gif">
								</div>
								</td>
							</tr>
						</tbody>
					</table>
					<center>
						<ul style="float: left;" name="pagesuteInfo">
							<strong><li style="list-style-type:none;">共<span name="totalCount"></span>个房间 &nbsp;&nbsp;
							<span name="currentPageNo"></span>/<span name="totalPageCount"></span>页</li></strong>
						</ul>
						<ul class="pagination pagination-centered">
							<!--动态构建分页组件-->
						</ul>
					</center>
				</div>
			</div>
		</div>
	</div>`;
	}
	//填充房源信息DIV
	$("#houseListSpan").after(houseCardDiv); 
	var $down_up_arrow = $("a.btn.btn-minimize.btn-round.btn-default");
	//清除下拉按钮绑定的click事件，避免多次绑定
	$down_up_arrow.unbind("click");
	//第一个房源卡展开，后面的折叠
	$("div[class='box-content']").hide();
	//显隐房源列表事件
	$down_up_arrow.bind("click",function(e){
		e.preventDefault();
		var $box_content = $(this).parent().parent().next();
		if($box_content.is(":hidden")){
			$(this).find("i").attr("class","glyphicon glyphicon-chevron-up");
			//下拉房间列表框展现之后
			down_up_arrow_dom =this;
			//获取当前选中的房间状态搜索
			var nowRoomStatus = $("#roomStatusSearch").find("li[class='active']").find("a").html().substring(0,2);
			getRoomsByHouseId(down_up_arrow_dom,1,nowRoomStatus);
		}else{
			$(this).find("i").attr("class","glyphicon glyphicon-chevron-down");
		}
		$box_content.slideToggle(350);
	});
	//展开第一个房源框
	$down_up_arrow[0].click();
}

/**
 * 根据房源ID该房源下的房间列表
 * @param dua_obj
 * @param currPageNo
 * @returns
 */
function getRoomsByHouseId(dua_obj,currPageNo,roomStatus){
	var houseId = $(dua_obj).parent().prev().find("[class='btn-link']:first").attr("data-house-id");
	var $tbody = $(dua_obj).parents(".box-inner").find("tbody");
//	$tbody.children().remove();//清空所有tr
	$.getJSON(
			contextPath+"/rentalBasic/getRoomsByHouseId.html",
			{"houseId":houseId,"currPageNo":currPageNo,"roomStatus":roomStatus},
			function(data){
				var trdata = "";
				for ( var i = 0; i < data.items.length; i++) {
					//房间名,房间状态
					trdata += `<tr><td style="text-align:center">`+data.items[i].roomName+`</td><td style="text-align:center" class="center" >`+data.items[i].status+`</td>`;
					//租户		   
					if(data.items[i].clienteleName != null){
						trdata += `<td style="text-align:center" class="center">`+data.items[i].clienteleName+`</td>`;
					}else{
						trdata += `<td style="text-align:center" class="center">&nbsp;</td>`;
					}
					//房间温馨提示
					trdata += `<td style="text-align:center" class="center">`+data.items[i].tips+`</td>`;
					//4种操作按钮的动态显示
					trdata += `<td style="text-align:center">`;	
					trdata += `<button class="btn btn-sm btn-default" data-toggle="modal" data-room-id="`+data.items[i].id+`" data-house-id="`+houseId+`" data-target="#roomShowModal">查看</button>&nbsp;`;
					if(data.items[i].status == "空置"){//房间状态为空置
						trdata += `<button class="btn btn-sm btn-success" data-toggle="modal" data-room-id="`+data.items[i].id+`" data-house-id="`+houseId+`" onclick="toAddRentContract(this)">签约</button>&nbsp;`;
					}
					if(data.items[i].status == "已租"){//房间状态为已租
						var tips = data.items[i].tips;
						if(tips.indexOf("收租：") == 0){//温馨提示是需要收租
							//收租时间
							var collectRentDate = DateFormat.parseDate(tips.slice(3),"yyyy-MM-dd");
							var nowdate = new Date(DateFormat.getNowDateString("yyyy-MM-dd"));
//							alert(nowdate +"---"+collectRentDate);
							if(nowdate >= collectRentDate){//当前时间 >= 收租时间  :==>显示催租按钮
								trdata += `<button class="btn btn-sm btn-danger" data-toggle="modal" data-room-id="`+data.items[i].id+`" data-house-id="`+houseId+`" data-bill-id="`+data.items[i].firstPayingBillId+`" data-target="#billMassageModal">催租</button>&nbsp;`;
							}
							//温馨提示没有可处理的账单	
							trdata += `<button class="btn btn-sm btn-warning" data-toggle="modal" data-room-id="`+data.items[i].id+`" data-house-id="`+houseId+`" data-bill-id="`+data.items[i].firstPayingBillId+`" data-target="#payForBillModal">收款</button>&nbsp;</td></tr>`;
						}
					}
				}
				$tbody.children().remove();//清空所有tr
				$tbody.append(trdata);
				
				var $pagesuteInfo = $(dua_obj).parents(".box-inner").find("[name='pagesuteInfo']").find("strong");
				var $pageUL = $(dua_obj).parents(".box-inner").find(".pagination-centered");
				$pageUL.children().remove();
				//分页组件信息
				$pagesuteInfo.find("[name='totalCount']").html(data.totalCount);
				$pagesuteInfo.find("[name='currentPageNo']").html(data.currPageNo);
				$pagesuteInfo.find("[name='totalPageCount']").html(data.totalPageCount);
				
				//动态构建分页按钮    start
				var lis = "";
				//首页
				lis += `<li><a href="javascript:void(0)" title="首页" onclick="getRoomsByHouseId(down_up_arrow_dom,1,'`+roomStatus+`');">首页</a></li>`;
				//上一页
				lis += `<li><a href="javascript:void(0)" title="上一页" onclick="getRoomsByHouseId(down_up_arrow_dom,`+(data.currPageNo-1)+`,'`+roomStatus+`');"><i class="glyphicon glyphicon-chevron-left"></i></a></li>`;
				//前2
				for ( var i = 0; i < data.prevPages.length; i++) {
					lis += `<li><a href="javascript:void(0)" onclick="getRoomsByHouseId(down_up_arrow_dom,`+data.prevPages[i]+`,'`+roomStatus+`');">`+data.prevPages[i]+`</a></li>`;
				}
				//当前页
				lis += `<li class="active"><a href="javascript:void(0)">`+data.currPageNo+`</a></li>`;
				//后2
				for ( var i = 0; i < data.nextPages.length; i++) {
					lis += `<li><a href="javascript:void(0)" onclick="getRoomsByHouseId(down_up_arrow_dom,`+data.nextPages[i]+`,'`+roomStatus+`');">`+data.nextPages[i]+`</a></li>`;
				}
				//下一页
				lis += `<li><a href="javascript:void(0)" title="下一页" onclick="getRoomsByHouseId(down_up_arrow_dom,`+(data.currPageNo+1)+`,'`+roomStatus+`');"><i class="glyphicon glyphicon-chevron-right"></i></a></li>`;
				//尾页
				lis += `<li><a href="javascript:void(0)" title="尾页" onclick="getRoomsByHouseId(down_up_arrow_dom,`+data.totalPageCount+`,'`+roomStatus+`');">尾页</a></li>`;
				//动态构建分页按钮    end
				$pageUL.append(lis);
			}
	);	
}

/**
 * 点击房源模态框 中 的第一个 “房源详情”选项卡 ，异步加载房源详情
 * @param target
 * @returns
 */
function get_house_detail(target){
	var houseId = $(target).attr("data-house-id");
	//房源隐藏域id赋值
	$("#modifyHouseDetialFrom").find("[name='id']").val(houseId);
	var $content = $(target).parents(".modal-content");
	//异步请求根据房源Id获取房源详情
	$.getJSON(
		contextPath+"/rentalBasic/getHouseDetailByHouseId.html",
		{"houseId":houseId},
		function(data){
			$content.find("[name='community.communityName']").val(data.community.communityName);
			$content.find("[name='communityName']").html(data.community.communityName);
			$content.find("[name='rental_type']").html(data.rentalType);
			$content.find("[name='commAddress']").html(data.building+"栋"+data.unit+"单元"+data.floor+"楼"+data.no+"号");
			$content.find("[name='communityAddress']").html(data.community.communityAddress);
			$content.find("[name='community.communityAddress']").val(data.community.communityAddress);
			//FIXME 合租整租下拉框自选bug 已解决--->用prop代替attr
			$content.find("[name='rentalType']").find("[value='"+data.rentalType+"']").prop("selected","selected");
			$content.find("[name='roomCount']").html(data.roomCount);
			$content.find("[name='CID']").val(data.community.id);
			//房源停用启用按钮转换
			if(data.status == "可用"){
				$content.find("[name='isDisable']").html("");
				$("#disableAndAbleBtn").attr({"data-target":"#disableHouseModal","class":"need-attr-house-id btn btn-warning"}).html("停用");
			}else if(data.status == "停用"){
				$content.find("[name='isDisable']").html("当前房源已停用");
				$("#disableAndAbleBtn").attr({"data-target":"","class":"need-attr-house-id btn btn-success"}).html("启用");
			}
		    $("#cityAssit").citySelect({
		        prov: data.community.province,
		        city: data.community.city,
		        dist: data.community.area
		    });
		    setTimeout(function(){
		    	//只读省市级联动
		    	$("#cityAssit").find(".city").attr("disabled",true);
		    	$("#cityAssit").find(".dist").attr("disabled",true);
		    },200);
			$content.find("[name='remark']").val(data.remark);
			
			if(data.inRenovation == "未装修"){
				$content.find("[name='inDecorate']").css("color","green");
				$content.find("[name='inDecorate']").html(data.inRenovation);
			}else if(data.inRenovation == "装修中"){
				$content.find("[name='inDecorate']").css("color","red");
				$content.find("[name='inDecorate']").html(data.inRenovation+" [ "+data.decorationStartTime+" ~ "+data.decorationEndTime+" ]");
			}
		}	
	);
	//异步请求查询当前房源的在租房间个数
	$.getJSON(
		contextPath+"/rentalBasic/getOnrentRoomCount.html",
		{"houseId":houseId},
		function(data){
			$content.find("[name='onRentCount']").html(data);
		}
	);
	//异步请求查询当前房源的房间列表
	$.getJSON(
		contextPath+"/rentalBasic/getRoomsForRoomInfo.html",
		{"houseId":houseId},
		function(data){
			var $ul = $content.find("[name='roomsList'] ul");
			$ul.children().remove();
			var lis = "";
			for ( var i = 0; i < data.length; i++) {
				lis += `<li>&nbsp;</li>
				<li><span class="glyphicon glyphicon-home" aria-hidden="true"></span>
				<span style="margin-right: 35px"></span>`+data[i].roomName+`</li>`;
			}
			$ul.append(lis);
		} 
	);
}

/**
 * 点击房间模态框 中 的第一个 “房间详情”选项卡 ，异步加载房间详情
 * @param target
 * @returns
 */
function get_room_detail(target){
	var houseId = $("#roomShowModal").find("[name='house-id']").val();
	var roomId = $("#roomShowModal").find("[name='room-id']").val();
	$("#roomShowModal").find("[name='id']").val(roomId);
	$.getJSON(
		contextPath+"/rentalBasic/getHouseDetailByHouseId.html",
		{"houseId":houseId},
		function(data){
			$("#roomShowModal").find("[name='communityName']").html(data.community.communityName);
			$("#roomShowModal").find("[name='houseAddress']").html(data.building+"栋"+data.unit+"单元"+data.floor+"楼"+data.no+"号");
			$("#roomShowModal").find("[name='CID']").val(data.community.id);
		}
	);
	$.getJSON(
		contextPath+"/rentalBasic/getRoomDetailByRoomId.html",
		{"roomId":roomId},
		function(data){
			if(data == "failed"){
				magicAlert("服务器繁忙,请登陆后重试!","failed");
			}else{
				$("#roomShowModal").find("[name='roomName']").val(data.roomName);
				$("#roomShowModal").find("[name='remark']").val(data.remark);
				$("#roomShowModal").find("[name='roomStatus']").html(data.status);
				if(data.status == "已租"){
					//当前房间下有租客信息
					$("#roomShowModal").find(".rentStation").show();
					$("#roomShowModal").find("[name='clienteleName']").html(data.clienteleName);
					$("#roomShowModal").find("[name='startDate']").html(data.contractStartDate);
					$("#roomShowModal").find("[name='endDate']").html(data.contractEndDate);
					$("#roomShowModal").find("[name='rommStatus']").html(data.status);
				}else{
					//当前房间下没有租客
					$("#roomShowModal").find(".rentStation").hide();
				}
			}
		}
	);
}

/**
 * 增加房源
 * @returns
 */
function addHouse_ajax(){
	$.ajax({
		type : "POST",
		url : contextPath + "/rentalBasic/addHouse.html",
		data : $("#addHouseForm").serialize(),
		dataType : "html",
		success : function(data) {
			if(data == "failed"){
				magicAlert("添加失败,请重试!","failed");
			}else if(data == "房源已存在,添加失败!"){
				magicAlert(data,"failed");
			}else if(data == "增加房源成功!"){
				magicAlert(data,"success");
				$("#addHouseModal").modal("hide");
				getCommunityList(true,null);
			}
		},
		error : function(){
			magicAlert("error","failed");
		}
	});
}

/**
 * 上层模态框消失后选择性异步刷新租务首页
 * @param communityId
 * @returns
 */
function flashIndexInfoAfterUpperModal(communityId,communityName){
	getCommunityList(false,null);
	var $temp;
	if(communityId != null){
		$("#communityListUl li a").each(function(){
			if($(this).attr("communityid") == communityId){
				$temp = $(this);
				return false;
			}
		});
	}
	if(communityName != null){
		$("#communityListUl li a").each(function(){
			if($(this).find("span").html() == communityName){
				$temp = $(this);
				return false;
			}
		});		
	}
	setTimeout(function(){$temp.click()},200);
}

/**
 * 动态获取存在小区所涉及的省市级联
 * @returns
 */
function getProAndCityCascade(){
	$.getJSON(
		contextPath+"/rentalBasic/getProAndCityCascade.html",
		function(data){
		    //租务首页-省市级初始化
		    $("#house_cites").citySelect({
		    	url:data,
	         	prov:data.citylist[0].p,
	         	city:data.citylist[0].c[0].n,
		    }); 
		}
	);
}

/**
 * 获取“全部” “已租” “停用” “空置”的房间数量
 * @returns
 */
function getDifferentStatusRoomCount(){
	$.getJSON(
		contextPath+"/rentalBasic/getDifferentStatusRoomCount.html",
		function(data){
			//填充统计数
			$("#roomStatusSearch").find("[name='totalCount']").html(data.totalCount);
			$("#roomStatusSearch").find("[name='rentedCount']").html(data.rentedCount);
			$("#roomStatusSearch").find("[name='stopUseCount']").html(data.stopUseCount);
			$("#roomStatusSearch").find("[name='emptyCount']").html(data.emptyCount);
		}
	);
	
}
