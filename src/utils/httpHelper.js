const axios = require('axios')
const URL = 'http://localhost:8081/'

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
	}
}

export default help
