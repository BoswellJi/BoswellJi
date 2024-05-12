<template>
  <div class="list-filter" v-loading="hotelList.loading">
    <dl class="filter-item dtg-flex dtg-align-center filter-item-area">
      <dt>地区:</dt>
      <dd
        class="unlimit"
        @click="clearArea"
        :class="{ active: !hotelList.districtId && !hotelList.businessZoneId }"
      >
        不限
      </dd>
      <dd class="area-item" v-if="hotelList.regionList.length">
        <div class="select-label" @click.stop="openArea">
          <span>{{ hotelList.districtName }}</span
          ><span class="iconfont icon-xiala"> </span>
        </div>
        <div class="area-pop" v-show="filterBox.isShowRegion">
          <div class="pop-con">
            <ul @click="changeRegion">
              <li
                v-for="(item, index) of hotelList.regionList"
                :key="index"
                :title="item.nameCn"
                :data-id="item.id"
                class="area-sel-item"
              >
                {{ item.nameCn }}
              </li>
            </ul>
          </div>
        </div>
      </dd>
      <dd class="area-item" v-if="hotelList.businessAreaList.length">
        <div class="select-label" @click.stop="openBusinessArea">
          <span>{{ hotelList.businessZoneName }}</span
          ><span class="iconfont icon-xiala"></span>
        </div>
        <div class="area-pop" v-show="filterBox.isShowBusinessArea">
          <div class="pop-con">
            <ul @click="changeBusiness">
              <li
                v-for="(item, index) of hotelList.businessAreaList"
                :key="index"
                :title="item.nameCn"
                :data-id="item.id"
                class="area-sel-item"
              >
                {{ item.nameCn }}
              </li>
            </ul>
          </div>
        </div>
      </dd>
      <dd class="area-item" v-if="hotelList.trainStationList.length">
        <div class="select-label" @click.stop="openTrainStation">
          <span>{{ hotelList.labelName }}</span
          ><span class="iconfont icon-xiala"></span>
        </div>
        <div class="area-pop" v-show="filterBox.isShowTrainStation">
          <div class="pop-con">
            <ul @click="changeLabel">
              <li
                v-for="(item, index) of hotelList.trainStationList"
                :key="index"
                :data-id="item.id"
                :title="item.nameCn"
                class="area-sel-item"
              >
                {{ item.nameCn }}
              </li>
            </ul>
          </div>
        </div>
      </dd>
    </dl>
    <dl class="filter-item dtg-flex dtg-align-center">
      <dt>价格:</dt>
      <dd
        @click="clearPrice"
        class="unlimit"
        :class="{ active: !hotelList.price && !hotelList.priceLow && !hotelList.priceHigh }"
      >
        不限
      </dd>
      <dd>
        <el-radio-group @change="hotelList.refreshData" v-model="hotelList.price">
          <el-radio v-for="item of hotelList.priceList" :label="item.value" :key="item.value">{{
            item.label
          }}</el-radio>
        </el-radio-group>
      </dd>
      <dd class="price-input">
        <label>自定义：</label>
        <el-input-number
          class="custom-price"
          :controls="false"
          placeholder="￥"
          size="small"
          :min="0"
          v-model="hotelList.priceLow"
        />
        <span class="middle-line">—</span>
        <el-input-number
          class="custom-price"
          :controls="false"
          placeholder="￥"
          size="small"
          :min="0"
          v-model="hotelList.priceHigh"
        />
        <span class="price-confirm" @click="priceComfirm">确定</span>
      </dd>
    </dl>
    <dl class="filter-item dtg-flex dtg-align-center">
      <dt>星级:</dt>
      <dd class="unlimit" @click="clearStar" :class="{ active: !hotelList.star.length }">不限</dd>
      <dd>
        <el-checkbox-group @change="hotelList.refreshData" v-model="hotelList.star">
          <el-checkbox v-for="(item, index) of hotelList.starList" :key="index" :label="item.id">{{
            item.nameCn
          }}</el-checkbox>
        </el-checkbox-group>
      </dd>
    </dl>
    <dl class="filter-item dtg-flex dtg-align-center">
      <dt>品牌:</dt>
      <dd
        @click="clearBrand"
        class="unlimit"
        :class="{ active: !hotelList.hotelBrand.length && !hotelList.allHotelBrand.length }"
      >
        不限
      </dd>
      <dd style="width: 900px">
        <el-checkbox-group @change="hotelList.refreshData" v-model="hotelList.hotelBrand">
          <el-checkbox
            v-for="(item, index) of (hotelList.brandList &&
              hotelList.brandList[0] &&
              hotelList.brandList[0].subHotelFilterInfos) ||
            []"
            :key="index"
            :label="item.id"
            >{{ item.nameCn }}</el-checkbox
          >
        </el-checkbox-group>
      </dd>
      <dd class="more-chain dtg-align-end">
        <div class="more-btn color-2" @click="openAllHotelBrand">
          更多品牌
          <span class="iconfont icon-xiala"></span>
        </div>
        <div class="chain-pop" v-show="filterBox.isShowAllHotelBrand">
          <div class="close-btn">
            <span class="iconfont icon-guanbi2" @click="closeAllHotelBrand"> </span>
          </div>
          <div class="chain-tab">
            <div class="chain-navs">
              <span
                @click="changeBrandType('经济')"
                :class="{ active: filterBox.brandType === '经济' }"
                >经济</span
              >
              <span
                @click="changeBrandType('舒适')"
                :class="{ active: filterBox.brandType === '舒适' }"
                >舒适</span
              >
              <span
                @click="changeBrandType('高档')"
                :class="{ active: filterBox.brandType === '高档' }"
                >高档</span
              >
              <span
                @click="changeBrandType('豪华')"
                :class="{ active: filterBox.brandType === '豪华' }"
                >豪华</span
              >
            </div>

            <div class="chain-cons">
              <el-checkbox-group v-model="hotelList.allHotelBrand">
                <el-checkbox
                  v-for="(item, index) of computedHotelBrand"
                  :key="index"
                  :label="item.id"
                  >{{ item.nameCn }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
          <div class="chain-pop-btn">
            <button class="clear-btn" @click="cancel">清空</button
            ><button class="confirm" @click="confirm">确定</button>
          </div>
        </div>
      </dd>
    </dl>
    <dl class="filter-item dtg-flex dtg-align-center">
      <dt>发票:</dt>
      <dd
        class="unlimit"
        @click="clearInvoiceMode"
        :class="{ active: !hotelList.invoiceMode.length }"
      >
        不限
      </dd>
      <dd>
        <el-checkbox-group @change="hotelList.refreshData" v-model="hotelList.invoiceMode">
          <el-checkbox label="Elong">平台代开票</el-checkbox>
          <el-checkbox label="Hotel">酒店开发票</el-checkbox>
        </el-checkbox-group>
      </dd>
    </dl>
    <!-- <dl class="filter-item dtg-flex dtg-align-center">
      <dt>床型:</dt>
      <dd class="unlimit active">不限</dd>
      <dd>
        <el-checkbox-group>
          <el-checkbox label="Option A" />
          <el-checkbox label="Option B" />
          <el-checkbox label="Option C" />
          <el-checkbox label="disabled" />
          <el-checkbox label="selected" />
        </el-checkbox-group>
      </dd>
    </dl> -->
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive, onMounted, onBeforeUnmount, computed } from 'vue';

