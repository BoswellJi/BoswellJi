interface resType {
  code: string | number;
  message: string;
  success: boolean;
}

export type versionType = {
  title?: string;
  describle: string;
  [key: string]: any;
};

export type detailType = {
  productTitle?: string;
  subTitle?: string;
  feature?: string; // 特色
  notice?: string; // 注意事项
  versions?: versionType[];
  securityNoticy?: string; // 安全提示
  warmTip?: string; // 温馨提示
  picModelList?: string[]; // 图片列表
  departureCityId?: string | number; // 出发地id
  departureCityName?: string; // 出发地名称
  playDays?: number;
  lineId?: number;
  limitMaxValue?: number;
  limitMinValue?: number;
  supplierId?: number;
  images?: string[];
  arrivalCityName?: string;
  [key: string]: any;
};

type journeyTitleType = {
  title: string;
  type: number;
  index: number;
};

export type journeyType = {
  title: journeyTitleType[];
  type: number;
  [key: string]: any;
};

export type otherShoppingNewType = {
  [key: string]: any;
} | null;

type travelRouteListType = {
  otherTimeConsum: number;
  playTimeConsum: string;
  routeDescription: string;
  routeImage: string;
  routeRemark: string;
  routeTime: string;
  routeTitle: string;
  transTimeConsum: number;
  travelType: number;
};

export type travelDetailsNewType = {
  theDay: number;
  general: any;
  supplierSelfPayList: any;
  supplierShoppingInfoList: any;
  theDayTheme: any;
  routeShow: boolean;
  travelRouteList: travelRouteListType[];
};

export interface detailByVersionRes extends resType {
  data: {
    journeyList?: journeyType[];
    travelListsNew: {
      otherShoppingNew: otherShoppingNewType;
      travelDetailsNew: travelDetailsNewType[];
    };
    [key: string]: any;
  };
}
