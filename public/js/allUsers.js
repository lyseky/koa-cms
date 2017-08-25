layui.config({
	base: "js/"
}).use(['form', 'layer', 'jquery', 'laypage'], function () {
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	//加载页面数据
	var usersData = '';

	//查询
	search();
	$(".search_btn").click(search);
	function search() {
		var userName = $(".userName").val();
		var index = layer.msg('查询中，请稍候', { icon: 16, time: false, shade: 0.8 });
		$.ajax({
			url: "/admin/user/list",
			type: "get",
			data: { userName: userName},
			dataType: "json",
			success: function (data) {
				layer.close(index);
				usersList(data);
			},
			error: function (err) {
				layer.msg(err);
				usersList(data);
			}
		})
	}

	//添加会员
	$(".usersAdd_btn").click(function () {
		var index = layui.layer.open({
			title: "添加会员",
			type: 2,
			content: "/admin/user/add",
			success: function (layero, index) {
				setTimeout(function () {
					layui.layer.tips('点击此处返回会员列表', '.layui-layer-setwin .layui-layer-close', {
						tips: 3
					});
				}, 500)
			}
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function () {
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})

	//批量删除
	$(".batchDel").click(function () {
		var $checkbox = $('.users_list tbody input[type="checkbox"][name="checked"]');
		var $checked = $('.users_list tbody input[type="checkbox"][name="checked"]:checked');
		if ($checkbox.is(":checked")) {
			layer.confirm('确定删除选中的信息？', { icon: 3, title: '提示信息' }, function (index) {
				var index = layer.msg('删除中，请稍候', { icon: 16, time: false, shade: 0.8 });
				setTimeout(function () {
					//删除数据
					for (var j = 0; j < $checked.length; j++) {
						for (var i = 0; i < usersData.length; i++) {
							if (usersData[i].newsId == $checked.eq(j).parents("tr").find(".news_del").attr("data-id")) {
								usersData.splice(i, 1);
								usersList(usersData);
							}
						}
					}
					$('.users_list thead input[type="checkbox"]').prop("checked", false);
					form.render();
					layer.close(index);
					layer.msg("删除成功");
				}, 2000);
			})
		} else {
			layer.msg("请选择需要删除的文章");
		}
	})

	//全选
	form.on('checkbox(allChoose)', function (data) {
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		child.each(function (index, item) {
			item.checked = data.elem.checked;
		});
		form.render('checkbox');
	});

	//通过判断文章是否全部选中来确定全选按钮是否选中
	form.on("checkbox(choose)", function (data) {
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		var childChecked = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"]):checked')
		if (childChecked.length == child.length) {
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = true;
		} else {
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = false;
		}
		form.render('checkbox');
	})

	//操作
	$("body").on("click", ".users_edit", function () {  //编辑
		layer.alert('您点击了会员编辑按钮，由于是纯静态页面，所以暂时不存在编辑内容，后期会添加，敬请谅解。。。', { icon: 6, title: '文章编辑' });
	})

	$("body").on("click", ".users_del", function () {  //删除
		var _this = $(this);
		layer.confirm('确定删除此用户？', { icon: 3, title: '提示信息' }, function (index) {
			//_this.parents("tr").remove();
			for (var i = 0; i < usersData.length; i++) {
				if (usersData[i].usersId == _this.attr("data-id")) {
					usersData.splice(i, 1);
					usersList(usersData);
				}
			}
			layer.close(index);
		});
	})

	function usersList(data) {
		//渲染数据
		function renderDate(data, curr) {
			var dataHtml = '';
			currData = data.concat().splice(curr * nums - nums, nums);
			if (currData.length != 0) {
				for (var i = 0; i < currData.length; i++) {
					dataHtml += '<tr>'
						+ '<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
						+ '<td>' + currData[i].name + '</td>'
						+ '<td>' + currData[i].email + '</td>'
						+ '<td>' + currData[i].phone + '</td>';
					var roles = "";
					currData[i].roles.forEach(function (element, index) {
						if (index === currData[i].roles.length - 1) {
							roles += element.name;
						} else {
							roles += element.name + ",";
						}
					});
					dataHtml+= '<td>' + roles+ '</td>'
						+ '<td>' + currData[i].status + '</td>'
						+ '<td>' + currData[i].birthDate + '</td>'
						+ '<td>'
						+ '<a class="layui-btn layui-btn-mini users_edit"><i class="iconfont icon-edit"></i> 编辑</a>'
						+ '<a class="layui-btn layui-btn-danger layui-btn-mini users_del" data-id="' + data[i].id + '"><i class="layui-icon">&#xe640;</i> 删除</a>'
						+ '</td>'
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
				$(".users_content").html(renderDate(data, obj.curr));
				$('.users_list thead input[type="checkbox"]').prop("checked", false);
				form.render();
			}
		})
	}

})