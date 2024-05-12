<template>
  <div class="mb-1 text-[0.36rem]">费用信息</div>
  <template v-for="item of priceList" :key="item.PriceId">
    <div class="mt-[10px] text-[0.2rem]">{{ item.PriceName }}</div>
    <div class="flex items-center">
      <div class="text-[0.18rem] text-[#FF6005]">
        {{ item.DistributePrice }}元<span class="text-[12px] text-[#707070]"
          >×{{ item.PriceId ? priceMap[item.PriceId] : '' }}</span
        >
      </div>
      <div class="ml-[5px] flex-1 border-t border-dashed border-[#FF6005]"></div>
      <div class="text-[0.18rem] text-[#FF6005]">{{ domesticBooking.totalPrice(item) }}元</div>
    </div>
  </template>

  <div class="mt-[10px] text-[0.2rem]">保险</div>
  <div class="flex items-center">
    <div class="text-[0.18rem] text-[#FF6005]">
      {{ insurance?.price || 0 }}元<span class="text-[12px] text-[#707070]"
        >×{{ insuranceNum || 0 }}</span
      >
    </div>
    <div class="ml-[5px] flex-1 border-t border-dashed border-[#FF6005]"></div>
    <div class="text-[0.18rem] text-[#FF6005]">{{ insuranceTotal || 0 }}元</div>
  </div>

  <div v-if="domesticBooking.singleProduct?.length && singleListTotal > 0">
    <div class="mt-[10px] text-[0.2rem]">单品</div>
    <template v-for="(item, index) of domesticBooking.singleProduct" :key="index">
      <div class="flex items-center" v-if="item.saleType === 'STD'">
        <div class="text-[0.18rem] text-[#FF6005]">
          {{ item.lcUseDate.standSalePrice }}元<span class="text-[12px] text-[#707070]"
            >×{{ item.lcCarNum }}</span
          >
        </div>
        <div class="ml-[5px] flex-1 border-t border-dashed border-[#FF6005]"></div>
        <div class="text-[0.18rem] text-[#FF6005]">{{ item.lcTotalPrice }}元</div>
      </div>
      <template v-if="item.saleType !== 'STD'">
        <div class="flex items-center">
          <div class="text-[0.18rem] text-[#FF6005]">
            {{ item.lcUseDate.adultSalePrice }}元<span class="text-[12px] text-[#707070]"
              >×{{ item.lcAdultNum }}</span
            >
          </div>
          <div class="ml-[5px] flex-1 border-t border-dashed border-[#FF6005]"></div>
          <div class="text-[0.18rem] text-[#FF6005]">
            {{ item.lcUseDate.adultSalePrice * item.lcAdultNum }}元
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-[0.18rem] text-[#FF6005]">
            {{ item.lcUseDate.childSalePrice }}元<span class="text-[12px] text-[#707070]"
              >×{{ item.lcChildNum }}</span
            >
          </div>
          <div class="ml-[5px] flex-1 border-t border-dashed border-[#FF6005]"></div>
          <div class="text-[0.18rem] text-[#FF6005]">
            {{ item.lcUseDate.childSalePrice * item.lcChildNum }}元
          </div>
        </div>
      </template>
    </template>
  </div>

  <div class="mt-[.26rem] flex items-center justify-between whitespace-nowrap">
    <span class="text-[0.3rem] leading-[1em]">总额:</span>
    <span class="ml-[5px] self-end text-[12px] leading-[1.3em] text-[#FF6005]">&yen;</span>
    <span class="flex-1 text-[0.3rem] leading-[1em] text-[#FF6005]">{{ total }}</span>
    <span class="self-end leading-[1.3em]" v-if="prefInfoTotal">(共优惠¥{{ prefInfoTotal }})</span>
  </div>

  <button
    class="mt-[.26rem] h-[.67rem] w-[100%] rounded-[5px] bg-[#FF8D1B] text-[.24rem] text-[#fff]"
    v-loading="loading"
    @click="submit"
  >
    提交订单
  </button>
</template>

<script lang="ts" setup>
import { useDomesticBooking } from '@/stores/domesticBooking';
import { add, mul, sun } from '@/utils/math';
import request from '@/utils/request';
import { safeWindowOpen } from '@/utils/util';
import { ElMessage, ElMessageBox } from 'element-plus';
import debounce from 'lodash-es/debounce';
import { computed, ref } from 'vue';

const domesticBooking = useDomesticBooking();
const loading = ref(false);

const detail = computed(() => {
  return domesticBooking.detail;
});
const concatPerson = computed(() => {
  return domesticBooking.concatPerson;
});
const queryString = computed(() => {
  return domesticBooking.queryString;
});
const priceMap = computed(() => {
  return domesticBooking.priceMap;
});
const priceList = computed(() => {
  return domesticBooking.priceList;
});
const insurance = computed(() => {
  let insurance;
  domesticBooking.insuranceList.forEach((arr) => {
    arr.forEach((item) => {
      if (item.checked) {
        insurance = item;
      }
    });
  });
  return insurance as unknown as DomesticInsurance.Data;
});
const insuranceNum = computed(() => {
  return Number(domesticBooking.priceMap[1]) + Number(domesticBooking.priceMap[8]);
});
const insuranceTotal = computed(() => {
  return mul(insuranceNum.value, insurance.value ? insurance.value.price : 0);
});
const lineTotal = computed(() => {
  let total = 0;
  domesticBooking.priceList?.forEach((price) => {
    total = add(domesticBooking.totalPrice(price) || 0, total);
  });
  return total;
});
const singleListTotal = computed(() => {
  return (
    domesticBooking.singleProduct?.reduce((total, item) => {
      return (total += item.isGift ? 0 : item.lcTotalPrice);
    }, 0) || 0
  );
});
const singleListStr = computed(() => {
  var SingleList: any = [];
  const list: any = (domesticBooking.singleProduct as any).filter(function (item: any) {
    return item.lcTotalPrice || item.isGift;
  });
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var StockPricelist = [];
    var StationInfoList: any = [];
    var resourceType = item.resourceCode.slice(1);
    var lcUseDate = item.lcUseDate; // 日期价格

    if (item.saleType === 'STD') {
      StockPricelist = [item.lcUseDate].map(function (price) {
        return {
          ResourceType: resourceType,
          PriceType: 10,
          Date: price.date,
          SalesPrice: item.isGift ? 0 : price.standSalePrice,
          NeedPriceNum: item.isGift ? 1 : item.lcCarNum,
        };
      });
    } else if (item.saleType === 'CROWD') {
      StockPricelist.push({
        ResourceType: resourceType,
        PriceType: 1,
        Date: lcUseDate.date,
        SalesPrice: item.isGift ? 0 : lcUseDate.adultSalePrice,
        NeedPriceNum: item.isGift ? 1 : item.lcAdultNum,
      });
      StockPricelist.push({
        ResourceType: resourceType,
        PriceType: 8,
        Date: lcUseDate.date,
        SalesPrice: item.isGift ? 0 : lcUseDate.childSalePrice,
        NeedPriceNum: item.isGift ? 1 : item.lcChildNum,
      });
    }

    if (item.carInfo) {
      item.carInfo.stationList.forEach(function (station: any) {
        StationInfoList.push({
          StationResourceId: 0, //station.depAddress, //上车点id
          BackStations: station.arrAddress, // 下车点名称
          GoTime: null, // 发车时间 (item.carInfo && item.carInfo.carTime) ||
          DestinationTime: null, // 预计到达时间
        });
      });
    }
    if (item.isGift) {
      var NeedNum = 1;
    } else {
      // eslint-disable-next-line no-redeclare
      var NeedNum: number =
        item.saleType === 'STD' ? item.lcCarNum : item.lcAdultNum + item.lcChildNum;
    }
    SingleList.push({
      ResourceId: item.resourceId,
      ResourceType: item.resourceCode.slice(1),
      CarType: (item.carInfo && item.carInfo.carType) || 0,
      UseDate: item.useType === 1 ? '' : item.lcUseDate.date,
      NeedNum: NeedNum,
      SingleRoomCount: 0,
      DepartureCityName: item.depCity.cityName,
      DepartureCityId: item.depCity.cityId,
      DepartureProvinceId: item.depCity.provId,
      DepartureProvinceName: item.depCity.provName,
      StockPricelist: StockPricelist,
      StationInfoList: StationInfoList,
    });
  }
  return JSON.stringify(SingleList);
});
const settleTotal = computed(() => {
  let total = 0;
  total = add(lineTotal.value, total);
  total = add(singleListTotal.value, total);
  total = sun(total, prefInfoTotal.value);
  const hotelList = domesticBooking.hotelList;
  if (hotelList && hotelList.length > 0) {
    const pcount = Number(domesticBooking.priceMap[1]);
    hotelList.forEach((item) => {
      const num0 = mul(item.PeoplePrice, pcount);
      const num1 = sun(total, num0);
      total = add(num1, item.RoomPrice);
    });
  }
  return total;
});
const prefInfoTotal = computed(() => {
  return (
    domesticBooking.prefInfoList?.reduce((total, item) => {
      return (total += item.PrefAmount || 0);
    }, 0) || 0
  );
});
const total = computed(() => {
  let total = 0;
  total = add(lineTotal.value, total);
  total = add(insuranceTotal.value, total);
  total = add(singleListTotal.value, total);
  total = sun(total, prefInfoTotal.value);
  const hotelList = domesticBooking.hotelList;
  if (hotelList && hotelList.length > 0) {
    const pcount = Number(domesticBooking.priceMap[1]);
    hotelList.forEach((item) => {
      const num0 = mul(item.PeoplePrice, pcount);
      const num1 = sun(total, num0);
      total = add(num1, item.RoomPrice);
    });
  }
  return total;
});
const prefInfoList = computed(() => {
  return domesticBooking.prefInfoList
    ? domesticBooking.prefInfoList[0] || ({} as Domestic.PrefObjType)
    : ({} as Domestic.PrefObjType);
});
const allPersonCount = computed(() => {
  const price = Object.assign({}, priceMap.value);
  delete price[5]; // 单房差不算人数
  return Object.values(price).reduce((total, item) => {
    return (total += Number(item));
  }, 0);
});
const passengerInfo = computed(() => {
  return domesticBooking.personList
    .filter((person) => person.name)
    .map((person) => {
      return `${person.name},${person.phone},${person.certType},${person.idNo},${person.date},${person.sex},${person.personType}`;
    })
    .join('|');
});
const remark = computed(() => {
  return `${domesticBooking.remark}${domesticBooking.personTypeList.toString()}`;
});
const prices = computed(() => {
  return domesticBooking.priceList
    ?.filter((price) => Number(domesticBooking.priceMap[price.PriceId || '']))
    .reduce((total, price) => {
      let temp = '';
      temp = `${price.PriceId},${domesticBooking.priceMap[price.PriceId || '']},${
        price.TouristType
      }`;
      if (detail.value?.supplierId) {
        temp = `${price.DistributeId},${domesticBooking.priceMap[price.PriceId || '']},${
          price.TouristType
        }`;
      }
      total += total ? '|' + temp : temp;
      return total;
    }, '');
});

