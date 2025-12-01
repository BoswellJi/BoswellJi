<template>
  <el-dialog
    v-model="dialogVisible"
    :title="detail.carInfo.serviceName"
    width="700px"
    :before-close="handleClose"
    class="car-product-detail"
  >
    <div class="info detail" style="margin-bottom: 0">
      <div class="left">
        <div class="main-title two-line">
          <span class="tag">
            {{ detail.carInfo.carTypeName }}
          </span>
          {{ detail.mainTitle }}
        </div>
        <div class="sub-title two-line">{{ detail.subTitle }}</div>
      </div>
      <div class="right">
        <div class="adult-price">
          ￥{{ detail.priceList[0].standSalePrice }}/{{ detail.saleUnit }}
        </div>
      </div>
    </div>
    <el-form :inline="true" class="detail" label-width="120px" label-position="left">
      <div>
        <el-form-item label="是否含司机">
          {{ detail.carInfo.isDriver === 0 ? '否' : '是' }}
        </el-form-item>
        <el-form-item label="车辆类型">
          {{ detail.carInfo.carClass === 0 ? '舒适型' : '' }}
          {{ detail.carInfo.carClass === 1 ? '经济型' : '' }}
          {{ detail.carInfo.carClass === 2 ? '豪华型' : '' }}
        </el-form-item>
      </div>
      <div>
        <el-form-item label="座位上限"> {{ detail.carInfo.carSeats }}人 </el-form-item>
        <el-form-item label="服务时长"> {{ detail.carInfo.carTime }}小时 </el-form-item>
      </div>
      <div v-for="(item, index) of detail.carInfo.stationList" :key="index">
        <el-form-item label="出发地点"> {{ item.depAddress }} </el-form-item>
        <el-form-item label="到达地点"> {{ item.arrAddress }} </el-form-item>
      </div>
    </el-form>

    <div class="detail">
      <div class="main-title two-line">使用方法</div>
      <div class="sub-title two-line">{{ detail.instruction }}</div>
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
