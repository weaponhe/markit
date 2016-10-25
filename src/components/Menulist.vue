<template>
  <div class="menulist">
    <!--<div class="sidebar-header"></div>-->
    <ul class="menulist-ul">
      <li>立即同步</li>
      <li class="divider"></li>
      <li>绑定github</li>
      <li>退出</li>
    </ul>
  </div>
</template>

<script>
  export default{
    methods: {
      selectActive: function (index) {
        this.$emit('active', index)
      },
      createFile: function () {
        this.$emit('create')
      }, deleteFile: function (index) {
        this.$emit('delete', index)
      }
    }
  }
</script>
<style scoped>
  .menulist {
    position: relative;
    padding: 10px 10px;
    background-color: #444;
    color: #BBB;
    border-radius: 3px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
    font-size: 16px;
  }

  .menulist-ul {
    list-style-type: none;
    margin-left: 0;
    padding: 0;
    margin: 0;
  }

  .menulist-ul li {
    height: 28px;
    line-height: 28px;
    text-indent: 5px;
  }

  .menulist-ul li:hover {
    cursor: pointer;
    background-color: #74b936;
    color: #fff;
  }

  .menulist-ul li.divider {
    height: 1px;
    background-color: #BBB;
    margin:10px 0;
  }

  .menulist-ul li.divider:hover {
    cursor: auto;
    background-color: #BBB;
  }
</style>
