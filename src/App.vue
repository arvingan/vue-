<template>
	<div id="app">
		<popup v-model="flag" position="right" width="63%">
			<div>
				<div class="zzzcbox">
					<div class="titlename" v-if="useralldata != ''" style="background-color: #333;line-height: 34px;">
						<div style="font-size: 20px;font-weight: bold;color: #fff;text-align: center;">{{useralldata.detail.username}}</div>
						<div style="font-size: 16px;">
							<div><span style="font-weight: bold;color: #fff;">积分：{{useralldata.detail.point}}</span></div>
							<div><span style="font-weight: bold;color: #fff;"> 余额：{{useralldata.detail.balance}}</span></div>
						</div>
					</div>
					<div class="titlename" v-if="useralldata == ''" style="padding-bottom: 25px;">
						<div class="big-button" v-on:click="gologinFun">点击登录</div>
						<div style="margin-top: 10px;text-align: center;">没有账户?</div>
						<div class="big-button" v-on:click="usersignup" style="background-color:rgb(48, 85, 159);">点击注册</div>
					</div>
					<div v-if="useralldata == ''" >
						<router-link to="/contact">
							<div v-on:click="mask" class="tipname active">联系客服</div>
						</router-link>
					</div>
					<div v-if="useralldata != ''">
						<router-link to="/userhome/userdata">
							<div v-on:click="mask" class="tipname">我的资料</div>
						</router-link>
						<router-link to="/userhome/invitecode">
							<div v-on:click="mask" class="tipname">我的邀请/领积分</div>
						</router-link>

						<router-link to="/userhome/goallist">
							<div v-on:click="mask" class="tipname active" style="position: relative;">
								我的抽奖列表
							</div>
						</router-link>
						<router-link to="/userhome/shiti">
							<div v-on:click="mask" class="tipname" style="position: relative;">
								实体商品
							</div>
						</router-link>

						<div v-on:click="mask" onclick="window.appvue.daojudialogObj('pcdaoju')" class="tipname">我的道具
							<sup class="tipnumber">
								{{useralldata.detail.itemsNum}}
						</sup>
						</div>
						<router-link to="/userhome/mycards">
							<div v-on:click="mask" class="tipname">
								我的卡池
								<sup class="tipnumber">
									{{useralldata.detail.prizeNum}}
								</sup>
							</div>
						</router-link>
						<!--<router-link to="/dailypage">
							<div v-on:click="mask" class="tipname">每日签到(新手任务)</div>
						</router-link>-->
						<router-link to="/userorder">
							<div v-on:click="mask" class="tipname active" style="position: relative;">
								订单列表
							</div>
						</router-link>
						<router-link to="/userhome/usershaidan">
							<div v-on:click="mask" class="tipname" style="position: relative;">
								晒单有奖
							</div>
						</router-link>
						<div v-on:click="userrecharge" class="tipname active">充值/开通会员</div>

						<router-link to="/rechargeRecord">
							<div v-on:click="mask" class="tipname" style="margin-top: 1px;">充值记录</div>
						</router-link>

						<router-link to="/contact">
							<div v-on:click="mask" class="tipname active">联系客服</div>
						</router-link>

						<div class="tipname active" v-on:click="logout">
							退出
						</div>
					</div>
				</div>
			</div>
		</popup>

		<div class="app-header">
			<!--			<div class="icon app-userown" style="" v-if="show ==1" v-on:click="maskinfo"></div>-->
			<div class="icon app-left" style="" v-if="text ==1 " v-on:click="back"></div>
			<div>
				<router-link to='/'>
					<div class="icon app-middle" style="">
					</div>
				</router-link>
			</div>
			<div class="icon app-right" style="" v-on:click="maskinfo">
			</div>
		</div>
		<div style="margin-top:65px;">
			<router-view transition="expand"></router-view>
		</div>
		
		
		<toast :time="5000" v-model="showalert" type="cancel">{{msg}}</toast>
		<toast :time="5000" v-model="showtoast.show" type="success">{{showtoast.msg}}</toast>
		<toast :time="5000" v-model="showcancel.show" type="cancel">{{showcancel.msg}}</toast>
		<daojudialog v-bind="{daojudialogObj:daojudialogObj,useralldata:useralldata,daojudialogData:daojudialogData}" v-if="useralldata!=''"></daojudialog>
		<my-userdialog v-bind="{userdialogObj:userdialogObj,useralldata:useralldata}"></my-userdialog>
		<helpdialog v-bind="{helpdialogObj:helpdialogObj,useralldata:useralldata,helpdata:helpdata}"></helpdialog>
		<Taskdialog v-bind="{TaskdialogObj :TaskdialogObj}"></Taskdialog>
		<rechargedialog v-bind="{rechargeObj:rechargeObj,useralldata:useralldata}"  v-if="useralldata!=''"> </rechargedialog>
		<forgetpass v-bind="{userpassObj :userpassObj}"></forgetpass>

	</div>

