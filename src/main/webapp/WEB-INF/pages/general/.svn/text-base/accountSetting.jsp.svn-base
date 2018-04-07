<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../common/head.jsp"%>


<div id="content" class="box col-lg-10 col-sm-10" style="padding: 5px;">
    <!-- content starts -->
<!-- 账户设置   start -->
<!-- 面包屑导航 -->
<div>
    <ul class="breadcrumb">
        <li><a href="#">概况</a></li>
        <li><a href="#">账户设置</a></li>
    </ul>
</div>
<!-- 主体 -->
<div class="row">
    <div class="box col-md-12">
        <div class="box-inner">
            <div class="box-content row">
                <div class="col-lg-12 col-md-12">
                    <div class="col-md-2">账户设置</div>
                    <div class="col-md-10 text-right">
                        <button class="btn btn-info btn-xs text-right"  data-toggle="modal" data-target="#modifyPwd">修改密码</button>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12">
                    <hr>
                  <form class="form-horizontal" role="form" action="">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">昵称:</label>
                            <div class="col-sm-4">
                                <input class="form-control" id="name" type="text" value="${sessionUser.name}">
                            </div>
                        </div>
                        <p class="alert ">
                        <span class="col-sm-2"></span>
                        <span class="glyphicon glyphicon-user"></span>注册账号：<span>${sessionUser.username}</span>
                        </p>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" >公寓品牌：</label>
                            <div class="col-sm-4">
                                <input class="form-control" type="text" id="brand" value="${sessionUser.brand}">
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">经营方式：</label>
                            <div class="col-sm-4">
                                <input class="form-control" type="text" value="混合经营">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label class="col-sm-2 control-label">公司所在省市：</label>
                            <div class="col-sm-10" id="proAndCity">
                                <div class="col-sm-2" style="padding-left: 0px;">
                                    <select class="form-control prov" id="province"></select>
                                </div>
                                <div class="col-sm-2">
                                    <select class="form-control city" id="city" disabled="disabled"></select>                                 
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">公司名称：</label>
                            <div class="col-sm-4">
                                <input class="form-control" type="text" id="company" value="${sessionUser.company}" placeholder="您的公司名称是什么？">
                            </div>
                        </div>                      
                        <div class="form-group">
                            <label class="col-sm-2 control-label">公寓后缀名：</label>
                            <div class="col-sm-4">
                                <input class="form-control" type="text" value="${sessionUser.suffix}" id="suffix">
                                <span class="glyphicon glyphicon-warning-sign red"></span>
                                (公寓后缀名只能为纯英文字母，不可使用其他字符或者汉字，例如：shuidi，建议控制在10个字母以内)
                            </div>
                        </div>
                        <center><button type="button" class="btn btn-success" id="modUser">确认</button></center>                      
                    </form> 
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<!-- 修改密码模态框 -->
<div class="modal fade" id="modifyPwd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">修改密码</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    注册手机号：<span>${sessionUser.mobile}</span><br><br>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">验证手机：</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" value="" placeholder="输入手机验证码">
                        </div>
                        <div class="col-sm-3">
                            <button type="button" class="btn btn-info">获取验证码</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">设置新密码：</label>
                        <div class="col-sm-6">
                            <input class="form-control" type="text" value="" placeholder="输入新密码">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary " id="modPwd">确定</button>
            </div>
        </div>
    </div>
</div>

</div>
<!-- 账户设置   end -->
<%@include file="../common/foot.jsp"%>
<script type='text/javascript' src='${pageContext.request.contextPath}/statics/localjs/jquery.cityselect.js'></script>
<script>
    $(document).ready(function () {
//        选中父div 初始化
        $("#proAndCity").citySelect({
            prov: "北京",
            nodata: "none"
        });
    });
</script>
<script type='text/javascript' src='${pageContext.request.contextPath}/statics/localjs/accountSetting.js'></script>

