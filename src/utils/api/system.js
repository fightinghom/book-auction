import help from '../httpHelper'
const system = {
	login(request) {
		const api = 'bookAuctionServer/login'
		const method = 'POST'
		return help.httpHelper2(api, method, request)
	},
	getUserById(request) {
		const api = 'bookAuctionServer/user'
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	addUser(request) {
		const api = 'bookAuctionServer/user/add'
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	saveUser(request) {
		const api = 'bookAuctionServer/user/save'
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	getUserList(request) {
		const api = 'bookAuctionServer/userList'
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	getUserTotalPage(request) {
		const api = 'bookAuctionServer/userTotalPages'
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	savePic(request) {
		const api = 'bookAuctionServer/pic/save'
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	deleteUserById(request) {
		const api = 'bookAuctionServer/user/del'
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	getSetting(request) {
		const api = 'bookAuctionServer/setting/get'
		const method = "POST"
		return help.httpHelper2(api, method, request)
	},
	updateSetting(request) {
		const api = 'bookAuctionServer/setting/update'
		const method = "POST"
		return help.httpHelper2(api, method, request)
	}
}

export default system
