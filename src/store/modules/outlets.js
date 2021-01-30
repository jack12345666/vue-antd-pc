const state = {
   outletsData: {
       id: null,
       name: '',
       address: '',
       tel: '',
       lng: null,
       lat: null,
       runStatus: null,
       category: null,
   }
  }
  
  const mutations = {
     changeOutletsData(state, payload) {
         state.outletsData = payload
     }
  }
  
  export default {
      namespaced: true,
      state,
      mutations
  }
  