// @ts-nocheck
import { defineStore } from 'pinia';
import request from '@/utils/request';
import { Local } from '@/utils/storage';

export const useHome = defineStore('home', {
  state: () => ({
    // 推荐
    feilongProduct: [],
    profitProduct: [],
    specialPriceProduct: [],
    // 热销
    hotAroundProductList: [],
    hotDomesticSelfProductList: [],
    hotAbroadProductList: [],
    hotCruiseProductList: [],
    // 专线
    specialAroundProductList: [],
    specialDomesticSelfProductList: [],
    specialAbroadProductList: [],
    specialCruiseProductList: [],
  }),
  actions: {
    async getList() {
      Promise.all([queryFeilongProduct(), querySpecialPriceProduct(), queryProfitProduct()]).then(
        (res) => {
          this.feilongProduct = res[0].data?.feilongProduct?.datas || [];
          this.profitProduct = res[2].data?.profitProduct?.datas || [];
          this.specialPriceProduct = res[1].data?.specialPriceProduct?.datas || [];
        },
      );
    },
    async getDedicatedLineList() {
      const {
        data: { aroundProductList, domesticSelfProductList, abroadProductList, cruiseProductList },
      } = await request({
        url: '/webapi/homeIndex/getDedicatedLineList',
        method: 'post',
        data: {
          startCityId: getStartCityId()?.id,
          startCityName: getStartCityId()?.name,
          sort: 2,
        },
      });
      this.hotAroundProductList = aroundProductList || [];
      this.hotDomesticSelfProductList = domesticSelfProductList || [];
      this.hotAbroadProductList = abroadProductList || [];
      this.hotCruiseProductList = cruiseProductList || [];
    },
    async getSpecialLineList() {
      const {
        data: { aroundProductList, domesticSelfProductList, abroadProductList, cruiseProductList },
      } = await request({
        url: '/webapi/homeIndex/getDedicatedLineList',
        method: 'post',
        data: {
          aroundDedicatedLine: [94713],
          domesticDedicatedLine: [1714],
          abroadDedicatedLine: [88390],
          cruiseDedicatedLine: [1],
          startCityId: getStartCityId()?.id,
          startCityName: getStartCityId()?.name,
          sort: 2,
        },
      });
      this.specialAroundProductList = aroundProductList || [];
      this.specialDomesticSelfProductList = domesticSelfProductList || [];
      this.specialAbroadProductList = abroadProductList || [];
      this.specialCruiseProductList = cruiseProductList || [];
    },
  },
});

function getStartCityId() {
  const startcity = Local.get('startcity');
  return startcity?.value;
}

async function queryFeilongProduct() {
  return await request({
    url: '/webapi/homeIndex/queryFeilongProduct',
    method: 'post',
    data: {},
  });
}

async function querySpecialPriceProduct() {
  return await request({
    url: '/webapi/homeIndex/querySpecialPriceProduct',
    method: 'post',
    data: {},
  });
}

async function queryProfitProduct() {
  return await request({
    url: '/webapi/homeIndex/queryProfitProduct',
    method: 'post',
    data: {},
  });
}
