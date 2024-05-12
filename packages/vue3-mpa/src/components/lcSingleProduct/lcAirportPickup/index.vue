<template>
  <el-dialog
    v-model="dialogVisible"
    :title="detail.carInfo.serviceName"
    width="700px"
    :before-close="cancel"
    class="car-product-detail airport-pickup"
  >
    <div class="info">
      <div class="left">
        <div class="main-title two-line">
          {{ detail.mainTitle }}
        </div>
      </div>
      <div class="right">
        <div class="adult-price">
          ￥{{ detail.priceList[0].standSalePrice }}/{{ detail.saleUnit }}
        </div>
      </div>
    </div>

    <el-form label-width="80px" label-position="left">
      <el-form-item label="数量">
        <!-- eslint-disable -->
        <el-input-number
          v-model="detail.lcCarNum"
          :min="0"
          :max="detail.lcUseDate.stockType === 2 ? detail.lcAbleNum : 10000"
          style="margin-right: 100px"
          @change="
            (curr, next) => {
              numChange(curr, next, detail);
            }
          "
        />
        总计：{{ totalPrice }}元
      </el-form-item>
      <template v-for="(item, index) of detail.carInfo.stationList" :key="index">
        <el-form-item label="出发地点" style="margin-top: 10px">
          <template v-if="item.depType === 'location'">
            {{ item.depAddress }}
          </template>
          <template v-if="item.depType === 'choose'">
            <el-input v-model="item.depAddress" :rows="2" type="textarea" />
          </template>
        </el-form-item>
        <el-form-item label="到达地点">
          <template v-if="item.arrType === 'location'">
            {{ item.arrAddress }}
          </template>
          <template v-if="item.arrType === 'choose'">
            <el-input v-model="item.arrAddress" :rows="2" type="textarea" />
          </template>
        </el-form-item>
      </template>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </span>
    </template>
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
  computed: {
    totalPrice: function () {
      return cang.mul(this.detail.lcCarNum, this.detail.priceList[0].standSalePrice);
    },
  },
  data: function () {
    return {
      dialogVisible: true,
      carNum: 0,
      place: '',
    };
  },
  created: function () {
    console.log(this.detail);
    this.stationList = JSON.parse(JSON.stringify(this.detail.carInfo.stationList));
    this.lcCarNum = this.detail.lcCarNum;
  },
  methods: {
    handleClose: function () {
      this.$emit('close');
    },
    cancel: function () {
      var that = this;
      this.detail.carInfo.stationList.forEach(function (item, index) {
        Object.assign(item, that.stationList[index]);
      });
      this.detail.lcCarNum = this.lcCarNum;
      this.handleClose();
    },
    confirm: function () {
      var list = this.detail.carInfo.stationList.filter(function (item) {
        return !item.depAddress || !item.arrAddress;
      });
      if (this.detail.lcCarNum > 0 && list.length > 0) {
        this.$message.warning('请填写完整的接送地点');
        return;
      }
      this.handleClose();
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
        ElementPlus.ElMessage.warning('库存不足');
        return;
      }
      // 数量是否满足人数
      if (saleType === 'STD') {
        if (lcCarNum && item.maxNum * lcCarNum < lcTotalNum && isReduce) {
          ElementPlus.ElMessageBox.confirm(
            `每${item.saleUnit}最多${item.maxNum}人，是否继续？`,
            '',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            },
          )
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
  },
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
