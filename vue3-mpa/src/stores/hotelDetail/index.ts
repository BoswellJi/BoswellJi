// @ts-nocheck
import { defineStore } from 'pinia';
import request from '@/utils/request';
import moment from 'moment';

export const useHotelDateil = defineStore('hotelDetail', {
  state: () => ({
    loading: false,
    hotelIds: '',
    startEndDate: [moment().format('YYYY-MM-DD'), moment().add(1, 'days').format('YYYY-MM-DD')],

    invoiceMode: ['Hotel'],

    detail: {},
  }),
  actions: {
    async getRoomTypeList() {
      let {
        startEndDate: [startDate, endDate],
        hotelIds,
        invoiceMode,
      } = this;
      this.loading = true;
      const { data } = await request({
        url: '/webapi/hotelResource/detail',
        method: 'post',
        data: {
          arrivalDate: startDate,
          departureDate: endDate,
          hotelIds,
          invoiceMode: invoiceMode.length === 2 ? 'NoSense' : invoiceMode.toString(),
        },
      });
      this.loading = false;
      this.detail = data;
    },
  },
});
