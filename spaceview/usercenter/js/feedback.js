$(document).bind("plusready",function(){
	
	//定义接口
	var feedbackUrl = mainUrl + "user/feedback";
	
	//为提交按钮绑定事件
	$("#feedbackBut").bind("tap",function(){
		//获取各项数据
		var cont = $("#feedbackCont").val();
		var emailValue = $("#feedMail").val();
		if(!cont){
			toast("请输入反馈内容！");
			return;
		}else if(!emailValue){
			toast("请输入联系邮箱！");
			return;
		}
		
		//发起请求
		requestToken(feedbackUrl,"get",{content:cont,email:emailValue},function(data){
			if(data.code == 1){
				toast("反馈成功！");
				BackView();
			}else{
				toast(data.msg);
			}
		});
	});
});
