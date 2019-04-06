import FeedBackWait from '@/views/feedback/Wait'
import FeedBackWrite from '@/views/feedback/Write'

const feedback = [
	{
		path: 'wait',
		name: 'FeedBackWait',
		component: FeedBackWait,
		meta: {
			title: '我的评价'
		}
	},
	{
		path: 'write',
		name: 'FeedBackWrite',
		component: FeedBackWrite,
		meta: {
			title: '我的评价'
		}
	},
]

export default feedback
