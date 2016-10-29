<template>
  <div class="menulist">
    <!--<div class="sidebar-header"></div>-->
    <ul class="menulist-ul">
      <!--<template v-if="user">-->
      <!--<a href="" @click="sync">-->
      <li @click="sync">立即同步</li>
      <!--</a>-->
      <li>设置</li>
      <li class="divider"></li>
      <li @click="logout">退出</li>
      <!--</template>-->
      <!--<template v-else>-->
      <a href="/auth/github" @click="login">
        <li>github登录</li>
      </a>
      <!--</template>-->
    </ul>
  </div>
</template>

<script>
  import * as types from '../store/mutation-types'
  export default{
    methods: {
      sync () {
        this.$store.commit(types.MESSAGE_PUSH, '正在同步')
        this.$store.dispatch('sync')
      },
      login(){
        this.$store.commit('toggleSpinning')
        this.$store.dispatch('login')
      },
      logout(){
        this.$store.dispatch('logout')
      }
    },
    computed: {
      user(){
        return this.$store.state.user.user
      }
    }
  }
</script>
<style scoped>
  a {
    text-decoration: none;
    color: inherit;
  }

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
    margin: 10px 0;
  }

  .menulist-ul li.divider:hover {
    cursor: auto;
    background-color: #BBB;
  }
</style>
