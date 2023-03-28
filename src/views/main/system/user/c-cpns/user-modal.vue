<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名"/>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isNewRef">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码"/>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择部门" style="width: 100%;">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%;">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref , reactive } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system';
import { storeToRefs } from 'pinia';

const dialogVisible = ref<boolean>(false)
const isNewRef = ref(true)
const editData = ref()
const formData = reactive<any>({
  name:'',
  realname:'',
  password:'',
  cellphone:'',
  roleId:'',
  departmentId:''
})
function setModalVisible(isNew:boolean = true, itemData?:any ) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if(!isNew && itemData) {
    for( const key in formData) {
      formData[key] = itemData[key]
    }
    // 如果是修改的话，需要保存值
    editData.value = itemData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
const mainStore = useMainStore()
const { entireDepartments, entireRoles } = storeToRefs(mainStore)
const systemStore = useSystemStore()

// 点击确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 修改数据
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    // 创建用户
    systemStore.newUserDataAction(formData)
  }
}
defineExpose({ setModalVisible })
</script>

<style lang="less"  scoped>

</style>
