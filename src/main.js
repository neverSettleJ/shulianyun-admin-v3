import SvgIcon from '@/icons'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth || to.path === '/') {
    let activeIndex = to.meta.activePath ? to.meta.activePath : to.path
    // console.log(to)
    store.commit('updateActiveIndex', activeIndex)
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      if (to.path === '/') {
        // console.log('to', to)
        next({
          path: 'home'
        })
      } else {
        next()
      }
    } else {
      next({
        path: 'login'
      })
    }
  } else {
    next()
  }
})
SvgIcon(app)
app.use(store).use(router).mount('#app')
