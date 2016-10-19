<template>
  <div class="container" :class="{opened:menuOpened}">
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
        :menuOpened="menuOpened"
        :index="activeFileIndex"
        :file="fileList[activeFileIndex]"
        @updateFile="updateFile"
        @toggleMenu="toggleMenu">
      </Editor>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  import Editor from './components/Editor_temp'
  var uuid = require('node-uuid');

  export default {
    components: {
      Sidebar: Sidebar,
      Editor: Editor
    },
    data () {
      return {
        menuOpened: false,
        activeFileIndex: 0,
        fileList: [
          {
            cid: uuid.v1(),
            content: 'asd0\n---\nHello sadasdasd asdasdas'
          },
          {
            cid: uuid.v1(),
            content: 'asd1\n---\nHello'
          }
        ]
      }
    },
    methods: {
      changeActive: function (index) {
        this.activeFileIndex = index
      },
      //OK
      createFile: function () {
        this.fileList.push(
          {
            cid: uuid.v1(),
            content: 'New File' + this.fileList.length + '\n---\nHello Markit!'
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
      toggleMenu: function () {
        this.menuOpened = !this.menuOpened;
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_1476841100_5491998.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/font_1476841100_5491998.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/font_1476841100_5491998.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/font_1476841100_5491998.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/font_1476841100_5491998.svg#iconfont') format('svg'); /* iOS 4.1- */
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
    /*overflow: hidden;*/
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

  .opened .container-sidebar {
    left: 0;
  }

  .container-editor {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    width: 100%;
  }

  .opened .container-editor {
    left: 380px;
  }

  .container-sidebar,
  .container-editor {
    transition: left 0.3s ease-out;
  }
</style>
