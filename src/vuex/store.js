import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//window.clone=function(obj) {
//  // Handle the 3 simple types, and null or undefined
//  if (null == obj || "object" != typeof obj) return obj;
//
//  // Handle Date
//  if (obj instanceof Date) {
//      var copy = new Date();
//      copy.setTime(obj.getTime());
//      return copy;
//  }
//
//  // Handle Array
//  if (obj instanceof Array) {
//      var copy = [];
//      for (var i = 0; i < obj.length; ++i) {
//          copy[i] = clone(obj[i]);
//      }
//      return copy;
//  }
//
//  // Handle Object
//  if (obj instanceof Object) {
//      var copy = {};
//      for (var attr in obj) {
//          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
//      }
//      return copy;
//  }
//
//  throw new Error("Unable to copy obj! Its type isn't supported.");
//}
//
//let userdataA=localStorage.getItem('userdata') == null ? "" : JSON.parse(localStorage.getItem('userdata'));
//let userdataB=window.clone(userdataA);
// 首先声明一个状态 state
//Vuex store 实例的根 state 对象。
const state = {
	count: 0,
	//userData:userdataB,
	userData:localStorage.getItem('userdata') == null ? "" : JSON.parse(localStorage.getItem('userdata'))
};

// 然后给 actions 注册事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
//在 store 上注册 action。处理函数总是接受 context 作为第一个参数，payload 作为第二个参数（可选）
const actions = {
increment: ({ commit }) => commit('increment'), // 提交到mutations中处理
decrement: ({ commit }) => commit('decrement')
}
// 更新状态
// store 上注册 mutation，处理函数总是接受 state 作为第一个参数（如果定义在模块中，则为模块的局部状态），payload 作为第二个参数（可选）
const mutations = {
increment (state,stark) {
	console.log(stark);
    state.count = state.count + stark.n;
},
decrement (state) {
    state.count = state.count - 3
}
}
// 获取状态信息
//在 store 上注册 getter，getter 方法接受以下参数
const getters = {
}

// 下面这个相当关键了，所有模块，记住是所有，注册才能使用
export default new Vuex.Store({
state,
mutations,
actions,
getters,
strict: process.env.NODE_ENV !== 'production', // 严格模式
})