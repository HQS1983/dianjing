//2018-05-06 00:15
//HQS

$(function(){
	
	//PC端的部分样式
	
    
    
    //提示弹窗
    function toastDiv(toastHtml){
	   	$('.toastInfo span,.pop_up_prompts span').html(toastHtml);
	   	$('.toastInfo,.pop_up_prompts').fadeIn(1000).fadeOut(4000);
	}
    
    
    
    //2018-07-13
	//HQS
    //moble/移动端部分js代码
    
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
            url:"/api/usermessgemanage/",
            async:true,
            data:{"token":getCookie('yz_tk'),"user_id":getCookie('yz_id')},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html = '';
                    var honor = '';
                    var rihgt_html = '';
                    var Dblist_html = '';
                    $.each(res.datas,function(i,item){
                        if (item.honor.length>0){
                            honor = item.honor[0].events_title + item.honor[0].rank
                        }
                        var gender = 'man'
                        if (item.gender==1){
                            gender = 'woman'
                        }
                        html +='<div class="info_left_top fix">'+
                                    '<div class="icon_head"><img src="'+item.icon+'"/></div>'+
                                    '<div class="title fix">'+
                                        '<img class="gender" src="img/public/icon_gender_'+gender+'.png"/><p class="oneHP apostrophe">'+item.nickname+'</p><img class="diadema" src="img/public/icon_diadema.png"/>'+
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
                        var src = ''
                        if (item.team_icon!=""){
                            src = 'src="'+item.team_icon+'"'
                        }
                        rihgt_html +='<p class="apostrophe"><img src="img/icon_Hoovies.png"/>0</p>'+
                                        '<button class="acquire" id="acquire">获取彩豆</button>'+
                                        '<button class="ItemMall" id="ItemMall">道具商城</button>'+
                                        '<img class="icon_teamLogo" '+src+'/>'

                        var tieba = undefined
                        var zhifubao = undefined
                        var qq = undefined
                        var wx = undefined
                        $.each(item.platform_login_l,function(i,platform){
                            // var platform = item.platform_login_l[0]
                            tieba  =platform.tieba
                            zhifubao  = platform.zhifubao
                            qq =   platform.qq
                            wx = platform.wx 



                        })
                        if (tieba==undefined){
                            Dblist_html +='<div class="content fix">'+
                                            '<div class="space"><img src="img/icon_Dblist1.png"/></div>'+
                                                '<button class="" id="" type="button">未绑定</button>'+
                                            '</div>'

                        }else{
                            Dblist_html +='<div class="content fix">'+
                                            '<div class="space"><img src="img/userCenter/icon_Dblist1.png"/></div>'+
                                                '<p>'+tieba+'</p>'+
                                            '</div>'
                        }
                        if (zhifubao==undefined){
                            Dblist_html +='<div class="content fix">'+
                                                '<div class="space"><img src="img/icon_Dblist2.png"/></div>'+
                                                '<button class="" id="" type="button">未绑定</button>'+
                                            '</div>'
                        }else{
                            Dblist_html +='<div class="content fix">'+
                                                '<div class="space"><img src="img/userCenter/icon_Dblist2.png"/></div>'+
                                                '<p>'+zhifubao+'</p>'+
                                            '</div>'                                
                        }
                        if (qq==undefined){
                            Dblist_html +='<div class="content fix">'+
                                                '<div class="space"><img src="img/icon_Dblist3.png"/></div>'+
                                                '<button class="" id="" type="button">未绑定</button>'+
                                            '</div>'
                        }else{
                            Dblist_html +='<div class="content fix">'+
                                            '<div class="space"><img src="img/userCenter/icon_Dblist3.png"/></div>'+
                                            '<p>'+qq+'</p>'+
                                        '</div>'                                
                        }

                        if (wx==undefined){
                            Dblist_html +='<div class="content fix">'+
                                                '<div class="space"><img src="img/icon_Dblist4.png"/></div>'+
                                                '<button class="" id="" type="button">未绑定</button>'+
                                            '</div>'
                        }else{
                            Dblist_html +='<div class="content fix">'+
                                                '<div class="space"><img src="img/userCenter/icon_Dblist4.png"/></div>'+
                                                '<p>'+wx+'</p>'+
                                            '</div>'                                
                        }
                        if(item.phone!=undefined){
                            Dblist_html +='<div class="content fix">'+
                                            '<div class="space"><img src="img/icon_Dblist5.png"/></div>'+
                                            '<p>'+item.phone+'</p>'+
                                        '</div>'
                        }else{
                            Dblist_html +='<div class="content fix">'+
                                            '<div class="space"><img src="img/icon_Dblist5.png"/></div>'+
                                            '<button class="" id="" type="button">填写</button>'+
                                        '</div>'
                        }

                        if(item.addr!=undefined){
                            Dblist_html +='<div class="content fix">'+
                                            '<div class="space"><img src="img/icon_Dblist6.png"/></div>'+
                                            '<p>'+item.addr+'</p>'+
                                        '</div>'
                        }else{
                            Dblist_html +='<div class="content fix">'+
                                                '<div class="space"><img src="img/icon_Dblist6.png"/></div>'+
                                                '<button class="" id="" type="button">填写</button>'+
                                            '</div>'
                        }
                        Dblist_html +=  '<div class="content fix">'+
											'<button class="secede" type="button">退出</button>'+
										'</div>'
                    });
                    $(".information .info_left").append(html);
                    $(".information .info_right").append(rihgt_html);
                    $(".Dblist .main").append(Dblist_html);
                    
                    $("#acquire,#ItemMall").on("click",function(){
				    	layer.msg("此功能暂未开放！");
				    });
				    
				    //退出登录
                    $(".secede").on("click",function(){
                        delCookie("yz_tk");
                        delCookie("yz_id");
                        layer.msg("成功退出!")
                        // 服务端退出功能后期实现
                        setTimeout(function() {
                            window.location.href = 'login.html'
                            
                        }, 1000);
				    });
				    
                } else{
                    console.log(res.msg+'error');
                }
            },error:function(res){
                console.log(res.message);
            }
        });

    }
