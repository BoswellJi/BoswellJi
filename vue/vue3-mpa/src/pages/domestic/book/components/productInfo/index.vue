<template>
  <div class="wrapper">
    <div class="title">产品信息：{{ detail.productTitle }}</div>
    <div class="infos">
      <div class="field">供应商编号：{{ detail.lineId }}</div>
      <div class="field">旅仓编号：{{ detail.productCode }}</div>
      <div class="field">出发城市：{{ detail.departureCityName }}</div>
      <div class="field">游玩天数：{{ domesticBooking.queryString.playDays }}天</div>
    </div>
    <div class="sub-title">
      预订须知
      <div class="download" @click="print">
        <img src="https://file.40017.cn/elongclub/lc-print.png" class="icon" />
        打印行程
      </div>
    </div>
    <div class="content" v-html="detail.notice"></div>
  </div>
</template>

<script setup lang="ts">
import { useDomesticBooking } from '@/stores/domesticBooking';
import { safeWindowOpen } from '@/utils/util';
import { computed } from 'vue';

const domesticBooking = useDomesticBooking();
const detail = computed(() => {
  return domesticBooking.detail || ({} as Domestic.Data);
});

const print = () => {
  safeWindowOpen(
    `/print/line?lineid=${domesticBooking.queryString?.lid}&version=${domesticBooking.queryString?.version}&issimple=0&product=gny`,
  );
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
