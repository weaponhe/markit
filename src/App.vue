<template>
  <div class="container" :class="{'sidebar-opened':sidebarOpened,'menulist-opened':menulistOpened}">
    <div class="container-sidebar">
      <Sidebar
        :fileList="fileList"
        :activeFileIndex="activeFileIndex"
        @active="changeActive"
        @create="createFile"
        @delete="deleteFile">
      </Sidebar>
    </div>
    <div class="container-editor">
      <Editor
        :sidebarOpened="sidebarOpened"
        :menulistOpened="menulistOpened"
        :index="activeFileIndex"
        :file="fileList[activeFileIndex]"
        @updateFile="updateFile"
        @toggleSidebar="toggleSidebar"
        @toggleMenulist="toggleMenulist"
        @pushMessage="pushMessage">
      </Editor>
    </div>
    <div class="container-menulist" v-if="menulistOpened">
      <Menulist  @startSpinning="startSpinning">
      </Menulist>
    </div>
    <div class="container-toast">
      <Toast :messageList="messageList"
             @shiftMessage="shiftMessage">
      </Toast>
    </div>
    <div class="container-spinner" v-if="spinning">
      <Spinner :spinning="spinning">
      </Spinner>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  import Editor from './components/Editor'
  import Menulist from './components/Menulist'
  import Toast from './components/Toast'
  import Spinner from './components/Spinner'

  var uuid = require('node-uuid');
  const newContent = 'New File\n\n-----------------------\nHello Markit!'
  const STORAGE_KEY = 'MARKIT_LOCAL_STORAGE';
  var fileList = localStorage.getItem(STORAGE_KEY);
  if (!fileList || fileList.length === 0) {
    fileList = [];
    fileList.push({
      cid: uuid.v1(),
      content: newContent
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fileList));
  }
  export default {
    components: {
      Sidebar: Sidebar,
      Editor: Editor,
      Menulist: Menulist,
      Toast: Toast,
      Spinner: Spinner
    },
    data () {
      return {
        sidebarOpened: false,
        menulistOpened: false,
        activeFileIndex: 0,
        fileList: JSON.parse(localStorage.getItem(STORAGE_KEY)),
        messageList: [],
        spinning: false
      }
    },
    watch: {
      fileList: {
        handler: function (val) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.fileList));
        },
        deep: true
      },

    },
    methods: {
      startSpinning: function () {
        console.log("asdasd");
        this.spinning = true;
      },
      stopSpinning: function () {
        this.spinning = false;
      },
      pushMessage: function (message) {
        this.messageList.push(message);
      },
      shiftMessage: function (message) {
        this.messageList[0] && this.messageList.shift();
      },
      changeActive: function (index) {
        this.activeFileIndex = index
      },
      //OK
      createFile: function () {
        this.fileList.push(
          {
            cid: uuid.v1(),
            content: newContent
          });
        this.activeFileIndex = this.fileList.length - 1
      },
      //OK
      deleteFile: function (index) {
        this.fileList.splice(index, 1);
        if (this.fileList.length === 0) {
          this.createFile();
        } else {
          if (index === this.activeFileIndex) {
            this.activeFileIndex = 0;
          } else if (index < this.activeFileIndex) {
            this.activeFileIndex--;
          }
        }
      },
      //OK
      updateFile: function (index, content) {
        this.fileList[index].content = content;
      },
      //OK
      toggleSidebar: function () {
        this.sidebarOpened = !this.sidebarOpened;
      },
      //OK
      toggleMenulist: function () {
        this.menulistOpened = !this.menulistOpened;
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_1476881555_6268332.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/font_1476881555_6268332.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/font_1476881555_6268332.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/font_1476881555_6268332.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/font_1476881555_6268332.svg#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-fold:before {
    content: "\e675";
  }

  html {
    height: 100%;
    min-width: 600px;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: PingFang SC, Hiragino Sans GB, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif;
    overflow: hidden;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    line-height: 0;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  *::-webkit-scrollbar {
    display: block;
    width: 8px;
    background: #ebeeec;
  }

  *::-webkit-scrollbar-thumb {
    background: #dee4e4;
  }

  /*App style*/
  .container {
    height: 100%;
  }

  .container-sidebar {
    position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: -380px;
    box-sizing: border-box;
    width: 380px;
    height: 100%;
  }

  .sidebar-opened .container-sidebar {
    left: 0;
  }

  .container-menulist {
    position: absolute;
    z-index: 100;
    top: 60px;
    right: 10px;
    box-sizing: border-box;
    width: 200px;
    max-height: 500px;
  }

  .sidebar-opened .container-menulist {
    right: -370px;
  }

  /*.menulist-opened .container-menulist {*/
  /*right: 0;*/
  /*}*/

  .container-editor {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    width: 100%;
  }

  .sidebar-opened .container-editor {
    left: 380px;
  }

  .container-sidebar,
  .container-editor,
  .container-menulist {
    transition: all 0.3s ease-out;
  }

  .container-toast {
    position: absolute;
    z-index: 1000;
    right: 100px;
    top: 0;
    width: 500px;
    height: 50px;
    /*background-color: red;*/
    text-align: right;
  }

  .container-spinner {
    position: absolute;
    z-index: 10000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
