import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Auction from '@/views/auction/Index'
	import AuctionMain from '@/views/auction/Main'
	import AuctionCategory from '@/views/auction/Category'
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
				component: Auction,
				redirect: '/auction_main',
				children: [
					{
						path: '/auction_main',
						name: 'AuctionMain',
						component: AuctionMain,
					},
					{
						path: '/auction/:cid',
						component: AuctionCategory
					},
					/* {
						path: '/auction/:bid',
					} */
				]
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
