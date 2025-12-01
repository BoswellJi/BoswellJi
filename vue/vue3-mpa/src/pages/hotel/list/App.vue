<template>
  <el-config-provider :locale="locale">
    <share-header :isShowNav="true" :isShowSearch="false"></share-header>
    <div class="wrapper">
      <searchBox></searchBox>
      <filterBox></filterBox>
      <hotelBox></hotelBox>
    </div>
    <share-footer></share-footer>
  </el-config-provider>
</template>

<script setup lang="ts">
import searchBox from './components/searchBox/index.vue'
import filterBox from './components/filterBox/index.vue'
import hotelBox from './components/hotelBox/index.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.js'
import { ref } from 'vue'

const locale = ref(zhCn)
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
