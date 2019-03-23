
import Forum from '@/views/forum/Index'

import ForumChild from './router'

const forumIndex = [
	{
		path: '/forum',
		name: 'Forum',
		component: Forum,
		children: ForumChild
	}
]

export default forumIndex
