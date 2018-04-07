<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<%@include file="common/head.jsp"%>


<div id="content" class="box col-lg-10 col-sm-10" style="padding: 5px">
    <!-- content starts -->

    <!-- 经营状况、经营数据 -->
    <div class="row clearfix">
        <div class="col-md-10 column " style="height:100px;">

            <div id="data-stats" class="row clearfix box-inner">
                <div id="stats" class="col-md-3 column ">
                    <h4 class="top">我的经营情况</h4>
                    <a href="${pageContext.request.contextPath}/statistics.html"><h3 class="tips ">查看详情</h3> </a>
                </div>
                <div id="data" class="col-md-9 column ">
                    <table>
                        <tr>
                            <td>
                                <p>${emptyRoomCount}</p> <span>空置房间</span>
                            </td>
                            <td>
                                <p>${onRentRoomCount}</p> <span>已租房间</span>
                            </td>
                            <td>
                                <p>${nonPayedMoney}</p> <span>应收未收(元)</span>
                            </td>
                            <td style="padding-left: 50px">
                                <p>${todayIncomeMoney}</p> <span>今日收入(元)</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-2 column box-inner" style="height: 90px;">
            <div class="row clearfix ">
                <div class=" col-xs-6 column" style="margin-top: -10px;">
                    <a href="${pageContext.request.contextPath}/report/dayReports.html" style=" color: green;" class="btn">
                        <h3 class="report-mark">
                            <strong><span id="dayReport"></span>日</strong>
                        </h3>
                        <p>
                            <strong>经营日报</strong>
                        </p>
                    </a>
                </div>
                <div class="col-xs-6 column " style="margin-top: -10px;">
                    <a href="${pageContext.request.contextPath}/report/monthReports.html" style=" color: green;" class="btn">
                        <h3 class="report-mark">
                            <strong><span id="monthReport"></span>月</strong>
                        </h3>
                        <p>
                            <b>经营月报</b>
                        </p>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- 经营状况、经营数据 -->

    <div class="row clearfix">
        <!-- 代办工作台 -->
        <div class="col-md-10 column">
            <div class="row clearfix" >
                <div class="col-md-3 column box-inner" >
                    <div class='text-center' id='calendar' style="padding-top: 20px;"></div>
                    <hr>
                    <ul class="dashboard-list">
                        <%--<li><a href="#"> 所有逾期未处理 <span class="green pull-right">92</span>--%>
                        <%--</a></li>--%>
                        <%--<li><a href="#"> 今日到期<span class="green pull-right">92</span>--%>
                        <%--</a></li>--%>
                        <%--<li><a href="#"> 未来5天内到期 <span class="green pull-right">92</span>--%>
                        <%--</a></li>--%>
                    </ul>
                </div>
                <div class="col-md-9 column">
                    <div  class="box-content box-inner">
                        <ul style="padding-left: 10px" class="nav nav-pills nav-tabs nav-justified" id="myIndexTab">
                            <li><a href="#nonPayedRoomBillsTab" name="nonPayedRoomBills">应收账单
                                <sup id="nonPayedRoomBillsSup" class="badge"></sup></a>
                            </li>
                            <li><a href="#nonPayedHouseBillsTab" name="nonPayedHouseBills">应付账单
                                <sup id="nonPayedHouseBillsSup" class="badge bg-danger"></sup></a>
                            </li>
                            <li><a href="#pendingRoomContractsTab" name="pendingRoomContracts">租客合同
                                <sup id="pendingRoomContractsSup" class="badge"></sup></a>
                            </li>
                            <li><a href="#pendingHouseContractsTab" name="pendingHouseContracts">业主合同
                                <sup id="pendingHouseContractsSup" class="badge"></sup></a>
                            </li>
                        </ul>

                        <div id="myTabContent" class="tab-content " style="height: 500px;overflow-y: scroll;">
                            <div class="tab-pane" id="nonPayedRoomBillsTab">
                                <table class="table table-wrapper table-striped table-hover">
                                    <thead>
                                        <th class="xsd-cols-xs-1">到期时间</th>
                                        <th class="xsd-cols-xs-2">房间</th>
                                        <th class="xsd-cols-xs-1">租客姓名</th>
                                        <th class="xsd-cols-xs-1">金额</th>
                                        <th class="xsd-cols-xs-1">操作</th>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane" id="nonPayedHouseBillsTab">
                                <table class="table table-wrapper table-striped table-hover">
                                    <thead>
                                        <th class="xsd-cols-xs-1">到期时间</th>
                                        <th class="xsd-cols-xs-2">房间</th>
                                        <th class="xsd-cols-xs-1">业主姓名</th>
                                        <th class="xsd-cols-xs-1">金额</th>
                                        <th class="xsd-cols-xs-1">操作</th>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane " id="pendingRoomContractsTab">
                                <table class="table table-wrapper table-striped table-hover">
                                    <thead>
                                        <th class="xsd-cols-xs-2">到期时间</th>
                                        <th class="xsd-cols-xs-2">房间</th>
                                        <th class="xsd-cols-xs-1">租客姓名</th>
                                        <th class="xsd-cols-xs-1">操作</th>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane " id="pendingHouseContractsTab">
                                <table class="table table-wrapper table-striped table-hover">
                                    <thead>
                                        <th class="xsd-cols-xs-2">到期时间</th>
                                        <th class="xsd-cols-xs-2">房间</th>
                                        <th class="xsd-cols-xs-1">业主姓名</th>
                                        <th class="xsd-cols-xs-1">操作</th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 代办工作台 -->
        <div class="col-md-2 column">
            <!-- 公告 -->
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">公告</h3>
                </div>
                <div class="panel-body">
                    <ul class="list box list-unstyled">
                        <li><a href="${pageContext.request.contextPath}/pages/general/notice.jsp">水滴管家 App 2.5.7版本发布</a></li>
                        <li><a href="${pageContext.request.contextPath}/pages/general/notice.jsp">水滴管家 App 2.5.7版本发布</a></li>
                        <li><a href="${pageContext.request.contextPath}/pages/general/notice.jsp">水滴管家 App 2.5.7版本发布</a></li>
                    </ul>
                </div>

            </div>
            <!-- 公告 -->

            <!-- 备忘录 -->
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        备忘录<a data-toggle="modal" href="#reminder-add"><i
                            class="pull-right glyphicon glyphicon-edit"></i></a>
                    </h3>
                </div>
                <div class="panel-body">
                    <span>1</span>个已完成 <span id="show-reminder"> <a
                        id="modal-remark" href="#reminder-history" role="button"
                        class="btn" data-toggle="modal">显示</a>
                    </span>
                    <ul class="list box list-unstyled">
                        
                        <li><a href="#reminder-history" data-toggle="modal">水滴管家
                                App 2.5.7版本发布</a></li>
                        <li><a href="#reminder-history" data-toggle="modal">水滴管家
                                App xxx</a></li>
                        <li><a href="#" id="testAlert">测试操作结果弹窗</a></li>
                        <li><a href="#" id="testShiro">shiro测试当前是否拥有添加角色的权限：===></a></li>
                    </ul>
                </div>
            </div>
            <!-- 备忘录 -->

        </div>
    </div>

