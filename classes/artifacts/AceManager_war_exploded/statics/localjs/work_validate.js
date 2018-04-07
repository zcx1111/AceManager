//更新业务单进度验证
$("#statusOrderForm").validate({
	submitHandler : function(form) {
		stautsOrder_ajax();
	},	rules : {
	},messages : {	
	}
	})
//分配业务单表单验证
$("#distributionOrderForm").validate({
	submitHandler : function(form) {
		distributionOrder_ajax();
	},	rules : {
	},messages : {
	}
	})
//修改业务单表单验证
$("#editOrderFrom").validate({
	submitHandler : function(form) {
		updateOrder_ajax();
	},	rules : {
		"customerName" : {
			required : true,
			minlength:2
		},
		"customerPhone" : {
			required : true,
			minlength : 11,
			// isMobile自定义方法：校验手机号在数据库中是否存在
			isMobile:true
		},
		"customerGender" : "required",
		"bookArea" : {
			required : true,
			minlength:2
		},
		"houseTime" : "required",
		"engency" : "required",
		"houseType" : "required",
		"customerPeople" : {
			required : true,
			digits:true,
			min:1
		},
		"source" : "required",
		"maxMoney" : {
			required : true,
			digits:true,
			// count_money自定义方法：校验最大金额>=最小金额
			edit_money:true ,
			min:1
		},
		"minMoney" :  {
			required : true,
			digits:true,
			// count_money自定义方法：校验最大金额>=最小金额
			edit_money:true ,
			min:1
		},
		"insert_book_day" : "required",
		"insert_book_time" : "required",
		"houseMonth" : {
			required : true,
			digits:true,
			min:1
		},
		"remarks" : {
			required : true,
			minlength:2
		},
	},
	messages : {
		"customerName" : {
			required : "请输入客户姓名",
			minlength:"姓名太短"
		},
		"customerPhone" :  {
			 required : "请输入手机号",
	         minlength : "确认手机不能小于11个字符",
	         isMobile : "请正确填写您的手机号码"
		},
		"customerGender" : "请选择客户性别",
		"bookArea" : {
			required : "请输入地段需求",
			minlength:"需求不明确"
		},
		"houseTime" : "请选择入住时间",
		"engency" : "请选择紧急程度",
		"houseType" : "请选择房型",
		"source" : "请选择客户来源",
		"customerPeople" : {
			 required : "请输入租户人数",
			 digits:"请输入整数",
			 min:"租户人数最少为1"
		},
		"maxMoney" :  {
			 required : "请输入最大月租金",
			 digits:"请输入整数",
			 min:"月租金最少为1",
			 count_money : "最大月租金不小于最小金额"
		},
		"minMoney" :  {
			 required : "请输入最小月租金",
			 digits:"请输入整数",
			 min:"月租金最少为1",
			 count_money : "最大月租金不小于最小金额"
		},
		"insert_book_day" : "请选择预约日期",
		"insert_book_time" : "请选择预约时间",
		"houseMonth" :  {
			 required : "请输入租期（月）",
			 digits:"请输入整数",
			 min:"租期最少为1个月"
		},
		"remarks" :  {
			required : "请输入备注",
			minlength:"备注太短"
		},
	}
})
//增加业务单表单验证
$("#insertOrderFrom").validate({
	submitHandler : function(form) {
		insertOrder_ajax();
	},
	rules : {
		"customerName" : {
			required : true,
			minlength:2
		},
		"customerPhone" : {
			required : true,
			minlength : 11,
			// isMobile自定义方法：校验手机号在数据库中是否存在
			isMobile:true
		},
		"customerGender" : "required",
		"bookArea" : {
			required : true,
			minlength:2
		},
		"houseTime" : "required",
		"engency" : "required",
		"houseType" : "required",
		"customerPeople" : {
			required : true,
			digits:true,
			min:1
		},
		"source" : "required",
		"maxMoney" : {
			required : true,
			digits:true,
			// count_money自定义方法：校验最大金额>=最小金额
			count_money:true ,
			min:1
		},
		"minMoney" :  {
			required : true,
			digits:true,
			// count_money自定义方法：校验最大金额>=最小金额
			count_money:true ,
			min:1
		},
		"insert_book_day" : "required",
		"insert_book_time" : "required",
		"houseMonth" : {
			required : true,
			digits:true,
			min:1
		},
		"remarks" : {
			required : true,
			minlength:2
		},
	},
	messages : {
		"customerName" : {
			required : "请输入客户姓名",
			minlength:"姓名太短"
		},
		"customerPhone" :  {
			 required : "请输入手机号",
	         minlength : "确认手机不能小于11个字符",
	         isMobile : "请正确填写您的手机号码"
		},
		"customerGender" : "请选择客户性别",
		"bookArea" : {
			required : "请输入地段需求",
			minlength:"需求不明确"
		},
		"houseTime" : "请选择入住时间",
		"engency" : "请选择紧急程度",
		"houseType" : "请选择房型",
		"source" : "请选择客户来源",
		"customerPeople" : {
			 required : "请输入租户人数",
			 digits:"请输入整数",
			 min:"租户人数最少为1"
		},
		"maxMoney" :  {
			 required : "请输入最大月租金",
			 digits:"请输入整数",
			 min:"月租金最少为1",
			 count_money : "最大月租金不小于最小金额"
		},
		"minMoney" :  {
			 required : "请输入最小月租金",
			 digits:"请输入整数",
			 min:"月租金最少为1",
			 count_money : "最大月租金不小于最小金额"
		},
		"insert_book_day" : "请选择预约日期",
		"insert_book_time" : "请选择预约时间",
		"houseMonth" :  {
			 required : "请输入租期（月）",
			 digits:"请输入整数",
			 min:"租期最少为1个月"
		},
		"remarks" :  {
			required : "请输入备注",
			minlength:"备注太短"
		},
	}
});