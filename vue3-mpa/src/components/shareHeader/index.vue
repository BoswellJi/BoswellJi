<template>
  <div class="page-list">
    <div class="menu-wrapper">
      <div class="top-menu">
        <div class="left">
          <div class="member-text" @mouseover="handleEnter('Loginout')" @mouseleave="handleLeaver">
            <span
              >{{ loginUser.Name
              }}<em
                class="djicon"
                :class="
                  isShowLoginoutPop
                    ? 'djicon-icon-on-the-arrowhead'
                    : 'djicon-icon-under-the-arrowhead'
                "
              ></em
            ></span>
            <div class="loginout-pop" v-show="isShowLoginoutPop">
              <div class="pop-cont"><a @click="loginOut">退出登录</a></div>
            </div>
          </div>
          <div class="manager-text" @mouseover="handleEnter('Manager')" @mouseleave="handleLeaver">
            <em class="djicon-other-restrictss"></em>您的专属客户经理：<span
              >{{ businessExecutive.BusinessExecutiveName
              }}<em
                class="djicon djicon-arrowdown"
                :class="
                  isShowManagerPop
                    ? 'djicon-icon-on-the-arrowhead'
                    : 'djicon-icon-under-the-arrowhead'
                "
              ></em
            ></span>
            <div class="manager-pop" v-show="isShowManagerPop">
              <div class="pop-cont">
                <img class="wx-code" :src="businessExecutive.WeWorkQRCode" alt="" />
                <p class="wx-text">
                  扫码添加{{ businessExecutive.BusinessExecutiveName }}的企业微信
                </p>
                <p v-if="businessExecutive.BusinessExecutivePhone" class="phone-text">
                  {{ businessExecutive.BusinessExecutiveName }}手机：<span>{{
                    businessExecutive.BusinessExecutivePhone
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="link-list">
            <a href="/member/memberinfo">我的旅仓</a>
            <div class="link-order">
              <a href="/member/orderList">我的订单</a>
              <a :href="`/member/orderList?key=${escapeHandle('待确认')}`">
                待确认
                <span class="order-num">{{ unConfirmOrderNum }}</span>
              </a>
              <a :href="`/member/orderList?key=${escapeHandle('待付款')}`">
                待支付
                <span class="order-num">{{ unpaidOrderNum }}</span>
              </a>
            </div>
            <a href="/helper/helpcenter">帮助中心</a>
          </div>
          <span
            class="djicon djicon-miniapp"
            @mouseover="handleEnter('TopMiniapp')"
            @mouseleave="handleLeaver"
          >
            <div class="miniapp-pop" v-show="isShowTopMiniappPop">
              <div class="pop-cont">
                <img class="miniapp-code" src="//pic5.40017.cn/i/ori/1bYYb7289tm.png" alt="" />
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="top-search">
      <div class="content">
        <div class="top-box">
          <a class="logo" href="/"></a>
          <div class="middle-search" v-if="isShowSearch">
            <div class="city-box" @mouseover="handleEnter('City')" @mouseleave="handleLeaver">
              {{ currentCityName
              }}<span
                class="djicon"
                :class="
                  isShowCityPop ? 'djicon-icon-on-the-arrowhead' : 'djicon-icon-under-the-arrowhead'
                "
              ></span>
              <div class="city-pop" v-show="isShowCityPop">
                <div class="pop-cont">
                  <div class="city-inputbox">
                    <input
                      type="text"
                      v-model="citySearchVal"
                      placeholder="搜索城市 (支持汉字，首字母查询)"
                    />
                  </div>
                  <div class="city-search-result" v-if="citySearchVal">
                    <p class="list-box" v-if="citySearchList.length > 0">
                      <span
                        class="list-item"
                        v-for="item in citySearchList"
                        :key="item.id"
                        @click="changeCity(item)"
                        >{{ item.name }}</span
                      >
                    </p>
                    <p class="city-search-no-result" v-else>
                      很抱歉，暂无"{{ citySearchVal }}"出发的线路，请重新输入或选择！
                    </p>
                  </div>
                  <div class="city-tabs">
                    <span
                      class="tabs-item"
                      :class="{ selected: currentCityTypeIndex == index }"
                      v-for="(item, index) in cityList"
                      :key="item.type"
                      @click="changeCityType(index)"
                      >{{ item.type }}</span
                    >
                  </div>
                  <div
                    class="city-list"
                    v-for="(item, index) in cityList"
                    :key="item.type"
                    v-show="currentCityTypeIndex == index"
                  >
                    <div class="pinyin-list" v-for="pinyin in item.plist" :key="pinyin.pinyin">
                      <span class="pinyin" v-if="pinyin.pinyin">{{ pinyin.pinyin }}</span>
                      <div class="list-box">
                        <span
                          class="list-item"
                          v-for="city in pinyin.list"
                          :key="city.id"
                          @click="changeCity(city)"
                          >{{ city.name }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="search-box">
              <span
                class="project-type"
                @mouseover="handleEnter('Project')"
                @mouseleave="handleLeaver"
              >
                {{ currentProjectName
                }}<em
                  class="djicon"
                  :class="
                    isShowProjectPop
                      ? 'djicon-icon-on-the-arrowhead'
                      : 'djicon-icon-under-the-arrowhead'
                  "
                ></em>
                <div class="project-pop" v-show="isShowProjectPop">
                  <div class="pop-cont">
                    <p
                      class="project-item"
                      v-for="item in projectList"
                      :key="item.id"
                      @click="changeProject(item.id)"
                    >
                      {{ item.name }}
                    </p>
                  </div>
                </div>
              </span>
              <span class="search-split"></span>
              <input
                class="search-input"
                type="text"
                v-model.trim="searchVal"
                placeholder="请输入目的地、产品名称或产品ID"
                @focus="handleEnterFocus('HotSearch')"
                @blur="handleBlur"
                @keyup.enter="handleSearch"
                @input="searchProduct"
                @click.stop=""
                ref="searchInput"
              />
              <span class="btn-search" @click="handleSearch">
                <el-icon :size="30"><Search /></el-icon>
              </span>

              <div class="search-product-box" v-show="searchPanelShow">
                <div class="pop-cont">
                  <div v-for="(item, index) of searchList" :key="index">
                    <div
                      class="search-product-production"
                      v-for="item1 of item.lineList"
                      :key="item1.uid"
                      @click.stop="searchJump(item1)"
                    >
                      <div
                        class="search-product-title line1"
                        v-html="item1.title"
                        :data-item="item"
                      ></div>
                      <div class="search-product-price">
                        <span class="search-product-money">¥{{ item1.price }}</span
                        ><span class="search-product-label">起</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="hotsearch-pop" v-show="isShowHotSearchPop">
                <div class="pop-cont">
                  <div class="hotsearch-list">
                    <p class="hotsearch-list-title">
                      <span>您最近在搜</span>
                      <span class="hotsearch-list-clear" @click="clearHistory">清空</span>
                    </p>
                    <div class="hotsearch-list-items">
                      <span
                        class="item"
                        v-for="(item, index) in searchHistoryList"
                        :key="index"
                        @click="handleHotSearch(item)"
                        >{{ item }}</span
                      >
                    </div>
                  </div>
                  <div class="hotsearch-list">
                    <p class="hotsearch-list-title">热门搜索</p>
                    <div class="hotsearch-list-items">
                      <span
                        class="item"
                        v-for="(item, index) in hotSearchList"
                        :key="index"
                        @click="handleHotSearch(item)"
                        >{{ item }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="icon-phone"></div>
            <div class="text-box">
              <p class="main-text">专属客户经理</p>
              <p class="sub-text">7x24小时服务支持</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <navParent v-if="isShowNav" :current-project-id="navCurrentProjectId" />
    <div class="right-fix" v-if="isShowRightFix">
      <div class="right-fix-box">
        <div
          class="right-fix-cot"
          @mouseover="handleEnter('RightMiniapp')"
          @mouseleave="handleLeaver"
        >
          <p class="icon icon-minicode"></p>
          <p class="text">旅仓宝</p>
          <div class="miniapp-pop" v-show="isShowRightMiniappPop">
            <div class="pop-cont">
              <img class="miniapp-code" src="//pic5.40017.cn/i/ori/1bYYb7289tm.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="right-fix-box right-fix-box-center">
        <div class="right-fix-cot" @click="redirect('/member/orderList')">
          <p class="icon icon-order"></p>
          <p class="text">我的订单</p>
        </div>
        <div class="right-fix-cot" @click="open('/member/collect')">
          <p class="icon icon-favour"></p>
          <p class="text">我的收藏</p>
        </div>
        <div class="right-fix-cot" @click="isShowFeedback = !isShowFeedback">
          <p class="icon icon-feedback"></p>
          <p class="text">意见反馈</p>
        </div>
        <div id="right-fix-feedback" v-show="isShowFeedback">
          <div class="fb-title">
            <span>意见反馈</span>
            <span class="fb-close" @click="isShowFeedback = false">关闭</span>
          </div>
          <div class="item-box">
            <div>问题类型</div>
            <div class="item-list">
              <span
                class="item"
                v-for="(feedback, index) in feedbackTypeList"
                :key="index"
                @click="feedbackType = feedback.id"
              >
                <em
                  class="djicon"
                  :class="
                    feedback.id == feedbackType
                      ? 'djicon-v-radiobutton-check'
                      : 'djicon-v-radiobutton-uncheck'
                  "
                ></em>
                <span class="item-text">{{ feedback.name }}</span>
              </span>
            </div>
          </div>
          <div>
            <div>
              <span>问题描述</span>
              <span class="fb-textarea-info-warning" v-show="isShowFeedbackWarning"
                >请填写问题信息</span
              >
            </div>
            <div>
              <textarea
                v-model="feedbackVal"
                class="fb-textarea-info"
                :class="isShowFeedbackWarning ? 'warning' : ''"
                maxlength="200"
              ></textarea>
              <p class="fb-textarea-desc">请填写描述信息，少于200字</p>
            </div>
          </div>
          <div class="fb-foot">
            <span class="fb-btn-submit" @click="feedbackSubmit">提交</span>
            <div>{{ feedbackSubmitDesc }}</div>
          </div>
        </div>
        <div class="right-fix-cot" v-if="false">
          <p class="icon icon-customer"></p>
          <p class="text">联系客服</p>
        </div>
      </div>
      <div class="right-fix-box">
        <div class="right-fix-cot" @click="backtop">
          <p class="icon icon-backtop"></p>
          <p class="text">回到顶部</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { safeWindowOpen } from '@/utils/util';
import { debounce } from 'lodash';
import request from '@/utils/request';

declare const $: object;
declare const cang: object;
const PAGE_LIST_SEARCH_KEY = 'PAGE_LIST_SEARCH_KEY';

export default {
  props: {
    isShowNav: {
      type: Boolean,
      default: false,
    },
    isShowSearch: {
      type: Boolean,
      default: false,
    },
    isShowRightFix: {
      type: Boolean,
      default: false,
    },
    navCurrentProjectId: {
      type: Number,
      default: 8,
    },
  },
  data: function () {
    var e = this;
    return {
      loginUser: {},
      businessExecutive: {},
      isShowLoginoutPop: !1,
      isShowManagerPop: !1,
      isShowTopMiniappPop: !1,
      isShowRightMiniappPop: !1,
      isShowFeedback: !1,
      isShowFeedbackWarning: !1,
      projectList: [
        {
          id: 0,
          name: '全部',
        },
        {
          id: 1,
          name: '周边游',
        },
        {
          id: 2,
          name: '国内游',
        },
        {
          id: 3,
          name: '酒景玩乐',
        },
        {
          id: 4,
          name: '邮轮',
        },
        {
          id: 5,
          name: '出境游',
        },
        {
          id: 6,
          name: '全球玩乐',
        },
        {
          id: 7,
          name: '签证',
        },
      ],
      cityList: [
        {
          type: '热门',
          plist: [
            {
              pinyin: '华北',
              list: [
                {
                  id: 53,
                  name: '北京',
                },
                {
                  id: 343,
                  name: '天津',
                },
                {
                  id: 307,
                  name: '太原',
                },
                {
                  id: 261,
                  name: '包头',
                },
                {
                  id: 264,
                  name: '呼和浩特',
                },
              ],
            },
            {
              pinyin: '华东',
              list: [
                {
                  id: 321,
                  name: '上海',
                },
                {
                  id: 226,
                  name: '苏州',
                },
                {
                  id: 224,
                  name: '南京',
                },
                {
                  id: 233,
                  name: '镇江',
                },
                {
                  id: 383,
                  name: '杭州',
                },
                {
                  id: 232,
                  name: '扬州',
                },
                {
                  id: 292,
                  name: '青岛',
                },
                {
                  id: 229,
                  name: '无锡',
                },
                {
                  id: 384,
                  name: '湖州',
                },
                {
                  id: 225,
                  name: '南通',
                },
                {
                  id: 388,
                  name: '宁波',
                },
                {
                  id: 391,
                  name: '温州',
                },
                {
                  id: 287,
                  name: '济南',
                },
              ],
            },
            {
              pinyin: '华南',
              list: [
                {
                  id: 80,
                  name: '广州',
                },
                {
                  id: 91,
                  name: '深圳',
                },
                {
                  id: 79,
                  name: '佛山',
                },
                {
                  id: 97,
                  name: '珠海',
                },
                {
                  id: 61,
                  name: '厦门',
                },
              ],
            },
            {
              pinyin: '华中',
              list: [
                {
                  id: 192,
                  name: '武汉',
                },
                {
                  id: 199,
                  name: '长沙',
                },
                {
                  id: 163,
                  name: '郑州',
                },
                {
                  id: 150,
                  name: '安阳',
                },
                {
                  id: 197,
                  name: '宜昌',
                },
                {
                  id: 42,
                  name: '合肥',
                },
              ],
            },
            {
              pinyin: '西北',
              list: [
                {
                  id: 317,
                  name: '西安',
                },
                {
                  id: 69,
                  name: '兰州',
                },
                {
                  id: 364,
                  name: '乌鲁木齐',
                },
                {
                  id: 274,
                  name: '银川',
                },
                {
                  id: 281,
                  name: '西宁',
                },
                {
                  id: 312,
                  name: '宝鸡',
                },
              ],
            },
            {
              pinyin: '西南',
              list: [
                {
                  id: 373,
                  name: '昆明',
                },
                {
                  id: 374,
                  name: '丽江',
                },
                {
                  id: 324,
                  name: '成都',
                },
                {
                  id: 394,
                  name: '重庆',
                },
                {
                  id: 333,
                  name: '绵阳',
                },
              ],
            },
            {
              pinyin: '东北',
              list: [
                {
                  id: 256,
                  name: '沈阳',
                },
                {
                  id: 248,
                  name: '大连',
                },
                {
                  id: 214,
                  name: '长春',
                },
                {
                  id: 170,
                  name: '哈尔滨',
                },
              ],
            },
          ],
        },
        {
          type: 'ABCDEF',
          plist: [],
        },
        {
          type: 'GHJKLM',
          plist: [],
        },
        {
          type: 'NPQRS',
          plist: [],
        },
        {
          type: 'TWXYZ',
          plist: [],
        },
      ],
      citySearchList: [],
      hotSearchList: ['云南', '三亚', '新疆', '成都', '西藏', '张家界', '贵州', '广西'],
      currentProjectId: 0,
      currentProjectName: '全部',
      isShowProjectPop: !1,
      isShowHotSearchPop: !1,
      isShowCityPop: !1,
      currentCityTypeIndex: 0,
      currentCityId: 226,
      currentCityName: '苏州',
      citySearchVal: '',
      searchVal: window.unescape(cang.getquerystring('key') || ''),
      searchHistoryList: [],
      searchHistoryMax: 8,
      feedbackTypeList: [
        {
          id: 1,
          name: '系统问题',
          check: !0,
        },
        {
          id: 3,
          name: '订单问题',
          check: !1,
        },
        {
          id: 2,
          name: '资源问题',
          check: !1,
        },
        {
          id: 4,
          name: '其他问题',
          check: !1,
        },
      ],
      feedbackType: 1,
      feedbackVal: '',
      feedbackSubmitDesc: '',

      searchPanelShow: false,
      searchList: [],

      unConfirmOrderNum: 0,
      unpaidOrderNum: 0,
    };
  },
  computed: {},
  watch: {
    citySearchVal: function (e) {
      var i = this;
      i.citySearchList = (function () {
        var n = [];
        return (
          i.cityList.forEach(function (i, t) {
            if (0 == t) return !0;
            i.plist.forEach(function (i) {
              i.list.forEach(function (i) {
                (i.name.indexOf(e) > -1 || i.pinyin.toLowerCase().indexOf(e.toLowerCase()) > -1) &&
                  n.push(i);
              });
            });
          }),
          n
        );
      })();
    },
    searchVal: {
      handler: function (e) {
        this.storage('keyword', e);
      },
      deep: !0,
    },
  },
  mounted: function () {
    var e = this;
    e.init();
    document.addEventListener('click', e.hideSearchPanel.bind(e), false);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hideSearchPanel.bind(this), false);
  },
  methods: {
    init: function () {
      var e = this;
      const key = e.storage(PAGE_LIST_SEARCH_KEY);
      if (!key) {
        e.storage(PAGE_LIST_SEARCH_KEY, []);
      } else {
        e.searchHistoryList = Array.isArray(key) ? key : [];
      }

      cang.getquerystring('keywrod') &&
        (e.searchVal = decodeURIComponent(cang.getquerystring('keywrod'))),
        e.storage('keyword', e.searchVal),
        e.backtop(),
        e.initPro(),
        e.initCity(),
        e.getLoginUser(),
        e.getBusinessExecutive(),
        e.getCityList();
      this.getOrderCount();
    },
    async getOrderCount() {
      const {
        data: { unConfirm, unPay },
      } = await request({
        url: '/webapi/memberOrder/orderCount',
        method: 'get',
      });
      this.unConfirmOrderNum = unConfirm;
      this.unpaidOrderNum = unPay;
    },
    initPro: function () {
      var e = this;
      e.changeProject(e.currentProjectId);
    },
    initCity: function () {
      var e = this,
        i = e.storage('startcity');
      i && i.id > 0
        ? ((e.currentCityId = i.id), (e.currentCityName = i.name))
        : (e.storage(
            'startcity',
            {
              id: e.currentCityId,
              name: e.currentCityName,
            },
            43200,
          ),
          localStorage.setItem('tagcity', e.currentCityName + '|' + e.currentCityId));
    },
    storage: function (e, i, n, t) {
      if (e) {
        n ? (n *= 1000) : (n = 2592000000);
        if (!i && '' !== i) {
          i = localStorage.getItem(e);
          i && (i = JSON.parse(i));
          i && (i = new Date().getTime() > i.time ? t || {} : i.value);
          return i;
        }
        i = {
          value: i,
          time: new Date().getTime() + n,
        };
        localStorage.setItem(e, JSON.stringify(i));
        return i.value;
      }
    },
    removeStorage: function (e) {
      localStorage.removeItem(e);
    },
    escapeHandle(text) {
      return window.escape(text);
    },
    getLoginUser: function () {
      var e = this;
      $.ajax({
        url: cang.root + '/Home/GetCurrentUser',
        dataType: 'json',
        success: function (i) {
          i && (e.loginUser = i);
        },
      });
    },
    getBusinessExecutive: function () {
      var e = this;
      $.ajax({
        url: cang.root + '/CommonManage/GetBusinessExecutive',
        dataType: 'json',
        success: function (i) {
          i && ((e.businessExecutive = i), e.getWeWorkQRCode());
        },
      });
    },
    getWeWorkQRCode: function () {
      var e = this;
      $.ajax({
        url:
          cang.root +
          '/CommonManage/GetWeWorkQRCode?TcJobNum=' +
          e.businessExecutive.BusinessExecutiveTCNum,
        dataType: 'json',
        success: function (i) {
          i && (e.businessExecutive.WeWorkQRCode = i.Data);
        },
      });
    },
    loginOut: function () {
      var e = this;
      e.removeStorage('newkf'),
        e.removeStorage('tagcity'),
        $.ajax({
          url: cang.root + '/account/loginOut',
          type: 'post',
          dataType: 'text',
          success: function () {
            window.location.href = cang.root + '/account/login';
          },
        });
    },
    getCityList: function () {
      var e = this,
        i = [],
        n = function () {
          e.cityList.forEach(function (e, n) {
            if (0 == n) return !0;
            i.forEach(function (i) {
              e.type.indexOf(i.FirstLetter) > -1 &&
                e.plist.push({
                  pinyin: i.FirstLetter,
                  list: i.CityList.map(function (e) {
                    return {
                      id: e.CityId,
                      name: e.CityName,
                      pinyin: e.Pinyin,
                    };
                  }),
                });
            });
          });
        };
      (i = e.storage('pubcity')),
        i
          ? n()
          : $.ajax({
              url: cang.root + '/commonmanage/GetCityList',
              dataType: 'json',
              success: function (e) {
                e && e.CityList && ((i = e.CityList), n());
              },
            });
    },
    handleEnterFocus(e) {
      if (this.searchVal) {
        this.$refs.searchInput.focus();
        this.searchProduct();
        if (this.searchList?.length) {
          this.searchPanelShow = true;
        }
      } else {
        this.handleEnter(e);
      }
    },
    handleEnter: function (e) {
      this['isShow' + e + 'Pop'] = true;
    },
    handleLeaver: function () {
      (this.isShowLoginoutPop = !1),
        (this.isShowManagerPop = !1),
        (this.isShowTopMiniappPop = !1),
        (this.isShowRightMiniappPop = !1),
        (this.isShowProjectPop = !1),
        (this.isShowHotSearchPop = !1),
        (this.isShowCityPop = !1);
    },
    redirect: function (e) {
      location.href = e;
    },
    open: function (e) {
      window.open(e);
    },
    changeProject: function (e) {
      var i = this,
        n = this.projectList[0];
      i.projectList.forEach(function (i) {
        i.id == e && (n = i);
      }),
        (i.currentProjectId = n.id),
        (i.currentProjectName = n.name),
        i.handleLeaver();
    },
    changeCityType: function (e) {
      this.currentCityTypeIndex = e;
    },
    changeCity: function (e) {
      var i = this,
        n = window.location.href.split('/')[3].toLowerCase();
      (i.currentCityId = e.id),
        (i.currentCityName = e.name),
        (i.citySearchVal = ''),
        i.storage(
          'startcity',
          {
            id: e.id,
            name: e.name,
          },
          600,
        ),
        localStorage.setItem('tagcity', e.name + '|' + e.id),
        ['product', 'index', 'home', 'domestic', 'domesticself', ''].indexOf(n) > -1 &&
          location.reload(),
        i.handleLeaver();
    },
    hideSearchPanel: function () {
      this.searchPanelShow = false;
    },
    searchJump: function (e) {
      var bizType = e.bizType;
      var id = e.resourceId;
      var that = this;
      var urlMap = {
        // 周边游
        shortTour: '/AroundGroup/Detail?LineId=',
        // 国内游
        domesticTour: '/domestic/detail?LineId=',
        domesticTour_pkg: '/domestic/detail?LineId=',
        domesticTour_fdm: '/domestic/detail?LineId=',
        domesticTour_dgp: '/domestic/detail?LineId=',
        // 出境游
        abroadTour: '/abroad/NewDetail?lineId=',
        abroadTour_pkg: '/abroad/NewDetail?lineId=',
        abroadTour_fdm: '/abroad/NewDetail?lineId=',
        abroadTour_dgp: '/abroad/NewDetail?lineId=',
        // 签证
        visa: '/Visa/VisaInfo?visaId=',
        // 邮轮
        cruise: '/Cruise/Detail?LineId=',
        // 全球玩乐
        abroadFun: '/singleproduct/detail?productId=',

        // 酒景玩乐
        sceneryHotel: '/vitaminproduct/detail?ProductNo=',
        scenery: '/vitaminproduct/detail?ProductNo=',

        // 全球玩乐 对应singleType
        abroadFood: '/singleproduct/detail?productId=',
        abroadExperience: '/singleproduct/detail?productId=',
        abroadTraffic: '/singleproduct/detail?productId=',
        globalWifi: '/singleproduct/detail?productId=',
        foreignScenery: '/singleproduct/detail?productId=',
      };
      var domesticTour = [
        'domesticTour',
        'domesticTour_pkg',
        'domesticTour_fdm',
        'domesticTour_dgp',
      ];
      // 国内游，两种详情页
      if (domesticTour.includes(bizType)) {
        var i = id;
        $.ajax({
          url: cang.root + '/Product/DomesticIsStatic?lineid=' + i,
          datatype: 'json',
          success: function (n) {
            if (n && n !== 'false')
              window.open('/Domestic/Detail?LineId=' + i + '&s=0,1&code=100000');
            else {
              var t = that.storage('startcity') || {};
              window.open(
                '/DomesticSelf/Detail?LineId=' + i + '&s=0,1&code=100000&depid=' + (t.id || 0),
              );
            }
          },
          error: function () {
            window.open('/Domestic/Detail?LineId=' + i + '&s=0,1&code=100000');
          },
        });
      } else if (urlMap[bizType]) {
        window.open(urlMap[bizType] + '' + id);
      }
    },
    searchProduct: debounce(function () {
      var that = this;
      var searchVal = this.searchVal;
      var currentCityId = this.currentCityId;
      var currentProjectName = that.currentProjectName;
      this.isShowHotSearchPop = false;

      if (currentProjectName !== '全部') return;

      // 输入框为空
      if (!that.searchVal) {
        that.searchPanelShow = false;
        that.isShowHotSearchPop = true;
        that.searchList = [];
        that.currentProjectId = 2;
      }

      if (that.preRequest) {
        that.preRequest.abort();
      }
      that.preRequest = $.ajax({
        url: cang.root + '/webapi/lvHu/fullTextSearch',
        type: 'post',
        data: JSON.stringify({
          keyword: searchVal,
          locationCity: currentCityId,
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        dataType: 'json',
        success: function (res) {
          var data = res.data || {};
          var result = data.records;

          if (!result || !searchVal) {
            that.searchList = [];
            that.searchPanelShow = false;
            return;
          }

          let arr = [{ lineList: Array.isArray(result) ? result : [] }];

          if (Array.isArray(result) && result.length) {
            that.searchPanelShow = true;
          } else {
            that.searchPanelShow = false;
          }
          that.searchList = arr;
        },
      });
    }, 300),
    handleHotSearch: function (e) {
      var i = this;
      i.searchVal = e;
      i.storage('keyword', e);

      if (i.currentProjectName === '全部') {
        this.$refs.searchInput.focus();
        this.searchProduct();
        return;
      }

      cang.trackpoint({
        keyname: '弹出热门搜索',
        keyid: 1,
        valuename: e,
        codename: '大搜索',
        code: '0',
      });
      i.handleSearch();
      i.handleLeaver();
    },
    handleSearch: function () {
      var e = this,
        i = e.searchVal.replace(/ /g, ''),
        n = /^[0-9]*$/;

      e.updateHistory();
      if (e.currentProjectName === '全部') {
        var list = e.searchList;
        var lineList = [];
        list.forEach(function (item) {
          item.lineList.forEach(function (item1) {
            lineList.push(item1);
          });
        });
        if (lineList.length) {
          if (lineList.length === 1) {
            e.searchJump(lineList[0]);
          } else {
            var line = lineList[0];
            var bizType = line.bizType;
            // 国内游
            var domesticTour = [
              'domesticTour',
              'domesticTour_pkg',
              'domesticTour_fdm',
              'domesticTour_dgp',
            ];
            // 酒景玩乐
            var scenery = ['sceneryHotel', 'scenery'];
            // 周边游
            var shortTour = ['shortTour'];
            // 邮轮
            var cruise = ['cruise'];
            // 出境游
            var abroadTour = ['abroadTour', 'abroadTour_pkg', 'abroadTour_fdm', 'abroadTour_dgp'];

            if (domesticTour.includes(bizType)) {
              e.currentProjectId = 2;
            } else if (shortTour.includes(bizType)) {
              e.currentProjectId = 1;
            } else if (scenery.includes(bizType)) {
              e.currentProjectId = 3;
            } else if (cruise.includes(bizType)) {
              e.currentProjectId = 4;
            } else if (abroadTour.includes(bizType)) {
              e.currentProjectId = 5;
            } else {
              e.currentProjectId = 2;
            }

            if (-1 == location.href.indexOf('Product/IndexNew')) {
              safeWindowOpen(
                `/Product/IndexNew?keywrod=${window.escape(e.searchVal)}&projectId=${
                  e.currentProjectId
                }`,
              );
            } else {
              e.updateHistory();
              window.getLineList && window.getLineList();
              window.changeNav && window.changeNav(e.currentProjectId);
            }
          }
        } else {
          if (-1 == location.href.indexOf('Product/IndexNew')) {
            safeWindowOpen(
              `/Product/IndexNew?keywrod=${window.escape(e.searchVal)}&projectId=${
                e.currentProjectId || 2
              }`,
            );
          } else {
            e.currentProjectId = 2;
            window.getLineList && window.getLineList();
            window.changeNav && window.changeNav(e.currentProjectId);
          }
        }
        return;
      }

      if (i && n.test(i)) {
        switch (e.currentProjectId) {
          case 1:
            window.open('/AroundGroup/Detail?LineId=' + i + '&s=0,1&code=100000');
            break;
          case 2:
            $.ajax({
              url: cang.root + '/Product/DomesticIsStatic?lineid=' + i,
              datatype: 'json',
              success: function (n) {
                if (n && n !== 'false')
                  window.open('/Domestic/Detail?LineId=' + i + '&s=0,1&code=100000');
                else {
                  var t = e.storage('startcity') || {};
                  window.open(
                    '/DomesticSelf/Detail?LineId=' + i + '&s=0,1&code=100000&depid=' + (t.id || 0),
                  );
                }
              },
              error: function () {
                window.open('/Domestic/Detail?LineId=' + i + '&s=0,1&code=100000');
              },
            });
            break;
          case 3:
            window.open('/vitaminproduct/detail?ProductNo=' + i + '&s=0,1&code=100000');
            break;
          case 4:
            window.open('/Cruise/Detail?LineId=' + i + '&s=0,1&code=100000');
            break;
          case 5:
            $.ajax({
              url: cang.root + '/Product/AbroadDetailIsNew?lineid=' + i,
              datatype: 'json',
              success: function (e) {
                e
                  ? window.open('/Abroad/NewDetail?lineId=' + i + '&s=0,1&code=100000')
                  : window.open('/Abroad/detail?lineId=' + i + '&s=0,1&code=100000');
              },
              error: function () {
                window.open('/Abroad/detail?lineId=' + i + '&s=0,1&code=100000');
              },
            });
            break;
          case 6:
            window.open('/SingleProduct/detail?productId=' + i + '&s=0,1&code=100000');
        }
      } else {
        if (-1 == location.href.indexOf('Product/IndexNew')) {
          location.href = `/Product/IndexNew?keywrod=${window.escape(e.searchVal)}&projectId=${
            e.currentProjectId || 2
          }`;
          return;
        }

        window.getLineList && window.getLineList(),
          window.changeNav && window.changeNav(e.currentProjectId),
          e.handleLeaver();
      }
    },
    updateHistory: function () {
      var e = this;
      if (e.searchVal && e.searchHistoryList != null) {
        var i = e.searchHistoryList.findIndex(function (i) {
          return i === e.searchVal;
        });
        i > -1 && e.searchHistoryList.splice(i, 1),
          e.searchHistoryList.unshift(e.searchVal),
          e.searchHistoryList.length > e.searchHistoryMax &&
            e.searchHistoryList.splice(e.searchHistoryList.length - 1, 1),
          e.storage(PAGE_LIST_SEARCH_KEY, e.searchHistoryList);
      }
    },
    clearHistory: function () {
      var e = this;
      (e.searchHistoryList = []), e.storage(PAGE_LIST_SEARCH_KEY, []);
    },
    handleBlur: function () {
      var e = this;
      setTimeout(function () {
        e.handleLeaver();
      }, 300);
    },
    updateTh: function (e) {
      this.isSelectedTh = e;
    },
    feedbackSubmit: function () {
      var e = this;
      if (!e.feedbackSubmitDesc) {
        if (!e.feedbackVal) return void (e.isShowFeedbackWarning = !0);
        (e.isShowFeedbackWarning = !1),
          (e.feedbackSubmitDesc = '提交中...'),
          $.ajax({
            url: cang.root + '/Home/AddFeedBack',
            type: 'post',
            data: {
              FType: e.feedbackType,
              Content: e.feedbackVal,
            },
            dataType: 'json',
            success: function (i) {
              i && i.IsSuccess
                ? ((e.feedbackSubmitDesc = '提交成功，即将关闭'),
                  setTimeout(function () {
                    (e.isShowFeedback = !1),
                      (e.feedbackType = 1),
                      (e.feedbackVal = ''),
                      (e.isShowFeedbackWarning = !1),
                      (e.feedbackSubmitDesc = '');
                  }, 1300))
                : (e.feedbackSubmitDesc = '提交失败');
            },
          });
      }
    },
    backtop: function () {
      window.scrollTo(0, 0);
    },
  },
};

function fillText(text) {
  if (!text) return '';
  text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;'); //文本里可能会有< >
  return text
    .replace(/\|\^\|&lt;highlight&gt;+/gi, '<span class="highlight">')
    .replace(/\|\^\|/gi, '</span>');
}

// 处理标题
function fillTitle(title, isSearch) {
  const getKeyword = /(\D+)(?=的)/;
  if (!isSearch) {
    title = getKeyword.exec(title)[0];
  }
  let _key = title.replace(/\|\^\|<highlight>(.*)\|\^\|/, function (m, q) {
    return q;
  });
  return _key;
}

// 目的地页 产品标题高亮关键字处理
function fillTextNew(text) {
  if (!text) return '';
  text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;'); //文本里可能会有< >
  return text.replace(/\|\^\|&lt;highlight&gt;+/gi, '').replace(/\|\^\|/gi, '');
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
