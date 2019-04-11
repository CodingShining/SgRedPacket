window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		
		//定义请求地址
		var detailUrl = mainUrl + "user/getrecord";
		
		detailRequest("0");
		
		//为显示筛选菜单
		$(".screenBox>img").bind("tap",function(){
			$(".selectNavBox").css({bottom:"0px"});
		});
		
		//为取消筛选按钮绑定事件
		$(".cancelNav>a").bind("tap",function(){
			hiddeNav();
		});
		
		//为所有的选择菜单项添加点击事件
		$(".selectNavBox>span").bind("tap",function(){
			//取消其他各项样式
			for(var i=0;i<$(".selectNavBox>span").length;i++){
				$(".selectNavBox>span").eq(i).removeClass("selectedColor");
			}
			//获取当前元素的自定义属性
			var typeValue = $(this).attr("data-type");
			
			//为当前添加样式
			$(this).addClass("selectedColor");
			
			//发起请求
			detailRequest(typeValue);
			
			//完成后隐藏菜单
			hiddeNav();
		});
		
		//为隐藏菜单添加事件
		function hiddeNav(){
			$(".selectNavBox").css({bottom:"-300px"});
		}
		
		//定义请求数据函数
		function detailRequest(idValue){
			//发起请求获取列表数据
			requestToken(detailUrl,"get",{type:idValue},function(data){
				if(data.code == 1){
					$(".detailUl").html("");
					var detailList = data.data.data;
					//判断当前数据列表是否有值
					if(detailList.length){
						for(var i=0;i<detailList.length;i++){
							$(".detailUl").append('<li><h1>'+detailList[i].remark+'</h1><div class="detailListTitle"><span>数量</span><span style="text-align:center">币种</span><span>时间</span></div><div class="detailListValue"><span>'+detailList[i].amount+'</span><span style="text-align:center">'+detailList[i].type+'</span><span>'+SwitchTime(detailList[i].createtime)+'</span></div></li>');
						}
					}else{
						$(".detailUl").append('<div class="ListNotData">没有数据！</div>');
					}
				}else{
					toast(data.msg); 
				}
			});
		}
	});
});