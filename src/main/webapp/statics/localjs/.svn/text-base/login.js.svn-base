/*用户登陆ajax异步验证	start*/
var wait = 60;
$("#loginBtn").click(function () {
    var user = new Object();
    user.username = $.trim($("#username").val());
    user.password = $.trim($("#password").val());

    if (user.username == "" || user.username == null) {
        $("#username").focus();
        $("#formtip").css("color", "red");
        // $("#formtip").html("对不起，登录账号不能为空。");
        magicAlert("对不起，登录账号不能为空。", "failed");
    } else if (user.password == "" || user.password == null) {
        $("#password").focus();
        $("#formtip").css("color", "red");
        // $("#formtip").html("对不起，登录密码不能为空。");
        magicAlert("对不起，登录密码不能为空。", "failed");

    } else {
        $("#formtip").html("");
        //ajax后台验证
        $.ajax({
            url: 'validateLogin.html',
            type: 'POST',
            data: {
                user: JSON.stringify(user)
            },
            dataType: 'html',
            error: function () {
                $("#formtip").css("color", "red");
                // $("#formtip").html("登录失败！请重试。");
                magicAlert("登录失败！请重试。", "failed");
            },
            success: function (result) {
                if (result != "" && "loginSuccess" == result) {
                    window.location.href = "index.html";
                } else if ("failed" == result) {
                    $("#formtip").css("color", "red");
                    // $("#formtip").html("登陆失败！请重试。");
                    magicAlert("登陆失败！请重试。", "failed");
                    $("#username").val('');
                    $("#password").val('');
                } else if ("noLoginUsername" == result) {
                    $("#formtip").css("color", "red");
                    // $("#formtip").html("登录账号不存在，请重试。");
                    magicAlert("登录账号不存在，请重试。", "failed");
                } else if ("noData" == result) {
                    $("#formtip").css("color", "red");
                    // $("#formtip").html("对不起，没有任何数据需要处理！请重试。");
                    magicAlert("对不起，没有任何数据需要处理！请重试。", "failed");
                } else if ("pwdError" == result) {
                    $("#formtip").css("color", "red");
                    // $("#formtip").html("登录密码错误，请重试。");
                    magicAlert("登录密码错误，请重试。", "failed");
                }
            }
        });
    }

});
/*用户登陆ajax异步验证	end*/


var wallpaperIndex = parseInt(Math.random() * 8);

function getWallpapper() {
    if (wallpaperIndex > 7) {
        wallpaperIndex = 0;
    }
    if (wallpaperIndex < 0) {
        wallpaperIndex = 7;
    }

    $.ajax({
        url: contextPath + "/getWallpaper.html",
        dataType: 'json',
        data: {"index": wallpaperIndex},
        success: function (data) {
            var imgUrl = "http://cn.bing.com" + data.images[0].url;
            $('body').css('background-image', 'url(' + imgUrl + ')');
            $('body').addClass("bg");
            $('body').find('.imgInfo').html(data.images[0].copyright);
        }
    });
}

function getFreeCode() {
    var $freeCode = $("#freeCode");
    if (wait == 0) {
        $freeCode.removeClass("btn-danger");
        $freeCode.addClass("btn-success");
        $freeCode.removeAttr("disabled");
        $freeCode.html("免费获取验证码");
        wait = 60;
    } else {
        $freeCode.removeClass("btn-success");
        $freeCode.addClass("btn-danger");
        $freeCode.attr("disabled", true);
        $freeCode.html("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
            getFreeCode();
        }, 1000);
    }
}

document.onkeydown = function (eventTag) {
    var event = eventTag || windows.event;
    if (event.keyCode == 13) {
        document.getElementById("loginBtn").click();
        return false;
    }
};

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

$(document).ready(function () {
    getWallpapper();

    $("#freeCode").click(function () {
        var $form = $("#registerForm");
        var $phone = $form.find("[name = phoneNumber]");
        if (!(/^1[34578]\d{9}$/.test($phone.val()))) {
            magicAlert("手机号有误，请重试！", "failed");
        } else {
            //TODO 发送验证码
            $.ajax({
                url: contextPath + "/sendCodeMsg.html",
                data: {"phoneNumber": $phone.val()},
                success: function (data) {
                    if (data == 'success') {
                        magicAlert("发送成功，请注意查收！(验证码有效期为10分钟)", "success");
                        getFreeCode();
                    } else {
                        magicAlert(data, "failed");
                    }
                },
                error: function () {
                    magicAlert("网络异常！", "failed");
                }


            });
        }
    });

    $("#submitRegisterForm").click(function () {
        var $form = $("#registerForm");
        var $phone = $form.find("[name = phoneNumber]");
        var $code = $form.find("[name = code]");
        var $password = $form.find("[name = password]");
        if (!(/^1[34578]\d{9}$/.test($phone.val()))) {
            magicAlert("手机号有误，请重试！", "failed");
            return;
        }
        if ($code.val() == null || $code.val() == '' || !(/^\d{6}$/).test($code.val())) {
            magicAlert("请正确输入验证码", "failed");
            return;
        }
        if ($password.val() == null || $password.val() == '') {
            magicAlert("请输入密码", "failed");
            return;
        }
        $.ajax({
            url: contextPath + "/register.html",
            data: $form.serialize(),
            success: function (data) {
                if (data == 'success') {
                    magicAlert("注册成功！(正在自动为您跳转)", "success");
                    $("#username").val($phone.val());
                    $("#password").val($password.val());
                    $("#loginBtn").click();//注册成功后自动登录
                } else {
                    magicAlert(data, "failed");
                }
            },
            error: function (data) {
                magicAlert("网络异常！", "failed");
            }
        });
    });

});
