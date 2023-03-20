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
function resolve(dir) {
  return path.join(__dirname, dir)
}
const webpack = require('webpack')
// const path = require('path')
const API_HOST1 = '127.0.0.1'
const API_HOST2 = '121.40.245.205' //dev联调环境
const API_HOST3 = '121.40.236.55' //test测试环境
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
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svg')
      // 忽略
      .exclude.add(resolve('src/icons'))
      // 结束
      .end()
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('icons')
      // 正则，解析 .svg 格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve('src/icons'))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      // 具体的loader
      .loader('svg-sprite-loader')
      // loader 的配置
      .options({
        symbolId: 'icon-[name]'
      })
      // 结束
      .end()
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
