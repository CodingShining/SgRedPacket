$(document).bind("plusready",function(){
	
	//定义请求地址
	var detailUrl = mainUrl + "user/getprofitrecord";
	
	detailRequest("10");

	
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
		detailRequest(thisData);
	});
	
	//定义请求数据函数
	function detailRequest(idValue){
		//发起请求获取列表数据
		requestToken(detailUrl,"get",{type:idValue},function(data){
			if(data.code == 1){
				$(".recordcommUl").html("");
				var detailList = data.data.data.data;
				$("#todayMoney").text(data.data.data.dayprofit);
				$("#zgMoney").text(data.data.data.allprofit);
				$("#yesterdayMobey").text(data.data.data.oldprofit);
				//判断当前数据列表是否有值
				if(detailList.length){
					for(var i=0;i<detailList.length;i++){
						var statusValue = "";
						 switch(detailList[i].sf){
						 	case "0":
						 		statusValue = "未到账";
						 	break;
						 	case "1":
						 		statusValue = "已到账";
						 	break;
						 }
						$(".recordcommUl").append('<li><span>'+SwitchTime(detailList[i].createtime)+'</span><span>'+detailList[i].fromuser+'</span><span style="text-align:right">+'+detailList[i].amount+'</span><span>'+statusValue+'</span></li>');
					}
				}else{
					$(".recordcommUl").append('<div class="ListNotData">没有数据！</div>');
				}
			}else{
				toast(data.msg); 
			}
		});
	}
	

});