const vaild = async () => {
  if (!Object.keys(detail.value || {}).length) {
    ElMessage.error('请填写订单必需信息，详见页面提示');
    return;
  }
  if (!(await domesticBooking.submitValid())) {
    ElMessage.warning('请填写订单必需信息，详见页面提示');
    return;
  }
  return true;
};

const postDomesticStaticOrder = async () => {
  const flag = await vaild();
  if (!flag) return;

  const { lineId, playDays, supplierId, departureCityId, departureCityName } =
    detail.value as Domestic.Data;
  loading.value = true;

  try {
    await request<DomesticStaticOrder.Data, DomesticStaticOrder.Data, any>({
      url: '/webapi/order/postDomesticStaticOrder',
      method: 'post',
      data: {
        AdultPrice: priceList.value ? priceList.value[0].DistributePrice || 0 : 0,
        ProductCode: lineId,
        LineId: lineId,
        ContactName: concatPerson.value.name,
        ContactMobile: concatPerson.value.phone,
        TeamDate: queryString.value.day,
        PlayDays: playDays,
        ContactEmail: concatPerson.value.email,
        SupplierId: supplierId,
        DepartureCityId: Number(departureCityId),
        DepartureCityName: departureCityName,
        AdultNum: Number(priceMap.value[1]),
        ChildNum: Number(priceMap.value[8]),
        Version: queryString.value.version,
        SceneryJson: '',
        IsHaveInsurance: insuranceTotal.value > 0 ? 1 : 0,
        UpGrade: false,
        Prices: prices.value,
        AllPersonCount: allPersonCount.value,
        AllAmount: settleTotal.value,
        PassengerInfo: passengerInfo.value,
        LJAcivityRuleId: prefInfoList.value?.PrefRuleId,
        LJAmount: prefInfoList.value.PrefAmount || 0,
        InsuranceTypeId: insurance.value?.id,
        Remark: remark.value,
        SingleListStr: singleListStr.value,
      },
    });
    ElMessage.success('订单创建成功');
    await ElMessageBox.confirm(
      `
      <div>尊敬的旅仓用户您好：</div>
      <div>订单提交成功！待供应商确认库存后方可付款，请耐心等候或联系您的计调经理</div>
      `,
      '提示',
      {
        dangerouslyUseHTMLString: true,
        showCancelButton: false,
        confirmButtonText: '查看订单',
      },
    );
    location.replace('/Member/OrderList');
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

const submit = debounce(() => {
  if (loading.value) return;
  postDomesticStaticOrder();
}, 300);
</script>
