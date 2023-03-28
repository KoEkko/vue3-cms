<template>
  <div class="login-panel">
    <!-- tabs顶部的标题 -->
    <h1 class="title">弘源后台管理系统</h1>

    <!-- 中间的tabs切换 -->
    <el-tabs type="border-card" stretch>
    <!-- 帐号登录的pane -->
      <el-tab-pane>
        <template #label>
          <div class="label">
            <el-icon><UserFilled /></el-icon>
            <span class="text">帐号登录</span>
          </div>
        </template>
        <paneAccount ref="accountRef"/>
      </el-tab-pane>

      <!-- 手机登录的pane -->
      <el-tab-pane>
        <template #label>
          <div class="label">
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </div>
        </template>
        <panePhone />
      </el-tab-pane>
    </el-tabs>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox label="记住密码" v-model="isRemPwd" size="large"/>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, watch } from 'vue'
import paneAccount from './pane-account.vue';
import panePhone from './pane-phone.vue';
import { localCache } from '@/utils/cache';

// 记住密码的状态
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd',newValue)
})

// 帐号登录的方式
const activeName = ref('account')

// 拿到 pane-account 的类型
const accountRef = ref<InstanceType <typeof paneAccount>>()

function handleLoginBtnClick () {
  if(activeName.value === 'account') {
    accountRef.value?.loginAciton(isRemPwd.value)
  } else {
    console.log('用户正在进行手机登录');
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
