import * as types from '../mutation-types'
const state = {
  messageList: []
}

const mutations = {
  [types.MESSAGE_PUSH] (state, msg)
  {
    state.messageList.push(msg)
    console.log(state.messageList)
  },
  [types.MESSAGE_SHIFT] (state)
  {
    state.messageList.shift()
  }
}

export default {
  state,
  mutations
}
