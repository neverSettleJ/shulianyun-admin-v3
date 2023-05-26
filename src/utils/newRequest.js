/* eslint-disable no-tabs */
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from './../router'
import httpUtil from './httpUtil'
// import store from '@/store'
const qs = require('qs')
// create an axios instance
const service = axios.create({
	// baseURL: process.env.BASE_API, // url = base url + request url
	baseURL: process.env.VUE_APP_BASE_API,
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 50000, // request timeout
	headers: {
		'Cache-Control': 'no-cache',
		'Access-Control-Allow-Origin': '*'
	}
})

// request interceptor 请求拦截器
service.interceptors.request.use(
	(config) => {
		// console.log(config)
		// do something before request is sent
		if (config.url.indexOf('/account/login') < 0) {
			// 非登录接口需要传递token
			const httpHeader = httpUtil.getRequestHeader()
			config.headers.token = httpHeader.token
			// config.headers.random = httpHeader.random
			// config.headers.sign = httpHeader.sign
		}
		const method = config.method.toLowerCase()
		if (method === 'post' || method === 'put' || method === 'delete') {
			let contentType = config.headers['Content-Type']
			if (!contentType) {
				contentType = 'application/json'
				config.headers['Content-Type'] = contentType
			}
			if (contentType === 'application/json') {
				// config.data = qs.stringify(config.data, { indices: false })
			}
		}
		return config
	},
	(error) => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// service.interceptors.request.use(
//   (config) => {
//     if (localStorage.getItem('token')) {
//       if (diffTokenTime()) {
//         store.dispatch('app/logout')
//         return Promise.reject(new Error('token 失效了'))
//       }
//     }
//     config.headers.Authorization = localStorage.getItem('token')
//     return config
//   },
//   (error) => {
//     return Promise.reject(new Error(error))
//   }
// )

// response interceptor 响应拦截器
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
	(response) => {
		const res = response.data
		const method = response.config.method.toLowerCase()
		// if the custom code is not 20000, it is judged as an error.
		if (res.code === 200) {
			return res
		} else if (res.code !== 200) {
			if (res.msg) {
				// 服务端故障
				ElMessage.error({
					message: res.msg
				})
			}
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
						name: 'login'
					})
				} else {
					ElMessageBox({
						title: '温馨提示',
						message: '登录信息失效，请重新登录！',
						type: 'warning',
						callback: function () {
							localStorage.setItem('token', '')
							router.replace({
								name: 'login'
							})
						}
					})
				}
			} else {
				ElMessageBox({
					title: '温馨提示',
					message: res.message,
					type: 'warning'
				})
				return Promise.reject(res)
			}
		}
	},
	(error) => {
		console.log('error', error) // for debug
		if (error?.response?.data.msg) {
			if (error?.response?.data?.code) {
				if (error.response.data?.code === 6000) {
					localStorage.setItem('token', '')
					router.push('/login')
				}
			}
			ElMessage.error({
				message: error.response.data.msg
			})
		} else if (error?.request?.status) {
			const status = error.request.status
			switch (status) {
				case 400:
					ElMessage.error('400,请求错误')
					break
				case 401:
					ElMessage.error('401,未授权，请重新登录')
					break
				case 403:
					ElMessage.error('403,拒绝访问')
					break
				case 404:
					ElMessage.error('404,请求错误，未找到相应的资源')
					break
				case 408:
					ElMessage.error('408,请求超时')
					break
				case 415:
					ElMessage.error('415,服务器无法处理请求附带的媒体格式')
					break
				case 500:
					ElMessage.error('500,服务器内部错误')
					break
				case 501:
					ElMessage.error('501,网络未实现')
					break
				case 502:
					ElMessage.error('502,网络错误')
					break
				case 503:
					ElMessage.error('503,服务不可用')
					break
				case 504:
					ElMessage.error('504,网络超时')
					break
				case 505:
					ElMessage.error('505,HTTP版本不支持该请求')
					break
				default:
					ElMessage.error('请求失败')
			}
		} else {
			ElMessage.error({
				message: error
			})
		}

		return Promise.reject(error)
	}
)

export default service
