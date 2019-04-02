import help from '../httpHelper'
const sell = {
	addBook(request) {
		const api = 'bookAuctionServer/book/add'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getOrderPages(request) {
		const api = 'bookAuctionServer/order/pages'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getOrderList(request) {
		const api = 'bookAuctionServer/order/list'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	comformOrder(request) {
		const api = 'bookAuctionServer/order/comform'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
}

export default sell
