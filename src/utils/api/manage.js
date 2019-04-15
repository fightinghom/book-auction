import help from '../httpHelper'
const manage = {
	approve(request) {
		const api = 'bookAuctionServer/book/approve'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	fail(request) {
		const api = 'bookAuctionServer/book/failApprove'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	break(request) {
		const api = 'bookAuctionServer/order/break'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	resolve(request) {
		const api = 'bookAuctionServer/order/resolve'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
}

export default manage
