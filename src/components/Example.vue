<template>
  <div class="Example">
    <codemirror :code="code" :options="editorOption" @changed="codeChange"></codemirror>
    <pre>{{ code }}</pre>
    <textarea v-model="code"></textarea>
    <hr>
    <codemirror v-model="code2" :options="editorOption"></codemirror>
    <pre>{{ code2 }}</pre>
    <textarea v-model="code2"></textarea>
  </div>
</template>

<script>
  import {codemirror} from 'vue-codemirror'
  export default {
    name: 'Exapmle',
    components: {
      codemirror
    },
    data () {
      return {
        code: '<div>1</div>',
        code2: '<div>2</div>',
        css: '.class { display: block }',
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
    methods: {
      codeChange(newCode) {
        console.log(newCode)
        this.code = newCode
      }
    }
  }
</script>
