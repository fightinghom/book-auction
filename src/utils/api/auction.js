import help from '../httpHelper'
const auction = {
	getBookCategoryList(request) {
		const api = 'bookAuctionServer/bookCategoryList'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getBookTotalPage(request) {
		const api = "bookAuctionServer/bookTotalPages"
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	getBoookList(request) {
		const api = "bookAuctionServer/bookListByStatus"
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	getBookById(request) {
		const api = "bookAuctionServer/getBookById"
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	toEnroll(request) {
		const api = "bookAuctionServer/enroll"
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	getBidders(request) {
		const api = "bookAuctionServer/getBidders"
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	bid(request) {
		const api = "bookAuctionServer/bid"
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	getRecordTotalPages(request) {
		const api = "bookAuctionServer/getRecordTotalPages"
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	getRecordsOfPage(request) {
		const api = "bookAuctionServer/getRecordsOfPage"
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	getTopOfBooks(request) {
		const api = "bookAuctionServer/getbookList/top"
		const method = "POST"
		return help.httpHelper2(api, method, request)
	}
}

export default auction
