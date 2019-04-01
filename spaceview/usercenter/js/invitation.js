$(document).bind("plusready",function(){
	//定义接口
	var invitationUrl = mainUrl + "user/qrcode";
	
	//发起请求获取推广码和二维码
	requestToken(invitationUrl,"get",{},function(data){
		if(data.code == 1){
			$("#invitationCode").text(data.data.code);
			$("#invitationRqimg>img").attr({src:ImgUrl+data.data.url});
		}else{
			toast(data.msg);
		}
	});
	
	//为规则添加事件
	$("#invitationlook").bind("tap",function(){
		goView("../bulletin/invitationText.html","invitationText",{spaceValue:"true"});
	});
	
	//为拷贝按钮绑定事件
	$("#copy").bind("tap",function(){
		var textCon = $("#invitationCode").text();
		copyText(textCon);
	});
});
