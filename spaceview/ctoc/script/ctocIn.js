$(document).bind("plusready",function(){
	//获取传递过来的值
	var idValue = plus.webview.currentWebview().ctocId;
	
	//获取父级页面
	var parentView = plus.webview.currentWebview().opener();
	
	//定义获取信息接口
	var getInMesUrl = mainUrl + "trade/buyview";
	
	//定义提交接口
	var subUrl = mainUrl + "trade/buy";
	
	//保存单价
	var ctocInNum = 0;
	
	//定义小键盘自增量和记住密码变量
	var safkeyUp = 0;
	var safkeyPw = "";
	
	//发起请求获取数据
	requestToken(getInMesUrl,"get",{id:idValue},function(data){
		if(data.code == 1){
			$("#nameText").text(data.data.username);
			$("#gdNumb").text(data.data.totalnum);
			$("#overnum").text(data.data.overnum);
			$("#djnum").text(data.data.price);
			ctocInNum = data.data.price;
		}else{
			toast(data.msg);
		}
	});
	
	//为数量输入框绑定事件
	$("#ctocInInput").bind("change",function(){
		var value1 = $("#ctocInInput").val();
		var value2 = value1 * ctocInNum;
		$("#ctocInConverCont").text(value2);
	});
	
	//为购买按钮绑定事件
	$(".ctocInBut>a").bind("tap",function(){
		if(!$("#ctocInInput").val()){
			toast("请输入购买数量！");
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
		requestToken(subUrl,"get",{id:idValue,money:$("#ctocInInput").val(),paypwd:safkeyPw},function(data){
			if(data.code == 1){
				toast(data.msg);
				parentView.reload();
				BackView();
			}else{
				toast(data.msg);
				window.location.reload();
			}
		});
	});
});
