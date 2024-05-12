<template>
  <div class="content">
    <div class="filter-wrap card-box">
      <div class="filter-selectbox" v-if="selectFilterList?.length">
        <span class="item-name">您已选择</span>
        <div class="item-list">
          <div class="select-label" v-for="(item, index) in selectFilterList" :key="item.prop">
            <span class="label-name">{{ item.type }}</span>
            <span class="label-item"
              ><span class="label-item-text">{{ item.names }}</span></span
            >
            <span class="label-close djicon djicon-closetwo" @click="handleFilterDel(index)"></span>
          </div>
        </div>
        <div class="item-right">
          <span class="handle-btn" @click="handleFilterClear">清空</span>
        </div>
      </div>
      <div
        class="filter-item"
        v-for="(item, index) in filterList"
        :key="item.prop"
        v-show="getFilterIsShow(item, index)"
      >
        <span class="item-name">{{ item.type }}</span>
        <div
          class="item-box"
          :class="{ 'multi-style': item.showMulti, 'more-style': item.isShowMore }"
        >
          <div class="item-list">
            <span
              class="item"
              :class="{ selected: subitem.isSelected }"
              v-for="(subitem, subIdx) in item.list"
              :key="subitem.id"
              @click="handleSelect(index, subIdx)"
            >
              <em
                v-if="item.showMulti"
                class="djicon"
                :class="subitem.isCheckSelected ? 'djicon-checkbox-o' : 'djicon-checkbox'"
                @click.stop="handleCheckSelect(index, subIdx)"
              ></em
              >{{ subitem.name }}
              <el-icon :style="{ opacity: subitem.isSelected ? 1 : 0 }"><Check /></el-icon>
            </span>
          </div>
          <p class="btn-box" v-if="item.showMulti">
            <span class="btn-ok" @click="handleMultiSelect(index)">确认</span>
            <span class="btn-cancel" @click="handleCloseMulti(index)">取消</span>
          </p>
        </div>
        <template v-if="!item.showMulti">
          <span class="item-more" @click="toggleItemMore(index)" v-if="getFilterMoreIsShow(item)">
            <template v-if="!item.isShowMore">
              更多<em class="djicon djicon-icon-under-the-arrowhead"></em>
            </template>
            <template v-else> 收起<em class="djicon djicon-icon-on-the-arrowhead"></em> </template>
          </span>
          <div class="item-right">
            <span class="handle-btn" v-if="item.multi" @click="handleOpenMulti(index)">多选</span>
          </div>
        </template>
      </div>
      <div class="more-box" v-if="getFilterAllMoreIsShow()">
        <span class="more-text" @click="toggleMore">
          <template v-if="!showMore">
            更多<em class="djicon djicon-icon-under-the-arrowhead"></em>
          </template>
          <template v-else> 收起<em class="djicon djicon-icon-on-the-arrowhead"></em> </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck

export default {
  props: {
    filterList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    selectFilterList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data: function () {
    return {
      limitNum: 5,
      showMore: !1,
    };
  },
  methods: {
    toggleMore: function () {
      this.showMore = !this.showMore;
    },
    handleSelect: function (e, t) {
      var i = this,
        n = i.filterList[e],
        r = n.list,
        s = r[t];
      n.showMulti ||
        (n.multi ||
          r.forEach(function (e) {
            e.isSelected = !1;
          }),
        (s.isSelected = !0),
        (s.isCheckSelected = !0),
        i.updateSelectFilterList(n.prop));
    },
    handleCheckSelect: function (e, t) {
      var i = this.filterList[e].list[t];
      i.isCheckSelected = !i.isCheckSelected;
    },
    handleMultiSelect: function (e) {
      var t = this.filterList[e];
      t.list.forEach(function (e) {
        e.isSelected = e.isCheckSelected || !1;
      });
      t.showMulti = false;
      this.updateSelectFilterList(t.prop);
    },
    updateSelectFilterList: function (e) {
      var t = this,
        i = t.filterList.find(function (t) {
          return t.prop === e;
        }),
        n = t.selectFilterList.findIndex(function (t) {
          return t.prop === e;
        }),
        r = t.selectFilterList.find(function (t) {
          return t.prop === e;
        }),
        s = i.list.filter(function (e) {
          return !!e.isSelected;
        });
      if (0 !== s.length) {
        n > -1 &&
          (s.forEach(function (e) {
            -1 ==
              r.selectItems.findIndex(function (t) {
                return t.id == e.id;
              }) && i.showMulti
              ? r.selectItems.push(e)
              : (r.selectItems = [e]);
          }),
          (s = r.selectItems),
          t.selectFilterList.splice(n, 1));
        var a = {
          prop: i.prop,
          param: i.param,
          type: i.type,
          ids: i.multi
            ? s.map(function (e) {
                return e.id;
              })
            : s[0].id,
          names: s
            .map(function (e) {
              return e.name;
            })
            .join('，'),
          selectItems: s,
        };
        t.selectFilterList.splice(-1 === n ? t.selectFilterList.length : n, 0, a),
          t.$emit('filterChange');
      }
    },
    handleFilterDel: function (e) {
      var t = this,
        i = t.filterList.find(function (i) {
          return i.prop === t.selectFilterList[e].prop;
        });
      i &&
        i.list.forEach(function (e) {
          (e.isSelected = !1), (e.isCheckSelected = !1);
        }),
        t.selectFilterList.splice(e, 1),
        t.$emit('filterChange');
    },
    handleFilterClear: function () {
      var e = this;
      e.filterList.forEach(function (e) {
        e.list.forEach(function (e) {
          (e.isSelected = !1), (e.isCheckSelected = !1);
        });
      }),
        (e.selectFilterList.length = 0),
        e.$emit('filterChange');
    },
    handleOpenMulti: function (e) {
      var t = this.filterList[e];
      t.list.forEach(function (e) {
        e.isCheckSelected = e.isSelected || !1;
      });
      t.showMulti = !0;
    },
    handleCloseMulti: function (e) {
      var t = this.filterList[e];
      t.list.forEach(function (e) {
        e.isSelected = false;
        e.isCheckSelected = false;
      });
      t.showMulti = false;
    },
    toggleItemMore: function (e) {
      var t = this,
        i = t.filterList[e];
      i.isShowMore = !i.isShowMore;
    },
    getFilterIsShow: function (e, t) {
      var i = this;
      return (
        i.filterList.forEach(function (e, i) {
          i < t && 0 == e.list.length && t--;
        }),
        e.list.length > 0 && (i.showMore || t < i.limitNum)
      );
    },
    getFilterMoreIsShow: function (e) {
      if (e && e.list && e.list.length > 0) {
        var t = 0;
        if (
          (e.list.forEach(function (e) {
            if (((t += 63), e && e.name))
              for (var i = 0; i < e.name.length; i++)
                /[\u4E00-\u9FA5]+/.test(e.name[i]) ? (t += 12) : (t += 7);
          }),
          t >= 940)
        )
          return !0;
      }
      return !1;
    },
    getFilterAllMoreIsShow: function () {
      var e = this;
      return (
        e.filterList.filter(function (e) {
          return e.list.length > 0;
        }).length > e.limitNum
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
