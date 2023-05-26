const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// vue.config.js
const path = require('path')
// const API_HOST2 = "121.40.245.205"; //dev联调环境
const API_HOST2 = "47.98.157.24"; //dev联调环境

require('events').EventEmitter.defaultMaxListeners = 0;
const TerserPlugin = require('terser-webpack-plugin')//去除多余的console.log
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i // 开启gzip压缩， 按需写入
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
	// publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 公共路径
	// indexPath: 'index.html', // 相对于打包路径index.html的路径
	// outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
	// assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
	lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
	runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
	productionSourceMap: !IS_PROD, // 生产环境的 source map
	// parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
	pwa: {}, // 向 PWA 插件传递选项。
	css: {
		extract: { ignoreOrder: true },
	},
	chainWebpack: (config) => {
		config.resolve.symlinks(true) // 修复热更新失效
		// 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
		config.plugin('html').tap((args) => {
			// 修复 Lazy loading routes Error
			args[0].chunksSortMode = 'none'
			return args
		})
		config.resolve.alias // 添加别名
			.set('@', resolve('src'))
			.set('@assets', resolve('src/assets'))
			.set('@components', resolve('src/components'))
			.set('@views', resolve('src/views'))
			.set('@store', resolve('src/store'))
		// 压缩图片
		// 需要 npm i -D image-webpack-loader
		// config.module
		//   .rule('images')
		//   .use('image-webpack-loader')
		//   .loader('image-webpack-loader')
		//   .options({
		//     mozjpeg: { progressive: true, quality: 65 },
		//     optipng: { enabled: false },
		//     pngquant: { quality: [0.65, 0.9], speed: 4 },
		//     // gifsicle: { interlaced: false },
		//     webp: { quality: 75 }
		//   })
		// 打包分析
		// 打包之后自动生成一个名叫report.html文件(可忽视)
		if (IS_PROD) {
			config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
				{
					analyzerMode: 'static'
				}
			]),
				config.plugin('optimize-css-assets').use(OptimizeCSSAssetsPlugin);
		}
	},
	configureWebpack: (config) => {
		config.optimization = {
			splitChunks: {
				chunks: 'all',
				minSize: 10000,
				maxSize: 250000
			}
		};
		// 实例化压缩插件
		// // const cssnano = require('cssnano');
		// const plugin = new OptimizeCSSAssetsPlugin({
		// 	// cssProcessor: cssnano,
		// 	cssProcessorPluginOptions: {
		// 		preset: ['default', { discardComments: { removeAll: true } }],
		// 	},
		// });
		// 配置 MiniCssExtractPlugin，忽略模块引入顺序问题
		const plugin = new MiniCssExtractPlugin({
			ignoreOrder: true,
		})
		if (config.optimization.minimizer) {
			config.optimization.minimizer.push(plugin);
		} else {
			config.optimization.minimizer = [plugin];
		}
		// 开发环境处理css
		config.plugins.forEach((plugin) => {
			if (plugin.constructor.name === 'MiniCssExtractPlugin') {
				plugin.options.hmr = true;
			}
		});

		// 开启 gzip 压缩
		// 需要 npm i -D compression-webpack-plugin
		const plugins = []
		// 使用 MiniCSSExtractPlugin 插件提取样式文件
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
			ignoreOrder: true // 忽略模块加载顺序问题
		})
		if (IS_PROD) {
			plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path][base].gz[query]',
					algorithm: 'gzip',
					test: productionGzipExtensions,
					threshold: 10240,
					minRatio: 0.8
				})
			)
			plugins.push(
				//打包环境去掉console.log等
				new TerserPlugin({
					terserOptions: {
						ecma: undefined,
						warnings: false,
						parse: {},
						compress: {
							drop_console: true,
							drop_debugger: false,
							// pure_funcs: ['console.log'], // 移除console
						},
					},
				}),
			);
		};
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
		config.plugins = [...config.plugins, ...plugins]
	},
	devServer: {
		// overlay: {
		//   // 让浏览器 overlay 同时显示警告和错误
		//   warnings: true,
		//   errors: true
		// },
		host: 'localhost',
		port: 8881, // 端口号
		https: false, // https:{type:Boolean}
		open: true, //配置自动启动浏览器
		// hotOnly: true, // 热更新
		// proxy: 'http://localhost:8880'   // 配置跨域处理,只有一个代理
		proxy: {
			//配置多个跨域
			'/api': {
				// target: 'http://backend-api-02.newbee.ltd/manage-api/v1',
				target: 'http://' + API_HOST2 + ':19002/',
				// target: 'localhost',
				changeOrigin: true,
				ws: true, //websocket支持
				secure: false,
				pathRewrite: {
					'^/api': '/'
				}
			},
			'/api/merchant': {
				target: 'http://' + API_HOST2 + ':8031/',
				pathRewrite: { '^/api/merchant': '' },
				changeOrigin: true,
			},
			'/api/stat': {
				target: 'http://' + API_HOST2 + ':8032/',
				pathRewrite: { '^/api/stat': '' },
				// target: 'http://' + API_HOST1 + ':8021/',
				// pathRewrite: {'^/api/stat': '/ss'},
				changeOrigin: true,
			},
			'/ws/stat': {
				target: 'ws://' + API_HOST2 + ':8032/',
				pathRewrite: { '^/ws/stat': '' },
				changeOrigin: true,
				ws: true
			},
			'/api/system': {
				target: 'http://' + API_HOST2 + ':8041/',
				pathRewrite: { '^/api/system': '' },
				changeOrigin: true,
			},
			'/ws/system': {
				target: 'ws://' + API_HOST2 + ':8041/',
				pathRewrite: { '^/ws/system': '' },
				changeOrigin: true,
				ws: true
			},
		}
	}
}
