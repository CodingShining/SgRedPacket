$(document).bind("plusready", function () {
	
	//定义验证码接口
	var phoneUrl = mainUrl + "sms/send";
	
	//定义请求接口
	var resetPwUrl = mainUrl + "user/resetpwd";
	
	//定义倒数变量
	var downNumb = 59;
	
   //为发送验证码添加事件
   $("#forgetCheck").bind("tap",function(){
   	//获取手机号码
   	var phone = $("#forgetPhone").val();
   	if(!phone){
   		toast("请输入登录手机！");
   		return;
   	}
		
		//获取自定义属性
		var toggle = $(this).attr("data-toggle");
		if(toggle == "0"){
			downNumber();
			$(this).attr({"data-toggle":"1"});
			//发起请求
			request(phoneUrl,"get",{mobile:phone,event:"resetpwd"},{},function(data){
				console.log(JSON.stringify(data));
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
   
   //为显示密码绑定事件
    $(".ru-eye").bind("tap",function(){
			
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
		
		//为确定修改绑定事件
   	$("#confirm").bind("tap",function(){
   		//收集各项数据
   		var phone = $("#forgetPhone").val();
   		var check = $("#checkNumber").val();
   		var newPw = $("#newPws").val();
   		var oldePw = $("#oldPws").val();
   		if(!phone){
   			toast("请输入登录手机号！");
   			return;
   		}else if(!check){
   			toast("请输入验证码！");
   			return;
   		}else if(!newPw){
   			toast("请输入新的密码！");
   			return;
   		}else if(newPw != oldePw){
   			toast("两次密码不相同！");
   			return;
   		}
   		
   		//发起请求
   		request(resetPwUrl,"get",{mobile:phone,newpassword:newPw,repwd:oldePw,captcha:check},{},function(data){
   			if(data.code == 1){
   				toast("密码重置成功！");
   				BackView();
   			}else{
   				toast(data.msg);
   			}
   		});
   		
   	});

   //定义倒数函数
		function downNumber(){
			if(downNumb == 0){
				$("#forgetCheck").attr({"data-toggle":"0"});
				$("#forgetCheck").text("短信验证码");
				downNumb = 59;
				return;
			}else{
				$("#forgetCheck").text(downNumb);
				downNumb = downNumb-1;
			}
			
			setTimeout(function(){
				downNumber();
			},1000);
		}
});