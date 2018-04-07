/*
function magicAlert(keywords, success_failed) {
	$("#toastr #info").text(keywords); //写入操作结果信息
	$("#toastr").css("display", "block"); //显示弹窗
	var $p = $("#toastr").find("p");
	var $i = $("#toastr").find("i");
	if (success_failed == "success") { //成功样式
		$p.attr("class", "alert alert-success");
		$i.attr("class", "glyphicon glyphicon-ok");
	} else if (success_failed == "failed") { //失败样式
		$p.attr("class", "alert alert-danger");
		$i.attr("class", "glyphicon glyphicon-remove");
	} else if (success_failed == "hasUser") {
		$p.attr("class", "alert alert-danger");
		$i.attr("class", "glyphicon glyphicon-remove");
	} else if (success_failed == "nodata") {
		$p.attr("class", "alert alert-danger");
		$i.attr("class", "glyphicon glyphicon-remove");
	}
	setTimeout(function() {
		$("#toastr").css("display", "none");
	}, 3500); //2秒后弹窗消失
}*/

function mainFunctionSelectChange(obj, id) {
	if (obj.checked) {
		$("#subfuncul" + id + " :checkbox").prop("checked", true);
	} else {
		$("#subfuncul" + id + " :checkbox").prop("checked", false);
	}
}

function selectChange(obj, id) {
	if (obj.checked) {
		$("#function" + id).prop("checked", true);
	}
}

//查看角色模态框
$('#modal4').on('show.bs.modal', function(event) {
	var link = $(event.relatedTarget) // Button that triggered the modal
	var recipient = link.attr('roleName') // Extract info from data-* attributes
	var roleId = link.attr('roleId');
	var modal = $(this)
	modal.find(".role-name").val(recipient);
	$.ajax({
		url : contextPath + '/authority/getfuncs.html',
		type : 'POST',
		data : {
			'roleId' : roleId
		},
		dataType : 'json',
		timeout : 1000,
		error : function() {
			alert('加载功能列表失败');
		},
		success : function(result) {
			if (result == 'nodata') {
				alert('对不起,功能列表获取失败，请重试');
			} else {
				listtr = '';
				for (var i = 0; i < result.length; i++) {
					/**
					 * 一级权限
					 */
					listtr += `<li><input type="checkbox" id="house-manage" funcid="` + result[i].id + `"
						name="` + result[i].functionCode + `"> <label for="house-manage">` + result[i].functionName + `</label>`;
					if (result[i].subFuncs.length != 0) {
						listtr += `<ul class="list-unstyled list" style="margin-left: 20px;">`;
						for (var j = 0; j < result[i].subFuncs.length; j++) {
							/**
							 * 二级权限
							 */
							listtr += `<li><input type="checkbox" id="function` + result[i].subFuncs[j].id + `" name="` +
								result[i].subFuncs[j].functionCode + `" funcid="` + result[i].subFuncs[j].id + `"> <label>` + result[i].subFuncs[j].functionName + `</label>`;
							if (result[i].subFuncs[j].subFuncs.length != 0) {
								listtr += `<ul class="list-unstyled list-inline" style="margin-left: 20px;">`
								for (var k = 0; k < result[i].subFuncs[j].subFuncs.length; k++) {
									/**
									 * 三级权限
									 */
									listtr += `<li><input type="checkbox" funcid="` + result[i].subFuncs[j].subFuncs[k].id + `"> <label>` + result[i].subFuncs[j].subFuncs[k].functionName + `</label>`;
									listtr += `</li>`;
								}
								listtr += `</ul>`;
							}
							listtr += `</li>`
						}
						listtr += `</ul>`
					}
					listtr += `</li>`
				}
				var h = $("#modal4").find('.addmod').html();
				$("#modal4").find('.addmod').html(listtr);
				$("#modal4 :checkbox").each(function() {
					var checkbox = $(this);
					$.ajax({
						url : path + '/authority/getAuthorityDefault.html',
						type : 'POST',
						data : {
							roleId : roleId,
							funcId : $(this).attr("funcid")
						},
						dataType : 'html',
						timeout : 1000,
						error : function() {},
						success : function(result) {
							if (result == "success") {
								//alert("ok");
								checkbox.attr("checked", true);
							} else {
								//alert("no");
								checkbox.attr("checked", false);
							}
						}
					});
				});
			}
		}
	});
})


