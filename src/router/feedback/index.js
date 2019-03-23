
import Feedback from '@/views/feedback/Index'

import FeedbackChild from './router'

const feedbackIndex = [
	{
		path: '/feedback',
		name: 'Feedback',
		component: Feedback,
		children: FeedbackChild
	}
]

export default feedbackIndex
