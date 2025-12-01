import type { App } from 'vue';

import shareHeader from '@/components/shareHeader/index.vue';
import shareFooter from '@/components/shareFooter/index.vue';
import navParent from '@/components/navParent/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import lcPrice from '@/components/lcPrice/index.vue';
import lcSkeleton from '@/components/lcSkeleton/index.vue';
import lcEmpty from '@/components/lcEmpty/index.vue';
import lcPosition from '@/components/lcPosition/index.vue';
import lcCalendar from '@/components/lcCalendar/index.vue';
import lcSingleProductBooking from '@/components/lcSingleProduct/lcSingleProductBooking/index.vue';
import lcSingleProduct from '@/components/lcSingleProduct/index.vue';

import optionPop from '@/components/optionPop/index.vue';
import pageListFilter from '@/components/pageListFilter/index.vue';
import pageListItem from '@/components/pageListItem/index.vue';
import pageListProductHandler from '@/components/pageListProductHandler/index.vue';
import pageListProductList from '@/components/pageListProductList/index.vue';
import pagination from '@/components/pagination/index.vue';

export default (app: App) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  app.component('shareHeader', shareHeader);
  app.component('shareFooter', shareFooter);
  app.component('navParent', navParent);
  app.component('lcPrice', lcPrice);
  app.component('lcSkeleton', lcSkeleton);
  app.component('lcEmpty', lcEmpty);
  app.component('lcPosition', lcPosition);
  app.component('lcCalendar', lcCalendar);
  app.component('lcSingleProductBooking', lcSingleProductBooking);
  app.component('lcSingleProduct', lcSingleProduct);

  app.component('OptionPop', optionPop);
  app.component('PageListFilter', pageListFilter);
  app.component('PageListItem', pageListItem);
  app.component('PageListProductHandler', pageListProductHandler);
  app.component('PageListProductList', pageListProductList);
  app.component('Pagination', pagination);
};
