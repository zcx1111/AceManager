<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">
    <title>welcome-Ace Manager</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- The styles -->
    <link href="${pageContext.request.contextPath}/statics/css/bootstrap-cerulean.min.css" rel="stylesheet">

    <link href="${pageContext.request.contextPath}/statics/css/charisma-app.css" rel="stylesheet">
    <link href='${pageContext.request.contextPath}/statics/bower_components/fullcalendar/dist/fullcalendar.css'
          rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/bower_components/fullcalendar/dist/fullcalendar.print.css'
          rel='stylesheet' media='print'>
    <link href='${pageContext.request.contextPath}/statics/bower_components/chosen/chosen.min.css' rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/bower_components/colorbox/example3/colorbox.css'
          rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/bower_components/responsive-tables/responsive-tables.css'
          rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/bower_components/bootstrap-tour/build/css/bootstrap-tour.min.css'
          rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/css/jquery.noty.css' rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/css/noty_theme_default.css' rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/css/elfinder.min.css' rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/css/elfinder.theme.css' rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/css/jquery.iphone.toggle.css' rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/css/uploadify.css' rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/css/animate.min.css' rel='stylesheet'>
    <link href='${pageContext.request.contextPath}/statics/localcss/common.css' rel='stylesheet'>

    <style type="text/css">
        .test {
            background-color: rgba(255, 255, 255, 0.5);
        }

        .test2 {
            background-color: rgba(217, 237, 247, 0.26);
        }

        .bg {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-position: center 0;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
            -webkit-background-size: cover; /* 兼容Webkit内核浏览器如Chrome和Safari */
            -o-background-size: cover; /* 兼容Opera */
            zoom: 1;
        }

    </style>

    <!-- jQuery -->
    <script src="${pageContext.request.contextPath}/statics/bower_components/jquery/jquery.min.js"></script>

    <!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!-- [if lt IE 9] -->
    <!-- <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>-->
    <!-- [endif] -->

    <!-- The fav icon -->
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/statics/img/ace-logo-1.png">
    <style>
        body {
            background-position: center;
            background-repeat: no-repeat;
        }
    </style>
    <script>
        var contextPath = '${pageContext.request.contextPath}';
    </script>
</head>
<body class="bg">
<div class="ch-container">
    <img width="100px" height="90px" src="${pageContext.request.contextPath}/statics/img/ace-logo-1.png"
         style="position: absolute;left: 34%;top: 20px;">
    <div class="row" style="margin-left:0px; margin-right:0px;">
        <div class="row">
            <div class="col-md-12 center login-header">
                <h2 style="text-align: center;color: #71DDBA;margin-left: 70px;font-family:fantasy;">Welcome to Ace
                    Manager</h2>
            </div>
            <!--/span-->
        </div><!--/row-->

        <div class="row">
            <div class="well col-md-5 center login-box abbable text-center">
                <ul class="nav nav-tabs text-center">
                    <li style="margin-left:200px; " class="active">
                        <a href="#tab1" data-toggle="tab">&nbsp;&nbsp;登录&nbsp;&nbsp;</a>
                    </li>
                    <li class="">
                        <a href="#tab2" data-toggle="tab">&nbsp;&nbsp;注册&nbsp;&nbsp;</a>
                    </li>
                </ul>
                <div class="tab-content" style="margin-top: 10px;">
                    <div class="tab-pane active" id="tab1">
                        <div class="alert alert-info test2">
                            请输入用户名和密码
                        </div>
                        <form class="form-horizontal" action="" method="post">
                            <fieldset>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user red"></i></span>
                                    <input type="text" class="form-control test" name="username" id="username"
                                           value="13712345678@alibaba" placeholder="请输入手机号或者员工账号">
                                </div>
                                <div class="clearfix"></div>
                                <br>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock red"></i></span>
                                    <input type="password" class="form-control test" name="password" id="password"
                                           value="123456" placeholder="请输入密码">
                                </div>
                                <div class="clearfix"></div>
                                <div class="input-prepend">
                                    <label class="remember" for="remember"><input type="checkbox"
                                                                                  id="remember">记住密码</label>
                                    <label class="remember" for="term"><input type="checkbox" checked id="term">已阅读并同意<a
                                            href="">服务条款</a></label>
                                </div>
                                <div class="clearfix"></div>
                                <!-- 登陆异常信息提示 -->
                                <span id="formtip"></span>
                                <p class="center col-md-5">
                                    <button type="button" class="btn btn-primary" id="loginBtn">立即登录</button>
                                </p>
                            </fieldset>
                        </form>
                    </div>
                    <!-- 当按下回车后，触发登录的click事件 -->
                    <div class="tab-pane " id="tab2">

                        <form class="form-horizontal" id="registerForm" action="#" method="post">
                            <fieldset>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user red"></i></span>
                                    <input type="text" class="form-control test" name="phoneNumber" placeholder="请输入手机号">
                                </div>
                                <div class="clearfix"></div>
                                <br>
                                <%--<div class="input-group input-group-lg">--%>
                                <%--<span class="input-group-addon"><i class="glyphicon glyphicon-user red"></i></span>--%>
                                <%--<input type="text" class="form-control test col-lg-5"  placeholder="请输入验证码">--%>
                                <%--</div>--%>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user red"></i></span>
                                    <input class="form-control test"  type="text" name="code" placeholder="输入手机验证码">
                                    <span class="input-group-btn text">
                                        <button id="freeCode" type="button" style="margin-top:0px" class="btn btn-success">免费获取验证码</button>
                                    </span>
                                </div>
                                <div class="clearfix"></div>
                                <br>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock red"></i></span>
                                    <input type="password" name="password" class="form-control test" placeholder="请输入密码">
                                </div>
                                <div class="clearfix"></div>
                                <br>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user red"></i></span>
                                    <input type="text" class="form-control test" name="recommenderPhoneNumber" placeholder="请输入推荐人手机号(没有可不填)">
                                </div>
                                <div class="clearfix"></div>

                                <p class="center col-md-5">
                                    <button type="button" id="submitRegisterForm" class="btn btn-primary">注册并登录</button>
                                </p>
                                <div class="input-prepend">

                                    <label class="remember" for="readAndAgree"><input type="checkbox" checked id="readAndAgree">已阅读并同意<a    href="">服务条款</a></label>
                                </div>
                                <div class="clearfix"></div>
                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>
            <!--/span-->
        </div><!--/row-->
    </div><!--/fluid-row-->

