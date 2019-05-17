/**
 * [手机号码]
 * @type {RegExp} 可以以86开头的 第一位是1 第二位可以是 3，4，5，6，7，8，9 的11位电话号码
 */
const mobile = /^((\+86)|(86))?1(3|4|5|6|7|8|9)\d{9}$/
var depositRange = (rule, value, callback)  => {
	if(value > 20) {
		callback(new Error('保证金应该小于等于20'))
	}
	if(value < 5) {
		callback(new Error('保证金应该大于等于5'))
	}
	callback()
}

var startPriceRange = (rule, value, callback) => {
	if(value <= 0) {
		callback(new Error('保证金应该大于0'))
	}
	callback()
}

var increaseRange = (rule, value, callback) => {
	if(value < 3) {
		callback(new Error('保证金应该大于等于3'))
	}
	callback()
}

export const validate = {
	userId: [
		{
			required: true,
			message: '请输入学号',
			trigger: 'blur'
		}
	],
	password: [
		{
			required: true,
			message: '请输入密码',
			trigger: 'blur'
		},
		{
			min: 6,
			message: '密码至少6位',
			trigger: 'blur'
		}
	],
	register: {
		mobile: [
			{
				required: true,
				message: '请输入手机号码',
				trigger: 'blur'
			},
			{
				pattern: mobile,
				message: '请输入正确的手机号码',
				trigger: 'blur'
			},
		],
		comfirmPwd: [
			{
				required: true,
				message: '请再次输入密码',
				trigger: 'blur'
			}
		]
	},
	book: {
		name: [
			{
				required: true,
				message: '请输入图书名称',
				trigger: 'blur'
			},
			{
				max: 20,
				message: '名称最多20个字符',
				trigger: 'blur'
			}
		],
		author: [
			{
				required: true,
				message: '请输入作者',
				trigger: 'blur'
			},
			{
				max: 20,
				message: '名称最多20个字符',
				trigger: 'blur'
			}
		],
		category: [
			{
				required: true,
				message: '请选择类别',
				trigger: 'change'
			}
		],
		description: [
			{
				required: true,
				message: '请输入描述',
				trigger: 'blur'
			},
			{
				max: 500,
				message: '名称最多500个字符',
				trigger: 'blur'
			}
		],
		startPrice: [
			{
				required: true,
				message: '请输入起拍价格',
				trigger: 'blur'
			},
			{

				validator: startPriceRange,
				trigger: 'blur'
			}
		],
		endTime: [
			{
				type: 'date',
				required: true,
				message: '请选择拍卖结束时间',
				trigger: 'change'
			}
		],
		deposit: [
			{
				required: true,
				message: '请输入保证金',
				trigger: 'blur'
			},
			{
				validator: depositRange,
				trigger: 'blur'
			}
		],
		increaseRange: [
			{
				required: true,
				message: '请输入加价幅度',
				trigger: 'blur'
			},
			{
				validator: increaseRange,
				trigger: 'blur'
			}
		],
		img: [
			{
				type: 'array',
				required: true,
				message: '至少上传一张图片',
				trigger: 'change'
			}
		]
	},
	userInfo: {
		name: [
			{
				required: true,
				message: '请输入名称',
				trigger: 'blur'
			},
			{
				max: 10,
				message: '姓名长度应该在10个字符以内',
				trigger: 'blur'
			}
		],
		nikename: [
			{
				max: 10,
				message: '姓名长度应该在10个字符以内',
				trigger: 'blur'
			}
		],
		mobile: [
			{
				required: true,
				message: '请输入手机号',
				trigger: 'blur'
			},
			{
				pattern: mobile,
				message: '请输入正确的手机号码',
				trigger: 'blur'
			},
		]
	},
	proposal: {
		type:[
			{
				required: true,
				message: '请选择意见类型',
				trigger: 'blur'
			}
		],
		content: [
			{
				required: true,
				message: '请输入问题描述',
				trigger: 'blur'
			}
		]
	}

}
