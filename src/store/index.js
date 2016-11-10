import Vue from 'vue'
import  Vuex from 'vuex'
import * as types from './mutation-types'
import * as actions from './actions'
import user from './modules/user'
import file from './modules/file'

Vue.use(Vuex);
const state = {
  spinning: false,
  sidebarOpened: false,
  menulistOpened: false,
  username: '',
  token: ''
}

const mutations = {
  [types.TOGGLE_SPINNING] (state) {
    state.spinning = !state.spinning
  },
  [types.TOGGLE_SIDEBAR](state){
    state.sidebarOpened = !state.sidebarOpened
  },
  [types.TOGGLE_MENULIST](state){
    state.menulistOpened = !state.menulistOpened
  },
  [types.USERNAME](state, username){
    state.username = username
  },
  [types.TOKEN](state, token){
    state.token = token
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    user,
    file
  }
});
