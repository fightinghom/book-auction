import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Auction from '@/views/auction/Index'
import Sell from '@/views/sell/Index'
import Purchase from '@/views/purchase/Index'
import Evaluate from '@/views/evaluate/Index'
import Forum from '@/views/forum/Index'
import Feedback from '@/views/feedback/Index'
Vue.use(Router)

export default new Router({
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
		path: '/home',
		name: 'Home',
		component: Home,
		redirect: '/auction',
		children: [
			{
				path: '/auction',
				name: 'Auction',
				component: Auction
			},

			{
				path: '/sell',
				name: 'Sell',
				component: Sell
			},
			{
				path: '/purchase',
				name: 'Purchase',
				component: Purchase
			},
			{
				path: '/evaluate',
				name: 'Evaluate',
				component: Evaluate
			},
			{
				path: '/forum',
				name: 'Forum',
				component: Forum
			},
			{
				path: '/feedback',
				name: 'Feedback',
				component: Feedback
			}

		]
	}
  ]
})
