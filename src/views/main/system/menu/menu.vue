<template>
  <div class="menu">
    <pageContet :content-config="contentConfig"/>
  </div>
</template>

<script setup lang="ts">
import pageContet from '@/components/page-content/page-contet.vue';
import contentConfig from './config/content.config';

</script>

<style lang="less" scoped></style>
