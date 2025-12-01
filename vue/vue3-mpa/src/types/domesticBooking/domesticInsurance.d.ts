declare namespace DomesticInsurance {
  export interface Req {
    lineId: string;
    playDays: number;
    price: number;
    allPrice: number;
    deaprtCityId: string;
    arriveCityId: string;
  }

  export interface Data {
    description: string;
    detail: string;
    id: number;
    name: string;
    price: number;
    allPrice: number;
    insuranceType: number;
    checked: boolean;
  }

  export interface Res {
    code: number;
    message: string;
    success: boolean;
    data: Data[];
  }
}
