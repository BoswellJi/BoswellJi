<template>
  <div class="content page-list product-item">
    <PageListFilter
      v-show="productData.isShowFilter"
      :filterList="filterList"
      :selectFilterList="selectFilterList"
      @filterChange="filterChange"
      ref="filter"
    />
    <div class="product-box card-box" :id="'product-box-' + data.projectId">
      <PageListProductHandler
        @update-th="updateTh"
        :handlerStyle="data.handlerStyle"
        :autoPosition="data.autoPosition"
        :isShowPriceRange="productData.isShowPriceRange"
        :sortId="sortId"
        @changeSortId="changeSortId"
        @changeDaysId="changeDaysId"
        @changePriceRange="changePriceRange"
        :quickFilterList="quickFilterList"
        @changeQuick="changeQuick"
        ref="proHandler"
        :sortList="sortList"
        :daysList="daysList"
      />
      <div class="loading" v-if="loading">
        <img src="https://img1.40017.cn/cn/lvcang/base/loading125x200.gif" alt="loading..." />
      </div>
      <div class="no-result card-box" v-else-if="noResult">
        <img src="//pic5.40017.cn/i/ori/1b0N4ECCYqk.png" alt="" />
        <p>抱歉，没有找到符合条件的产品</p>
      </div>
      <PageListProductList
        v-else
        :is-selected-th="isSelectedTh"
        :productList="productList"
        :projectId="data.projectId"
      />
      <div class="page-box" v-if="productList.length">
        <Pagination :current-page="currentPage" :page-count="pageCount" @change="pageChange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
/**
 * 注意：接口返回的字段是小驼峰字段，逻辑中使用的大驼峰字段，为了复用逻辑，适配了接口大小写转换
 */
import { projectList } from './data';
import { convertKeyUpperFirst, convertKeyLowerFirst } from '@/utils/util';