import { useHotelList } from '@/stores/hotelList';

const hotelList = useHotelList();
const filterBox = reactive({
  isShowRegion: false,
  isShowBusinessArea: false,
  isShowTrainStation: false,
  brandType: '经济',
  isShowAllHotelBrand: false,
});

const computedHotelBrand = computed(() => {
  const brandMap = {
    经济: 1,
    舒适: 2,
    高档: 3,
    豪华: 4,
  };

  return (
    (hotelList.brandList &&
      hotelList.brandList[brandMap[filterBox.brandType]] &&
      hotelList.brandList[brandMap[filterBox.brandType]].subHotelFilterInfos) ||
    []
  );
});

function docClickHandler() {
  filterBox.isShowRegion = false;
  filterBox.isShowBusinessArea = false;
  filterBox.isShowTrainStation = false;
}

onMounted(() => {
  document.addEventListener('click', docClickHandler, false);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', docClickHandler, false);
});

function clearArea() {
  hotelList.districtId = '';
  hotelList.districtName = '行政区';
  hotelList.businessZoneId = '';
  hotelList.businessZoneName = '商圈';

  hotelList.refreshData();
}

function clearPrice() {
  hotelList.price = '';
  hotelList.priceLow = null;
  hotelList.priceHigh = null;
  hotelList.refreshData();
}

function clearStar() {
  hotelList.star = [];
  hotelList.refreshData();
}

function clearBrand() {
  hotelList.hotelBrand = [];
  hotelList.allHotelBrand = [];
  hotelList.refreshData();
}

function clearInvoiceMode() {
  hotelList.invoiceMode = [];
  hotelList.refreshData();
}

function changeRegion(e) {
  const el = e.target;
  const title = el.getAttribute('title');
  const id = el.getAttribute('data-id');

  hotelList.districtName = title;
  hotelList.districtId = id;

  hotelList.businessZoneName = '商圈';
  hotelList.businessZoneId = '';

  hotelList.labelName = '机场车站';
  hotelList.labelId = '';

  hotelList.refreshData();
}

function changeBusiness(e) {
  const el = e.target;
  const title = el.getAttribute('title');
  const id = el.getAttribute('data-id');

  hotelList.businessZoneName = title;
  hotelList.businessZoneId = id;

  hotelList.districtName = '行政区';
  hotelList.districtId = '';

  hotelList.labelName = '机场车站';
  hotelList.labelId = '';

  hotelList.refreshData();
}

function changeLabel(e) {
  const el = e.target;
  const title = el.getAttribute('title');
  const id = el.getAttribute('data-id');

  hotelList.labelName = title;
  hotelList.labelId = id;

  hotelList.businessZoneName = '商圈';
  hotelList.businessZoneId = '';

  hotelList.districtName = '行政区';
  hotelList.districtId = '';

  hotelList.refreshData();
}

function priceComfirm() {
  hotelList.price = '';
  hotelList.getHotelList();
}

function cancel() {
  hotelList.allHotelBrand = [];
  hotelList.getHotelList();
  closeAllHotelBrand();
}

function confirm() {
  hotelList.getHotelList();
  closeAllHotelBrand();
}

function openAllHotelBrand() {
  filterBox.isShowAllHotelBrand = true;
}

function closeAllHotelBrand() {
  filterBox.isShowAllHotelBrand = false;
}

function changeBrandType(type) {
  filterBox.brandType = type;
}

function openArea() {
  filterBox.isShowRegion = true;
  filterBox.isShowBusinessArea = false;
}

function openBusinessArea() {
  filterBox.isShowRegion = false;
  filterBox.isShowBusinessArea = true;
}

function openTrainStation() {
  filterBox.isShowTrainStation = true;
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
