<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import { ref, reactive } from 'vue'
import useSystemStore from '@/store/main/system/system'


interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}

const dialogVisible = ref<boolean>(false)
const isNewRef = ref(true)
const editData = ref()

const props = defineProps<IModalProps>()
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)

function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    // 如果是修改的话，需要保存值
    editData.value = itemData
  } else {
    for (const key in formData) {
      // 新建的时候，如果有对其设置初始值，则回显初始值 initialValue ，否则置空
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialData : ''
    }
    editData.value = null
  }
}

const systemStore = useSystemStore()

// 点击确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (!isNewRef.value && editData.value) {
    // 修改数据
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    // 创建用户
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped></style>
