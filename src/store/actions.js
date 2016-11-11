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

export const upload = ({state, commit}) => {
  return githubAPI.getRemoteFiles(state)
    .then((response) => {
      //delete remote
      return githubAPI.deleteRemoteFiles(state, response.data)
    })
    .then(()=> {
      //create local
      return githubAPI.updateOrCreateRemoteFiles(state, state.file.fileList)
    })
}

export const sync = ({state, commit}) => {
  let trackedFiles, untrackedFiles, remoteNewFiles
  return githubAPI.getRemoteFiles(state)
    .then((response) => {
      let result = githubAPI.resolveRemoteFiles(state.file.fileList, response.data)
      trackedFiles = result.trackedFiles
      untrackedFiles = result.untrackedFiles
      remoteNewFiles = result.remoteNewFiles
      //update local & remote
      return githubAPI.updateOrCreateRemoteFiles(state, trackedFiles)
    })
    .then(()=> {
      //create local - remote
      return githubAPI.updateOrCreateRemoteFiles(state, untrackedFiles)
    })
    .then(()=> {
      //download remote - local
      return githubAPI.downloadRemoteFiles(state, remoteNewFiles)
    })
    .then(responses=> {
      responses.forEach((res)=> {
        let newFile = {
          cid: res.data.name.slice(0, -3),
          content: new Buffer(res.data.content, 'base64').toString()
        };
        commit(types.FILE_CREATE, newFile)
      })
    })
}
