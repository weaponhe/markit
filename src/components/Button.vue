<template>
  <button
    class="button"
    @click="handleClick"
    :class="[
      type ? 'button--' + type : '',
      size ? 'button--' + size : ''
      ]"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
  export default {
    name: 'Mybutton',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String
    },
    methods: {
      handleClick(e)
      {
        this.$emit('click', e);
      }
    }
  }

</script>

<style scoped>
  .button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #c0ccda;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 4px;
  }

  .button--default {
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
  }

  .button--default:hover {
    color: #42b983;
    border-color: #42b983;
  }

  .button--primary {
    color: #FFF;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }

  .button--primary:hover {
    color: #FFF;
    background: #4db3ff;
    border-color: #4db3ff;
  }
</style>
