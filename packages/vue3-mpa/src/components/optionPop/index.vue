<template>
  <div class="OptionPop-component">
    <div class="pop-cont" :style="{ 'margin-top': top + 'px' }">
      <p class="option-item" v-for="item in optionList" :key="item.id" @click="handleClick(item)">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck

export default {
  props: {
    top: [Number, String],
    optionList: {
      type: Array,
      default: function () {
        return [
          {
            id: 1,
            name: '111',
          },
          {
            id: 2,
            name: '222',
          },
        ];
      },
    },
  },
  data: function () {
    return {};
  },
  methods: {
    handleClick: function (e) {
      this.$emit('change', e);
    },
  },
  computed: {
    showPrevMore: function () {
      var e = this.pagerCount,
        t = (e - 1) / 2,
        i = Number(this.internalCurrentPage);
      return Number(this.pageCount) > e && i > e - t;
    },
    showNextMore: function () {
      var e = this.pagerCount,
        t = (e - 1) / 2,
        i = Number(this.internalCurrentPage),
        n = Number(this.pageCount);
      return n > e && i < n - t;
    },
    pagers: function () {
      var e = this.pagerCount,
        t = Number(this.internalCurrentPage),
        i = Number(this.pageCount),
        n = this.showPrevMore,
        r = this.showNextMore,
        s = [];
      if (n && !r) for (var a = i - (e - 2), c = a; c < i; c++) s.push(c);
      else if (!n && r) for (var o = 2; o < e; o++) s.push(o);
      else if (n && r) for (var l = Math.floor(e / 2) - 1, d = t - l; d <= t + l; d++) s.push(d);
      else for (var u = 2; u < i; u++) s.push(u);
      return s;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