//查看编辑角色模态框
$('#modal7').on('show.bs.modal', function(event) {
	var link = $(event.relatedTarget) // Button that triggered the modal
	var recipient = link.attr('roleName') // Extract info from data-* attributes
	var roleId = link.attr('roleId');

	var modal = $(this)
	modal.find(".role-name").val(recipient);
	modal.find(".role-name").attr("roleId", roleId);
	$.ajax({
		url : contextPath + '/authority/getfuncs.html',
		type : 'POST',
		data : {
			'roleId' : roleId
		},
		dataType : 'json',
		timeout : 1000,
		error : function() {
			alert('加载功能列表失败');
		},
		success : function(result) {
			if (result == 'nodata') {
				alert('对不起,功能列表获取失败，请重试');
			} else {
				listtr = '';
				for (var i = 0; i < result.length; i++) {
					/**
					 * 一级权限
					 */
					listtr += `<li><input type="checkbox"  funcid="` + result[i].id + `"
						name="` + result[i].functionCode + `"> <label for="house-manage">` + result[i].functionName + `</label>`;

					if (result[i].subFuncs.length != 0) {
						listtr += `<ul class="list-unstyled list" style="margin-left: 20px;">`;
						for (var j = 0; j < result[i].subFuncs.length; j++) {
							/**
							 * 二级权限
							 */
							listtr += `<li><input type="checkbox" name="` + result[i].subFuncs[j].functionCode + `" funcid="` + result[i].subFuncs[j].id + `"> <label>` + result[i].subFuncs[j].functionName + `</label>`;
							if (result[i].subFuncs[j].subFuncs.length != 0) {
								listtr += `<ul class="list-unstyled list-inline" style="margin-left: 20px;">`
								for (var k = 0; k < result[i].subFuncs[j].subFuncs.length; k++) {
									/**
									 * 三级权限
									 */
									listtr += `<li><input type="checkbox" funcid="` + result[i].subFuncs[j].subFuncs[k].id + `"> <label>` + result[i].subFuncs[j].subFuncs[k].functionName + `</label>`;
									listtr += `</li>`;
								}
								listtr += `</ul>`;
							}
							listtr += `</li>`
						}
						listtr += `</ul>`
					}
					listtr += `</li>`
				}
				var h = $("#modal7").find('.addmod').html();
				$("#modal7").find('.addmod').html(listtr);
				$("#modal7 :checkbox").each(function() {
					var checkbox = $(this);
					$.ajax({
						url : path + '/authority/getAuthorityDefault.html',
						type : 'POST',
						data : {
							roleId : roleId,
							funcId : $(this).attr("funcid")
						},
						dataType : 'html',
						timeout : 1000,
						error : function() {},
						success : function(result) {
							if (result == "success") {
								//alert("ok");
								checkbox.attr("checked", true);
							} else {
								//alert("no");
								checkbox.attr("checked", false);
							}
						}
					});
				});
			}
		}
	});
})

//保存编辑角色的信息
$("#modal7 .modRole").click(function() {
	var roleName = $("#modal7").find(".role-name").val();
	var roleId = $("#modal7").find(".role-name").attr("roleId");
	var arr = [];
	$("#modal7").find(":checked").each(function(index) {
		var checkbox = $(this);
		var id = checkbox.attr("funcid");
		arr.push(id);

	})
	$.ajax({
		url : path + '/authority/modRole.html',
		type : 'POST',
		data : {
			roleId : roleId,
			ids : arr,
			roleName : roleName
		},
		traditional : true,
		dataType : 'html',
		timeout : 1000,
		error : function() {
			alert("修改角色信息失败！");
		},
		success : function(result) {
			if (result == "success") {
				magicAlert("修改角色" + roleName + "信息成功!", "success");
			} else if (result == "failed") {
				magicAlert("修改角色" + roleName + "信息失败!", "failed");
			}
		}
	});
//$("#modal7").modal("hide");
})


$("#close-roleManagement").click(function() {
	$("#roleManagement").css("right", "-800px");
});

//关闭员工信息
$("#close-employerDetail").click(function() {
	$("#employerDetail").css("right", "-800px");
});
$("#test").click(function() {
	//$("#employerDetail").css("right", "0px");
})
//  $('#myModal').modal("show");

//新增角色
$("#addRole").click(function() {
	//从数据库取数据
	$("#modal2").modal('show');
});

