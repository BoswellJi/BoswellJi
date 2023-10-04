<template>
  <el-config-provider :locale="locale">
    <share-header :isShowNav="false" :isShowSearch="true"></share-header>
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
    <PageListItem
      ref="productList"
      v-for="item in navList"
      :key="item.projectId"
      v-show="currentProjectId == item.projectId"
      :data="item"
    />
    <share-footer></share-footer>
  </el-config-provider>
</template>

<script lang="ts">
// @ts-nocheck
import { safeWindowOpen } from '@/utils/util'

export default {
  data: function () {
    return {
      currentProjectId: cang.getquerystring('projectId') || 2,
      navList: [
        {
          projectId: 0,
          projectName: '首页',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1
        },
        {
          projectId: 1,
          projectName: '周边游',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1
        },
        {
          projectId: 2,
          projectName: '国内游',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1
        },
        {
          projectId: 3,
          projectName: '酒景玩乐',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1
        },
        {
          projectId: 4,
          projectName: '邮轮',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1
        },
        {
          projectId: 5,
          projectName: '出境游',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1
        },
        {
          projectId: 6,
          projectName: '全球玩乐',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1
        },
        {
          projectId: 7,
          projectName: '签证',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1
        },
        {
          projectId: 8,
          projectName: '酒店',
          handlerStyle: '',
          autoPosition: 0,
          isSelected: !1
        }
      ]
    }
  },
  mounted: function () {
    var e = this
    window.changeNav = e.changeNav
    window.onscroll = function () {
      var i = document.getElementById('product-box-' + e.currentProjectId),
        n = e.navList.find(function (t) {
          return t.projectId == e.currentProjectId
        })
      i &&
        n &&
        (window.scrollY > i.offsetTop ? (n.handlerStyle = 'fix-style') : (n.handlerStyle = ''))
    }
    window.getLineList = function () {
      window.lineList &&
        window.lineList.forEach(function (e) {
          e && e(1)
        })
    }
  },
  methods: {
    changeNav: function (e) {
      if (e === 8) {
        safeWindowOpen('/Home/IndexNew')
        return
      } else if (e === 0) {
        safeWindowOpen('/Home/Index')
      } else {
        this.currentProjectId = e
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
