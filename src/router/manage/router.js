import ManageCheck from '@/views/manage/CheckTable'
import ManageUser from '@/views/manage/UserTable'
import ManageOrder from '@/views/manage/OrderTabel'
import ManageHomeSet from '@/views/manage/HomeSetting'
import ManageFeedback from '@/views/manage/FeedbackManage'
import FeedbackDetail from '@/components/detail/FeedbackDetail'

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
			title: '订单管理'
		}
	},
	{
		path: 'homeset',
		name: 'ManageHomeSet',
		component: ManageHomeSet,
		meta: {
			title: '首页设置'
		}
	},
	{
		path: 'feedback',
		name: 'ManageFeedback',
		component: ManageFeedback,
		meta: {
			title: '评价管理'
		}
	},
	{
		path: 'feedback/detail',
		name: 'FeedbackDetail',
		component: FeedbackDetail,
		meta: {
			title: '评价详情',
			type: 'manage'
		}
	}
]

export default manage
