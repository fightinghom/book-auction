import FeedBackWait from '@/views/feedback/Wait'
import FeedBackWrite from '@/views/feedback/Write'
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
	},
	{
		path: 'square',
		name: 'FeedBackSquare',
		component: FeedBackSquare,
		meta: {
			title: '评论广场'
		}
	},
]

export default feedback
