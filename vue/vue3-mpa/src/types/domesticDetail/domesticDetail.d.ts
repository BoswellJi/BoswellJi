declare namespace Domestic {
  type SingleProduct = {
    productType: number | undefined;
    lineId: string | undefined;
    version: string | undefined;
    adultNum: number | undefined;
    singleRoomNum: number | undefined;
    childNum: number | undefined;
    useDate: string | undefined;
    endDate: string | undefined;
    [key: string]: any;
  };

  type PriceObjType = {
    PriceId: number | undefined;
    PriceName: string | undefined;
    TouristType: number | undefined;
    IsReckonPersons: number | undefined;
    MarketPrice: number | undefined;
    DistributePrice: number | undefined;
    DistributeId: number | undefined;
  };

  type PrefObjType = {
    PrefRuleId: any;
    PrefAmount: number | null;
    PrefDes: any;
    PrefRemark: any;
    PrefSupplierDes: any;
  };

  type NewpriceType = {
    PriceList: PriceObjType[];
    HotelList: any[];
    PrefInfoList: PrefObjType[];
    singleProduct: any[];
  };

  export interface Req {
    code: number;
    lineId: string;
    filterProduct: boolean;
  }

  export interface Version {
    id: number;
    title: string;
    day: number;
    night: number;
    goTraffic: number;
    returnTraffic: number;
    describle: string;
    hasdefault: number;
    groundDay: number;
    hasPrice: number;
    containDynamicHotel: number;
    showTripMes: number;
    hasNew: number;
    featureId: number;
    trafficMixs: any[];
    containResource?: any;
  }

  export interface TravelRouteList {
    routeDescription: string;
    routeImage: string;
    routeRemark?: any;
    routeTime?: any;
    routeTitle: string;
    travelType: number;
    otherTimeConsum: number;
    playTimeConsum: string;
    transTimeConsum: string;
  }

  export interface TravelDetailsNew {
    general?: any;
    theDay: number;
    theDayTheme: string;
    travelRouteList: TravelRouteList[];
    supplierShoppingInfoList?: any;
    supplierSelfPayList?: any;
  }

  export interface TravelListsNew {
    otherShoppingNew?: any;
    travelDetailsNew: TravelDetailsNew[];
  }

  export interface ShoppingInfoList {
    cityId?: any;
    cityName: string;
    cost: string;
    intro: string;
    name: string;
  }

  export interface DestinationCity {
    id: number;
    name: string;
    pinYin: string;
    type: number;
    cityId: string;
    cityName: string;
    provinceId: number;
    provinceName: string;
    provincePinYin: string;
    countryId: number;
    countryName: string;
    countryPinYin: string;
  }

  export interface ImgList {
    imgTitle?: any;
    imgUrl: string;
  }

  export interface HotelList {
    address?: any;
    days: number;
    imgLists: ImgList[];
    intro: string;
    name?: any;
    travelGuide?: any;
  }

  export interface TrainList {
    endStation?: any;
    endTime?: any;
    seatNo?: any;
    startStation?: any;
    startTime?: any;
    trainNo?: any;
    useTime: string;
  }

  export interface TrainTravel {
    trainList: TrainList[];
    travelDay: number;
    travelNo: number;
    travelValue: string;
  }

  export interface Data {
    productTitle: string;
    supplierProductTitle: string;
    subTitle: string;
    lineId: number;
    productCode: string;
    departureCityName: string;
    arrivalCityName: string;
    playDays: number;
    productManager: string;
    versions: Version[];
    trafficDesc: string;
    travelListsNew: TravelListsNew;
    playNights: number;
    currentVersion: string;
    journeyList?: any;
    shoppingInfoList: ShoppingInfoList[];
    feeDes: string;
    feeItem: string;
    childrenPriceNotice: string;
    feature: string;
    notice: string;
    securityNoticy: string;
    warmTip: string;
    departureCityId: string;
    arrivalCityId: string;
    contact: string;
    destinationCitys: DestinationCity[];
    minDistributePrice: number;
    minMarketPrice: number;
    supplierId: number;
    supplierName: string;
    mangerName: string;
    mangerNo: string;
    linkMan: string;
    linkMobile: string;
    bookDescrible: string;
    lineProperty: string;
    flightInfoList: any[];
    hotelLists: HotelList[];
    trainTravels: TrainTravel[];
    cardTypeLimits: string;
    limitMaxValue: number;
    limitMinValue: number;
    images: string[];
  }

  export interface Res {
    code: number;
    message: string;
    success: boolean;
    data: Data;
  }
}
