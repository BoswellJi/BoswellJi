<template>
  <div class="pagination-component">
    <a
      class="turn-prev"
      :class="{ disabled: internalCurrentPage == 1 }"
      href="javascript:;"
      @click="prev"
    >
      <em class="djicon djicon-xg-leftarrow"></em>
    </a>
    <a href="javascript:;" :class="{ current: 1 == internalCurrentPage }" @click="onPagerClick"
      >1</a
    >
    <span v-if="showPrevMore" class="ellipsis">...</span>
    <a
      href="javascript:;"
      :class="{ current: item == internalCurrentPage }"
      :key="item"
      v-for="item in pagers"
      @click="onPagerClick"
      >{{ item }}</a
    >
    <span v-if="showNextMore" class="ellipsis">...</span>
    <a
      href="javascript:;"
      v-if="pageCount > 1"
      :class="{ current: pageCount == internalCurrentPage }"
      @click="onPagerClick"
      >{{ pageCount }}</a
    >
    <a
      class="turn-next"
      :class="{ disabled: pageCount <= 1 || internalCurrentPage == pageCount }"
      href="javascript:;"
      @click="next"
    >
      <em class="djicon djicon-xg-rightarrow"></em>
    </a>
  </div>
</template>

<script lang="ts">
// @ts-nocheck

export default {
  props: {
    currentPage: Number,
    pageCount: Number,
    pagerCount: {
      type: Number,
      default: 7,
    },
    disabled: Boolean,
  },
  data: function () {
    return {
      internalCurrentPage: 1,
    };
  },
  watch: {
    currentPage: {
      handler: function (e) {
        this.internalCurrentPage = e;
      },
      deep: !0,
    },
  },
  created: function () {
    this.internalCurrentPage = Math.min(this.currentPage, this.pageCount);
  },
  methods: {
    onPagerClick: function (e) {
      var t = Number(e.target.textContent),
        i = this.pageCount,
        n = this.internalCurrentPage;
      isNaN(t) || (t < 1 && (t = 1), t > i && (t = i)),
        t !== n && ((this.internalCurrentPage = t), this.emitChange());
    },
    prev: function () {
      if (!this.disabled && 1 != +this.internalCurrentPage) {
        var e = this.internalCurrentPage - 1;
        (this.internalCurrentPage = this.getValidCurrentPage(e)),
          this.$emit('prev-click', this.internalCurrentPage),
          this.emitChange();
      }
    },
    next: function () {
      if (!(this.disabled || this.pageCount <= 1 || this.internalCurrentPage === this.pageCount)) {
        var e = this.internalCurrentPage + 1;
        (this.internalCurrentPage = this.getValidCurrentPage(e)),
          this.$emit('next-click', this.internalCurrentPage),
          this.emitChange();
      }
    },
    getValidCurrentPage: function (e) {
      e = parseInt(e, 10);
      var t = 'number' == typeof this.internalPageCount,
        i = void 0;
      return (
        t
          ? e < 1
            ? (i = 1)
            : e > this.internalPageCount && (i = this.internalPageCount)
          : (isNaN(e) || e < 1) && (i = 1),
        void 0 === i && isNaN(e) ? (i = 1) : 0 === i && (i = 1),
        void 0 === i ? e : i
      );
    },
    emitChange: function () {
      this.$emit('change', this.internalCurrentPage);
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
