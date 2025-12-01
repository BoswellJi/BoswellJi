export type PriceList$1Type = {
  priceId: number;
  priceName: string;
  touristType: number;
  startDate: string;
  marketPrice: number;
  distributePrice: number;
  residualCount: number;
  hasReckonPersons: number;
  priceKey: number;
  tripInfoList: Array<unknown>;
  settleTempPrice: number;
  containPref: boolean;
  prefRuleId: number;
  prefDes: null;
  prefRemark: null;
  prefSupplierDes: null;
};

export type Data$2Type = {
  hasCreate: boolean;
  priceList: Array<PriceList$1Type>;
  hotelList: Array<unknown>;
  prefRuleId: number;
  prefAmount: null;
  prefDes: null;
  prefRemark: null;
  prefSupplierDes: any;
};

export type Result$0Type = {
  code: number;
  message: string;
  success: boolean;
  data: Data$2Type;
};
