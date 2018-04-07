//增加房源表单验证
$("#addHouseForm").validate({
	submitHandler : function(form) {
		addHouse_ajax();
	},
	rules : {
		"community.communityName" : "required",
		"community.communityAddress" : "required",
		"building" : {
			required : true,
			digits : true
		},
		"unit" : {
			required : true,
			digits : true
		},
		"floor" : {
			required : true,
			digits : true
		},
		"no" : {
			required : true,
			digits : true
		},
		"roomCount" : {
			required : true,
			digits : true
		},
		"rentalType" : "required",
		"decorationStartTime" : "required",
		"decorationEndTime" : "required"
	},
	messages : {
		"community.communityName" : "请输入小区名称",
		"community.communityAddress" : "请输入小区地址",
		"building" : {
			required : "请输入栋/号",
			digits : "请输入正整数"
		},
		"unit" : {
			required : "请输入单元",
			digits : "请输入正整数"
		},
		"floor" : {
			required : "请输入楼层",
			digits : "请输入正整数"
		},
		"no" : {
			required : "请输入号",
			digits : "请输入正整数"
		},
		"roomCount" : {
			required : "请输入房间间数",
			digits : "请输入正整数"
		},
		"rentalType" : "请选择出租方式",
		"decorationStartTime" : "请选择装修开始时间",
		"decorationEndTime" : "请输入装修结束时间"
	}
});