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
	});
    
    
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
    	
    	$("#file").change(function() {
    		var objUrl = getObjectURL(this.files[0]);
            if (this.files[0].size > 1050356 ) {
                layer.msg("图片不能大于1MB");
                return false;
            }else{
        		if (objUrl) {
        			$(".previewImg").attr("src", objUrl);
        		}
            }

            var imgUrl = objUrl;
	        window.URL = window.URL || window.webkitURL;
	      	var xhr = new XMLHttpRequest();
	      	xhr.open("get", imgUrl, true);
	      	// 至关重要
	      	xhr.responseType = "blob";
	      	xhr.onload = function () {
		        if (this.status == 200) {
		          	var blob = this.response;
		          	let oFileReader = new FileReader();
		          	oFileReader.onloadend = function (e) {
			            let base64 = e.target.result;
			            $("#imgBase").val(base64);
			            return base64;
		          	};
		
		          	oFileReader.readAsDataURL(blob);
		 
		        }
	      	}
      		xhr.send();
    	});
    	//建立一個可存取到該file的url
    	function getObjectURL(file) {
    		var url = null;
    		if (window.createObjectURL != undefined) { // basic
    			url = window.createObjectURL(file);
    		} else if (window.URL != undefined) { // mozilla(firefox)
    			url = window.URL.createObjectURL(file);
    		} else if (window.webkitURL != undefined) { // webkit or chrome
    			url = window.webkitURL.createObjectURL(file);
    		}
    		return url;
    	}
    	
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

            var _data = {"token":getCookie('yz_tk'),
                "user_id":getCookie('yz_id'),"team_name":$("#teamName").val(),"team_details":$(".teamManifesto").val(),
                "team_type":$("#type").val()}
            var team_icon = $("#imgBase").val()
            _data['team_icon'] = team_icon
            var __data = JSON.stringify(_data);

            $.ajax({
                type:"post",
                url:"/api/gameteam/",
                data:__data,
                contentType:"application/json",
                dataType:"json",
                success:function(res){

                    if (res.code==0){
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
                        layer.msg(res.msg);
                    }
                },error:function(res){
                    // $(".previewImg").attr("src", objUrl);
                    // alert(this.files[0].size);
                    // if (true) {

                    // }
                    layer.msg('出错了')
                    layer.msg(res);
                }
            });
            
    	});
    	$(".ShutDownFound").on("click",function(){
    		popupClose();
    	});
//  }

    // setCookie('token',getUrlParms('token'))
