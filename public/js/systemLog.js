layui.config({
	base: "js/"
}).use(['form', 'layer', 'jquery', 'laypage', 'laydate'], function () {
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	//加载页面数据
	//查询
	$(".search_btn").click(search);
	search();
	function search() {
		var userName = $(".userName").val(),
			startTime = $(".startTime").val(),
			endTime = $(".endTime").val(),
			content = $(".content").val();
		var index = layer.msg('查询中，请稍候', { icon: 16, time: false, shade: 0.8 });
		$.ajax({
			url: "/admin/system-log/list",
			type: "get",
			data: {
				userName: userName,
				startTime: startTime,
				endTime: endTime,
				content: content,
			},
			dataType: "json",
			success: function (data) {
				layer.close(index);
				newsList(data);
			},
			error: function () {
				layer.close(index);
			}
		})
	}

	function newsList(data) {
		//渲染数据
		function renderDate(data, curr) {
			var dataHtml = '';
			if (!data) {
				currData = newsData.concat().splice(curr * nums - nums, nums);
			} else {
				currData = data.concat().splice(curr * nums - nums, nums);
			}
			if (currData.length != 0) {
				for (var i = 0; i < currData.length; i++) {
					dataHtml += '<tr>'
						+ '<td>' + currData[i].id + '</td>'
						+ '<td align="left">' + currData[i].content + '</td>'
						+ '<td>' + currData[i].userName + '</td>'
						+ '<td>' + currData[i].ip + '</td>'
						+ '<td>' + currData[i].createdAt + '</td>'
						+ '</tr>';
				}
			} else {
				dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
			}
			return dataHtml;
		}

		//分页
		var nums = 10; //每页出现的数据量
		laypage({
			cont: "page",
			pages: Math.ceil(data.length / nums),
			jump: function (obj) {
				$(".news_content").html(renderDate(data, obj.curr));
				$('.news_list thead input[type="checkbox"]').prop("checked", false);
				form.render();
			}
		})
	}
})
