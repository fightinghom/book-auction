const orderStatus = {
	getOrderStatusText(v) {
		let text = ''
		switch(v) {
			case 1:
				text = '买家完善订单'
				break;
			case 2:
				text = '卖家确认订单'
				break;
			case 3:
				text = '正在交易'
				break;
			case 4:
				text = '交易完成'
				break;
			case 6:
				text = '交易完成'
				break;
			case 7:
				text = '交易取消'
				break;
			case 96:
				text = '交易停滞'
				break;
			default:
				text = '交易取消'
		}
		return text;
	},
	orderTag(v) {
		let tag = {}
		switch(v) {
			case 1:
				tag.text = '待完善'
				tag.type = 'primary'
				break;
			case 2:
				tag.text = '待确认'
				tag.type = 'primary'
				break;
			case 3:
				tag.text = '交易中'
				tag.type = 'primary'
				break;
			case 4:
				tag.text = '交易完成'
				tag.type = 'success'
				break;
			case 5:
				tag.text = '交易取消'
				tag.type = 'danger'
				break;
			case 6:
				tag.text = '交易完成'
				tag.type = 'success'
				break;
			case 7:
				tag.text = '交易取消'
				tag.type = 'danger'
				break;
			case 96:
				tag.text = '交易停滞'
				tag.type = 'warning'
				break;
			default:
				tag.text = '未知状态'
				tag.type = 'danger'
		}
		return tag
	}
}

export default orderStatus
