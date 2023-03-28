<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumb " :key="item.name">
        <el-breadcrumb-item :to="item.path">{{  item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login';
import { mapPathToBreadCrumbs } from '@/utils/map-menus';
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumb = computed(() => {
  return mapPathToBreadCrumbs(route.path,userMenus)
})
</script>

<style lang="less" scoped></style>
