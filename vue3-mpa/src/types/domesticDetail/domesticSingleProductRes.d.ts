declare namespace DomesticSingleProductRes {
  type ArrCity$1Type = {
    cityId: number;
    cityName: string;
    provId: number;
    provName: string;
  };

  type PriceList$2Type = {
    adultSalePrice: null;
    adultSettlePrice: null;
    childSalePrice: null;
    childSettlePrice: null;
    date: string;
    standSalePrice: number;
    standSettlePrice: number;
    stockSum: number;
    stockType: number;
    stockUse: number;
  };

  type StationList$1Type = {
    arrAddress: string;
    arrType: string;
    depAddress: string;
    depType: string;
    serviceName: string;
    serviceType: number;
  };

  type Car$0Type = {
    carClass: number;
    carClassName: string;
    carSeats: number;
    carTime: number;
    carTimeUnit: string;
    carTimeUnitName: string;
    carType: number;
    carTypeName: string;
    isDriver: number;
    serviceName: string;
    serviceType: number;
    stationList: Array<StationList$1Type>;
  };

  type Data$3Type = {
    application: string;
    arrCity: ArrCity$1Type;
    carInfo: Car$0Type;
    carSeats: null;
    depCity: ArrCity$1Type;
    exclude: string;
    include: string;
    instruction: string;
    isDefaultChoose: boolean;
    isGift: boolean;
    isMustChoose: boolean;
    isTest: number;
    mainTitle: string;
    maxNum: number;
    minNum: number;
    priceList: Array<PriceList$2Type>;
    resourceCode: string;
    resourceId: number;
    resourceType: number;
    ruleId: number;
    ruleSort: number;
    saleType: string;
    saleUnit: string;
    sort: number;
    subTitle: string;
    supplierId: number;
    supplierName: string;
    tcManagerName: string;
    tcManagerNo: string;
    useType: number;
    lcTotalPrice: number;
    isGift: boolean;
  };

  type Result$0Type = {
    code: number;
    message: string;
    success: boolean;
    data: Array<Data$3Type>;
  };
}
