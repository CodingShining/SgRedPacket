$(document).bind("plusready",function(){
	
	//判断用户是否设置了交易密码！
	var userLocalData = getUserInfo();
	if(userLocalData.paypassword == 1){
		$("#pwsAlertText").text("已设置");
		$("#changePayPw").attr({"data-state":"1"});
	}else{
		$("#pwsAlertText").text("未设置");
		$("#changePayPw").attr({"data-state":"0"});
	}
	
	//为修改密码添加事件
	$("#changePw").bind("tap",function(){
		goView("editPwd.html","editPwd",{spaceValue:"true",viewType:"0"});
	});
	
	//为修改支付密码添加事件
	$("#changePayPw").bind("tap",function(){
		//获取状态
		var toggle = $(this).attr("data-state");
		if(toggle == "1"){
			goView("editPwd.html","editPwd",{spaceValue:"true",viewType:"1"});
		}else{
			goView("forgetPwd.html","forgetPwd",{spaceValue:"true",viewType:"1"});
		}
	});
});