//保存新增的角色
$(".addRole").click(function() {
	//角色名
	var roleName = $("#modal2").find('.role-name').val();
	var arr = [];
	$("#modal2").find(":checked").each(function(index) {
		var checkbox = $(this);
		var id = checkbox.attr("id").replace("function", '');
		arr.push(id);

	})
	$.ajax({
		url : contextPath + '/authority/addRole.html',
		type : 'POST',
		data : {
			ids : arr,
			roleName : roleName
		},
		traditional : true,
		dataType : 'json',
		error : function() {},
		success : function(result) {
			if (result == "nodata") {
				magicAlert("没有数据", "failed");
			} else if (result == "addRoleFailed") {
				magicAlert("添加角色失败", "failed");
			} else if (result == "addAuthFailed") {
				magicAlert("添加权限失败", "failed");
			} else {
				magicAlert("添加角色成功", "success");
				content = '';
				content += `<tr>
                        <td>` + result.roleName + `</td>
                        <td>自定义</td>
                        <td>` + result.createTime + `</td>
                        <td><a data-target="#modal7" href="#" roleId="` +
					result.id + `" class="btn btn-primary"
                            roleName="` + result.roleName + `" data-toggle="modal">查看/编辑</a> <b>|</b>
                            <a class="delRole btn btn-danger" onclick="delRole(this,'` + result.id + `','` + result.roleName + `');"  roleName="` + result.roleName + `" roleId="` +
					result.id + `">删除</a>
                        </td>
                    </tr>`;
				//alert(content);
				$("#roleManagement tbody").append(content);
			}
		}
	});
	$("#modal2").find('.role-name').val("");
	$("#modal2").modal('hide');
})
//新增角色模态框
$("#modal2").on('show.bs.modal', function(event) {
	var modal = $(this)
	$.ajax({
		url : contextPath + '/authority/getfuncs.html',
		type : 'POST',
		data : {
			'roleId' : 1
		},
		dataType : 'json',
		timeout : 1000,
		error : function() {
			alert('加载功能列表失败');
		},
		success : function(result) {
			if (result == 'nodata') {
				alert('对不起,功能列表获取失败，请重试');
			} else {
				listtr = '';
				for (var i = 0; i < result.length; i++) {
					/**
					 * 一级权限
					 */
					listtr += `<li><input type="checkbox"  id="function` + result[i].id + `"
						name="` + result[i].functionCode + `" onchange="mainFunctionSelectChange(obj,` +
						result[i].id + `);"> <label for="house-manage">`
						+ result[i].functionName + `</label>`;

					if (result[i].subFuncs.length != 0) {
						listtr += `<ul class="list-unstyled list" id="subfuncul` + result[i].id + `" style="margin-left: 20px;">`;
						for (var j = 0; j < result[i].subFuncs.length; j++) {
							/**
							 * 二级权限selectChange(this,json[i].mainFunction.id+);
							 */
							listtr += `<li><input type="checkbox" onchange="selectChange(this,` +
								result[i].subFuncs[j].parentId + `);"  id="function` + result[i].subFuncs[j].id + `"> <label>` + result[i].subFuncs[j].functionName + `</label>`;
							if (result[i].subFuncs[j].subFuncs.length != 0) {
								listtr += `<ul class="list-unstyled list-inline" style="margin-left: 20px;">`
								for (var k = 0; k < result[i].subFuncs[j].subFuncs.length; k++) {
									/**
									 * 三级权限
									 */
									listtr += `<li><input type="checkbox" id="function` + result[i].subFuncs[j].subFuncs[k].id
										+ `" name="` + result[i].subFuncs[j].subFuncs[k].functionName +
										`" onchange="selectChange(this, ` + result[i].subFuncs[j].subFuncs[k].parentId + `);"> <label>` + result[i].subFuncs[j].subFuncs[k].functionName + `</label>`;
									listtr += `</li>`;
								}
								listtr += `</ul>`;
							}
							listtr += `</li>`
						}
						listtr += `</ul>`
					}
					listtr += `</li>`
				}
				var h = $("#modal2").find('.add').html();

				$("#modal2").find('.add').html(listtr)
			}
		}
	});
})

$("#roleManage").click(function() {
	/* $("#mask").css("display","block")*/
	$("#roleManagement").css("right", "0px");
});

/**
 * 添加员工
 */
$("#addEmployee").click(function() {
	$.ajax({
		url : path + "/authority/hasSuffix.html",
		dataType : 'html',
		success : function(result) {
			if (result == "false") {
				magicAlert("请先添加公司后缀名,再添加员工", "failed");
				window.location.href = path + "/general/accountSetting.html";
			} else {
				$("#suffix").html("@" + result);
			}
		}
	})
	$("#modal3").modal('show');
});