</div>
</div>
<!--/row-->
<!-- content ends -->
</div>
<!--/#content.col-md-0-->
</div>
<!--/fluid-row-->


<!--模态框-->
<!--历史备忘录-->
<div class="modal fade" id="reminder-history" role="dialog"
    aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalLabel">历史备忘录</h4>
            </div>
            <div class="modal-body ">
                <div class="row">

                    <div class="col-md-3" style="overflow-y:scroll;height: 400px;">
                        <ul class="list list-unstyled">
                            <li><i class="glyphicon glyphicon-certificate"></i> <a
                                href="#"> 发发嘎嘎爱国<br>&nbsp;&nbsp;<span class="date">2017-07-12
                                </span></a></li>
                            <li><i class="glyphicon glyphicon-certificate"></i> <a
                                href="#"> 阿发发飞安分啊<br>&nbsp;&nbsp;<span class="date">2017-07-12
                                </span></a></li>

                        </ul>

                    </div>
                    <div class="col-md-9">
                        <div class="reminder-right">
                            <form class="">
                                <div class="form-group">
                                    <label for="date"><b>日期:</b></label> <input type="date"
                                        class="form-control input-sm" id="date" placeholder="">
                                </div>
                                <div class="checkbox">
                                    <label> <input type="checkbox"> 已处理
                                    </label>
                                </div>
                                <br> <label for="reminder-content"><b>备忘内容:</b></label>
                                <textarea class="form-control" id="reminder-content" rows="3"
                                    cols="5"></textarea>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary">确认</button>
            </div>
        </div>

    </div>

</div>
<!-- 历史备忘录 -->
<div class="modal fade" id="reminder-add" role="dialog"
    aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">×</button>
                <h4 class="modal-title" >写备忘录</h4>
            </div>
            <div class="modal-body ">
                <form class="">
                    <div class="form-group">
                        <label for="date"><b>日期:</b></label> <input type="date"
                            class="form-control input-sm"  placeholder="">
                    </div>

                    <br> <label for="reminder-content"><b>备忘内容:</b></label>
                    <textarea class="form-control"  rows="3"
                        cols="5"></textarea>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary">确认</button>
            </div>
        </div>

    </div>

</div>




<!-- 房源退租模态框 -->
<%@ include file="rental/rental-modal/abandon_house_confirm_modal.jsp" %>
<%@ include file="rental/rental-modal/abandon_house_modal.jsp" %>
<%@ include file="rental/rental-modal/abandon_room_confirm_modal.jsp" %>
<%@ include file="rental/rental-modal/abandon_room_modal.jsp" %>

<!-- 房间催租模态框-->
<%@ include file="rental/rental-modal/bill_massage_modal.jsp" %>

<!-- 房间续租模态框 -->
<%@ include file="rental/rental-modal/relet_room_modal.jsp" %>

<!-- 账单查看模态框 -->
<%@ include file="rental/rental-modal/show_bill_modal.jsp" %>

<!-- 账单确认交租 -->
<%@ include file="rental/rental-modal/pay_for_bill_modal.jsp" %>

<hr>
<%@include file="common/foot.jsp"%>
<script type='text/javascript' src='${pageContext.request.contextPath}/statics/localjs/rentalCommon.js'></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/localjs/rentalContract.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/localjs/rentalBill.js"></script>
<script type='text/javascript' src='${pageContext.request.contextPath}/statics/localjs/jquery.cityselect.js'></script>
<script type='text/javascript' src='${pageContext.request.contextPath}/statics/localjs/DateFormat.js'></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/localjs/index.js"></script>

