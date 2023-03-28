<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold' " />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <headerCrumb />
      </div>
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue';
import { ref } from 'vue'
// 记录状态
const isFold = ref<boolean>(false)
// 派发事件
const emit = defineEmits(['foldChange'])
function handleMenuIconClick() {
  // 内部改变状态
  isFold.value = !isFold.value

  // 将事件和状态传递给父组件
  emit("foldChange", isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
