import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories:[],
    reader: {}
  },
  mutations: {
    getCategories(state, cate) {
      state.categories = cate
    },
    saveReaderInfo(state, readerInfo) {
      state.reader = readerInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
