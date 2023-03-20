'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ADMIN_V1_URL: '"http://127.0.0.1:8000"',
  PLATFORM_URL: '"http://dev-www.tianyandata.cn"'
  // ADMIN_V1_URL: '"http://test.admin.shumaidata.com"',
})
