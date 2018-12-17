var host = {
	pc: "www.51xijiayi.com",
	mb: "m.51xijiayi.com"
}
window.proFun=function(){
	if(typeof(document.location.href.split("proc")[1]) != "undefined") {
				localStorage.setItem("procode", document.location.href.split("proc")[1].split("&")[0].split("#")[0]);
			}
			if(typeof(document.location.href.split("code=")[1]) != "undefined") {
				localStorage.setItem("promoter", document.location.href.split("code=")[1].split("&")[0].split("#")[0]);
			}
			if(typeof(document.location.href.split("tid")[1]) != "undefined") {
				localStorage.setItem("tid", document.location.href.split("tid")[1].split("&")[0].split("#")[0]);
			}
			
}
window.userimg="http://userimg.51xijiayi.com/";
var phoneVideo = function() {
	if(navigator.userAgent.match(/ (iPhone|iPod|webOS|Android)/i)) {
		window.clientType = 'mb';
		return 'mb';
	} else {
		if(typeof(JsObj) != "undefined") {
			window.clientType = 'pc';
			return 'web';
		} else {
			window.clientType = 'web';
			return 'web';
		}
	}

}
var thismb = phoneVideo();
var bodyadd = setInterval(function() {
	if(document.getElementsByTagName("body").length > 0) {
		document.getElementsByTagName("body")[0].classList.add(thismb);
		clearInterval(bodyadd);
	}
}, 100)
window.scrollTopFun = function(top) {
	$("html").animate({
		scrollTop: top
	}, 300);
	$("html").scrollTop(300);
}
//判断是本地不双端跳转
if(window.location.host.indexOf("localhost") == -1 && window.location.host.indexOf("cccweb92m") == -1) {
	//判断域是pc还是mb
	if(window.location.href.indexOf(host.mb) == -1) {
		var nowurl = "web";
	} else {
		var nowurl = "mb";
	}
	//切割#后面的链接
	if(nowurl != thismb) {
		if(typeof(window.location.href.split('#')[1]) != "undefined") {
			var togourl = window.location.href.split('#')[1];
		} else {
			var togourl = "";
		}

		if(togourl.indexOf("signup") == -1 && togourl.indexOf("goodsdetail") == -1) {
			togourl = "";
		}

		//跳转
		if(thismb == "mb") {
			window.location.href = 'http://' + host.mb + '/#' + togourl;
		} else {
			window.location.href = 'http://' + host.pc + '/#' + togourl;
		}

	}
}

var d = new Date()
var nowTimeHours = d.getHours();

window.pcPayList = [
	
	{
		paycode: "bufpayWX",
		payname: "微信",
		payurl: '/pay/bufpayImgPay',
		paytype: "img",
		status: 1,
		img: "微信"
	},
	{
		paycode: "bufpayZFB",
		payname: "支付宝",
		payurl: '/pay/bufpayImgPay',
		paytype: "img",
		status: 1,
		img: "支付宝"
	},
	
];
window.mbPayList = [

	{
		paycode: "MBbufpayWX",
		payname: "微信",
		payurl: '/pay/bufpayImgPay',
		paytype: "img",
		status: 1,
		img: "微信"
	},
	{
		paycode: "MBbufpayZFB",
		payname: "支付宝",
		payurl: '/pay/bufpayImgPay',
		paytype: "img",
		status: 1,
		img: "支付宝"
	},
];

if(nowTimeHours >= 8 && nowTimeHours <= 22) {
//	var yfPCpPay = {
//		paycode: "TFpayZFB",
//		payname: "支付宝",
//		payurl: '/pay/yfPCpPay',
//		paytype: "from",
//		status: 1,
//		img: "支付宝"
//	}
//	window.pcPayList.unshift(yfPCpPay);
	
//	var yfMBpPay = {
//		paycode: "TFpayZFB",
//		payname: "支付宝",
//		payurl: '/pay/yfMBpPay',
//		paytype: "from",
//		status: 1,
//		img: "支付宝"
//	}
//	window.mbPayList.unshift(yfMBpPay);

}

