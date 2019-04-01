$(document).bind("plusready",function(){
	//获取页面属性
	var thisView = plus.webview.currentWebview();
	var pwType = thisView.viewType;
	
	//定义接口
	var setUpPw = mainUrl + "user/updatepwd";
	var setPayPw = mainUrl + "user/updatepaypwd";
	
	
	//为各项显示密码添加事件
	$(".edu-eye").bind("tap",function(){
		//获取各自属性
		var toggle = $(this).attr("data-toggle");
		var contolr = $(this).attr("data-control");
		
		if(toggle == "0"){
			$(this).find("img").attr({src:"imgs/eye_open.png"});
			$("#"+contolr).attr({type:"text"});
			$(this).attr({"data-toggle":"1"});
		}else if(toggle == "1"){
			$(this).find("img").attr({src:"imgs/eye_close.png"});
			$("#"+contolr).attr({type:"password"});
			$(this).attr({"data-toggle":"0"});
		}
	});
	
	//为忘记密码添加事件
	$(".u-forget>a").bind("tap",function(){
		//前往忘记密码页面
		goView("forgetPwd.html","forgetPwd",{spaceValue:"true",viewType:pwType});
	});
	
	//为确定修改密码绑定事件
	$(".u-btn-edit").bind("tap",function(){
		if(pwType == "1"){
			if(isNaN($("#ednewPw").val())){
				toast("交易密码只能为6位数字");
				return;
			}else if($("#ednewPw").val().length > 6){
				toast("交易密码只能为6位数字");
				return;
			}
		}
		//获取input数据
		var input1 = $("#edlodePw").val();
		var input2 = $("#ednewPw").val();
		var input3 = $("#edrePw").val();
		
		if(!input1){
			toast("请输入原始密码！");
			return;
		}else if(!input2){
			toast("请输入新的密码！");
			return;
		}else if(input2 != input3){
			toast("两次密码不相同！");
			return;
		}
		
		//判断何种修改密码
		var requestUrl = "";
		if(pwType == "0"){
			requestUrl = setUpPw;
		}else if(pwType == "1"){
			requestUrl = setPayPw;
		}
		 
		//发起请求：
	 	requestToken(requestUrl,"get",{oldpassword:input1,newpassword:input2,repwd:input3},function(data){
	 		if(data.code == 1){
	 			toast("修改成功！");
	 			if(pwType == "0"){
	 				AllcloseView();
	 			}else{
	 				BackView();
	 			}
	 		}else{
	 			toast(data.msg);
	 		}
	 	});
	});
	
});
