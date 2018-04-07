<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../common/head.jsp"%>
<!-- 消息提醒   start -->
<style>
.lq-alertlist{
    margin-top: 8px;
}
</style>


<div id="content" class="box col-lg-10 col-sm-10" style="padding: 5px">
    <!-- content starts -->
<!-- 面包屑导航 -->
<div>
    <ul class="breadcrumb">
        <li><a href="index.jsp">概况</a></li>
        <li><a href="#">消息提醒</a></li>
    </ul>
</div>
<!-- 主体 -->
<div class="row">
    <div class="box col-md-12">
        <div class="box-inner">
            <div class="box-content row">
                <div class="col-lg-12 col-md-12">
                    <!-- 通知时间 -->
                    <div class="col-md-2">
                        <input type="text" class="form-control Wdate" id="startTime" placeholder="通知开始时间" name="startTime" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" /> 
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control Wdate" id="endTime" placeholder="通知截止时间" name="endTime" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="" /> 
                    </div>
                    <div class="col-md-2">
                        <select class="form-control">
                            <option>消息类型</option>
                            <option>全部</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-info">确认</button>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12" style="margin-top: 30px">
                    <div class="col-md-2">
                        全部通知
                    </div>
                    <div class="col-md-10 text-right">
                        <button class="btn btn-info btn-xs text-right" id="btn_toAllRead">全部标记为已读</button>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12" id="infolist">
                    <hr>
                    <!-- 全部通知列表 -->
                    <div class="col-lg-12 col-md-12 lq-alertlist">
                         <div class="col-md-1"><span class="glyphicon glyphicon-envelope red"></span></div>
                         <div class="col-md-2">2017-06-27</div>
                         <div class="col-md-7">夏夏&nbsp;雷锋山小区2栋3单元1楼1号 2017-06-27 至 2017-07-26账单已收,租金3200.0元/月</div>
                         <div class="col-md-2 text-right"><span class="label label-warning">标为已读</span></div>
                    </div>
                    <div class="col-lg-12 col-md-12 lq-alertlist">
                         <div class="col-md-1"><span class="glyphicon glyphicon-envelope red"></span></div>
                         <div class="col-md-2">2017-06-27</div>
                         <div class="col-md-7">刘备&nbsp;19号小区二十四栋6楼6号 2017-06-28 至 2017-07-27账单已收,租金2319.0元/月</div>
                         <div class="col-md-2 text-right"><span class="label label-warning">标为已读</span></div>
                    </div><br><br>
                    <div class="col-lg-12 col-md-12 lq-alertlist">
                         <div class="col-md-1"><span class="glyphicon glyphicon-envelope red"></span></div>
                         <div class="col-md-2">2017-06-27</div>
                         <div class="col-md-7">二郎神&nbsp; 19号小区二十四栋6楼6号 2017-06-01 至 2017-07-01账单已收,租金0.0元/月</div>
                         <div class="col-md-2 text-right"><span class="label label-warning">标为已读</span></div>
                    </div>
                    <div class="col-lg-12 col-md-12 lq-alertlist">
                         <div class="col-md-1"><span class="glyphicon glyphicon-envelope red"></span></div>
                         <div class="col-md-2">2017-06-27</div>
                         <div class="col-md-7">bruce&nbsp;世博家园二街坊21栋1楼444号 2016-03-01 至 2016-05-31账单已收,租金6000.0元/月</div>
                         <div class="col-md-2 text-right"><span class="label label-warning">标为已读</span></div>
                    </div>
                </div>
            <!-- 翻页条 -->
            <div class="col-lg-12 col-md-12 text-center">
                <hr>
                <ul class="pagination pagination-centered">
                    <li><a href="#">上一页</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li class="active"><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">下一页</a></li>
                </ul>
            </div>
                
            </div>
        </div>
    </div>
</div>


<!-- 消息提醒   end -->
</div>
<%@include file="../common/foot.jsp"%>
<script>
    //鼠标悬浮样式设置
    $(".label-warning").mouseover(function(){
        if($(this).html()=="标为已读"){
            $(this).css("cursor","pointer");
        }else{
            $(this).css("cursor","default");
        }
    });
    //将通知标记为已读
    $(".label-warning").click(function(){
        if($(this).html()=="标为已读"){
            $(this).attr("class","label label-default");
            $(this).html("已读");
            var parDiv=$(this).parent().parent();
            var envelopePic=$((parDiv.children().get(0))).children().get(0);
            $(envelopePic).attr("class","glyphicon glyphicon-envelope black");
        }
    });
    //一键标记全部已读
    $("#btn_toAllRead").click(function(){
        $("#infolist").find("span").click();
    });
    
</script>