<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/pages/common/head.jsp"%>
<!--/row-->
<!-- content ends -->

<div id="content" class="box col-lg-10 col-sm-10 ">
    <div class="box-inner" style="padding: 5px;">
        <form role="form" class="form-inline ">
            <div class="form-group">
                <input type="text" class="Wdate  form-control"
                    onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy.MM.dd'})" id="startTime"
                    placeholder="开始时间" style="width: 100px;" />- <input type="text"
                    class="Wdate form-control "
                    onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy.MM.dd'})" id="endTime"
                    placeholder="截止时间" style="width: 100px;" />
            </div>
            <div class="form-group">
                <label for="role-type" class="sr-only"></label> <select
                    id="role-type" name="role-type" class="form-control" >
                    <option value="">账号角色</option>
                    <option value="1">超级管理员</option>
                    <option value="2">管家</option>
                    <option value="3">财务</option>
                </select>
            </div>
            <div class="form-group">
                <label for="account-type" class="sr-only"></label> <select
                    id="account-type" name="account-type" class="form-control">
                    <option value="">账号类型</option>
                    <option value="">不限</option>
                    <option value="1">员工</option>
                    <option value="2">股东</option>
                    <option value="3">合伙人</option>
                </select>
            </div>
            <div class="form-group">
                <div class="input-group" style="width: 190px;">
                    <input type="text" class="form-control input-group-sm"
                        placeholder="搜索：姓名、手机号..."> <span class="input-group-btn">
                        <button class="btn btn-default" type="submit" id="searchUser">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                </div>
            </div>
            <div class="form-group">
                <button type="reset" class="btn btn-danger">重置</button>
            </div>
            <span>${sessionUser.brand}</span>@<span>${sessionUser.suffix}</span>
            <div class="form-group">
                <button type="button" id="addEmployee"
                    class="btn btn-primary pull-right">添加子账号</button>
            </div>
            <div class="form-group">
                <button type="button" id="roleManage"
                    class="btn btn-default pull-right">角色管理</button>
            </div>
        </form>
    </div>

    <!--账号列表-->
    <div class="row " style="margin-top: 30px;">
        <div class="box-inner" id="acount-list">
            <!--单个账号信息卡-->
            <c:choose>
                <c:when test="${userList}==null">还没有子账号</c:when>
                <c:otherwise>
                    <c:forEach var="user" items="${userList}">
                        <div class="box-inner ">
                            <%--  --%>
                                <div class="top">
                                <code class="acount-type">${user.userTypeName}</code>
                                <a href="#" title="点击查看详情"  userId="${user.id}">
                                    <p class="text-center empInfo" style="margin-top: 20px; ">
                                        <i class="glyphicon glyphicon-user"></i> <span>${user.name}</span>
                                        <br> <i class="glyphicon glyphicon-earphone"></i> <span>${user.mobile}</span>
                                    </p>
                                    </a>
                                </div>
                                <hr>
                                <div class="bottom">
                                    <table style="margin-left: 20px; margin-top: -20px;">
                                        <tr style="height: 20px;" userId="${user.id}">
                                            <td style="width: 100px;" class="text-center account-role" userid="${user.id}">
                                                <p class="roleName" style="color: #59acff;">${user.roleName==null?'未分配':user.roleName}</p>
                                                <p class="">角色</p>
                                            </td>
                                            
                                            <td style="width: 100px" class="text-center ">
                                            <a href="#" onclick="housemanage('${user.id}','${user.name}','',1)" class="house-source">
                                                <p class="houseCount" style="color: #59acff;">${user.houseCount }</p>
                                                <p class="">房源</p>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            <!-- </a> -->
                        </div>

                    </c:forEach>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
    <!--账号列表结束-->

</div>
<!--/#content.col-md-0-->
</div>
<!--/fluid-row-->


<hr>




<!--角色管理-->
<div class="drawer" id="roleManagement" style="right: -800px;">
    <div class="panel">
        <div class="panel-heading">
            <a href="#" id="close-roleManagement" class="pull-right"><i
                class="glyphicon glyphicon-remove"></i></a><br> <br> <span>员工角色管理</span><a
                href="#" class="pull-right" id="addRole">新增角色</a>
        </div>

        <table class="table table-wrapper table-striped table-hover"
            style="margin:5px;">
            <thead>
                <tr>
                    <th>角色名称</th>
                    <th>类型</th>
                    <th>添加时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="role" items="${roleList}">
                    <tr>
                        <td>${role.roleName}</td>
                        <td>${role.createBy==0?'系统预设':'自定义'}</td>
                        <td><fmt:formatDate value="${role.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                        <td class="center"><a data-target=${role.createBy==0?'#modal4':'#modal7'} href="#" roleId="${role.id}" class="btn btn-primary"
                            roleName="${role.roleName}" data-toggle="modal">${role.createBy==0?'查看':'查看/编辑'}</a> <b>|</b>
                            <c:if test="${role.createBy!=0}">
                            <a class="delRole btn btn-danger"  roleName="${role.roleName}" roleId="${role.id}">删除</a>
                            </c:if>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</div>