export default {
  props: {
    data: Object as () => {
      projectId?: number;
    },
  },
  data: function () {
    return {
      productData: {},
      filterList: [],
      selectFilterList: [],
      sortList: [],
      daysList: [],
      noResult: !1,
      loading: !1,
      isShowMiniappPop: !1,
      isSelectedTh: !1,
      currentPage: 1,
      pageSize: 10,
      pageCount: 1,
      sortId: 0,
      quickFilterList: [],
      productList: [],
    };
  },
  mounted: function () {
    var e = this;
    window.lineList || (window.lineList = []);
    projectList.forEach(function (t) {
      t.projectId == e.data.projectId &&
        ((e.productData = t),
        (e.filterList = t.filterList),
        (e.quickFilterList = t.quickFilterList),
        (e.sortList = t.sortList),
        (e.daysList = t.daysList),
        (e.sortId = t.sortId),
        t.getFilterFn &&
          t.getFilterFn(
            e.filterList,
            7 == e.data.projectId
              ? function () {
                  e.getLineList(1);
                }
              : null,
          ),
        7 != e.data.projectId && e.getLineList(1),
        window.lineList.push(function () {
          (e.selectFilterList = []),
            (e.sortId = e.productData.sortId),
            e.filterHandler(),
            e.getLineList(1);
        }));
    });
  },
  methods: {
    filterChange: function () {
      var e = this;
      e.filterHandler();
      e.getLineList(1);
    },
    filterHandler: function () {
      var e = this;
      if (e.daysList.length > 0) {
        var t = e.selectFilterList.find(function (e) {
          return 'DaysList' == e.prop;
        });
        t &&
          (t = e.daysList.find(function (e) {
            return e.id == t.ids[0];
          })),
          t ||
            (t = {
              id: 0,
              name: '',
            }),
          (e.$refs.proHandler.currentDaysId = t.id),
          (e.$refs.proHandler.currentDaysName = t.name);
      }
      var i = e.selectFilterList.find(function (e) {
        return 'PriceBoundList' == e.prop;
      });
      if (e.$refs.proHandler) {
        if (i) {
          var n = e.handlePrice(i.names);
          (e.$refs.proHandler.currentMinPrice = n.min),
            (e.$refs.proHandler.currentMaxPrice = n.max);
        } else (e.$refs.proHandler.currentMinPrice = ''), (e.$refs.proHandler.currentMaxPrice = '');
      }

      var r = e.selectFilterList.find(function (e) {
        return 'NoShopping' == e.prop;
      });
      r ||
        ((r = e.quickFilterList.find(function (e) {
          return 'NoShopping' == e.key;
        })) &&
          (r.isSelected = !1));
      var s = e.selectFilterList.find(function (e) {
        return 'NoSelfCost' == e.prop;
      });
      s ||
        ((s = e.quickFilterList.find(function (e) {
          return 'NoSelfCost' == e.key;
        })) &&
          (s.isSelected = !1));
    },
    storage: function (e, i, n, t) {
      if (e) {
        if ((n ? (n *= 1e3) : (n = 2592e6), !i && '' !== i))
          return (
            (i = localStorage.getItem(e)),
            i && ((i = JSON.parse(i)), (i = new Date().getTime() > i.time ? t || {} : i.value)),
            i
          );
        (i = {
          value: i,
          time: new Date().getTime() + n,
        }),
          localStorage.setItem(e, JSON.stringify(i));
      }
    },
    getSearchParam: function () {
      var e = this,
        t = {},
        i = e.storage('keyword'),
        n = e.storage('startcity') || {
          id: 0,
          name: '',
        };

      1 == e.data.projectId
        ? ((t.PageIndex = e.currentPage),
          (t.PageSize = e.pageSize),
          (t.StartCityId = n.id || 0),
          (t.Sort = e.sortId),
          (t.KeyWord = i),
          e.selectFilterList.forEach(function (i) {
            if ('PriceBoundList' == i.prop) {
              var n = e.handlePrice(i.names);
              (t.MinPrice = n.min), (t.MaxPrice = n.max);
            } else 'StartDateList' == i.prop ? ((t.startDate = i.ids), (t.endDate = i.ids)) : (t[i.param] = i.ids);
          }))
        : 2 == e.data.projectId
        ? ((t.PageIndex = e.currentPage),
          (t.PageSize = e.pageSize),
          (t.Order = e.sortId),
          (t.HotDestination = i),
          (t.departureCity = n.id || ''),
          e.selectFilterList.forEach(function (i) {
            if ('PriceBoundList' == i.prop) {
              var n = e.handlePrice(i.names);
              (t.MinPrice = n.min), (t.MaxPrice = n.max);
            } else 'MouthList' == i.prop ? (t.Month = i.names.replace(/[^0-9]/gi, '')) : (t[i.param] = i.ids);
          }))
        : 3 == e.data.projectId
        ? ((t.CurrentPage = e.currentPage),
          (t.PageSize = e.pageSize),
          (t.SortNew = e.sortId),
          (t.KeyWord = i),
          e.selectFilterList.forEach(function (i) {
            if ('PriceBoundList' == i.prop) {
              var n = e.handlePrice(i.names);
              (t.MinPrice = n.min), (t.MaxPrice = n.max);
            } else t[i.param] = i.ids;
          }))
        : 4 == e.data.projectId
        ? ((t.PageIndex = e.currentPage),
          (t.PageSize = e.pageSize),
          (t.LocationCityId = n.id || 0),
          (t.Sort = e.sortId),
          (t.KeyWord = i),
          e.selectFilterList.forEach(function (i) {
            if ('PriceBoundList' == i.prop) {
              var n = e.handlePrice(i.names);
              (t.MinPrice = n.min), (t.MaxPrice = n.max);
            } else 'StartDateList' == i.prop ? ((t.StartDate = i.ids), (t.EndDate = i.ids)) : (t[i.param] = i.ids);
          }))
        : 5 == e.data.projectId
        ? ((t.PageIndex = e.currentPage),
          (t.PageSize = e.pageSize),
          (t.StartCityId = n.id || 0),
          (t.Sort = e.sortId),
          (t.KeyWord = i),
          (t.startCityId = n.id || ''),
          e.selectFilterList.forEach(function (i) {
            if ('PriceBoundList' == i.prop) {
              var n = e.handlePrice(i.names);
              (t.MinPrice = n.min), (t.MaxPrice = n.max);
            } else 'StartDateList' == i.prop ? ((t.StartDate = i.ids), (t.EndDate = i.ids)) : (t[i.param] = i.ids);
          }))
        : 6 == e.data.projectId
        ? ((t.PageIndex = e.currentPage),
          (t.PageSize = e.pageSize),
          (t.SortNew = e.sortId),
          (t.SearchKeyWord = i),
          e.selectFilterList.forEach(function (i) {
            if ('PriceBoundList' == i.prop) {
              var n = e.handlePrice(i.names);
              (t.PriceRangeMin = n.min), (t.PriceRangeMax = n.max);
            } else t[i.param] = i.ids;
          }))
        : 7 == e.data.projectId &&
          ((t.CurrentPage = e.currentPage),
          (t.PageSize = e.pageSize),
          (t.SortNew = e.sortId),
          (t.CountryIdOptional = !0),
          (t.FilterReturn = !0),
          (t.KeyWord = i),
          e.selectFilterList.forEach(function (i) {
            if ('PriceBoundList' == i.prop) {
              var n = e.handlePrice(i.names);
              (t.minPrice = n.min), (t.maxPrice = n.max);
            } else t[i.param] = i.ids;
          }));
      return JSON.stringify(convertKeyLowerFirst(t));
    },
    handlePrice: function (e) {
      var t = {
        min: 0,
        max: 0,
        name: '',
      };
      if (e) {
        var i = JSON.parse(e);
        i &&
          2 == i.length &&
          ((t.min = i[0]),
          (t.max = i[1]),
          1 == t.min
            ? (t.name = t.max + '元以下')
            : 1e5 == t.max
            ? (t.name = t.min + '元以上')
            : (t.name = t.min + '元-' + t.max + '元'));
      }
      return t;
    },
    getLineList: function (e) {
      var t = this;
      e && (t.currentPage = e);
      var i = t.getSearchParam();
      (t.loading = !0),
        $.ajax({
          url: t.productData.getLineListUrl,
          type: 'post',
          datatype: 'json',
          data: i,
          contentType: 'application/json',
          success: function (e) {
            if (e.data) {
              e = convertKeyUpperFirst(e.data);
            }

            if (e) {
              t.filterList.forEach(function (i, n) {
                if (null === e[i.prop]) return void (i.list = []);
                void 0 !== e[i.prop] &&
                  (i.list = e[i.prop].map(function (e) {
                    var n = {
                      id: e.Id,
                      name: e.Name,
                      isSelected: !1,
                      isCheckSelected: !1,
                    };
                    return (
                      4 == t.data.projectId &&
                        'PriceBoundList' == i.prop &&
                        ((n.id = e.Name), (n.name = t.handlePrice(e.Name).name)),
                      n
                    );
                  }));
              });
              var i = e[t.productData.lineListProp];
              i && i.length > 0
                ? ((t.productList = i.map(function (e) {
                    return t.productData.lineProp(e, t.handleDateList);
                  })),
                  (t.pageCount = parseInt((e.TotalCount + t.pageSize - 1) / t.pageSize, 10)),
                  (t.noResult = !1))
                : ((t.productList = []), (t.noResult = !0));
            } else (t.productList = []), (t.noResult = !0);
          },
          complete: function () {
            t.loading = !1;
          },
        });
    },
    updateTh: function (e) {
      this.isSelectedTh = e;
    },
    changeSortId: function (e) {
      (this.sortId = e), this.getLineList(1);
    },
    changeDaysId: function (e) {
      var t = this;
      if (e > 0) {
        var i = t.selectFilterList.find(function (e) {
          return 'DaysList' == e.prop;
        });
        if (i) (i.ids = [e]), (i.names = e), t.getLineList(1);
        else if (
          (i = t.filterList.find(function (e) {
            return 'DaysList' == e.prop;
          })) &&
          i.list &&
          i.list.length > 0
        ) {
          var n = i.list.find(function (e) {
            return e.isSelected || e.isCheckSelected;
          });
          n && ((n.isSelected = !1), (n.isCheckSelected = !1)),
            (n = i.list.find(function (t) {
              return t.id == e;
            })),
            n &&
              ((n.isSelected = !0),
              (n.isCheckSelected = !0),
              t.$refs.filter.updateSelectFilterList(i.prop));
        }
      }
    },
    changePriceRange: function (e, t) {
      var i = this;
      if (
        (i.selectFilterList.splice(
          i.selectFilterList.findIndex(function (e) {
            return 'PriceBoundList' == e.prop;
          }),
          1,
        ),
        e > 0 || t > 0)
      ) {
        var n = i.filterList.find(function (e) {
          return 'PriceBoundList' == e.prop;
        });
        if (n) {
          var r = {
            id: 1,
            name: JSON.stringify([e, t]),
            isSelected: !0,
            isCheckSelected: !0,
          };
          n.list.push(r), i.$refs.filter.updateSelectFilterList(n.prop), (n.list = []);
        }
      } else i.getLineList(1);
    },
    changeQuick: function (e) {
      var t = this;
      if (e.isSelected) {
        var i = {
          type: e.name,
          prop: e.key,
          param: e.key,
          multi: !1,
          list: [
            {
              id: 1,
              name: e.name,
              isSelected: !0,
              isCheckSelected: !0,
            },
          ],
        };
        t.filterList.push(i),
          t.$refs.filter.updateSelectFilterList(i.prop),
          t.filterList.splice(
            t.filterList.findIndex(function (t) {
              return t.prop == e.key;
            }),
            1,
          );
      } else {
        var n = t.selectFilterList.findIndex(function (t) {
          return t.prop == e.key;
        });
        n >= 0 && t.$refs.filter.handleFilterDel(n);
      }
    },
    pageChange: function (e) {
      this.getLineList(e || 1);
    },
    handleDateList: function (e) {
      var t = [],
        i = e
          .split(';')
          .filter(function (e) {
            return e;
          })
          .map(function (e) {
            var t = e.split('');
            return t.splice(6, 0, '-'), t.splice(4, 0, '-'), t.join('');
          }),
        n = {
          元旦节: ['2023-01-01', '2024-01-01', '2025-01-01', '2026-01-01', '2027-01-01'],
          除夕: ['2023-01-21', '2024-02-09', '2025-01-28', '2026-02-16', '2027-02-05'],
          春节: ['2023-01-22', '2024-02-10', '2025-01-29', '2026-02-17', '2027-02-06'],
          情人节: ['2023-02-14', '2024-02-14', '2025-02-14', '2026-02-14', '2027-02-14'],
          元宵节: ['2023-02-05', '2024-02-24', '2025-02-12', '2026-03-03', '2027-02-20'],
          清明节: ['2023-04-05', '2024-04-04', '2025-04-04', '2026-04-05', '2027-04-05'],
          儿童节: ['2023-06-01', '2024-06-01', '2025-06-01', '2026-06-01', '2027-06-01'],
          端午节: ['2023-06-22', '2024-06-10', '2025-05-31', '2026-06-19', '2027-06-09'],
          七夕: [
            '2022-08-04',
            '2023-08-22',
            '2024-08-10',
            '2025-08-29',
            '2026-08-19',
            '2027-08-08',
          ],
          中秋节: [
            '2022-09-10',
            '2023-09-29',
            '2024-09-17',
            '2025-10-06',
            '2026-09-25',
            '2027-09-15',
          ],
          国庆节: [
            '2022-10-01',
            '2023-10-01',
            '2024-10-01',
            '2025-10-01',
            '2026-10-01',
            '2027-10-01',
          ],
        };
      if (
        (Object.keys(n).forEach(function (e) {
          n[e].forEach(function (n) {
            i.indexOf(n) > -1 && t.push(e);
          });
        }),
        i.length <= 3)
      )
        return i
          .map(function (e) {
            return e.substr(5);
          })
          .join('、');
      var r = new Date(i[0]),
        s = new Date(i[i.length - 1]);
      if (s > r) {
        var a = (s - r) / 1e3 / 60 / 60 / 24 + 1;
        i.length / a >= 0.8 && t.push('天天发团');
      }
      return (
        0 == t.length &&
          i.length > 0 &&
          ((t = i.slice(0, 3).map(function (e) {
            return e.substr(5);
          })),
          i.length > 3 && (t[t.length - 1] += '等')),
        t.join('、')
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
