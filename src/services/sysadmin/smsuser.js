/*
 * @Author: jwk
 * @Date: 2023-05-22 11:12:33
 * 描述：用户和部门接口
 * @Last Modified by: jwk
 * @Last Modified time: 2023-05-25 15:26:04
 */
import newRequest from '@/utils/newRequest'
import request from '@/utils/request'

const SmsUserService = {
	// 系统用户列表
	userList (query) {
		return newRequest({
			url: '/sysUser/list',
			method: 'post',
			data: query
		})
	},
	// 冻结、解冻系统用户
	userEnable (query) {
		return request({
			url: '/sysUser/enable',
			method: 'put',
			params: query
		})
	},
	// 系统用户修改密码
	userEditPasswor (query) {
		return request({
			url: '/sysUser/modifyPassword',
			method: 'put',
			params: query
		})
	},
	// 重置系统用户密码
	userRestPasswor (query) {
		return request({
			url: '/sysUser/resetPassword',
			method: 'put',
			params: query
		})
	},
	// 系统用户新增修改
	userUpdate (query) {
		return newRequest({
			url: '/sysUser/saveOrUpdate',
			method: 'post',
			data: query
		})
	},
	/**
	 * 部门模块
	 */
	// 部门树状列表
	treeList (query) {
		return request({
			url: '/sysDepartment/tree',
			method: 'get',
			params: query
		})
	},
	// 部门新增修改
	treeUpdata (query) {
		return request({
			url: '/sysDepartment/addAndUpdate',
			method: 'post',
			params: query
		})
	},
	// 部门删除
	treeDelete (query) {
		return request({
			url: '/sysDepartment/delete',
			method: 'post',
			params: query
		})
	}
}

export default SmsUserService
