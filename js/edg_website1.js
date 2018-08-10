//2018-05-06 00:15
//HQS
	
	//PC端的部分样式
	
	
	
    
   
    //moble/移动端部分js代码  开始
    //2018-07-22  22:18:23
    //HQS
	$("#giveReward").on("click",function(){
    	layer.msg("此功能暂未开放！");
    });
	
//	以下为触发 【发送验证码  按钮  开始
	function show_img_authcode(){
//	    initNECaptcha({
//	    	captchaId: '{{captcha_id}}',
//	      	element: '#captcha',
//	      	mode: 'popup',
//	      	protocol: 'https',
//	      	width: 320,
//	      	onReady: function (instance) {
//	        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
//	      	},
//	      	onVerify: function (err, data) {
//		        if(!data || !data.validate){
//		          	layer.msg("请重试");
//		          	return;
//		        }
//		        send_authcode(data.validate);
//		    }
//	    }, function onload (instance) {
//	      	// 初始化成功
//	      	instance.popUp();
//	    });//initNeCaptcha
    }
	
	var i=60;
  	var e;
  	
    function send_authcode(validate){
//    	$.ajax({
//	        url: '/app/user/sms_authcode/send', 
//	        data: {
//	          	mobile: $('#telephone').val(),
//	          	img_validate: validate 
//	        }, 
//	        dataType: "json",
//	        success: function(res) {
//	        	layer.msg(res.msg);
//	        	if(res.status == 0){
	            i=60;
	            e=setInterval(resendVal,1000);
//	        	}
//	        }
//	    });
    }

    function bind_mobile(authcode){
	    $.ajax({
	        url: '/app/user/bind_mobile', 
	        type: "POST",
	        data: {
	          	user_id: '{{sinfo.user_id}}',
	          	sid: '{{sinfo.sid}}',
	          	mobile: $('#telephone').val(),
	          	authcode: authcode 
	        }, 
	        dataType: "json",
	        success: function(res) {
	          	layer.msg(res.msg);
	          	if(res.status == 0){ }
	            
	        }
	    });
    }

	function resendVal(){
	    i--;
	    if(i==0){
	      	$('#resend').val("重新获取");
	      	$('#resend').css({'color':'#6e6e6e','border':'1px solid #6e6e6e'});
	      	$("#resend").removeAttr('disabled');
	      	clearInterval(e);
	    }else{
	      	$('#resend').css({'color':'#ccc','border':'1px solid #ccc'});
	      	$("#resend").attr('disabled','true');
	      	$('#resend').val("剩余时间"+i+"s");
	    }
	}

	  //发送短信验证码
	$('#resend').click(function(){
	    var mobile =$('#telephone').val();
	    if(!mobile){
	    	layer.msg('请先填写手机号码！');
	      	return false;
	    }else{
	    	e=setInterval(resendVal,1000);
	    }
//	    show_img_authcode();
	});
