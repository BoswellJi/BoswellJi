// @ts-nocheck
import { defineStore } from 'pinia';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';

export const useHotelOrder = defineStore('hotelOrder', {
  state: () => ({
    loading: false,

    startDate: '',
    endDate: '',
    hotelIds: '',
    roomTypeId: '',
    ratePlanId: '',
    numberOfRooms: 1,

    detail: {},

    remark: '',
    list: [
      {
        name1: '',
        name2: '',
      },
    ],
    // 身份证+name
    idenName: '',
    idenNo: '',

    name: '',
    phone: '',
    email: '',

    distributorName: '',
    jobName: '',
    jobNumber: '',

    confirmMsg: 1, // 短信确认

    submitLoading: false,
  }),
  getters: {
    personNum(state) {
      return state.list.reduce((arr, item) => {
        if (item.name1) {
          arr.push(item.name1);
        }
        if (item.name2) {
          arr.push(item.name2);
        }
        return arr;
      }, []);
    },
  },
  actions: {
    async getOrderInfo() {
      let { startDate, endDate, hotelIds, roomTypeId, ratePlanId, numberOfRooms } = this;
      this.loading = true;
      const { data } = await request({
        url: '/webapi/hotelResource/ratePlanDetail',
        method: 'post',
        data: {
          arrivalDate: startDate,
          departureDate: endDate,
          hotelIds,
          roomTypeId,
          ratePlanId,
          numberOfRooms,
        },
      });
      this.loading = false;
      this.detail = data;
    },
    async submitOrder() {
      const {
        detail: { hotelRoomVo, ratePlanVo, hotelHeadVo, calculateRateVo, requestId },
        startDate,
        endDate,
        hotelIds,
        roomTypeId,
        ratePlanId,
        numberOfRooms,
        name,
        phone,

        list,
        distributorName,
        jobName,
        jobNumber,
        confirmMsg,
      } = this;

      if (list.filter((item) => !item.name1 && !item.name2).length) {
        ElMessage.warning('入住人信息填写不完整');
        return;
      }
      if (!name || !phone) {
        ElMessage.warning('联系人信息填写不完整');
        return;
      }
      const personNum = this.personNum.length;

      if (this.submitLoading) return;
      this.submitLoading = true;
      try {
        const { data } = await request({
          url: '/webapi/order/submit',
          method: 'post',
          headers: {},
          data: {
            arrivalDate: startDate,
            departureDate: endDate,
            earliestArrivalTime: `${startDate} 14:00`,
            latestArrivalTime: `${endDate} 12:00`,
            hotelId: hotelIds,
            roomTypeID: roomTypeId,
            ratePlanId: ratePlanId,
            totalPrice: calculateRateVo.orderSumRate,
            customerPrice: ratePlanVo.ratePlanSumMemberRate,
            numberOfRooms: numberOfRooms,
            paymentType: 'Prepay',
            numberOfCustomers: personNum,
            currencyCode: 'RMB',
            confirmationType: 'NotAllowedConfirm',
            contact: {
              name,
              mobile: phone,
            },
            orderRooms: this.list.map((room) => {
              const { name1, name2 } = room;
              return {
                customers: [name1, name2]
                  .filter((name) => name)
                  .map((name) => {
                    if (name === this.idenName) {
                      return {
                        name,
                        nationality: '中国',
                        idCardType: 'IdentityCard',
                        idCardNo: this.idenNo,
                      };
                    }
                    return { name };
                  }),
              };
            }),
            requestId: requestId,
            hotelName: hotelHeadVo.hotelName,
            roomTypeName: hotelRoomVo.name,
            customerName: distributorName,
            jobNUmber: jobNumber,
            jobName,
            invoiceMode: ratePlanVo.invoiceMode,
            cityId: hotelHeadVo.city,
            cityName: hotelHeadVo.cityName,
            districtId: hotelHeadVo.district,
            districtName: hotelHeadVo.districtName,
            purchasePrice: ratePlanVo.ratePlanSumCostRate,
            sendSms: confirmMsg,
          },
        });

        ElMessage.success('创建成功');
        this.pay(data);
      } catch (err) {
        // todo...
      } finally {
        this.submitLoading = false;
      }
    },
    async pay(serialId) {
      const { data } = await request({
        url: `/webapi/pay/getPcCashierUrl`,
        method: 'post',
        data: {
          lcId: serialId,
          pt: 5001,
        },
      });
      location.replace(data);
    },
    async getCalcPrice() {
      let { startDate, endDate, hotelIds, roomTypeId, ratePlanId, numberOfRooms } = this;
      const {
        data: { numberOfRooms: rooms, ratePlanSumMemberRate, orderSumRate },
      } = await request({
        url: '/webapi/hotelResource/calculateRate',
        method: 'post',
        data: {
          arrivalDate: startDate,
          departureDate: endDate,
          hotelIds,
          roomTypeId,
          ratePlanId,
          numberOfRooms,
        },
      });
      this.detail.calculateRateVo = {
        numberOfRooms: rooms,
        orderSumRate,
        ratePlanSumMemberRate,
      };
    },
  },
});
