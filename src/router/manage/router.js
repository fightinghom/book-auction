import ManageCheck from '@/views/manage/CheckTable'
import ManageUser from '@/views/manage/UserTable'
import ManageTable from '@/views/manage/OrderTabel'

const manage = [
	{
		path: 'check',
		name: 'ManageCheck',
		component: ManageCheck,
		meta: {
			title: '书籍审核'
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
		name: 'ManageTable',
		component: ManageTable,
		meta: {
			title: '交易订单'
		}
	}
]

export default manage
