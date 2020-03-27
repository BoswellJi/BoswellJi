import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


@warp
class Test1 {

}

function warp() {
  console.log(arguments);
}

new Test1();