//  UserMessage();
	
	//我的赛事
    function MyEvent(){
        $.ajax({
            type:"get",
            url:"/api/usertournament/",
            async:true,
            data:{"token":getCookie('yz_tk'),
            "user_id":getCookie('yz_id'),"offset":0,"limit":10},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                var e_html = '<p class="contentHeader"><img src="img/public/icon_3.png"/>我的赛事</p>';
                if ( res.code == 0 ) {
                    $.each(res.datas,function(i,item){
                        e_html += '<div class="events fix">'+
                                        '<div class="left fix">'+
                                            '<p class="description apostrophe">'+item.event_title+'</p>'+
                                            '<p class="condition"><span class="bgCondition1"></span>'+item.status+'</p>'+
                                        '</div>'+
                                        '<button class="viewDetails" id="viewDetails1" type="button">查看详情</button>'+
                                    '</div>'
                                                
                    });
                    if (res.datas.length<=0){
                        e_html +='<div class="events fix"><p align="center" class="notHave">暂时还没有参赛喔~</p></div>'
                    }
                }else{
                    e_html +='<div class="events fix"><p align="center" class="notHave">还没有加入战队</p></div>'
                }
                $(".PyEvents").append(e_html);
            },error:function(res){
                console.log(res.message);
            }
        });
    }
//  MyEvent();


    function aboutmme(){
        $.ajax({
            type:"get",
            url:"/api/aboutmme/",
            async:true,
            data:{"token":getCookie('yz_tk'),
            "user_id":getCookie('yz_id')},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    if(res.audit_m_num!=''){
                        $("#audit").append('<span class="news">'+res.audit_m_num+'</span>')
                    }
                    if(res.my_m_num!=''){
                        $("#myNews").append('<span class="news">'+res.my_m_num+'</span>')
                    }
                    if(res.m_num){
                        $("#myMsg").append('<span class="news">'+res.m_num+'</span>')
                    }

                } else{
                    console.log(res.msg);
                }
            },error:function(res){
                console.log(res.message);
            }
        });
    }
