//2018-07-27   16:25:40
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
	function resendVal(){
	    i--;
	    if( i==0 ){
	      	$('.acquire').text("重新获取");
	      	$('.acquire').css({'color':'rgba(212, 212, 212, 0.6)','border':'1px solid rgba(136, 136, 136, 0.52)'});
	      	$(".acquire").removeAttr('disabled');
	      	clearInterval(e);
	    }else{
	      	$('.acquire').css({'color':'#6e6e6e','border':'1px solid rgba(110, 110, 110, 0.1)'});
	      	$(".acquire").attr('disabled','true');
	      	$('.acquire').text("剩余时间"+i+"s");
	    }
	}
   //发送短信验证码
	$('#acquire').click(function(){
	    var telephone =$('#MobileNumber').val();
	    var reg=/(1[3-9]\d{9}$)/;
	    if(!telephone){
	    	layer.msg('手机号码不能为空！');
	    	return false;
	    } else if(!reg.test(telephone)){
	    	layer.msg('请输入正确格式的手机号码！');
	    	return false;
	    } else{
	    	show_img_authcode()
	    	// layer.msg('发送成功！');
	    	// i=60;
	    	// e=setInterval(resendVal,1000);
	    }
//	    show_img_authcode();
	});

//	触发 【发送验证码  按钮  结束
	team_id = getUrlParms('team_id');
    if (typeof(team_id)!='string'){
        team_id =0
    }

	//判断“下次自动登录”有没有打勾     0表示没有打勾。1表示打勾
	$("#tick").on("click",function(){
		var dataNum = $("#tick").attr("data-num");
		if ( dataNum == "0" ) {
			$("#tick").attr("data-num","1");
			$("#tick").removeClass("spanBg1").addClass("spanBg2");
		} else{
			$("#tick").attr("data-num","0");
			$("#tick").removeClass("spanBg2").addClass("spanBg1");
		}
	});
	
	//提交  登录
	$("#ringUp").on("click",function(){
		var code = $("#VerificationCode").val();
		var telephone=$('#MobileNumber').val();
		var passWord = $('#password').val();
		var dataNum = $(".spanTick").attr("data-num");
		var reg=/(1[3-9]\d{9}$)/;
	    if(!telephone){
	    	layer.msg('手机号码不能为空！');
	    	return false;
	    } else if(!reg.test(telephone)){
	    	layer.msg('请输入正确格式的手机号码！');
	    	return false;
	    }
	    
		if ( passWord == "" || !passWord ) {
	        layer.msg('请输入密码!');
	        return false;
	    } else if (passWord.length < 6) {
	        layer.msg('密码至少大于等于6位!');
	        return false;
	    } else if (passWord.length > 50) {
	        layer.msg('密码不能超过50位!');
	        return false;
	    } else if (passWord) {
	        var reg1 = /^[0-9a-zA-Z]+$/;
	        if (!reg1.test(passWord)){
	            layer.msg("密码只能由数字和字母组成！");
	            return false;
	        }
		}
		if( code == "" ){
			layer.msg("验证码不能为空");
			return false;
		}
		if( dataNum !== "1" ){
			layer.msg("请勾选阅读并接受协议、声明！");
			return false;
		}
		
		
		if( telephone !== "" && passWord !== ""  & code !==""){
//		   	$.ajax({
//	   			type:"post",
//		        url: '/api/authregist/', 
//		        data: JSON.stringify({
//		          	mobile: telephone,
//		          	passWord:passWord,
//		          	VerificationCode: code 
//		        }), 
//		        contentType:"application/json",
//		        dataType: "json",
//		        success: function(res) {
//		        	if (res.code ==0){
						layer.msg("登陆成功！");
//		        		setCookie("yz_tk",res.token)
//		        		setCookie("yz_id",res.user_id)
		        		window.location.href = 'index.html';
//		        	}else{	
//		        		layer.msg(res.msg)
//		        	}
//		        },
//		        error:function(res){ }
//		    });
		}
	});
	
	//用户协议
	$("#protocol").on('click', function() {
		popupArise();
		$('.mod_').removeClass('dis_none');
	});
	
	//隐私权保护声明
	$("#statement").on('click', function() {
		popupArise();
		$('.dwri_bule').removeClass('dis_none');
	});
});
