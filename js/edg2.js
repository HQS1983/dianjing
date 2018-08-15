//2018-05-06 00:15
//HQS

	//PC端的部分样式
    
    
    //moble/移动端部分js代码
    
    $("#icon_input").on("click",function(){
    	window.location = "seek.html";
	});
    
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
        var game_id  = $(this).attr("data-val")
//      if (game_id=='TheTotalList') {
//          game_id = ''
//      }
//      if ($(".Crunchies").attr("class").indexOf('avter')>0){
//          
//          TeamRecord('historyResults',game_id,'check_game',"all")
//      }else{
//          //近一周
//          TeamRecord('NearlyWeek',game_id, 'check_game',"w");
//
//      }
	});

    // 获取战队类型
    function UserP(){
        $.ajax({
            type:"get",
            url:"/api/userteam/",
            async:true,
            data:{"token":getCookie("yz_tk"),"user_id":getCookie("yz_id")},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    $(".TeamManage").addClass('dis_none')
                    $(".myTeam").removeClass('dis_none')
                    $("#team_icon").attr("src",res.team_icon)
                    $(".myTeam a").attr("href","edg_website.html?team_id="+res.team_id)
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                layer.msg(res)
            }
        });

    }
//  UserP();
    
    // 获取战队类型
    function TeamType(){
        $.ajax({
            type:"get",
            url:"/api/teamtype/",
            async:true,
            data:{},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html = ''
                    $.each(res.datas,function(i,item){
                        if (i ==0){
                            html +='<input class="inputClass inputClassColor inputClassBG" type="button" name="" id="type" value="'+item.name+'" />'
                            html +='<div class="typeList fix scrollable" data-open="0" data-maxHeight="'+res.datas.length+'">'
                        }
                        html +='<p class="ubclass" data-value ="'+i+'">'+item.name+'</p>'
                    });
                    html +='</div>'
                    $(".typeListDiv").append(html);
                    teamOnClick();
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });

    }
//  TeamType();
    // 明星战队
    function StarTeam(){
        $.ajax({
            type:"get",
            url:"/api/starteam/",
            async:true,
            data:{},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    $.each(res.datas,function(i,item){
                        var html = '<a class="game" href="edg_website.html?team_id='+item.id+'"><img src="'+item.team_icon+'"/></a>'
                        $(".StarTeam .content").append(html);
                    });
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });

    }
//  StarTeam();
    
	//明星队长
	function StarTeamLeader(){
		$.ajax({
			type:"get",
			url:"/api/starteamleader/",
			async:true,
			data:{},
			contentType:"application/json",
			dataType:"json",
			success:function(res){
				if ( res.code == 0 ) {
					$.each(res.datas,function(i,item){
                        var _url = "personal.html?user_id="+item.id
                        if (parseInt(item.id)==parseInt(getCookie("yz_id"))){
                            _url = 'userCenter.html'
                        }
                        var html = '<a class="game" href="'+_url+'"><img src="'+item.icon+'"/></a>'
						$(".TheCurrentEvent .content").append(html);
					});
				} else{
					console.log(res.msg);
				}
			},error:function(res){
				console.log(res.message);
			}
		});
	}
//	StarTeamLeader();

    
    function Img(img_list){
        var image = '';
        $.each(img_list,function(i,item){
            image += '<img src="'+item+'"/>'
        });
        return image;
    }
    
    function TeamRecord(c_name,game_id,performance_type,_type){
        $.ajax({
            type:"get",
            url:"/api/gameteam/",
            async:true,
            data:{"game_id":game_id,"offset":0,"limit":10,"type":_type},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    console.res
                    var html = '';
                    $.each(res.datas,function(i,item){
                        html +='<a href="edg_website.html?team_id='+item.team_id+'"><div class="list">'+
                                    '<span class="ranking">'+item.rank+'</span>'+
                                    '<span class="TeamName apostrophe">'+item.team_name+'</span>'+
                                    '<span class="teamLogo"><img src="'+item.team_icon+'"/></span>'+
                                    '<span class="member"><i class="" id="">'+item.has_member+'</i>/'+item.max_member+'</span>'+
                                    '<span class="totalNumber">'+item.join_game_num+'</span>'+
                                    '<span class="combatGains"><img src="img/public/icon_medal.png"/>'+item.competition_point+'</span>'+
                                '</div></a>'
                    });
                    if (res.datas.length==0) {
                        html +='<p class="noGame">暂无成绩信息~</p>'
                    }
                    if(performance_type=='check_game'){
                        $("."+c_name+" .CrunchiesRanking").html(html);
                    }else{
                        $("."+c_name+" .CrunchiesRanking").append(html);
                        
                    }
                 
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });


    }
