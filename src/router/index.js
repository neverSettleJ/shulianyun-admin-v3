import Home from '@/views/home/home.vue'
import Layout from '@/views/layout/layout.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Sysadmin from './sysadmin'
import Sysmain from './sysmain'

const routes = [
	{
		path: '/',
		// name: 'Layout',
		component: Layout,
		meta: {
			requireAuth: true
		},
		redirect: '/home',
		children: [
			{
				path: 'home',
				component: Home,
				meta: {
					title: '首页',
					requireAuth: true
				}
			},
			Sysmain,
			Sysadmin
		]
	},
	{
		path: '/login',
		name: 'login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '@/views/login/login')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
