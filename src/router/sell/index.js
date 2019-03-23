import Sell from '@/views/sell/Index'

import SellChild from './router'

const sellIndex = [
	{
		path: '/sell',
		name: 'Sell',
		component: Sell,
		children: SellChild
	}
]

export default sellIndex