//  TeamRecord('historyResults','',"","all");
//  TeamRecord('NearlyWeek','', '',"w");

    function test(game_id){
        console.log(game_id)
    }

	//创建战队
	$('.CreateTeam').on("click",function(){
//      if(getLoginStatus()){
    		popupArise();
    		$(".bg_content").removeClass("dis_none");
//      }
	});

//  function teamOnClick(){
        $(".typeList .ubclass").on("click",function(){
            $("#type").val($(this).text());
            $(".typeList").animate({height:"0rem",opacity:"0"},300);
            $(".typeList").attr("data-open","0");
        });
        
    	//创建战队  战队类型 下滑列表
    	$("#type").on("click",function(){
    		var typeListNum = parseInt($(".typeList").attr("data-open"));
    		var maxHeight = $(".typeList").attr("data-maxHeight");
    		if ( typeListNum == 0 ) {
    			$(".typeList").animate({height:(maxHeight*1.6)+"rem",opacity:"1"},300);
    			$(".typeList").attr("data-open","1");
    		} else{
    			$(".typeList").animate({height:"0rem",opacity:"0"},300);
    			$(".typeList").attr("data-open","0");
    		}
    	});
    	
    	$(".found").on("click",function(){
    		if ( $("#teamName").val() == "" ) {
    			layer.msg("战队名称不能为空！");
    			return false;
    		}
    		if ( $(".previewImg").attr("src") == "img/edg/previewBG.png" ) {
    			layer.msg("请上传战队徽章！");
    			return false;
    		}
    		
    		if ( $(".teamManifesto").val() == "" ) {
    			layer.msg("战队宣言不能为空！");
    			return false;
    		}
			
			$(".waitBg").removeClass("dis_none");
			
            var _data = {"token":getCookie('yz_tk'),
                "user_id":getCookie('yz_id'),"team_name":$("#teamName").val(),"team_details":$(".teamManifesto").val(),
                "team_type":$("#type").val()}
            var team_icon = $("#previewImg").attr("src");
            _data['team_icon'] = team_icon;
            var __data = JSON.stringify(_data);

            $.ajax({
                type:"post",
                url:"/api/gameteam/",
                data:__data,
                contentType:"application/json",
                dataType:"json",
                success:function(res){

                    if (res.code==0){
                    	$(".bg_content,.waitBg").addClass("dis_none");
                    	popupClose();
                    	
                        layer.msg(res.msg);

                        $('.TeamManage').addClass('dis_none');
                        $('.myTeam').removeClass('dis_none');
                        $('html').removeClass('noscroll');
                        $('#bg').removeClass('active');
                        $("#team_icon").attr('src',res.datas.team_icon)
                        $("#team_id").attr('href','edg_website.html?team_id=' +res.datas.team_id)
                        setCookie('team_id',res.datas.team_id)
                    }else if(res.code ==4009){
                        layer.msg(res.msg);
                        setInterval(function(){
                            window.location = "login.html";
                        },1000);
                    }else{
                    	$(".waitBg").addClass("dis_none");
                        layer.msg(res.msg);
                    }
                },error:function(res){
                    $(".waitBg").addClass("dis_none");
                    layer.msg('出错了')
                    layer.msg(res);
                }
            });
            
    	});
//  }

    // setCookie('token',getUrlParms('token'))
    
    
    	
	//排行榜  的游戏 列表
    function AllGame(){
        $.ajax({
            type:"get",
            url:"/api/game/",
            async:true,
            data:{"offset":0,"limit":500},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html = '<a class="aButton avter" id="TheTotalList">总榜</a>'
                    $.each(res.data,function(i,item){
                        html += '<a class="aButton" id="'+item.id+'" >'+item.game_name+'</a>'
                    });
                    $(".rankingList .content .gameList .fix").append(html);
                    
                    $(".aButton").on("click",function(){
                        var num = $(this).index();
                        var dataID = $(this).attr("id");

                        $("#historyResults").attr("data-val",dataID);
                        $("#NearlyWeek").attr("data-val",dataID);


                        var game_id  = $(this).attr("id")
                        if (game_id=='TheTotalList') {
                            game_id = ''
                        }
                        if ($(".Crunchies").attr("class").indexOf('avter')>0){
                            TeamRecord('historyResults',game_id,'check_game',"all")
                        }else{
                            //近一周
                            TeamRecord('NearlyWeek',game_id, 'check_game',"w");

                        }
						$(this).addClass("avter");
						$(this).siblings().removeClass("avter");
					});
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });       
    }
