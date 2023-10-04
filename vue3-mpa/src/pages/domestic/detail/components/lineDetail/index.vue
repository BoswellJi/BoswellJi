<template>
  <div class="nav-box" ref="navBox">
    <div class="nav" :class="{ fixed: isFixed }">
      <div
        @click="changeDetailNavItem(detailNavItemType.specialRoute)"
        :class="{ item: true, active: detailNavItem === detailNavItemType.specialRoute }"
      >
        线路特色
      </div>
      <div
        @click="changeDetailNavItem(detailNavItemType.detailTrip)"
        :class="{ item: true, active: detailNavItem === detailNavItemType.detailTrip }"
      >
        详细行程
      </div>
      <div
        @click="changeDetailNavItem(detailNavItemType.feeTip)"
        :class="{ item: true, active: detailNavItem === detailNavItemType.feeTip }"
      >
        费用说明
      </div>
      <div
        @click="changeDetailNavItem(detailNavItemType.orderTip)"
        :class="{ item: true, active: detailNavItem === detailNavItemType.orderTip }"
      >
        预订须知
      </div>
      <div
        @click="changeDetailNavItem(detailNavItemType.warmTip)"
        :class="{ item: true, active: detailNavItem === detailNavItemType.warmTip }"
      >
        温馨提示
      </div>
    </div>
  </div>
  <div class="tips">
    行程中涉及航班、火车，大巴信息均为参考信息。航次、班次、出发和到达时间如遇天气等原因导致不一致以当日铁路局、汽车公司、航司信息公布为准。
    <span class="version">本线路属于多版本行程，团期不同行程会有不同，请注意选择</span>
  </div>
  <div class="versions">
    <template v-for="item of versions" :key="item.title">
      <div
        :class="`version ${activeVersion === item.title ? 'active' : ''}`"
        @click="changeVersion(item)"
      >
        <div class="title">{{ item.title }}行程</div>
        <div class="sub-title line1">{{ item.describle }}</div>
        <div class="angle" v-if="activeVersion === item.title">
          <el-icon><Select /></el-icon>
        </div>
      </div>
    </template>
  </div>
  <!-- 产品信息 -->
  <div class="routegrey" v-if="lineDetail?.playDays">
    <h4>{{ version?.title }}行程 {{ version?.describle ? `-${version.describle}` : '' }}</h4>
    <div class="eui-row">
      <div class="filter-item">行程天数：</div>
      <div class="filter-control">{{ lineDetail?.playDays }}天{{ lineDetail?.playNights }}晚</div>
    </div>
    <div class="eui-row">
      <div class="filter-item">景&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</div>
      <div class="filter-control">{{ lineDetail?.sceneryDesc }}</div>
    </div>
    <div class="eui-row">
      <div class="filter-item">餐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;食：</div>
      <div class="filter-control">{{ lineDetail?.mealDesc }}</div>
    </div>
    <div class="eui-row">
      <div class="filter-item">住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宿：</div>
      <div class="filter-control">{{ lineDetail?.hotelDesc }}</div>
    </div>
    <div class="eui-row">
      <div class="filter-item">自由活动：</div>
      <div class="filter-control">{{ lineDetail?.activityDesc }}</div>
    </div>
  </div>
  <!-- 参考航班 -->
  <div class="trafficbox flightbox-wrap" v-if="lineDetail?.trafficVersionList?.length">
    <div class="re-body">
      <div class="flightbox">
        <ul class="flightbox-tab">
          <li
            v-for="(item, index) of lineDetail.trafficVersionList"
            :key="index"
            :class="{ cur: index === currentTraffic }"
            @click="currentTraffic = index"
          >
            {{ item.versionName }}
          </li>
        </ul>
        <template v-for="(item, index) of lineDetail.trafficVersionList" :key="index">
          <div class="flightbox-content" v-if="index === currentTraffic">
            <div class="tab-pane">
              <table class="traffic-table">
                <tbody>
                  <tr
                    class="border"
                    v-for="(innerItem, index) of item.referenceFlightList[0]?.trafficList"
                    :key="index"
                  >
                    <td class="td-0">
                      <div class="has-connection">第{{ innerItem.tripNo }}程</div>
                    </td>
                    <td tip="" class="td-1">
                      <span>{{ innerItem.deptCity }} → {{ innerItem.destCity }}</span>
                    </td>
                    <td class="td-2">
                      <span>{{ innerItem.trafficNumber }}</span>
                    </td>
                    <td class="td-3">
                      <span class="text-bold">{{ innerItem.deptTime }}</span>
                      <span class="text-gary-9">{{ innerItem.deptStation }}</span>
                    </td>
                    <td class="td-4">
                      <span>{{ formatTrafficTime(innerItem.runTime) }}</span> <span></span>
                    </td>
                    <td class="td-5">
                      <span class="text-bold">{{ innerItem.destTime }}</span>
                      <span class="text-gary-9">{{ innerItem.destStation }}</span>
                    </td>
                  </tr>
                  <p v-if="!item.referenceFlightList?.length" class="flight-info">
                    <i>*</i>{{ item.trafficRemark }}
                  </p>
                </tbody>
              </table>
              <p class="flight-info"><i>*</i>以上交通信息仅供参考，最终确认以出游通知书为准。</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <!-- 特色路线 -->
  <div class="special part">
    <div class="title" ref="featuresboxEl">线路特色</div>
    <div class="featuresbox" v-html="detail.feature"></div>
  </div>
  <!-- 详细行程 -->
  <div class="nav nav-download" ref="navDownloadEl">
    <div class="nav-left">
      <div
        @click="changeDetailNav(detailNavType.detail)"
        :class="{ item: true, active: detailNav === detailNavType.detail }"
      >
        详细行程
      </div>
      <div
        @click="changeDetailNav(detailNavType.abstract)"
        :class="{ item: true, active: detailNav === detailNavType.abstract }"
      >
        行程概要
      </div>
    </div>
    <div class="item download" v-if="version?.title">
      <el-icon><Download /></el-icon>
      <span @click="showDownloadBtn">下载行程</span>
      <div class="type" v-show="isShowDownloadBtn">
        <div
          class="type-item"
          @click="
            safeWindowOpen(
              `/print/line?lineid=${detail.lineId}&version=${version?.title}&issimple=0&product=gny`,
            )
          "
        >
          行程详情
        </div>
        <div
          class="type-item"
          @click="
            safeWindowOpen(
              `/print/line?lineid=${detail.lineId}&version=${version?.title}&issimple=1&product=gny`,
            )
          "
        >
          行程概要
        </div>
      </div>
    </div>
  </div>
  <div ref="leftEl">
    <div class="content-detail" v-show="detailNav === detailNavType.detail">
      <div class="left">
        <div class="day" v-for="(item, dayIndex) of travelList" :key="item.day">
          <div :class="`day-title day-title-${dayIndex}`">
            第{{ item.day }}天&nbsp;&nbsp;&nbsp;
            <template v-for="(title, index) of item.title" :key="index">
              <i :class="`djicon ${filterTraffic(title.type)}`" v-if="title.type"></i>
              {{ title.title }}
            </template>
          </div>
          <div class="item plant" v-if="item.tripDesc">
            <div class="label"></div>
            <div class="info">
              <div :class="`title`">
                <span class="icon" style="background: #ccc"></span>
              </div>
              <div class="desc">
                <div>
                  <div class="fr-text">
                    {{ item.tripDesc }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item plant" v-for="(travelRoute, index) of item.journeySections" :key="index">
            <div class="label" :style="{ color: colorText(travelRoute.type) }">
              <div class="name">{{ typeText(travelRoute.type) }}</div>
              <div class="name" v-if="travelRoute.trafficType">
                {{ trafficTypeText(travelRoute.trafficType) }}
              </div>
              <div class="time" v-if="travelRoute.time">约{{ travelRoute.time }}</div>
              <div class="time" v-if="travelRoute.duration">{{ travelRoute.duration }}</div>
            </div>
            <div class="info">
              <div :class="`title day${dayIndex}${index}`">
                <span class="icon" :style="{ background: colorText(travelRoute.type) }"></span>
                <div class="name">{{ travelRoute.title }}</div>
              </div>
              <div class="desc" v-if="travelRoute.type === ActivityType.shop">
                <div class="tag">
                  {{ travelRoute.product }}
                </div>
              </div>
              <div class="desc" v-else>
                {{ travelRoute.describle }}
                <div class="img-box" v-if="travelRoute.journeyImage.length">
                  <el-image
                    v-for="(image, index) of travelRoute.journeyImage"
                    :key="index"
                    :src="image"
                    fit="cover"
                    style="
                      width: 3rem;
                      height: 1.65rem;
                      border-radius: 0.05rem;
                      margin-right: 0.1rem;
                      margin-bottom: 0.1rem;
                    "
                  />
                </div>
                <div class="friendly-reminder" v-if="travelRoute.reminder">
                  <div class="fr-tips">温馨提示</div>
                  <div class="fr-text">
                    {{ travelRoute.reminder }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item hotel" v-if="item.hotelType === 2">
            <div class="label">酒店</div>
            <div class="info">
              <div class="title">
                <span class="icon"></span>
                <div class="name">参考酒店</div>
              </div>
              <div class="desc">
                <div class="imgs">
                  <img
                    v-for="(hotel, index) of item.hotel.journeyImageList"
                    :key="index"
                    :src="hotel"
                    class="img"
                  />
                </div>
                <div class="intro" v-if="item.hotel.intro" v-html="item.hotel.intro"></div>
                <div class="tags">
                  <div class="tag" v-for="(hotel, index) of item.referHotels" :key="index">
                    {{ hotel.hotelName }}
                  </div>
                </div>
                <div class="friendly-reminder" v-if="item.hotel.reminder">
                  <div class="fr-tips">温馨提示</div>
                  <div class="fr-text">
                    {{ item.hotel.reminder }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item hotel" v-if="item.hotelType === 1">
            <div class="label">酒店</div>
            <div class="info">
              <div class="title">
                <span class="icon"></span>
                <div class="name">{{ item.hotel.name }}</div>
              </div>
              <div class="desc">
                <div class="imgs">
                  <img
                    v-for="(hotel, index) of item.hotel.journeyImageList"
                    :key="index"
                    :src="hotel"
                    class="img"
                  />
                </div>
                <div class="intro" v-if="item.hotel.intro" v-html="item.hotel.intro"></div>
                <div class="tags">
                  <div class="tag" v-for="(hotel, index) of item.referHotels" :key="index">
                    {{ hotel.hotelName }}
                  </div>
                </div>
                <div class="friendly-reminder" v-if="item.hotel.reminder">
                  <div class="fr-tips">温馨提示</div>
                  <div class="fr-text">
                    {{ item.hotel.reminder }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item hotel" v-if="item.hotelType === 0">
            <div class="label">酒店</div>
            <div class="info">
              <div class="title">
                <span class="icon"></span>
                <div class="name">参考酒店</div>
              </div>
              <div class="desc">无住宿或住宿在交通上解决</div>
            </div>
          </div>
          <div class="item meals">
            <div class="label">餐食</div>
            <div class="info">
              <div class="title">
                <span class="icon"></span>
                <div class="des">
                  <div v-if="!item.meals || item.meals.pitchNone">三餐均需自理</div>
                  <template v-else>
                    <div v-for="(meal, index) of item.meals?.mealDetails" :key="index">
                      {{ ['早餐', '中餐', '晚餐'][index] }}: {{ meal.remark || '自理' }}
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-box" ref="rightBoxEl">
        <div
          class="right"
          v-show="isRightBoxShow"
          :class="{ fixed: isRightBoxFixed }"
          ref="rightFixedEl"
        >
          <template v-for="(item, dayIndex) of travelList" :key="item.theDay">
            <div class="day-nav">
              <div class="title">
                <el-icon @click="toggleRouteShow(item)" v-if="item.routeShow"
                  ><ArrowDown
                /></el-icon>
                <el-icon @click="toggleRouteShow(item)" v-else><ArrowUp /></el-icon>
                <span class="name" @click="goRouteTitle(`day-title-${dayIndex}`)"
                  >第{{ item.day }}天</span
                >
              </div>
              <ul class="list" v-show="item.routeShow">
                <template v-if="item.journeySections?.length">
                  <li
                    class="item"
                    v-for="(travelRoute, index) of item.journeySections"
                    :key="index"
                  >
                    <span class="dot"></span>
                    <span class="theme" @click="goRouteTitle(`day${dayIndex}${index}`)">{{
                      travelRoute.title
                    }}</span>
                  </li>
                </template>
              </ul>
            </div>
          </template>

          <template v-if="shopping.list?.length">
            <div class="day-nav">
              <div class="title">
                <el-icon @click="toggleRouteShow(shopping)" v-if="shopping.routeShow"
                  ><ArrowDown
                /></el-icon>
                <el-icon @click="toggleRouteShow(shopping)" v-else><ArrowUp /></el-icon>
                <span class="name" @click="goRouteTitle(`shopping-title`)">购物店汇总</span>
              </div>
              <ul class="list" v-show="shopping.routeShow">
                <template v-if="shopping.list.length">
                  <li class="item" v-for="(travelRoute, index) of shopping.list" :key="index">
                    <span class="dot"></span>
                    <span class="theme" @click="goRouteTitle(`shopping${index}`)">{{
                      travelRoute.shopName
                    }}</span>
                  </li>
                </template>
              </ul>
            </div>
          </template>

          <template v-if="selfPaidItem.list?.length">
            <div class="day-nav">
              <div class="title">
                <el-icon @click="toggleRouteShow(selfPaidItem)" v-if="selfPaidItem.routeShow"
                  ><ArrowDown
                /></el-icon>
                <el-icon @click="toggleRouteShow(selfPaidItem)" v-else><ArrowUp /></el-icon>
                <span class="name" @click="goRouteTitle(`self-title`)">推荐自费项目</span>
              </div>
              <ul class="list" v-show="selfPaidItem.routeShow">
                <template v-if="selfPaidItem.list.length">
                  <li class="item" v-for="(travelRoute, index) of selfPaidItem.list" :key="index">
                    <span class="dot"></span>
                    <span class="theme" @click="goRouteTitle(`selfPaidItem${index}`)">{{
                      travelRoute.paidItemName
                    }}</span>
                  </li>
                </template>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="route-content" v-show="detailNav === detailNavType.abstract">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <td>行程</td>
            <td>景点/活动</td>
            <td>餐食</td>
            <td>酒店</td>
          </tr>
        </thead>
        <tbody>
          <template v-for="(travel, index) of journeyList" :key="index">
            <tr>
              <td class="first">
                <div class="day-name">第{{ travel.day }}天</div>
                <div class="day-title">
                  <span v-for="(title, index1) in travel.title" class="title-place" :key="index1"
                    ><i class="djicon" :class="filterTraffic(title.type)"></i
                    >{{ title.title }}</span
                  >
                </div>
              </td>
              <td class="site">
                <ul>
                  <template v-for="(section, index) in travel.journeySections" :key="index">
                    <li
                      class="title"
                      v-if="
                        section.title &&
                        (section.type == 0 || section.type == 2 || section.type == 4)
                      "
                    >
                      <em class="dot"></em>{{ section.title }}
                    </li>
                  </template>
                </ul>
              </td>
              <td class="meal">
                <ul
                  v-if="
                    travel.meals.mealDetails &&
                    travel.meals.mealDetails.length &&
                    !travel.meals.pitchNone
                  "
                >
                  <template v-for="(meal, index) in travel.meals.mealDetails" :key="index">
                    <li>
                      <em class="dot"></em>{{ ['早餐', '中餐', '晚餐'][meal.mealType - 1] }}：{{
                        meal.remark ? meal.remark : meal.hasContains ? '' : '自理'
                      }}
                    </li>
                  </template>
                </ul>
                <div class="no-contains" v-else><em class="dot"></em>三餐均需自理</div>
              </td>
              <td class="hotel">
                <div class="no-hotel" v-if="travel.hotelType == 1 && travel.hotel.name">
                  <em class="dot"></em>{{ travel.hotel.name }}
                </div>
                <ul v-if="travel.hotelType == 2">
                  <template v-for="(hotel, index) in travel.referHotels" :key="index">
                    <li v-if="hotel.hotelName"><em class="dot"></em>{{ hotel.hotelName }}</li>
                  </template>
                </ul>
                <div class="no-hotel" v-if="travel.hotelType == 0">
                  <em class="dot"></em>无住宿或住宿在交通上解决
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="remind">以上行程可能会因天气、路况等原因做相应调整，敬请谅解！</div>
    </div>
    <ul class="shopping list-wrap" v-if="lineDetail?.shopping?.length">
      <h5 class="shopping-title">购物店汇总</h5>
      <ul class="shoplist hasremark">
        <li
          :class="`shopitem shopping${index}`"
          v-for="(item, index) of lineDetail.shopping"
          :key="index"
        >
          <h5 class="name">{{ item.shopName }}<em class="des-icon"></em></h5>
          <div titlename="产品：" class="product item">{{ item.businessProduct }}</div>
          <div titlename="停留：" class="duration item">{{ item.stayTime }}</div>
        </li>
        <li class="shopremark">
          <p>
            全程配合进店，不强迫消费，自行根据需求购买，境外退货（除特殊商品和购物店不支持退货外），可能产生手续费，建议谨慎购买。
          </p>
        </li>
      </ul>
    </ul>
    <ul class="self-paid list-wrap" v-if="lineDetail?.selfPaidItem?.length">
      <h5 class="self-title">推荐自费项目</h5>
      <ul class="shoplist hasremark">
        <li
          :class="`shopitem selfPaidItem${index}`"
          v-for="(item, index) of lineDetail.selfPaidItem"
          :key="index"
        >
          <h5 class="name">{{ item.paidItemName }}<em class="des-icon"></em></h5>
          <div titlename="详情：" class="product item">{{ item.intro }}</div>
          <div titlename="地点：" class="duration item">{{ item.cityName }}</div>
          <div titlename="价格：" class="duration item">{{ item.cost }}</div>
        </li>
      </ul>
    </ul>
  </div>
  <div class="fee part" ref="feeEl">
    <div class="title">费用说明</div>
    <div class="info" v-html="feestr"></div>
  </div>
  <div class="book part" ref="bookEl">
    <div class="title">预订须知</div>
    <div class="info" v-html="detail.notice"></div>
  </div>
  <div class="book part" id="book" ref="warmEl">
    <div class="title">温馨提示</div>
    <div class="info" v-html="detail.securityNoticy"></div>
    <div class="info" v-html="detail.warmTip"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import request from '@/utils/request';
import { safeWindowOpen } from '@/utils/util';
import { type detailType, type versionType } from '@/types/domesticDetail/domesticDetail';
import { productCategory } from '@/enum/common';
import { debounce } from 'lodash';
import { ActivityType, TrafficType } from '@/enum/domestic';

enum detailNavType {
  detail,
  abstract,
}
enum detailNavItemType {
  specialRoute,
  detailTrip,
  feeTip,
  orderTip,
  warmTip,
}

const props = defineProps<{
  detail: detailType;
  lineId: string;
  version: versionType | undefined;
  versions: versionType[];
}>();
const emits = defineEmits<{
  (event: 'change', version: versionType): void;
  (e: 'fix', fixed: boolean): void;
  (e: 'changePlayDays', playDays: number): void;
}>();

const journeyList = ref<DetailByVersionRes.JourneyList$8Type[]>([]);
const travelList = ref<DetailByVersionRes.JourneyList$8Type[]>([]);
const detailNav = ref<detailNavType>(detailNavType.detail);
const detailNavItem = ref<detailNavItemType>(detailNavItemType.specialRoute);
const isShowDownloadBtn = ref(false);
const navBox = ref<HTMLDivElement>();
const isFixed = ref(false);
const featuresboxEl = ref<HTMLDivElement>();
const navDownloadEl = ref<HTMLDivElement>();
const feeEl = ref<HTMLDivElement>();
const bookEl = ref<HTMLDivElement>();
const warmEl = ref<HTMLDivElement>();
const isRightBoxFixed = ref(false);
const isRightBoxShow = ref(true);
const rightBoxEl = ref<HTMLDivElement>();
const leftEl = ref<HTMLDivElement>();
const rightFixedEl = ref<HTMLDivElement>();
const lineDetail = ref<DetailByVersionRes.Data$10Type>();
const currentTraffic = ref(0);
const shopping = ref<DetailByVersionRes.ShoppingList>({
  routeShow: false,
  list: [],
});
const selfPaidItem = ref<DetailByVersionRes.SelfPaidItemList>({
  routeShow: false,
  list: [],
});

const feestr = computed(() => {
  let feestr = '<h3>费用包含</h3>';
  const data = props.detail;
  feestr += data.feeDes;
  feestr += '<h3>费用不包含</h3>';
  feestr += data.feeItem;
  if (data.childrenPriceNotice) {
    feestr += '<h3>儿童价格说明</h3>';
    feestr += data.childrenPriceNotice;
  }
  return feestr;
});
const activeVersion = computed(() => {
  const { version } = props;
  return version?.title;
});

const filterTraffic = (e: number) => {
  return ['', 'djicon-aircraft-s', 'djicon-xj-train', 'djicon-ship-s', 'djicon-bus-s'][e];
};

const typeText = (type: ActivityType) => {
  return ['景点', '交通', '购物店', '自由活动', '特色餐', '自费项目', '其他', '返程', '行程'][type];
};

const trafficTypeText = (type: TrafficType) => {
  return ['', '火车', '飞机', '汽车', '轮船'][type];
};

const colorText = (type: ActivityType) => {
  return [
    'rgb(255, 102, 1)',
    'rgb(204, 204, 204)',
    'rgb(255, 176, 0)',
    'rgb(204, 204, 204)',
    'rgb(204, 204, 204)',
    'rgb(204, 204, 204)',
    'rgb(204, 204, 204)',
    'rgb(204, 204, 204)',
  ][type];
};

const formatTrafficTime = (time: number) => {
  return `${parseInt((time / 60).toString())}小时${time % 60}分钟`;
};

const getVersion = async () => {
  const res: DetailByVersionRes.Result$0Type = await request({
    url: '/webapi/resourceCommon/detailByVersion',
    method: 'post',
    data: {
      code: productCategory.domestic,
      lineId: props.lineId,
      version: props.version?.title,
    },
  });
  const data = res?.data;
  if (data) {
    journeyList.value = data.journeyList;
    travelList.value = data.journeyList.map((item) => ({
      ...item,
      routeShow: false,
    }));
    // todo...
    // travelList.value[0].routeShow = true;
    lineDetail.value = data;
    emits('changePlayDays', data.playDays);
    selfPaidItem.value.list = lineDetail.value.selfPaidItem;
    shopping.value.list = lineDetail.value.shopping;
  }
};

const changeDetailNav = (type: detailNavType) => {
  detailNav.value = type;
};

const changeDetailNavItem = (type: detailNavItemType) => {
  const els = [featuresboxEl.value, navDownloadEl.value, feeEl.value, bookEl.value, warmEl.value];
  document.documentElement.scrollTop = (els[type] as HTMLDivElement).offsetTop - 50;
  detailNavItem.value = type;
};

const changeVersion = (e: versionType) => {
  emits('change', e);
};

const showDownloadBtn = () => {
  isShowDownloadBtn.value = !isShowDownloadBtn.value;
};

const toggleRouteShow = (item: { routeShow: boolean }) => {
  // todo...
  // travelList.value.forEach((item) => (item.routeShow = false));
  // shopping.value.routeShow = false;
  // selfPaidItem.value.routeShow = false;
  item.routeShow = !item.routeShow;
};

const goRouteTitle = (selector: string) => {
  if (document.querySelector('.' + selector)) {
    document.documentElement.scrollTop =
      (document.querySelector('.' + selector) as HTMLDivElement).offsetTop - 50;
  }
};

const navBoxHandler = () => {
  const navBoxTop = navBox.value?.offsetTop || 0;
  const docScrollTop = document.documentElement.scrollTop;
  if (navBoxTop < docScrollTop) {
    isFixed.value = true;
    emits('fix', true);
  } else {
    isFixed.value = false;
    emits('fix', false);
  }
};

const rightBoxHandler = () => {
  const rightBoxElTop = rightBoxEl.value?.offsetTop || 0;
  const docScrollTop = document.documentElement?.scrollTop || 0;
  const leftElBottom = leftEl.value?.getBoundingClientRect().bottom || 0;

  if (rightBoxElTop < docScrollTop) {
    isRightBoxFixed.value = true;
  } else {
    isRightBoxFixed.value = false;
  }
  if (leftElBottom < 150) {
    isRightBoxShow.value = false;
  } else {
    isRightBoxShow.value = true;
  }
};

const navChange = () => {
  const navDownloadElTop = navDownloadEl.value?.getBoundingClientRect().top || 0;
  const feeElTop = feeEl.value?.getBoundingClientRect().top || 0;
  const bookElTop = bookEl.value?.getBoundingClientRect().top || 0;
  const warmElTop = warmEl.value?.getBoundingClientRect().top || 0;
  if (warmElTop < 70) {
    detailNavItem.value = detailNavItemType.warmTip;
  } else if (bookElTop < 70) {
    detailNavItem.value = detailNavItemType.orderTip;
  } else if (feeElTop < 70) {
    detailNavItem.value = detailNavItemType.feeTip;
  } else if (navDownloadElTop < 70) {
    detailNavItem.value = detailNavItemType.detailTrip;
  } else {
    detailNavItem.value = detailNavItemType.specialRoute;
  }
};

const documentScroll = debounce(() => {
  navBoxHandler();
  rightBoxHandler();
  navChange();
}, 10);

onMounted(() => {
  document.addEventListener('scroll', documentScroll, false);
});

onBeforeUnmount(() => {
  document.removeEventListener('scroll', documentScroll, false);
});

watch(
  () => props.version,
  () => {
    getVersion();
  },
);
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
