// 手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

//添加业务单的金额数验证
jQuery.validator.addMethod("count_money", function(value, element) {
	var returnVal = false;  
	var max = parseInt($("#insert_maxMoney").val());
	var min = parseInt($("#insert_minMoney").val());
	if(max>=min){returnVal = true;}
    	return returnVal;   
}, "请输入正确的最大与最小月租金");	

//更新业务单的金额数验证
jQuery.validator.addMethod("edit_money", function(value, element) {
	var returnVal = false;  
	var max = parseInt($("#edit_maxMoney").val());
	var min = parseInt($("#edit_minMoney").val());
	if(max>=min){returnVal = true;}
    	return returnVal;   
}, "请输入正确的最大与最小月租金");