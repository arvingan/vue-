// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./style/js/pubilc.js')
import Vue from 'vue'
import FastClick from 'fastclick'
import pcApp from './pcApp'
import router from './router/pcrouter.js'
//页头
import { Popup } from 'vux'
import { ToastPlugin } from 'vux'
import { Scroller } from 'vux'

import VueResource from 'vue-resource';
import VueClipboard from 'vue-clipboard2'
import { LoadingPlugin } from 'vux'
import { Loading } from 'vux'
import plugin from './publicmod'
import Vuelazyload from 'vue-lazyload'

import store from './vuex/store'

Vue.use(Vuelazyload, {
	loading: require('./style/img/loading.gif')
})

require('./style/css/public/public.css')


Vue.use(plugin)
Vue.use(VueClipboard)
Vue.use(VueResource)
Vue.use(LoadingPlugin)
Vue.component('popup', Popup)
Vue.use(ToastPlugin)
Vue.use(Scroller)
import { Popover } from 'vux'
Vue.component('popover', Popover)
import { XDialog } from 'vux'
Vue.component('x-dialog', XDialog)
import { Group } from 'vux'
Vue.component('group', Group)
import { InlineXNumber } from 'vux'
Vue.component('inline-x-number', InlineXNumber)
import { Cell } from 'vux'
Vue.component('Cell', Cell)
import { XInput } from 'vux'
Vue.component('x-input', XInput)
import { XButton } from 'vux'
Vue.component('XButton', XButton)
import { Toast } from 'vux'
Vue.component('toast', Toast)
import { Marquee, MarqueeItem } from 'vux'
Vue.component('Marquee', Marquee)
Vue.component('MarqueeItem', MarqueeItem)
import { Qrcode } from 'vux'

Vue.component('qrcode', Qrcode)
import { Divider } from 'vux'
Vue.component('Divider', Divider)
//根目录中注册路由组件

//添加token
//window.appvue.$children[0].addtoken("9b34fb00e52d26ed5687631d95546fb474624756");
//post接口设置头部
Vue.http.options.headers = {
	'Content-Type': 'application/x-www-form-urlencoded'
};

//vue全局弹出登录fun
Vue.prototype.dialoglogin = function(type) {
	if(window.clientType == 'pc') {
		JsObj.openlogin();
	} else {
		window.appvue.userdialogObj('userlogin');
	}
}
//vue全局弹出框fun
Vue.prototype.popup = function(type) {
	if(typeof(type) == "undefined") {
		type = "auto"
	}
	window.appvue.$children[0].popupFun(type)
}
//vue全局弹出框payfun
Vue.prototype.payfunObj = function(obj) {
	window.appvue.$children[0].payfunObj = obj;
}
//
Vue.prototype.helpdialogObj = function(obj, helpdata) {
	window.appvue.$children[0].helpdialogObj = obj;
	if(typeof(helpdata) != "undefined") {
		window.appvue.$children[0].helpdata = helpdata;
	}
}
Vue.prototype.daojudialogObj = function(obj, data) {
	window.appvue.$children[0].daojudialogObj = obj;
	if(typeof(data) != "undefined") {
		window.appvue.$children[0].daojudialogData = data;
	}

}

Vue.prototype.userdialogObj = function(obj) {
	window.appvue.$children[0].userdialogObj = obj;
}
Vue.prototype.rechargeObj = function(obj) {
	window.appvue.$children[0].rechargeObj = obj;
}
Vue.prototype.TaskdialogObj = function(obj) {
	window.appvue.$children[0].TaskdialogObj = obj;
}
Vue.prototype.userpassFun = function(obj) {
	window.appvue.$children[0].userpassObj = obj;
}
window.htmlinfourl = "";
//全局监听http服务
Vue.http.interceptors.push(function(request, next) {
	next(function(response) {
		//如果不是0000,即错误,走错误流程.
		//		lodingFun();
		if(response.data != null && typeof(response.data.code) != "undefined") {
			let myDate = new Date();
			window.htmlinfourl = window.htmlinfourl + "<br>" + myDate + ":" + response.url;
			//alert(response.url);
			if(response.data.code != '0000') {
				//有错误提示
				if(typeof(response.data.msg) != "undefined" && response.data.code == '1000') {
					window.appvue.$children[0].showcancel.msg = '登录超时，3秒钟后跳转到登录页面';
					window.appvue.$children[0].showcancel.show = true;
					setTimeout(function() {
						window.appvue.$children[0].TimeoutExit();
						window.appvue.userdialogObj('userlogin');
					}, 3000)

				} else {
					window.appvue.$children[0].showcancel.msg = response.data.msg
					window.appvue.$children[0].showcancel.show = true
				}

			} else {

			}

		}
		return response
	});
});
//路由传参  
//name配对Params
//path配对query

FastClick.attach(document.body)

Vue.config.productionTip = false
//过滤器
Vue.filter('number', function(value) {
	if(!value) {
		return 0
	}
	value = parseInt(value * 100) / 100;
	return value;
})
Vue.filter('number0', function(value) {
	if(!value) {
		return 0
	}
	value = parseInt(value);
	return value;
})
Vue.filter('userimg', function(value) {

	return window.userimg + value;
})

/* eslint-disable no-new */
window.appvue = new Vue({
	router,
	store,
	render: h => h(pcApp)
}).$mount('#app-box')
//正则
window.Req = {
	email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
}
window.seofun = function() {
	if(document.location.href.indexOf("localhost") == -1) {
		setTimeout(function() {
			if($('iframe').length) {
				$('#childFrame div').remove();
			}
			var url = window.location.href.split('#')[1];
			var childFrame = "<div id='childFrame'><iframe src='" + location.origin + "/seo/seo.html?html=" + url + "'></iframe></div>";
			$('#childFrame').html(childFrame);
		}, 500)
	}
}
window.seofun();

