const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false
})
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
const API_HOST1 = "127.0.0.1";
const API_HOST2 = "121.40.245.205"; //dev联调环境
const API_HOST3 = "121.40.236.55";  //test测试环境
module.exports = {
	configureWebpack: (config) => {
		config.plugins.push(
			AutoImport({
				resolvers: [ElementPlusResolver()]
			})
		)
		config.plugins.push(
			Components({
				resolvers: [ElementPlusResolver()]
			})
		)
	},
	// devServer: {
	// 	https: false,
	// 	// hotOnly: false, //如果运行报错 注释这一行
	// 	proxy: {
	// 		'/api': {
	// 			// target: 'https://lianghj.top:8888/api/private/v1/',
	// 			target: 'http://' + API_HOST2 + ':8080/',
	// 			// target: 'http://120.78.137.246:8888/api/private/v1/',
	// 			changeOrigin: true,
	// 			pathRewrite: {
	// 				'^/api': ''
	// 			}
	// 		}
	// 	},
	// 	// disableHostCheck: true,
	// },



}

