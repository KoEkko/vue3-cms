<template>
  <div class="account">
    <el-form
      label-width="60px"
      size="large"
      status-icon
      :rules="accountRules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type {  FormRules, ElForm } from 'element-plus'
import type { IAccount } from '@/types'
import useloginStore from '@/store/login/login'
import { localCache } from '@/utils/cache';
// 定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 定义检验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: 'Please input account~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: 'Length should be 3 to 10',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: 'Please input password~', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: 'Length should be at least 5 ',
      trigger: 'blur'
    }
  ]
}

// 执行帐号登录的逻辑
// 因为 帐号密码是在这个子组件上的，button按钮在父组件上
// 有两种方案： 1. 把账号密码的信息传递给父组件 ； 2. 子组件传递一个事件给父组件让父组件触发

const formRef = ref<InstanceType <typeof ElForm>>()
const loginStore = useloginStore()
function loginAciton(isRemPwd:boolean) {
  formRef.value?.validate((valid) => {
    if(valid) {
      // 1.获取用户的信息
      const name = account.name
      const password = account.password

      // 2.向服务器发送网络请求(携带帐号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3. 判断是否需要记住密码
        if(isRemPwd) {
          localCache.setCache('name',name)
          localCache.setCache('password',password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('Oops,请您输入正确的格式后再操作~')
    }
  })
}

defineExpose({
  loginAciton
})

</script>

<style lang="less" scoped></style>
