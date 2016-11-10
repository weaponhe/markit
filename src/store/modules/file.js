import * as types from '../mutation-types'
let uuid = require('node-uuid');

const STORAGE_FILELIST_KEY = 'MARKIT_LOCAL_FILELIST';
const STORAGE_ACTIVE_FILE_KEY = 'STORAGE_ACTIVE_FILE_KEY';
const STORAGE_REPO_KEY = 'STORAGE_REPO_KEY';

function saveLocally() {
  localStorage.setItem(STORAGE_FILELIST_KEY, JSON.stringify(state.fileList));
  localStorage.setItem(STORAGE_ACTIVE_FILE_KEY, state.activeFileIndex);
  localStorage.setItem(STORAGE_REPO_KEY, state.repo);
}

function getLocally() {
  let activeFileIndex = JSON.parse(localStorage.getItem(STORAGE_ACTIVE_FILE_KEY)) || 0;
  let fileList = JSON.parse(localStorage.getItem(STORAGE_FILELIST_KEY));
  let repo = localStorage.getItem(STORAGE_REPO_KEY);
  if (!fileList || fileList.length === 0) {
    createFile();
  } else {
    state.fileList = fileList;
    state.activeFileIndex = activeFileIndex;
    state.repo = repo;
  }
}

function createFile(file = {}) {
  state.fileList.push(Object.assign({
    cid: uuid.v1(),
    content: 'New File\n\n-----------------------\nHello Markit!'
  }, file));
  state.activeFileIndex = state.fileList.length - 1
}

function deleteFile(index) {
  state.fileList.splice(index, 1);
  if (state.fileList.length === 0) {
    createFile();
  } else {
    if (index === state.activeFileIndex) {
      state.activeFileIndex = 0;
    } else if (index < state.activeFileIndex) {
      state.activeFileIndex--;
    }
  }
}

const state = {
  fileList: [],
  activeFileIndex: 0,
  repo: undefined
};
getLocally();

const mutations = {
  [types.FILE_CREATE] (state, file)
  {
    createFile(file);
    saveLocally();
  },
  [types.FILE_UPDATE] (state, {index, content})
  {
    state.fileList[index].content = content;
    saveLocally();
  },
  [types.FILE_DELETE] (state, index)
  {
    deleteFile(index);
    saveLocally();
  },
  [types.FILE_CHANGE_ACTIVE]  (state, index) {
    state.activeFileIndex = index;
    saveLocally();
  },
  [types.REPO_CHANGE](state, repo){
    state.repo = repo;
    saveLocally();
  }
}

export default {
  state,
  mutations
}

