$(document).bind("plusready",function(){
	//获取房间标题数据
	var RoomTitle = plus.webview.currentWebview().roomTitle;
	
	//获取专区id
	var RoomIdNam = plus.webview.currentWebview().roomIdValue;
	
	//获取toggle值
	var toggleValue = plus.webview.currentWebview().toggle;
	
	//定义获取房间URL
	var getRoomUrl = mainUrl + "hbgame/roomlist";
	
	getRoomFun();
	
	
	//渲染房间标题
	$("#gameRoomTitle").text(RoomTitle);
	
	//为游戏说明绑定事件
	
	$("#gameexplain").bind("tap",function(){
      //前往说明页面
      goView("gameexplain.html","gameexplain",{spaceValue:"true"});
    });
	
	//定义获取房间列表函数
	function getRoomFun(){
		requestToken(getRoomUrl,"get",{id:RoomIdNam},function(data){
			if(data.code == 1){
				var roomList = data.data;
				if(roomList.length){
					for(var i=0;i<roomList.length;i++){
						var lineNum = roomList[i].number;
						var maxNum = roomList[i].max_num;
						var degree = (lineNum/maxNum)*100;
						var className1 = "";
						var className2 = "";
						var statusName = ""
						if(degree<10){
							className1 = "gameRoomStatusColor1";
							className2 = "gameRoomStatusTextColor1";
							statusName = "空闲";
						}else if(degree<70){
							className1 = "gameRoomStatusColor2";
							className2 = "gameRoomStatusTextColor2";
							statusName = "流畅";
						}else if(degree<90){
							className1 = "gameRoomStatusColor3";
							className2 = "gameRoomStatusTextColor3";
							statusName = "拥挤";
						}else if(degree<=100){
							className1 = "gameRoomStatusColor4";
							className2 = "gameRoomStatusTextColor4";
							statusName = "爆满";
						}
						$(".gameRoomListBox").append('<div class="gameRoomItem" data-Pmax="'+maxNum+'" data-Pnum="'+lineNum+'" data-personNm="'+roomList[i].number+'" data-roomTitle="'+roomList[i].name+'" data-roomId="'+roomList[i].id+'"><div class="gameRoomItemHead"><div>'+roomList[i].name+'</div><div class="gameRoomRightIcon"><img src="img/gameInIcon.png" /></div></div><div class="gameRoomTextBox">当前人数：<i>'+roomList[i].number+'</i></div><div class="gameRoomPbarBox"><div class="gameRoomPbar"><span class="gameRoomPbarValue '+className1+'" style="width:'+degree+'%"></span></div><div class="gameRoomStatusText '+className2+'">'+statusName+'</div></div></div>');
					}
					//为房间绑定事件
					$(".gameRoomItem").bind("tap",function(){
						//获取数据
						var numV = $(this).attr("data-Pnum");
						var maxV = $(this).attr("data-Pmax");
						
						if(maxV - numV  <= 0){
							toast("该房间已满！");
							return;
						}
						//获取id值
						var thisId = $(this).attr("data-roomId");
						//获取房间号
						var thisNm = $(this).attr("data-roomTitle");
						//获取人数
						var personNm = $(this).attr("data-personNm");
						
						if(toggleValue){
							//前往游戏主页
							goView("gameHbMain.html","gameHbMain",{spaceValue:"true",roomIdValue:thisId,roomTitle:thisNm,roomNum:personNm,toggle:"1"});
						}else{
							//前往游戏主页
							goView("gameHbMain.html","gameHbMain",{spaceValue:"true",roomIdValue:thisId,roomTitle:thisNm,roomNum:personNm});
						}
					});
				}else{
					$(".gameRoomListBox").html('<div class="ListNotData">暂无房间</div>');
				}
			}else{
				toast(data.msg);
			}
			
		});
	}
});
