var $;
layui.config({
	base: "js/"
}).use(["form", "layer", "jquery"], function () {
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage;
	$ = layui.jquery;

	var addUserArray = [], addUser;
	form.on("submit(addUser)", function (data) {
		//弹出loading
		data.field.roles=[];
		$("input[name='roles']").each(function(){
			if($(this).is(":checked")){
				data.field.roles.push($(this).val());
			}
		});
		var index = top.layer.msg("数据提交中，请稍候", { icon: 16, time: false, shade: 0.8 });
		$.ajax({
			url: "/admin/user/add",
			type: "post",
			data: data.field,
			dataType: "json",
			success: function (data) {
				if(data.err){
					top.layer.close(index);
					layer.msg(data.err);
					return false;
				}else{
					if(data.status==200){
						top.layer.msg("用户添加成功！,密码为"+data.password);
						top.layer.close(index);
						setTimeout(function(){
							console.log(123);
							parent.location.reload();
						}.bind(parent),2000);
						layer.closeAll("iframe");
					}else{
						layer.msg(data.message);
					}
				}
				
			},
			error: function (err) {
				layer.msg(err);
			}
		})
		return false;
	})
})

//格式化时间
function formatTime(_time) {
	var year = _time.getFullYear();
	var month = _time.getMonth() + 1 < 10 ? "0" + (_time.getMonth() + 1) : _time.getMonth() + 1;
	var day = _time.getDate() < 10 ? "0" + _time.getDate() : _time.getDate();
	var hour = _time.getHours() < 10 ? "0" + _time.getHours() : _time.getHours();
	var minute = _time.getMinutes() < 10 ? "0" + _time.getMinutes() : _time.getMinutes();
	return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}
