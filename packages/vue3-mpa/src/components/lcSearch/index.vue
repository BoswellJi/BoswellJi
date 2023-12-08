<template>
  <div class="pop-city">
    <input
      v-model="searchBox.brand"
      type="text"
      placeholder="位置/酒店/品牌"
      class="input-small"
      @focus="openKeyword"
      @input="openSearchKeyword"
      @click.stop="() => {}"
    />
    <div class="keyword-wrapper" v-show="searchBox.isShowKeyword">
      <div class="keyword-title">
        热门关键字（可直接选择推荐关键字或输入中文/拼音）
        <span @click="closeTarget"></span>
      </div>
      <div class="keyword-content" @click.stop="selectKeyword">
        <dl class="label" v-if="searchBox.trainStationList.length">
          <dt>机场车站</dt>
          <dd>
            <span
              class="type-txt"
              :title="item.nameCn"
              :data-id="item.id"
              v-for="item of searchBox.trainStationList"
              :key="item.nameCn"
              :data-type="1"
            >
              {{ item.nameCn }}
            </span>
          </dd>
        </dl>
        <dl class="section" v-if="searchBox.regionList.length">
          <dt><!---->热门行政区</dt>
          <dd>
            <span
              class="type-txt"
              :title="item.nameCn"
              :data-id="item.id"
              v-for="item of searchBox.regionList"
              :key="item.nameCn"
              :data-type="2"
            >
              {{ item.nameCn }}
            </span>
          </dd>
        </dl>
        <dl class="business" v-if="searchBox.businessAreaList.length">
          <dt><!---->热门商圈</dt>
          <dd>
            <span
              class="type-txt"
              :title="item.nameCn"
              :data-id="item.id"
              v-for="item of searchBox.businessAreaList"
              :key="item.nameCn"
              :data-type="3"
            >
              {{ item.nameCn }}
            </span>
          </dd>
        </dl>
      </div>
    </div>
    <div
      class="auto-wrapper"
      v-show="searchBox.isShowSearchKeyword"
      @click.stop="selectSearchKeyword"
    >
      <div class="title">
        输入中文/拼音
        <span @click="closeSearchKeyword"></span>
      </div>
      <!---->
      <div class="auto-list hotel">
        <ul>
          <li class="line-br" v-for="(item, index) of searchBox.searchKeyWordList" :key="index">
            <div
              :title="item.name"
              class="auto-item intl-auto-item dtg-flex dtg-align-center dtg-justify-between"
            >
              <div
                style="max-width: 80%"
                class="txt txt-ellipsis"
                :data-id="item.id"
                :title="item.name"
              >
                {{ item.name }}
              </div>

              <span v-if="item.typeName">{{ item.typeName }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive, onBeforeMount, onMounted, onUnmounted, watch } from 'vue';
import { debounce } from 'lodash';
import request from '@/utils/request';

interface brandType {
  targetId: string;
  brand: string;
}

const props = withDefaults(defineProps<brandType>(), {
  targetId: '0101',
  brand: '',
});
const emit = defineEmits<{
  (e: 'change', target: any): void;
}>();

const searchBox = reactive<any>({
  isShowKeyword: false,
  isShowSearchKeyword: false,
  brand: '',
  targetId: '',
  businessAreaList: [],
  regionList: [],
  keyWordList: [],
  searchKeyWordList: [],
  trainStationList: [],
});

watch(props, () => {
  refresh();
});

onBeforeMount(() => {
  refresh();
});

onMounted(() => {
  document.addEventListener('click', docClickHandler, false);
});

onUnmounted(() => {
  document.removeEventListener('click', docClickHandler, false);
});

function refresh() {
  const { brand, targetId } = props;
  searchBox.brand = brand;
  searchBox.targetId = targetId;
  getKeyword();
}

function docClickHandler() {
  searchBox.isShowSearchKeyword = false;
  searchBox.isShowKeyword = false;
}

function openKeyword() {
  searchBox.isShowKeyword = true;
}

function closeKeyword() {
  searchBox.isShowKeyword = false;
}

function closeSearchKeyword() {
  searchBox.isShowSearchKeyword = false;
}

const openSearchKeyword = debounce(function () {
  closeKeyword();
  emit('change', searchBox.brand);
  if (searchBox.brand) {
    getSearchKeyword();
    searchBox.isShowSearchKeyword = true;
  } else {
    closeSearchKeyword();
    openKeyword();
  }
}, 300);

async function getKeyword() {
  const { data } = await request({
    url: '/webapi/hotel/queryFilter',
    method: 'post',
    data: {
      cityId: searchBox.targetId,
      filterType: 3,
      hotFilter: false,
    },
  });
  searchBox.businessAreaList = [];
  searchBox.regionList = [];

  data.forEach((item: any) => {
    const { nameCn, subHotelFilterInfos } = item;
    if (nameCn === '商圈') {
      searchBox.businessAreaList = subHotelFilterInfos;
    } else if (nameCn === '行政区') {
      searchBox.regionList = subHotelFilterInfos;
    } else if (nameCn === '品牌连锁') {
      searchBox.brandList = subHotelFilterInfos;
    } else if (nameCn === '星级') {
      searchBox.starList = subHotelFilterInfos;
    }
  });

  searchBox.keyWordList = data || [];
}

async function getSearchKeyword() {
  const { data } = await request({
    url: '/webapi/hotel/queryKeyword',
    method: 'post',
    data: {
      cityId: searchBox.targetId,
      queryText: searchBox.brand,
    },
  });

  searchBox.searchKeyWordList = data || [];
}

function selectKeyword(e) {
  const title = e.target.getAttribute('title');
  searchBox.brand = title;
  emit('change', title);
  closeKeyword();
}

function closeTarget() {
  searchBox.isShowKeyword = false;
}

function selectSearchKeyword(e) {
  const title = e.target.getAttribute('title');
  if (title) {
    searchBox.brand = title;
    emit('change', title);
    closeSearchKeyword();
    closeKeyword();
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
