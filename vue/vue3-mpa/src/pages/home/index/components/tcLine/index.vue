<template>
  <div class="wrapper">
    <div class="title">
      <div class="label">旅仓专线</div>
      <div class="nav" @click="changeHotType">
        <div
          :class="{ active: hotType === productCategory.domestic, item: true }"
          :data-type="productCategory.domestic"
        >
          国内游
        </div>
        <div
          :class="{ active: hotType === productCategory.abroad, item: true }"
          :data-type="productCategory.abroad"
        >
          出境游
        </div>
        <div
          :class="{ active: hotType === productCategory.cruise, item: true }"
          :data-type="productCategory.cruise"
        >
          邮轮
        </div>
        <div
          :class="{ active: hotType === productCategory.around, item: true }"
          :data-type="productCategory.around"
        >
          周边游
        </div>
      </div>
      <div class="more" @click="checkMore(hotType)">
        更多产品<el-icon><ArrowRight /></el-icon>
      </div>
    </div>

    <div class="list" v-show="hotType === productCategory.around">
      <div
        class="item"
        v-for="item of specialAroundProductList"
        :key="item.lineId"
        @click="addressSkipWrap(item, productCategory.around)"
      >
        <img :src="item.imgUrl" class="img" />
        <div class="content">
          <div class="line2 label">
            {{ item.title }}
          </div>
          <lc-position
            :pDeparturePort="item.departureCity"
            :pDestinationCityName="item.destinationCity"
          />
          <lc-price :price="item.marketPrice" />
        </div>
      </div>
      <lc-empty v-show="!specialAroundProductList.length" />
    </div>

    <div class="list" v-show="hotType === productCategory.domestic">
      <div
        class="item"
        v-for="item of specialDomesticSelfProductList"
        :key="item.lineId"
        @click="addressSkipWrap(item, productCategory.domestic)"
      >
        <img :src="item.imgUrl" class="img" />
        <div class="content">
          <div class="line2 label">
            {{ item.title }}
          </div>
          <lc-position
            :pDeparturePort="item.departureCity"
            :pDestinationCityName="item.destinationCity"
          />
          <lc-price :price="item.marketPrice" />
        </div>
      </div>
      <lc-empty v-show="!specialDomesticSelfProductList.length" />
    </div>

    <div class="list" v-show="hotType === productCategory.abroad">
      <div
        class="item"
        v-for="item of specialAbroadProductList"
        :key="item.lineId"
        @click="addressSkipWrap(item, productCategory.abroad)"
      >
        <img :src="item.imgUrl" class="img" />
        <div class="content">
          <div class="line2 label">
            {{ item.title }}
          </div>
          <lc-position
            :pDeparturePort="item.departureCity"
            :pDestinationCityName="item.destinationCity"
          />
          <lc-price :price="item.marketPrice" />
        </div>
      </div>
      <lc-empty v-show="!specialAbroadProductList.length" />
    </div>

    <div class="list" v-show="hotType === productCategory.cruise">
      <div
        class="item"
        v-for="item of specialCruiseProductList"
        :key="item.lineId"
        @click="addressSkipWrap(item, productCategory.cruise)"
      >
        <img :src="item.imgUrl" class="img" />
        <div class="content">
          <div class="line2 label">
            {{ item.title }}
          </div>
          <lc-position
            :pDeparturePort="item.departureCity"
            :pDestinationCityName="item.destinationCity"
          />
          <lc-price :price="item.marketPrice" />
        </div>
      </div>
      <lc-empty v-show="!specialCruiseProductList.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { useHome } from '@/stores/home';
import { computed, onBeforeMount, ref } from 'vue';
import { productCategory } from '@/enum/common';
import { addressSkip } from '@/utils/home/common';
import { safeWindowOpen } from '@/utils/util';

const hotType = ref(productCategory.domestic);
const home = useHome();
const showNumber = 8;

onBeforeMount(() => {});

const specialAroundProductList = computed(() => {
  return home.specialAroundProductList?.slice(0, showNumber);
});

const specialDomesticSelfProductList = computed(() => {
  return home.specialDomesticSelfProductList?.slice(0, showNumber);
});

const specialAbroadProductList = computed(() => {
  return home.specialAbroadProductList?.slice(0, showNumber);
});

const specialCruiseProductList = computed(() => {
  return home.specialCruiseProductList?.slice(0, showNumber);
});

function changeHotType(e) {
  const type: productCategory = e.target.getAttribute('data-type');
  type && (hotType.value = Number(type));
}

function addressSkipWrap(item, type: productCategory) {
  const { lineId } = item;
  addressSkip({
    pProductCategory: type,
    pid: lineId,
    ...item,
  });
}

function checkMore(e) {
  const typeMap = {
    [productCategory.around]: 1,
    [productCategory.domestic]: 2,
    [productCategory.abroad]: 5,
    [productCategory.cruise]: 4,
  };
  safeWindowOpen(`/Product/IndexNew?projectId=${typeMap[e]}`);
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
