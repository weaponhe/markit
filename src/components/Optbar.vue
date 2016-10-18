<template>
  <div class="optbar">
    <div class="app-opt opt-item opt-item-menu" @click="toggleMenu">
      <i v-if="menuOpened" class="iconfont">&#xe606;</i>
      <i v-else class="iconfont">&#xe607;</i>
    </div>
    <div class="app-opt opt-item opt-item-setting" @click="toggleSetting"><i class="iconfont">&#xe609;</i></div>
  </div>
</template>

<script>
  export default {
    name: 'optbar',
    props: [
      'menuOpened'
    ],
    data () {
      return {}
    },
    methods: {
      toggleMenu: function () {
        this.$emit('toggleMenu');
      },
      toggleSetting: function () {

      }
    }
  }
</script>

<style scoped>
  .optbar {
    box-sizing: border-box;
    height: 100%;
    background-color: #444;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    color: #ccc;
  }

  .app-opt {
    height: 100%;
    line-height: 50px;
    width: 50px;
    text-align: center;
  }

  .app-opt:hover {
    cursor: pointer;
    background-color: #333;
  }

  .app-opt .iconfont {
    font-size: 25px;
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
