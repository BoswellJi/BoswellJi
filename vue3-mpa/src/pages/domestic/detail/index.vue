<template>
  <div class="wrapper">
    <div class="content">
      <div class="breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{
              path: '/Product/IndexNew',
              query: {
                currentProjectId: 2,
                keywrod: searchTitle,
              },
            }"
            >国内游</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ detail.productTitle }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <div class="qrcode">
          <el-popover :show-arrow="false" :teleported="false">
            <template #reference>
              <div class="qrcode-label">
                <span>产品二维码</span>
                <el-icon><CaretBottom /></el-icon>
              </div>
            </template>
            <img class="miniapp-code" src="//pic5.40017.cn/i/ori/1bYYb7289tm.png" alt="" />
            <div class="qrcode-tips">扫码后分享获客</div>
          </el-popover>
        </div> -->
      </div>
      <div class="product-info">
        <div class="left">
          <div class="title line2">
            {{ detail.productTitle }}
          </div>
          <div class="sub-title">
            {{ detail.subTitle }}
          </div>
          <!-- <div class="start-pos">
            <el-select v-model="version" value-key="title">
              <el-option
                v-for="(item, index) of detail.versions"
                :key="index"
                :label="item.title"
                :value="item"
              ></el-option>
            </el-select>
            <div class="tips">由于动态产品价格实时变动，确定后请尽快下单。</div>
            
          </div> -->
          <div class="img-box">
            <div class="right" v-if="detail.images?.length">
              <el-image
                :src="item"
                v-for="(item, index) of detail.images!.slice(0, 3)"
                :key="index"
                fit="cover"
                @click="showImageViewer(index)"
              />
              <div class="mask" v-if="detail.images!.length>3" @click="showImageViewer(2)">
                +{{ detail.images!.length - 3 }}
              </div>
            </div>
          </div>
          <div class="infos">
            <div class="field">供应商编号：{{ detail.lineId }}</div>
            <div class="field">旅仓编号：{{ detail.productCode }}</div>
            <div class="field">出发城市：{{ detail.departureCityName }}</div>
            <div class="field">游玩天数：{{ detail.playDays }}天</div>
            <div class="field">抵达城市：{{ detail.arrivalCityName }}</div>
            <div class="field">产品经理：{{ detail.mangerName }}</div>
          </div>
        </div>
        <div class="calendars">
          <div class="lc-calendar">
            <lc-calendar
              v-if="detail.lineId"
              @change="changeCalendar"
              @change-price="changePrice"
              @init-price="initPrice"
            ></lc-calendar>
          </div>
          <div class="book">
            <div class="date">
              <div class="start">
                <div>出团日期：</div>
                <div>{{ startDate }}</div>
              </div>
              <div class="end">
                <div>返程日期：</div>
                <div>{{ endDate }}</div>
              </div>
            </div>
            <div class="line journey">
              <div class="th">行程：</div>
              <div class="th">
                成人：<span class="price" v-if="priceList"
                  >￥{{ priceList[0][priceTypeKey] }}/人</span
                >
              </div>
              <div class="th">
                儿童：<span class="price" v-if="priceList"
                  >￥{{ priceList[2][priceTypeKey] }}/人</span
                >
              </div>
              <div class="th">
                单房差：<span class="price" v-if="priceList"
                  >￥{{ priceList[1][priceTypeKey] }}/人</span
                >
              </div>
            </div>
            <div class="line select">
              <div class="th">
                <el-select v-model="version" value-key="title" @change="changeVersion">
                  <el-option
                    v-for="(item, index) of versions"
                    :key="index"
                    :label="item.title"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
              <div class="th">
                <el-input-number v-model="adultNum" :min="0" :precision="0" @change="getPrice" />
              </div>
              <div class="th">
                <el-input-number v-model="childNum" :min="0" :precision="0" @change="getPrice" />
              </div>
              <div class="th">
                <el-input-number v-model="singleRoomNum" :min="0" :precision="0" />
              </div>
            </div>
            <div class="total">
              <div class="total-box">
                <div class="price-box">
                  <span>总价:</span>
                  <span class="symobl">&yen;</span>
                  <span class="price">{{ totalPrice }}</span>
                </div>
                <div class="discount" v-if="prefInfoList[0]?.PrefAmount">
                  (<span>优惠:</span>
                  <span class="symobl">&yen;</span>
                  <span class="price">{{ prefInfoList[0]?.PrefAmount }}</span
                  >)
                </div>
              </div>
              <button class="btn" @click="submit">立即预订</button>
            </div>
          </div>
        </div>
      </div>

      <lc-single-product ref="lcSingleProductEl" :options="singleProductOptions" />

      <div class="line-detail-box">
        <line-detail
          :detail="detail"
          :line-id="lineId"
          :version="version"
          :versions="versions"
          @change="changeLineDetail"
          @changePlayDays="changePlayDays"
          @fix="navBoxFix"
        />
      </div>
    </div>
  </div>

  <div class="settle-accounts" v-show="settleAccountsShow">
    <div class="left">
      <div class="head">
        <div class="th">行程</div>
        <div class="th">出发</div>
        <div class="th">
          成人:<span class="price" v-if="priceList">￥{{ priceList[0][priceTypeKey] }}/人</span>
        </div>
        <div class="th">
          儿童:<span class="price" v-if="priceList">￥{{ priceList[2][priceTypeKey] }}/人</span>
        </div>
        <div class="th">
          单房差:<span class="price" v-if="priceList">￥{{ priceList[1][priceTypeKey] }}/人</span>
        </div>
      </div>
      <div class="body">
        <div class="td">
          <el-select v-model="version" value-key="title" @change="changeVersion">
            <el-option
              v-for="(item, index) of versions"
              :key="index"
              :label="item.title"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="td">
          <el-date-picker
            v-model="startDate"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="选择日期"
            :disabled-date="disabledDate"
            @change="getPrice"
          />
        </div>
        <div class="td">
          <el-input-number v-model="adultNum" :min="0" :precision="0" @change="getPrice" />
        </div>
        <div class="td">
          <el-input-number v-model="childNum" :min="0" :precision="0" @change="getPrice" />
        </div>
        <div class="td">
          <el-input-number v-model="singleRoomNum" :min="0" :precision="0" />
        </div>
      </div>
    </div>
    <div class="right">
      <div>
        <div>
          <span>总价：</span>
          <span class="symbol">&yen;</span>
          <span class="amount">{{ totalPrice }}</span>
        </div>
        <div class="discount" v-if="prefInfoList[0]?.PrefAmount">
          (<span>优惠：</span>
          <span class="symbol">&yen;</span>
          <span class="amount"
            ><span class="price">{{ prefInfoList[0]?.PrefAmount }}</span></span
          >)
        </div>
      </div>
      <button class="btn" @click="submit">立即预定</button>
    </div>
  </div>

  <div class="el-image-viewer" v-if="imageViewerShow">
    <el-image-viewer
      :url-list="detail.images"
      :initial-index="imageViewerIndex"
      @close="imageViewerClose"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { stringify } from 'qs';

