//2018-06-21
//HQS
//用户代理
//标识头、标识码

var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsMidp = sUserAgent.match(/midp/i) == "midp";
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM){
	$(".mobile").css("display","block");
	$("html,body").css("max-width","750px");
	$(".pc").css("display","none");
}
else{
	$(".pc").css("display","block");
	$("html,body").css("min-width","1158px");
	$(".mobile").css("display","none");
}


$('#_Usercenter').on("click",function(){
//	if (getCookie("yz_tk")!=null || getCookie("yz_id")!=null) {
		window.location.href = 'userCenter.html';
//	}else{
		
		//window.location.href = 'login.html';
//	}
});

//获取地址参数
function getUrlParms(name){
   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
   var r = window.location.search.substr(1).match(reg);
   if(r!=null)
   return unescape(r[2]);
   return null;
}

//cookie
function setCookie(name,value){
	var exp = new Date();
	exp.setTime(exp.getTime() + 24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function getLoginStatus(){
    if(getCookie("yz_tk")==null || getCookie("yz_id")==null){
        layer.msg("请先登陆");
        return false;
    }
    return true;
}