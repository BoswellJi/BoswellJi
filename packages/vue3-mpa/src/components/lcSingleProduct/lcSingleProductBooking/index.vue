<template>
  <div class="single-product" v-if="list.length">
    <div class="product-list-box">
      <div class="product-list product-title">
        <div class="th name">产品名称</div>
        <div class="th date">使用日期</div>
        <div class="th num">数量</div>
        <div class="th total">小计</div>
      </div>
      <div class="product-list product-body" v-for="(item, index) of list" :key="index">
        <div class="th name">
          <div class="main-title one-line" :title="item.mainTitle">{{ item.mainTitle }}</div>
          <template v-if="item.resourceType === 1 || item.resourceType === 11">
            <div class="sub-title" @click="openCarDetailVisible(item)">详情</div>
          </template>
          <template v-else>
            <div class="sub-title" @click="openDetailVisible(item)">详情</div>
          </template>
        </div>
        <div class="th date">
          <div v-if="item.useType === 0">
            <div>{{ item.lcUseDate.date }}</div>
            <div class="date-tip">当天可用</div>
          </div>
          <div v-else-if="item.useType === 1">
            <div>{{ item.lcStartDate }}~{{ item.lcEndDate }}</div>
            <div class="date-tip">任意一天使用</div>
          </div>
          <div v-else-if="item.useType === 2">
            <div>{{ item.lcUseDate.date }}</div>
          </div>
        </div>
        <div class="th num">
          <template v-if="!item.isGift">
            <div class="num-box" v-if="item.saleType === 'STD'">
              {{ item.lcCarNum }}
              <span>{{ item.saleUnit }}</span>
            </div>
            <div class="num-box" v-else-if="item.saleType === 'CROWD'">
              {{ item.lcChildNum }}
              <span>儿童</span>
              {{ item.lcAdultNum }}
              <span>成人</span>
            </div>
          </template>
        </div>
        <div class="th total">
          <div>￥{{ item.lcTotalPrice }}元</div>
          <div class="tips" v-if="item.isGift">赠送</div>
        </div>
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
  </div>
</template>

<script lang="ts">
import lcSingleProductDetail from '../lcSingleProductDetail/index.vue';
import lcCarProductDetail from '../lcCarProductDetail/index.vue';

export default {
  props: {
    list: {
      type: Array<any>,
      default: () => [],
    },
  },
  components: {
    lcSingleProductDetail,
    lcCarProductDetail,
  },
  created() {
    console.log(this.list);
  },
  data: function () {
    return {
      detailVisible: false,
      carDetailVisible: false,
      currentDetail: null,
    };
  },
  methods: {
    openDetailVisible: function (item: any) {
      this.detailVisible = true;
      this.currentDetail = item;
    },
    openCarDetailVisible: function (item: any) {
      this.carDetailVisible = true;
      this.currentDetail = item;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
