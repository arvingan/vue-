<template>
	<div id="app">
		{{userData.token}}
		{{$store.state.count}}-{{count}}
		<div @click="$store.commit('increment',{n:1})">+</div>
		<div @click="$store.commit('decrement')">-</div>
		<pc-header v-bind="{useralldata:useralldata}"></pc-header>
		<div style="position: relative;">
			<div style="width: 840px;margin:0 auto;height: auto;min-height: 400px;">
				<router-view transition="expand"></router-view>
			</div>
		</div>

		<pc-footer ref="footerPublicApp"></pc-footer>

		<toast v-model="showalert" type="cancel" :time="5000">{{msg}}</toast>
		<toast v-model="showtoast.show" type="success" :time="5000">{{showtoast.msg}}</toast>
		<toast v-model="showcancel.show" type="cancel" :time="5000">{{showcancel.msg}}</toast>
		<toast v-model="showtext.show"  :time="5000">{{showtext.msg}}</toast>

		<helpdialog v-bind="{helpdialogObj:helpdialogObj,helpdata:helpdata}"></helpdialog>
		<daojudialog v-bind="{daojudialogObj:daojudialogObj,useralldata:useralldata,daojudialogData:daojudialogData}"></daojudialog>
		<my-userdialog v-bind="{userdialogObj:userdialogObj,useralldata:useralldata}"></my-userdialog>
		<rechargedialog v-if="useralldata!=''" v-bind="{rechargeObj:rechargeObj,useralldata:useralldata}"></rechargedialog>
		<Taskdialog v-bind="{TaskdialogObj :TaskdialogObj}"></Taskdialog>
		<pc-code-pay v-bind="{payfunObj :payfunObj}"></pc-code-pay>
		<forgetpass v-bind="{userpassObj :userpassObj}"></forgetpass>
		
	</div>

</template>
<script>
	import {mapState} from "vuex";
	export default {
		name: 'app',
		computed:{
			...mapState(["count"])
		},
		directives: {

		},
		data() {
			return {
				//商品列表筛选ajax
				screenAjax: {
					"newsid": 9000,
					"newstype":"newsid"
				},
				screenData:{
					game:"",
               	 	type:"",
              		status:""
				},

				showalert: false,
				msg: '',
				showtoast: {
					msg: '',
					show: false
				},
				showcancel: {
					msg: '',
					show: false
				},
				showtext: {
					msg: '',
					show: false
				},

				useralldata: this.$store.state.userData,
				userData:"",
				timedata: {
					"newsid": 8000,
					"newstype":"newsid"
				},
				usertoken: {
					token: ''
				},
				//help
				helpdialogObj: "",
				helpdata: "",
				//
				daojudialogObj: "",
				daojudialogData:"",
				userdialogObj: "",
				TaskdialogObj: "",
				rechargeObj: "",
				payfunObj: "",
				userpassObj:""
			}
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			"$route": "routerListener",
			$route(to, from) {
				window.seofun();
			}
		},
		methods: {
			userDataFun: function() {
				//缓存不为空
				if(JSON.parse(localStorage.getItem('userdata')) != null) {
					//数据和缓存对比
					if(JSON.stringify(this.useralldata) != localStorage.getItem('userdata')) {
						this.useralldata = JSON.parse(localStorage.getItem('userdata'));
						if(window.clientType == 'pc') {
							JsObj.refresh_userinfo(JSON.stringify(this.useralldata));
						}
					}
				} else {
					this.useralldata = "";
				}
				
				//console.log(this.$store.state.count);
				//console.log(this.count);
				//this.$store.commit('increment');
			},

			alertloginboxFun: function(type) {
				//this.showloginbox = 1
				if(type == "auto") {
					if(this.$refs.footerPublicApp.loginBoxShow == true) {
						this.$refs.footerPublicApp.loginBoxShow = false;
					} else {
						this.$refs.footerPublicApp.loginBoxShow = true;
					}
				} else {
					this.$refs.footerPublicApp.loginBoxShow = type;
				}
			},
			//弹出popup控件控制器
			popupFun: function(type) {
				if(type == "auto") {
					if(this.$refs.footerPublicApp.popupShow == true) {
						this.$refs.footerPublicApp.popupShow = false;
					} else {
						this.$refs.footerPublicApp.popupShow = true;
					}
				} else {
					this.$refs.footerPublicApp.popupShow = type;
				}
			},

			//更新用户信息
			addtoken: function(token) {
				this.useralldata.token = token;
				localStorage.setItem('userdata', JSON.stringify(this.useralldata));
				this.userDataFun();
			},
			getuserdata: function() {
				///一级更新user
				if(this.useralldata != "") {
					this.usertoken.token = this.useralldata.token
					this.$http.post(window.APIHostUrl + "/user/viewUser", 'clientType=' + window.clientType + '&Version="1"&jsonPara=' + JSON.stringify(this.usertoken))
						.then(function(successCallback) {
							if(successCallback.data.code == "0000") {
								var getUD=JSON.parse(localStorage.getItem('userdata'));
								getUD.detail = successCallback.data.detail;
								localStorage.setItem('userdata', JSON.stringify(getUD));
								this.userDataFun();
							}
						});
				}
			},

			gotologin: function() {
				localStorage.removeItem("userdata");
				this.$router.push('/login')
			},
			TimeoutExit: function() {
				localStorage.removeItem("userdata");

			},
			//退出方法
			logout: function() {
				if(window.clientType == 'pc') {
					JsObj.exit_();
				}
				localStorage.removeItem("userdata");
				window.location.reload();
				this.userDataFun();

				if(window.location.href.indexOf('userhome') != -1) {
					this.$router.push('/')
				}
			},
			//监听路由变化
			routerListener: function() {
				if(window.location.href.indexOf('userhome') != -1) {
					if(this.useralldata == '') {
						this.$router.push('/')
					}

				}
			},

		},
		mounted: function() {
			
			window.proFun();
			

			//this.userDataFun();
			if(window.clientType == 'pc') {
				window.userLoginData = JsObj.get_userinfo();
				if(window.userLoginData.length != 0) {
					localStorage.setItem('userdata', window.userLoginData);
				}
			}
			this.userData=this.$store.state.userData;
			setInterval(() => {
				
				this.userDataFun();
			}, 1000)
			setInterval(() => {
				this.getuserdata();
			}, 5*60 * 1000)
			this.getuserdata();
			
			
		}
	}
	
</script>
