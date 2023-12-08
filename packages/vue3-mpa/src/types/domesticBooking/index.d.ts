/// <reference path="./domesticInsurance.d.ts" />

declare namespace domesticBooking {
  export interface UrlQuery {
    lid: string;
    pricelist: string;
    day: string;
    supplierid: string;
    version: string;
    playDays: number;
  }

  export interface Person {
    name: string;
    personType: string;
    certType: string;
    idNo: string;
    date: string;
    sex: string;
    phone: string;
  }
}
