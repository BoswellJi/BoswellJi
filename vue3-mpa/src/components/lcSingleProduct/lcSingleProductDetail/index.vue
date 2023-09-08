<template>
  <el-dialog
    v-model="dialogVisible"
    title="产品详情"
    width="700px"
    :before-close="handleClose"
    class="single-product-detail"
  >
    <div class="info detail">
      <div class="left">
        <div class="main-title two-line">{{ detail.mainTitle }}</div>
        <div class="sub-title two-line">{{ detail.subTitle }}</div>
      </div>
      <div class="right">
        <div v-if="detail.saleType === 'STD'">
          <div class="adult-price">
            ￥{{ detail.lcUseDate.standSalePrice || 0 }}/{{ detail.saleUnit }}
          </div>
        </div>
        <div v-else-if="detail.saleType === 'CROWD'">
          <div class="adult-price">￥{{ detail.lcUseDate.adultSalePrice || 0 }}/成人</div>
          <div class="child-price">￥{{ detail.lcUseDate.childSalePrice || 0 }}/儿童</div>
        </div>
      </div>
    </div>

    <div class="info">
      <div class="main-title two-line">适应范围</div>
      <div class="sub-title">
        {{ detail.application }}
      </div>
    </div>

    <div class="info">
      <div class="main-title two-line">使用方法</div>
      <div class="sub-title">
        {{ detail.instruction }}
      </div>
    </div>

    <div class="info">
      <div class="main-title two-line">费用包含</div>
      <div class="sub-title">
        {{ detail.include }}
      </div>
    </div>

    <div class="info">
      <div class="main-title two-line">费用不包含</div>
      <div class="sub-title">
        {{ detail.exclude }}
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
/* eslint-disable */
// @ts-nocheck
export default {
  props: {
    detail: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data: function () {
    return {
      dialogVisible: true,
    };
  },
  created: function () {
    console.log(this.detail);
  },
  methods: {
    handleClose: function () {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
