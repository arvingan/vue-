import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'

//首页
import Home from '../pcpage/home/home'

Vue.use(Router)

const routes = [
	//home
	{
		path: '/',
		component: Home
	},
	{
		path: '/home',
		component: Home
	},
]

const router = new VueRouter({
	routes,
	 scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
  }
})
export default router;