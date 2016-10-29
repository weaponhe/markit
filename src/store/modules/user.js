import * as types from '../mutation-types'
const state = {
  user: null
}

const mutations = {
  [types.USER_LOGIN] (state, user)
  {
    state.user = user;
  },
  [types.USER_LOGOUT] (state)
  {
    state.user = null;
  }
}

export default {
  state,
  mutations
}
