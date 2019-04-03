$(document).bind("plusready",function(){
	
	//设定购买接口
	var ctocUrl = mainUrl +"trade/index";
	
	getCtocData();
	
	//获取页面对象
	var ctocView = plus.webview.currentWebview();
	
	//开启页面下拉刷新
	ctocView.setPullToRefresh({support:true,style:'circle',offset:'45px'},getCtocData);
	
	//为发布广告绑定事件
	$("#contorlIssue").bind("tap",function(){
		goView("issue.html","issue",{spaceValue:"true"});
	});
	
	//定义获取卖单数据列表
	function getCtocData(){
		$(".ctocUl").html("");
		//发起请求
		requestToken(ctocUrl,"get",{},function(data){
			if(data.code == 1){
				$("#price").text(data.data.price);
				$("#todayamount").text(data.data.todayamount);
				var list = data.data.list;
				if(list.length){
					for(var i=0;i<list.length;i++){
						$(".ctocUl").append('<li><span style="width:20%">'+list[i].username+'</span><span style="width:35%">'+list[i].totalnum+'<i>/'+list[i].sellnum+'</i></span><span style="width:25%;color:#f6ab10;">'+list[i].price+'</span><span style="width:20%;text-align:right"><a class="ctocCxBut" data-idValue="'+list[i].id+'">出售</a></span></li>');
					}
					//为所有的购买按钮绑定事件
					$(".ctocCxBut").bind("tap",function(){
						//获取id值
						var idVaule = $(this).attr("data-idValue");
						//前往页面
						goView("ctocin.html","ctocin",{spaceValue:"true",ctocId:idVaule});
					});
				}else{
					$(".ctocUl").html('<div class="ListNotData">没有记录</div>'); 
				}
				
				ctocView.endPullToRefresh();
			}else{
				ctocView.endPullToRefresh();
				toast(data.msg);
			}
		});
	}
});
