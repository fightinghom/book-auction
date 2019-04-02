import help from '../httpHelper'
const common = {
	getOrderCode(request) {
		const api = 'bookAuctionServer/order/code/get'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	vertiryOrderCode(request) {
		const api = 'bookAuctionServer/order/code/vertify'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	cancelOrder(request) {
		const api = 'bookAuctionServer/order/cancel'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	}
}

export default common