import { ArrowRight } from '@element-plus/icons-vue';
import lineDetail from './components/lineDetail/index.vue';

import {
  type Data$2Type,
  type PriceList$1Type,
} from '@/types/domesticDetail/getDomesticPriceByVersion';
import { type detailType, type versionType } from '@/types/domesticDetail/domesticDetail';

import request from '@/utils/request';
import { productCategory } from '@/enum/common';
import { convertKeyUpperFirst, safeWindowOpen } from '@/utils/util';

import moment from 'moment';
import { mul, add, sun } from '@/utils/math';
import { debounce } from 'lodash';
import { ElMessage } from 'element-plus';
import { PriceType } from '@/enum/domestic';

const route = useRoute();
const lineId = route.query.LineId as string;
const detail = ref<detailType>({});
const version = ref<versionType>();
const startDate = ref('');
const adultNum = ref(2);
const childNum = ref(0);
const singleRoomNum = ref(0);
const priceList = ref<PriceList$1Type[]>();
const priceType = ref<PriceType>(1);
const lcSingleProductEl = ref<any>();
const singleProductOptions = ref<Domestic.SingleProduct>({
  productType: undefined,
  lineId: undefined,
  version: undefined,
  adultNum: undefined,
  singleRoomNum: undefined,
  childNum: undefined,
  useDate: undefined,
  endDate: undefined,
});
const versions = ref<versionType[]>([]);
const settleAccountsShow = ref(false);
const imageViewerShow = ref(false);
const priceListAble: { [key: string]: any } = {};
const imageViewerIndex = ref(2);

