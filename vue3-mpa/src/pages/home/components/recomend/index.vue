<template>
  <div class="wrapper">
    <div class="list recommend">
      <div class="title">
        旅仓主推
        <div class="more" @click="checkMore(NavIndex.feilong)">
          更多<el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="content">
        <template v-if="!feilongProduct.length">
          <lc-skeleton :rows="5" />
        </template>
        <template v-else>
          <div
            class="item"
            v-for="item of feilongProduct"
            :key="item.pid"
            @click="addressSkip({ ...item, pid: item.pSupplierProductCode })"
          >
            <img :src="item.pPicture" class="img" />
            <div class="info">
              <div class="label line3">
                {{ item.pTitle }}
              </div>
              <div class="price">
                <lc-position
                  :pDeparturePort="item.pDeparturePort"
                  :pDestinationCityName="item.pDestinationCityName"
                />
                <lc-price :price="item.pMarketPrice" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="list special-price">
      <div class="title">
        特价
        <div class="more" @click="checkMore(NavIndex.specialPrice)">
          更多<el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="content">
        <template v-if="!specialPriceProduct.length">
          <lc-skeleton :rows="5" />
        </template>
        <template v-else>
          <div
            class="item"
            v-for="item of specialPriceProduct"
            :key="item.pid"
            @click="addressSkip({ ...item, pid: item.pSupplierProductCode })"
          >
            <img :src="item.pPicture" class="img" />
            <div class="info">
              <div class="label line3">
                {{ item.pTitle }}
              </div>
              <div class="price">
                <lc-position
                  :pDeparturePort="item.pDeparturePort"
                  :pDestinationCityName="item.pDestinationCityName"
                />
                <lc-price :price="item.pMarketPrice" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="list interests">
      <div class="title">
        高利润
        <div class="more" @click="checkMore(NavIndex.profit)">
          更多<el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="content">
        <template v-if="!profitProduct.length">
          <lc-skeleton :rows="5" />
        </template>
        <template v-else>
          <div
            class="item"
            v-for="item of profitProduct"
            :key="item.pid"
            @click="addressSkip({ ...item, pid: item.pSupplierProductCode })"
          >
            <img :src="item.pPicture" class="img" />
            <div class="info">
              <div class="label line3">
                {{ item.pTitle }}
              </div>
              <div class="price">
                <lc-position
                  :pDeparturePort="item.pDeparturePort"
                  :pDestinationCityName="item.pDestinationCityName"
                />
                <lc-price :price="item.pMarketPrice" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { useHome } from '@/stores/home';
import { computed, onBeforeMount } from 'vue';
import { addressSkip } from '@/utils/home/common';
import { NavIndex } from '@/enum/home';
import { safeWindowOpen } from '@/utils/util';

const home = useHome();
const feilongProduct = computed(() => {
  return home.feilongProduct?.slice(0, 5);
});
const profitProduct = computed(() => {
  return home.profitProduct?.slice(0, 5);
});
const specialPriceProduct = computed(() => {
  return home.specialPriceProduct?.slice(0, 5);
});

onBeforeMount(() => {});

function checkMore(e: NavIndex) {
  safeWindowOpen(`/Home/More?navIndex=${e}`);
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
