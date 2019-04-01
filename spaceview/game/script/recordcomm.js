$(document).bind("plusready",function(){
	
	//定义请求接口
	var recordUrl = mainUrl + "user/getprofitrecord";
	
	//获取页面传值
	var thisViewData = plus.webview.currentWebview().toggle;
	
	if(thisViewData){
		for(var i=0;i<3;i++){
			$(".recordNav>span").eq(i).removeClass("navSelsected");
		}
		$(".startDome").addClass("navSelsected");
		recordReques("1");
	}else{
		recordReques("2");
	}
	
	
	//为头部菜单绑定事件
	$(".recordNav>span").bind("tap",function(){
		//循环去掉样式
		for(var i=0;i<3;i++){
			$(".recordNav>span").eq(i).removeClass("navSelsected");
		}
		$(this).addClass("navSelsected");
		//获取自定属性
		var thisData = $(this).attr("data-type");
		//发起请求：
		recordReques(thisData);
	});
	
	//定义请求函数
	function recordReques(typeValue){ 
		$(".recordcommUl").html("");
		requestToken(recordUrl,"get",{type:typeValue},function(data){
			if(data.code == 1){
				$("#todayMoney").text(data.data.data.dayprofit);
				$("#zgMoney").text(data.data.data.allprofit);
				var list = data.data.data.data;
				if(list.length){
					for(var i=0;i<list.length;i++){
						$(".recordcommUl").append('<li><span>'+SwitchTime(list[i].createtime)+'</span><span>'+list[i].remark+'</span><span>+'+list[i].amount+'</span><span>'+list[i].fromuser+'</span></li>');
					}
				}else{
					$(".recordcommUl").html('<div class="ListNotData">没有记录！</div>');
				}
			}else{
				toast(data.msg);
			}
		});
	}
});
