$(document).bind("plusready",function(){
	//定义专区列表接口
	var getItemUrl = mainUrl + "hbgame/arealist";
	
	gameHbHomeRequestFun();


	//定义请求函数
	function gameHbHomeRequestFun(){
		//发起请求获取数据
		requestToken(getItemUrl,"get",{},function(data){
			if(data.code == 1){
				var listValue = data.data.area_list;
				var fuliValue = data.data.fl_area;
				if(listValue.length){
					for(var i=0;i<listValue.length;i++){
						$(".gameMainBox").append('<div class="gameItem"><div class="gameItemIcon"><img src="img/hbicon.png" /></div><div class="gameItemText"><div>'+listValue[i].name+'</div></div><div class="gameItemBut"><a data-vip="'+listValue[i].type+'" data-idName="'+listValue[i].id+'" data-type="'+listValue[i].name+'">进入专区</a></div></div>');
					}
					
					$(".gameHbHomeDb").attr({"data-idName":fuliValue.id}); 
					$(".gameHbHomeDb").attr({"data-titleName":fuliValue.name});
					$(".gameHbHomeDb").attr({"data-num":fuliValue.number});
					
					//为进入房间按钮绑定事件
					$(".gameItemBut>a").bind("tap",function(){
						//获取自定义属性
						var roomType = $(this).attr("data-type");
						var roomid = $(this).attr("data-idName");
						var vipToggle = $(this).attr("data-vip");
						
						if(vipToggle == "2"){
							toast("暂未开放!");
							return;
						}
						
						//前往房间
						goView("gameRoom.html","gameRoom",{spaceValue:"true",roomTitle:roomType,roomIdValue:roomid});
					});
					
					//福利房间入口绑定事件
					$(".gameHbHomeDb").bind("tap",function(){
						//获取数据
						var mainName = $(this).attr("data-titleName");
						var mainIdName = $(this).attr("data-idName");
						var mainNum = $(this).attr("data-num");
						//前往红包游戏页面
						goView("gameHbMain.html","gameHbMain",{spaceValue:"true",roomIdValue:mainIdName,roomTitle:mainName,roomNum:mainNum,toggle:"true"});
					});
					
				}else{
					$(".gameMainBox").html('<div class="ListNotData">暂无专区！</div>');
				}
			}else{
				toast(data.msg);
			}
		});
	}
});
