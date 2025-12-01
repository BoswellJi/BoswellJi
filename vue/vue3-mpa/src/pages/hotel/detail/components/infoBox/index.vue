<template>
  <div class="hotel-info">
    <div class="detail-info dtg-flex">
      <div class="hotel-img">
        <div class="img-main dtg-flex dtg-align-center dtg-justify-between">
          <div class="maximg-block">
            <el-carousel
              :initial-index="currentIndex"
              indicator-position="none"
              :autoplay="false"
              height="410px"
              ref="carouselRef"
            >
              <el-carousel-item v-for="item of hotelHeadVo.headImages" :key="item.url">
                <img :src="item.url" />
              </el-carousel-item>
            </el-carousel>
            <!-- <div class="img-types">
              <span class="">所有(10)</span><span class="">外景(4)</span
              ><span class="active">内景设施(6)</span
              >
            </div>
            <div class="fav-box">
              <div class="fav-btn"><span class="iconfont icon-yishoucang"></span></div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="hotel-content">
        <div class="hotel-top dtg-flex">
          <div class="name-info">
            <h2>
              <p class="cn-name">
                <span class="name-value txt-ellipsis" :title="hotelHeadVo.hotelName">{{ hotelHeadVo.hotelName }}</span>
                <el-rate v-if="hotelHeadVo.starRate" v-model="hotelHeadVo.starRate" disabled />
              </p>
              <p class="txt-ellipsis"></p>
            </h2>
            <div class="info-address">
              地址：
              <span>{{ hotelHeadVo.cityName }}</span>
              <span>{{ hotelHeadVo.districtName }}</span>
              {{ hotelHeadVo.address }}
            </div>
            
            <!-- <div class="hotel-fac-icon">
          <span title="免费停车" class="iconfont icon-free-park"></span
          ><span title="免费wifi" class="iconfont icon-wifi"></span
          ><span title="餐厅" class="iconfont icon-restaurant"></span
          ><span title="接机服务" class="iconfont icon-no-airport-transfer icon-not"></span
          ><span title="健身房" class="iconfont icon-no-gym icon-not"></span
          ><span title="游泳池" class="iconfont icon-no-pool icon-not"></span
          ><span title="会议室" class="iconfont icon-no-meeting-hall icon-not"></span>
        </div> -->
          </div>
          <div class="price">
            <span>
              ¥
              <span>{{ hotelDetail.detail.lowRate }}</span></span
            >起
          </div>
        </div>
        <el-carousel
          class="imgs"
          indicator-position="none"
          :autoplay="false"
          height="200px"
          v-if="imageList.length"
          arrow="always"
        >
          <el-carousel-item v-for="(itemMain, index) of imageList" :key="index">
            <div class="img-box">
              <template v-for="item of itemMain" :key="item">
                <img v-if="item" :src="item.url" class="img-item" @click="changeImg(item.url)" />
              </template>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, ref } from 'vue';

import { useHotelDateil } from '@/stores/hotelDetail';

const currentIndex = ref(0);
const carouselRef = ref();
const hotelHeadVo = computed(() => {
  return hotelDetail.detail.hotelHeadVo || {};
});
const imageList = computed(() => {
  const imgs = hotelHeadVo.value.headImages || [];
  const temp = [];
  for (let i = 0; i < imgs.length; i += 6) {
    temp.push(imgs.slice(i, i + 6));
  }
  return temp;
});

function changeImg(url) {
  const index = hotelHeadVo.value.headImages.findIndex((item) => {
    return item.url === url;
  });
  carouselRef.value.setActiveItem(index);
}

const hotelDetail = useHotelDateil();
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
