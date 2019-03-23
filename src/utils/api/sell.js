import help from '../httpHelper'
const sell = {
	addBook(request) {
		const api = 'bookAuctionServer/book/add'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	queryBookByStatus(request) {

	},
}

export default sell
