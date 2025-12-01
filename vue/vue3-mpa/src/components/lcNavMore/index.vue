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

export default {
  props: {
    currentProjectId: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      navList: [
        {
          projectId: 0,
          projectName: '旅仓主推',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 1,
          projectName: '特价',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
        {
          projectId: 2,
          projectName: '高利润',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1,
        },
      ],
    };
  },
  methods: {
    changeNav: function (e) {
      this.$emit('change', e);
    },
  },
};
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
