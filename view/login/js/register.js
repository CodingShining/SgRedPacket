$(document).bind("plusready", function () {
	
	//定义倒数变量
	var downNumber = 59;
	
	//定义手机短信接口
	var phoneurl = mainUrl + "sms/send";
	
	//定义注册请求接口
	var register = mainUrl + "user/register";
	
	//为显示密码按钮绑定事件
	$(".u-eye").bind("tap",function(){
		
		var togg = $(this).attr("data-toggle");
		var control = $(this).attr("data-contorl");
		
		if(togg == "0"){
			$(this).find("img").attr({src:"imgs/eye_open.png"});
			$("#"+control).attr({type:"text"});
			$(this).attr({"data-toggle":"1"});
		}else if(togg == "1"){
			$(this).find("img").attr({src:"imgs/eye_close.png"});
			$("#"+control).attr({type:"password"});
			$(this).attr({"data-toggle":"0"});
		}
	});
	
	//为发送短信绑定点击事件
	$(".u-sms").bind("tap",function(){
		//判断是否填写了手机信息
		var phone = $("#userphone").val();
		if(!phone){
			toast("请填写注册手机！");
			return;
		}
		
		//获取自定属性
		var toggle = $(this).attr("data-toggle");
		if(toggle == "0"){
			downNubFun();
			$(this).attr({"data-toggle":"1"});
			//发起请求
			request(phoneurl,"get",{mobile:phone,event:"register"},{},function(data){
				if(data.code == 1){
					toast("验证码发送成功！");
				}else{
					toast(data.msg);
				}
			});
		}else if(toggle == "1"){
			return;
		}
		
	});
	
	//为注册按钮绑定事件
	$(".u-btn").bind("tap",function(){
		//获取用户输入的数据
		var phoneNumber = $("#userphone").val();
		var newPw = $("#newPw").val();
		var oldPw = $("#oldPw").val();
		var checkNumber = $("#ckeckNmuber").val();
		var indexMan = $("#indexMan").val();
		var userNikname = $("#usernikname").val();
		
		if(!phoneNumber){
			toast("请填写注册手机号！");
			return;
		}else if(!newPw){
			toast("请设置登录密码！");
			return;
		}else if(oldPw != newPw){
			toast("两次密码不相同！");
			return;
		}else if(!checkNumber){
			toast("请输入手机验证码！");
			return;
		}else if(!indexMan){
			toast("请输入推荐码！");
			return;
		}else if(!userNikname){
			toast("请输入用户昵称");
			return;
		} 
		
		//发起请求
		request(register,"get",{username:phoneNumber,password:newPw,repwd:oldPw,verify:checkNumber,parent:indexMan,nick:userNikname},{},function(data){
			if(data.code == 1){
				toast("注册成功！");
				BackView();
			}else{
				toast(data.msg);
			}
		});
	});
	
	//为立即登录绑定事件
	$(".u-login>a").bind("tap",function(){
		//关闭本页
		var thisView = plus.webview.currentWebview();
		plus.webview.close(thisView);
	});
	
	//定义倒数函数
	function downNubFun(){
		if(downNumber == 0){
			$(".u-sms").attr({"data-toggle":"0"});
			$(".u-sms").text("短信验证码");
			downNumber = 59;
			return;
		}else{
			$(".u-sms").text(downNumber);
			downNumber = downNumber-1;
		}
		
		setTimeout(function(){
			downNubFun();
		},1000);
	}
});