let selectedList: DomesticSingleProductRes.Data$3Type[] = [];
let prefInfoList: Domestic.PrefObjType[] = [];
let hotelList: any[] = [];

const endDate = computed(() => {
  return startDate.value
    ? moment(startDate.value)
        .add((detail.value.playDays as number) - 1, 'days')
        .format('YYYY-MM-DD')
    : '';
});
const priceTypeKey = computed(() => {
  return priceType.value === 1 ? 'marketPrice' : 'distributePrice';
});
const totalPrice = computed(() => {
  const list = priceList.value;
  const key = priceTypeKey.value;
  const discounts = prefInfoList[0]?.PrefAmount || 0;
  if (!list) return 0;
  const adultPrice = mul(adultNum.value, list[0][key] || 0);
  const childPrice = mul(childNum.value, list[2][key] || 0);
  const singleRoomPrice = mul(singleRoomNum.value, list[1][key] || 0);
  const totalNum = sun(add(add(adultPrice, childPrice), singleRoomPrice), discounts);
  return totalNum;
});
const totalNum = computed(() => {
  return adultNum.value + childNum.value + singleRoomNum.value;
});
const searchTitle = computed(() => window.escape(detail.value.productTitle || ''));

const disabledDate = (e: Date) => {
  const dateStr = moment(e).format('YYYY-MM-DD');
  return !version.value?.title ? true : !priceListAble[dateStr];
};

const refreshSingleProduct = () => {
  singleProductOptions.value!.adultNum = adultNum.value;
  singleProductOptions.value!.childNum = childNum.value;
  singleProductOptions.value!.lineId = lineId;
  singleProductOptions.value!.productType = 20;
  singleProductOptions.value!.singleRoomNum = singleRoomNum.value;
  singleProductOptions.value!.version = version.value?.title || '';
  singleProductOptions.value!.useDate = startDate.value;
  singleProductOptions.value!.endDate = endDate.value;
  lcSingleProductEl.value?.getSingleProduct();
};

const getDetail = async () => {
  const { data } = await request({
    url: '/webapi/resourceCommon/detail',
    method: 'post',
    data: {
      code: productCategory.domestic,
      lineId,
    },
  });
  detail.value = data;
};

const getPrice = async () => {
  const { data } = await request<Data$2Type>({
    url: '/webapi/domestic/getDomesticPriceByVersion',
    method: 'post',
    data: {
      lineId,
      departureCityId: detail.value.departureCityId,
      startDate: startDate.value,
      departureCityName: detail.value.departureCityName,
      adultNum: adultNum.value,
      childNum: childNum.value,
      version: version.value?.title,
      days: detail.value.playDays,
    },
  });
  // 价格信息
  priceList.value = data.priceList;
  // 优惠信息
  if (Number(data.prefRuleId) > 0) {
    prefInfoList = [
      {
        PrefRuleId: data.prefRuleId,
        PrefAmount: data.prefAmount,
        PrefDes: data.prefDes,
        PrefRemark: data.prefRemark,
        PrefSupplierDes: data.prefSupplierDes,
      },
    ];
  }
  hotelList = data.hotelList || [];
  // 单品资源信息
  refreshSingleProduct();
};

const goBookPage = () => {
  const { supplierId, playDays } = detail.value;
  const queryStr = stringify({
    pid: lineId,
    lid: lineId,
    pricelist: `1:${adultNum.value}|5:${singleRoomNum.value}|8:${childNum.value}`,
    day: startDate.value,
    supplierid: supplierId,
    version: version.value?.title,
    playDays,
  });
  safeWindowOpen(`/domestic/booking?${queryStr}`);
};

