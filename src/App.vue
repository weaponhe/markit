<template>
  <div class="container" :class="{'sidebar-opened':sidebarOpened,'menulist-opened':menulistOpened}">
    <div class="container-sidebar">
      <Sidebar></Sidebar>
    </div>
    <div class="container-editor">
      <Editor></Editor>
    </div>
    <div class="container-menulist" v-if="menulistOpened">
      <Menulist></Menulist>
    </div>
    <div class="container-spinner" v-if="spinning">
      <Spinner></Spinner>
    </div>
    <div class="container-modal">
      <Modal v-if="modalOpened">
        <h3 slot="header">确认</h3>
      </Modal>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import Sidebar from './components/Sidebar'
  import Editor from './components/Editor'
  import Menulist from './components/Menulist'
  import Spinner from './components/Spinner'
  import Modal from './components/Modal'

  export default {
    components: {
      Sidebar,
      Editor,
      Menulist,
      Spinner,
      Modal
    },
    computed: {
      ...mapState(['spinning', 'sidebarOpened', 'menulistOpened', 'modalOpened'])
    }
  }
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id："163229" */
    src: url('//at.alicdn.com/t/font_t7cdt3084zwa5rk9.eot');
    src: url('//at.alicdn.com/t/font_t7cdt3084zwa5rk9.eot') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_t7cdt3084zwa5rk9.woff') format('woff'),
    url('//at.alicdn.com/t/font_t7cdt3084zwa5rk9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_t7cdt3084zwa5rk9.svg#iconfont') format('svg');
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

  .container-spinner {
    position: absolute;
    z-index: 10000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .container-modal {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
