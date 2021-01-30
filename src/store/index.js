import Vue from 'vue'
import Vuex from 'vuex'
import lease from './modules/lease'
import outlets from './modules/outlets'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    lease,
    outlets
  }
})

export default store
