<template>
  <div class="pop-city">
    <input
      v-model="searchBox.target"
      type="text"
      placeholder="目的地"
      class="input-small target"
      @focus="openTarget"
      @input="openSearchTarget"
      @click.stop="() => {}"
    />
    <div class="city-wrapper" v-show="searchBox.isShowTarget">
      <div class="city-title">
        热门城市（可直接选择城市或输入城市中文/拼音）<span @click="closeTarget"></span>
      </div>
      <div class="city-content">
        <div class="tabs">
          <div class="tab-cons" @click.stop="selectTarget">
            <div class="tab-con active">
              <ul>
                <li
                  v-for="(item, index) of searchBox.hotCity"
                  :key="index"
                  :title="item.name"
                  :cityid="item.ecityId"
                  class="city-item-1"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="auto-wrapper" v-show="searchBox.isShowSerchTarget">
      <div class="title">
        输入中文/拼音
        <span @click="closeSearchTarget"></span>
      </div>
      <div class="auto-list hotel" @click="selectSearchTarget">
        <ul>
          <li class="line-br" v-for="(item, index) of searchBox.searchHotCity" :key="index">
            <p
              :title="item.name"
              :data-name="item.cityName"
              :data-keyword="item.keyWord"
              class="auto-item txt-ellipsis"
              :data-cityid="item.cityId"
            >
              {{ item.name }}
              <span v-if="item.typeName">{{ item.typeName }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, onUnmounted, watch } from 'vue';
import { debounce } from 'lodash';
import request from '@/utils/request';

interface targetType {
  target: string;
  targetId: string;
  brand?: string;
}

const props = withDefaults(defineProps<targetType>(), {
  target: '北京',
  targetId: '0101',
});
const emit = defineEmits<{
  (e: 'change', target: targetType): void;
}>();

const searchBox = reactive<any>({
  target: '',
  targetId: '',
  brand: '',
  isShowTarget: false,
  isShowSerchTarget: false,
  hotCity: [],
  searchHotCity: [],
});

watch(props, (data) => {
  searchBox.target = data.target;
  searchBox.targetId = data.targetId;
});

onBeforeMount(() => {
  const { target, targetId } = props;
  searchBox.target = target;
  searchBox.targetId = targetId;

  getTarget();
});

onMounted(() => {
  document.addEventListener('click', docClickHandler, false);
});

onUnmounted(() => {
  document.removeEventListener('click', docClickHandler, false);
});

function docClickHandler() {
  searchBox.isShowSerchTarget = false;
  searchBox.isShowTarget = false;
}

async function getTarget() {
  const { data } = await request({
    url: '/webapi/hotel/queryDefaultDestination',
    method: 'get',
  });
  searchBox.hotCity = data?.blocks[0]?.records || [];
}

function selectSearchTarget(e: any) {
  const cityId = e.target.getAttribute('data-cityid');
  const cityName = e.target.getAttribute('data-name');
  const keyword = e.target.getAttribute('data-keyword');

  if (cityName) {
    searchBox.target = cityName;
    searchBox.targetId = cityId;
    searchBox.brand = keyword;
    emit('change', {
      target: cityName,
      targetId: cityId,
      brand: keyword,
    });
    closeSearchTarget();
  }
}

function selectTarget(e: any) {
  const { title } = e.target;
  const cityId = e.target.getAttribute('cityid');
  if (title) {
    searchBox.target = title;
    searchBox.targetId = cityId;
    emit('change', {
      target: title,
      targetId: cityId,
    });
    closeTarget();
  }
}

function openTarget() {
  searchBox.isShowTarget = true;
}

function closeTarget() {
  searchBox.isShowTarget = false;
}

function closeSearchTarget() {
  searchBox.isShowSerchTarget = false;
}

const openSearchTarget = debounce(function () {
  closeTarget();
  if (searchBox.target) {
    getSearchTarget();
    searchBox.isShowSerchTarget = true;
  } else {
    openTarget();
    closeSearchTarget();
  }
}, 300);

async function getSearchTarget() {
  const { data } = await request({
    url: '/webapi/hotel/queryDestination',
    method: 'post',
    data: {
      queryText: searchBox.target,
      sugOrientation: 0, // 0国内 1国际
    },
  });
  searchBox.searchHotCity = data || [];
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
