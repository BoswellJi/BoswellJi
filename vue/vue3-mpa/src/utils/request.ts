import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

import type { AxiosInstance } from 'axios';

const whiteList = [
  '/OrderPay/PayV2',
  '/Domestic/SaveTouristInfo',
  '/AroundGroup/SavePassengers',
  '/Abroad/EditPassenger',
  '/Abroad/GetPassport',
  '/Home/AddFeedBack',
  '/Product/DomesticIsStatic',
  '/Domestic/GetDomesticDetailByTripVersion',
  '/abroad/NewLineVersion',
  '/AroundGroup/GetLineDetailByTripVersion',
  '/cruise/LineTripInfo',
  '/cruise/LineBaseInfo',
  '/account/loginOut',
];

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: cang.root,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: any) => {
    if (whiteList.includes(response.config.url.split('?')[0])) {
      return Promise.resolve(response);
    }
    // 对响应数据做点什么
    const res = response?.data || { message: '接口请求异常' };

    // 权限禁用
    if (response.status === 403 || res.code === '403') {
      ElMessage.error(res.message);
      return Promise.reject(res);

      // 二进制数据
    } else if (res instanceof Blob) {
      return Promise.resolve(res);

      // 返回错误，统一拦截
    } else if (res.code !== '200' && res.code != 1000 && res.code != '0' && res.code !== '0000') {
      ElMessage.warning(res.message);
      return Promise.reject(res);
    }
    return Promise.resolve(res);
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') != -1) {
      ElMessage.error('网络超时');
    } else if (error.message == 'Network Error') {
      ElMessage.error('网络连接错误');
    } else {
      const res = error.response;
      if (!res) {
        ElMessage.error('接口路径找不到');

        // `token` 过期或者账号已在别处登录
      } else if (res.status === 401) {
        ElMessageBox.alert('登录信息已失效，请重新登录', '提示', {})
          .then(() => {
            location.href = '/account/login';
          })
          .catch(() => {});

        // 业务接口失败
      } else if (res.data) {
        ElMessage.error(res.data.message || res.statusText);
      } else {
        ElMessage.error(error.message);
      }
    }
    return Promise.reject(error);
  },
);

// 导出 axios 实例
export default service;
