import Vue from 'vue'


function createSingleFile(fileList, index, username, token, callback) {
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


function deleteSingleFile(fileList, index, username, token, callback) {
  let file = fileList[index]
  if (!file)return
  console.log('deleting %d file: %s', index, file.path)
  let del_url = 'https://api.github.com/repos/' + username + '/test/contents/' + file.path + '?access_token=' + token + '&message=asdasd&sha=' + file.sha
  Vue.http.delete(del_url)
    .then((response)=> {
      index++
      if (fileList[index]) {
        deleteSingleFile(fileList, index, username, token, callback)
      } else {
        callback()
      }
    })
}

export const deleteFiles = function (state, callback) {
  let username = state.username
  let token = state.token
  let get_url = 'https://api.github.com/repos/' + username + '/test/contents/?access_token=' + token;
  Vue.http.get(get_url)
    .then((response) => {
      let fileList = response.data;
      fileList[0] ? deleteSingleFile(fileList, 0, username, token, callback) : callback();
    })
}

export const createFiles = function (state, callback) {
  let fileList = state.file.fileList
  let username = state.username
  let token = state.token
  fileList[0] ? createSingleFile(fileList, 0, username, token, callback) : callback()
}
