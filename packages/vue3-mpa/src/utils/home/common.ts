import { productCategory } from '@/enum/common';
import { safeWindowOpen } from '@/utils/util';
import request from '@/utils/request';

interface product {
  pid: number;
  pProductCategory: number;
}

export function addressSkip(item: product) {
  const { pProductCategory, pid: lineId } = item;
  if (productCategory.around === pProductCategory) {
    safeWindowOpen(`/AroundGroup/Detail?LineId=${lineId}`);
  } else if (productCategory.domestic === pProductCategory) {
    domestic(lineId);
  } else if (productCategory.abroad === pProductCategory) {
    safeWindowOpen(`/abroad/NewDetail?lineId=${lineId}`);
  } else if (productCategory.cruise === pProductCategory) {
    safeWindowOpen(`/Cruise/Detail?LineId=${lineId}`);
  }
}

async function domestic(i: number) {
  try {
    const { data: n } = await request({
      url: '/Product/DomesticIsStatic?lineid=' + i,
      method: 'post',
    });
    if (n && n !== 'false') {
      safeWindowOpen('/Domestic/Detail?LineId=' + i);
    } else {
      safeWindowOpen('/DomesticSelf/Detail?LineId=' + i);
    }
  } catch (err) {
    safeWindowOpen('/Domestic/Detail?LineId=' + i);
  }
}
