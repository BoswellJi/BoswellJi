<template>
  <el-config-provider :locale="locale">
    <share-header :isShowNav="false" :isShowSearch="false"></share-header>
    <div class="wrapper">
      <div class="block-left">
        <div class="room-info nomar-mic block">
          <h3>客房信息</h3>
          <div class="con">
            <div class="check-date r-item">
              <span>{{ hotelOrder.startDate }}入住</span><span>{{ hotelOrder.endDate }}离店</span>
            </div>
            <div class="room-count r-item">
              <label>取消规则：</label>
              <el-popover :width="310" trigger="hover">
                <template #reference>
                  <span class="cancel-pop-title">{{ ratePlanVo.cancelTypeDesc }}</span>
                </template>
                <div class="cancel-con never">
                  {{ ratePlanVo.cancelDescription }}
                </div>
              </el-popover>
            </div>
            <div class="room-count r-item">
              <label>房间数量：</label>
              <el-select v-model="hotelOrder.numberOfRooms" @change="changeRoomNum">
                <el-option value="1">1</el-option>
                <el-option value="2">2</el-option>
                <el-option value="3">3</el-option>
                <el-option value="4">4</el-option>
                <el-option value="5">5</el-option>
                <el-option value="6">6</el-option>
                <el-option value="7">7</el-option>
              </el-select>
            </div>

            <div class="room-amount r-item">
              <div class="room-count r-item">
                <label style="margin-left: 28px">发票：</label
                >{{ ratePlanVo.invoiceMode === 'Elong' ? '平台代开票' : '酒店开发票' }}
              </div>
              <div class="date-price dtg-flex dtg-align-center dtg-flex-warp">
                <dl
                  class="price-item"
                  v-for="(item, index) of ratePlanVo.nightlyRateVos"
                  :key="index"
                >
                  <dt>
                    <span>{{ item.date }}</span>
                    <p>{{ item.week }}</p>
                  </dt>
                  <dd>
                    <p class="cf63">¥{{ item.member }}</p>
                    <span class="breakfast">{{ item.breakfastDesc }}</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="passenger block">
          <h3>入住信息</h3>
          <div class="con">
            <ul>
              <li v-for="(item, index) of hotelOrder.list" :key="index">
                <div class="dtg-flex dtg-align-center">
                  <div class="txt">房间{{ index + 1 }}</div>
                  <div class="inputs">
                    <div class="p-sel-item dtg-input-1">
                      <el-input v-model="item.name1" placeholder="请填写真实的姓名" />
                    </div>
                    <div class="p-sel-item dtg-input-1">
                      <el-input v-model="item.name2" placeholder="请填写真实的姓名" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="waring-bar">
              <p>*每间房间至少填写一名住客</p>
            </div>
            <div v-if="ratePlanVo.identification == 1 || ratePlanVo.identification == 5">
              <div class="dtg-flex dtg-align-center mt10">
                <div class="txt" style="width: 130px">身份证</div>
                <div class="inputs mr35">
                  <el-select style="width: 190px" v-model="hotelOrder.idenName">
                    <el-option
                      v-for="item of personList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </div>
                <div class="inputs">
                  <el-input v-model="hotelOrder.idenNo" placeholder="请填写身份证信息" />
                </div>
              </div>
              <div class="waring-bar">
                <p>*按酒店要求，本单需提供任一入住人身份证信息</p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-list intl-contact block">
          <h3>联系人信息</h3>
          <div class="con">
            <ul>
              <li>
                <div class="dtg-input-1">
                  <p class="label">姓名</p>
                  <el-input v-model="hotelOrder.name" />
                </div>
                <div class="dtg-input-1">
                  <p class="label">手机号码</p>
                  <el-input v-model="hotelOrder.phone" />
                </div>
              </li>
            </ul>
          </div>
          <div class="con pt1">
            <el-checkbox
              :true-label="1"
              :false-label="0"
              v-model="hotelOrder.confirmMsg"
              label="酒店确认短信通知联系人"
            />
          </div>
        </div>
      </div>
      <div class="right">
        <hotelInfo></hotelInfo>
      </div>
    </div>
    <share-footer></share-footer>
  </el-config-provider>
</template>

<script setup lang="ts">
// @ts-nocheck
import hotelInfo from './components/hotelInfo/index.vue'
import { useHotelOrder } from '@/stores/hotelOrder'
import { computed } from 'vue'
import { parse } from 'qs'
import { ref } from 'vue'
import axios from 'axios'
import zhCn from 'element-plus/dist/locale/zh-cn.js'

const locale = ref(zhCn)
const hotelOrder = useHotelOrder()
const { arrivalDate, departureDate, hotelIds, roomTypeId, ratePlanId } = parse(
  location.search.slice(1)
)

hotelOrder.startDate = arrivalDate
hotelOrder.endDate = departureDate
hotelOrder.hotelIds = hotelIds
hotelOrder.roomTypeId = roomTypeId
hotelOrder.ratePlanId = ratePlanId

hotelOrder.getOrderInfo()

const detail = computed(() => {
  return hotelOrder.detail
})
const ratePlanVo = computed(() => {
  return detail.value.ratePlanVo || {}
})
const personList = computed(() => {
  return hotelOrder.personNum
})

function changeRoomNum(e) {
  hotelOrder.list = []
  for (let i = 0; i < e; i++) {
    hotelOrder.list.push({
      name1: '',
      name2: ''
    })
  }
  hotelOrder.getCalcPrice()
}

async function getCurrentUser() {
  const { data } = await axios.request({
    url: cang.root + '/Home/GetCurrentUser',
    method: 'get'
  })
  hotelOrder.distributorName = data.Name
  hotelOrder.name = data.Name
  hotelOrder.phone = data.Mobile
}
getCurrentUser()

async function getBusinessExecutive() {
  const { data } = await axios.request({
    url: cang.root + '/CommonManage/GetBusinessExecutive',
    method: 'get'
  })

  hotelOrder.jobName = data.BusinessExecutiveName
  hotelOrder.jobNumber = data.BusinessExecutiveTCNum
}
getBusinessExecutive()
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
