$(document).bind("plusready",function(){
	
	//获取页面类型
	var forgetViewType = plus.webview.currentWebview().viewType;
	
	//定义验证码接口
	var forgePhone = mainUrl + "sms/send";
	
	//定义接口
	var urlType1_1 = mainUrl + "user/resetpwd";
	var urlType1_2 = mainUrl + "user/resetpaypwd";
	
	//定义倒数
	var downVariable = 59;
	
	//获取用户电话号码显示在对应的Input中
	var userIinfo = getUserInfo();
	var userPhoneNumber = userIinfo.mobile;
	
	$("#forgetUserName").val(userPhoneNumber);
	
	//为各项显示密码绑定事件
	$(".forgu-eye").bind("tap",function(){
		//获取自定义属性
		var toggle = $(this).attr("data-toggle");
		var contorl = $(this).attr("data-contorl");
		
		if(toggle == "0"){
			$(this).find("img").attr({src:"imgs/eye_open.png"});
			$("#"+contorl).attr({type:"text"});
			$(this).attr({"data-toggle":"1"});
		}else{
			$(this).find("img").attr({src:"imgs/eye_close.png"});
			$("#"+contorl).attr({type:"password"});
			$(this).attr({"data-toggle":"0"});
		}
	});
	
	//为发送验证码绑定事件
	$(".forgetCheck").bind("tap",function(){
		//获取开关
		var toggle = $(this).attr("data-toggle");
		
		if(toggle == "1"){
			return;
		}
		
		$(this).attr({"data-toggle":"1"});
		
		DownTime();
		
		//定义验证码类型
		var checkType = "";
		
		//判断类型
		 if(forgetViewType == "0"){
		 	checkType = "resetpwd";
		 }else if(forgetViewType == "1"){
		 	checkType = "resetpaypwd";
		 }
		//发起请求
		request(forgePhone,"get",{mobile:$("#forgetUserName").val(),event:checkType},{},function(data){
			if(data.code == 1){
				toast("发送成功！");
			}else{
				toast(data.msg);
			}
		});
	});
	
	//为确认密码绑定事件
	$(".forgetBut").bind("tap",function(){
		if(forgetViewType == "1"){
			if(isNaN($("#forginput1").val())){
				toast("交易密码只能为6位数字");
				return;
			}else if($("#forginput1").val().length > 6){
				toast("交易密码只能为6位数字");
				return;
			}	
		}
		//获取各个数据
		var forgetInput1 = $("#forgetUserName").val();
		var forgetInput2 = $("#forgetUserCheck").val();
		var forgetInput3 = $("#forginput1").val();
		var forgetInput4 = $("#forginput2").val();
		
		//判断
		if(!forgetInput2){
			toast("请输入验证码！");
			return;
		}else if(!forgetInput3){
			toast("请输入新的密码！");
			return;
		}else if(forgetInput3 != forgetInput4){
			toast("两次密码不相同！");
			return;
		}
		
		//判断页面类型
		if(forgetViewType == "0"){
			request(urlType1_1,"get",{mobile:$("#forgetUserName").val(),newpassword:$("#forginput1").val(),repwd:$("#forginput2").val(),captcha:$("#forgetUserCheck").val()},{},function(data){
				if(data.code){
					toast("设置成功！");
					BackView();
				}else{
					toast(data.msg);
				}
			});
		}else if(forgetViewType == "1"){
			requestToken(urlType1_2,"post",{newpassword:$("#forginput1").val(),repwd:$("#forginput2").val(),captcha:$("#forgetUserCheck").val()},function(data){
				if(data.code){
					toast("设置成功！");
					UpLocalData("paypassword",1);
					//刷新父级页面
					resLoadParent();
					BackView();
				}else{
					toast(data.msg);
				}
			});
		}
	});
	
	function DownTime(){
		if(downVariable == 0){
			$(".forgetCheck").text("获取验证码");
			$(".forgetCheck").attr({"data-toggle":"0"});
			return;
		}
		downVariable = downVariable-1;
		$(".forgetCheck").text(downVariable);
		setTimeout(function(){
			DownTime();
		},1000)
		
	}
});
