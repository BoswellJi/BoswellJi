import { defineStore } from 'pinia';
import request from '@/utils/request';
import { computed, reactive, ref } from 'vue';
import { mul } from '@/utils/math';
import type { FormInstance } from 'element-plus';

const getDetail = async (req: Domestic.Req): Promise<any> => {
  const { data } = await request({
    url: '/webapi/resourceCommon/detail',
    method: 'post',
    data: <Domestic.Req>{
      ...req,
    },
  });
  return data;
};

export const useDomesticBooking = defineStore('domesticBooking', () => {
  const detail = ref<Domestic.Data>();
  const queryString = ref<domesticBooking.UrlQuery>({
    lid: '',
    pricelist: '',
    day: '',
    supplierid: '',
    version: '',
    playDays: 0,
  });
  const hotelList = ref<{ [key: string]: any }[]>();
  const prefInfoList = ref<Domestic.PrefObjType[]>();
  const priceList = ref<Domestic.PriceObjType[]>();
  const singleProduct = ref<Domestic.SingleProduct[]>();
  const insuranceList = ref<Map<string, DomesticInsurance.Data[]>>(new Map());
  const formRef = ref<FormInstance>();
  const concatPerson = reactive({
    name: '',
    phone: '',
    email: '',
  });
  const userName = ref('');
  const personTypeList = ref<string[]>([]);
  const personList = ref<domesticBooking.Person[]>([
    {
      name: '',
      personType: '1',
      certType: '1',
      idNo: '',
      date: '',
      sex: '1',
      phone: '',
    },
  ]);
  const setPersonList = (e: domesticBooking.Person[]) => {
    personList.value = e;
  };
  const remark = ref('');

  const priceMap = computed(() => {
    const map: { [key: string]: string } = {};
    queryString.value.pricelist.split('|').forEach((item) => {
      const temp = item.split(':');
      map[temp[0]] = temp[1];
    });
    return map;
  });

  const setPersonTypeList = (e: string[]) => {
    personTypeList.value = e;
  };

  const setQueryString = (query: domesticBooking.UrlQuery) => {
    queryString.value = query;
  };

  const getDetailInfo = async (data: Domestic.Req) => {
    detail.value = await getDetail(data);
  };

  const setHotelList = (value: Domestic.HotelList[]) => {
    hotelList.value = value;
  };

  const setPrefInfoList = (value: Domestic.PrefObjType[]) => {
    prefInfoList.value = value;
  };

  const setPriceList = (value: Domestic.PriceObjType[]) => {
    priceList.value = value;
  };

  const setSingleProduct = (value: Domestic.SingleProduct[]) => {
    singleProduct.value = value;
  };

  const setUserName = (name: string) => {
    userName.value = name;
  };

  const totalPrice = (item: Domestic.PriceObjType) => {
    return item.PriceId ? mul(priceMap.value[item.PriceId], item.DistributePrice || '') : '';
  };

  const submitValid = (): Promise<boolean> => {
    return new Promise((reslove) => {
      formRef.value?.validate((v) => {
        reslove(v);
      });
    });
  };

  return {
    detail,

    queryString,
    setQueryString,

    hotelList,
    setHotelList,

    prefInfoList,
    setPrefInfoList,

    priceList,
    setPriceList,

    singleProduct,
    setSingleProduct,

    userName,
    setUserName,

    priceMap,
    insuranceList,
    concatPerson,

    personTypeList,
    setPersonTypeList,

    personList,
    setPersonList,

    remark,
    formRef,

    totalPrice,
    getDetailInfo,
    submitValid,
  };
});
