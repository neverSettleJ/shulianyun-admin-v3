import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from './../router'
import httpUtil from './httpUtil'
// import utils from '@/utils/utils'
// import store from '@/store'
const qs = require('qs')
// create an axios instance
const service = axios.create({
	// baseURL: process.env.BASE_API, // url = base url + request url
	// baseURL: process.env.VUE_APP_BASE_API,,
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 50000, // request timeout
	headers: {
		'Cache-Control': 'no-cache'
	}
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent
		if (config.url.indexOf('/account/login') < 0) { // 非登录接口需要传递token
			let httpHeader = httpUtil.getRequestHeader()
			config.headers['token'] = httpHeader.token
			config.headers['random'] = httpHeader.random
			config.headers['sign'] = httpHeader.sign
		}
		let method = config.method.toLowerCase()
		if (method === 'post' || method === 'put' || method === 'delete') {
			let contentType = config.headers['Content-Type']
			if (!contentType) {
				contentType = 'application/x-www-form-urlencoded'
				config.headers['Content-Type'] = contentType
			}
			if (contentType === 'application/x-www-form-urlencoded') {
				// let data = qs.stringify(config.data)
				// console.log('data', data)
				config.data = qs.stringify(config.data, { indices: false })
				console.log(qs.stringify(config.data, { indices: false }))
				// config.data = utils.serializeObjects(config.data)
			}
		}
		if (method === 'get') {
			config.paramsSerializer = function (params) {
				return qs.stringify(params, { arrayFormat: 'repeat' })
			}
		}
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get information such as headers or status
	 * Please return  response => response
	*/

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code.
	 */
	response => {
		const res = response.data
		let method = response.config.method.toLowerCase()
		// if the custom code is not 20000, it is judged as an error.
		if (res.code === 'SUCCESS') {
			return res
		} else if (res.code === 'ERROR') { // 服务端故障
			if (method === 'get') {
				ElMessage.error({
					message: '非常抱歉，系统维护中，请稍候再试！'
				})
			} else {
				ElMessageBox({
					title: '温馨提示',
					message: '非常抱歉，系统维护中，请稍候再试！',
					type: 'error'
				})
			}
			return Promise.reject(res)
		} else {
			// // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
			if (res.code === 'NO_LOGIN') {
				if (method === 'get') {
					localStorage.setItem('token', '')
					router.replace({
						name: 'Login'
					})
					// Message({
					//   type: 'warning',
					//   message: '登录信息失效，请重新登录！',
					//   onClose: function () {
					//     localStorage.setItem('token', '')
					//     router.replace({
					//       name: 'Login'
					//     })
					//   }
					// })
				} else {
					ElMessageBox({
						title: '温馨提示',
						message: '登录信息失效，请重新登录！',
						type: 'warning',
						callback: function () {
							localStorage.setItem('token', '')
							router.replace({
								name: 'Login'
							})
						}
					})
				}
			} else { // 业务提醒
				if (method === 'get') {
					Message.warning({
						message: res.msg
					})
				} else {
					ElMessageBox({
						title: '温馨提示',
						message: res.msg,
						type: 'warning'
					})
				}
				return Promise.reject(res)
			}
		}
	},
	error => {
		console.log('error', error) // for debug
		const status = error.response.request.status
		switch (status) {
			case 400:
				ElMessage.error("请求错误");
				break;
			case 401:
				ElMessage.error("未授权，请重新登录");
				break;
			case 403:
				ElMessage.error("拒绝访问");
				break;
			case 404:
				ElMessage.error("请求错误，未找到相应的资源");
				break;
			case 408:
				ElMessage.error("请求超时");
				break;
			case 500:
				ElMessage.error("服务器内部错误");
				break;
			case 501:
				ElMessage.error("网络未实现");
				break;
			case 502:
				ElMessage.error("网络错误");
				break;
			case 503:
				ElMessage.error("服务不可用");
				break;
			case 504:
				ElMessage.error("网络超时");
				break;
			case 505:
				ElMessage.error("HTTP版本不支持该请求");
				break;
			default:
				ElMessage.error("请求失败");
		}
		// ElMessage.error({
		// 	// message: error.message
		// 	message: '非常抱歉，系统维护中，请稍候再试！'
		// })

		return Promise.reject(error)
	}
)

export default service
