<template>
  <div class="search-block">
    <div class="form-item">
      <div class="pop-city">
        <input
          v-model="hotelList.target"
          type="text"
          placeholder="请选择目的地"
          class="input-small target"
          @focus="openTarget"
          @input="openSearchTarget"
          @click.stop="() => {}"
        />
        <div class="city-wrapper" v-show="searchBox.isShowTarget">
          <div class="city-title">
            热门城市（可直接选择城市或输入城市中文/拼音）<span @click="closeTarget"></span>
          </div>
          <div class="city-content">
            <div class="tabs">
              <div class="tab-cons" @click.stop="selectTarget">
                <div class="tab-con active">
                  <ul>
                    <li
                      v-for="(item, index) of searchBox.hotCity"
                      :key="index"
                      :title="item.name"
                      :cityid="item.ecityId"
                      class="city-item-1"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="auto-wrapper" v-show="searchBox.isShowSerchTarget">
          <div class="title">
            输入中文/拼音
            <span @click="closeSearchTarget"></span>
          </div>
          <div class="auto-list hotel" @click="selectSearchTarget">
            <ul>
              <li class="line-br" v-for="(item, index) of searchBox.searchHotCity" :key="index">
                <p
                  :title="item.name"
                  :data-name="item.cityName"
                  :data-keyword="item.keyWord"
                  class="auto-item txt-ellipsis"
                  :data-cityid="item.cityId"
                >
                  {{ item.name }}
                  <span v-if="item.typeName">{{ item.typeName }}</span>
                </p>
              </li>
            </ul>
          </div>
          <!----><!---->
        </div>
      </div>
    </div>
    <div class="form-item">
      <el-date-picker
        v-model="hotelList.startEndDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="large"
        value-format="YYYY-MM-DD"
        :disabled-date="disabledDate"
        @change="startEndDateChange"
      />
    </div>
    <div class="form-item">
      <div class="pop-city">
        <input
          v-model="hotelList.brand"
          type="text"
          placeholder="位置/酒店/品牌"
          class="input-small"
          @focus="openKeyword"
          @input="openSearchKeyword"
          @click.stop="() => {}"
        />
        <div class="keyword-wrapper" v-show="searchBox.isShowKeyword">
          <div class="keyword-title">
            热门关键字（可直接选择推荐关键字或输入中文/拼音）
            <span></span>
          </div>
          <div class="keyword-content" @click.stop="selectKeyword">
            <dl class="label" v-if="hotelList.trainStationList.length">
              <dt><!---->机场车站</dt>
              <dd>
                <span
                  class="type-txt"
                  :title="item.nameCn"
                  :data-id="item.id"
                  v-for="item of hotelList.trainStationList"
                  :key="item.nameCn"
                  :data-type="1"
                >
                  {{ item.nameCn }}
                </span>
              </dd>
            </dl>
            <dl class="section" v-if="hotelList.regionList.length">
              <dt><!---->热门行政区</dt>
              <dd>
                <span
                  class="type-txt"
                  :title="item.nameCn"
                  :data-id="item.id"
                  v-for="item of hotelList.regionList"
                  :key="item.nameCn"
                  :data-type="2"
                >
                  {{ item.nameCn }}
                </span>
              </dd>
            </dl>
            <dl class="business" v-if="hotelList.businessAreaList.length">
              <dt><!---->热门商圈</dt>
              <dd>
                <span
                  class="type-txt"
                  :title="item.nameCn"
                  :data-id="item.id"
                  v-for="item of hotelList.businessAreaList"
                  :key="item.nameCn"
                  :data-type="3"
                >
                  {{ item.nameCn }}
                </span>
              </dd>
            </dl>
          </div>
        </div>
        <div
          class="auto-wrapper"
          v-show="searchBox.isShowSearchKeyword"
          @click.stop="selectSearchKeyword"
        >
          <div class="title">
            输入中文/拼音
            <span @click="closeSearchKeyword"></span>
          </div>
          <!---->
          <div class="auto-list hotel">
            <ul>
              <li class="line-br" v-for="(item, index) of searchBox.searchKeyWordList" :key="index">
                <div
                  :title="item.name"
                  class="auto-item intl-auto-item dtg-flex dtg-align-center dtg-justify-between"
                >
                  <div
                    style="max-width: 80%"
                    class="txt txt-ellipsis"
                    :data-id="item.id"
                    :title="item.name"
                  >
                    {{ item.name }}
                  </div>

                  <span v-if="item.typeName">{{ item.typeName }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="form-item mgr0"><button class="search-btn" @click="search">搜索</button></div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive, onMounted, onBeforeUnmount, onBeforeMount } from 'vue'
