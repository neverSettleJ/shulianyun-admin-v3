const sha256 = require('js-sha256')
const DEFAULT_TOKEN = '69c735ba3d4b4778e2213rwer123123085f120e0fda5er2af67f19f12121'
const DEFAULT_SECRET = '1ce780e1ce4319df82fb5801a90b01f47a3d59c741c0b63e19de1d905233e1b1'

export default {
	getRequestHeader () {
		let token, tokenSecret
		token = localStorage.getItem('token')
		if (token) { // 登录状态
			// let each request carry token --['X-Token'] as a custom key.
			// please modify it according to the actual situation.
			token = localStorage.getItem('token')
			tokenSecret = localStorage.getItem('tokenSecret')
		} else { // 未登录状态
			token = DEFAULT_TOKEN
			tokenSecret = DEFAULT_SECRET
		}
		let random = new Date().getTime()
		let sign = sha256(token + random + tokenSecret)

		return {
			token: token,
			random: random,
			sign: sign
		}
	}
}
