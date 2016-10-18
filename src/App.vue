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
    <div class="container-optbar">
      <Optbar :menuOpened="menuOpened"
              @toggleMenu="toggleMenu">
      </Optbar>
    </div>
    <div class="container-editor">
      <Editor :fileList="fileList"
              :index="activeFileIndex"
              @updateFile="updateFile">
      </Editor>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  import Editor from './components/Editor'
  import Optbar from './components/Optbar'

  export default {
    components: {
      Sidebar: Sidebar,
      Editor: Editor,
      Optbar: Optbar
    },
    data () {
      return {
        menuOpened: true,
        activeFileIndex: 0,
        fileList: ['asd0\n---\nHello', 'asd1\n---\nHello', 'asd2\n---\nHello']
      }
    },
    methods: {
      changeActive: function (index) {
        this.activeFileIndex = index
      },
      createFile: function () {
        this.fileList.push('asd' + this.fileList.length + '\n')
        this.activeFileIndex = this.fileList.length - 1
      },
      deleteFile: function (index) {
        this.fileList.splice(index, 1);
      },
      updateFile: function (index, content) {
        this.fileList.splice(index, 1, content)
      },
      toggleMenu: function () {
        this.menuOpened = !this.menuOpened;
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_1476776371_4195113.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/font_1476776371_4195113.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/font_1476776371_4195113.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/font_1476776371_4195113.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/font_1476776371_4195113.svg#iconfont') format('svg'); /* iOS 4.1- */
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

  .container-optbar {
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    height: 50px;
    width: 100%;
  }

  .opened .container-optbar {
    left: 380px;
  }

  .container-editor {
    position: absolute;
    top: 50px;
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
  .container-optbar,
  .container-editor {
    transition: left 0.3s ease-out;
  }
</style>
