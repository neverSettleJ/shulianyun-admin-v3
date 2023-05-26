import request from '@/utils/request'
const LoginService = {
	// 系统用户登录
	login (username, password) {
		return request({
			url: '/sysUser/login',
			method: 'post',
			data: {
				username,
				password
			}
		})
	},
	// 系统用户退出登录
	logout () {
		return request({
			url: '/sysUser/logout',
			method: 'post'
		})
	}
}

export default LoginService
