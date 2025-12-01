<template>
  <div class="filter-box">
    <div class="tabs">
      <div class="tab flex active hotel">酒店</div>
    </div>
    <div class="filter">
      <div class="position">
        <div class="destination border">
          <div class="label">目的地</div>
          <lc-target-position
            :target="data.target"
            :target-id="data.targetId"
            @change="targetChange"
          />
        </div>
        <div class="other-pos border flex">
          <lc-search :target-id="data.targetId" :brand="data.brand" @change="searchChange" />
        </div>
      </div>
      <div class="date-box">
        <div class="date border flex">
          <div class="left">
            <div class="label">入住</div>
            <div class="date-txt flex">
              <el-date-picker
                :clearable="false"
                type="date"
                v-model="data.startDate"
                placeholder="请选择开始日期"
                value-format="YYYY-MM-DD"
                :disabled-date="disabledDate"
                @change="startDateChange"
              />
              <span class="day">({{ startDateText }})</span>
            </div>
          </div>
          <div class="center">{{ daysText }}晚</div>
          <div class="right">
            <div class="label">离店</div>
            <div class="date-txt flex">
              <el-date-picker
                :clearable="false"
                v-model="data.endDate"
                type="date"
                placeholder="请选择开始日期"
                value-format="YYYY-MM-DD"
                :disabled-date="disabledStartDate"
              />
              <span class="day">({{ endDateText }})</span>
            </div>
          </div>
        </div>
        <button class="btn" @click="searchHandler">搜索</button>
      </div>
      <!-- todo... -->
      <!-- <div class="search">
        <div class="history">
          <template v-if="data.historyList.length">
            <div class="label">搜索历史:</div>
            <div class="list">
              <span
                class="item"
                v-for="item of data.historyList"
                :key="item.targetId"
                @click="targetChange(item)"
                >{{ item.target }}</span
              >
            </div>
          </template>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import lcTargetPosition from '@/components/lcTargetPosition/index.vue';
import lcSearch from '@/components/lcSearch/index.vue';
import { computed, onMounted, reactive } from 'vue';
import moment from 'moment';
import { safeWindowOpen } from '@/utils/util';

interface targetType {
  target: string;
  targetId: string;
  brand?: string;
}

const data = reactive({
  target: '北京',
  targetId: '0101',
  brand: '',
  startDate: moment().format('YYYY-MM-DD'),
  endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
  historyList: [],
});
const dayMap = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const startDateText = computed(() => {
  const startDate = moment(data.startDate);
  const day = startDate.format('YYYY-MM-DD');
  const today = moment().format('YYYY-MM-DD');
  return day === today ? '今天' : dayMap[startDate.day()];
});
const endDateText = computed(() => {
  const endStart = moment(data.endDate);
  const day = endStart.format('YYYY-MM-DD');
  const nextDay = moment().add(1, 'day').format('YYYY-MM-DD');
  return day === nextDay ? '明天' : dayMap[endStart.day()];
});
const daysText = computed(() => {
  const { startDate, endDate } = data;
  return moment(endDate).diff(moment(startDate), 'days');
});

onMounted(() => {
  initHistory();
});

function initHistory() {
  const hoteCityListStr = localStorage.getItem('hoteCityList');
  if (hoteCityListStr) {
    const hoteCityList = JSON.parse(hoteCityListStr);
    data.historyList = hoteCityList.reverse();
  }
}

function disabledDate(e: Date) {
  return Date.now() - 24 * 60 * 60 * 1000 > new Date(e).getTime();
}

function disabledStartDate(e: Date) {
  return moment(data.startDate).add(1, 'day').valueOf() > new Date(e).getTime();
}

function startDateChange() {
  data.endDate = moment(data.startDate).add(1, 'day').format('YYYY-MM-DD');
}

function targetChange(e: targetType) {
  data.target = e.target;
  data.targetId = e.targetId;
  data.brand = e.brand || '';
}

function searchChange(e) {
  data.brand = e || '';
}

function searchHandler() {
  const { target, targetId, brand, startDate, endDate } = data;
  storageCity();
  safeWindowOpen(
    `/Home/IndexNew?target=${target}&targetId=${targetId}&brand=${brand}&startDate=${startDate}&endDate=${endDate}`,
  );
}

/**
 * 存储最新的5个
 */
function storageCity() {
  const { target, targetId } = data;
  if (target && targetId) {
    const hoteCityListStr = localStorage.getItem('hoteCityList');
    let hoteCityList = null;
    if (hoteCityListStr) {
      hoteCityList = JSON.parse(hoteCityListStr);
      if (!hoteCityList.find((city: any) => city.targetId === targetId)) {
        if (hoteCityList.length > 4) {
          hoteCityList.shift();
        }
        hoteCityList.push({ target, targetId });
      }
    } else {
      hoteCityList = [{ target, targetId }];
    }
    localStorage.setItem('hoteCityList', JSON.stringify(hoteCityList));
    initHistory();
  }
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
