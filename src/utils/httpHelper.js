const axios = require('axios')
//const URL = 'http://hao.yang.com:8081/' //部署后url
const URL = 'http://localhost:8080/' //开发时url

const help = {
	httpHelper(api, method, request,resolve, reject) {
		axios({
			method: method,
			url: URL + api,
			dataType: 'json',
			data: request
		})
		.then((response) => {
			return resolve(response.data)
		})
		.catch((error) => {
			return reject(error)
		})
	},

	httpHelper2(api, method, request) {
		return	new Promise((resolve, reject) =>{
			axios({
				method: method,
				url: URL + api,
				dataType: 'json',
				data: request
			})
			.then((response) => {
				let data = response.data
				let reso = ''
				if (data.status == 200) {
					reso = data.data
				}
				if (data.status == 400 || data.status == 201) {
					reso = data.message
				}
				if (data.status == 403 || data.status == 203) {
					reso = {
						type: data.messageType,
						message: data.message
					}
				}
				return resolve(reso)
			})
			.catch((error) => {
				return reject(error)
			})
		})
	}
}

export default help
