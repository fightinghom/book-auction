const step = {
	initStep(status, reason){
		let step = [{
			text: '买家完善订单',
			type: '',
			reason: ''
		},
		{
			text: '卖家确认订单',
			type: '',
			reason: ''
		},
		{
			text: '正在交易',
			type: '',
			reason: ''
		},
		{
			text: '交易完成',
			type: '',
			reason: ''
		}]
		if(status == 1 && reason == 0) {
			step[0].type = 'on'
		}
		if(status == 2 && reason == 0) {
			step[0].type = 'success'
			step[1].type = 'on'
		}
		if(status == 3 && reason == 0) {
			step[0].type = 'success'
			step[1].type = 'success'
			step[2].type = 'on'
		}
		if((status == 4 || status == 6) && reason == 0) {
			step[0].type = 'success'
			step[1].type = 'success'
			step[2].type = 'success'
			step[3].type = 'success'
		}
		if(status == 96 && reason == 0) {
			step[0].type = 'success'
			step[1].type = 'success'
			step[2].type = 'warning'

			step[2].reason = '交易停滞'
		}
		if((status == 5 || status == 7) && reason == 97) {
			step[0].type = 'success'
			step[1].type = 'success'
			step[2].type = 'failed'

			step[2].reason = this.failReason(reason)
		}
		if((status == 5 || status == 7) && reason == 98) {
			step[0].type = 'success'
			step[1].type = 'success'
			step[2].type = 'failed'

			step[2].reason = this.failReason(reason)
		}
		if((status == 5 || status == 6) && reason == 99) {
			step[0].type = 'success'
			step[1].type = 'success'
			step[2].type = 'failed'

			step[2].reason = this.failReason(reason)
		}
		if((status == 5 || status == 7) && reason == 100) {
			step[0].type = 'success'
			step[1].type = 'success'
			step[2].type = 'failed'

			step[2].reason = this.failReason(reason)
		}
		if((status == 5 || status == 7) && reason == 101) {
			step[0].type = 'success'
			step[1].type = 'success'
			step[2].type = 'failed'

			step[2].reason = this.failReason(reason)
		}
		if((status == 5 || status == 7) && reason == 102) {
			step[0].type = 'failed'

			step[0].reason = this.failReason(reason)
		}
		if((status == 5 || status == 7) && reason == 103) {
			step[0].type = 'failed'

			step[0].reason = this.failReason(reason)
		}
		if((status == 5 || status == 7) && reason == 104) {
			step[0].type = 'success'
			step[1].type = 'failed'

			step[1].reason = this.failReason(reason)
		}
		if((status == 5 || status == 7) && reason == 105) {
			step[0].type = 'success'
			step[1].type = 'failed'

			step[1].reason = this.failReason(reason)
		}

		return step
	},
	failReason(v) {
		let str = ''
		switch(v) {
			case 97:
				str = '卖家取消订单'
				break;
			case 98:
				str = '买家取消订单'
				break;
			case 99:
				str = '管理员关闭订单'
				break;
			case 100:
				str = '卖家违约'
				break;
			case 101:
				str = '买家违约'
				break;
			case 102:
				str = '卖家取消订单'
				break;
			case 103:
				str = '买家取消订单或超时'
				break;
			case 104:
				str = '卖家取消订单或超时'
				break;
			case 105:
				str = '买家取消订单'
				break;
			default:
				str = '未知情况'
		}
		return str
	},
}

export default step
