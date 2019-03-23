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
			default:
				break;
		}
		return code
	}
}

export default statusCode
