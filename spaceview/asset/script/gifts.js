$(document).bind("plusready",function(){
	
	//定义获取数据接口
	var giftsDataUrl = mainUrl + "user/getbalance";
	
	//定义赠送主请求
	var giftsMainUrl = mainUrl + "user/usergive";
	
	//获取手机号码
	var viewPhone = plus.webview.currentWebview().viewData;
	
	//定义小键盘自增量和记住密码变量
	var safkeyUp = 0;
	var safkeyPw = "";
	
	//定义变量保存数据
	var giveSxf = ""; 
	var giftsMinNumb = "";
	
	//发起请求获取数据
	requestToken(giftsDataUrl,"get",{},function(data){
		if(data.code == 1){ 
			$("#giftsAsst").text(data.data.ptb); 
			giveSxf = data.data.give_sxf;
			giftsMinNumb = data.data.min_give;
		}else{
			toast(data.msg);
		}
	});
	
	//判断是否有手机号码传递过来
	if(viewPhone){
		$("#giftsInput1").val(viewPhone);
	}
	
	$("#giftsInput2").bind("change",function(){
		//获取输入值
		var Value1 = $("#giftsInput2").val();
		var Value2 = toNumberFun(Value1) * toNumberFun(giveSxf);
		Value2 = Value2.toFixed(6);
		var Value3 = toNumberFun(Value1) - Value2;
		$("#giftsInput3").val(Value2);
		$("#giftsCharg").text(Value3);
	});
	
	//为赠送记录添加事件
	$("#giftsList").bind("tap",function(){
		goView("giftsList.html","giftsList",{spaceValue:"true"});
	});
	
	//为确定按钮绑定事件
	$("#giftsConfirm").bind("tap",function(){
		//获取数据
		var input1 = $("#giftsInput1").val();
		var input2 = $("#giftsInput2").val();
		
		//判断
		if(!input1){
			toast("请输入目标用户的电话！");
			return;
		}else if(!input2){
			toast("请输入正确的转账额度！");
			return;
		}else if(toNumberFun(input2) < toNumberFun(giftsMinNumb)){
			toast("转账额度不能小于："+giftsMinNumb);
			return;
		}
		
		$(".safetyKey").css({bottom:"0px"});
	});
	
	//为小键盘取消按钮绑定事件
	$(".safetClean").bind("tap",function(){
		$(".safetyKey").css({bottom:"-450px"});
		location.reload();
	});
	
	//为小键盘上的按钮绑定事件
	$(".safetKeyItem").bind("tap",function(){
		if(safkeyUp == 6){
			return;
		}
		//获取字符
		var strCont = $(this).text();
		safkeyUp +=1;
		$(".mm").eq(safkeyUp-1).addClass("selectRadius");
		safkeyPw += strCont;
	});
	
	//为小键盘上你的删除按钮绑定事件
	$(".safetKeyDelete").bind("tap",function(){
		if(safkeyUp == 0){
			return;
		}
		//获取删除索引
		safkeyUp -= 1;
		$(".mm").eq(safkeyUp).removeClass("selectRadius");
		//删除密码
		var length = safkeyPw.length-1;
		safkeyPw = safkeyPw.substr(0,length);
	});
	
	//为确定按钮绑定事件
	$(".safetyKeyBut").bind("tap",function(){
		if(safkeyUp < 6){
			toast("请输入正确的支付密码！");
			return;
		}
		
		//发起请求
		requestToken(giftsMainUrl,"get",{username:$("#giftsInput1").val(),num:$("#giftsInput2").val(),password:safkeyPw},function(data){
			if(data.code == 1){
				toast("转账成功！");
				resLoadParent();
				reloadView("usercenter");
				window.location.reload();
			}else{
				toast(data.msg);
				window.location.reload();
			}
		});
	});
	
});