</div><!--/.fluid-container-->
<div style="width:100%; position: absolute;bottom: 2px;">
    <div style="width:80%;margin:0 auto;text-align: center"><h5 class="text-primary imgInfo"></h5></div>
    <div style="width:10%;position:absolute;right:0px;bottom:2px">
        <a class="btn test2" onclick="wallpaperIndex--;getWallpapper()"><span class="glyphicon glyphicon-chevron-left"
                                                                              aria-hidden="true"></span></a>&nbsp;
        <a class="btn test2" onclick="wallpaperIndex++;getWallpapper()"><span class="glyphicon glyphicon-chevron-right"
                                                                              aria-hidden="true"></span></a>
    </div>
</div>
<!-- external javascript -->
<div id="toastr" style="position: absolute;left: 52.5%;top: 9%">
    <p class="alert alert-danger">
        <i class="glyphicon glyphicon-ok"></i><span id="info">信息发送成功!</span>
    </p>
</div>


<!-- select or dropdown enhancer -->
<script src="${pageContext.request.contextPath}/statics/bower_components/chosen/chosen.jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/statics/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

<!-- library for cookie management -->
<script src="${pageContext.request.contextPath}/statics/js/jquery.cookie.js"></script>
<!-- calender plugin -->
<script src='${pageContext.request.contextPath}/statics/bower_components/moment/min/moment.min.js'></script>
<script src='${pageContext.request.contextPath}/statics/bower_components/fullcalendar/dist/fullcalendar.min.js'></script>
<!-- data table plugin -->
<script src='${pageContext.request.contextPath}/statics/js/jquery.dataTables.min.js'></script>

<!-- plugin for gallery image view -->
<script src="${pageContext.request.contextPath}/statics/bower_components/colorbox/jquery.colorbox-min.js"></script>
<!-- notification plugin -->
<script src="${pageContext.request.contextPath}/statics/js/jquery.noty.js"></script>
<!-- library for making tables responsive -->
<script src="${pageContext.request.contextPath}/statics/bower_components/responsive-tables/responsive-tables.js"></script>
<!-- tour plugin -->
<script src="${pageContext.request.contextPath}/statics/bower_components/bootstrap-tour/build/js/bootstrap-tour.min.js"></script>
<!-- star rating plugin -->
<script src="${pageContext.request.contextPath}/statics/js/jquery.raty.min.js"></script>
<!-- for iOS style toggle switch -->
<script src="${pageContext.request.contextPath}/statics/js/jquery.iphone.toggle.js"></script>
<!-- autogrowing textarea plugin -->
<script src="${pageContext.request.contextPath}/statics/js/jquery.autogrow-textarea.js"></script>
<!-- multiple file upload plugin -->
<script src="${pageContext.request.contextPath}/statics/js/jquery.uploadify-3.1.min.js"></script>
<!-- history.js for cross-browser state change on ajax -->
<script src="${pageContext.request.contextPath}/statics/js/jquery.history.js"></script>
<!-- application script for Charisma demo -->
<%--<script src="${pageContext.request.contextPath}/statics/js/charisma.js"></script>--%>

<!-- import login.js -->
<script src="${pageContext.request.contextPath}/statics/localjs/login.js"></script>

</body>
</html>
