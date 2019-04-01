$(document).bind("plusready", function () {
	var updateContent = "";
	//为前往平台简介绑定事件
	$("#aboutBrief").bind("tap", function () {
		goView("../bulletin/feedbbackText.html", "feedbbackText", {
			spaceValue: "true"
		});
	});

	//为前往意见反馈绑定事件
	$("#aboutFeedback").bind("tap", function () {
		goView("feedback.html", "feedback", {
			spaceValue: "true"
		});
	});

	//为前往帮助中心绑定事件
	$("#aboutHelp").bind("tap", function () {
		goView("../bulletin/helpText.html", "helpText", {
			spaceValue: "true"
		});
	});

	//为版本号绑定事件
	//	$("#aboutVersion").bind("tap", function () {
	//		//获取自定义属性
	//		var versionData = $(this).attr("data-verison");
	//		if (versionData == "0") {
	//			toast("已经是最新版本，无需更新！");
	//		} else {
	//			//显示选择框
	//			plus.nativeUI.actionSheet({
	//				title: "App更新",
	//				cancel: "取消",
	//				buttons: [{
	//					title: "立即更新"
	//				}]
	//			}, function (e) {
	//				switch (e.index) {
	//					case 1:
	//						toast("立即更新！");
	//						break;
	//				}
	//			});
	//		}
	//	});
	// 获取版本号信息
	(function () {
		var wgtVer = "";
		var $version = $("#aboutVersion .u-version");
		plus.runtime.getProperty(plus.runtime.appid, function (inf) {
			wgtVer = inf.version;
			$version.html("V" + wgtVer);
			// 检测更新
			request(baseUrl + "common/getversion", "get", {}, {}, function (data) {
				if (data.code == 1) {
					var newVer = data.data.version;
					if (wgtVer && newVer && (wgtVer != newVer)) {
						$version.addClass("u-spot");
					} else {
						$version.removeClass("u-spot");
					}
					//为版本号绑定事件
					$("#aboutVersion").off().on("tap", function () {
						if ($(this).find("u-spot").length != 0) {
							plus.nativeUI.confirm(data.data.content, function (e) {
								if (e.index == 0) {
									app.downWgt(data.data.url); // 下载升级包
								}
							}, "新版本更新提示");
						} else {
							toast("已经是最新版本，无需更新！");
						}
					});
				}
			});
		});
		// 获取更新
	})()


});