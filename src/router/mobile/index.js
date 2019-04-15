import OrderDetail from '@/components/detail/OrderDetail'
import OrderList from '@/views/mobilePage/OrderList'
import User from '@/views/mobilePage/User'

const mobile = [
	{
		path: '/order',
		name: 'OrderList',
		component: OrderList,
		meta: {
			mode: 'order',
			memory: ''
		}
	},
	{
		path: '/user',
		name: 'User',
		component: User,
		meta: {
			mode: 'user'
		}
	},
	{
		path: '/detail/:oid',
		name: 'OrderDetail',
		component: OrderDetail,
		meta: {
			mode: 'detail'
		}
	}
]

export default mobile