/**
 * 保存添加员工信息
 */
$(".addEmp").click(function() {
	var mobile = $("#modal3").find('.mobile').val();
	var password = $("#modal3").find('.password').val();
	var user_type = $("#modal3").find('.user_type').val();
	var name = $("#modal3").find('.name').val();
	var remark = $("#modal3").find('.remark').val();
	$.ajax({
		url : contextPath + '/authority/accountCreate.html',
		type : 'POST',
		data : {
			"mobile" : mobile,
			"password" : password,
			"user_type" : user_type,
			"name" : name,
			"remark" : remark
		},
		dataType : 'json',
		timeout : 1000,
		error : function() {
			alert('添加员工失败');
		},
		success : function(result) {
			if (result != 'failed') {
				alert(result.roleName);
				
				var listtr = '';
				listtr += `<div class="box-inner ">
                            <%--  --%>
                                <div class="top">
                                <code class="acount-type">` + result.userTypeName + `</code>
                                <a href="#" title="点击查看详情"  userId="` + result.id`">
                                    <p class="text-center empInfo" style="margin-top: 20px; ">
                                        <i class="glyphicon glyphicon-user"></i> <span>` + result.name + `</span>
                                        <br> <i class="glyphicon glyphicon-earphone"></i> <span>` + result.mobile + `</span>
                                    </p>
                                    </a>
                                </div>
                                <hr>
                                <div class="bottom">
                                    <table style="margin-left: 20px; margin-top: -20px;">
                                        <tr style="height: 20px;" userId="` + result.id + `">
                                            <td style="width: 100px;" class="text-center account-role" userid="` + result.id`">
                                                <p class="roleName" style="color: #59acff;">未分配</p>
                                                <p class="">角色</p>
                                            </td>
                                            
                                            <td style="width: 100px" class="text-center ">
                                            <a href="#" onclick="housemanage('` + result.id + `','` + result.name + `','',1)" class="house-source">
                                                <p class="houseCount" style="color: #59acff;">` + result.houseCount + `</p>
                                                <p class="">房源</p>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            <!-- </a> -->
                        </div>`;
				alert(listtr);
				$("#acount-list").append(listtr);
			} else {
				alert('添加员工失败')
			}


		}
	})
	$("#modal3").modal('hide');
})

$(".empInfo").click(function() {
	var userId = $(this).parents('a').attr('userId');
	alert(userId);
	$.ajax({
		url : contextPath + '',
	});
	$("#employerDetail").css("right", "0px");
});
// $("#modal5").modal('show');
$("#modifyPassword").click(function() {
	$("#modal5").modal('show');
});
//删除子账号
$("#delEmployer").click(function() {
	$("#modal6").modal('show');
});

//修改子账号资料
$("#modifyEmployer").click(function() {

	$("#employerDetail").find("#name").removeAttr("readOnly");
	$("#employerDetail").find("#remark").removeAttr("readOnly");
	$("#employerDetail").find("#btn-group").removeAttr("hidden");
});

//隐藏已分配房源
$("#hideAllotThis").click(function() {
	var name = $("#distributeHouse .userinfo .name").html();
	var id = $("#distributeHouse .userinfo .name").attr("userId");
	var communityName = $("#search").val();
	var curPageNo = $("#curPageNo").val();

})

//单选分配房源
function SingleAllotHouse(obj, userId, houseId) {
	if( ($(obj).prop("checked") != "checked") ) {
		$.ajax({
			url : path + "/authority/SingleAllotHouse.html",
			data : {
				userId : userId,
				houseId : houseId,
				allot : 'yes'
			},
			dataType : "html",
			success : function(result) {
				if (result == "false") {
					magicAlert("分配单个房源失败！", "failed");
				} else {
					magicAlert("分配单个房源成功！", "success");
				}
			}
		})
	} else {
		$.ajax({
			url : path + "/authority/SingleAllotHouse.html",
			data : {
				userId : userId,
				houseId : houseId,
				allot : 'no'
			},
			dataType : "html",
			success : function(result) {
				if (result == "false") {
					magicAlert("取消分配单个房源失败！", "failed");
				} else {
					magicAlert("取消分配单个房源成功！", "success");
				}
			}
		})
	}
	var name = $("#distributeHouse .userinfo .name").html();
	var id = $("#distributeHouse .userinfo .name").attr("userId");
	var communityName = $("#search").val();
	var curPageNo = $("#curPageNo").val();
	housemanage(id, name, communityName, curPageNo);
}

