//2018-07-28  23:27:14
//HQS

$(function(){
	
	//PC端的部分样式


    
    //2018-07-28  23:27:14
	//HQS
    //moble/移动端部分js代码
       
    $(".privateLetter,.giveReward").on("click",function(){
    	layer.msg("此功能暂未开放！");
    });
    
    $("#unfold1").on("click",function(){
    	$(".main").css({height:"auto",overflow:"auto"});
    	$(this).addClass("dis_none");
    	$("#unfold2").removeClass("dis_none");
	});
    $("#unfold2").on("click",function(){
    	$(".main").css({height:"6rem",overflow:"hidden"});
    	$(this).addClass("dis_none");
    	$("#unfold1").removeClass("dis_none");
	});
    
    $(".Crunchies").on("click",function(){
    	if ( $(this).index() == 0 ) {
    		$(this).addClass("avter");
    		$(this).siblings().removeClass("avter");
    		$(".TeamLIst").removeClass("dis_none");
    		$(".EventsLIst").addClass("dis_none");
    	} else{
    		$(this).addClass("avter");
    		$(this).siblings().removeClass("avter");
    		$(".EventsLIst").removeClass("dis_none");
    		$(".TeamLIst").addClass("dis_none");
    	}
	});
	

    // 顶部个人信息
    function UserMessage(){
        $.ajax({
            type:"get",
            url:"/api/checkusermessge/",
            async:true,
            data:{"user_id":getUrlParms('user_id')},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html = '';
                    var honor = '';
                    var rihgt_html = '';
                    var Dblist_html = '';
                    $.each(res.datas,function(i,item){
                        console.log(item)
                        if (item.honor.length>0){
                            honor = item.honor[0].events_title + item.honor[0].rank
                        }
                        html +='<div class="info_left_top fix">'+
                                    '<div class="icon_head"><img src="'+item.icon+'"/></div>'+
                                    '<div class="title fix">'+
                                        '<img class="gender" src="img/public/icon_gender_woman.png"/><p class="oneHP apostrophe">'+item.nickname+'</p>'+
                                    '</div>'+
                                    // '<div class="gameList fix">'+
                                    //     '<img src="img/public/icon_AllGames1.png"/>'+
                                    //     '<img src="img/public/icon_AllGames2.png"/>'+
                                    //     '<img src="img/public/icon_AllGames3.png"/>'+
                                    // '</div>'+
                                '</div>'+
                                '<div class="info_left_bottom fix">'+
                                //     '<p class="apostrophe">吧龄<span>2.3</span></p>'+
                                //     '<p class="apostrophe">发帖数<span>23456</span></p>'+
                                    '<p class="apostrophe">战队<span>'+item.team_name+'</span></p>'+
                                    '<p class="apostrophe">荣誉<span>'+honor+'</span></p>'+
                                '</div>'
                        // rihgt_html +='<p class="apostrophe"><img src="img/public/icon_Hoovies.png"/>0</p>'+
                        //                 '<a class="acquire" id="acquire" href="javascript:;">获取彩豆</a>'+
                        //                 '<a class="ItemMall" id="ItemMall" href="javascript:;">道具商城</a>'+
                        //                 '<img class="icon_teamLogo" src="'+item.team_icon+'"/>'
                        rihgt_html += '<img class="icon_teamLogo" src="'+item.team_icon+'"/>'

                        
                    });
                    $(".information .info_left").append(html);
                    $(".information .info_right").append(rihgt_html);
                } else{
                    layer.msg(res.msg+'error');
                }
            },error:function(res){
                layer.msg(res.message);
            }
        });

    }
