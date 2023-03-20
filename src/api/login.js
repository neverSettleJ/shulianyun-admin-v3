import request from './request'

let loginService = {
	login (account, random, sign,) {
		return request({
			url: '/api/system/account/login',
			method: 'POST',
			data: {
				account, random, sign,
			}
		})
	}
}


export default loginService