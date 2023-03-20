'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ADMIN_V1_URL: '"http://test.admin-v1.shumaidata.com"',
  PLATFORM_URL: '"http://test-www.tianyandata.cn"'
})