function choose(obj) {
	var name = $("#distributeHouse .userinfo .name").html();
	var id = $("#distributeHouse .userinfo .name").attr("userId");
	var communityName = $("#search").val();
	var curPageNo = $("#curPageNo").val();
	if ($(obj).attr("checked") == "checked") {
		housemanage(id, name, communityName, curPageNo);
	}
}

function temp() {
	var name = $("#distributeHouse .userinfo .name").html();
	var id = $("#distributeHouse .userinfo .name").attr("userId");
	var communityName = $("#search").val();
	var curPageNo = $("#curPageNo").val();
	housemanage(id, name, communityName, 1);
}
function fuck1() {
	var name = $("#distributeHouse .userinfo .name").html();
	var id = $("#distributeHouse .userinfo .name").attr("userId");
	var communityName = $("#search").val();
	var curPageNo = $("#curPageNo").val();

	housemanage(id, name, communityName, curPageNo);
}
/**
 * 房源管理
 */

function housemanage(id, name, communityName, curPageNo) {
	//$("#search").val("");
	$("#distributeHouse .userinfo .name").html(name);
	$("#addAll .name").html(name)
	$("#distributeHouse .userinfo .name").attr("userId", id);
	$("#distributeHouse .allHouses").attr("checked", "checked");
	$.ajax({
		url : path + "/authority/houseManage.html",
		data : {
			userId : id,
			communityName : communityName,
			curPageNo : curPageNo
		},
		dataType : "json",
		success : function(result) {
			$("#curPageNo").empty();
			$("#houseInfo").empty();
			var pageStr = '';

			for (var i = 1; i <= result.totalPageCount; i++) {
				pageStr += `<option value="` + i + `" `;

				if (result.currPageNo == i) {

					pageStr += `selected="selected"`;
				}
				pageStr += `>第 ` + i + `页</option>`;

			}
			$("#curPageNo").append(pageStr);
			var houseStr = '';
			for (var i = 0; i < result.items.length; i++) {
				houseStr += `<tr>
                        <td width="30%">` + result.items[i].communityName + `</td>
                        <td>
                        <ul class="pull-left list-unstyled"
                        style="overflow-y: visible;">`;
				for (var j = 0; j < result.items[i].rentalHouses.length; j++) {
					houseStr += `<li class="house"><label> <input type="checkbox" onchange="SingleAllotHouse(this,` +
						id + `,` + result.items[i].rentalHouses[j].id + `)"
                                houseId="` + result.items[i].rentalHouses[j].id + `">` + result.items[i].rentalHouses[j].building + `栋` +
						result.items[i].rentalHouses[j].unit + `单元`
						+ result.items[i].rentalHouses[j].floor + `楼`
						+ result.items[i].rentalHouses[j].no + `号`;
					if (result.items[i].rentalHouses[j].users.length == 0) {
						houseStr += `(暂未分配)`;
					} else {
						houseStr += `(已分配给`;
						for (var k = 0; k < result.items[i].rentalHouses[j].users.length; k++) {
							if (k == result.items[i].rentalHouses[j].users.length - 1) {
								houseStr += result.items[i].rentalHouses[j].users[k].name;
							} else {
								houseStr += result.items[i].rentalHouses[j].users[k].name + `,`;
							}
						}
						houseStr += `)`;
					}
					houseStr += `</label></li>`;
				}
				houseStr += `</ul></td></tr>`;
			}
			$("#houseInfo").append(houseStr);

			$("#houseInfo :checkbox").each(function() {
				var checkbox = $(this);
				var houseId = checkbox.attr("houseId");
				$.ajax({
					url : path + "/authority/houseChoose.html",
					data : {
						userId : id,
						houseId : houseId
					},
					dataType : 'html',
					timeout : 1000,
					error : function() {},
					success : function(result) {
						if (result == "success") {
							checkbox.attr("checked", true);
						} else {
							checkbox.attr("checked", false);
						}
					}
				});
			});
		}
	});
	$("#distributeHouse").css("right", "0px");
}

/**
 * 分配所有房源
 */

$("#allotAll").change(function() {
	var allot = "";
	var id = $("#distributeHouse .userinfo .name").attr("userId");
	if ($(this).get(0).checked) {
		//分配所有房源
		alert("分配所有房源")
		allot = "allotAll";
		$("#houseInfo :checkbox").each(function() {
			$(this).prop("checked", true);
		})
	} else {
		alert("取消所有房源的分配")
		allot = "disAllot";
		$("#houseInfo :checkbox").each(function() {
			$(this).prop("checked", false);
		})
	}
	$.ajax({
		url : path + "/authority/allotHouse.html",
		data : {
			allot : allot,
			userId : id
		},
		dataType : "html",
		success : function(result) {}
	});
})

