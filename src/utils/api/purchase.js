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
	}
}

export default purchase
