/*
 * @Description: 侧边栏对应模块
 * @Autor: jwk
 */
/* 模块code和路由对照，模块code前后端一致，调用菜单接口时返回 */

const RouterMapping = {
	'tydata-business-account': '/merchant/account/accountindex',
	'tydata-business-pay': '/finance/payment/index',
	'tydata-finance-order': '/finance/order/index',
	'sly-zuzhi-user': '/sysadmin/smsuser/index',
	'sly-zuzhi-role': '/sysadmin/smsrole/index',
	'sly-zuzhi-authority': '/sysadmin/authority/index'

}

export default RouterMapping
