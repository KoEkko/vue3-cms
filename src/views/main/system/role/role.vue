<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">

import {ref , nextTick} from 'vue'
import pageSearch from '@/components/page-search/page-search.vue';
import pageContent from '@/components/page-content/page-contet.vue';
import pageModal from '@/components/page-modal/page-modal.vue';
import searchConfig from './config/search.config';
import contentConfig from './config/content.config';
import modalConfig from './config/modal.config';

import useMainStore from '@/store/main/main';
import { storeToRefs } from 'pinia';
import type { ElTree } from 'element-plus';
import { mapMenuListToIds } from '@/utils/map-menus';
import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(newCallback , editCallback)

const mainStore = useMainStore()
const {entireMenus} = storeToRefs(mainStore)
const otherInfo = ref({})

function handleElTreeCheck(data1:any, data2:any) {
  const menuList = [ ...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
const treeRef = ref<InstanceType<typeof ElTree>>()
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

function editCallback(itemData:any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>
