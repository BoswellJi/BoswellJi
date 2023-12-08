<template>
  <div class="list-block block" v-loading="hotelList.loading">
    <div class="title-bar dtg-flex dtg-align-center" @click="changeSort">
      <div class="sort-item" :class="{ active: hotelList.sortType == 0 }" data-type="0">
        综合排序
      </div>
      <div
        class="sort-item"
        :class="{ active: hotelList.sortType == 1 || hotelList.sortType == 2 }"
        data-type="1"
      >
        价格
        <el-icon>
          <Top v-if="hotelList.sortType == 2" />
          <Bottom v-if="hotelList.sortType == 1" />
        </el-icon>
      </div>
      <div class="sort-item" :class="{ active: hotelList.sortType == 3 }" data-type="3">
        热门推荐
      </div>
    </div>
    <div class="filter-options dtg-flex dtg-align-center">
      <div class="hotel-num">
        有
        <i class="font-1">{{ hotelList.total }}</i
        >家酒店
      </div>
    </div>
    <div class="list-main">
      <div class="hotel-list">
        <div class="list-con" v-for="(item, index) of hotelList.list" :key="item.hotelId">
          <dl class="list-item dtg-flex dtg-align-center dtg-justify-between">
            <dt class="img-box">
              <img
                @click.prevent="gotoDetail(item)"
                :src="item.detail.thumbNailUrl"
                @error="errorImg(item)"
              />
            </dt>
            <dd class="info-box dtg-flex-grow1">
              <h2>
                <span class="item-index">{{ index + 1 }}</span>
                <span
                  class="txt-ellipsis"
                  :title="item.detail.hotelName"
                  @click.prevent="gotoDetail(item)"
                  >{{ item.detail.hotelName }}</span
                >
                <el-rate v-if="item.detail.starRate" v-model="item.detail.starRate" disabled />
              </h2>
              <div class="item-info">
                <div class="item-address">
                  <div class="addr-txt">{{ item.detail.address }}</div>
                </div>
                <div class="item-fac hotel-fac-icon">
                  <template v-for="item1 of item.facilities?.split(',')" :key="item1">
                    <span
                      v-if="iconMap[item1]"
                      :title="iconMap[item1].name"
                      :class="`iconfont ${iconMap[item1].icon}`"
                    ></span>
                  </template>
                </div>
              </div>
            </dd>
            <dd class="price-box">
              <p class="score-num">
                <span
                  v-if="
                    item.detail.review.score &&
                    item.detail.review.score.replace('%', '') &&
                    Number(item.detail.review.score.replace('%', ''))
                  "
                >
                  {{ item.detail.review.score.replace('%', '') / 100 }}
                  <span class="total-score">/5分</span>
                </span>
              </p>
              <div v-if="item.selloutFlag == 1"><img class="saleout" src="https://file.40017.cn/elongclub/saleout.png"/></div>
              <template v-else>
                <p class="price-num">
                  <span>¥</span><strong>{{ item.lowRate }}</strong
                  >起
                </p>
                <p class="award-price">佣金:{{ item.commission }}</p>
              
              <div class="detail-btn">
                <a target="_blank" @click.prevent="gotoDetail(item)" id="detail-btn1">查看详情</a>
              </div>
              </template>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="h-list-pager">
      <el-pagination
        :page-size="hotelList.pageSize"
        background
        v-model:current-page="hotelList.pageIndex"
        layout="prev, pager, next"
        :total="hotelList.total"
        @current-change="currentChange"
        @prev-click="currentChange"
        @next-click="currentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { useHotelList } from '@/stores/hotelList';
import { safeWindowOpen } from '@/utils/util';
import { onBeforeMount } from 'vue';

const hotelList = useHotelList();
const iconMap = {
  1: {
    name: '免费wifi',
    icon: 'icon-wifi',
  },
  // 2: {
  //   name: '收费wifi',
  //   icon: 'icon-wifi',
  // },
  // 3: {
  //   name: '免费宽带',
  //   icon: 'icon-wifi',
  // },
  // 4: {
  //   name: '收费宽带',
  //   icon: 'icon-wifi',
  // },
  5: {
    name: '免费停车场',
    icon: 'icon-free-park',
  },
  // 6: {
  //   name: '收费停车场',
  //   icon: 'icon-wifi',
  // },
  7: {
    name: '免费接机服务',
    icon: 'icon-no-airport-transfer',
  },
  // 8: {
  //   name: '收费接机服务',
  //   icon: 'icon-wifi',
  // },
  // 9: {
  //   name: '室内游泳池',
  //   icon: ' icon-pool',
  // },
  10: {
    name: '室外游泳池',
    icon: 'icon-pool',
  },
  11: {
    name: '健身房',
    icon: 'icon-gym',
  },
  // 12: {
  //   name: '商务中心',
  //   icon: 'icon-wifi',
  // },
  13: {
    name: '会议室',
    icon: 'icon-meeting-hall',
  },
  14: {
    name: '酒店餐厅',
    icon: 'icon-restaurant',
  },
  // 15: {
  //   name: '叫醒服务',
  //   icon: 'icon-wifi',
  // },
  // 16: {
  //   name: '行李寄存',
  //   icon: 'icon-wifi',
  // },
  // 17: {
  //   name: '双床',
  //   icon: 'icon-wifi',
  // },
  // 18: {
  //   name: '大床',
  //   icon: 'icon-wifi',
  // },
};

onBeforeMount(() => {
  getData();
});

function changeSort(e) {
  const type = e.target.getAttribute('data-type');
  if (type) {
    if (type == 1 && hotelList.sortType == 1) {
      hotelList.sortType = 2;
    } else {
      hotelList.sortType = type;
    }

    getData();
  }
}

function getData() {
  hotelList.getHotelList();
}

function currentChange() {
  getData();
}

function gotoDetail(item) {
  if(item.selloutFlag == 1) return;
  const {
    startEndDate: [arrivalDate, departureDate],
    invoiceMode,
  } = hotelList;
  safeWindowOpen(
    `/Hotel/Detail?resourceId=${item.hotelId}&arrivalDate=${arrivalDate}&departureDate=${departureDate}&invoiceModeList=${invoiceMode}`,
  );
}

function errorImg(item) {
  item.detail.thumbNailUrl =
    'https://pic3.40017.cn/gny/line/2016/02/03/10/H4gW6T_464x251_0099999.jpg.webp';
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
