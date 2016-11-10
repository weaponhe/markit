import Vue from 'vue'
import * as types from './mutation-types'
import * as githubAPI from '../github'


export const getUser = ({state, commit}) => {
  Vue.http.get('https://api.github.com/users/' + state.username)
    .then((response) => {
      let user = response.data
      user && commit(types.USER_LOGIN, user);
    })
}

export const sync = ({state, commit}) => {
  githubAPI.deleteFiles(state, ()=> {
    githubAPI.createFiles(state, ()=> {
      commit(types.MESSAGE_PUSH, '同步完成')
    })
  })
}
