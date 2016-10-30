import Vue from 'vue'
import  Vuex from 'vuex'
import * as types from './mutation-types'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'
import file from './modules/file'
import message from './modules/message'

Vue.use(Vuex);
const state = {
  spinning: false,
  sidebarOpened: false,
  menulistOpened: false,
  username: '',
  token: ''
}

const mutations = {
  toggleSpinning (state) {
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
  getters,
  mutations,
  actions,
  modules: {
    user,
    file,
    message
  }
});
