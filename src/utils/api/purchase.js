import help from '../httpHelper'
const purchase = {
	getPages(request) {
		const api = 'bookAuctionServer/enroll/pages'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getBidderOfBookList(request) {
		const api = 'bookAuctionServer/enroll/book/list'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getOrderPages(request) {
		const api = 'bookAuctionServer/purchase/order/pages'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getBidderOfOrderList(request) {
		const api = 'bookAuctionServer/purchase/order/list'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getOrderDetail(request) {
		const api = 'bookAuctionServer/order/detail'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	updateMeet(request) {
		const api = 'bookAuctionServer/order/meet/update'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	}
}

export default purchase
