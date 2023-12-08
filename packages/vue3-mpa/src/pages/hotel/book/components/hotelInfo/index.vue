<template>
  <div class="block-right">
    <img
      class="hotel-img"
      :src="hotelHeadVo.headImages && hotelHeadVo.headImages[0] && hotelHeadVo.headImages[0].url"
    />
    <div class="hotel-info">
      <h2>
        <p>{{ hotelHeadVo.hotelName }}</p>
        <!-- <p class="en-name">Jinling Hotel Beijing</p> -->
      </h2>
      <div class="address">{{ hotelHeadVo.address }}</div>
      <ul>
        <li>
          <label>房型：</label><span>{{ hotelRoomVo.name }}</span>
        </li>
        <li>
          <label>床型：</label><span>{{ hotelRoomVo.bedType }}</span>
        </li>
        <li>
          <label>早餐：</label><span>{{ ratePlanVo.breakfastDesc }}</span>
        </li>
        <li>
          <label>面积：</label><span>{{ hotelRoomVo.area }}㎡</span>
        </li>
        <li>
          <label>楼层：</label><span>{{ hotelRoomVo.floor }}层</span>
        </li>
      </ul>
    </div>
    <div class="order-total">
      <dl class="order-price dtg-flex dtg-align-center dtg-justify-between">
        <dt>订单总额：</dt>
        <dd class="cf63">
          <span>¥</span><strong>{{ calculateRateVo.orderSumRate }}</strong>
        </dd>
      </dl>
      <dl class="price-sub dtg-flex dtg-align-center dtg-justify-between">
        <dt>房费：</dt>
        <dd class="cf63">
          <span>¥</span><strong>{{ calculateRateVo.ratePlanSumMemberRate }}</strong
          ><em class="count-em">* {{ hotelOrder.numberOfRooms }}</em>
        </dd>
      </dl>
      <!---->
      <div class="total-tips">酒店将预收全部费用，取消请按照政策提示<!----></div>
    </div>
    <div class="submit-bar">
      <button v-loading="hotelOrder.submitLoading" @click="submitOrder">提交酒店订单</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { useHotelOrder } from '@/stores/hotelOrder';
import { computed } from 'vue';
import { debounce } from 'lodash';

const hotelOrder = useHotelOrder();
const detail = computed(() => {
  return hotelOrder.detail;
});

const hotelHeadVo = computed(() => {
  return detail.value.hotelHeadVo || {};
});
const calculateRateVo = computed(() => {
  return detail.value.calculateRateVo || {};
});
const ratePlanVo = computed(() => {
  return detail.value.ratePlanVo || {};
});
const hotelRoomVo = computed(() => {
  return detail.value.hotelRoomVo || {};
});

const submitOrder = debounce(function () {
  hotelOrder.submitOrder();
}, 300);
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