//	触发 【发送验证码  按钮  结束
    team_id = getUrlParms('team_id')
    if (typeof(team_id)!='string'){
        team_id =0
    }
    // 顶部个人信息
    function UserMessage(){
        $.ajax({
            type:"get",
            url:"/api/checkteam/",
            async:true,
            data:{"token":getCookie('yz_tk'),"team_id":team_id,"user_id":getCookie("yz_id")},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    $.each(res.datas,function(i,item){
                        var istieba = ''
                        if (item.team_type=='贴吧战队'){
                            istieba = 'img/edg_website/icon_source.png'
                        }
                        var recruit = '';
                        var _recruit = 'open'
                        console.log(_recruit)
                        if (item.recruit==1){
                            _recruit = ' close'
                        }
                        if (item.team_position==2){
                            recruit = '<p>公开招募 '+
                                '<a class="conscribe '+_recruit+'" id="conscribe" href="javascript:;">'+
                                    '<span class="span ONmove"><span>OFF</span></span>'+
                                    '<span class="span OFFmove"><span>ON</span></span>'+
                                    '<span class="Abutton"></span>'+
                                '</a>'+
                            '</p>'
                        }
                        var html = '<div class="info_left fix">'+
                                        '<div class="info_left_top fix">'+
                                            '<div class="icon_head">'+
                                                '<img class="headPortrait" src="'+item.team_icon+'"/>'+
                                                '<span class="apostrophe">'+item.team_name+'</span>'+
                                                '<img class="source" src="'+istieba+'"/>'+
                                            '</div>'+
                                            '<div class="title fix"><img class="gender" src="img/edg_website/icon_nickname.png"/><p class="oneHP apostrophe">'+item.nickname+'</p></div>'+
                                            '<div class="gameList fix"><img src="img/edg_website/icon_peopleNumber.png"/><span class="" id="peopleNumber">'+item.has_member+'</span>/'+item.max_member+'</div>'+
                                            '<div class="signature fix"><img src="img/edg_website/icon_signature.png"/><span>'+item.team_details+'</span></div>'+
                                        '</div>'+
                                        '<div class="info_left_bottom fix">'+
                                            '<p class="apostrophe"><img src="img/public/icon_4.png"/> 排名<span>'+item.rank+'</span></p>'+
                                            '<p class="apostrophe"><img src="img/public/icon_medal.png"/>赛点<span>'+item.competition_point+'</span></p>'+
                                            '<p class="apostrophe"><img src="img/edg_website/icon_attention.png"/>关注<span>'+item.focus_on+'</span></p>'+
                                            '<p class="apostrophe"><img src="img/edg_website/icon_popularity.png"/>人气<span>'+item.like_num+'</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="info_right fix">'+recruit+'</div>'
                        $(".information").append(html);
                        // if ($(".conscribe").attr("").indexof("close") >0){
                        //     console.log(1111)
                        // }
                    });
                    conscribe();
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });

    }
//  UserMessage();

