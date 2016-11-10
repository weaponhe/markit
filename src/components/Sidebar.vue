<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img v-if="user" :src="user.avatar_url">
    </div>
    <ul>
      <li v-for="(file,index) in fileObjList"
          :class="{active:activeFileIndex===index}"
          @click="selectActive(index)">
        <div class="sidebar-item-title">{{file.title}}</div>
        <div class="sidebar-item-option"
             @click.stop="deleteFile(index)">
          <i class="iconfont">&#xe60b;</i>
        </div>
      </li>
    </ul>
    <div class="sidebar-footer" @click="createFile">
      New
    </div>
  </div>
</template>

<script>
  import * as types from '../store/mutation-types'
  import {mapState} from 'vuex'
  export default{
    methods: {
      selectActive: function (index) {
        this.$store.commit(types.FILE_CHANGE_ACTIVE, index)
      },
      createFile: function () {
        this.$store.commit(types.FILE_CREATE)
        this.$success("创建成功");
      },
      deleteFile: function (index) {
        this.$confirm('提示', '删除文件，是否继续？').then(response=> {
          this.$store.commit(types.FILE_DELETE, index);
          this.$success("删除成功");
        }).catch(response=> {
        })
      }
    },
    computed: {
      fileObjList() {
        return this.fileList.map((file)=> {
          var title = file.content.split(/-{3,}/)[0].trim();
          return {
            title: title || 'New File'
          }
        })
      },
      ...mapState({
        activeFileIndex: state=> state.file.activeFileIndex,
        fileList: state=>state.file.fileList,
        user: state=>state.user.user
      })
    }
  }
</script>
<style scoped>
  .sidebar {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    background-color: #546072;
    color: #CCC;
  }

  .sidebar-header {
    position: relative;
    z-index: 1;
    height: 50px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    background-color: #475160;
    text-align: center;
    line-height: 50px;
    font-size: 0;
  }

  .sidebar-header img {
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .sidebar-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    border-top: 1px solid #444;
  }

  .sidebar-footer:hover {
    cursor: pointer;
    background-color: #475160;
  }

  .sidebar ul {
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    overflow-y: auto;
  }

  .sidebar ul::-webkit-scrollbar {
    display: block;
    width: 8px;
    background: #546072;
  }

  .sidebar ul::-webkit-scrollbar-thumb {
    background: #3b434e;
  }

  .sidebar ul li {
    height: 50px;
    line-height: 50px;
    list-style: none;
  }

  .sidebar ul li.active {
    background-color: #74b936 !important;
  }

  .sidebar ul li:hover {
    cursor: pointer;
    background-color: #475160;
    box-shadow: inset 0 0px 1px rgba(0, 0, 0, 0.5);
  }

  .sidebar-item-title {
    float: left;
    box-sizing: border-box;
    width: 80%;
    padding-left: 20px;

    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li.active .sidebar-item-title {
    color: #ffffff;
  }

  .sidebar-item-option {
    float: right;
    box-sizing: border-box;
    width: 20%;
    padding-right: 20px;
    text-align: right;
    visibility: hidden;
  }

  .sidebar ul li:hover .sidebar-item-option,
  li.active .sidebar-item-option {
    visibility: visible;
  }

  .sidebar-item-option:hover {
    color: #FFF;
  }


</style>
