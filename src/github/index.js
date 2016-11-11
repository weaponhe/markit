import Vue from 'vue'
const URL_REPO_PREFIX = 'https://api.github.com/repos/'


export const resolveRemoteFiles = function (localFiles, remoteFiles) {
  let trackedFiles = []
  let untrackedFiles = []
  let remoteNewFiles = []
  remoteFiles.forEach((remoteFile)=> {
    if (!/\.md$/.test(remoteFile.name)) return;
    let exist = localFiles.some((file)=> {
      if (file.cid === remoteFile.name.slice(0, -3)) {
        remoteFile.content = file.content
        return true
      }
      return false
    });
    exist ? trackedFiles.push(remoteFile) : remoteNewFiles.push(remoteFile)
  })
  untrackedFiles = localFiles.filter((file)=> {
    return !trackedFiles.some((untrackedFile)=> {
      return file.cid === untrackedFile.name.slice(0, -3)
    })
  })
  return {trackedFiles, untrackedFiles, remoteNewFiles}
}


export const getRemoteFiles = ({username, token, file:{repo}}) => {
  let url = URL_REPO_PREFIX + username + '/' + repo + '/contents/?access_token=' + token
  return Vue.http.get(url)
}

export const downloadRemoteFiles = ({username, token, file:{repo}}, notExistFiles)=> {
  let promises = notExistFiles.map((file)=> {
    console.log('downloading file ' + file.path)
    let url = URL_REPO_PREFIX + username + '/' + repo + '/contents/' + file.path;
    return Vue.http.get(url)
  })
  return Promise.all(promises)
}

export const updateOrCreateRemoteFiles = ({username, token, file:{repo}}, fileList)=> {
  return fileList.reduce((cur, next)=> {
    return cur.then(()=> {
      let path = next.path || next.cid + '.md'
      console.log((next.path ? 'updating' : 'creating') + ' file' + path)
      var url = URL_REPO_PREFIX + username + '/' + repo + '/contents/' + path + '?access_token=' + token
      return Vue.http.put(url, {
        path: path,
        message: "auto save",
        content: new Buffer(next.content).toString('base64'),
        sha: next.sha
      })
    })
  }, Promise.resolve())
}

export const deleteRemoteFiles = function ({username, token, file:{repo}}, existFiles) {
  return existFiles.reduce((cur, next)=> {
    return cur.then(()=> {
      console.log('deleting file ' + next.path)
      let url = URL_REPO_PREFIX + username + '/' + repo + '/contents/' + next.path + '?access_token=' + token + '&message=asdasd&sha=' + next.sha
      return Vue.http.delete(url)
    })
  }, Promise.resolve())
}
