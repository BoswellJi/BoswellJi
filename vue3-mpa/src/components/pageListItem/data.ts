/* eslint-disable */
// @ts-nocheck
export const projectList = [
  {
    projectId: 1,
    filterList: [
      {
        type: '目的城市',
        prop: 'EndCityList',
        param: 'EndCityList',
        multi: !0,
        list: [],
      },
      {
        type: '热门景点',
        prop: 'HotSceneryList',
        param: 'HotSceneryList',
        multi: !0,
        list: [],
      },
      {
        type: '游玩天数',
        prop: 'DaysList',
        param: 'Days',
        multi: !1,
        list: [],
      },
      {
        type: '出游日期',
        prop: 'StartDateList',
        param: 'StartDateList',
        multi: !1,
        list: [],
      },
      {
        type: '热门主题',
        prop: 'HotThemeList',
        param: 'HotThemeList',
        multi: !0,
        list: [],
      },
      {
        type: '线路特色',
        prop: 'LineFeatureList',
        param: 'LineFeatureList',
        multi: !0,
        list: [],
      },
      {
        type: '出发区县',
        prop: 'StartAreaList',
        param: 'StartAreaList',
        multi: !0,
        list: [],
      },
      {
        type: '价格范围',
        prop: 'PriceBoundList',
        multi: !1,
        list: [],
      },
    ],
    quickFilterList: [
      {
        id: 1,
        key: 'NoShopping',
        name: '无购物',
      },
      {
        id: 2,
        key: 'NoSelfCost',
        name: '无自费',
      },
    ],
    getLineListUrl: cang.root + '/webapi/hotelProduct/around/lineList',
    lineListProp: 'ProductList',
    lineProp: function (t, i) {
      return {
        id: t.LineId,
        url: '/AroundGroup/Detail?LineId=' + t.LineId,
        projectType: '周边游',
        startCity: t.DepartureCity + '出发',
        title: t.Title,
        subTitle: t.SubTitle,
        tagList: t.TagList,
        imgUrl: t.ImageUrl,
        specialText: t.Feature,
        dateText: i(t.NearestDate.replace(/,/g, ';')),
        tcPrice: t.MarketPrice,
        chanelPrice: t.DistributionPrice,
        profit: parseInt(t.MarketPrice - t.DistributionPrice),
        salesNum: t.SaleCount,
      };
    },
    sortList: [
      {
        id: 1,
        name: '推荐排序',
      },
      {
        id: 2,
        name: '销量排序',
      },
      {
        id: 3,
        name: '价格 低-高',
        isShowPop: !1,
        list: [
          {
            id: 3,
            name: '价格 低-高',
          },
          {
            id: 4,
            name: '价格 高-低',
          },
        ],
      },
    ],
    sortId: 1,
    daysList: [],
    isShowPriceRange: !0,
    isShowFilter: !0,
  },
  {
    projectId: 2,
    filterList: [
      {
        type: '产品属性',
        prop: 'LineTypeList',
        param: 'LineType',
        multi: !1,
        list: [
          {
            id: 10,
            name: '跟团游',
            isSelected: !1,
            isCheckSelected: !1,
          },
          {
            id: 20,
            name: '自由行',
            isSelected: !1,
            isCheckSelected: !1,
          },
          {
            id: 30,
            name: '目的地参团',
            isSelected: !1,
            isCheckSelected: !1,
          },
        ],
      },
      {
        type: '线路玩法',
        prop: 'LinePropertyList',
        param: 'LinePropertyId',
        multi: !0,
        list: [],
      },
      {
        type: '产品类型',
        prop: 'ProductTypeList',
        param: 'ProductTypeId',
        multi: !0,
        list: [],
      },
      {
        type: '出发日期',
        prop: 'MouthList',
        param: 'Month',
        multi: !1,
        list: [],
      },
      {
        type: '游玩天数',
        prop: 'DaysList',
        param: 'Days',
        multi: !0,
        list: [],
      },
      {
        type: '产品钻级',
        prop: 'DiamondList',
        param: 'DiamondId',
        multi: !0,
        list: [],
      },
      {
        type: '交通类型',
        prop: 'TrafficTypeList',
        param: 'TrafficTypeId',
        multi: !0,
        list: [],
      },
      {
        type: '适用人群',
        prop: 'ApplyPersonList',
        param: 'ApplyPersonId',
        multi: !0,
        list: [],
      },
      {
        type: '价格预算',
        prop: 'PriceBoundList',
        multi: !1,
        list: [],
      },
      {
        type: '出港城市',
        prop: 'PortCityList',
        param: 'PortCity',
        multi: !0,
        list: [],
      },
      {
        type: '酒店特色',
        prop: 'HotelSpecialList',
        param: 'HotelSpecialId',
        multi: !1,
        list: [],
      },
      {
        type: '线路特色',
        prop: 'LineSpecialList',
        param: 'LineSpecialId',
        multi: !0,
        list: [],
      },
      {
        type: '特色项目',
        prop: 'SpecialProjectList',
        param: 'SpecialProjectId',
        multi: !0,
        list: [],
      },
      {
        type: '特色餐饮',
        prop: 'SpecialFoodList',
        param: 'SpecialFoodId',
        multi: !0,
        list: [],
      },
    ],
    quickFilterList: [
      {
        id: 1,
        key: 'NoShopping',
        name: '无购物',
      },
      {
        id: 2,
        key: 'NoSelfCost',
        name: '无自费',
      },
    ],
    getLineListUrl: cang.root + '/webapi/hotelProduct/domestic/lineList',
    lineListProp: 'Items',
    lineProp: function (t, i) {
      var e = {
        id: t.LineId,
        projectType: t.PropDesc,
        title: t.Title,
        subTitle: t.SubTitle,
        tagList: t.TagList,
        imgUrl: t.ImageUrl,
        specialText: t.PreFeature,
        dateText: i(t.NearestDate),
        tcPrice: t.MarketPrice,
        chanelPrice: t.DistributionPrice,
        profit: parseInt(t.MarketPrice - t.DistributionPrice),
        salesNum: t.SaleNum,
        trips: t.Trips,
      };
      return (
        5 == t.Prop
          ? (e.startCity = t.PortCityName + '参团')
          : t.IsDyTraffic
          ? (e.startCity = '多地出发')
          : t.PortCityName && (e.startCity = t.PortCityName + '出发'),
        1 == t.ProType
          ? (e.url = '/domestic/detail?LineId=' + t.LineId + '&s=1,1&code=302020')
          : (e.url =
              '/DomesticSelf/detail?LineId=' +
              t.LineId +
              '&depid=' +
              t.PortCityId +
              '&s=1,1&code=302121'),
        e
      );
    },
    sortList: [
      {
        id: 2,
        name: '推荐排序',
      },
      {
        id: 3,
        name: '销量排序',
      },
      {
        id: 4,
        name: '价格 低-高',
        isShowPop: !1,
        list: [
          {
            id: 4,
            name: '价格 低-高',
          },
          {
            id: 5,
            name: '价格 高-低',
          },
        ],
      },
    ],
    sortId: 2,
    daysList: [
      {
        id: 4,
        name: '4天',
      },
      {
        id: 5,
        name: '5天',
      },
      {
        id: 6,
        name: '6天',
      },
    ],
    isShowPriceRange: !0,
    isShowFilter: !0,
  },
  {
    projectId: 3,
    filterList: [
      {
        type: '价格范围',
        prop: 'PriceBoundList',
        multi: !1,
        list: [],
      },
    ],
    quickFilterList: [],
    getLineListUrl: cang.root + '/webapi/hotelProduct/hotel/lineList',
    lineListProp: 'VitaminProductList',
    lineProp: function (t, i) {
      return {
        id: t.ProductNo,
        url: '/vitaminproduct/detail?ProductNo=' + t.ProductNo,
        projectType: '酒景玩乐',
        startCity: t.DepartureCity ? t.DepartureCity + '出发' : '',
        title: t.Title,
        subTitle: t.SubTitle,
        tagList: t.LabelList,
        imgUrl: t.ImageUrl,
        specialText: t.Feature,
        dateText: i(t.NearestDate.replace(/,/g, ';')),
        tcPrice: t.MarketPrice,
        chanelPrice: t.DistributionPrice,
        profit: parseInt(t.MarketPrice - t.DistributionPrice),
        salesNum: t.SaleCount,
        trips: t.Trips,
      };
    },
    sortList: [
      {
        id: 1,
        name: '推荐排序',
      },
      {
        id: 2,
        name: '销量排序',
      },
      {
        id: 3,
        name: '价格 低-高',
        isShowPop: !1,
        list: [
          {
            id: 3,
            name: '价格 低-高',
          },
          {
            id: 4,
            name: '价格 高-低',
          },
        ],
      },
    ],
    sortId: 1,
    daysList: [],
    isShowPriceRange: !0,
    isShowFilter: !0,
  },
  {
    projectId: 4,
    filterList: [
      {
        type: '出发城市',
        prop: 'StartCityList',
        param: 'StartCityId',
        multi: !1,
        list: [],
      },
      {
        type: '出行时间',
        prop: 'StartDateList',
        param: 'MonthId',
        multi: !1,
        list: [],
      },
      {
        type: '邮轮航线',
        prop: 'RouteList',
        param: 'RouteId',
        multi: !1,
        list: [],
      },
      {
        type: '途径城市',
        prop: 'RoutePortList',
        param: 'RoutePortId',
        multi: !1,
        list: [],
      },
      {
        type: '邮轮品牌',
        prop: 'CruiseBrandList',
        param: 'CruiseBrandId',
        multi: !1,
        list: [],
      },
      {
        type: '行程天数',
        prop: 'DayList',
        param: 'Day',
        multi: !1,
        list: [],
      },
      {
        type: '标签',
        prop: 'LabelList',
        param: 'LabelIdList',
        multi: !0,
        list: [],
      },
      {
        type: '价格范围',
        prop: 'PriceBoundList',
        multi: !1,
        list: [],
      },
    ],
    quickFilterList: [],
    getLineListUrl: cang.root + '/webapi/hotelProduct/cruise/lineList',
    lineListProp: 'CruiseList',
    lineProp: function (t, i) {
      return {
        id: t.Id,
        url: '/Cruise/Detail?LineId=' + t.Id,
        projectType: '邮轮',
        startCity: t.DepartureCity + '出发',
        title: t.Title,
        subTitle: '',
        tagList: t.LabelList,
        imgUrl: t.ImageUrl,
        specialText: t.SubTitle,
        dateText: i(t.NearestDate.replace(/,/g, ';')),
        tcPrice: t.MarketPrice,
        chanelPrice: t.DistributionPrice,
        profit: parseInt(t.MarketPrice - t.DistributionPrice),
        salesNum: t.SaleCount,
      };
    },
    sortList: [
      {
        id: 1,
        name: '推荐排序',
      },
      {
        id: 2,
        name: '销量排序',
      },
      {
        id: 3,
        name: '价格 低-高',
        isShowPop: !1,
        list: [
          {
            id: 3,
            name: '价格 低-高',
          },
          {
            id: 4,
            name: '价格 高-低',
          },
        ],
      },
    ],
    sortId: 1,
    daysList: [],
    isShowPriceRange: !0,
    isShowFilter: !0,
  },
  {
    projectId: 5,
    filterList: [
      {
        type: '线路玩法',
        prop: 'LinePlayMethod',
        param: 'LinePlayMethod',
        multi: !0,
        list: [],
      },
      {
        type: '出发城市',
        prop: 'StartCity',
        param: 'StartCityId',
        multi: !1,
        list: [],
      },
      {
        type: '交通酒店',
        prop: 'TrafficHotel',
        param: 'TrafficHotel',
        multi: !0,
        list: [],
      },
      {
        type: '游玩天数',
        prop: 'PlayDay',
        param: 'PlayDay',
        multi: !0,
        list: [],
      },
      {
        type: '出发日期',
        prop: 'Month',
        param: 'Month',
        multi: !1,
        list: [],
      },
      {
        type: '线路特色',
        prop: 'LineFeature',
        param: 'LineFeature',
        multi: !0,
        list: [],
      },
      {
        type: '适用人群',
        prop: 'ApplayPeople',
        param: 'ApplayPeople',
        multi: !0,
        list: [],
      },
      {
        type: '价格范围',
        prop: 'PriceBoundList',
        multi: !1,
        list: [],
      },
    ],
    quickFilterList: [
      {
        id: 1,
        key: 'NoShopping',
        name: '无购物',
      },
      {
        id: 2,
        key: 'NoSelfCost',
        name: '无自费',
      },
    ],
    getLineListUrl: cang.root + '/webapi/hotelProduct/abroad/lineList',
    lineListProp: 'OutboundList',
    lineProp: function (t, i) {
      var e = {
        id: t.LineId,
        url: '/abroad/NewDetail?lineId=' + t.LineId,
        projectType: t.PropDesc,
        startCity: t.DepartureCity + '出发',
        title: t.Title,
        subTitle: t.SubTitle,
        tagList: t.LabelList,
        imgUrl: t.ImageUrl,
        specialText: t.Feature,
        dateText: i(t.NearestDate.replace(/,/g, ';')),
        tcPrice: t.MarketPrice,
        chanelPrice: t.DistributionPrice,
        profit: parseInt(t.MarketPrice - t.DistributionPrice),
        salesNum: t.SaleCount,
        peopleCount: t.PeopleCount,
      };
      return e.tcPrice < 0 && ((e.tcPrice = '实时计价'), (e.chanelPrice = 0), (e.profit = 0)), e;
    },
    sortList: [
      {
        id: 1,
        name: '推荐排序',
      },
      {
        id: 3,
        name: '销量排序',
      },
      {
        id: 4,
        name: '价格 低-高',
        isShowPop: !1,
        list: [
          {
            id: 4,
            name: '价格 低-高',
          },
          {
            id: 5,
            name: '价格 高-低',
          },
        ],
      },
    ],
    sortId: 1,
    daysList: [],
    isShowPriceRange: !0,
    isShowFilter: !0,
  },
  {
    projectId: 6,
    filterList: [
      {
        type: '目的城市',
        prop: 'DestCountryList',
        param: 'DestCountryId',
        multi: !1,
        list: [],
      },
      {
        type: '游玩主题',
        prop: 'ThemeList',
        param: 'PlayThemeId',
        multi: !1,
        list: [],
      },
      {
        type: '游玩时间',
        prop: 'PlayTimeList',
        param: 'PlayTime',
        multi: !1,
        list: [],
      },
      {
        type: '价格范围',
        prop: 'PriceBoundList',
        multi: !1,
        list: [],
      },
    ],
    getFilterFn: function (t) {
      $.ajax({
        url: cang.root + '/SingleProduct/GetSingleProductSearchLable',
        datatype: 'json',
        success: function (i) {
          i &&
            t.forEach(function (t) {
              i[t.prop] &&
                (t.list = i[t.prop].map(function (i) {
                  var e = {};
                  return (
                    'DestCountryList' == t.prop
                      ? ((e.id = i.DestCountryId), (e.name = i.DestCountry))
                      : 'ThemeList' == t.prop
                      ? ((e.id = i.PlayThemeId), (e.name = i.PlayThemeName))
                      : 'PlayTimeList' == t.prop && ((e.id = i.PlayTime), (e.name = i.PlayName)),
                    e
                  );
                }));
            });
        },
      });
    },
    quickFilterList: [],
    getLineListUrl: cang.root + '/webapi/hotelProduct/local/lineList',
    lineListProp: 'SingleProductList',
    lineProp: function (t, i) {
      return {
        id: t.ProductId,
        url: '/singleproduct/detail?productId=' + t.ProductId + '&s=0,&code=109090',
        projectType: '全球玩乐',
        startCity: '',
        title: t.Title,
        subTitle: t.SubTitle,
        tagList: [],
        imgUrl: t.ImgUrl,
        specialText: t.Feature,
        dateText: i(t.GdDate.replace(/,/g, ';')),
        tcPrice: t.MarketPrice,
        chanelPrice: t.DistributePrice,
        profit: parseInt(t.MarketPrice - t.DistributePrice),
        salesNum: 0,
      };
    },
    sortList: [
      {
        id: 1,
        name: '推荐排序',
      },
      {
        id: 2,
        name: '销量排序',
      },
      {
        id: 3,
        name: '价格 低-高',
        isShowPop: !1,
        list: [
          {
            id: 3,
            name: '价格 低-高',
          },
          {
            id: 4,
            name: '价格 高-低',
          },
        ],
      },
    ],
    sortId: 1,
    daysList: [],
    isShowPriceRange: !0,
    isShowFilter: !0,
  },
  {
    projectId: 7,
    filterList: [
      {
        type: '国家或地区',
        prop: 'CountryList',
        param: 'CountryId',
        multi: !1,
        list: [],
      },
      {
        type: '签证类型',
        prop: 'VisaTypeList',
        param: 'VisaTypeId',
        multi: !1,
        list: [],
      },
      {
        type: '签证领区',
        prop: 'RegionList',
        param: 'RegionId',
        multi: !1,
        list: [],
      },
      {
        type: '价格范围',
        prop: 'PriceBoundList',
        multi: !1,
        list: [],
      },
    ],
    getFilterFn: function (t, i) {
      $.ajax({
        url: cang.root + '/Visa/VisaCountryInfoList',
        dataType: 'json',
        success: function (i) {
          i &&
            t.forEach(function (t) {
              i[t.prop] &&
                (t.list = i[t.prop].map(function (i) {
                  // eslint-disable-next-line no-var
                  var e = {};
                  return (
                    'CountryList' == t.prop && ((e.id = i.CountryId), (e.name = i.CountryName)), e
                  );
                }));
            });
        },
        complete: function () {
          i && i();
        },
      });
    },
    quickFilterList: [],
    getLineListUrl: cang.root + '/webapi/hotelProduct/visa/lineList',
    lineListProp: 'VisaProductList',
    lineProp: function (t) {
      return {
        id: t.Id,
        url: '/Visa/VisaInfo?visaId=' + t.Id,
        projectType: '签证',
        startCity: '',
        title: t.Title,
        subTitle: '',
        tagList: [],
        imgUrl: t.ImageUrl,
        specialText: t.TransactTimeRange,
        dateText: '',
        tcPrice: t.TCPrice,
        chanelPrice: t.LCPrice,
        profit: parseInt(t.TCPrice - t.LCPrice),
        salesNum: 0,
      };
    },
    sortList: [
      {
        id: 1,
        name: '推荐排序',
      },
      {
        id: 2,
        name: '销量排序',
      },
      {
        id: 3,
        name: '价格 低-高',
        isShowPop: !1,
        list: [
          {
            id: 3,
            name: '价格 低-高',
          },
          {
            id: 4,
            name: '价格 高-低',
          },
        ],
      },
    ],
    sortId: 1,
    daysList: [],
    isShowPriceRange: !0,
    isShowFilter: !0,
  },
];
