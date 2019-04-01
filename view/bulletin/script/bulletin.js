window.addEventListener("load",function(){
	document.addEventListener("plusready",function(){
		
		//定义请求
		var bulletinUrl = mainUrl + "cms/channel";
		
		getBulletinData();
		
		//获取页面对象
		var bulleView = plus.webview.currentWebview();
		
		//开启页面下拉刷新
		bulleView.setPullToRefresh({support:true,style:'circle',offset:'45px'},getBulletinData);
		
		function getBulletinData(){
			$("#bulletinList").html("");
			//发起请求
			requestToken(bulletinUrl,"get",{},function(data){
				if(data.code == 1){
					var list = data.data.data;
					if(list.length){
						for(var i=0;i<list.length;i++){
							$("#bulletinList").append('<li data-conttype="'+list[i].id+'"><div>'+list[i].title+'</div><span>'+SwitchTime(list[i].createtime)+'</span></li>');
						}
					}else{
						$("#bulletinList").html('<div class="ListNotData">没有数据！</div>');
					}
					//为各个栏目绑定事件
					$("#bulletinList>li").bind("tap",function(){
						//获取id值
						var contId = $(this).attr("data-conttype");
						goView("../../spaceview/bulletin/bulletincontent.html","bulletincontent",{spaceValue:"true",contIdValue:contId});
					});
					bulleView.endPullToRefresh();
				}else{
					bulleView.endPullToRefresh();
					toast(data.msg);
				}
			});
		}
	});
});