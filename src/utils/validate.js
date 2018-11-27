/**
 * [手机号码]
 * @type {RegExp} 可以以86开头的 第一位是1 第二位可以是 3，4，5，6，7，8，9 的11位电话号码
 */
const mobile = /^((\+86)|(86))?1(3|4|5|6|7|8|9)\d{9}$/

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
	}

}
