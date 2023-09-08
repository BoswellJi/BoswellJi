<template>
  <div class="hander-box-wrap">
    <div
      class="hander-box"
      :class="handlerStyle"
      :style="{ left: autoPosition + 'px', right: autoPosition + 'px' }"
    >
      <div class="sort-box">
        <template v-for="item in sortList" :key="item.id">
          <span
            v-if="item.list"
            class="sort-item sort-item-select"
            :class="{ current: item.id == currentSortId }"
            @mouseover="handleEnter(item)"
            @mouseleave="handleLeaver"
          >
            {{ item.name }}
            <em
              class="djicon"
              :class="
                item.isShowPop ? 'djicon-wechat-upper-triangle' : 'djicon-wechat-lower-triangle'
              "
            ></em>
            <OptionPop
              v-show="item.isShowPop"
              :option-list="item.list"
              top="36"
              @change="changeSort"
            />
          </span>
          <span
            v-else
            class="sort-item"
            :class="{ current: item.id == currentSortId }"
            @click="changeSort(item.id)"
          >
            {{ item.name }}
          </span>
        </template>
      </div>
      <div class="filter-box">
        <div class="filter-left">
          <span
            class="filter-item"
            :class="{ current: selectDays }"
            @mouseover="handleEnter('Days')"
            @mouseleave="handleLeaver"
            v-show="daysList.length > 0"
          >
            {{ showDays }}
            <em
              class="djicon"
              :class="
                isShowDaysPop ? 'djicon-wechat-upper-triangle' : 'djicon-wechat-lower-triangle'
              "
            ></em>
            <OptionPop
              v-show="isShowDaysPop"
              :option-list="daysList"
              top="36"
              @change="changeDays"
            />
          </span>
          <div class="price-wrap" v-show="isShowPriceRange">
            <div class="price-box">
              <div class="input-wrap">
                <p class="input-box" :class="{ 'focus-style': isFocusMinPrice }">
                  <input
                    type="number"
                    placeholder="最低价"
                    v-model.number="currentMinPrice"
                    @focus="handleFocus('MinPrice')"
                    @blur="handleBlur('MinPrice')"
                  />
                </p>
                <span class="p-split">～</span>
                <p class="input-box" :class="{ 'focus-style': isFocusMaxPrice }">
                  <input
                    type="number"
                    placeholder="最高价"
                    v-model.number="currentMaxPrice"
                    @focus="handleFocus('MaxPrice')"
                    @blur="handleBlur('MaxPrice')"
                  />
                </p>
              </div>
              <p class="price-handle">
                <span class="btn-clear" @click="handleClear">清除价格</span>
                <span class="btn-ok" @click="handleOk">确认</span>
              </p>
            </div>
          </div>
        </div>
        <div class="filter-right">
          <span
            class="select-box"
            v-for="(item, index) in quickFilterList"
            :key="item.id"
            @click="changeQuick(index)"
          >
            <em
              class="djicon"
              :class="item.isSelected ? 'djicon-checkbox-o' : 'djicon-checkbox'"
            ></em
            >{{ item.name }}
          </span>
          <span class="select-box" @click="changeTh">
            <em class="djicon" :class="isSelectedTh ? 'djicon-checkbox-o' : 'djicon-checkbox'"></em
            >同行价
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck

export default {
  data: function () {
    return {
      currentDaysId: 0,
      currentDaysName: '',
      isSelectedTh: !1,
      currentSortId: this.sortId,
      isShowDaysPop: !1,
      isFocusMinPrice: !1,
      isFocusMaxPrice: !1,
      currentMinPrice: '',
      currentMaxPrice: '',
    };
  },
  props: {
    sortList: {
      Type: Array,
      Default: [],
    },
    daysList: {
      Type: Array,
      Default: [],
    },
    sortId: Number,
    isShowPriceRange: Boolean,
    autoPosition: Number,
    handlerStyle: String,
    quickFilterList: Array,
  },
  watch: {
    sortId: {
      handler: function (e) {
        this.currentSortId = e;
      },
      deep: !0,
    },
  },
  computed: {
    selectDays: function () {
      var e = this;
      return (
        -1 !==
        this.daysList.findIndex(function (t) {
          return t.id === e.currentDaysId;
        })
      );
    },
    showDays: function () {
      return this.selectDays ? this.currentDaysName : '游玩天数';
    },
  },
  methods: {
    changeSort: function (e) {
      'number' == typeof e
        ? (this.currentSortId = e)
        : ((this.currentSortId = e.id),
          this.sortList.forEach(function (t) {
            t.list &&
              t.list.forEach(function (i) {
                i.id == e.id && ((t.id = e.id), (t.name = e.name));
              });
          }),
          this.handleLeaver()),
        this.$emit('changeSortId', this.currentSortId);
    },
    changeTh: function () {
      (this.isSelectedTh = !this.isSelectedTh), this.$emit('update-th', this.isSelectedTh);
    },
    changeQuick: function (e) {
      var t = this.quickFilterList[e];
      (t.isSelected = !t.isSelected), this.$emit('changeQuick', t);
    },
    handleEnter: function (e) {
      'string' == typeof e ? (this['isShow' + e + 'Pop'] = !0) : (e.isShowPop = !0);
    },
    handleLeaver: function () {
      (this.isShowDaysPop = !1),
        this.sortList.forEach(function (e) {
          e.list && (e.isShowPop = !1);
        });
    },
    handleFocus: function (e) {
      this['isFocus' + e] = !0;
    },
    handleBlur: function (e) {
      this['isFocus' + e] = !1;
    },
    changeDays: function (e) {
      (this.currentDaysId = e.id),
        this.$emit('changeDaysId', this.currentDaysId),
        (this.currentDaysName = e.name),
        this.handleLeaver();
    },
    handleClear: function () {
      var e = this;
      (e.currentMinPrice = ''), (e.currentMaxPrice = '');
    },
    handleOk: function () {
      var e = this;
      e.$emit('changePriceRange', e.currentMinPrice, e.currentMaxPrice);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