$("#houseInfo :checkbox").change(function() {})

//关闭房源管理
$("#close-distributeHouse").click(function() {
	$("#search").val("");
	var userId = $("#distributeHouse .userinfo .name").attr("userId");
	$.ajax({
		url : path + "/authority/getHouseCount.html",
		data : {
			userId : userId
		},
		dataType : "html",
		success : function(result) {
			//alert(result);
			var tr = $("#acount-list [userId='" + userId + "']");
			tr.find(".houseCount").html(result);
		}
	})
	$("#allotAll").prop("checked", false);
	$("#distributeHouse").css("right", "-800px");
});


//权限分配
$("#acount-list .account-role").click(function() {
	var u = $(this);
	$("#modal1 .allot").attr("userid", u.attr("userid"));
	//alert($("#modal1 .allot").attr("userid"))
	$("#power-role").empty();
	$.ajax({
		url : contextPath + '/authority/getRoleList.html',
		type : 'POST',
		dataType : 'json',
		error : function() {
			alert("删除角色失败!");
		},
		success : function(result) {
			var str = '';
			if (result == "nodata") {
				magicAlert("获取角色列表失败", "failed");
			} else {
				for (var i = 0; i < result.length; i++) {
					str += `<option value="` + result[i].id + `">` + result[i].roleName + `</option>`;
				}
			}
			$("#power-role").append(str);
		}
	})
	$("#modal1").modal('show');
});

//保存权限分配
$("#modal1 .allot").click(function() {
	var userId = $(this).attr("userid")
	//alert(userId);
	var roleId = $("#power-role").val();
	$.ajax({
		url : path + '/authority/allotRole.html',
		tyep : 'POST',
		data : {
			userId : userId,
			roleId : roleId
		},
		dataType : 'json',
		success : function(result) {
			if (result == "failed") {
				magicAlert("授予角色失败!", "failed");
			} else {
				var td = $("#acount-list [userid='" + userId + "']");
				td.find(".roleName").html(result.roleName);
			}
		}
	});
	$("#modal1").modal("hide");
})




function delRole(obj, roleId, roleName) {
	$.ajax({
		url : contextPath + '/authority/delRole.html',
		type : 'POST',
		data : {
			roleId : roleId
		},
		dataType : 'html',
		error : function() {
			alert("删除角色失败!");
		},
		success : function(result) {
			var keywords = '';
			if (result == 'success') {
				$(obj).parents("tr").remove();
				keywords = '删除' + roleName + '角色成功!';
			} else if (result == 'hasUser') {

				keywords = '' + roleName + '角色下有用户不能删除!';
			} else if (result == 'failed') {
				keywords = '删除' + roleName + '角色失败!';
			}
			magicAlert(keywords, result);
		}
	});
}

//删除角色
$(".delRole").click(function() {
	var roleId = $(this).attr("roleId");
	var roleName = $(this).attr("roleName");
	var delRole = $(this);
	$.ajax({
		url : contextPath + '/authority/delRole.html',
		type : 'POST',
		data : {
			roleId : roleId
		},
		dataType : 'html',
		error : function() {
			alert("删除角色失败!");
		},
		success : function(result) {
			var keywords = '';
			if (result == 'success') {
				delRole.parents("tr").remove();
				keywords = '删除' + roleName + '角色成功!';
			} else if (result == 'hasUser') {

				keywords = '' + roleName + '角色下有用户不能删除!';
			} else if (result == 'failed') {
				keywords = '删除' + roleName + '角色失败!';
			}
			magicAlert(keywords, result);
		}
	});
})


//加载角色下拉列表
/*$("#role-type").click(function(){
	$("#selectRole").empty();
	$.ajax({
		url:path+"/authority/getRoleList.html",
		dataType:"json",
		success:function(result){
				var str = '';
				if (result == "nodata") {
					magicAlert("获取角色列表失败", "failed");
				} else {
					str+=`<option value="">账号角色</option>`;
					for (var i = 0; i < result.length; i++) {
						str += `<option value="` + result[i].id + `">` + result[i].roleName + `</option>`;
					}
				}
				$("#selectRole").append(str);
		}
	})
})*/
//查询
$("#searchUser").click(function() {})