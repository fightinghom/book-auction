const imgUtils = {
	toBase64(img, complied) {
		let reader = new FileReader()
		reader.onload = e => {
			let base64 = reader.result
			complied(base64)
		}
		reader.readAsDataURL(img)
	}
}

export default imgUtils
