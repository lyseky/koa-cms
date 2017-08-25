layui.config({
	base: "js/"
}).use(['form', 'layer'], function () {
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;
	//video背景
	$(window).resize(function () {
		if ($(".video-player").width() > $(window).width()) {
			$(".video-player").css({ "height": $(window).height(), "width": "auto", "left": -($(".video-player").width() - $(window).width()) / 2 });
		} else {
			$(".video-player").css({ "width": $(window).width(), "height": "auto", "left": -($(".video-player").width() - $(window).width()) / 2 });
		}
	}).resize();

	//登录按钮事件
	form.on("submit(login)", function (data) {
		$.ajax({
			type: "post",
			url: "/admin/login",
			data: data.field,
			success: function (response) {
				if (response.err) {
					layer.msg(response.err);
				} else {
					window.location = "/admin";
				}

			},
			error: function (err) {
				console.log(err);
				layer.msg("用户名或密码错误，请重试");
			}
		});
		return false;
	})
})