import { debounce } from 'lodash'
import { parse } from 'qs'

import { useHotelList } from '@/stores/hotelList'
import request from '@/utils/request'
import moment from 'moment'

const hotelList = useHotelList()
const searchBox = reactive({
  isShowTarget: false,
  isShowSerchTarget: false,
  isShowKeyword: false,
  isShowSearchKeyword: false,

  hotCity: [],
  searchHotCity: [],
  searchKeyWordList: []
})

function docClickHandler() {
  closeTarget()
  closeSearchTarget()
  closeKeyword()
  closeSearchKeyword()
}

onBeforeMount(async () => {
  const { target, targetId, brand, startDate, endDate } = parse(location.search.slice(1))
  if (target) {
    hotelList.target = target
    hotelList.targetId = targetId
    hotelList.brand = brand
    hotelList.startEndDate = [startDate, endDate]
  }
  await getTarget()
  await getKeyword()
  if (target) {
    await search()
  }
})

onMounted(() => {
  document.addEventListener('click', docClickHandler, false)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', docClickHandler, false)
})

function startEndDateChange(e) {
  const [start, end] = e
  if (start === end) {
    hotelList.startEndDate = [start, moment(end).add(1, 'days').format('YYYY-MM-DD')]
  }
}

function disabledDate(e: Date) {
  return Date.now() - 24 * 60 * 60 * 1000 > new Date(e).getTime()
}

function search() {
  hotelList.getHotelList()
}

async function getTarget() {
  const { data } = await request({
    url: '/webapi/hotel/queryDefaultDestination',
    method: 'get'
  })
  searchBox.hotCity = data?.blocks[0]?.records || []
}

async function getSearchTarget() {
  const { data } = await request({
    url: '/webapi/hotel/queryDestination',
    method: 'post',
    data: {
      queryText: hotelList.target,
      sugOrientation: 0 // 0国内 1国际
    }
  })
  searchBox.searchHotCity = data || []
}

async function getKeyword() {
  const { data } = await request({
    url: '/webapi/hotel/queryFilter',
    method: 'post',
    data: {
      cityId: hotelList.targetId,
      filterType: 3,
      hotFilter: false
    }
  })
  hotelList.businessAreaList = []
  hotelList.regionList = []

  data.forEach((item) => {
    const { nameCn, subHotelFilterInfos } = item
    if (nameCn === '商圈') {
      hotelList.businessAreaList = subHotelFilterInfos
    } else if (nameCn === '行政区') {
      hotelList.regionList = subHotelFilterInfos
    } else if (nameCn === '品牌连锁') {
      hotelList.brandList = subHotelFilterInfos
    } else if (nameCn === '星级') {
      hotelList.starList = subHotelFilterInfos
    }
  })

  hotelList.keyWordList = data || []
}

async function getSearchKeyword() {
  const { data } = await request({
    url: '/webapi/hotel/queryKeyword',
    method: 'post',
    data: {
      cityId: hotelList.targetId,
      queryText: hotelList.brand
    }
  })

  searchBox.searchKeyWordList = data || []
}

