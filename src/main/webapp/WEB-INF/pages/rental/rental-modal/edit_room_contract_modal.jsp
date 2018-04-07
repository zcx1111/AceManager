<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>

<div class="modal fade " id="editRoomContractModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel"
     aria-hidden="true">

    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3>租房合同编辑</h3>
            </div>
            <div class="modal-body">
                <form id="editRoomContractFrom" method="post">
                    <input hidden type="text" name="id">
                    <table style="width: 100%;text-align: center">
                        <tr>
                            <td colspan="10">
                                <h4 class="red">房间信息</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>房间信息</td>
                            <td class="text-info"><span class="house-info"></span></td>
                        </tr>
                        <tr>
                            <td>房间地址</td>
                            <td class="text-info"><span class="house-address"></span></td>
                        </tr>
                        <tr>
                            <td colspan="10">
                                <h4 class="red">承租人</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>租客姓名</td>
                            <td class="text-info"><input type="text" class="form-control" name="clienteleName" value="">
                            </td>
                        </tr>
                        <tr>
                            <td>手机号码</td>
                            <td class="text-info"><input class="form-control" type="text" name="phoneNumber" value="">
                            </td>
                        </tr>
                        <tr>
                            <td>证件类型</td>
                            <td class="text-info">
                                <select class="form-control" name="certificateType">
                                    <option value="身份证">身份证</option>
                                    <option value="护照">护照</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>证件号码</td>
                            <td class="text-info">
                                <input type="text" class="form-control" name="certificateNo" value="">
                            </td>
                        </tr>
                        <%--<tr>--%>
                            <%--<td colspan="10">--%>
                                <%--<h4 class="red">附件信息</h4>--%>
                            <%--</td>--%>
                        <%--</tr>--%>
                        <%--<tr>--%>
                            <%--<td>证件附件</td>--%>
                            <%--<td><input type="file"></td>--%>
                        <%--</tr>--%>
                        <%--<tr>--%>
                            <%--<td>合同附件</td>--%>
                            <%--<td><input type="file"></td>--%>

                        <%--</tr>--%>
                        <tr>
                            <td colspan="10">
                                <h4 class="red">合同备注</h4>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="10"><textarea class="form-control" name="remark"></textarea></td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-default" data-dismiss="modal">取消</a>
                <span class="deleteSpan">
                    <a href="#" class="btn btn-danger"
                       onclick="deleteRentContract($('#editRoomContractFrom').find('[name = id]').val())">删除</a>
                </span>
                <a href="javascript:void(0);" class="btn btn-primary"
                   onclick="updateContract('#editRoomContractFrom')">修改</a>
            </div>
        </div>
    </div>
</div>