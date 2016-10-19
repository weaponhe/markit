<template>
  <div class="editor clearfix">
    <codemirror :code="fileList[index]" :options="editorOption" @changed="codeChange"></codemirror>
    <div class="editor-preview markdown-body" v-html="html">
    </div>
  </div>
</template>
<script>
  let marked = require('marked')
  import {codemirror} from 'vue-codemirror'
  console.log(codemirror.editor);
  export default{
    name: 'editor',
    props: ['fileList', 'index'],
    data: function () {
      return {
        editorOption: {
          tabSize: 2,
          styleActiveLine: true,
          line: true,
          lineNumbers: true,
          mode: 'text/x-markdown',
          lineWrapping: true,
          theme: 'material'
        }
      }
    },
    computed: {

      html: function () {
        return marked(this.fileList[this.index].split('---')[1])
      }
    },
    methods: {
      codeChange: function (newCode) {
        this.$emit('updateFile', this.index, newCode)
      }
    },
    components: {
      codemirror
    }
  }
</script>
<style>
  @import '../assets/github-markdown.css';

  .editor {
    height: 100%;
    position: relative;
  }

  .editor .CodeMirror {
    position: absolute;
    top: 0;
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
    top: 0;
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
    top: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    height: 50px;
    background-color: #444;
    /*padding: 5px 0;*/
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    color: #ccc;
  }

  .editor-option .iconfont {
    font-size: 25px;
  }

  .app-btn {
    line-height: 50px;
    width: 50px;
    text-align: center;
  }

  .app-btn:hover {
    cursor: pointer;
    background-color: #333;
  }

  .menu {
    float: left;
    border-right: 1px solid #333;
  }

  .setting {
    float: right;
    border-right: 1px solid #333;
  }
</style>
