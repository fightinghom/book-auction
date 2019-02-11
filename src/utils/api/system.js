import help from '../httpHelper'
const system = {
	login(request) {
		const api = 'bookAuctionServer/login'
		const method = 'POST'
		return new Promise((resolve,reject) => {
			return help.httpHelper(api, method, request, resolve, reject)
		})
	},
	getUserById(request) {
		const api = 'bookAuctionServer/user'
		const method = "POST"
		return new Promise((resolve,reject) => {
			return help.httpHelper(api, method, request, resolve, reject)
		})
	},
	addUser(request) {
		const api = 'bookAuctionServer/user/add'
		const method = "POST"
		return new Promise((resolve, reject) => {
			return help.httpHelper(api, method, request, resolve, reject)
		})
	},
	saveUser(request) {
		const api = 'bookAuctionServer/user/save'
		const method = "POST"
		return new Promise((resolve, reject) => {
			return help.httpHelper(api, method, request, resolve, reject)
		})
	},
	getUserList(request) {
		const api = 'bookAuctionServer/userList'
		const method = "get"
		return new Promise((resolve, reject) => {
			return help.httpHelper(api, method, request, resolve, reject)
		})
	},
	savePic(request) {
		const api = 'bookAuctionServer/pic/save'
		const method = "POST"
		return new Promise((resolve, reject) => {
			return help.httpHelper(api, method, request, resolve, reject)
		})
	},
	test(request) {
		const api = 'bookAuctionServer/test0'
		const method = 'get'
		return new Promise((resolve,reject) => {
			return help.httpHelper(api, method, request, resolve, reject)
		})
	}
}

export default system
