var $form;
var form;
var $;
layui.config({
    base: "../../js/"
}).use(['form', 'layer', 'upload', 'laydate'], function () {
    form = layui.form();
    var layer = parent.layer === undefined ? layui.layer : parent.layer;
    $ = layui.jquery;
    $form = $('form');
    laydate = layui.laydate;


    //添加验证规则
    form.verify({
        oldPwd: function (value, item) {
            if (value != "123456") {
                return "密码错误，请重新输入！";
            }
        },
        newPwd: function (value, item) {
            if (value.length < 6) {
                return "密码长度不能小于6位";
            }
        },
        confirmPwd: function (value, item) {
            if (!new RegExp($("#oldPwd").val()).test(value)) {
                return "两次输入密码不一致，请重新输入！";
            }
        }
    })

    //提交个人资料
    form.on("submit(changeUser)", function (data) {
        var index = layer.msg('提交中，请稍候', { icon: 16, time: false, shade: 0.8 });
        // layer.close(index);
        // layer.msg("提交成功！");
        $.ajax({
            type: "put",
            url: "/admin/user/info",
            data: data.field,
            dataType: "json",
            success: function (response) {
                if (response.err) {
                    layer.close(index);
                    layer.msg(response.err);
                } else if (response.message) {
                    layer.close(index);
                    layer.msg(response.message);
                }
            },
            error: function (data) {
                layer.msg(data);
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })

    //修改密码
    form.on("submit(changePwd)", function (data) {
        var index = layer.msg('提交中，请稍候', { icon: 16, time: false, shade: 0.8 });
        setTimeout(function () {
            layer.close(index);
            layer.msg("密码修改成功！");
            $(".pwd").val('');
        }, 2000);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })

})