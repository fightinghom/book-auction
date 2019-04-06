import help from '../httpHelper'
const feedback = {
	getPages(request) {
		const api = 'bookAuctionServer/feedback/page'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getFeedbackList(request) {
		const api = 'bookAuctionServer/feedback/list'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getFeedbackOne(request) {
		const api = 'bookAuctionServer/feedback/one'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	publishFeedback(request) {
		const api = 'bookAuctionServer/feedback/publish'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	}
}

export default feedback
