$(document).bind("plusready",function(){
	//获取房间ID
	var roomIDvalue = plus.webview.currentWebview().roomId;
	
	//定义获取红包个数列表
	var getHbNm = mainUrl + "hbgame/packlist";
	
	//定义红包发布接口
	var issueHb = mainUrl + "hbgame/sendtopacket";
	
	//保存红包个数与倍数
	var HbNum = "";
	var HbMul = "";
	
	//保存个数倍数ID值
	var HbNMIdname = "";
	
	//保存雷号
	var Mark = "";
	
	//发起请求
	requestToken(getHbNm,"get",{},function(data){
		if(data.code == 1){
			$("#gameHbGiveShow0").text(data.data.balance);
			var listValue = data.data.packlist;
			for(var i=0;i<listValue.length;i++){
				$(".gameGiveSeletUl").append('<li data-nmId="'+listValue[i].id+'" data-num="'+listValue[i].number+'" data-ods="'+listValue[i].odds+'"><span>'+listValue[i].number+'个/'+listValue[i].odds+'倍</span></li>');
			}
			$(".gameGiveSeletUl>li").bind("tap",function(){
				for(var j=0;j<$(".gameGiveSeletUl>li").length;j++){
					$(".gameGiveSeletUl>li").eq(j).find("span").removeClass("gameGiveSeletSed");
				}
				$(this).find("span").addClass("gameGiveSeletSed");
				
				//获取自定义属性
				HbNum = $(this).attr("data-num");
				HbMul = $(this).attr("data-ods");
				HbNMIdname = $(this).attr("data-nmId");
				
				$("#gameHbGiveShow2").text(HbNum + "个/"+HbMul +"倍");
			});
		}else{
			toast(data.msg);
		}
	});
	
	//为input绑定事件
	$("#gameHbGiveInput1").bind("change",function(){
		$("#gameHbGiveShow1").text($("#gameHbGiveInput1").val());
	});
	
	//为选择雷号添加事件
	$(".gameGiveLeiUl>li").bind("tap",function(){
		for(var g=0;g<$(".gameGiveLeiUl>li").length;g++){
			$(".gameGiveLeiUl>li").eq(g).find("span").removeClass("gameGiveSeletSed");
		}
		$(this).find("span").addClass("gameGiveSeletSed");
		Mark = $(this).find("span").text();
		$("#gameHbGiveShow3").text(Mark);
	});
	
	//为发红包按钮绑定事件
	$("#gameGiveBut2").bind("tap",function(){
		if(!$("#gameHbGiveInput1").val()){
			toast("请输入红包金额！");
			return;
		}else if(!HbNum){
			toast("请选择红包个数与倍数！");
			return;
		}else if(!Mark){
			toast("请选择雷号！");
			return;
		}
		//发起请求
		requestToken(issueHb,"get",{room_id:roomIDvalue,lei:Mark,money:$("#gameHbGiveInput1").val(),pack_id:HbNMIdname},function(data){
			if(data.code == 1){
				toast(data.msg);
				BackView();
			}else{
				toast(data.msg);
			}
		});
	});
	
	//为取消按钮绑定事件
	$("#gameGiveBut1").bind("tap",function(){
		BackView();
	});
});
