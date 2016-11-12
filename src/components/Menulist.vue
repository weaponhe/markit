<template>
  <div class="menulist">
    <div v-if="user" class="menulist-header">
      <img :src="user.avatar_url">
      <div  v-if="repo" class="menulist-repo">repo : {{repo}}</div>
    </div>
    <ul class="menulist-ul" @click="close">
      <template v-if="user">
        <li class="divider"></li>
        <li v-if="repo" @click="sync">立即同步</li>
        <li v-if="repo" @click="upload">上传覆盖</li>
        <li @click="setRepo">设置仓库</li>
        <li class="divider"></li>
        <a href="/logout">
          <li>退出</li>
        </a>
      </template>
      <template v-else>
        <a href="/auth/github" @click="$store.commit('TOGGLE_SPINNING')">
          <li>github登录</li>
        </a>
      </template>
    </ul>
  </div>
</template>

<script>
  import * as types from '../store/mutation-types'
  export default{
    methods: {
      close(){
        this.$store.commit(types.TOGGLE_MENULIST);
      },
      upload () {
        this.$confirm('确认上传', '上传操作会用本地文件完全覆盖云端文件，本地没有的文件在云端会被删除，是否继续？')
          .then(()=> {
            return this.$store.dispatch('upload')
          })
          .then(()=> {
            this.$success('上传成功，已用本地目录覆盖云端。')
          })
          .catch((err)=> {
            console.error(err)
            this.$error('上传失败，请稍后再试。')
          })
      },
      sync () {
        this.$store.dispatch('sync')
          .then(()=> {
            this.$success('同步成功')
          })
          .catch((err)=> {
            console.error(err)
            this.$error('同步失败，请稍后再试。')
          })
      },
      setRepo(){
        this.$prompt('设置仓库', '请输入仓库名称', {inputContent: this.repo})
          .then(res=> {
            this.$store.commit(types.REPO_CHANGE, res.value);
            this.$success('设置成功,当前仓库为:' + res.value)
          })
          .catch(()=> {
          })
      }
    },
    computed: {
      user(){
        return this.$store.state.user.user
      },
      repo(){
        return this.$store.state.file.repo
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

  .menulist img {
    display: block;
    margin: 0 auto;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .menulist-repo {
    text-align: center;
    margin: 10px 0;
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
    background-color: #666;
    margin: 10px 0;
  }

  .menulist-ul li.divider:hover {
    cursor: auto;
    background-color: #BBB;
  }
</style>
