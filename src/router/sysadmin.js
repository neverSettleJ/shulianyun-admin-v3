/* 系统管理模块路由配置 */

const EmptyRouter = () => import('@/common/empty-router')
const SmsUser = () => import('@/views/sysadmin/smsuser')
const SmsRole = () => import('@/views/sysadmin/smsrole')
const SmsAuthority = () => import('@/views/sysadmin/smsAuthority')
// const OperateLog = () => import('@/view/sysadmin/operatelog/operatelog')
// const LoginLog = () => import('@/view/sysadmin/loginlog/loginlog')

export default {
	path: 'sysadmin',
	component: EmptyRouter,
	children: [
		{
			path: 'smsuser/index',
			component: SmsUser,
			meta: {
				requireAuth: true,
				title: '员工管理'
			}
		},
		{
			path: 'smsrole/index',
			component: SmsRole,
			meta: {
				requireAuth: true,
				title: '角色管理'
			}
		},
		{
			path: 'authority/index',
			component: SmsAuthority,
			meta: {
				requireAuth: true,
				title: '权限管理'
			}
		}
		//   {
		//     path: 'operatelog/index',
		//     component: OperateLog,
		//     meta: {
		//       requireAuth: true
		//     }
		//   },
		//   {
		//     path: 'loginlog/index',
		//     component: LoginLog,
		//     meta: {
		//       requireAuth: true
		//     }
		//   }
	]
}
