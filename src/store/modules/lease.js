const state = {
  searchConf: {
    currentPage: 1,
    pageSize: 10,
    buildingAreaBetween: null,
    priceBetween: null,
    areaId: null,
    price: '',
    createTime: ''
  }
}

const mutations = {
   changeSearchConf(state, payload) {
       state.searchConf = payload
   }
}

export default {
    namespaced: true,
    state,
    mutations
}