//  AllGame();
    
    
    //循环 排行榜 的游戏清单
	function gameList(){
		var html="",name="";
		for(var QQ=0; QQ<=9; QQ++ ){
			if (QQ=="0") {
				name="山海经异兽录";
			} else if (QQ=="1") {
				name="阴阳师";
			} else if (QQ=="2") {
				name="绝地求生";
			} else if (QQ=="3") {
				name="荒野行动";
			} else if (QQ=="4") {
				name="择天记";
			} else if (QQ=="5") {
				name="天涯明月刀";
			} else if (QQ=="6") {
				name="第五人格";
			} else if (QQ=="7") {
				name="楚留香";
			} else if (QQ=="8") {
				name="贪玩蓝月";
			} else if (QQ=="9") {
				name="王者荣耀";
			}
			html += '<a class="aButton" id="'+QQ+'">'+name+'</a>';
		}
		html2='<a class="aButton avter" id="TheTotalList">总榜</a>';
		$("#rankingList .gameList .fix").append(html2+html);
	}
	gameList();
	
	$(".aButton").on("click",function(){
	    var num = $(this).index();
	    var dataID = $(this).attr("id");
	
	    $("#historyResults").attr("data-val",dataID);
	    $("#NearlyWeek").attr("data-val",dataID);
	
	
	    var game_id  = $(this).attr("id")
//	    if (game_id=='TheTotalList') {
//	        game_id = ''
//	    }
//	    if ($(".Crunchies").attr("class").indexOf('avter')>0){
//	        TeamRecord('historyResults',game_id,'check_game',"all")
//	    }else{
//	        //近一周
//	        TeamRecord('NearlyWeek',game_id, 'check_game',"w");
//	
//	    }
		$(this).addClass("avter");
		$(this).siblings().removeClass("avter");
		var html="";
		$(".historyResults .CrunchiesRanking").html(html);
		$(".NearlyWeek .CrunchiesRanking").html(html);
		historyResults(num);
		NearlyWeek(num);
		console.log(num);
	});
	
	//循环 历史成绩
	function historyResults(gameOrder){
		var html="";
		if (gameOrder==undefined) {
			gameOrder1="";
		}else{
			gameOrder1=gameOrder;
		}
		for(var QQ=1; QQ<=10; QQ++ ){
			html += '<a href="edg_website.html">'+
						'<div class="list">'+
							'<span class="ranking">'+gameOrder1+QQ+'</span><span class="TeamName apostrophe">你好</span>'+
							'<span class="teamLogo"><img src="img/public/icon_Crunchies'+QQ+'.png"></span>'+
							'<span class="member"><i class="" id="">1</i>/50</span>'+
							'<span class="totalNumber">30</span><span class="combatGains"><img src="img/public/icon_medal.png">30</span>'+
						'</div>'+
					'</a>';
		}
		$(".historyResults .CrunchiesRanking").append(html);
	}
	historyResults();
	
	$(window).scroll(function(){
     
        var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
        var scrollHeight = $(document).height();   //当前页面的总高度
        var clientHeight = $(this).height();    //当前可视的页面高度
        if(scrollTop + clientHeight >= scrollHeight){   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部 count++;         //每次滑动count加1
          // filterData(serviceTypeId,industryId,cityId,count); //调用筛选方法，count为当前分页数
            if ( $(".CrunchiesRanking").attr("class").indexOf("avter")>-1){
				TeamRecord(0,5,'historyResults','',"","all");
    			TeamRecord(0,5,'NearlyWeek','', '',"w");
            }else{

            }
          console.log('下拉bottom');
     
        }
        // else if(scrollTop<=0){
        //   //滚动条距离顶部的高度小于等于0 
        //   //alert("下拉刷新，要在这调用啥方法？");
     //         console.log('上拉top');
        // }
    });
	
	//循环 近一周
	function NearlyWeek(gameOrder){
		var html="";
		if (gameOrder==undefined) {
			gameOrder1="";
		}else{
			gameOrder1=gameOrder;
		}
		for(var QQ=1; QQ<=10; QQ++ ){
			html += '<div class="list">'+
						'<span class="ranking">'+gameOrder1+QQ+'</span>'+
						'<span class="TeamName apostrophe">DSAA</span>'+
						'<span class="teamLogo"><img src="img/public/icon_Crunchies'+QQ+'.png"/></span>'+
						'<span class="member"><i class="" id="">30</i>/50</span>'+
						'<span class="totalNumber">120</span>'+
						'<span class="combatGains"><img src="img/public/icon_medal.png"/>70</span>'+
					'</div>';
		}
		$(".NearlyWeek .CrunchiesRanking").append(html);
	}
	NearlyWeek();