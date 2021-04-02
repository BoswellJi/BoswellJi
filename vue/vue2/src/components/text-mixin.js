import test1 from './test1';
import Vue from 'vue';

export default {
  components: {
    test1
  },
};

export const c1 = Vue.extend({
  data() {
    return {
      name: 'Boswell'
    };
  },
  template: `
    <div>{{name}}</div>
  `
});