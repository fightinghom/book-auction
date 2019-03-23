import ManageCheck from '@/views/manage/CheckTable'
import ManageUser from '@/views/manage/UserTable'

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
	}
]

export default manage
