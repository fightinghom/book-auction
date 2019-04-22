import ManageCheck from '@/views/manage/CheckTable'
import ManageUser from '@/views/manage/UserTable'
import ManageOrder from '@/views/manage/OrderTabel'
import ManageHomeSet from '@/views/manage/HomeSetting'

const manage = [
	{
		path: 'check',
		name: 'ManageCheck',
		component: ManageCheck,
		meta: {
			title: '图书管理'
		}
	},
	{
		path: 'user',
		name: 'ManageUser',
		component: ManageUser,
		meta: {
			title: '用户管理'
		}
	},
	{
		path: 'order',
		name: 'ManageOrder',
		component: ManageOrder,
		meta: {
			title: '交易订单'
		}
	},
	{
		path: 'homeset',
		name: 'ManageHomeSet',
		component: ManageHomeSet,
		meta: {
			title: '首页设置'
		}
	}
]

export default manage
