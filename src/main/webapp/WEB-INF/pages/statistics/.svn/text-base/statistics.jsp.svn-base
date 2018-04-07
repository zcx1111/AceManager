<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/head.jsp"%>

    <!-- The styles -->
    <style type="text/css">
        .ch-container {
            margin-top: 80px;
        }

        #menu {
            text-align: center;
            font-size: 14px;
        }

        .test1 span {
            font-size: 30px;
            font-weight: 200;
            color: #74b9ff;
        }

        .test1 h3 {
            font-weight: 200;
            font-size: 14px;
            margin-bottom: 2px;
        }
        .test1 .col-md-4 {
            float: left;
            width: 33.333333%;
        }
    </style>

        <!--/span-->
        <!-- left menu ends左侧导航栏结束 -->
        <div id="content" class="box col-lg-10 col-sm-10 ">
            <div class="row clearfix">
                <div class="col-md-12 column ">
                    <ul class="nav nav-tabs chart" style="margin-left: 400px;">
                        <li class="active">
                            <a href="#tab1" data-toggle="tab" class="btn btn-primary">运营统计</a>
                        </li>
                        <li class="">
                            <a href="#tab2" data-toggle="tab" class="btn btn-primary">财务统计</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab1">
                            <div class="row clearfix">
                                <div class="col-md-8">
                                    <div class="panel ">
                                        <div class="panel-heading" >
                                                <span>运营情况</span>
                                                <span class="pull-right">
                                                    <a href="#" class="btn">今日</a>
                                                    <a href="#" class="btn">本月</a>
                                                </span>
                                        </div>
                                        <div class="panel-body" style="margin-top: 30px;">
                                            <div id="condition" style="height: 250px;">
                                                <div class="box-content panel test1" >
                                                    <div class="col-md-4 text-center">
                                                        <h3>新签合同</h3>
                                                        <span class="val-1">15</span>
                                                    </div>
                                                    <div class="col-md-4 text-center">
                                                        <h3>续租合同</h3>
                                                        <span class="val-2">1</span>
                                                    </div>
                                                    <div class="col-md-4 text-center">
                                                        <h3>退租合同</h3>
                                                        <span class="val-3">1</span>
                                                    </div>
                                                    <div class="col-md-4 text-center">
                                                        <h3>已收租金</h3>
                                                        <span class="val-4">76862</span>
                                                    </div>
                                                    <div class="col-md-4 text-center">
                                                        <h3>待收租金</h3>
                                                        <span class="val-5">202943</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="panel ">
                                        <div class="panel-heading">
                                            <p class="alert">过去7日入住趋势</p>
                                        </div>
                                        <div class="panel-body">
                                            <div id="stay" style="height: 250px;"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="row clearfix">
                                <div class="col-md-4">
                                    <div class="panel">
                                        <div class="panel-heading">上月退租情况</div>
                                        <div class="panel-body">
                                            <div id="evict" style="height: 300px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="panel">
                                        <div class="panel-heading">过去6月拿房删房情况</div>
                                        <div class="panel-body">
                                            <div id="house" style="height: 300px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="panel">
                                        <div class="panel-heading">业务转换率</div>
                                        <div class="panel-body">
                                            <div id="change" style="height: 300px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane " id="tab2">

                            <div class="row clearfix">
                                <div class="col-md-4">
                                    <div class="panel">
                                        <div class="panel-heading">昨日收款情况</div>
                                        <div class="panel-body">
                                            <div id="flow-in" style="height: 300px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="panel">
                                        <div class="panel-heading">未来7日现金应收/应付情况 (元)</div>
                                        <div class="panel-body">
                                            <div id="next_flow" style="height: 300px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="panel">
                                        <div class="panel-heading">过去7日现金收入/支出情况 (元)</div>
                                        <div class="panel-body">
                                            <div id="pre_flow" style="height: 300px;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="panel">
                                        <div class="panel-heading">上月收入类型情况</div>
                                        <div class="panel-body">
                                            <div id="type" style="height: 300px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>



<%@include file="../common/foot.jsp"%>

<!--/.fluid-container内容结束-->

<!--echart-->
<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts-all-3.js"></script>
<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js"></script>
<script type="text/javascript"
        src="http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js"></script>
<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"></script>
<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM"></script>
<script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js"></script>


<script type='text/javascript' src='${pageContext.request.contextPath}/statics/localjs/roma.js'></script>
<script type='text/javascript' src='${pageContext.request.contextPath}/statics/localjs/statistics.js'></script>