//  $.ajax({
//		type:"POST",
//		url:"__URL__"+"/bar",
//		dataType:"json",
//		async:"false",
//		data:{},
//		success:function(result){
//			if(result){
//				console.log(result);
//				for(var i=0;i<result.length;i++){
//				    bannerHtml+='<div class="swiper-slide"><a href="'+result[i].banner_url+'"><img src="'+result[i].banner_image+'"></a></div>';
//				}
//				
//				$(".swiper-wrapper").html(bannerHtml);
//				var mySwiper = new Swiper('.swiper-container',{
//				  autoplay : 5000,
//				  speed:1000,
//				  loop: true,
//				   pagination: '.swiper-pagination',
//				   nextButton: '.swiper-button-next',
//				   prevButton: '.swiper-button-prev'
//				})
//			
//			}
//		}
//	})
    //循环  成员管理
    function management(){
    	var html="",html2="",html3="",html4="",html5="",html6="",firstPage="",post="";
		for(var i=1; i<=23; i++ ){
			if ( i==1) {
				post="队长";
			}else if( i==2||i==3){
				post="副队长";
				html3='<button type="button" class="buttonManage">管理</button>';
			}else{
				post="队员";
				html3='<button type="button" class="buttonManage">管理</button>';
			}
			html +='<div class="swiper-slide">'+
						'<div class="game">'+
							'<a class="fix" href="personal.html">'+
								'<img src="img/edg_website/captain/captain'+i+'.png">'+
								'<p class="name apostrophe">'+i+'天劫</p>'+
								'<p class="position">'+post+'</p>'+
							'</a>'+
							html3+
						'</div>'+
					'</div>';
		}
		$(".management .swiper-wrapper").append(html);
    }
    management();
    
    //首页 顶部 海报  图片轮播
	var mySwiper = new Swiper('#bannerSwiper',{
		//loop: true,//在原本slide前后复制若干个slide(默认一个)并在合适的时候切换，让Swiper看起来是循环的
		//autoplay:3000,
		//speed:3000,
		//grabCursor : true,//鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
		//parallax:true,//开启视差效果,需要的元素上增加data-swiper-parallax属性
        autoplayDisableOnInteraction : false,
		pagination: '#bannerpagination',
		paginationType : 'fraction',//把轮播的分页器 点点 改为 数字
		slidesPerView : 4,//一行显示4个
		slidesPerGroup : 4,//在carousel mode下定义slides的数量多少为一组
		slidesPerColumn : 2,//显示2行
		slidesPerColumnFill : 'column',//列
		
		spaceBetween : 5,
		paginationClickable :true,//此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
		nextButton: '.ArightButton',
		prevButton: '.AleftButton',
		observer:true,
		observeParents:true,
	});
    
    //公开招募  开关
    function conscribe(){
	    var __recruit = 0
	    $("#conscribe").on("click",function(){
	    	if ( $(this).attr("class") == "conscribe close" ) {
	    		$(this).removeClass("close").addClass("open");
	    		$(".ONmove").removeClass("ONgo2").addClass("ONgo1");
	    		$(".OFFmove").removeClass("OFFgo2").addClass("OFFgo1");
	    		$(".Abutton").removeClass("AbuttonGo2").addClass("AbuttonGo1");
	            __recruit =1;
	    	} else{
	    		$(this).removeClass("open").addClass("close");
	    		$(".ONmove").removeClass("ONgo1").addClass("ONgo2");
	    		$(".OFFmove").removeClass("OFFgo1").addClass("OFFgo2");
	    		$(".Abutton").removeClass("AbuttonGo1").addClass("AbuttonGo2");
	    	}
	        $.ajax({
	            url: '/api/gameteam/', 
	            type: "PUT",
	            data: JSON.stringify({"token":getCookie("yz_tk"),
	            "user_id":getCookie("yz_id"),"recruit":__recruit     
	            }), 
	            contentType:"application/json",
	            dataType: "json",
	            success: function(res) {
	                layer.msg(res.msg);
	                if(res.status == 0){ }
	            }
	        });
		});
	}
    //公开招募  开关
    var __recruit = 0
    $("#conscribe").on("click",function(){
    	if ( $(this).attr("class") == "conscribe close" ) {
    		$(this).removeClass("close").addClass("open");
    		$(".ONmove").removeClass("ONgo2").addClass("ONgo1");
    		$(".OFFmove").removeClass("OFFgo2").addClass("OFFgo1");
    		$(".Abutton").removeClass("AbuttonGo2").addClass("AbuttonGo1");
    		$("#recruit").removeClass("dis_none");
            __recruit =1;
    	} else{
    		$(this).removeClass("open").addClass("close");
    		$(".ONmove").removeClass("ONgo1").addClass("ONgo2");
    		$(".OFFmove").removeClass("OFFgo1").addClass("OFFgo2");
    		$(".Abutton").removeClass("AbuttonGo1").addClass("AbuttonGo2");
    		$("#recruit").addClass("dis_none");
    	}
	});
    
    //成员管理
    function MemberManage(params){
        $.ajax({
            type:"get",
            url:"/api/teammember/",
            async:true,
            data:{"token":getCookie('yz_tk'),"team_id":team_id,"user_id":getCookie("yz_id")},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var isdissolve = ''
                    var manage = ''
                    var position_status = res.position_status
                    if(res.isin_team){ 
                        isdissolve = '<a class="dissolve" style="background:#fff" href="javascript:;">申请加入</a>'

                    }else if (position_status==2){
                        isdissolve = '<a class="dissolve" id="dissolve" href="javascript:;">解散战队</a>'
                        manage = '<button type="button" class="buttonManage">管理</button>'
                    }else if (position_status ==1 || position_status ==0){
                        isdissolve = '<a class="dissolve" id="leaveTeam" href="javascript:;">退出战队</a>'
                    }else{
                        isdissolve = '<a class="dissolve" id="applyTeam" href="javascript:;">申请加入</a>'
                    }
                    console.log( position_status ==0)

                    var html = '<p class="contentHeader"><img src="img/edg_website/icon_management.png"/>成员管理 '+isdissolve+' </p><div class="content fix"></div>'
                    var html2= ''
                    $.each(res.datas,function(i,item){
                        var team_position = item.team_position
                        var _url = 'personal.html?user_id='+item.user_id
                        if (parseInt(item.user_id)==parseInt(getCookie("yz_id"))){
                            _url = 'userCenter.html'
                        }
                        if (team_position==2){
                            html2 +='<div class="game">'+
                            			'<a class="fix" href="'+_url+'">'+
	                                        '<img src="http://pbp781cft.bkt.clouddn.com/'+item.icon+'"/>'+
	                                        '<p class="name apostrophe">'+item.nickname+'</p>'+
	                                        '<p class="position">队长</p></a></div>'
                            
                        }else{
                            var position = '队员'
                            if (team_position==1){
                                position = '副队长'
                            }
                            if(position_status==1 && team_position==0){
                                manage = '<button type="button" class="buttonManage">管理</button>'
                            }
                            html2 +='<div class="game" id="'+item.user_id+'" data-id = "'+team_position+'">'+
                            			'<a class="fix" href="'+_url+'">'+
		                                    '<img src="http://pbp781cft.bkt.clouddn.com/'+item.icon+'"/>'+
		                                    '<p class="name apostrophe">'+item.nickname+'</p>'+
		                                    '<p class="position">'+position+'</p>'+
                                    	'</a>'+
	                                    manage +
                                    '</div>';
                        }
                    });
                    if (params=='manage'){
                        $(".management").html(html);
                        $(".management .content").html(html2);
                    }else{
                        $(".management").append(html);
                        $(".management .content").append(html2);
                        
                    }
                    
				  	
					buttonManage();

                    /*退出战队*/
                    $("#leaveTeam").on('click', function() {
                        popupArise();
                        $('.leaveTeam').removeClass('dis_none');
                        
                    });
                    //取消   退出战队
                    $("#dissolveCancel12").on("click",function(){
                        popupClose();
                        $(".leaveTeam").addClass("dis_none");
                    });
                    
                    /*申请加入*/
                    $("#applyTeam").on('click', function() {

                        popupArise();
                        $('.applyTeam').removeClass('dis_none');
                        
                    });
                    /*确认 申请加入*/
                    $("#applyTeamAffirm").on('click', function() {
                        if ( $("#leaveWord").val() == "" ) {
                            layer.msg("战队留言不能为空！");
                            return false;
                        }
                        var team_id = getUrlParms("team_id")
                        $.ajax({
                            type:"post",
                            url:"/api/applyteam/",
                            async:true,
                            data:JSON.stringify({"token":getCookie('yz_tk'),"team_id":team_id,"user_id":getCookie("yz_id"),
                            "detail":$("#leaveWord").val()}),
                            contentType:"application/json",
                            dataType:"json",
                            success:function(res){
                                if ( res.code == 0 ) {
                                    layer.msg("战队申请成功！记得查看审核消息哦！");
                                } else{
                                    layer.msg(res.msg)
                                }
                            },error:function(res){
                                layer.msg('出错了')
                            }
                        });                        
                        popupClose();
                        $('.applyTeam').addClass('dis_none');
                    });
                    // 确定退出战队
                    $("#leaveTeamAffirm").on("click",function(){

                        //退出确定
                        var team_id = getUrlParms("team_id")
                        $.ajax({
                            type:"put",
                            url:"/api/teammember/",
                            async:true,
                            data:JSON.stringify({"token":getCookie('yz_tk'),"team_id":team_id,"user_id":getCookie("yz_id"),
                            "status":2}),
                            contentType:"application/json",
                            dataType:"json",
                            success:function(res){
                                if ( res.code == 0 ) {
                                    layer.msg(res.msg);
                                    // MemberManage()
                                    window.location.href = 'edg.html'
                                } else{
                                    layer.msg(res.msg)
                                }
                            },error:function(res){
                                layer.msg('出错了')
                            }
                        });
                        popupClose();
                        $(".verify").addClass("dis_none");
                    });
                    //取消   申请加入
                    $("#dissolveCancel3").on("click",function(){
                        popupClose();
                        $(".applyTeam").addClass("dis_none");
                    });
                    
                    /*解散战队*/
                    $("#dissolve").on('click', function() {
                        popupArise();
                        $('.dissolveTeam').removeClass('dis_none');
                    });
                    
                    //确认   解散战队
                    $("#dissolveAffirm").on("click",function(){
                        $(".dissolveTeam").addClass("dis_none");
                        // $(".verify").removeClass("dis_none");

                        var team_id = getUrlParms("team_id")
                        $.ajax({
                            type:"put",
                            url:"/api/teammember/",
                            async:true,
                            data:JSON.stringify({"token":getCookie('yz_tk'),"team_id":team_id,"user_id":getCookie("yz_id"),
                            "status":1}),
                            contentType:"application/json",
                            dataType:"json",
                            success:function(res){
                                if ( res.code == 0 ) {
                                    layer.msg(res.msg);
                                    popupClose();
                                    setTimeout(function() {
                                        window.location.href = 'edg.html'
                                        
                                    }, 1000);
                                } else{
                                    layer.msg(res.msg)
                                }
                            },error:function(res){
                                layer.msg('出错了')
                            }
                        });
                        
                    });
                    //取消   解散战队
                    $("#dissolveCancel1").on("click",function(){
                        popupClose();
                        $(".dissolveTeam").addClass("dis_none");
                    });
                    
                    //提交   解散战队
                    $("#verifyAffirm").click(function() {
                        var telephone=$('#telephone').val();
                        if(!telephone){
                            layer.msg('手机号码不能为空！');
                            return false;
                        }
                        var reg=/(1[3-9]\d{9}$)/;
                        if(!reg.test(telephone)){
                            layer.msg('请输入正确格式的手机号码！');
                            return false;
                        }
                        var messageCode=$("#messageCode").val();
                        if(!messageCode){
                            layer.msg('短信验证码不能为空！');
                            return false;
                        }
                        layer.msg("战队已成功解散！");
                        
                        $("#verify").addClass("dis_none");
                        popupClose();
                        
                        //验证短信验证码
                //      bind_mobile(messageCode);
                    });

                    //取消   解散战队 手机验证码
                    $("#dissolveCancel2").on("click",function(){
                        popupClose();
                        $(".verify").addClass("dis_none");
                    });
                   

                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });        
    }
