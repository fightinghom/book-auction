import FeedBackWait from '@/views/feedback/Wait'
import FeedBackWrite from '@/components/detail/FeedbackDetail'
import FeedBackAboutMe from '@/views/feedback/AboutMe'
import FeedBackSquare from '@/views/feedback/Square'

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
			title: '评价'
		}
	},
	{
		path: 'aboutme',
		name: 'FeedBackAboutMe',
		component: FeedBackAboutMe,
		meta: {
			title: '关于我的'
		}
	}
]

export default feedback
