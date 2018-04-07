<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Ace&nbsp;Manager</title>
<!--<meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Charisma, a fully featured, responsive, HTML5, Bootstrap admin template.">-->
<meta name="author" content="Muhammad Usman">

<!-- The styles -->
<style type="text/css">
.ch-container {
    margin-top: 80px;
}

#menu {
    text-align: center;
    font-size: 15px;
}

#menu li span{
	line-height: 20px;
}
</style>

<script>
    var contextPath = '${pageContext.request.contextPath}';
    /**
     * CRUD操作反馈结果提示框
     *  input: 1、keywords:提示框中显示的信息内容
     *       2、success_failed:框样式("success"代表成功样式 | "failed"代表失败样式)
     *  output: 网页正中显示提示框2秒后自动消失
     */
    function magicAlert(keywords, success_failed) {
        $("#toastr #info").text(keywords);//写入操作结果信息
        $("#toastr").css("display", "block");//显示弹窗
        var $p = $("#toastr").find("p");
        var $i = $("#toastr").find("i");
        if (success_failed == "success") {//成功样式
            $p.attr("class", "alert alert-success");
            $i.attr("class", "glyphicon glyphicon-ok");
        } else if (success_failed == "failed") {//失败样式
            $p.attr("class", "alert alert-danger");
            $i.attr("class", "glyphicon glyphicon-remove");
        }
        setTimeout(function () {
            $("#toastr").css("display", "none");
        }, 3500);//2秒后弹窗消失
    }    
</script>

<link
    href="${pageContext.request.contextPath }/statics/localcss/index.css">


<link
    href="${pageContext.request.contextPath}/statics/css/bootstrap-cerulean.min.css"
    rel="stylesheet">
<link
    href="${pageContext.request.contextPath }/statics/bower_components/bootstrap/dist/css/bootstrap.css"
    rel="stylesheet">
<link rel='stylesheet'
    href='${pageContext.request.contextPath}/statics/localcss/calendar.css'
    rel="stylesheet" />

<link
    href="${pageContext.request.contextPath}/statics/css/charisma-app.css"
    rel="stylesheet">
<link
    href='${pageContext.request.contextPath}/statics/bower_components/fullcalendar/dist/fullcalendar.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/bower_components/fullcalendar/dist/fullcalendar.print.css'
    rel='stylesheet' media='print'>
<link
    href='${pageContext.request.contextPath}/statics/bower_components/chosen/chosen.min.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/bower_components/colorbox/example3/colorbox.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/bower_components/responsive-tables/responsive-tables.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/bower_components/bootstrap-tour/build/css/bootstrap-tour.min.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/css/jquery.noty.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/css/noty_theme_default.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/css/elfinder.min.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/css/elfinder.theme.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/css/jquery.iphone.toggle.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/css/uploadify.css'
    rel='stylesheet'>
<link
    href='${pageContext.request.contextPath}/statics/css/animate.min.css'
    rel='stylesheet'>
<link
    href="${pageContext.request.contextPath}/statics/localcss/authority.css"
    rel='stylesheet'>
<link
    href="${pageContext.request.contextPath}/statics/localcss/common.css"
    rel='stylesheet'>

<!-- jQuery -->
<script
    src="${pageContext.request.contextPath}/statics/bower_components/jquery/jquery.min.js"></script>

<!-- liuqi validation -->
<link
    href="${pageContext.request.contextPath}/statics/localcss/validation.css"
    rel='stylesheet'>


<!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

<!-- The fav icon -->
<script type="text/javascript">
     var fuck =  '${sessionBaseModel.mList}';
     var path = '${pageContext.request.contextPath}';
    // var fuck fuck="311";
</script>
<link rel="shortcut icon" href="${pageContext.request.contextPath}/statics/img/house-icon.png">

</head>

<body style="background-color: #fff">
    <!--蒙版-->
    <div id="mask"></div>
    <!-- topbar starts -->
    <div class="navbar navbar-default navbar-fixed-top " role="navigation">

        <div class="navbar-inner">
            <button type="button" class="navbar-toggle pull-left animated flip">
                <span class="sr-only">Toggle navigation</span> <span
                    class="icon-bar"></span> <span class="icon-bar"></span> <span
                    class="icon-bar"></span>
            </button>
         
            <a class="navbar-brand" href="${pageContext.request.contextPath}/index.html">
                <img alt="Ace Logo" style="height: 30px;width: 30px" src="${pageContext.request.contextPath}/statics/img/house-icon.png" class="hidden-xs" /> <span
                style="color: white; width: 80px;font-size: 25px;font-family: 'Droid Sans'">&nbsp;Ace&nbsp;Manager</span></a>

            <!-- user dropdown starts -->
            <div class="btn-group pull-right" style="margin-right: 20px;">
                <button class="btn btn-default dropdown-toggle"
                    data-toggle="dropdown">
                    <i class="glyphicon glyphicon-user"></i><span
                        class="hidden-sm hidden-xs">${sessionUser.name }</span> <span
                        class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a
                        href="${pageContext.request.contextPath}/general/accountSetting.html"><i
                            class="glyphicon glyphicon-cog"></i>&nbsp;账户设置</a></li>
                    <li><a
                        href="${pageContext.request.contextPath}/general/message.html"><i
                            class="glyphicon glyphicon-volume-up"></i>&nbsp;消息提醒</a></li>
                    <li><a href="${pageContext.request.contextPath}/logout.html"><i
                            class="glyphicon glyphicon-off"></i>&nbsp;退出登录</a></li>
                </ul>
            </div>
            <!-- user dropdown ends -->




        </div>
    </div>


    <!-- 请勿删除toastr这个DIV -->


    <!-- 弹框2 css在common.css中 -->
    <div id="toastr">
        <p class="alert alert-danger">
            <i class="glyphicon glyphicon-ok"></i><span id="info">信息发送成功!</span>
        </p>
    </div>

    <!-- topbar ends -->

    <!-- 内容开始(左侧+内部) -->
    <div class="ch-container ">
        <div class="row">

            <!-- left menu starts 左侧导航栏开始-->
            <div class="col-sm-2 col-lg-2">
                <div class="sidebar-nav">
                    <div class="nav-canvas">
                        <div class="nav-sm nav nav-stacked"></div>
                        <ul class="nav nav-pills nav-stacked main-menu" id="menu">

                        </ul>
                    </div>
                </div>
            </div>
            <!--/span-->
            <!-- left menu ends左侧导航栏结束 -->