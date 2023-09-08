<template>
  <div class="nav-parent">
    <div class="nav-box">
      <div
        class="nav-item"
        :class="{ selected: currentProjectId == item.projectId }"
        v-for="item in navList"
        :key="item.projectId"
        @click="changeNav(item.projectId)"
      >
        {{ item.projectName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { safeWindowOpen } from '@/utils/util';

export default {
  props: {
    currentProjectId: {
      type: Number,
      default: 8,
    },
  },
  data: function () {
    return {
      navList: [
        {
          projectId: 0,
          projectName: '首页',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 1,
          projectName: '周边游',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 2,
          projectName: '国内游',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 3,
          projectName: '酒景玩乐',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 4,
          projectName: '邮轮',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 5,
          projectName: '出境游',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 6,
          projectName: '全球玩乐',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 7,
          projectName: '签证',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 8,
          projectName: '酒店',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
      ],
    };
  },
  methods: {
    changeNav: function (e) {
      if (e === 8) {
        safeWindowOpen('/Home/IndexNew');
      } else if (e == 0) {
        safeWindowOpen('/');
      } else {
        safeWindowOpen('/Product/IndexNew?projectId=' + e);
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
