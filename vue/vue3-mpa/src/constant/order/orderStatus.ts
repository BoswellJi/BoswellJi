export enum orderStatus {
  UnConfirmed = 0, //待确认
  UnPay = 10, //待支付
  Paying = 15, //支付中
  Paid = 20, //已支付
  Confirmed = 25, //已确认
  Completed = 30, //已完成
  Cancelling = 35, //取消中
  Canceled = 40, //已取消
}
