<template>
  <div class="single-product" v-if="list.length">
    <div class="title">搭配产品</div>
    <div class="product-list product-title">
      <div class="th type">类型</div>
      <div class="th name">产品名称</div>
      <div class="th date">使用日期</div>
      <div class="th num">数量</div>
      <div class="th total">小计</div>
      <div class="th detail"></div>
    </div>
    <div class="product-list product-body" v-for="(item, index) of list" :key="index">
      <div class="th type">
        <div>{{ getResourceType(item.resourceType) }}</div>
        <span class="tag" v-if="item.carInfo">
          {{ item.carInfo.carTypeName }}
        </span>
      </div>
      <div class="th name">
        <div class="main-title one-line" :title="item.mainTitle">{{ item.mainTitle }}</div>
        <div class="sub-title one-line" :title="item.subTitle">{{ item.subTitle }}</div>
      </div>
      <div class="th date">
        <div v-if="item.useType === 0">
          <div>{{ item.lcUseDate.date }}</div>
          <div class="date-tip">当天可用</div>
        </div>
        <div v-else-if="item.useType === 1">
          <div>{{ startDate }}~{{ endDate }}</div>
          <div class="date-tip">任意一天使用</div>
        </div>
        <div v-else-if="item.useType === 2">
          <el-select v-model="item.lcUseDate" value-key="date">
            <el-option
              v-for="(item, index) of item.priceList"
              :key="index"
              :label="item.date"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="th num">
        <template v-if="!item.isGift">
          <div class="num-box" v-if="item.saleType === 'STD'">
            <el-input-number
              v-model="item.lcCarNum"
              :min="0"
              :max="item.lcUseDate.stockType === 2 ? item.lcAbleNum : 10000"
              @change="
                (curr, next) => {
                  numChange(curr, next, item);
                }
              "
            />
            <span>{{ item.saleUnit }}</span>
          </div>
          <div class="num-box" v-else-if="item.saleType === 'CROWD'">
            <el-input-number
              v-model="item.lcChildNum"
              :min="0"
              :max="item.lcUseDate.stockType === 2 ? item.lcAbleNum - item.lcAdultNum : 10000"
            />
            <span>儿童</span>
            <el-input-number
              v-model="item.lcAdultNum"
              :min="0"
              :max="item.lcUseDate.stockType === 2 ? item.lcAbleNum - item.lcChildNum : 10000"
            />
            <span>成人</span>
          </div>
          <div class="tips">{{ item.lcTips }}</div>
        </template>
      </div>
      <div class="th total">
        <div class="price">￥{{ getTotalPrice(item) }}</div>
        <div class="tips" v-if="item.isGift">赠送</div>
      </div>
      <div class="th detail">
        <template v-if="item.resourceType === 1 || item.resourceType === 11">
          <div>
            <el-button link type="primary" @click="openCarDetailVisible(item)">详情</el-button>
          </div>
          <div>
            <el-button link type="primary" @click="openAirportPickupVisiblee(item)"
              >接送地点</el-button
            >
          </div>
        </template>
        <template v-else>
          <div>
            <el-button link type="primary" @click="openDetailVisible(item)">详情</el-button>
          </div>
        </template>
      </div>
    </div>

    <lc-single-product-detail
      v-if="detailVisible && currentDetail"
      :detail="currentDetail"
      @close="detailVisible = false"
    />
    <lc-car-product-detail
      v-if="carDetailVisible && currentDetail"
      :detail="currentDetail"
      @close="carDetailVisible = false"
    />
    <lc-airport-pickup
      v-if="airportPickupVisible && currentDetail"
      :detail="currentDetail"
      @close="airportPickupVisible = false"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
// @ts-nocheck

import { ElMessage } from 'element-plus';

import lcSingleProductDetail from './lcSingleProductDetail/index.vue';
import lcCarProductDetail from './lcCarProductDetail/index.vue';
import lcAirportPickup from './lcAirportPickup/index.vue';

