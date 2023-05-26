
// const sha256 = require('js-sha256')
// const DEFAULT_TOKEN = '9f752e3a7b94999d7b67477c9aa8b3afca4051e675b0d9856c4b8b8203b0ca47'
// const DEFAULT_SECRET = '1ce780e1ce4319df82fb5801a90b01f47a3d59c741c0b63e19de1d905233e1b1'

export default {
	getRequestHeader () {
		let token
		token = localStorage.getItem('token')
		if (token) { // 登录状态
			token = localStorage.getItem('token')
		}
		// const random = new Date().getTime()
		// const sign = sha256(token + random)

		return {
			token: token
			// random: random,
			// sign: sign
		}
	}
}
