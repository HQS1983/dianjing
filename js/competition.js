//2018-05-06 00:15
//HQS

$(function(){

	//PC端的部分样式
    	
    $(".Crunchies").on("click",function(){
    	if ( $(this).index() == 0 ) {
    		$(this).addClass("avter");
    		$(this).siblings().removeClass("avter");
    		$(".historyResults").removeClass("dis_none");
    		$(".NearlyWeek").addClass("dis_none");
    	} else{
    		$(this).addClass("avter");
    		$(this).siblings().removeClass("avter");
    		$(".NearlyWeek").removeClass("dis_none");
    		$(".historyResults").addClass("dis_none");
    	}
	});



    
    //moble/移动端部分js代码
    //四个按钮切换
	$(".aButton").on("click",function(){
    	var numIndex = $(this).index();
		$(this).addClass("avter");
		$(this).siblings().removeClass("avter");
		$(".divContent").eq(numIndex).removeClass("dis_none");
		$(".divContent").eq(numIndex).siblings().addClass("dis_none");
	});


    // 获取战队类型
    function EventDetails(){
        $.ajax({
            type:"get",
            url:"/api/checkevent/",
            async:true,
            data:{"event_id":getUrlParms('event_id')},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html = '';
                    $.each(res.datas,function(i,item){
                        html +='<div class="events shadow2 fix">'+
                                    '<a class="fix" href="competition.html">'+
                                        '<p class="description"><img src="img/public/icon_AllGames1.png"/>'+item.events_title+'</p>'+
                                        '<p class="money"><img src="img/public/icon_PopularEvents1.png"/>'+item.total_bonus+'</p>'+
                                        '<p class="time"><img src="img/public/icon_PopularEvents2.png"/>'+item.apply_start_time+' 报名开始</p>'+
                                        '<p class="number"><img src="img/public/icon_PopularEvents3.png"/>'+item.has_teams+'/'+item.max_teams+'</p>'+
                                        '<p class="condition"><span class="bgCondition1"></span>'+item.status+'</p>'+
                                        '<p class="category bgColor1"><span>'+item.gt_name+'</span></p>'+
                                    '</a>'+
                                '</div>';
                        html +='<div class="synopsis shadow2 fix">'+
                                    '<p class="title">赛事简介1</p>'+
                                    '<p class="details">'+item.introduce+'</p>'+
                                '</div>';
                        html +='<div class="bonus fix">';
                        $.each(res.award_d,function(i,award){
                            var image_url = ''
                            var details = ''
                            var rank  = award.rank
                            if(rank==1){
                                image_url = 'img/competition/icon_gold.png'
                                details ='冠军'
                            }else if (rank ==2){
                                image_url = 'img/competition/icon_silver.png'
                                details = '亚军'
                            }else{
                                image_url='img/competition/icon_copper.png'
                                details = '季军'
                            }
                            html +='<div class="Chemistry">'+
                                        '<img src="'+image_url+'"/>'+
                                        '<div class="TeamName">'+details+'&nbsp;'+
                                            '<span class="CrunchiesBG CrunchiesBG1"></span>'+
                                            '<span class="num">'+rank+'</span>'+
                                        '</div>'+
                                    '</div>';
                        });
                        html +='</div>';
                        html  +='<div class="content shadow2 fix">'+
                                    '<p class="title">赛事规则</p>'+
                                    '<p class="details">'+item.rule+'</p>'+
                                '</div>';
                    });
                    $(".event_details").append(html);
                } else{
                    layer.msg(res.msg)
                }
            },error:function(res){
                console.log(res.message);
            }
        });

    }
