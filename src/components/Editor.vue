<template>
  <div class="editor clearfix">
    <div class="editor-option">
      <div class="app-opt opt-item opt-item-sidebar" @click="toggleSidebar">
        <div>
          <i class="iconfont">&#xe607;</i>
        </div>
      </div>
      <div class="app-opt opt-item opt-item-menulist" @click="toggleMenulist">
        <div>
          <i class="iconfont">&#xe609;</i>
        </div>
      </div>
      <span class="opt-item-username" v-if="user">Hi, {{user.login}}!</span>
      <div class="opt-group">
        <span class="editor-opt opt-item iconfont" @click="insertBold">&#xe614;</span>
        <span class="editor-opt opt-item iconfont" @click="insertItalic">&#xe615;</span>
      </div>
      <div class="opt-group">
        <span class="editor-opt opt-item iconfont" @click="insertLink">&#xe630;</span>
        <span class="editor-opt opt-item iconfont" @click="insertQuote">&#xe622;</span>
        <span class="editor-opt opt-item iconfont" @click="insertCode">&#xe62b;</span>
        <span class="editor-opt opt-item iconfont" @click="insertImage">&#xe61c;</span>
      </div>

      <div class="opt-group">
        <span class="editor-opt opt-item iconfont" @click="insertOL">&#xe64f;</span>
        <span class="editor-opt opt-item iconfont" @click="insertUL">&#xe650;</span>
        <span class="editor-opt opt-item iconfont" @click="insertTable">&#xe659;</span>
        <span class="editor-opt opt-item iconfont" @click="insertHR">&#xe632;</span>
        <span class="editor-opt opt-item iconfont" @click="test1">alert</span>
        <span class="editor-opt opt-item iconfont" @click="test2">prompt</span>
        <span class="editor-opt opt-item iconfont" @click="test3">confirm</span>
      </div>
    </div>
    <textarea id="editor-textarea"></textarea>
    <div class="editor-preview markdown-body" v-html="html" ref="preview"></div>
    <div class="mask-black" v-if="sidebarOpened" @click="toggleSidebar"></div>
    <div class="mask-transparent" v-if="!sidebarOpened&&menulistOpened" @click="toggleMenulist"></div>
  </div>
