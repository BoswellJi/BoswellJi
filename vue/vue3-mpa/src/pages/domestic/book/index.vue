<template>
  <div class="wrapper">
    <div class="nav-box">
      <div class="nav">
        <a href="/" target="_blank" class="logo"></a>
        <div class="step">
          <div class="item one">
            <span class="label">1</span>
            <span class="text">填写订单信息</span>
            <el-icon><ArrowRightBold /></el-icon>
          </div>
          <div class="item two">
            <span class="label">2</span>
            <span class="text">在线支付</span>
            <el-icon><ArrowRightBold /></el-icon>
          </div>
          <div class="item three">
            <span class="label">3</span>
            <span class="text">支付成功</span>
          </div>
        </div>
        <div class="user-info">
          <span>尊敬的{{ domesticBooking.userName }}您好！</span>
          <span class="exit" @click="quit">退出</span>
          <span>帮助中心</span>
        </div>
      </div>
    </div>
    <div class="detail">
      <div class="left">
        <product-info />
        <order-info />
      </div>
      <div class="right">
        <fee-info />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import productInfo from './components/productInfo/index.vue';
import orderInfo from './components/orderInfo/index.vue';
import feeInfo from './components/feeInfo/index.vue';
import { quit as quitFn } from '@/utils/util';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useDomesticBooking } from '@/stores/domesticBooking';
import { Session } from '@/utils/storage';

const route = useRoute();
const domesticBooking = useDomesticBooking();

const getQueryString = (): domesticBooking.UrlQuery | undefined => {
  const queryObj = route.query as unknown as domesticBooking.UrlQuery;
  if (!Object.keys(queryObj).length) {
    return;
  } else {
    return queryObj;
  }
};

const getDetailInfo = async () => {
  const qs = getQueryString();
  if (qs) {
    domesticBooking.setQueryString(qs);
    await domesticBooking.getDetailInfo({
      code: 20,
      lineId: qs.lid,
      filterProduct: false,
    });
  }
};

const getLocalInfo = () => {
  const gnybookingParam = Session.get<Domestic.NewpriceType>('gnybookingParam');
  domesticBooking.setHotelList(gnybookingParam.HotelList);
  domesticBooking.setPrefInfoList(gnybookingParam.PrefInfoList);
  domesticBooking.setPriceList(gnybookingParam.PriceList);
  domesticBooking.setSingleProduct(gnybookingParam.singleProduct);
};

const quit = async () => {
  quitFn();
};

onBeforeMount(() => {
  getDetailInfo();
  getLocalInfo();
});
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
