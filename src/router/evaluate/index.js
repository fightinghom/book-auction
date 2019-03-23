import Evaluate from '@/views/evaluate/Index'

import EvaluateChild from './router'

const evaluateIndex = [
	{
		path: '/evaluate',
		name: 'Evaluate',
		component: Evaluate,
		children: EvaluateChild
	}
]

export default evaluateIndex
