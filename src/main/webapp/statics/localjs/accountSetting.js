
$("#modUser").click(function(){
	var user = new Object();
	 user.name = $.trim($("#name").val());
	 user.brand=$.trim($("#brand").val());
	 user.province=$.trim($("#province").val());
	 user.city=$.trim($("#city").val());
	 user.company=$.trim($("#company").val());
	 user.suffix=$.trim($("#suffix").val());
	 $.ajax({
			url:path+"/general/modMainAccount.html",
			data:{user:JSON.stringify(user)},
			success:function(result){
				if(result="success"){
					magicAlert("修改用户信息成功,请重新登录","success");
					setTimeout(function () {
						window.location.href=path+"/logout.html";
			        }, 3500);
					
				}
			}
		})
})