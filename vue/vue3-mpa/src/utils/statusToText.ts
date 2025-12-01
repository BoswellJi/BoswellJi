//@ts-nocheck

export function orderStatusText(type) {
  return type == 0
    ? '待确认'
    : type == 10
    ? '待支付'
    : type == 15
    ? '支付中'
    : type == 20
    ? '已支付'
    : type == 25
    ? '已确认'
    : type == 30
    ? '已完成'
    : type == 35
    ? '取消中'
    : type == 40
    ? '已取消'
    :'';
}

export function breakfastCountText(type) {
  if (type === 0) {
    return "无早";
  } else if (type === 1) {
    return "单早";
  } else if (type === 2) {
    return "双早";
  }
}

export function invoiceModeText(type){
  if (type === 'Elong') {
    return "平台代开票";
  } else if (type === 'Hotel') {
    return "酒店开发票";
  }
}