
import Manage from '@/views/manage/Index'

import ManageChild from './router'

const manageIndex = [
	{
		path: '/manage',
		name: 'Manage',
		component: Manage,
		children: ManageChild
	}
]

export default manageIndex