//  UserMessage();


    //个人荣誉
    function personalHonor(){
        $.ajax({
            type:"get",
            url:"/api/personalhonor/",
            async:true,
            data:{"user_id":getUrlParms('user_id')},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html="";
                    $.each(res.datas,function(i,item){
                        var rank = item.rank
                        console.log(rank)
                        html += '<div class="events shadow2 fix ">'+
                                    '<a class="fix" href="competition.html?'+item.event_id+'">'+
                                        '<div class="eventsMain">'+
                                            '<p class="description apostrophe"><img src="'+item.game_icon+'"/>'+item.event_title+'</p>'+
                                            '<p class="eventsName">'+item.event_type_name+'</p>'+
                                            '<p class="eventsTime">'+item.create_time+'</p>'+
                                        '</div>'+
                                        '<div class="trophyx" href="javascript:;"><img src="img/edg_website/icon_copper.png"/></div>'+
                                    '</a>'+
                                '</div>';

                    })
                    if (html!=""){
                        $(".personalHonor .content").append(html);
                        
                    }else{
                        $(".notHave").removeClass("dis_none")
                    }

                } else{
                    layer.msg(res.msg);
                }
            },error:function(res){
                layer.msg(res.message);
            }
        });
    }
//  personalHonor();
    
    
	//共同关注
	function eyesOn(){
		var html="";
		for(var zz=0;zz<=4;zz++ ){
			html += '<a class="module fix" href="javascript:;">'+
						'<div class="common fix"><img src="img/personal/icon_common1.png"/></div>'+
						'<div class="matter">'+
							'<p class="title apostrophe">'+zz+'电子竞技吧</p>'+
							'<p class="describe apostrophe">他发过<span class="num">233</span>帖</p>'+
						'</div>'+
					'</a>';
		}
		$(".eyesOn .content .events").append(html);
	}
	eyesOn();
	
	
	//发帖动态
	function PostingDynamic(){
		var html="";
		var rhesis ="";
		var imgURL="";
		for(var qj=0;qj<=3;qj++ ){
			if (qj == 0) {
				rhesis ="天若赐予我辉煌、我必比天更嚣张";
			} else if (qj == 1){
				rhesis ="龙有逆鳞，狼有暗刺。窥之者怒，触之者死";
				imgURL ='<img class="illustration" title="配图" src="img/personal/img.jpg"/>';
			} else if (qj == 2){
				rhesis ="杀一是为罪，屠万是为雄；屠得九百万，即为雄中雄";
				imgURL ='<img class="illustration" title="配图" src="img/personal/img.jpg"/>';
			} else if (qj == 3){
				rhesis ="谁无虎落平阳日，待我风云再起时。有朝一日龙得水，我叫长江水逆流。有朝一日虎归山，我定血染半边天。";
				imgURL ='<img class="illustration" title="配图" src="img/personal/img.jpg"/>';
			}
			html += '<div class="events shadow2 fix">'+
						'<div class="leftTime">'+
							'<span class="day">'+2+qj+'</span>'+
							'<span class="month">八月</span>'+
						'</div>'+
						'<div class="right fix">'+
							'<div class="topFunction fix">'+
								'<p class="status">个人主页</p>'+
								'<p class="talk fix">'+rhesis+'</p>'+
								imgURL+
							'</div>'+
							'<div class="bottomFunction">'+
								'<p class="like apostrophe"><a class="icon_like" id="icon_like1" href="javascript:;"><img src="img/personal/icon_like.png"/><span>'+2+qj+1+'</span></a></p>'+
								'<p class="criticism"><a class="icon_criticism" id="icon_criticism1" href="javascript:;"><img src="img/personal/icon_criticism.png"/>评论(<span class="num">+'+2+qj+'</span>)</a></p>'+
								'<p class="share"><a class="icon_share" id="icon_share1" href="javascript:;"><img src="img/personal/icon_share.png"/>分享</a></p>'+
							'</div>'+
						'</div>'+
					'</div>';
		}
		$(".PostingDynamic .content").append(html);
	}
	PostingDynamic();
	
	//评论
    $(".icon_share1,.icon_criticism").on("click",function(){
    	layer.msg("此功能暂未开放，敬请期待！");
    });
	
	//点赞
	$(".icon_like").on("click",function(){
		var imgSRC = $(this).children("img").attr("src");
		var totality = parseInt($(this).children("span").text());
		if( imgSRC == "img/personal/icon_like.png" ){
			$(this).children("img").attr("src","img/personal/icon_likewin.png");
			$(this).children("span").text(totality+1);
			$(this).children("span").css("color","#23bf06");
		}else{
			return false;
		}
	});
});
