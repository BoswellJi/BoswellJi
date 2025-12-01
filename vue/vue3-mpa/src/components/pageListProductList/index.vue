<template>
  <div class="product-list">
    <div class="list-box" v-for="item in productList" :key="item.id">
      <div class="left-box">
        <img :src="item.imgUrl" />
        <span class="tag">
          <span class="line1">
            {{ item.projectType }}
            {{ item.projectType && item.startCity ? '|' : '' }}
            {{ item.startCity }}
          </span>
        </span>
      </div>
      <div class="right-box">
        <div class="info-box">
          <a class="title" target="_blank" :href="item.url">
            <span class="main-title line1">{{ item.title }}</span>
          </a>
          <div class="line1 sub-title">{{ item.subTitle ? item.subTitle : '' }}</div>
          <div class="tags-list">
            <span class="tags-item" v-for="tag in item.tagList" :key="tag">{{ tag }}</span>
          </div>
          <p class="special">{{ item.specialText }}</p>
          <p class="date" v-if="item.dateText">出发团期：{{ item.dateText }}</p>
        </div>
        <div class="price-box">
          <p v-if="item.tcPrice > 0" class="price">
            <em>¥</em> <span>{{ item.tcPrice }}</span> <i>起</i>
          </p>
          <p v-else class="price">
            <span>{{ item.tcPrice }}</span>
          </p>
          <template v-if="isSelectedTh">
            <p class="price-th">
              <i>同行价</i><em>¥</em><span>{{ item.chanelPrice }}</span
              ><i>起</i>
            </p>
            <p class="profit-box">
              <span class="profit"
                >利润<em>¥</em><span>{{ item.profit }}</span></span
              >
            </p>
          </template>
          <p class="num">{{ item[peopleCount] ? `${item[peopleCount]}人已购买` : '' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck

export default {
  props: {
    isSelectedTh: {
      type: Boolean,
      default: false,
    },
    productList: {
      type: Array,
      default: () => [],
    },
    projectId: [String, Number],
  },
  computed: {
    peopleCount() {
      const map = {
        2: {
          type: '国内游',
          key: 'trips',
        },
        3: {
          type: '酒景玩乐',
          key: 'trips',
        },
        5: {
          type: '出境游',
          key: 'peopleCount',
        },
      };
      const key = map[this.projectId] ? map[this.projectId].key : 'salesNum';
      return key;
    },
  },
  data: function () {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