//  MemberManage();
   
   /*退出战队*/
    $("#leaveTeam").on('click', function() {
        popupArise();
        $('.leaveTeam').removeClass('dis_none');
        
    });
    //取消   退出战队
    $("#dissolveCancel12").on("click",function(){
        popupClose();
        $(".leaveTeam").addClass("dis_none");
    });
    
    /*申请加入*/
    $("#applyTeam").on('click', function() {
        popupArise();
        $('.applyTeam').removeClass('dis_none');
    });
    /*确认 申请加入*/
    $("#applyTeamAffirm").on('click', function() {
        if ( $("#leaveWord").val() == "" ) {
            layer.msg("战队留言不能为空！");
            return false;
        }              
        popupClose();
        $('.applyTeam').addClass('dis_none');
    });
    // 确定退出战队
    $("#leaveTeamAffirm").on("click",function(){
        popupClose();
        $(".verify").addClass("dis_none");
    });
    //取消   申请加入
    $("#dissolveCancel3").on("click",function(){
        popupClose();
        $(".applyTeam").addClass("dis_none");
    });
    
    /*解散战队*/
    $("#dissolve").on('click', function() {
        popupArise();
        $('.dissolveTeam').removeClass('dis_none');
    });
    
    //确认   解散战队
    $("#dissolveAffirm").on("click",function(){
        $(".dissolveTeam").addClass("dis_none");
        $(".verify").removeClass("dis_none");
    });
    //取消   解散战队
    $("#dissolveCancel1").on("click",function(){
        popupClose();
        $(".dissolveTeam").addClass("dis_none");
    });
    
    //提交   解散战队
    $("#verifyAffirm").click(function() {
        var telephone=$('#telephone').val();
        if(!telephone){
            layer.msg('手机号码不能为空！');
            return false;
        }
        var reg=/(1[3-9]\d{9}$)/;
        if(!reg.test(telephone)){
            layer.msg('请输入正确格式的手机号码！');
            return false;
        }
        var messageCode=$("#messageCode").val();
        if(!messageCode){
            layer.msg('短信验证码不能为空！');
            return false;
        }
        layer.msg("战队已成功解散！");
        
        $("#verify").addClass("dis_none");
        popupClose();
        
        //验证短信验证码
//      bind_mobile(messageCode);
    });

    //取消   解散战队 手机验证码
    $("#dissolveCancel2").on("click",function(){
        popupClose();
        $(".verify").addClass("dis_none");
    });

	//赛事管理
    function EventManage(){
        $.ajax({
            type:"get",
            url:"/api/eventmanagement/",
            async:true,
            data:{"token":getCookie('yz_tk'),
            "team_id":team_id,"user_id":getCookie('yz_id')},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html ='';
                    var manage = '';
                    $.each(res.datas,function(i,item){
                        manage = '<a class="BGcolor2 fix" href="javascript:;">管理</a>'
                        if (item.op_team==1){
                            //加进成员信息
                            manage = '<a class="regulate BGcolor1 fix" onclick="regulate('+item.auto_event_id+')">管理</a>'
                        }
                        html +='<div class="events shadow2 fix">'+
                                    '<div class="eventsMain">'+
                                        '<p class="description apostrophe"><img src="img/public/icon_AllGames1.png"/>'+item.events_title+'</p>'+
                                        '<p class="money"><img src="img/public/icon_PopularEvents1.png"/>'+item.total_bonus+'</p>'+
                                        '<p class="number"><img src="img/public/icon_PopularEvents3.png"/>'+item.has_max_team+'</p>'+
                                        '<p class="time"><img src="img/public/edg_website/icon_calendar.png"/>B组第二轮</p>'+
                                        '<p class="condition"><span class="bgCondition1"></span>'+item.flag+'</p>'+
                                        '<p class="category bgColor1"><span>'+item.e_t_name+'</span></p>'+
                                    '</div>'+
                                    manage+
                                '</div>'
                    });
                    if( res.datas.length == 0 ){
                    	html += '<p class="notHave">暂时还没有赛事喔~</p>';
                    }
                    $(".OFFICIALS").append(html);
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        }); 


    }
