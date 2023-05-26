/**
 * 会话存储和读取工具
 */

// import md5 from 'blueimp-md5'

const Base64 = require('js-base64').Base64

const LoginAdminUtil = {
	save (loginAdmin) {
		console.log('loginAdmin', loginAdmin)
		if (loginAdmin.token) {
			localStorage.setItem('token', loginAdmin.token)
		}
		// if (loginAdmin.tokenSecret) {
		// 	localStorage.setItem('tokenSecret', loginAdmin.tokenSecret)
		// }
		console.log(loginAdmin)
		const loginAdminStore = {
			id: loginAdmin.id,
			name: loginAdmin.name,
			superAdmin: loginAdmin.superAdmin,
			permissions: loginAdmin.sysPermissionTreeVO
		}
		const loginAdminStoreStr = Base64.encode(JSON.stringify(loginAdminStore))
		localStorage.setItem('loginAdmin', loginAdminStoreStr)
	},
	get () {
		const loginAdminStoreStr = localStorage.getItem('loginAdmin')
		let loginAdmin
		if (loginAdminStoreStr) {
			const loginAdminJson = Base64.decode(loginAdminStoreStr)
			loginAdmin = JSON.parse(loginAdminJson)
		}
		const token = localStorage.getItem('token')
		if (token) {
			loginAdmin.token = token
		}
		// const tokenSecret = localStorage.getItem('tokenSecret')
		// if (tokenSecret) {
		// 	loginAdmin.tokenSecret = tokenSecret
		// }
		return loginAdmin
	},
	validatePermission (permissionCode) {
		if (!LoginAdminUtil._loginAdmin) {
			LoginAdminUtil._loginAdmin = LoginAdminUtil.get()
		}
		const loginAdmin = LoginAdminUtil._loginAdmin
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
