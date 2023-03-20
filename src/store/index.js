import { createApp } from 'vue'
import Vuex from 'vuex'
import App from '../App.vue'


createApp(App).use(Vuex)

export default new Vuex.Store({
	state: {
		activeIndex: '/home',
		typeOptions: []
	},
	mutations: {
		updateActiveIndex (state, path) {
			// 变更状态
			state.activeIndex = path
		},
		updateTypeOptions (state, data) {
			// 变更状态
			state.typeOptions = data
		}
	},
	getters: {
		activeIndex: state => {
			return state.activeIndex
		},
		typeOptions: state => {
			return state.typeOptions
		}
	}
})