//  aboutmme();


    //个人荣誉
    function personalHonor(){
        $.ajax({
            type:"get",
            url:"/api/personalhonor/",
            async:true,
            data:{"user_id":getCookie('yz_id')},
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                if ( res.code == 0 ) {
                    var html='<p class="contentHeader"><img src="img/public/icon_2.png"/>个人荣誉</p>';
                    $.each(res.datas,function(i,item){
                        var rank = item.rank
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
                    if(res.datas.length ==0){
                        html +='<p class="notHave">暂时还没有荣誉喔~</p>'
                    }
                    $(".personalHonor").append(html);


                } else{
                    layer.msg(res.msg);
                }
            },error:function(res){
                layer.msg(res.message);
            }
        });
    }
//  personalHonor();

	
	//2018-07-30  22:16:25
	//点击获取彩豆、道具商城
    $("#acquire,#ItemMall").on("click",function(){
    	popupArise();
    	$(".comingSoon").removeClass("dis_none");
    });
//  $("#dissolveCancel10").on("click",function(){
//  	popupClose();
//  	$(".comingSoon").addClass("dis_none");
//	});
	
	
	
	
	//2018-07-30  22:16:25
	//点击性别符号、名称
    $(".gender,.oneHP").on("click",function(){
    	var dataNum = $(this).attr("data-num");
    	var oneHP = $(".oneHP").text();
    	$("#changeAffirm").attr("data-num-a",dataNum);
    	$("#changeAffirm").attr("data-num-b",dataNum);
    	$("#changenick").val(oneHP);
    	$("#changenick").attr("data-old",oneHP);
    	
    	popupArise();
    	$(".change").removeClass("dis_none");
	});
	
	
	$(".pitchUp").on("click",function(){
    	var dataNum = $(this).attr("data-num");
        var dataClass = $(this).attr("class");
        var dataId = $(this).attr("id");
        
        if ( dataNum == 1 && dataClass == "pitchUp moduleBGcolor2" ) {
        	$("#changeAffirm").attr("data-num-b",dataNum);
        	return false;
        } else{
        	if ( dataId == "man" ) {
        		$("#man").removeClass("moduleBGcolor1").addClass("moduleBGcolor2");
	            $("#woman").removeClass("moduleBGcolor2").addClass("moduleBGcolor1");
	            $("#woman").attr("data-num","0");
	            $("#changeAffirm").attr("data-num-b","0");
        	} else{
        		$("#woman").removeClass("moduleBGcolor1").addClass("moduleBGcolor2");
	            $("#man").removeClass("moduleBGcolor2").addClass("moduleBGcolor1");
	            $("#man").attr("data-num","1");
	            $("#changeAffirm").attr("data-num-b","1");
        	}
        }
    });
	
    $("#changeAffirm").on("click",function(){
    	var dataNumA = parseInt($(this).attr("data-num-a"));
    	var dataNumB = parseInt($(this).attr("data-num-b"));
    	var changenick = String($("#changenick").val());             //获取 新的昵称  同时转为字符串
    	var dataOldName = String($("#changenick").attr("data-old")); //获取 旧的昵称  同时转为字符串   
    	
    	if (changenick == dataOldName && dataNumA == dataNumB ) {
    		layer.msg("没发生变化!");
    	} else if (changenick == dataOldName && dataNumA !== dataNumB ){
    		if ( dataNumB==0 ) {
	    		$(".gender").attr("src","img/public/icon_gender_man.png");
	    	} else{
	    		$(".gender").attr("src","img/public/icon_gender_woman.png");
	    	}
    		layer.msg("昵称没变，性别发生变化!");
    	} else if ( changenick !== dataOldName && dataNumA == dataNumB ){
    		layer.msg("昵称发生变化，性别没变!");
    	} else if ( changenick !== dataOldName && dataNumA !== dataNumB ){
    		if ( dataNumB==0 ) {
	    		$(".gender").attr("src","img/public/icon_gender_man.png");
	    	} else{
	    		$(".gender").attr("src","img/public/icon_gender_woman.png");
	    	}
    		console.log("昵称发生变化，性别发生变化!");
    		layer.msg("修改成功!");
    	}
    	$(".gender,.oneHP").attr("data-num",dataNumB);
    	$(".oneHP").text($("#changenick").val());
    	
	    	
    	
	    popupClose();
    	$(".change").addClass("dis_none");	
	});

	
	//点击绑定百度
	
	
	//点击绑定支付宝
	$("#Alipay").on("click",function(){
    	popupArise();
    	$(".bindingAlipay").removeClass("dis_none");
	});
	
    $("#bindingAlipayAffirm").on("click",function(){
    	var trueName = $(".trueName").val();
    	var AlipayName = $(".AlipayName").val();
    	var messageCode = $(".messageCode").val();
    	var reg=/(1[3-9]\d{9}$)/;
    	if ( trueName == "" ) {
    		layer.msg("真实姓名不能为空哦！");
    		return false;
    	}else if ( AlipayName == "" ) {
    		layer.msg("支付宝账号不能为空哦！");
    		return false;
    	}else if ( !reg.test(AlipayName) ) {
    		layer.msg("请输入正确格式的手机号码！");
    		return false;
    	}else if ( messageCode == "" ) {
    		layer.msg("验证码不能为空哦！");
    		return false;
    	}else{
    		//layer.msg("支付宝账号！");
//  		popupClose();
	    	$(".bindingAlipay").addClass("dis_none");	
			$("#AffirmAlipayName").val(trueName);
			$("#AlipayNum").val(AlipayName);
			$(".messageAffirm").removeClass("dis_none");
    	}
	});
	
	
	//	以下为触发 【发送验证码  按钮  开始
	function show_img_authcode(){
	    initNECaptcha({
	    	captchaId: '7fbd905f961c4867925243886f466e81',
	      	element: '#captcha',
	      	mode: 'popup',
	      	protocol: 'https',
	      	width: 320,
	      	onReady: function (instance) {
	        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
	      	},
	      	onVerify: function (err, data) {
		        if(!data || !data.validate){
		          	layer.msg("请重试");
		          	return;
		        }
		        send_authcode(data.validate);
		    }
	    }, function onload (instance) {
	      	// 初始化成功
	      	instance.popUp();
	    });//initNeCaptcha
    }
	
    function send_authcode(validate){
	   	$.ajax({
   			type:"post",
	        url: '/api/phonequickeck/', 
	        data: JSON.stringify({
	          	mobile: $('#MobileNumber').val(),
	          	img_validate: validate 
	        }), 
	        contentType:"application/json",
	        dataType: "json",
	        success: function(res) {
	        	if(res.code == 0){
		            i=60;
		            e=setInterval(resendVal,1000);
	        	}else{
	        		layer.msg(res.msg)
	        	}
	        }
	    });
    }

    function bind_mobile(authcode){
	    $.ajax({
	        url: '/app/user/bind_mobile', 
	        type: "POST",
	        data: {
	          	mobile: $('#MobileNumber').val(),
	          	authcode: authcode 
	        }, 
	        dataType: "json",
	        success: function(res) {
	          	layer.msg(res.msg);
	          	if(res.status == 0){ }
	        }
	    });
    }
   
   
	//以下为  手机验证码 JS代码
	var i=60;
	var e;
	function resendVal1(){
	    i--;
	    if( i==0 ){
	      	$('.readonly1').text("重新获取");
	      	$('.readonly1').css({'color':'#fff','background':'#3dcdec'});
	      	$(".readonly1").removeAttr('disabled');
	      	clearInterval(e);
	    }else{
	      	$('.readonly1').css({'color':'#9c9c9c','background':'rgba(110, 110, 110, 0.1)'});
	      	$(".readonly1").attr('disabled','true');
	      	$('.readonly1').text("剩余时间"+i+"s");
	    }
	}
	var ii=60;
	var ee;
	function resendVal2(){
	    ii--;
	    if( ii==0 ){
	      	$('.readonly2').val("重新获取");
	      	$('.readonly2').css({'color':'#fff','background':'#3dcdec'});
	      	$(".readonly2").removeAttr('disabled');
	      	clearInterval(ee);
	    }else{
	      	$('.readonly2').css({'color':'#9c9c9c','background':'rgba(110, 110, 110, 0.1)'});
	      	$(".readonly2").attr('disabled','true');
	      	$('.readonly2').val("剩余时间"+ii+"s");
	    }
	}
   //发送短信验证码
	$('.readonly1').click(function(){
	    var telephone =$('#AlipayName').val();
	    var reg=/(1[3-9]\d{9}$)/;
	    if(!telephone){
	    	layer.msg('手机号码不能为空！');
	    	return false;
	    } else if(!reg.test(telephone)){
	    	layer.msg('请输入正确格式的手机号码！');
	    	return false;
	    } else{
//	    	show_img_authcode()
	    	// layer.msg('发送成功！');
	    	i=60;
	    	e=setInterval(resendVal1,1000);
	    }
//	    show_img_authcode();
	});
	$('.readonly2').click(function(){
	    var telephone =$('#phoneNum').val();
	    var reg=/(1[3-9]\d{9}$)/;
	    if(!telephone){
	    	layer.msg('手机号码不能为空！');
	    	return false;
	    } else if(!reg.test(telephone)){
	    	layer.msg('请输入正确格式的手机号码！');
	    	return false;
	    } else{
//	    	show_img_authcode()
	    	// layer.msg('发送成功！');
	    	 ii=60;
	    	 ee=setInterval(resendVal2,1000);
	    }
//	    show_img_authcode();
	});
	
	//信息确认  修改
	$("#messageAffirm").on("click",function(){
    	$(".messageAffirm").addClass("dis_none");
    	$(".bindingAlipay").removeClass("dis_none");
	});
	//信息确认  绑定账户
	$("#accessAccount").on("click",function(){
		$(".AlipayFill").prev().children("img").attr("src","img/userCenter/icon_Dblist2.png");
		$(".AlipayFill").text($("#AlipayName").val());
    	$(".AlipayFill").removeClass("dis_none");
    	$("#Alipay").addClass("dis_none");

    	popupClose();
    	$(".messageAffirm").addClass("dis_none");
	});
	
	
	//点击绑定QQ
	$("#qqWecat").on("click",function(){
    	popupArise();
    	$(".bindingQQ").removeClass("dis_none");
	});
	$("#QQAffirm").on("click",function(){
		var QQname = $("#QQname").val();
		var QQnum = $("#QQnum").val();

    	if ( QQname == "" ) {
    		layer.msg("QQ昵称不能为空哦！");
    		return false;
    	}
		if(!QQnum){
			layer.msg('QQ号码不能为空！');
			return false;
		}
		var QQreg=/([1-9][0-9]{4,})/;
		var QQreg=/([1-9][0-9]{4,14})/;//第一位1-9之间的数字，第二位0-9之间的数字，数字范围4个到14之间
		if(!QQreg.test(QQnum)){
			layer.msg('请输入正确格式的QQ号码！');
			return false;
		}
		$(".qqWecatFill").prev().children("img").attr("src","img/userCenter/icon_Dblist3.png");
		$(".qqWecatFill").text($("#QQnum").val());
    	$(".qqWecatFill").removeClass("dis_none");
    	$("#qqWecat").addClass("dis_none");
    	popupClose();
    	$(".bindingQQ").removeClass("dis_none");
	});
	
	//点击绑定微信
	$("#Wecat").on("click",function(){
    	
	});
	
	//点击绑定手机号码
	$("#telephoneButon").on("click",function(){
    	popupArise();
    	$(".verify").removeClass("dis_none");
	});
	$("#verifyAffirm").on("click",function(){
		var phoneNum = $("#phoneNum").val();
    	var messageCode = $("#messageCode2").val();
    	
    	if ( phoneNum == "" ) {
    		layer.msg("手机号码不能为空哦！");
    		return false;
    	}
    	var reg1=/(1[3-9]\d{9}$)/;
    	if ( !reg1.test(phoneNum) ) {
    		layer.msg("请输入正确格式的手机号码！");
    		return false;
    	}
    	if ( messageCode == "" ) {
    		console.log(messageCode);
    		layer.msg("验证码不能为空哦！");
    		return false;
    	}
    	$(".telephoneFill").prev().children("img").attr("src","img/userCenter/icon_Dblist5.png");
		$(".telephoneFill").text($("#phoneNum").val());
    	$(".telephoneFill").removeClass("dis_none");
    	$("#telephoneButon").addClass("dis_none");
    	popupClose();
    	$(".verify").removeClass("dis_none");
	});
	
	
	
	
	//点击完善收货地址
    $("#address").on("click",function(){
    	popupArise();
    	$(".shippingAddress").removeClass("dis_none");
	});
	
    $("#shippingAddressAffirm").on("click",function(){
    	var deliveryAddress = $(".deliveryAddress").val();
    	if ( $(".deliveryAddress").val() == "" ) {
    		layer.msg("地址不能为空哦！");
    		return false;
    	}else{
    		$(".addressFill").prev().children("img").attr("src","img/userCenter/icon_Dblist6.png");
    		$(".addressFill").text(deliveryAddress);
    		$(".addressFill").removeClass("dis_none");
    		$("#address").addClass("dis_none");
    		popupClose();
	    	$(".shippingAddress").addClass("dis_none");
    	}
	});
	
	
	
	//点击退出
	$(".secede").on("click",function(){
    	window.location="login.html";
	});
});
