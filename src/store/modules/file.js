import * as types from '../mutation-types'
let uuid = require('node-uuid');

const STORAGE_FILELIST_KEY = 'MARKIT_LOCAL_FILELIST';
const STORAGE_ACTIVE_FILE_KEY = 'STORAGE_ACTIVE_FILE_KEY';

function saveFilelistLocally(fileList) {
  localStorage.setItem(STORAGE_FILELIST_KEY, JSON.stringify(fileList));
}
function saveActiveIndexLocally(index) {
  localStorage.setItem(STORAGE_ACTIVE_FILE_KEY, index);
}
function getLocally() {
  var fileList = localStorage.getItem(STORAGE_FILELIST_KEY);
  if (!fileList || fileList.length === 0) {
    fileList = [];
    fileList.push(generateFileContent());
    localStorage.setItem(STORAGE_FILELIST_KEY, JSON.stringify(fileList));
  }
  return JSON.parse(localStorage.getItem(STORAGE_FILELIST_KEY))
}
function generateFileContent() {
  let cid = uuid.v1()
  return {
    cid: cid,
    content: 'New File\n\n-----------------------\nHello Markit!'
  }
}
const state = {
  fileList: getLocally(),
  activeFileIndex: parseInt(localStorage.getItem(STORAGE_ACTIVE_FILE_KEY)) || 0
}
const mutations = {
  [types.FILE_CREATE] (state, msg)
  {
    state.fileList.push(generateFileContent());
    state.activeFileIndex = state.fileList.length - 1
    saveFilelistLocally(state.fileList);
  },
  [types.FILE_UPDATE] (state, {index, content})
  {
    state.fileList[index].content = content;
    saveFilelistLocally(state.fileList);
  },
  [types.FILE_DELETE] (state, index)
  {
    state.fileList.splice(index, 1);
    if (state.fileList.length === 0) {
      // this.createFile();//???
    } else {
      if (index === state.activeFileIndex) {
        state.activeFileIndex = 0;
      } else if (index < state.activeFileIndex) {
        state.activeFileIndex--;
      }
    }
    saveFilelistLocally(state.fileList);
  },
  [types.FILE_CHANGE_ACTIVE]  (state, index) {
    state.activeFileIndex = index
    saveActiveIndexLocally(index)
  }
}

export default {
  state,
  mutations
}

