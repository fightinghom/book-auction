import Purchase from '@/views/purchase/Index'

import PurchaseChild from './router'

const purchaseIndex = [
	{
		path: '/purchase',
		name: 'Purchase',
		component: Purchase,
		children: PurchaseChild
	}
]

export default purchaseIndex
