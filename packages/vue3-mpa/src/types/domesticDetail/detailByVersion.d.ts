declare namespace DetailByVersionRes {
  type TravelDetailsNew$1Type = {
    general: null;
    theDay: number;
    theDayTheme: string;
    travelRouteList: Array<unknow>;
    supplierShoppingInfoList: null;
    supplierSelfPayList: null;
  };

  type TravelListsNew$2Type = {
    otherShoppingNew: null;
    travelDetailsNew: Array<TravelDetailsNew$1Type>;
  };

  type Title$3Type = {
    index: number;
    title: string;
    type: number;
  };

  type JourneySections$4Type = {
    type: number;
    title: string;
    sort: number;
    describle: string;
    reminder: string;
    cityId: number;
    cityName: null;
    time: string;
    duration: string;
    minConsumption: null;
    product: null;
    journeyImage: Array<unknow>;
    trafficType: number;
    checkboxType: Array<unknow>;
  };

  type MealDetails$5Type = {
    mealType: number;
    hasContains: boolean;
    remark: string;
  };

  type Meals$6Type = {
    pitchNone: boolean;
    mealDetails: Array<MealDetails$5Type>;
  };

  type Hotel$7Type = {
    hotelId: null;
    name: null;
    address: null;
    intro: null;
    level: number;
    journeyImageList: Array<unknow>;
    reminder: null;
  };

  type ReferHotelsType = {
    resourceId: number;
    hotelName: string;
  };

  type JourneyList$8Type = {
    day: number;
    title: Array<Title$3Type>;
    rendezvous: null;
    tripDesc: null;
    journeySections: Array<JourneySections$4Type>;
    meals: Meals$6Type;
    hotel: Hotel$7Type;
    referHotels: Array<ReferHotelsType>;
    hotelType: number;
    routeShow: boolean;
  };

  type NewVersions$9Type = {
    id: number;
    title: string;
    trafficRemark: null;
    trafficList: Array<unknow>;
  };

  type ShoppingResult = {
    day: string;
    shopName: string;
    shopCityId: number;
    shopCityName: string;
    businessHours: string;
    startTime: string;
    stayTime: string;
    businessProduct: string;
    shopIntro: null;
    routeShow: boolean;
  };

  type SelfPaidItem = {
    paidItemName: string;
    cost: string;
    intro: string;
    cityId: string;
    cityName: string;
    routeShow: boolean;
  };

  type TrafficList$1 = {
    trafficType: string;
    tripNo: string;
    trafficNumber: string;
    deptCity: string;
    deptStation: string;
    deptTime: string;
    destCity: string;
    destStation: string;
    destTime: string;
    stayType: null;
    intervalDays: number;
    airlineCompany: null;
    runTime: number;
    handLuggage: null;
    checkInLuggage: null;
  };

  type ReferenceFlightList$2 = {
    name: string;
    trafficList: Array<TrafficList$1>;
  };

  type TrafficVersionList = {
    versionIndex: number;
    versionName: string;
    trafficRemark: null;
    referenceFlightList: Array<ReferenceFlightList$2>;
    dateType: number;
    dateList: Array<unknow>;
  };

  type Data$10Type = {
    id: number;
    playDays: number;
    playNights: number;
    version: string;
    travelListsNew: TravelListsNew$2Type;
    shoppingInfoList: null;
    journeyList: Array<JourneyList$8Type>;
    shoppingStoreList: null;
    newVersions: Array<NewVersions$9Type>;
    saleDateList: null;
    tripList: null;
    shopping: ShoppingResult[];
    selfPaidItem: SelfPaidItem[];
    sceneryDesc: number;
    mealDesc: string;
    hotelDesc: string;
    activityDesc: string;
    trafficVersionList: TrafficVersionList[];
  };

  type Result$0Type = {
    code: number;
    message: string;
    success: boolean;
    data: Data$10Type;
  };

  type ShoppingList = {
    routeShow: boolean;
    list: ShoppingResult[];
  };

  type SelfPaidItemList = {
    routeShow: boolean;
    list: SelfPaidItem[];
  };
}
