import type { App, DirectiveBinding } from 'vue';
import moment from 'moment';

export function dateFormatDirective(app: App) {
  app.directive('dateFormat', {
    mounted(el, binding) {
      dateFormat(el, binding);
    },
    updated(el, binding) {
      const { value, oldValue } = binding;
      if (value === oldValue) return;
      dateFormat(el, binding);
    },
  });
}

function dateFormat(el: HTMLElement, binding: DirectiveBinding<string>) {
  const { value } = binding;
  let dateStr = '--';
  if (typeof value === 'string' && value !== '' && !value.includes('1900-01-01')) {
    dateStr = moment(value).format('YYYY-MM-DD');
  }
  el.innerHTML = dateStr;
}