<!--子账号信息-->
<div class="drawer" id="employerDetail"
    style="right: -800px; font-size: 16px;">
    <div class="panel">
        <div class="panel-heading">
            <a href="#" id="close-employerDetail" class="pull-right"><i
                class="glyphicon glyphicon-remove"></i></a><br> <br> <span>子账号信息</span>
            <a class="" href="#" style="margin-left: 400px;" id="modifyEmployer">修改资料</a>&nbsp;&nbsp;
            <a class="" href="#" id="modifyPassword">修改密码</a>&nbsp;&nbsp; <a
                class="" href="#" id="delEmployer">删除子账号</a>

        </div>
        <div class="panel-body" style="margin-left: 30px;">
            <div class="form-group form-inline">
                <label for="name">账号昵称</label> <input name="name"
                    class="form-control" readonly value="小龙女" id="name">

            </div>
            <div class="form-group form-inline">
                <label for="account-role">账号角色</label> <span>销售</span>
            </div>
            <div class="form-group form-inline">
                <label for="account-type">账号类型</label> <span>员工</span>
            </div>
            <div class="form-group form-inline">
                <label for="house-num">房源数量</label> <span>7</span>
            </div>
            <div class="form-group form-inline">
                <label for="account">登录账号</label> <span>13819160101@shuidi</span>

            </div>
            <div class="form-group form-inline">
                <label for="remark">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>
                <input name="remark" class="form-control " id="remark" readonly>
            </div>
        </div>
        <div class="form-group  form-inline pull-right" id="btn-group" hidden>
            <button class="btn  ">&nbsp;取消&nbsp;</button>
            <button class="btn btn-primary" style="margin-left: 20px;">&nbsp;确定&nbsp;</button>
        </div>
    </div>


</div>


<!--房源管理-->
<div class="drawer " id="distributeHouse" style="right: -800px;">
    <div class="panel">
        <div class="panel-heading userinfo">
            <a href="#" id="close-distributeHouse" class="pull-right"><i
                class="glyphicon glyphicon-remove "></i></a><br> 分配房间给：<span class="name" ></span>
           <!--  <label for="all" style="margin-left: 400px;"> <input
                type="radio" id="" name="hideHouses" class="allHouses" onchange="choose(this)">全部
            </label> <label for="all"> <input type="radio" id="" class="hideAllot"
                name="hideHouses">隐藏已分配房间
            </label> <label for="all"> <input type="radio" id="hideAllotThis"
                name="hideHouses" class="hideAllotThis">隐藏此员工已分配房间
            </label>  -->
            <div class="form-group form-inline ">
                <label for="search"></label> <input type="text" id="search"
                    class="form-control" placeholder="请输入小区名称"> <a href="#"><i
                    class="glyphicon glyphicon-search" onclick="temp()"></i></a> <label for="page"
                    style="margin-left: 340px;">当前页面</label> <select 
                    name="curPageNo" id="curPageNo" class="form-control pull-right" class="page" onchange="fuck1()" >
                    
                </select>
            </div>
        </div>
        <hr>
        <div class="panel-body">
            <div id="addAll">
                <input class="" type="checkbox" id="allotAll">分配当前所有房源给<span class="name"></span>
            </div>
            <ul id="houseList " class="list-unstyled ">
                <li class="xsd-clearfix">
                    <table>
                        <tbody id="houseInfo">
                            <!-- js填充信息 -->
                            
                        </tbody>
                    </table>
        </div>
    </div>


</div>


<!--权限分配模态框开始-->
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <!--<a id="modal-602790" href="#modal1" role="button" class="btn" data-toggle="modal">触发遮罩窗体</a>-->

            <div class="modal fade" id="modal1" role="dialog"
                aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"
                                aria-hidden="true">×</button>
                            <h4 class="modal-title" id="myModalLabel">角色分配</h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group ">
                                <label for="power-role">角色名称</label> <select name="power-role"
                                    id="power-role" class="form-control" style="width: 50%">
                                    
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default"
                                data-dismiss="modal">关闭</button>
                            <button type="button"  class="btn btn-primary allot">保存</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>


<!--权限分配模态框结束-->


