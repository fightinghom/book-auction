import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Mobile from '@/views/Mobile'
import Login from '@/views/Login'
import page404 from '@/components/404'

import auction from './auction/index'
import evaluate from './evaluate/index'
import feedback from './feedback/index'
import forum from './forum/index'
import manage from './manage/index'
import purchase from './purchase/index'
import sell from './sell/index'
import mobile from './mobile/index'

const modules = []

const routeModules = modules.concat(
	auction,
	evaluate,
	feedback,
	forum,
	manage,
	purchase,
	sell
)

Vue.use(Router)

const routers = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
	},
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/404',
		name: 'page404',
		component: page404
	},
	{
		path: '/mobile',
		name: 'Mobile',
		component: Mobile,
		redirect: '/order',
		children: mobile
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		redirect: '/auction',
		children: routeModules
	}
  ]
})


routers.beforeEach((to, from, next) => {
	if (to.matched.length === 0) {
		//如果没有匹配到检测是否存在前一路由，如果存在则保持前一路由，如果不存在则跳转至404页面
	  from.name ? next({
		name: from.name
	  }) : next('page404');
	} else {
	  next(); //如果匹配到正确跳转
	}
  })

export default routers
