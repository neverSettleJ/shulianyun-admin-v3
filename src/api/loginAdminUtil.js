/**
 * 会话存储和读取工具
 */

import md5 from 'blueimp-md5'

let Base64 = require('js-base64').Base64

let LoginAdminUtil = {
	save (loginAdmin) {
		console.log('token', loginAdmin.token)
		if (loginAdmin.token) {
			localStorage.setItem('token', loginAdmin.token)
		}
		if (loginAdmin.tokenSecret) {
			localStorage.setItem('tokenSecret', loginAdmin.tokenSecret)
		}
		console.log(loginAdmin)
		let loginAdminStore = {
			id: loginAdmin.id,
			remoteAddr: loginAdmin.remoteAddr,
			remoteAddrHash: md5(loginAdmin.remoteAddr),
			realName: loginAdmin.realName,
			superAdmin: loginAdmin.superAdmin,
			permissions: loginAdmin.permissions
		}
		let loginAdminStoreStr = Base64.encode(JSON.stringify(loginAdminStore))
		localStorage.setItem('loginAdmin', loginAdminStoreStr)
	},
	get () {
		let loginAdminStoreStr = localStorage.getItem('loginAdmin')
		let loginAdmin
		if (loginAdminStoreStr) {
			let loginAdminJson = Base64.decode(loginAdminStoreStr)
			loginAdmin = JSON.parse(loginAdminJson)
		}
		let token = localStorage.getItem('token')
		if (token) {
			loginAdmin.token = token
		}
		let tokenSecret = localStorage.getItem('tokenSecret')
		if (tokenSecret) {
			loginAdmin.tokenSecret = tokenSecret
		}
		return loginAdmin
	},
	validatePermission (permissionCode) {
		if (!LoginAdminUtil._loginAdmin) {
			LoginAdminUtil._loginAdmin = LoginAdminUtil.get()
		}
		let loginAdmin = LoginAdminUtil._loginAdmin
		// console.log('loginAdmin', loginAdmin)
		if (loginAdmin.superAdmin) {
			return true
		}
		// console.log('loginAdmin.permissions', loginAdmin.permissions)
		if (loginAdmin.permissions) {
			const hasPermission = loginAdmin.permissions.some(role => {
				return permissionCode.includes(role)
			})
			return hasPermission
		} else {
			return false
		}
	},
	_loginAdmin: undefined
}

export default LoginAdminUtil
