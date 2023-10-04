<template>
  <div class="middle-block">
    <div class="hotel-center-menu" @click="gotoAnchor">
      <span :class="{ active: currentType == Type.ROOMTYPE }" data-type="1">酒店预定</span>
      <span :class="{ active: currentType == Type.HOTELINFO }" data-type="2">酒店信息</span>
    </div>
  </div>
  <div class="room-main" ref="roomTypeRef">
    <div class="date-bar dtg-flex dtg-align-center dtg-justify-between">
      <div class="date-change">
        <el-date-picker
          v-model="hotelDetail.startEndDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          @change="startEndDateChange"
        />
        <button class="confirm" @click="hotelDetail.getRoomTypeList">确定</button>
      </div>
      <!-- <div class="city-policy">
        <el-popover :width="500" trigger="click">
          <template #reference>
            <span class="text">当前区域差旅标准</span>
          </template>

          <div class="policy-con">
            <div class="policy-content">
              <div class="single-content">
                <p class="title">季明壮的差旅标准</p>
                <div class="rule">
                  <div class="standard clearfix dtg-flex">
                    <div class="dtg-flex-grow1">入住标准：0-250.00元</div>
                    <div class="violate">
                      <span>超标时：允许预订</span>
                    </div>
                  </div>
                  <p class="single">多人入住同一间房时:按最高标准入住（A或B）</p>
                  <p class="single">多人入住上浮:100元</p>
                </div>
              </div>
            </div>
          </div>
        </el-popover>
      </div> -->

      <div class="city-policy">
        <el-checkbox-group v-model="hotelDetail.invoiceMode" @change="hotelDetail.getRoomTypeList">
          <el-checkbox label="Elong">平台代开票</el-checkbox>
          <el-checkbox label="Hotel">酒店开发票</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
  <!-- <div class="room-filter">
    <span>有早</span>
    <span>可取消</span>
    <span class="active">符合差旅标准</span>
  </div> -->
  <div class="room-list" v-loading="hotelDetail.loading">
    <template v-for="item of hotelRoomVos" :key="item.roomId">
      <div class="room-item" v-if="item.ratePlanVos.length">
        <div class="room-info dtg-flex">
          <div class="img-box">
            <div class="img-main">
              <div class="img-box">
                <img
                  @error="errorImg(item)"
                  :src="item.imageUrl ? item.imageUrl : errorImg(item)"
                  style="width: 125px; height: 94px; border-radius: 5px"
                />
              </div>
            </div>
          </div>
          <div class="info-box">
            <h3>
              {{ item.name }}
              <span class="en-name"></span>
            </h3>
            <p class="info-other">
              <span>面积：{{ item.area }}㎡</span><span>床型：{{ item.bedType }}</span
              ><span
                >可住：
                <i
                  class="iconfont icon-geren"
                  v-for="(person, index) of new Array(Number(item.capcity))"
                  :key="index"
                ></i
              ></span>
              <!-- <span>网络：免费Wifi</span> -->
              <span>楼层：{{ item.floor }}层</span>
              <span>窗户：{{ item.windosType }}</span>
            </p>
          </div>
          <div class="price-box">
            <span class="marketPrice">
              <!-- <span class="priceCn"> ￥</span>
            333 -->
            </span>
            <span>
              ¥
              <span>{{ item.lowRate }}</span></span
            >起
          </div>
        </div>
        <div class="policy-list">
          <dl class="policy-title">
            <dt>产品类型</dt>
            <dt>发票</dt>
            <dd class="bed-type">床型</dd>
            <dd>早餐</dd>
            <dd class="td-cancel">取消规则</dd>
            <dd class="price">房价</dd>
            <dd>操作</dd>
          </dl>
          <div class="policy-con">
            <dl class="policy-item" v-for="(room, index) of item.ratePlanVos" :key="index">
              <dt>
                <div class="txt-ellipsis policy-name">{{ room.ratePlanName }}</div>
                <div style="margin-left: -10px" class="mt10" v-if="room.cooperationType == 1">
                  <el-tag size="small">快速确认</el-tag>
                </div>
              </dt>
              <dd style="width: 180px; text-align: left">
                <el-tag class="ml-2" type="warning">{{
                  room.invoiceMode === 'Elong' ? '平台代开票' : '酒店开发票'
                }}</el-tag>
              </dd>
              <dd class="bed-type">
                {{ room.xBedType }}
              </dd>
              <dd>{{ room.breakfastDesc }}</dd>
              <dd class="td-cancel">
                <!---->
                <el-popover :width="310" trigger="hover">
                  <template #reference>
                    <span class="cancel-pop-title">{{ room.cancelTypeDesc }}</span>
                  </template>
                  <div class="cancel-con never">
                    <img
                      v-if="room.cancelTypeDesc === '不可取消'"
                      src="https://img.dttrip.cn/pc/v2/tmc/no-cancel.png"
                    />
                    <img
                      v-if="room.cancelTypeDesc === '限时取消'"
                      src="https://img.dttrip.cn/pc/v2/tmc/limit-cancel.png"
                    />
                    <div class="cancel-con-content">
                      {{ room.cancelDescription }}
                    </div>
                  </div>
                </el-popover>

                <div class="tag-confirm"><!----></div>
              </dd>

              <dd class="price">
                <div class="money">
                  <span class="marketPrice">
                    <!-- <span class="priceCn">
                    ￥
                  </span>
                  333 -->
                  </span>
                  <label class="avg-tag"></label><span>¥{{ room.averageRate }}</span>
                  <p style="font-size: 12px">佣金：¥{{ room.customerRate }}</p>
                </div>
                <!---->
              </dd>
              <dd class="operate" @click="bookHandler(room, item)">
                <div class="book-btn online">
                  预订
                  <span>预付</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, ref } from 'vue';
import moment from 'moment';
import { safeWindowOpen } from '@/utils/util';

import { useHotelDateil } from '@/stores/hotelDetail';

enum Type {
  ROOMTYPE = 1,
  HOTELINFO = 2,
}

const hotelDetail = useHotelDateil();
const currentType = ref();
const roomTypeRef = ref();

const hotelRoomVos = computed(() => {
  return hotelDetail.detail.hotelRoomVos || [];
});

function startEndDateChange(e) {
  const [start, end] = e;
  if (start === end) {
    hotelDetail.startEndDate = [start, moment(end).add(1, 'days').format('YYYY-MM-DD')];
  }
  hotelDetail.getRoomTypeList();
}

function bookHandler(price) {
  safeWindowOpen(
    `/Hotel/Order?arrivalDate=${hotelDetail.startEndDate[0]}&departureDate=${hotelDetail.startEndDate[1]}&roomTypeId=${price.roomTypeId}&ratePlanId=${price.ratePlanId}&hotelIds=${hotelDetail.hotelIds}`,
  );
}

const disabledDate = (e: Date) => {
  return Date.now() - 24 * 60 * 60 * 1000 > new Date(e).getTime();
};

function gotoAnchor(e) {
  const type = e.target.getAttribute('data-type');
  currentType.value = type;

  if (Type.HOTELINFO == type) {
    const rect = document.querySelector('.hotel-intro').getBoundingClientRect();
    window.scrollBy(0, rect.top);
  } else if (Type.ROOMTYPE == type) {
    const rect = roomTypeRef.value.getBoundingClientRect();
    window.scrollBy(0, rect.top);
  }
}

function errorImg(item) {
  item.imageUrl = 'https://pic3.40017.cn/gny/line/2016/02/03/10/H4gW6T_464x251_0099999.jpg.webp';
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
