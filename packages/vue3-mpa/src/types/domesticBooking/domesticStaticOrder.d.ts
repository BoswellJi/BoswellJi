declare namespace DomesticStaticOrder {
  export interface Req {
    AdultPrice: number; //
    ProductCode: number | undefined;
    LineId: number;
    ContactName: string;
    ContactMobile: string;
    TeamDate: string;
    PlayDays: number;
    ContactEmail: string;
    SupplierId: number;
    DepartureCityId: number;
    DepartureCityName: string;
    AdultNum: number;
    ChildNum: number;
    Version: string;
    SceneryJson: string;
    IsHaveInsurance: number;
    UpGrade: boolean;
    Prices: string;
    AllPersonCount: number;
    AllAmount: number;
    PassengerInfo: string;
    LJAcivityRuleId: number;
    LJAmount: number;
    InsuranceTypeId: number;
    Remark: string;
  }

  export interface Data {
    IsSuccess?: any;
    Message?: any;
    SerialId?: any;
    OrderStatus?: any;
    SupplierOrderId: string;
    IsCanPay: number;
  }

  export interface Res {
    code: number;
    message: string;
    success: boolean;
    data: Data;
  }
}
