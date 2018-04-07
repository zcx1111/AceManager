<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>

<%@ include file="../common/head.jsp" %>
<style>
    .modal {
        overflow: auto;
    }
</style>
<!-- content start -->
<div id="content" class="col-lg-10 col-sm-10">

    <div class="row">
        <div class="box col-md-2">
            <div class="box-inner">
                <div class="row">
                    <div class="box col-md-10">
                        <h4><span title=".icon  .icon-color  .icon-home "
                                  class="icon icon-color icon-home">&nbsp;&nbsp;&nbsp;小区列表&nbsp;&nbsp;</span>
                            <span class="small ">
                                    <i data-toggle="modal" data-target="#addHouseModal"
                                       class=" glyphicon glyphicon-plus-sign green"></i>&nbsp;
                                    </span>
                        </h4>
                    </div>
                </div>
                <div id="house_cites">
                    <div class="row">
                        <div class="dropdown box col-md-8 input-group input-group-sm"
                             style="text-align: center;margin: auto">
                            <select class="form-control prov" name="1" id="prov"></select>
                            <span class="input-group-addon">省</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="dropdown box col-md-8 input-group input-group-sm"
                             style="text-align: center;margin: auto">
                            <select class="form-control city" name="1" id="city"></select>
                            <span class="input-group-addon">市</span>
                        </div>
                    </div>             
                </div>
                <div class="box-content ">
                    <ul id="communityListUl" class="nav nav-tabs nav-stacked main-menu" style="text-align: center">
                        <li class="nav-header hidden-tablet">
                            <a id="allCommunityListA" class="ajax-link" href="javascript:void(0);"><h5>全部小区</h5></a>
                        </li>
                  		<!-- 小区列表加载 -->
                    </ul>
                </div>
            </div>
        </div>

        <div class="box col-md-9" style="height: 100%">
            <div class="box-content ">
                <div>
                    <ul class="nav nav-tabs" id="roomStatusSearch">
                        <li class="active"><a href="javascript:void(0);" style="background-color: #2fa4e7;">全部<sup class="badge" name="totalCount"></sup></a></li>
                        <li><a href="javascript:void(0);">已租<sup class="badge" name="rentedCount"></sup></a></li>
                        <li><a href="javascript:void(0);">停用<sup class="badge" name="stopUseCount"></sup></a></li>
                        <li><a href="javascript:void(0);">空置<sup class="badge" name="emptyCount"></sup></a></li>
                        <%--
                        	//TODO 初期对数据库表的设计缺乏经验，这2个动态条件查起来有点困难。
                        	<li><a href="javascript:void(0);">收租<sup class="badge">??</sup></a></li>
                        	<li><a href="javascript:void(0);">到期<sup class="badge">??</sup></a></li>
                        --%>
                        	<div class="input-group" style="width: 280px;margin-left: 525px">
                            <input type="text" class="form-control" placeholder="全文检索，敬请期待...">
                            <span class="input-group-btn">
                            	<button class="btn btn-default" type="button"><i class="glyphicon glyphicon-search"></i></button>
                            </span>
                        </div>
                    </ul>
                </div>
                <span id="houseListSpan"> &nbsp;</span>
				
				<!-- 房源列表加载 -->
    
            </div>
        </div>
        <!--/span-->
    </div>
</div>
<!-- /#content end-->

<!-- 房源详情 -->
<%@ include file="rental-modal/house_modal.jsp" %>

<!-- 房间详情模态框-->
<%@ include file="rental-modal/room_show_modal.jsp" %>

<!-- 添加房源模态框 -->
<%@ include file="rental-modal/add_house_modal.jsp" %>

<!-- 停用房源模态框 -->
<%@ include file="rental-modal/disable_house_modal.jsp" %>

<!-- 删除房源模态框 -->
<%@ include file="rental-modal/del_house_modal.jsp" %>

<!-- 添加房间模态框 -->
<%@ include file="rental-modal/add_room_confirm_modal.jsp" %>

<!-- 房源签约模态框 -->
<%@include file="rental-modal/signed_house_modal.jsp" %>

<!-- 续租房源模态框 -->
<%@ include file="rental-modal/relet_house_modal.jsp" %>

<!-- 房源退租确认模态框-->
<%@ include file="rental-modal/abandon_house_confirm_modal.jsp" %>

<!-- 房源退租模态框 -->
<%@ include file="rental-modal/abandon_house_modal.jsp" %>

<!-- 房源合同编辑模态框 -->
<%@ include file="rental-modal/edit_house_contract_modal.jsp" %>

<!-- 账单查看模态框 -->
<%@ include file="rental-modal/show_bill_modal.jsp" %>

<!-- 添加账单模态框 -->
<%@ include file="rental-modal/add_bill_modal.jsp" %>

<!-- 抄表模态框 -->
<%@ include file="rental-modal/meter_read.jsp" %>

<!-- 账单编辑/添加模态框 -->
<%@ include file="rental-modal/edit_bill_modal.jsp" %>

<!-- 账单删除模态框 -->
<%@ include file="rental-modal/del_bill_modal.jsp" %>

<!-- 账单确认交租 -->
<%@ include file="rental-modal/pay_for_bill_modal.jsp" %>

<!-- 房间续租模态框 -->
<%@ include file="rental-modal/relet_room_modal.jsp" %>

<!-- 房间退租模态框 -->
<%@ include file="rental-modal/abandon_room_modal.jsp" %>

<!-- 编辑房间合同模态框 -->
<%@ include file="rental-modal/edit_room_contract_modal.jsp" %>

<!-- 删除房间模态框 -->
<%@ include file="rental-modal/del_room_modal.jsp" %>

<!-- 房间催租模态框-->
<%@ include file="rental-modal/bill_massage_modal.jsp" %>

<!-- 房间签约模态框 -->
<%@ include file="rental-modal/signed_room_modal.jsp" %>

<!-- 房间退租确认模态框-->
<%@ include file="rental-modal/abandon_room_confirm_modal.jsp" %>

<!-- 模态框（Modal）end -->


<hr>

<script src="${pageContext.request.contextPath}/statics/localjs/DateFormat.js"></script>
<script src="${pageContext.request.contextPath}/statics/localjs/rentalBasic.js"></script>
<script src="${pageContext.request.contextPath}/statics/localjs/rentalBill.js"></script>
<script src="${pageContext.request.contextPath}/statics/localjs/rentalContract.js"></script>
<script type='text/javascript' src='${pageContext.request.contextPath}/statics/localjs/rentalCommon.js'></script>
<script type='text/javascript' src='${pageContext.request.contextPath}/statics/localjs/jquery.cityselect.js'></script>
<%@include file="../common/foot.jsp" %>
<script src="${pageContext.request.contextPath}/statics/localjs/rentalBasic_jsValidate.js"></script>
