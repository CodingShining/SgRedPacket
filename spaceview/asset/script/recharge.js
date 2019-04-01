window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		
		
		//获取页面数据
		var typeValue = plus.webview.currentWebview().viewType;
		
		//定义请求地址
		var rechargeUrl = mainUrl + "user/getaddress";
		
		//发起请求
		 rechRequest(typeValue);
		 RecharShowType(typeValue);
		
		//为充值记录添加点击事件
		$("#record").bind("tap",function(){
			goView("rechargeList.html","rechargeList",{spaceValue:"true"});
		});
		
		//为保存二维码绑定事件
		$("#rechargeSavRqimg").bind("tap",function(){
			 toast("暂未开放！");
		});
		
		//为复制地址绑定事件
		$("#rechargeSaveLocal>a").bind("tap",function(){
			//获取需要保存的文字
			var textValue = $("#rechargeLocal").text();
			//调用保存函数
			copyText(textValue);
		});
		
		//为复制TAG绑定事件
		$("#rechargeSaveTag>a").bind("tap",function(){
			//获取需要保存的文字
			var textValue = $("#rechargeTag").text();
			//调用保存函数
			copyText(textValue);
		});
		
		//定义 请求函数
		function rechRequest(typeValue){
			requestToken(rechargeUrl,"get",{type:typeValue},function(data){
				if(data.code == 1){
					//渲染数据
					$("#rechargeLocal").text(data.data.address);
					$("#rechargeTag").text(data.data.label);
					$("#rechargeRQimg").attr({src:ImgUrl+data.data.url});
				}else{
					toast(data.msg);
				}
			});
		}
		
		//改变充币类型的头部样式
		function RecharShowType(typeValue){
			if(typeValue == "1"){
				$(".rechargeTitleBox>i").css({background:"url(img/titleicon.png)",backgroundSize:"100%,100%"});
				$(".rechargeTitleBox>div").text("EOS");
			}else if(typeValue == "2"){
				$(".rechargeTitleBox>i").css({background:"url(img/XRP.png)",backgroundSize:"100%,100%"});
				$(".rechargeTitleBox>div").text("XRP");
			}
		}
	});
});