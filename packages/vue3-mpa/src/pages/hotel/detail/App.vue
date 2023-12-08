<template>
  <el-config-provider :locale="locale">
    <share-header :isShowNav="false" :isShowSearch="false"></share-header>
    <div class="detail-main hotel-full-loading">
      <infoBox></infoBox>
      <roomType></roomType>
      <introBox></introBox>
    </div>
    <share-footer></share-footer>
  </el-config-provider>
</template>

<script setup lang="ts">
// @ts-nocheck

import infoBox from './components/infoBox/index.vue'
import introBox from './components/introBox/index.vue'
import roomType from './components/roomType/index.vue'

import { useHotelDateil } from '@/stores/hotelDetail'
import zhCn from 'element-plus/dist/locale/zh-cn.js'
import { parse } from 'qs'
import { ref } from 'vue'

const locale = ref(zhCn)
const hotelDetail = useHotelDateil()
const { resourceId, arrivalDate, departureDate, invoiceModeList } = parse(location.search.slice(1))

hotelDetail.hotelIds = resourceId
hotelDetail.startEndDate = [arrivalDate, departureDate]
hotelDetail.invoiceMode = invoiceModeList.split(',')

hotelDetail.getRoomTypeList()
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
