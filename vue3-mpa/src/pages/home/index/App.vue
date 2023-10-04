<template>
  <el-config-provider :locale="locale">
    <share-header :isShowNav="true" :isShowSearch="true"></share-header>
    <div class="bg">
      <div class="wrapper">
        <div class="header">
          <div class="left">
            <filter-box />
          </div>
          <div class="right">
            <template v-if="!bannerList.length">
              <el-skeleton style="width: 100%; height: 100%" animated :throttle="500">
                <template #template>
                  <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
                </template>
              </el-skeleton>
            </template>
            <template v-else>
              <el-carousel indicator-position="none">
                <el-carousel-item
                  v-for="item of bannerList"
                  :key="item.aid"
                  @click="addresSkip(item)"
                >
                  <el-image style="width: 100%; height: 100%" :src="item.aPicture" fit="cover" />
                </el-carousel-item>
              </el-carousel>
            </template>
          </div>
        </div>
        <recomend />
        <hot />
        <tc-line />
      </div>
    </div>
    <share-footer></share-footer>
  </el-config-provider>
</template>

<script setup lang="ts">
import filterBox from './components/filterBox/index.vue'
import recomend from './components/recomend/index.vue'
import hot from './components/hot/index.vue'
import tcLine from './components/tcLine/index.vue'

import request from '@/utils/request'
import { addressSkip as addressSkipWrap } from '@/utils/home/common'

import { useHome } from '@/stores/home'
import { onBeforeMount, ref } from 'vue'
import { safeWindowOpen } from '@/utils/util'
import zhCn from 'element-plus/dist/locale/zh-cn.js'

const home = useHome()
const bannerList = ref<any>([])
const locale = ref(zhCn)

onBeforeMount(() => {
  home.getList()
  home.getDedicatedLineList()
  home.getSpecialLineList()

  queryBannerIndex()
})

async function queryBannerIndex() {
  const { data } = await request({
    url: '/webapi/homeIndex/queryBannerIndex',
    method: 'get',
    params: {
      aType: '10'
    }
  })
  bannerList.value = data
}

function addresSkip(item: any) {
  const { aLinkType, aLink, aProductCategory, aProductCode } = item
  if (aLinkType === 1) {
    safeWindowOpen(aLink)
  } else if (aLinkType === 2) {
    addressSkipWrap({
      pid: aProductCode,
      pProductCategory: aProductCategory
    })
  }
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
