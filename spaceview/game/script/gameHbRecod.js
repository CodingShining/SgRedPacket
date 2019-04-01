$(document).bind("plusready",function(){
	
	//定义请求接口（抢到的红包）
	var requestUrl1 = mainUrl + "hbgame/gethblist";
	
	//定义请求接口（发出的红包）
	var requestUrl2 = mainUrl + "hbgame/outhblist";
	
	//初始化请求数据
	getHbRecodData("2");
	
	//为顶部菜单按钮绑定事件
	$(".gameHbRecodHeadNav>span").bind("tap",function(){
		$(".gameHbRecodUl").html("");
		for(var i=0;i<$(".gameHbRecodHeadNav>span").length;i++){
			$(".gameHbRecodHeadNav>span").eq(i).removeClass("gameHbRecodSelect");
		}
		$(this).addClass("gameHbRecodSelect");
		//获取自定义值
		var requestType = $(this).attr("data-AjaxType");
		if(requestType == "1"){
			$(".gameHbRecodItemTitle1").show();
			$(".gameHbRecodItemTitle2").hide();
		}else if(requestType == "2"){
			$(".gameHbRecodItemTitle2").show();
			$(".gameHbRecodItemTitle1").hide();
		}
		getHbRecodData(requestType);
	});
	
	
	//定义请求
	function getHbRecodData(typeValue){
		if(typeValue == "1"){
			requestToken(requestUrl1,"get",{},function(data){
				if(data.code == 1){
					$("#gameHbRecodData1").text(data.data.sum_num);
					$("#gameHbRecodData2").text("-"+data.data.lei_num);
					var list1 = data.data.hblist;
					if(list1.length){
						for(var f=0;f<list1.length;f++){
							$(".gameHbRecodUl").append('<li class="gameHbRecodItem1"><span style="width:20%">'+list1[f].room_id+'</span><span style="width:20%">'+SwitchDiv(list1[f].add_time)+'</span><span style="width:20%;text-align:center">'+list1[f].nickname+'</span><span style="width:20%;text-align:right">+'+list1[f].money+'</span><span style="width:20%;text-align:right">-'+list1[f].lei+'</span></li>');
						}
					}else{
						$(".gameHbRecodUl").html('<div class="ListNotData">没有记录</div>');
					}
				}else{
					toast(data.msg);
				}
			});
		}else if(typeValue == "2"){
			requestToken(requestUrl2,"get",{},function(data){
				if(data.code == 1){
					$("#gameHbRecodData1").text(data.data.sum_num);
					$("#gameHbRecodData2").text("+"+data.data.lei_num);
					var list2 = data.data.hblist;
					if(list2.length){
						for(var g=0;g<list2.length;g++){
							$(".gameHbRecodUl").append('<li class="gameHbRecodItem2"><span style="width:25%">'+list2[g].room_id+'</span><span style="width:25%">'+SwitchDiv(list2[g].add_time)+'</span><span style="width:25%">-'+list2[g].money+'</span><span style="width:25%;text-align:right">+'+list2[g].lei+'</span></li>');
						}
					}else{
						$(".gameHbRecodUl").html('<div class="ListNotData">没有记录</div>');
					}
				}else{
					toast(data.msg);
				}
			});
		}
	}
});