//  EventManage();

	//战队荣誉
    function TeamHonor(){
        $.ajax({
            type:"get",
            url:"/api/honor/",
            async:true,
            data:{"token":getCookie('yz_tk'),
            "team_id":team_id,"user_id":getCookie('yz_id')},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html ='';
                    
                    $.each(res.datas,function(i,item){
                        html +='<div class="events shadow2 fix">'+
                                    '<a class="fix" href="javascript:;">'+
                                        '<div class="eventsMain">'+
                                            '<p class="description apostrophe"><img src="'+item.game_icon+'"/>'+item.events_title+'</p>'+
                                            '<p class="eventsName">'+item.event_level_name+'</p>'+
                                            '<p class="time">'+item.create_time+'</p>'+
                                        '</div>'+
                                        '<div class="trophyx" href="javascript:;"><img src="img/edg_website/icon_copper.png"/></div>'+
                                    '</a>'+
                                '</div>'
                    });
                    if( res.datas.length == 0 ){
                    	html += '<p class="notHave">暂时还没有荣誉喔~</p>';
                    }
                    $(".personalHonor").append(html);
                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });        
    }
//  TeamHonor();

	var user_team_id =0
	var team_position = 0 
	var please_leave =0
	var old_team_position = 0
//	function  buttonManage(){
	    //成员管理
		$(".buttonManage").on("click",function(){
	        user_team_id = parseInt(this.parentNode.getAttribute('id'))
	        old_team_position =parseInt(this.parentNode.getAttribute('data-id'))
			popupArise();
			$('.manage').removeClass('dis_none');
		});
