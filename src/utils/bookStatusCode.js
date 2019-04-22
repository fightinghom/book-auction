const statusCode = {
	getStatusCode(type) {
		let code
		switch(type) {
			case 'check':
				code = 6
				break;
			case 'auctioning':
				code = 1
				break;
			case 'end':
				code = 3
				break;
			case 'fail':
				code = 5
				break;
			case 'checkout':
				code = 0
				break;
			default:
				break;
		}
		return code
	}
}

export default statusCode
