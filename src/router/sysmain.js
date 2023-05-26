/* 数链云模块路由配置 */

const EmptyRouter = () => import('@/common/empty-router')

const MerchantAccount = () =>
	import('../views/merchant/account/accountindex.vue')
// const FinancePayment = () => import('@/views/finance/payment')
// const FinanceOrder = () => import('@/views/finance/order')

export default {
	path: '',
	component: EmptyRouter,
	children: [
		{
			path: '/merchant/account/accountindex',
			component: MerchantAccount,
			meta: {
				requireAuth: true
			}
		},
		// {
		//   path: 'finance/payment/index',
		//   component: FinancePayment,
		//   meta: {
		//     requireAuth: true
		//   }
		// },
		// {
		//   path: 'finance/order/index',
		//   component: FinanceOrder,
		//   meta: {
		//     requireAuth: true
		//   }
		// }
	]
}
