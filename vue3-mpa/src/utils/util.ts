import { upperFirst, lowerFirst } from 'lodash';
import request from './request';
import { Local } from './storage';

export const safeWindowOpen = (url: string) => {
  const newWindow = window.open(url);
  newWindow && (newWindow.opener = null);
};

type TObj = { [key: string]: any };

export const convertKeyUpperFirst: (obj: TObj) => TObj = (obj) => {
  if (typeof obj !== 'object' || !obj) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeyUpperFirst(item));
  }
  const newObj: TObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let newKey = upperFirst(key);
      newObj[newKey] = convertKeyUpperFirst(obj[key]);
    }
  }
  return newObj;
};

export const convertKeyLowerFirst: (obj: TObj) => TObj = (obj) => {
  if (typeof obj !== 'object' || !obj) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeyLowerFirst(item));
  }
  const newObj: TObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let newKey = lowerFirst(key);
      newObj[newKey] = convertKeyLowerFirst(obj[key]);
    }
  }
  return newObj;
};

export const quit = async () => {
  await request({
    method: 'post',
    url: '/account/loginOut',
  });
  location.href = '/account/login';
  Local.clear();
};
