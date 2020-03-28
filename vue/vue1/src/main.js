import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  created() {
    console.log('Vue', this);
  },
  render: h => h(App),
}).$mount('#app')

