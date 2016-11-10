import Vue from 'vue'
import * as types from '../store/mutation-types'


const createSingleFile = function (fileList, index, username, token, callback) {
  let file = fileList[index]
  console.log('creating %d file: %s', index, file.cid)
  var url = 'https://api.github.com/repos/' + username + '/test/contents/' + file.cid + '.md?access_token=' + token
  Vue.http.put(url, {
    content: new Buffer(file.content).toString('base64'),
    message: "auto save",
    path: file.cid + '.md',
    branch: 'master'
  }).then((response) => {
    index++
    if (fileList[index]) {
      createSingleFile(fileList, index, username, token, callback)
    } else {
      callback()
    }
  })
}

const deleteSingleFile = function (fileList, index, username, token, repo, callback) {
  let file = fileList[index]
  if (!file)return
  console.log('deleting %d file: %s', index, file.path)
  let url = 'https://api.github.com/repos/' + username + '/' + repo + '/contents/' + file.path + '?access_token=' + token + '&message=asdasd&sha=' + file.sha
  Vue.http.delete(url)
    .then((response)=> {
      index++
      if (fileList[index]) {
        deleteSingleFile(fileList, index, username, token, repo, callback)
      } else {
        callback()
      }
    })
}

const deleteFiles = function (state, fileList, callback) {
  let username = state.username
  let token = state.token
  let repo = state.file.repo
  fileList[0] ? deleteSingleFile(fileList, 0, username, token, repo, callback) : callback();
}

const createFiles = function (state, callback) {
  let fileList = state.file.fileList
  let username = state.username
  let token = state.token
  fileList[0] ? createSingleFile(fileList, 0, username, token, callback) : callback()
}

const getFiles = (state) => {
  return new Promise((resolve, reject)=> {
    let username = state.username
    let repo = state.file.repo
    let token = state.token
    let url = 'https://api.github.com/repos/' + username + '/' + repo + '/contents/?access_token=' + token
    Vue.http.get(url)
      .then((response) => {
          resolve(response.data)
        },
      )
      .catch((response) => {
          reject(response.status)
        }
      )
  })
}

const resolveRemoteFiles = function (state, remoteFiles) {
  let fileList = state.file.fileList
  let existFiles = []
  let notExistFiles = []
  remoteFiles.forEach((remoteFile)=> {
    if (!/\.md$/.test(remoteFile.name)) return;
    let exist = fileList.some((file)=> {
      return file.cid === remoteFile.name.slice(0, -3)
    });
    exist ? existFiles.push(remoteFile) : notExistFiles.push(remoteFile)
  })
  return {existFiles, notExistFiles}
}

const downloadFiles = (state, commit, notExistFiles)=> {
  let username = state.username
  let token = state.token
  let repo = state.file.repo
  notExistFiles.forEach((file)=> {
    let url = 'https://api.github.com/repos/' + username + '/' + repo + '/contents/' + file.path;
    Vue.http.get(url)
      .then(response=> {
        let newFile = {
          cid: response.data.name.slice(0, -3),
          content: new Buffer(response.data.content, 'base64').toString()
        };
        commit(types.FILE_CREATE, newFile)
      })
  })
}

export const sync = (state, commit) => {
  let username = state.username
  let repo = state.file.repo
  let token = state.token
  getFiles(state)
    .then(remoteFiles => {
      let res = resolveRemoteFiles(state, remoteFiles);//要删除的
      let existFiles = res.existFiles
      let notExistFiles = res.notExistFiles
      //删除
      deleteFiles(state, existFiles, ()=> {
        console.log('deleting complate')
        //创建
        createFiles(state, ()=> {
          console.log('creating complate')
          //同步到本地
          //把download放到第一层可能更合理
          downloadFiles(state, commit, notExistFiles)
        });
      })
    })
    .catch(status => {
      console.log(status)
    })
}

export const upload = (state, resolve, reject) => {
  let username = state.username
  let repo = state.file.repo
  let token = state.token
  getFiles(state)
    .then(remoteFiles => {
      let res = resolveRemoteFiles(state, remoteFiles);//要删除的
      //删除
      deleteFiles(state, remoteFiles, ()=> {
        console.log('deleting complate')
        //创建
        createFiles(state, ()=> {
          console.log('creating complate')
          resolve()
        });
      })
    })
    .catch(status => {
      console.log(status)
    })
}
