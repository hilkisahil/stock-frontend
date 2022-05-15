import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({key: 'stock-market'})],
  state: {
    balance: 0
  },
  mutations: {
    setBalance(state, payload) {
      state.balance = payload;
    },
    resetStore(state) {
      state.balance = 0;
    }
  },
  actions: {},
  modules: {}
})