</template>

<script>
	import { XHeader, XInput, Group, Toast } from 'vux'

	export default {
		name: 'app',
		directives: {

		},
		watch: {
			"$route": "routerListener",
			$route(to, from) {
				if(to.path == '/') {
					this.show = 1
					this.text = 0
				} else {
					this.text = 1
					this.show = 0
				}
				window.seofun();
			}

		},
		components: {
			XInput,
			Group,
			XHeader,
			Toast
		},
		data() {
			return {
				remberflag: '',
				username: '',
				rightvalue: [{
					name: '联系客服',
					active: false,
					router: '/contact'
				}, ],
				showtoast: {
					msg: '',
					show: false
				},
				showcancel: {
					msg: '',
					show: false
				},
				prizeNum: '',
				showalert: false,
				logindata: {
					email: "",
					password: "",
				},
				showScrollBox: false,
				text: '',
				show: '',
				flag: false,
				helpflag: false,
				useralldata: localStorage.getItem('userdata') == null ? "" : JSON.parse(localStorage.getItem('userdata')),
				msg: '',
				timedata: {
					"newsid": 8000,
					"newstype": "newsid"
				},
				usertoken: {
					token: ''
				},
				helpdialogObj: "",
				helpdata: "",
				daojudialogObj: "",
				daojudialogData:"",
				userdialogObj: "",
				TaskdialogObj: "",
				rechargeObj: "",
				userpassObj: ""
			}
		},
		methods: {
			//监听路由变化
			routerListener: function() {
				if(window.location.href.indexOf('userhome') != -1) {
					if(this.useralldata == '') {
						this.$router.push('/')
					}

				}
			},
			testViewport: function() {
				document.getElementsByName("viewport")[0].setAttribute('content', 'width=auto,initial-scale=1,user-scalable=no');
				var devicewidth = '520';
				var docW = document.documentElement.clientWidth;
				docW = (docW) / 520;
				docW = docW > 1 ? 1 : docW;
				var tvp = 'width=' + devicewidth + ',initial-scale=' + docW + ',user-scalable=no';
				document.getElementsByName("viewport")[0].setAttribute('content', tvp);
			},
			rempass: function() {
				if(this.remberflag == 1) {
					localStorage.removeItem("password");
					this.remberflag = 0;
				} else {
					this.remberflag = 1;
					localStorage.setItem("password", this.logindata.password);

				}
			},
			gologinFun: function() {
				this.flag = !this.flag
				window.appvue.userdialogObj('userlogin')
			},
			usersignup: function() {
				this.flag = !this.flag
				window.appvue.userdialogObj('usersignup');
			},
			userrecharge: function() {
				window.appvue.rechargeObj('userrecharge');
				this.flag = !this.flag;
				
			},
			mask: function() {
				this.flag = !this.flag
			},
			//左侧导航栏更新信息
			maskinfo: function() {
				if(this.flag == true) {
					this.flag = false;
				} else {
					this.flag = true;
				}
				if(this.useralldata != '') {
					this.usertoken.token = JSON.parse(localStorage.getItem('userdata')).token
					this.$http.post(window.APIHostUrl + "/user/viewUser", 'clientType=' + window.clientType + '&Version="1"&jsonPara=' + JSON.stringify(this.usertoken))
						.then(function(successCallback) {
							if(successCallback.data.code == "0000") {
								this.useralldata.detail = successCallback.data.detail;
								localStorage.setItem('userdata', JSON.stringify(this.useralldata));
							}
						});
				}
			},
			help: function(index, data) {
				for(var i = 0; i < this.rightvalue.length; i++) {
					this.rightvalue[i].active = false
				}
				this.rightvalue[index].active = true
				this.$router.push({
					path: data

				})
				if(this.helpflag == true) {
					this.helpflag = false;
				} else {
					this.helpflag = true;
				}
			},
			helpclose: function() {
				if(this.helpflag == true) {
					this.helpflag = false;
				} else {
					this.helpflag = true;
				}
			},
			helpinfo: function() {
				if(this.helpflag == true) {
					this.helpflag = false;
				} else {
					this.helpflag = true;
				}
				if(this.useralldata != '') {
					this.usertoken.token = JSON.parse(localStorage.getItem('userdata')).token
					this.$http.post(window.APIHostUrl + "/user/viewUser", 'clientType=' + window.clientType + '&Version="1"&jsonPara=' + JSON.stringify(this.usertoken))
						.then(function(successCallback) {
							if(successCallback.data.code == "0000") {
								this.useralldata.detail = successCallback.data.detail;
								localStorage.setItem('userdata', JSON.stringify(this.useralldata));
							}
						});
				}
			},
			back: function() {
				window.history.back();
			},
			TimeoutExit: function() {
				localStorage.removeItem("userdata");

			},
			logout: function() {
				if(this.flag == true) {
					this.flag = false;
				} else {
					this.flag = true;
				}
				localStorage.removeItem("userdata");
				location.reload();
			},
			addtoken: function(token) {
				this.useralldata.token = token;
				localStorage.setItem('userdata', JSON.stringify(this.useralldata));
				this.userDataFun();
			},
			logoutright: function() {
				if(this.helpflag == true) {
					this.helpflag = false;
				} else {
					this.helpflag = true;
				}
				localStorage.removeItem("userdata");
				location.reload();
			},
			userDataFun: function() {

				if(JSON.parse(localStorage.getItem('userdata')) != null) {
					this.useralldata = JSON.parse(localStorage.getItem('userdata'));

				} else {
					this.useralldata = "";
				}
			},
			loginalert: function() {
				var Req = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
				if(Req.test(this.logindata.email)) {
					localStorage.setItem("useremail", this.logindata.email);
					this.$http.post(window.APIHostUrl + "/user/login", 'clientType=' + window.clientType + '&Version="1"&jsonPara=' + JSON.stringify(this.logindata))
						.then(function(successCallback) {
							if(successCallback.data.code == "0000") {
								this.msg = successCallback.data.msg;
								this.useralldata = successCallback.data;
								localStorage.setItem("password", this.logindata.password);
								localStorage.setItem('userdata', JSON.stringify(this.useralldata));
								location.reload();
							} else {
								this.msg = successCallback.data.msg
								this.showalert = true
							}
						})
				} else {
					this.showalert = true
					this.msg = '请输入正确信息'
				}
			},
			//			更新信息
			getuserdata: function() {
				///一级更新user
				if(JSON.parse(localStorage.getItem('userdata')) != null) {
					this.usertoken.token = JSON.parse(localStorage.getItem('userdata')).token
					this.$http.post(window.APIHostUrl + "/user/viewUser", 'clientType=' + window.clientType + '&Version="1"&jsonPara=' + JSON.stringify(this.usertoken))
						.then(function(successCallback) {
							if(successCallback.data.code == "0000") {
								this.useralldata.detail = successCallback.data.detail;
								localStorage.setItem('userdata', JSON.stringify(this.useralldata));
								this.userDataFun();
							}
						});
				}
			},
			gotologin: function() {
				localStorage.removeItem("userdata");
				this.$router.push('/login')
			},

		},
		mounted: function() {
			window.proFun();
			if(this.$route.path == '/') {
				this.show = 1
				this.text = 0
			} else {
				this.text = 1
				this.show = 0
			}
			this.userDataFun();
			//这里是vue初始化完成后执行的函数
			this.testViewport();
			//				循环执行
			setInterval(() => {
				this.userDataFun();
			}, 1000)
			if(localStorage.getItem("useremail") != null) {
				this.logindata.email = localStorage.getItem("useremail")
			}
			if(localStorage.getItem("password") != null) {
				this.logindata.password = localStorage.getItem("password");
				this.remberflag = 1;
			}
		}
	}
</script>

<style lang="less">
	.expand-transition {
		transition: all .3s ease;
		overflow: hidden;
	}
	
	.expand-enter,
	.expand-leave {
		height: 0;
		padding: 0px 10px;
		opacity: 0;
	}
	
	@import '~vux/src/styles/reset.less';
</style>