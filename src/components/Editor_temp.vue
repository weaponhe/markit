<template>
  <div class="editor clearfix">
    <div class="editor-option">
      <div class="app-opt opt-item opt-item-menu" @click="toggleMenu">
        <i v-if="menuOpened" class="iconfont">&#xe606;</i>
        <i v-else class="iconfont">&#xe607;</i>
      </div>
      <div class="app-opt opt-item opt-item-setting" @click="toggleSetting">
        <i class="iconfont">&#xe609;</i>
      </div>
      <span class="editor-opt opt-item iconfont" @click="insertBold">&#xe614;</span>
      <span class="editor-opt opt-item iconfont" @click="insertItalic">&#xe615;</span>
      <span class="editor-opt opt-item iconfont">&#xe618;</span>
      <span class="editor-opt opt-item iconfont">&#xe612;</span>
      <span class="editor-opt opt-item iconfont">&#xe613;</span>
    </div>
    <textarea id="editor-textarea"></textarea>
    <div class="editor-preview markdown-body" v-html="html"></div>
  </div>
</template>
<script>
  import CodeMirror from 'codemirror';

  var marked = require('marked')
  require('codemirror/lib/codemirror.css');
  require('codemirror/theme/material.css');
  require('github-markdown-css/github-markdown.css');
  export default{
    name: 'editor',
    props: {
      menuOpened: Boolean,
      file: Object,
      index: Number,
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
      html: function () {
        return marked(this.file.content.split('---')[1])
      }
    },
    watch: {
      'file.cid': function (val) {
        this.cm.setValue(this.file.content);
      }
    },
    methods: {
      contentChange: function (newContent) {
        this.$emit('updateFile', this.index, newContent)
      },
      toggleMenu: function () {
        this.$emit('toggleMenu');
      },
      toggleSetting: function () {

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

      }
    },
    mounted: function () {
      var that = this;
      this.cm = CodeMirror.fromTextArea(document.getElementById('editor-textarea'), this.options);
      this.cm.setValue(this.file.content);
      this.cm.on('change', function (cm) {
        that.contentChange(cm.getValue());
      });
    }
  }
</script>
<style>
  .editor {
    height: 100%;
    position: relative;
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

  .editor-opt .iconfont {
    font-size: 18px;
  }

  .opt-item-menu {
    float: left;
    border-right: 1px solid #333;
  }

  .opt-item-setting {
    float: right;
    border-left: 1px solid #333;
  }
</style>
