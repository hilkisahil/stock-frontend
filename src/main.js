import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.filter('currencyFilter', function (val) {
  return  ![null, undefined].includes(val)?val.toLocaleString('en-IN', { minimumFractionDigits:0, style: 'currency', currency: 'INR' }).replace(/₹/g, '₹ '):'₹ 0'
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
