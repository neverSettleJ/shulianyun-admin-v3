<!-- Vue -->
<template>
  <el-button @click="evClick">打开dialog</el-button>
  <!-- <el-button @click="evMask">打开遮罩层</el-button> -->
  <dialog-el title="这是一个标题" v-model="isShow" :mask="isMask" @evOpen="open">
    <div class="box">
      鼠标移动至盒子边缘（鼠标样式发生改变）,
      按住鼠标左键即可拖拽缩放和放大；鼠标移动到盒子内部按住鼠标左键即可移动；鼠标左键抬起事件取消
    </div>

    <el-form :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
    </el-form>
  </dialog-el>
</template>

<script setup>
import { reactive, ref } from 'vue'

const isShow = ref(false)
const isMask = ref(true)

const evClick = () => {
  isShow.value = true
}

// const evMask = () => {
//   isMask.value = !isMask.value
// }

const open = (data) => {
  console.log('我打开了', data)
}
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
</script>

<style scoped>
.box {
  width: 100%;
}
</style>
