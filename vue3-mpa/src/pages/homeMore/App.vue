<template>
  <lc-nav-more :current-project-id="currentNavIndex" @change="lcNavMoreChange" />
  <div class="wrapper product-list" v-loading="loading">
    <div
      class="list-box"
      v-for="item of productList"
      :key="item.pid"
      @click="addressSkip({ ...item, pid: item.pSupplierProductCode })"
    >
      <div class="left-box">
        <img :src="item.pPicture" /><span class="tag" v-if="item.pProductCategoryName">{{
          item.pProductCategoryName
        }}</span>
        <div class="gradient-box">
          <p class="img-text">{{ item.pDeparturePort }}出发</p>
        </div>
      </div>
      <div class="right-box">
        <div class="info-box">
          <a class="title">
            <span class="main-title">{{ item.pTitle }}</span>
          </a>
          <div class="title" style="margin-top: 5px">{{ item.pSubtitle }}</div>
        </div>
        <div class="price-box">
          <lc-price :price="item.pMarketPrice" />
          <template v-if="item.pMarketPrice">
            <p class="price-th">
              <i>同行价</i><em>¥</em><span>{{ item.pDistributionPrice }}</span
              ><i>起</i>
            </p>
            <p class="profit-box">
              <span class="profit"
                >利润<em>¥</em><span>{{ item.pProfit }}</span></span
              >
            </p>
          </template>
          <p class="num">{{ item.pOrderSales }}人已购买</p>
        </div>
      </div>
    </div>
    <div class="pager">
      <el-pagination
        v-model:current-page="pageIndex"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import lcNavMore from '@/components/lcNavMore/index.vue'

import { computed, onBeforeMount, reactive, ref } from 'vue'

import request from '@/utils/request'
import { addressSkip } from '@/utils/home/common'
import { NavIndex } from '@/enum/home'

const navIndex = 0

const currentNavIndex = ref(navIndex)
const loading = ref(false)
const feilongProduct = reactive({
  datas: [],
  pageIndex: 1,
  pageSize: 10,
  total: 0
})
const profitProduct = reactive({
  datas: [],
  pageIndex: 1,
  pageSize: 10,
  total: 0
})
const specialPriceProduct = reactive({
  datas: [],
  pageIndex: 1,
  pageSize: 10,
  total: 0
})
const pageSize = computed(() => {
  if (NavIndex.feilong === currentNavIndex.value) {
    return feilongProduct.pageSize
  } else if (NavIndex.profit === currentNavIndex.value) {
    return profitProduct.pageSize
  } else if (NavIndex.specialPrice === currentNavIndex.value) {
    return specialPriceProduct.pageSize
  } else {
    return 10
  }
})
const pageIndex = computed({
  get() {
    if (NavIndex.feilong === currentNavIndex.value) {
      return feilongProduct.pageIndex
    } else if (NavIndex.profit === currentNavIndex.value) {
      return profitProduct.pageIndex
    } else if (NavIndex.specialPrice === currentNavIndex.value) {
      return specialPriceProduct.pageIndex
    } else {
      return 1
    }
  },
  set(newValue) {
    if (NavIndex.feilong === currentNavIndex.value) {
      feilongProduct.pageIndex = newValue
    } else if (NavIndex.profit === currentNavIndex.value) {
      profitProduct.pageIndex = newValue
    } else if (NavIndex.specialPrice === currentNavIndex.value) {
      specialPriceProduct.pageIndex = newValue
    }
    getList()
  }
})
const total = computed(() => {
  if (NavIndex.feilong === currentNavIndex.value) {
    return feilongProduct.total
  } else if (NavIndex.profit === currentNavIndex.value) {
    return profitProduct.total
  } else if (NavIndex.specialPrice === currentNavIndex.value) {
    return specialPriceProduct.total
  } else {
    return 0
  }
})
const productList = computed(() => {
  if (NavIndex.feilong === currentNavIndex.value) {
    return feilongProduct.datas
  } else if (NavIndex.profit === currentNavIndex.value) {
    return profitProduct.datas
  } else if (NavIndex.specialPrice === currentNavIndex.value) {
    return specialPriceProduct.datas
  } else {
    return []
  }
})
const produtApi = computed(() => {
  if (NavIndex.feilong === currentNavIndex.value) {
    return '/webapi/homeIndex/queryFeilongProduct'
  } else if (NavIndex.profit === currentNavIndex.value) {
    return '/webapi/homeIndex/queryProfitProduct'
  } else if (NavIndex.specialPrice === currentNavIndex.value) {
    return '/webapi/homeIndex/querySpecialPriceProduct'
  } else {
    return ''
  }
})

onBeforeMount(() => {
  getList()
})

async function getList() {
  try {
    loading.value = true
    const {
      data: { feilongProduct: flp, profitProduct: pp, specialPriceProduct: spp }
    } = await request({
      url: produtApi.value,
      method: 'post',
      data: {
        pageIndex: pageIndex.value,
        pageSize: pageSize.value,
        sort: 2
      }
    })

    if (NavIndex.feilong === currentNavIndex.value) {
      feilongProduct.datas = flp?.datas || []
      feilongProduct.total = flp?.total || 0
    } else if (NavIndex.profit === currentNavIndex.value) {
      profitProduct.datas = pp?.datas || []
      profitProduct.total = pp?.total || 0
    } else if (NavIndex.specialPrice === currentNavIndex.value) {
      specialPriceProduct.datas = spp?.datas || []
      specialPriceProduct.total = spp?.total || 0
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

function lcNavMoreChange(e) {
  currentNavIndex.value = e
  if (NavIndex.feilong === e) {
    if (!feilongProduct.datas.length) {
      getList()
    }
  } else if (NavIndex.profit === e) {
    if (!profitProduct.datas.length) {
      getList()
    }
  } else if (NavIndex.specialPrice === e) {
    if (!specialPriceProduct.datas.length) {
      getList()
    }
  }
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