function selectKeyword(e) {
  const id = e.target.getAttribute('data-id')
  const type = e.target.getAttribute('data-type')
  const title = e.target.getAttribute('title')

  if (type == 2) {
    hotelList.districtId = id
    hotelList.districtName = title
    hotelList.businessZoneName = '商圈'
    hotelList.businessZoneId = ''

    hotelList.labelName = '机场车站'
    hotelList.labelId = ''
  } else if (type == 3) {
    hotelList.businessZoneId = id
    hotelList.businessZoneName = title
    hotelList.districtName = '行政区'
    hotelList.districtId = ''

    hotelList.labelName = '机场车站'
    hotelList.labelId = ''
  } else if (type === 1) {
    hotelList.labelId = id
    hotelList.labelName = title
    hotelList.businessZoneName = '商圈'
    hotelList.businessZoneId = ''
    hotelList.districtName = '行政区'
    hotelList.districtId = ''
  }
  hotelList.brand = title
  closeKeyword()
  hotelList.refreshData()
}

function selectSearchKeyword(e) {
  const title = e.target.getAttribute('title')
  if (title) {
    hotelList.brand = title

    closeSearchKeyword()
    closeKeyword()
    refreshDataKeyword()
  }
}

function openKeyword() {
  searchBox.isShowKeyword = true
}

function closeKeyword() {
  searchBox.isShowKeyword = false
}

const openSearchKeyword = debounce(function () {
  closeKeyword()
  if (hotelList.brand) {
    getSearchKeyword()
    searchBox.isShowSearchKeyword = true
  } else {
    closeSearchKeyword()
    openKeyword()
  }
}, 300)

function closeSearchKeyword() {
  searchBox.isShowSearchKeyword = false
}

function selectSearchTarget(e) {
  const cityId = e.target.getAttribute('data-cityid')
  const cityName = e.target.getAttribute('data-name')
  const keyword = e.target.getAttribute('data-keyword')

  if (cityName) {
    hotelList.target = cityName
    hotelList.targetId = cityId
    hotelList.brand = keyword
    getKeyword()
    closeSearchTarget()
    hotelList.refreshData()
  }
}

const openSearchTarget = debounce(function () {
  closeTarget()
  if (hotelList.target) {
    getSearchTarget()
    searchBox.isShowSerchTarget = true
  } else {
    openTarget()
    closeSearchTarget()
  }
}, 300)

function closeSearchTarget() {
  searchBox.isShowSerchTarget = false
}

function selectTarget(e) {
  const { title } = e.target
  const cityid = e.target.getAttribute('cityid')
  if (title) {
    hotelList.target = title
    hotelList.targetId = cityid
    getKeyword()
    closeTarget()
    refreshData()
  }
}

function refreshData() {
  hotelList.pageIndex = 1
  hotelList.brand = ''
  hotelList.districtName = '行政区'
  hotelList.districtId = ''
  hotelList.businessZoneName = '商圈'
  hotelList.businessZoneId = ''
  hotelList.labelName = '机场车站'
  hotelList.labelId = ''
  hotelList.price = ''
  hotelList.priceLow = null
  hotelList.priceHigh = null
  hotelList.star = []
  hotelList.hotelBrand = []
  hotelList.allHotelBrand = []
  hotelList.invoiceMode = []

  hotelList.refreshData()
}

function refreshDataKeyword() {
  hotelList.pageIndex = 1
  hotelList.districtName = '行政区'
  hotelList.districtId = ''
  hotelList.businessZoneName = '商圈'
  hotelList.businessZoneId = ''
  hotelList.labelName = '机场车站'
  hotelList.labelId = ''
  hotelList.price = ''
  hotelList.priceLow = ''
  hotelList.priceHigh = ''
  hotelList.star = []
  hotelList.hotelBrand = []
  hotelList.allHotelBrand = []
  hotelList.invoiceMode = []

  hotelList.refreshData()
}

function openTarget() {
  searchBox.isShowTarget = true
}

function closeTarget() {
  searchBox.isShowTarget = false
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
