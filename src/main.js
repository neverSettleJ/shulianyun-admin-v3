import router from '@/router'
import '@/style/index.less'
// import 'animate.css/animate.min.css'
import dialogEl from 'dialog-el'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createApp } from 'vue'
import VueParticles from 'vue-particles'
import App from './App.vue'
import store from './store'
// 统一导入el-icon图标
// import * as ElIconModules from '@element-plus/icons'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
// 统一注册el-icon图标
// for (const iconName in ElIconModules) {
//   app.component(iconName, ElIconModules[iconName])
// }
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(ElementPlus, { locale: zhCn })
app.use(VueParticles)
app.use(dialogEl)
app.use(store).use(router).mount('#app')
console.log(process.env)
// router.beforeEach((to, from, next) => {
// 	if (to.meta.title) {
// 		document.title = to.meta.title + ' - 数链云'
// 	} else {
// 		document.title = '数链云后台管理系统'
// 	}
// 	if (to.meta.requireAuth || to.path === '/') {
// 		const activeIndex = to.meta.activePath ? to.meta.activePath : to.path
// 		store.commit('updateActiveIndex', activeIndex)
// 		if (localStorage.getItem('token')) {
// 			if (to.path === '/') {
// 				next({
// 					path: 'home'
// 				})
// 			} else {
// 				next()
// 			}
// 		} else {
// 			next({
// 				path: 'login'
// 			})
// 		}
// 	} else {
// 		next()
// 	}
// })
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title + ' - 数链云'
	} else {
		document.title = '数链云后台管理系统'
	}
	if (to.meta.requireAuth || to.path === '/') {
		const activeIndex = to.meta.activePath ? to.meta.activePath : to.path
		store.commit('updateActiveIndex', activeIndex)
		if (localStorage.getItem('token')) {
			if (to.path === '/') {
				next({
					path: 'home'
				})
			} else {
				next()
			}
		} else {
			console.log(from)
			if (from.path !== '/login') { // 如果上一个页面不是登录页
				// next({
				// 	path: 'login'
				// })
				router.push('/login')
			} else {
				next(false) // 否则不跳转
			}
		}
	} else {
		next()
	}
})