export default {
  props: {
    options: {
      type: Object,
      default: () => ({
        productType: undefined,
        lineId: undefined,
        version: undefined,
        adultNum: undefined,
        singleRoomNum: undefined,
        childNum: undefined,
        useDate: undefined,
        endDate: undefined,
      }),
    },
  },
  components: {
    lcSingleProductDetail,
    lcCarProductDetail,
    lcAirportPickup,
  },
  data: function () {
    return {
      list: [],
      detailVisible: false,
      carDetailVisible: false,
      airportPickupVisible: false,
      currentDetail: null,

      startDate: '',
      endDate: '',
      adultNum: 0,
      singleRoomNum: 0,
      childNum: 0,
    };
  },
  methods: {
    getSingleProduct: function (type) {
      this.options;
      var that = this;
      if (type === 'DomesticSelf') {
        var adultNum = Number($('#adult').val()) || 2;
        var childNum = Number($('#child').val()) || 0;
        var totalNum = adultNum + childNum;
        var productType = 20;
        var lineId = cang.getquerystring('LineId');
        var version = $('#versionDdl').val();
        var useDate = $('#go_date').val();
        var endDate = cang.simpleday(
          new Date(useDate.replace('-', '/')).getTime() +
            86400000 * parseInt($('#inptPlayDays').text()),
        );

        that.startDate = useDate;
        that.endDate = endDate;
        that.adultNum = adultNum;
        that.childNum = childNum;
      } else if (type === 'abroad') {
        var adultNum = Number($('.adultPut').val()) || 2;
        var childNum = Number($('.childPut').val()) || 0;
        var totalNum = adultNum + childNum;
        var productType = 30;
        var lineId = cang.getquerystring('lineId');
        var version = $('.booking_mesBox .eui-dropdown-btn').data('value');
        var useDate = $('.TravelDate').val();
        var endDate = cang.simpleday(
          new Date(useDate.replace('-', '/')).getTime() +
            86400000 * parseInt($('.play_days em').text()),
        );

        that.startDate = useDate;
        that.endDate = endDate;
        that.adultNum = adultNum;
        that.childNum = childNum;
      } else if (type === 'around') {
        var adultNum = Number($('.tabledata tr').eq(0).find('.pnum').val()) || 2;
        var singleRoomNum = Number($('.tabledata tr').eq(1).find('.pnum').val()) || 0;
        var childNum = Number($('.tabledata tr').eq(2).find('.pnum').val()) || 0;
        var totalNum = adultNum + childNum;
        var productType = 10;
        var lineId = cang.getquerystring('LineId');
        var version = $('#versionDdl').val();
        var useDate = $('.goday').text();
        var endDate = $('.backday').text();

        that.startDate = useDate;
        that.endDate = endDate;
        that.adultNum = adultNum;
        that.singleRoomNum = singleRoomNum;
        that.childNum = childNum;
      } else {
        var adultNum = this.options.adultNum || 2;
        var singleRoomNum = this.options.singleRoomNum || 0;
        var childNum = this.options.childNum || 0;
        var totalNum = adultNum + childNum;
        var productType = 20;
        var lineId = this.options.lineId;
        var version = this.options.version;
        var useDate = this.options.useDate;
        var endDate = this.options.endDate;

        that.startDate = useDate;
        that.endDate = endDate;
        that.adultNum = adultNum;
        that.singleRoomNum = singleRoomNum;
        that.childNum = childNum;
      }

      $.ajax({
        url: cang.root + '/webapi/resource/singleResourceRecommend',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({
          productType: productType,
          productNo: lineId,
          version: version,
          adultNum: adultNum,
          childNum: childNum,
          useDate: useDate,
          endDate: endDate,
        }),
        headers: {
          'content-type': 'application/json',
        },
        success: function (data) {
          var list = (data && data.data) || [];
          that.list = list.map(function (item) {
            var stockType = item.stockType;
            var price = item.priceList[0];
            var ableNum = price.stockSum - price.stockUse;
            var maxNum = item.maxNum;
            var minNum = Math.ceil(totalNum / maxNum);
            var isNotEnough = false;
            if (stockType) {
              isNotEnough = ableNum < minNum;
              minNum = isNotEnough ? ableNum : minNum;
            }

            return {
              ...item,
              lcCarNum: 0,
              lcAdultNum: 0,
              lcChildNum: 0,
              lcAirportPickup: '', //到达地点
              lcAirportPickupArr: '', //出发地点
              lcUseDate: price,
              lcAbleNum: ableNum,
              lcTips: isNotEnough ? '库存不足' : '',
              lcTotalPrice: item.isGift ? item.priceList[0].standSalePrice : 0,
              lcStartDate: that.startDate,
              lcEndDate: that.endDate,
              lcTotalNum: totalNum,
            };
          });
        },
      });
    },
    getResourceType: function (type) {
      var map = {
        1: '接送机',
        2: '景区',
        3: '其他',
        4: '手机导游',
        10: '特殊资源',
        11: '当地用车',
        12: '特色体验',
        13: '一日游',
        14: '当地导游',
        15: '特殊补差',
      };
      return map[type];
    },
    getTotalPrice: function (item) {
      var saleType = item.saleType;
      var useType = item.useType;
      var isGift = item.isGift;
      var price = null;
      var totalPrice = 0;

      // 赠品为0
      if (isGift) {
        return item.priceList[0].standSalePrice;
      }
      // 1 官方指定范围的任意一天
      if (useType === 1) {
        price = item.lcUseDate;

        // 0 指定 2 客人自主选择任意一天
      } else {
        price = item.priceList[0];
      }
      if (saleType === 'STD') {
        totalPrice = cang.mul(item.lcCarNum, price.standSalePrice || 0);
      } else if (saleType === 'CROWD') {
        totalPrice = cang.add(
          cang.mul(item.lcAdultNum, price.adultSalePrice || 0),
          cang.mul(item.lcChildNum, price.childSalePrice || 0),
        );
      }

      item.lcTotalPrice = totalPrice;
      return totalPrice;
    },
    numChange: function (num, old, item) {
      var isReduce = old > num;
      var that = this;
      var ableNum = item.lcAbleNum;
      var lcCarNum = item.lcCarNum;
      var saleType = item.saleType;
      var lcTotalNum = item.lcTotalNum;

      // 库存是否满足
      if (item.lcUseDate.stockType === 1 && (lcCarNum > ableNum || lcTotalNum > ableNum)) {
        ElMessage.warning('库存不足');
        return;
      }
      // 数量是否满足人数
      if (saleType === 'STD') {
        if (lcCarNum && item.maxNum * lcCarNum < lcTotalNum && isReduce) {
          ElMessageBox.confirm(`每${item.saleUnit}最多${item.maxNum}人，是否继续？`, '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          })
            .then(() => {
              // 确认
            })
            .catch((err) => {
              console.log(err);
            });

          return;
        }
      }
    },
    openDetailVisible: function (item) {
      this.detailVisible = true;
      this.currentDetail = item;
    },
    openCarDetailVisible: function (item) {
      this.carDetailVisible = true;
      this.currentDetail = item;
    },
    openAirportPickupVisiblee: function (item) {
      this.airportPickupVisible = true;
      this.currentDetail = item;
    },
  },
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
