<template>
  <div class="user">
    <userHeader @query-click="handleQueryClick" @reset-click="handleResetClick"/>
    <userMain ref="mainRef" @new-click="handleNewClick" @edit-click="handleEditClick"/>
    <userModal ref="modalRef"/>
  </div>
</template>

<script setup lang="ts">
import userHeader from './c-cpns/user-search.vue'
import userMain from './c-cpns/user-main.vue'
import userModal from './c-cpns/user-modal.vue';
import { ref } from 'vue'
const mainRef = ref<InstanceType <typeof userMain>>()
function handleQueryClick(foramData:any) {
  mainRef.value?.fetchUserListData(foramData)
}
function handleResetClick() {
  mainRef.value?.fetchUserListData()
}

const modalRef = ref<InstanceType<typeof userModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}

function handleEditClick(itemData:any) {
  modalRef.value?.setModalVisible(false,itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
