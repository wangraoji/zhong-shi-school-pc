import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
import user from './modules/user'
import { getToken, setToken, removeToken } from '@/util/auth';
Vue.use(Vuex)

// export default new Vuex.Store({
//   // state: {

//   // },
//   // mutations: {

//   // },
//   // actions: {

//   // }
//   modules: {
//     user
//   },
//   getters,
// })


const store = new Vuex.Store({
  state: {
    token: getToken(),
  },
  mutations: {
    SET_TOKEN: (state: any, token: any) => {
      state.token = token
    },
  },
  getters
})

export default store
