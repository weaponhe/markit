import Vue from 'vue'
import * as types from './mutation-types'

export const login = (context) => {
  Vue.http.get('/user')
    .then((response) => {
      let user = response.data._json
      user && context.commit(types.USER_LOGIN, user);
    })
}

export const logout = (context) => {
  Vue.http.get('/logout')
    .then((response) => {
      context.commit(types.USER_LOGOUT);
    })
}

export const sync = (context) => {
  Vue.http.post('/sync', context.state.file.fileList)
    .then((response) => {
      console.log(response.data)
    })
}
