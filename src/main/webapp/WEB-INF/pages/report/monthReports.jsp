<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../common/head.jsp"%>
<!-- 营业报告_月报表	start -->
<style>
.result-data-head {
	font-size: 24px;
	color: orange;
	height: 85px;
	line-height: 85px;
	text-align: center;
	border-bottom: solid 4px #59acff;
	font-weight: bold;
}

table tbody tr td {
	font-size: 16px;
	text-align: center;
	vertical-align: middle;
}

.red-down-arrow {
	color: red;
	font-size: 13px;
}

.green-up-arrow {
	color: green;
	font-size: 13px;
}
</style>
<div class="box col-lg-10 col-sm-10 ">
<!-- 面包屑导航 -->
<%--<div>
	<ul class="breadcrumb">
		<li><a href="#">报表</a></li>
		<li><a href="#">营业报告</a></li>
		<li><a href="#">月报表</a></li>
	</ul>
</div>
--%><div class="row">
    <div class="box col-md-12">
        <div class="box-inner">
            <div class="box-content row">
                <div class="col-lg-12 col-md-12">
                	<div class="col-md-12 form-inline">
						<!-- 筛选年 -->
						<select id="year" class="form-control" style="width: 105px;">
							<c:forEach var="_y" begin="2017" end="2025">
								<option>${_y}年</option>
							</c:forEach>
						</select>&nbsp;&nbsp;
						<!-- 筛选月 -->
						<select id="month" class="form-control" style="width: 105px;">
							<c:forEach var="_m" begin="1" end="12">
								<option>${_m}月</option>
							</c:forEach>
						</select>
						<button type="button" class="btn btn-info" style="margin-left: 720px">导出报表</button>
					</div>
			<!-- 月报表标题 -->
			<h1 class="result-data-head">09月运营报告</h1>					
			<!-- 运营状况-房源状况   start -->
			<table class="table table-striped table-bordered table-hover">
			  <tbody>
				<tr>
					<td colspan="5" style="color:blue;font-weight: bold;">运营状况-房源状况</td>
				</tr>
				<tr>
					<td>总房间数</td>
					<td>新增房间数</td>
					<td>删除房间数</td>
					<td>在租房间数</td>
					<td>入住率</td>
				</tr>
				<tr style="height: 60px">
					<td>
						<p>288间</p><i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-124</span>
					</td>
					<td>
						<p>98间</p><i class="glyphicon glyphicon-arrow-up text-success"></i>
						<span class="green-up-arrow">10</span>
					</td>
					<td>
						<p>245间</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">236</span>
					</td>
					<td>
						<p>79间</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">9</span>
					</td>
					<td>
						<p>27.08%</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">10.33</span>
					</td>
				</tr>
				<tr>
					<td>空置房间数</td>
					<td>空置总天数</td>
					<td>平均空置天数</td>
					<td colspan="2">整月空置房间</td>
				</tr>
				<tr style="height: 60px">
					<td>
						<p>2210间</p> <i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-133</span>
					</td>
					<td>
						<p>4667天</p><i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-3822</span>
					</td>
					<td>
						<p>16天</p><i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-4</span>
					</td>
					<td colspan="2">
						<p><span>121间</span>
						<!-- 点击触发模态框：查看整月空置房间 -->
						<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#monthEmptyRomms"> 查看</button>						
						</p>
						<i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-133</span>
					</td>
				</tr>
				<tr>
					<td>新租房间</td>
					<td>续租房间</td>
					<td>平均出房价格</td>
					<td>平均出房时间</td>
					<td>&nbsp;</td>
				</tr>
				<tr style="height: 60px">
					<td>
						<p>16间</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">9</span>
					</td>
					<td>
						<p>1间</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">1</span>
					</td>
					<td>
						<p>2033.65元</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">163.54</span>
					</td>
					<td>
						<p>43天</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">10</span>
					</td>
					<td>&nbsp;</td>				
				</tr>
			  </tbody>
			</table>
			<!-- 运营状况-房源状况   end -->

			<!-- 运营状况-业务情况   start -->
			<table class="table table-striped table-bordered table-hover">
			  <tbody>
				<tr>
					<td colspan="4" style="color:blue;font-weight: bold;">运营状况-业务情况</td>
				</tr>
				<tr>
					<td>新增客户数</td>
					<td>跟进中</td>
					<td>签约数</td>
					<td>业务处理率</td>
				</tr>
				<tr style="height: 60px">
					<td>
						<p>9人</p><i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-5</span>
					</td>
					<td>
						<p>2人</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">2</span>
					</td>
					<td>
						<p>7人</p><i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-6</span>
					</td>
					<td>
						<p>77.78%</p><i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-22.22%</span>
					</td>
				</tr>
			  </tbody>
			</table>
			<!-- 运营状况-业务情况   end -->
			
			<!-- 运营状况-账单情况   start -->
			<table class="table table-striped table-bordered table-hover">
			 <tbody>
				<tr>
					<td colspan="5" style="color:blue;font-weight: bold;">运营状况-账单情况</td>
				</tr>
				<tr>
					<td>总账单数</td>
					<td>应收款账单数</td>
					<td>应付款账单数</td>
					<td>待收款账单数</td>
					<td>待付款账单数</td>
				</tr>
				<tr style="height: 60px">
					<td>
						<p>71个</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">9</span>
					</td>
					<td>
						<p>60个</p><i class="glyphicon glyphicon-arrow-up text-success"></i> 
						<span class="green-up-arrow">12</span>
					</td>
					<td>
						<p>11个</p><i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-3</span>
					</td>
					<td>
						<p>17个</p><i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-14</span>
					</td>
					<td>
						<p>0个</p><i class="glyphicon glyphicon-arrow-down text-danger"></i>
						<span class="red-down-arrow">-11</span>
					</td>
				</tr>
			  </tbody>
			</table>
			<!-- 运营状况-账单情况   end -->
			
			<!-- 财务情况（流水）  start -->
			<table class="table table-striped table-bordered">
			  <tbody>
				<tr>
					<td colspan="2" style="color:blue;font-weight: bold;">财务情况（流水）</td>
				</tr>
				<tr>
					<td>
						<!-- 本月现金收支 -->
						<table class="table table-striped table-bordered">
							<tr>
								<td style="color:blue;font-weight: bold;font-size: 13px">本月现金收支</td>
							</tr>
							<tr style="height: 60px">
								<td>
									<p>应收已收：4940元</p>
									<p>应收未收：800元</p>
									<p>回款率：86.06%</p>
									<p>&nbsp;</p>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<!-- 现金收入 -->
						<table class="table table-striped table-bordered">
							<tr>
								<td style="color:blue;font-weight: bold;font-size: 13px">现金收入</td>
							</tr>
							<tr style="height: 60px">
								<td>
									<p>现金总收入：65269元</p>
									<p>其中：租金收入：18190元</p>
									<p>押金收入：46500元</p>
									<p>杂费收入：579元</p>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<!-- 现金支出 -->
						<table class="table table-striped table-bordered">
							<tr>
								<td style="color:blue;font-weight: bold;font-size: 13px">现金支出</td>
							</tr>
							<tr style="height: 60px">
								<td>
									<p>现金总支出：0元</p>
									<p>其中：租金支出：0元</p>
									<p>押金支出：0元</p>
									<p>杂费支出：0元</p>
								</td>
							</tr>
						</table>					
					</td>
					<td>
						<!-- 明日租金预期 -->
						<table class="table table-striped table-bordered">
							<tr>
								<td style="color:blue;font-weight: bold;font-size: 13px">下月租金预期</td>
							</tr>
							<tr style="height: 60px">
								<td>
									<p>预计租金收支差：2400元</p>
									<p>加：预计租金收入：2400元</p>
									<p>减：预计租金支出：0元</p>
									<p>&nbsp;</p>
								</td>
							</tr>
						</table>					
					</td>
				</tr>
			  </tbody>
			</table>
			<!-- 财务情况（流水）  end -->					
				</div>
            </div>
        </div>
    </div>
</div>

<!-- 查看整月空置房间	    模态框    start -->
<div class="modal fade" id="monthEmptyRomms" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">整月空置房间</h4>
      </div>
      <div class="modal-body">
			<p>碧景园9栋4单元12楼1201号	房间001</p>
			<p>碧景园9栋4单元12楼1201号	房间004</p>
			<p>碧景园9栋4单元12楼1201号	房间005</p>
			<p>碧景园9栋4单元12楼1201号	房间006</p>
			<p>村上春树1栋1单元1楼1号	房间003</p>
			<p>南塘浜路123弄1栋1单元1楼1号	房间001</p>
			<p>南塘浜路123弄1栋1单元1楼1号	房间002</p>
			<p>南塘浜路123弄1栋1单元1楼1号	房间003</p>
			<p>仁苑小区8栋1单元23楼4号	房间001</p>
			<p>我的人1栋1单元1楼1号	房间001</p>
			<p>信笺小区2栋2单元2楼2号	房间001</p>
			<p>信息工程学院家属院7栋西单元18楼721号	房间001</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>
</div>
<!-- 查看整月空置房间	    模态框    end -->

<!-- 营业报告_月报表	end -->
<%@include file="../common/foot.jsp"%>