</template>
<script>
  import CodeMirror from 'codemirror'
  import {mapState} from 'Vuex'
  import * as types from '../store/mutation-types'
  var marked = require('marked')
  require('codemirror/lib/codemirror.css');
  require('codemirror/theme/material.css');
  require('github-markdown-css/github-markdown.css');
  export default{
    name: 'editor',
    props: {
      options: {
        type: Object,
        default: function () {
          return {
            line: true,
            lineNumbers: true,
            mode: 'text/x-markdown',
            lineWrapping: true,
            theme: 'material',
            showCursorWhenSelecting: true
          }
        }
      }
    },
    data: function () {
      return {
        cm: null
      }
    },
    computed: {
      html(){
        var content = this.file.content.replace(/.*\n+-{3,}\s*\n/, '');
        return marked(content);
      },
      ...mapState({
        spinning: 'spinning',
        sidebarOpened: 'sidebarOpened',
        menulistOpened: 'menulistOpened',
        file: state=>state.file.fileList[state.file.activeFileIndex],
        activeFileIndex: state=> state.file.activeFileIndex,
        user: state=>state.user.user
      })
    },
    watch: {
      'file.cid': function (val) {
        this.cm.setValue(this.file.content);
        this.cm.setCursor({line: 0, ch: 1000});
        this.cm.focus();
      }
    },
    mounted: function () {
      var that = this;
      this.cm = CodeMirror.fromTextArea(document.getElementById('editor-textarea'), this.options);
      this.cm.setValue(this.file.content);
      this.cm.setCursor({line: 0, ch: 1000});
      this.cm.focus();
      this.cm.on('change', function (cm) {
        that.contentChange(cm.getValue());
      });
      this.cm.on('scroll', function (cm) {
        that.editorScoll();
      });
    },
    methods: {
      test1: function () {
        this.$alert('Alert', 'content', {})
          .then(res=> {
            console.log(res)
          })
          .catch(res=> {
            console.log(res)
          });
      },
      test2: function () {
        this.$prompt('Prompt', 'content', {})
          .then(res=> {
            console.log(res)
          })
          .catch(res=> {
            console.log(res)
          });
      },
      test3: function () {
        this.$confirm('confirm', 'content', {})
          .then(res=> {
            console.log(res)
          })
          .catch(res=> {
            console.log(res)
          });
      },
      contentChange: function (newContent) {
        this.$store.commit(types.FILE_UPDATE, {index: this.activeFileIndex, content: newContent});
      },
      editorScoll: function () {
        var top = this.cm.getScrollInfo().top;
        this.$refs.preview.scrollTop = top;
      },
      toggleSidebar: function () {
        this.$store.commit(types.TOGGLE_SIDEBAR);
      },
      toggleMenulist: function () {
        this.$store.commit(types.TOGGLE_MENULIST);
      },
      insertBold: function () {
        this.cm.execCommand('singleSelection');
        var selection = this.cm.doc.getSelection();
        if (!selection) {
          selection = '粗体文本';
        }
        this.cm.doc.replaceSelection('**' + selection + '**', 'start');
        var cursor = this.cm.doc.getCursor()
        var begin = cursor.ch + 2
        var end = begin + selection.length;
        this.cm.setSelection(
          {line: cursor.line, ch: begin},
          {line: cursor.line, ch: end});
        this.cm.focus();
      },
      insertItalic: function () {
        this.cm.execCommand('singleSelection');
        var selection = this.cm.doc.getSelection();
        if (!selection) {
          selection = '斜体文本';
        }
        this.cm.doc.replaceSelection('*' + selection + '*', 'start');
        var cursor = this.cm.doc.getCursor()
        var begin = cursor.ch + 1
        var end = begin + selection.length;
        this.cm.setSelection(
          {line: cursor.line, ch: begin},
          {line: cursor.line, ch: end});
        this.cm.focus();
      },
      insertLink: function () {
        //modal
      },
      insertQuote: function () {
        this.cm.execCommand('singleSelection');
        var selection = this.cm.doc.getSelection();
        if (!selection) {
          selection = '段落引用';
        }
        this.cm.doc.replaceSelection('\n> ' + selection + '\n', 'start');
        var cursor = this.cm.doc.getCursor()
        var begin = 2;
        var end = begin + selection.length;
        this.cm.setSelection(
          {line: cursor.line + 1, ch: begin},
          {line: cursor.line + 1, ch: end});
        this.cm.focus();
      },
      insertCode: function () {
        this.cm.execCommand('singleSelection');
        var selection = this.cm.doc.getSelection();
        if (selection.indexOf('\n') === -1) {
          if (!selection) {
            selection = '此处插入代码';
          }
          this.cm.doc.replaceSelection('`' + selection + '`', 'start');
          var cursor = this.cm.doc.getCursor()
          var begin = cursor.ch + 1;
          var end = begin + selection.length;
          this.cm.setSelection(
            {line: cursor.line, ch: begin},
            {line: cursor.line, ch: end});
          this.cm.focus();
        } else {
          this.cm.doc.replaceSelection('\n```\n' + selection + '\n```\n', 'start');
          var cursor = this.cm.doc.getCursor()
          this.cm.setSelection(
            {line: cursor.line + 2, ch: 0},
            {line: cursor.line + 2 + selection.split('\n').length - 1, ch: 1000});
          this.cm.focus();
        }
      },
      insertImage: function () {
        //modal
      },
      insertOL: function () {
        this.cm.execCommand('singleSelection');
        var selection = this.cm.doc.getSelection();
        if (!selection) {
          selection = '列表项';
        }
        this.cm.doc.replaceSelection('\n1. ' + selection + '\n', 'start');
        var cursor = this.cm.doc.getCursor()
        var begin = 3;
        var end = begin + selection.length;
        this.cm.setSelection(
          {line: cursor.line + 1, ch: begin},
          {line: cursor.line + 1, ch: end});
        this.cm.focus();
      },
      insertUL: function () {
        this.cm.execCommand('singleSelection');
        var selection = this.cm.doc.getSelection();
        if (!selection) {
          selection = '列表项';
        }
        this.cm.doc.replaceSelection('\n- ' + selection + '\n', 'start');
        var cursor = this.cm.doc.getCursor()
        var begin = 2;
        var end = begin + selection.length;
        this.cm.setSelection(
          {line: cursor.line + 1, ch: begin},
          {line: cursor.line + 1, ch: end});
        this.cm.focus();
      },
      insertTable: function () {
        this.cm.execCommand('singleSelection');
        this.cm.doc.replaceSelection(
          '\n\n| | |' + '\n| ------------ | ------------ |' + '\n| | |' + '\n', 'start');
//        this.cm.setSelection(
//          {line: cursor.line + 3, ch: 0});
        this.cm.focus();
      },
      insertHR: function () {
        this.cm.execCommand('singleSelection');
        this.cm.doc.replaceSelection('\n\n--------------\n\n', 'start');
        var cursor = this.cm.doc.getCursor()
        this.cm.setSelection(
          {line: cursor.line + 3, ch: 0});
        this.cm.focus();
      }
    }
  }
</script>
<style>
  .editor {
    height: 100%;
    position: relative;
  }

  .mask-black {
    position: absolute;
    z-index: 50;
    top: 50px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .mask-transparent {
    position: absolute;
    z-index: 50;
    top: 50px;
    left: 0;
    width: 100%;
    height: 100%;
    /*background-color: rgba(0, 0, 0, 0.5);*/
  }

  .editor .CodeMirror {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    height: auto;
    box-sizing: border-box;
    width: 50%;
    font-size: 18px;
    line-height: 22px;
  }

  .editor-preview {
    position: absolute;
    top: 50px;
    bottom: 0;
    right: 0;
    height: auto;
    box-sizing: border-box;
    width: 50%;
    padding: 20px;
    margin: 0;
    overflow-y: scroll;
  }

  .editor-option {
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    background-color: #444;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    color: #ccc;
  }

  .opt-item {
    height: 100%;
    line-height: 50px;
  }

  .opt-item:hover {
    color: #FFF;
    cursor: pointer;
  }

  .app-opt {
    width: 50px;
    text-align: center;
  }

  .app-opt:hover {
    background-color: #333;
  }

  .app-opt .iconfont {
    font-size: 25px;
  }

  .editor-opt {
    padding: 0 5px;
  }

  .sidebar-opened .editor-opt {
    display: none;
  }

  .editor-opt .iconfont {
    font-size: 18px;
  }

  .opt-item-sidebar {
    float: left;
    border-right: 1px solid #333;
  }

  .opt-item-username {
    float: right;
    line-height: 50px;
    margin-right: 20px;
  }

  .app-opt div {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-out;;
  }

  .sidebar-opened .opt-item-sidebar div {
    transform: rotate(180deg);
  }

  .menulist-opened .opt-item-menulist div {
    transform: rotate(180deg);
  }

  .opt-item-menulist {
    float: right;
    border-left: 1px solid #333;
  }

  .opt-group {
    display: inline-block;
    margin-left: 25px;
  }
</style>