//	}
	//队员管理
	$(".onchange").on("click",function(){
		if ( $(this).attr("id") == "viceCaptain" ) {
			$("#teamMember,#kickOut").attr("checked", false);
            team_position = 1
		} else if ( $(this).attr("id") == "teamMember" ) {
			$("#viceCaptain,#kickOut").attr("checked", false);
            team_position = 0
		} else {
			$("#viceCaptain,#teamMember").attr("checked", false);
            please_leave = 1
		}
	});
	
	/*队员管理  确认*/
	$("#manageAffirm").on('click', function() {
        var viceCaptain = $("#viceCaptain").prop("checked")
        var teamMember = $("#teamMember").prop("checked")
        var kickOut = $("#kickOut").prop("checked")
        // if(team_position==old_team_position && please_leave==0){
        //     layer.msg("没发生改变！");
        // }else 

        if( viceCaptain == true || teamMember == true || kickOut == true ){
			//改变时传到后端
            if (viceCaptain ==true) {
                team_position = 1
                please_leave = 0
            }else if(teamMember == true){
                team_position= 0
                please_leave = 0
            }else{
                team_position= 0
                please_leave = 1                
            }
            $.ajax({
                type:"put",
                url:"/api/teamposition/",
                async:true,
                data:JSON.stringify({"token":getCookie('yz_tk'),
                "team_id":team_id,"user_id":user_team_id,"please_leave":please_leave,
                "team_position":team_position}),
                contentType:"application/json",
                dataType:"json",
                success:function(res){
                    if ( res.code == 0 ) {
                        user_team_id = 0
                        team_position= 0
                        please_leave= 0
                        layer.msg(res.msg);
                        setTimeout(function() {

                            MemberManage('manage')
                        }, 1000);
                    } else{
                        layer.msg(res.msg);
                    }
                },error:function(res){
                    // console.log(res);
                }

            }); 

		} else{
			layer.msg("没发生改变！");
		}
		popupClose();
		$('.manage').addClass('dis_none');
	});

	/*战队主页   一键招募*/
	$("#recruit").on('click', function() {
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
	
	//循环参赛队员
	function takePart(){
		var html="";
		for(var QQ=1; QQ<=10; QQ++ ){
			html +='<div class="selectDiv fix">'+
						'<div class="module module1"><div class="borderDiv"><span class="pitchUp moduleBGcolor1" data-val="0"></span></div></div>'+
						'<div class="module module2"><img class="playerLogo" src="img/public/icon_head.png"></div>'+
						'<div class="module module3"><span class="playerName">'+QQ+'金刚狼</span></div>'+
					'</div>';
		}
		$(".takePart .content").append(html);
	}
	takePart();
	
	//只有能【管理】  的赛事 才能选择队员，才有这个类：“regulate”
	function regulate(auto_event_id){
	    // $(".regulate").on("click",function(){
	    $.ajax({
	        type:"get",
	        url:"/api/teammodifymember/",
	        async:true,
	        data:{"token":getCookie('token'),"team_id":team_id,"user_id":getCookie('user_id'),
	        "auto_event_id":auto_event_id},
	        contentType:"application/json",
	        dataType:"json",
	        success:function(res){
	        	console.log(res.team_num);
	        	console.log(res.team_num);
	            var html = '<p class="style title">参赛队员  <span><i class="num playerNum" id="takePartNum" data-val="'+res.team_num+'">'+res.team_num+'</i><span>/</span>'+res.team_num+'</span></p>'+
	                        '<div class="content fix scrollable">'
	            if ( res.code == 0 ) {
	                $.each(res.datas,function(i,item){
	                    var moduleBGcolor = 'moduleBGcolor'
	                    var data_val = '0'
	                    var _style ='style="border-color: rgb(192, 192, 192);"'
	                    if (item.is_join==1){
	                        moduleBGcolor = 'moduleBGcolor2'
	                        data_val ='1'
	                        _style = ''
	                    }
	                    html+='<div class="selectDiv fix">'+
	                                '<div class="module module1"><div class="borderDiv" '+_style+'><span id="'+item.id+'" class="pitchUp '+moduleBGcolor+'" data-val="'+data_val+'"></span></div></div>'+
	                                '<div class="module module2"><img class="playerLogo" src="'+item.icon+'"></div>'+
	                                '<div class="module module3"><span class="playerName apostrophe">'+item.nickname+'</span></div>'+
	                            '</div>'
	                });
	            } else{
	                console.log(res.msg);
	            }
	            var _p  = res.team_num + ',' + auto_event_id
	            html += '</div><div class="buttonDiv"><button class="leftButton" id="EntryAffirm" type="button" onclick="EntryAffirm('+_p+')">确定</button></div>'+
	                    '<span class="ShutDown" id="" onclick="ShutDown(this)">X</span>'
	            $(".takePart").html(html);
	
	            //选择  参赛队员
	            function pitchUp(){
	                $(".pitchUp").on("click",function(){
	                    var dataVal = $(this).attr("data-val");
	                    
	                    var dataNum = $(".takePartNum").attr("data-val");
	                    var playerNum = parseInt($(".playerNum").text());
	                    var max_members = parseInt(res.team_num)
	                    if( playerNum+1>max_members && dataVal == 0 ){
	                        return false;
	                    } else{
	                        if(playerNum-1<=max_members && dataVal == 1 ){
	                            $(this).attr("data-val","0");
	                            $(this).removeClass("moduleBGcolor2").addClass("moduleBGcolor1");
	                            $(".playerNum").text( playerNum-1 );
	                            $(".pitchUp[data-val='0']").parent().css("border-color","#787878");
	                        }
	                        if(playerNum+1<=max_members&& dataVal == 0 ){
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
	            }   
	             pitchUp();
	        },error:function(res){
	            layer.msg('出错啦')
	        }
	    });
	
	
	    popupArise();
	    $('.takePart').removeClass('dis_none');
	    // });
	}

	//只有能【管理】  的赛事 才能选择队员，才有这个类：“regulate”
	$(".regulate").on("click",function(){
	 	popupArise();
	    $('.takePart').removeClass('dis_none');
	});
	
	//选择  参赛队员
    $(".pitchUp").on("click",function(){
        var dataVal = $(this).attr("data-val");
        
        var dataNum = $(".takePartNum").attr("data-val");
        var playerNum = parseInt($(".playerNum").text());
        var max_members = parseInt($(".amount").text());
        if( playerNum+1>max_members && dataVal == 0 ){
            return false;
        } else{
            if(playerNum-1<=max_members && dataVal == 1 ){
                $(this).attr("data-val","0");
                $(this).removeClass("moduleBGcolor2").addClass("moduleBGcolor1");
                $(".playerNum").text( playerNum-1 );
                $(".pitchUp[data-val='0']").parent().css("border-color","#787878");
            }
            if(playerNum+1<=max_members&& dataVal == 0 ){
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
	
	//确认  选择  参赛队员
	$("#EntryAffirm").on("click",function(){
	    var dataVal = $(this).attr("data-val");
	    var playerNum = parseInt($(".playerNum").text());
        var max_members = parseInt($(".amount").text());
	    var ar = new Array()
	    if( playerNum  <parseInt(max_members )){
	        msg =  "参赛人数不足"+max_members+"个，请选择"+max_members+"个人！"
	        layer.msg(msg);
	        return false;
	    }
	    layer.msg("需改成功！");
	    popupClose();
	    $('.takePart').addClass('dis_none');
	});

	function EntryAffirm(max_members,auto_event_id){
	    //确认  选择  参赛队员
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
	        type:"put",
	        url:"/api/teammodifymember/",
	        async:true,
	        data:JSON.stringify({"token":getCookie('token'),
	        "user_id":getCookie('user_id'),"auto_event_id":auto_event_id,"u_l":ar}),
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
	

	// 关注
	$("#focuson").on("click",function(){
	    layer.msg("战队关注成功");
	    $(this).css({background:"#ccc",color:"#8c8c8c"});
	    return false;
	//  $.ajax({
	//      type:"post",
	//      url:"/api/focuson/",
	//      async:true,
	//      data:JSON.stringify({"token":getCookie('yz_tk'),
	//      "user_id":getCookie('yz_id'),"focus_type":1,"team_id":getUrlParms("team_id")}),
	//      contentType:"application/json",
	//      dataType:"json",
	//      success:function(res){
	//          if ( res.code == 0 ) {
	//              layer.msg(res.msg);
	//          } else{
	//              layer.msg(res.msg);
	//          }
	//      },error:function(res){
	//          layer.msg('出错了');
	//      }
	//  });
	});

	//点赞
	$("#like").on("click",function(){
		var dataNum = $("#like").attr("data-num");
		
		if (dataNum==0) {
			layer.msg("点赞成功！");
		    $("#like").attr("data-num","1")
		} else{
			layer.msg("你已经点过赞咯！");
			return false;
		}
	});