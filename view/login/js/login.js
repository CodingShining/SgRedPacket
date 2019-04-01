// 检测更新
app.check_update();
$(document).bind("plusready", function () {
	
	
	//定义登录接口
	var logingUrl = mainUrl + "user/login";
	
	//为忘记登录密码绑定事件
	$(".u-forget").bind("tap",function(){
		goView("forget.html","forget",{spaceValue:"true"});
	});
	
	//为立即注册绑定事件
	$(".u-register>a").bind("tap",function(){
		goView("register.html","register",{spaceValue:"true"});
	});
	
	//为登录按钮绑定事件
	$("#loginBut").bind("tap",function(){
		//获取用户输入数据
		var username = $("#kingUserName").val();
		var userPw = $("#kingUserPw").val();
		//判断当前用户是否输入数据
		if(!username){
			toast("请输入登录账号！");
			return;
		}else if(!userPw){
			toast("请输入登录密码！");
			return;
		}
		//发起登录请求
		request(logingUrl,"get",{account:username,password:userPw},{},function(data){
			if(data.code == 1){
				var userInfo = JSON.stringify(data.data.userinfo);
				//将登录信息保存至本地
				localStorage.setItem("userInfo",userInfo);
				toast("登录成功");
				goView("../../index.html","index");
			}else{
				toast(data.msg)
			}
		});
	});
	
	//为清除登录账号绑定事件
	$("#clearName").bind("tap",function(){
		$("#kingUserName").val("");
	});
	
	//为显示密码绑定事件
	$("#showPw").bind("tap",function(){
		//获取自定义数据
		var togg = $(this).attr("data-toggle");
		if(togg == "0"){
			$("#kingUserPw").attr({type:"text"});
			$(this).find("img").attr({src:"imgs/eye_open.png"});
			$(this).attr({"data-toggle":"1"});
		}else if(togg == "1"){
			$("#kingUserPw").attr({type:"password"});
			$(this).find("img").attr({src:"imgs/eye_close.png"});
			$(this).attr({"data-toggle":"0"});
		}
	});

});