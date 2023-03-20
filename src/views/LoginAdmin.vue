<template>
  <div class="login-container">
    <el-form :model="form" ref="ruleFormRef" :rules="rules" class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="account">
        <el-icon :size="20" class="svg-container">
          <user />
        </el-icon>
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item prop="password">
        <el-icon :size="20" class="svg-container">
          <edit />
        </el-icon>
        <el-input v-model="form.password" />
      </el-form-item>
      <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Edit, User } from '@element-plus/icons-vue'
import loginService from '@/api/login'
import md5 from 'blueimp-md5'
import { sha256 } from 'js-sha256'
import VueCookies from 'vue-cookies'

const form = ref({
  account: '',
  password: ''
})

const rules = reactive({
  account: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ]
})
let cookieAccount = VueCookies.get('account')
// console.log(VueCookies, 22232)
// if (cookieAccount) {
//   var account = cookieAccount
// }
const ruleFormRef = ref(null)
let pwdMd5 = md5(form.value.password)
let random = new Date().getTime()
let sign = sha256(form.value.account + random + pwdMd5)
const handleLogin = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // alert('submit!')
      // console.log(form.value.account, random, sign)
      loginService.login(form.value.account, random, sign).then((res) => {
        console.log(res)
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
// onMounted(async () => {
//   await enterLogin()
// })

// const enterLogin = () => {
//   console.log(222)
//   document.onkeydown = (e) => {
//     e = window.event || e
//     if ($route.path == '/login' && (e.code == 'Enter' || e.code == 'enter')) {
//       login()
//     }
//   }
// }
</script>

<style lang="scss" scoped>
body {
  height: 100%;
}
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      // display: inline-block;
      height: 47px;
      width: 85%;

      .el-input__wrapper {
        background: transparent;
        box-shadow: 0 0 0 0;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    // display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
