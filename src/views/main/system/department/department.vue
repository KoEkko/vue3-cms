<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-contet
      :content-config="departmentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import pageContet from '@/components/page-content/page-contet.vue'
import departmentConfig from './config/content.config'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import useMainStore from '@/store/main/main'

import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'


// 对有需要请求数据的config进行拦截，添加相对应的数据
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const department = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...department)
    }
  })
  return modalConfig
})

const { contentRef , handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style lang="less" scoped></style>
