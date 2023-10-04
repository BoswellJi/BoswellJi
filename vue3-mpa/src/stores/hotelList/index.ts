// @ts-nocheck
import { defineStore } from 'pinia';
import request from '@/utils/request';
import moment from 'moment';

export const useHotelList = defineStore('hotelList', {
  state: () => ({
    loading: false,
    // 搜索
    target: '北京',
    targetId: '0101',
    brand: '',
    startEndDate: [moment().format('YYYY-MM-DD'), moment().add(1, 'days').format('YYYY-MM-DD')],

    // 行政
    districtName: '行政区',
    districtId: '',
    // 商圈
    businessZoneName: '商圈',
    businessZoneId: '',
    // 车站
    labelName: '机场车站',
    labelId: '',

    // 排序类型
    sortType: 0,
    // 星级别
    star: [],
    // 品牌
    hotelBrand: [],
    allHotelBrand: [],
    // 价格
    price: '',
    priceLow: null,
    priceHigh: null,

    // 发票
    invoiceMode: ['Elong','Hotel'],

    pageIndex: 1,
    pageSize: 10,
    total: 0,

    // 筛选列表
    keyWordList: [],
    // 行政区
    regionList: [],
    // 商圈
    businessAreaList: [],
    // 车站
    trainStationList: [],
    // 品牌连锁
    brandList: [],
    // 星级
    starList: [],
    // 价格
    priceList: [
      { label: '200元以下', value: '0,200' },
      { label: '201~300元', value: '201,300' },
      { label: '301~500元', value: '301,500' },
      { label: '501~800元', value: '501,800' },
    ],

    list: [],
  }),
  actions: {
    async refreshData() {
      this.pageIndex = 1;
      this.getHotelList();
    },
    async getHotelList() {
      let {
        brand,
        target,
        pageIndex,
        pageSize,
        sortType,
        targetId,
        startEndDate: [startDate, endDate],
        hotelBrand,
        allHotelBrand,
        price,
        priceLow,
        priceHigh,
        star,
        invoiceMode,
        districtId,
        businessZoneId,
        labelId,
      } = this;
      if (price) {
        const [first, last] = price.split(',');
        priceLow = first;
        priceHigh = last;
      }
      const sortMap = {
        0: 'Default',
        1: 'RateDesc',
        2: 'RateAsc',
        3: 'StarRankDesc',
      };
      this.loading = true;
      try {
        const { data } = await request({
          url: '/webapi/hotel/queryHotelList',
          method: 'post',
          data: {
            arrivalDate: startDate,
            departureDate: endDate,
            cityId: targetId,
            districtId,
            businessZoneId,
            labelId,
            lowRate: priceLow || 0,
            highRate: priceHigh || 0,
            starRateList: star,
            brandIdList: hotelBrand.concat(allHotelBrand),
            invoiceModeList: invoiceMode,
            sort: sortMap[sortType],
            queryText: brand || target,
            pageIndex,
            pageSize,
          },
        });
        if (data) {
          const { count, hotels } = data;
          this.list = hotels.map((item) => {
            return item;
          });
          this.total = count || 0;
        } else {
          this.list = [];
          this.total = 0;
        }
      } catch (err) {
        // todo...
      } finally {
        this.loading = false;
      }
    },
  },
});
