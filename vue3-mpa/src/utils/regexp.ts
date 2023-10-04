// 邮箱
export const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
// 身份证
export const IdCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
// 手机
export const phoneReg = /^1(1|2|3|4|5|6|7|8|9|0)[0-9]{9}$/;
// 中国姓名
export const nameReg = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/;
