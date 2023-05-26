/*
 * @Author: jwk
 * @Date: 2023-05-22 11:12:17
 * 描述：角色接口
 * @Last Modified by: jwk
 * @Last Modified time: 2023-05-26 09:59:47
 */
import newRequest from '@/utils/newRequest'
import request from '@/utils/request'
const SmsRoleService = {
	// 角色列表
	roleList (query) {
		return request({
			url: '/sysRole/list',
			method: 'get',
			params: query
		})
	},
	// 角色新增修改
	roleUpdata (query) {
		return request({
			url: '/sysRole/addAndUpdate',
			method: 'post',
			params: query
		})
	},
	// 角色删除
	roleDelete (query) {
		return request({
			url: '/sysRole/delete',
			method: 'post',
			params: query
		})
	},
	// 角色配置权限
	rolePermission (query) {
		return newRequest({
			url: '/sysRole/permission',
			method: 'post',
			data: query
		})
	},
	// 角色已经配置的权限
	rolePermissionDetail (query) {
		return request({
			url: '/sysRole/permissionDetail',
			method: 'get',
			params: query
		})
	},
	/**
	 * 权限管理
	 */
	// 权限管理树
	permissionTree () {
		return request({
			url: '/sysPermission/tree',
			method: 'get'
		})
	},
	// 权限新增修改
	permissionUpdata (query) {
		return request({
			url: '/sysPermission/addAndUpdate',
			method: 'post',
			params: query
		})
	},
	// 权限删除
	permissionDelete (query) {
		return request({
			url: '/sysPermission/delete',
			method: 'post',
			params: query
		})
	},
	// 获取当前账号的权限树
	permsOwnTree () {
		return request({
			url: '/sysPermission/usetree',
			method: 'get'
		})
	}
}

export default SmsRoleService