const setSession = () => {
  const obj: Domestic.NewpriceType = {
    PriceList:
      priceList.value?.map((price) => ({
        DistributeId: price.priceKey,
        DistributePrice: price.distributePrice,
        IsReckonPersons: price.hasReckonPersons,
        MarketPrice: price.marketPrice,
        PriceId: price.priceId,
        PriceName: price.priceName,
        TouristType: price.touristType,
      })) || [],
    HotelList: convertKeyUpperFirst(hotelList) as any[],
    PrefInfoList: prefInfoList,
    singleProduct: selectedList,
  };

  sessionStorage.setItem('gnybookingParam', JSON.stringify(obj));
};

const singleProductCon = () => {
  // 选中的用车单品是否有出发、目的地点
  selectedList = lcSingleProductEl.value.list.filter(function (
    item: DomesticSingleProductRes.Data$3Type,
  ) {
    return item.lcTotalPrice || item.isGift;
  });
  const carList = selectedList.filter(function (item: DomesticSingleProductRes.Data$3Type) {
    return item.resourceType === 1 || item.resourceType === 11;
  });
  if (
    carList.length > 0 &&
    carList.some(function (item: DomesticSingleProductRes.Data$3Type) {
      return (
        item.carInfo.stationList.filter(function (
          station: DomesticSingleProductRes.StationList$1Type,
        ) {
          return !station.depAddress || !station.arrAddress;
        }).length > 0
      );
    })
  ) {
    return;
  }
  return true;
};

const validCon = () => {
  const { limitMaxValue, limitMinValue } = detail.value;
  const totalNumVal = totalNum.value;

  if (totalNumVal <= 0) {
    ElMessage.warning('请先选择出游人！');
    return;
  }
  if (limitMinValue && limitMinValue > 0 && totalNumVal < limitMinValue) {
    ElMessage.warning(`由于服务能力限制，单订单人数少于${limitMinValue}成人时无法成团，敬请谅解！`);
    return;
  }
  if (limitMaxValue && limitMaxValue > 0 && totalNumVal > limitMaxValue) {
    ElMessage.warning(`由于服务能力限制，单订单人数少于${limitMaxValue}成人时无法成团，敬请谅解！`);
    return;
  }
  if (totalPrice.value <= 0) {
    ElMessage.warning('价格不能为0');
    return;
  }
  if (!singleProductCon()) {
    ElMessage.warning('请先选择用车的出发地和目的地');
    return;
  }
  return true;
};

const submit = debounce(async () => {
  if (!validCon()) return;
  setSession();
  goBookPage();
}, 300);

const changeLineDetail = (e: versionType) => {
  version.value = e;
  getPrice();
};

const selectVersion = (date: string, priceList: any[]) => {
  const price = priceList.filter((item) => item.StartDate === date)[0].TripInfoList;
  versions.value = price
    // .filter((item: any) => item.StockNum > 0)
    .map((item: any) => ({
      title: item.TripVersion,
      describle: item.TripVersionDescription,
    }));
  version.value = versions.value[0];
};

const changeCalendar = (date: string, priceList: any[]) => {
  startDate.value = date;
  selectVersion(date, priceList);
  getPrice();
};

const initPrice = (priceList: any[]) => {
  priceList.forEach((price) => {
    priceListAble[price.StartDate] = true;
  });
};

const changePrice = (e: PriceType) => {
  priceType.value = e;
};

const changeVersion = () => {
  getPrice();
};

const navBoxFix = (e: boolean) => {
  settleAccountsShow.value = e;
};

const changePlayDays = (e: number) => {
  detail.value.playDays = e;
};

const imageViewerClose = () => {
  imageViewerShow.value = false;
};

const showImageViewer = (num: number) => {
  imageViewerShow.value = true;
  imageViewerIndex.value = num;
};

onMounted(() => {
  getDetail();
});
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