//  EventDetails();

	//循环要报名 的队员
	function takePart(){
		var Html = "";
		for (var i=0; i <= 10; i++) {
			Html += '<div class="selectDiv fix">'+
						'<div class="module module1"><div class="borderDiv"><span id="'+i+'" class="pitchUp moduleBGcolor1" data-val="0"></span></div></div>'+
						'<div class="module module2"><img class="playerLogo" src="img/icon_head.png"></div>'+
						'<div class="module module3"><span class="playerName apostrophe">'+i+'金刚狼</span></div>'+
					'</div>';
		}
		$(".takePart .content").html(Html);
//		pitchUp();
		// EntryAffirm();
	}
	

	//点击出现报名框
	$(".share2").on("click",function(){
		popupArise();
		takePart();
		$('.takePart').removeClass('dis_none');
		event_id = getUrlParms('event_id')
//      $.ajax({
//          type:"get",
//          url:"/api/teamjoingame/",
//          async:true,
//          data:{"event_id":event_id,"user_id":getCookie("yz_id"),"token":getCookie("yz_tk")},
//          contentType:"application/json",
//          dataType:"json",
//          success:function(res){
//              if ( res.code == 0 ) {
//	                var max_members = parseInt(res.datas.team_num)
//                  var html = '<p class="style title">报名表&nbsp;&nbsp;<span><i class="playerNum">0</i>/'+max_members+'</span></p>'+
//								'<p class="style1 eventsName">赛事名称：<span>'+res.datas.event_name+'</span></p>'+
//								'<p class="style1 gameType">游戏类型：<span>'+res.datas.game_name+'</span></p>'+
//								'<p class="style1 teamMember">可参赛队员：</p>'+
//								'<div class="content fix scrollable">';
//                  $.each(res.datas.user_datas,function(i,item){
//						html += '<div class="selectDiv fix">'+
//									'<div class="module module1"><div class="borderDiv"><span id="'+item.id+'" class="pitchUp moduleBGcolor1" data-val="0"></span></div></div>'+
//									'<div class="module module2"><img class="playerLogo" src="'+item.icon+'"></div>'+
//									'<div class="module module3"><span class="playerName">'+item.nickname+'</span></div>'+
//								'</div>';
//                  });
//                  var _p  = res.datas.team_num + ',' + event_id
//                  // pitchUp()
//                  html +='</div>'+
//							'<div class="buttonDiv"><button class="leftButton" id="EntryAffirm" type="button" onclick="EntryAffirm('+_p+')">确认报名</button></div>'+
//							'<span class="ShutDown" id="" onclick="ShutDown(this)">X</span>'
//                  $(".takePart").html(html);
					//选择  参赛队员
					$(".pitchUp").on("click",function(){
						var dataVal = $(this).attr("data-val");
						var playerNum = parseInt($(".playerNum").text());
						if( playerNum+1>max_members && dataVal == 0 ){
							return false;
						} else{
							if(playerNum-1<=max_members && dataVal == 1 ){
								$(this).attr("data-val","0");
								$(this).removeClass("moduleBGcolor2").addClass("moduleBGcolor1");
								$(".playerNum").text( playerNum-1 );
								$(".pitchUp[data-val='0']").parent().css("border-color","#787878");
				
							}
							if(playerNum+1<=max_members && dataVal == 0 ){
								$(this).attr("data-val","1");
								$(this).removeClass("moduleBGcolor1").addClass("moduleBGcolor2");
								$(".playerNum").text( playerNum+1 );
								if (playerNum+1==max_members) {
									$(".pitchUp[data-val='0']").parent().css("border-color","#C0C0C0");
									return false;
								}
							}
						}
					});
	        		popupArise();
					$('.takePart').removeClass('dis_none');
//              } else{
//                  layer.msg(res.msg)
//              }
//          },error:function(res){
//              console.log(res.message);
//          }
//     	});
	});


	/*战队主页   一键招募*/
	$(".share1,.share3").on('click', function() {
		popupArise();
		$('.share').removeClass('dis_none');

		$(".hideAside").on('click', function() {
			if ( $(".share").attr("class") == "share fix" ) {
				popupClose();
				$('.share').addClass('dis_none');
			} else{
				return false;
			}
		});
	});

	//确认  选择  参赛队员
	function EntryAffirm(max_members,event_id){
	    var dataVal = $(this).attr("data-val");
	    var playerNum = parseInt($(".playerNum").text());
	    var ar = new Array()
	    $.each($(".moduleBGcolor2"),function(i,e){
	        ar.push($(e).attr('id'))
	    })
	    if( playerNum  <parseInt(max_members )){
	        msg =  "参赛人数不足"+max_members+"个，请选择"+max_members+"个人！"
	        layer.msg(msg);
	        return false;
	    }
	    
	    popupClose();
	    $.ajax({
	        type:"post",
	        url:"/api/tournament/",
	        async:true,
	        data:JSON.stringify({"token":getCookie('yz_tk'),
	        "user_id":getCookie('yz_id'),"event_id":event_id,"u_l":ar}),
	        contentType:"application/json",
	        dataType:"json",
	        success:function(res){
	            if ( res.code == 0 ) {
	                $('.takePart').addClass('dis_none');
	                layer.msg(res.msg);
	            } else{
	                layer.msg(res.msg);
	            }
	        },error:function(res){
	            // console.log(res);
	        }
	    });
	}
	
	//赛事详情-大逃杀  开始
	//赛程
	//比赛结束后 生成  全场最佳
	function chunk(){
		var html="";
		for(var o=0;o<=2;o++ ){
			html += '<div class="chunk">'+
						'<div class="mold">'+
							'<img src="img/competition/icon_integral.png"/>'+
						'</div>'+
						'<div class="equal first">'+
							'<div class="space">'+
								'<img src="img/edg/captain1.png"/>'+
							'</div>'+
							'<p class="name apostrophe">'+o+'暴风眼</p>'+
							'<p class="count apostrophe">520</p>'+
						'</div>'+
						'<div class="equal second">'+
							'<div class="space">'+
								'<img src="img/edg/captain2.png"/>'+
							'</div>'+
							'<p class="name apostrophe">2暴风眼</p>'+
							'<p class="count apostrophe">123</p>'+
						'</div>'+
						'<div class="equal third">'+
							'<div class="space">'+
								'<img src="img/edg/captain3.png"/>'+
							'</div>'+
							'<p class="name apostrophe">2暴风眼</p>'+
							'<p class="count apostrophe">88</p>'+
						'</div>'+
					'</div>';
		}
		$(".best .content").append(html);
	}
	chunk();
	
	//赛程  分组  类别
	function set(){
		var html="";
		var letter="";
		for(var o=0;o<=3;o++ ){
			if ( o == 0 ) {
				letter = "A";
			}else if( o == 1 ){
				letter = "B";
			}else if( o == 2 ){
				letter = "C";
			}else if( o == 3 ){
				letter = "D";
			}
			html += '<button class="set" type="button">'+letter+'组</button>';
		}
		$(".arrange .content .grouping .right").append(html);
		$(".arrange .content .grouping .right").children().eq(0).addClass("avter");
	}
	set();
	
	
	//赛程  分组  次数  第几轮
	function leftCategory(){
		var html="";
		var letter="";
		for(var o=2;o>=0;o-- ){
			if ( o == 0 ) {
				letter = "一";
			}else if( o == 1 ){
				letter = "二";
			}else if( o == 2 ){
				letter = "三";
			}
			html += '<span class="category categoryButton">第'+letter+'轮</span>';
		}
		$(".arrange .content .block .left").append(html);
		$(".arrange .content .block .left").children().eq(0).addClass("avtie");
	}
	leftCategory();
	$(".categoryButton").on("click",function(){
    	var numIndex = $(this).index();
		$(this).addClass("avtie");
		$(this).siblings().removeClass("avtie");
//		$(".divContent").eq(numIndex).removeClass("dis_none");
//		$(".divContent").eq(numIndex).siblings().addClass("dis_none");
	});
	
	
	//赛程  分组  排名
	function CrunchiesRanking(){
		var html="";
		for(var o=0;o<=11;o++ ){
			html += '<a href="javascript:;">'+
						'<div class="list">'+
							'<span class="ranking">'+(o+1)+'</span>'+
							'<span class="TeamName apostrophe">'+o+2+'</span>'+
							'<span class="teamLogo"><img src="img/public/icon_Crunchies1.png"></span>'+
							'<span class="member">50</span>'+
							'<span class="totalNumber">30</span><span class="combatGains">30</span>'+
						'</div>'+
					'</a>';
		}
		$(".arrange .content .block .right .historyResults .CrunchiesRanking").append(html);
	}
	CrunchiesRanking();
	
	//选择ABCD组
	$(".set").on("click",function(){
		var numIndex = $(this).index();
		$(this).addClass("avter");
		$(this).siblings().removeClass("avter");
//		$(".divContent").eq(numIndex).removeClass("dis_none");
//		$(".divContent").eq(numIndex).siblings().addClass("dis_none");

	});
	//赛事详情-大逃杀  结束
	





	
	//赛事详情-对抗  开始
	//对阵图、赛程、排行
	$(".classification").on("click",function(){
//		$(this).index();
		$(this).addClass("avter");
		$(this).siblings().removeClass("avter");
		if ( $(this).index()==0 || $(this).index()==1 ) {
			$(".first .module2").removeClass("dis_none");
			if($(this).index()==0){
				$(".box1").removeClass("dis_none");
				$(".box1").siblings().addClass("dis_none");
			}else{
				$(".box2").removeClass("dis_none");
				$(".box2").siblings().addClass("dis_none");
			}
			$(".first .module2").attr("data-val",$(this).index());
		} else{
			$(".first .module2").addClass("dis_none");
			$(".box3").removeClass("dis_none");
			$(".box3").siblings().addClass("dis_none");
		}
	});
	//小组赛、淘汰赛、决赛
	$(".grouping").on("click",function(){
		var dataVal = $(this).parent().parent().attr("data-val");
		$(this).addClass("avter");
		$(this).siblings().removeClass("avter");
		if (dataVal==0) {
			$(".box1 .sortTitle").text($(this).text());
		} else{
			$(".box2 .contentTitle").text($(this).text());
		}
	});
	
	//排行   比赛结束后 生成  全场最佳
	function chunk2(){
		var html="";
		for(var o=0;o<=2;o++ ){
			html += '<div class="chunk">'+
						'<div class="mold">'+
							'<img src="img/competition/icon_integral.png"/>'+
						'</div>'+
						'<div class="equal first">'+
							'<div class="space">'+
								'<img src="img/edg/captain1.png"/>'+
							'</div>'+
							'<p class="name apostrophe">'+o+'暴风眼</p>'+
							'<p class="count apostrophe">520</p>'+
						'</div>'+
						'<div class="equal second">'+
							'<div class="space">'+
								'<img src="img/edg/captain2.png"/>'+
							'</div>'+
							'<p class="name apostrophe">2暴风眼</p>'+
							'<p class="count apostrophe">123</p>'+
						'</div>'+
						'<div class="equal third">'+
							'<div class="space">'+
								'<img src="img/edg/captain3.png"/>'+
							'</div>'+
							'<p class="name apostrophe">2暴风眼</p>'+
							'<p class="count apostrophe">88</p>'+
						'</div>'+
					'</div>';
		}
		$(".best2 .content").append(html);
	}
	chunk2();
	
	//赛程    排行
	function CrunchiesRanking2(){
		var html="";
		for(var o=0;o<=9;o++ ){
			html += '<a href="javascript:;">'+
						'<div class="list">'+
							'<span class="ranking">'+(o+1)+'</span>'+
							'<span class="TeamName apostrophe">'+o+2+'</span>'+
							'<span class="teamLogo"><img src="img/public/icon_Crunchies'+(o+1)+'.png"></span>'+
							'<span class="member">50</span>'+
							'<span class="totalNumber">30</span><span class="combatGains">30</span>'+
						'</div>'+
					'</a>';
		}
		$(".box3 .CrunchiesRanking").append(html);
	}
	CrunchiesRanking2();
	
	//赛事详情-对抗  结束
});

	