<!--新增角色模态框-->
<div class="modal fade" id="modal2" role="dialog"
    aria-labelledby="myModal2" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="height: 600px;overflow-y: scroll">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">x</button>
                <h4 class="modal-title" id="myModal2">添加角色</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="role-name">角色名称</label> <input type="text"
                        class="form-control role-name" style="width: 50%" name="role-name"
                        >
                </div>
                <ul class="list-unstyled add">
                    <!-- js动态加载数据 -->
                </ul>
            </div>
            <div class=" modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary addRole">保存</button>
            </div>
        </div>
    </div>
</div>
<!--新增角色模态框-->

<!--查看角色-->
<div class="modal fade" id="modal4" role="dialog"
    aria-labelledby="myModal4" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="height: 600px;overflow-y: scroll">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">x</button>
                <h4 class="modal-title" id="myModal4">查看角色</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="role-name">角色名称</label> <input type="text"
                        class="form-control role-name" style="width: 30%" name="role-name">
                </div>
                <ul class="list-unstyled addmod">
                
                <!-- js动态加载数据 -->
                
                </ul>
            </div>
            <div class=" modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">保存</button>
            </div>
        </div>
    </div>
</div>
<!--查看修改角色-->


<!--修改角色-->
<div class="modal fade" id="modal7" role="dialog"
    aria-labelledby="myModal7" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="height: 600px;overflow-y: scroll">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">x</button>
                <h4 class="modal-title" id="myModal4">编辑角色</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="role-name">角色名称</label> <input type="text"
                        class="form-control role-name" style="width: 30%" name="role-name">
                </div>
                <ul class="list-unstyled addmod">
                <!-- js动态加载数据 -->
                </ul>
            </div>
            <div class=" modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary modRole">保存</button>
            </div>
        </div>
    </div>
</div>


<!--添加员工-->
<div class="modal fade" id="modal3" role="dialog"
    aria-labelledby="myModal3" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModal3">添加员工</h4>
            </div>
            <div class="modal-body">


                <div class="form-group">
                    <label>注册手机号</label><span></span>
                    <div class="input-group" style="width: 60%">
                        <input type="text" class="form-control mobile" name="mobile"
                            placeholder="请输入手机号">
                        <div class="input-group-addon" id="suffix">@${sessionUser.suffix}</div>
                    </div>
                    <span><i class="glyphicon glyphicon-warning-sign"
                        style="color:red;"></i> (员工登录账号为注册手机号加公司后缀名，如“13988886666@h2ome”)</span>
                </div>
                <div class="form-group" style="width: 60%">
                    <label for="inputPassword3" class="">登录密码</label> <input
                        type="password" class="form-control password" name="password"
                        id="inputPassword3" placeholder="请输入登录密码">

                </div>
                <div class="form-group" style="width: 60%">
                    <label>账号类型<span style="color:red;">*</span></label><br> <select
                        name="user_type" class="form-control user_type">
                        <option value="1">员工</option>
                        <option value="2">股东</option>
                        <option value="3">合伙人</option>
                    </select>
                </div>
                <div class="form-group" style="width: 60%">
                    <label for="" class="">子账号昵称<span style="color:red;">*</span></label>
                    <input type="text" class="form-control name" naem="name"
                        placeholder="请输入员工名称">

                </div>
                <div class="form-group" style="width: 60%">
                    <label for="" class="">备注</label>
                    <textarea class="form-control remark" name="remark" rows="6"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="submit" class="btn btn-primary addEmp">保存</button>
            </div>
        </div>

    </div>

</div>
<!--添加员工-->

<!--修改员工密码-->
<div class="modal fade" id="modal5" role="dialog"
    aria-labelledby="myModal5" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModal5">重置员工密码</h4>
            </div>
            <div class="modal-body">
                <div class="form-group" style="width: 60%">
                    <label for="">设置新密码</label> <input type="password"
                        class="form-control" id="" placeholder="输入新密码">
                </div>
                <div class="form-group" style="width: 60%">
                    <label for="exampleInputPassword1">确认新密码</label> <input
                        type="password" class="form-control" id="exampleInputPassword1"
                        placeholder="再次输入新密码">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary">确定</button>
            </div>
        </div>

    </div>

</div>
<!--修改员工密码-->

<!--删除子账号-->
<div class="modal fade" id="modal6" role="dialog"
    aria-labelledby="myModal6" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">×</button>

            </div>
            <div class="modal-body text-center">是否确认删除该子账号?</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary">确认</button>
            </div>
        </div>
    </div>
</div>
<!--删除子账号-->
<!-- external javascript -->

<!--查看编辑权限角色-->

<!--查看编辑权限角色-->

<%@include file="/WEB-INF/pages/common/foot.jsp"%>
 <script type='text/javascript'
    src='${pageContext.request.contextPath}/statics/localjs/authority.js'></script> 
