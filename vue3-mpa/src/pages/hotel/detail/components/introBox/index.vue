<template>
  <div class="hotel-intro">
    <h3>酒店信息</h3>
    <div class="info-item">
      <div class="info-label">基本信息</div>
      <div class="info-value base-info">
        <span>2013-10-01开业</span><span>2013-10-01装修</span><span>82间房</span
        ><span>酒店电话 {{ hotelTailVo.phone }}</span>
      </div>
    </div>
    <div class="info-item" v-if="hotelTailVo.hotelDescription">
      <div class="info-label">酒店简介</div>
      <div class="info-value">
        <div class="intro-txt">
          {{ hotelTailVo.hotelDescription }}
        </div>
      </div>
    </div>
    <!-- <div class="info-item">
      <div class="info-label">预订须知</div>
      <div class="info-value">
        <pre>{{ hotelTailVo.prePayDescription }}</pre>
      </div>
    </div> -->
    <!---->
    <div class="info-item">
      <div class="info-label">入离时间</div>
      <div class="info-value">
        <div>
          入住时间：{{ hotelTailVo.checkInTime }}以后 离店时间：{{ hotelTailVo.checkOutTime }}以前
        </div>
      </div>
    </div>
    <!-- <div class="info-item">
      <div class="info-label">酒店设施</div>
      <div class="info-value">行李寄存、24小时前台、免费停车、有电梯、免费wifi、宴会厅、餐厅</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed } from 'vue';

import { useHotelDateil } from '@/stores/hotelDetail';

const hotelTailVo = computed(() => {
  return hotelDetail.detail.hotelTailVo || {};
});

const hotelDetail = useHotelDateil();
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
