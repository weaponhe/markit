<template>
  <transition name="fade">
    <div class="toast" v-show="showing">
      {{messageList[0]}}
    </div>
  </transition>
</template>

<script>

  import * as types from '../store/mutation-types'
  export default {
    data: function () {
      return {
        showing: false
      }
    },
    computed: {
      messageList(){
        return this.$store.state.message.messageList
      }
    },
    watch: {
      'messageList.length': {
        handler: function (val, oldVal) {
          var that = this;
          if (val < oldVal) {
            this.showing = false;
            val > 0 &&
            setTimeout(()=> {
              that.showing = true;
              setTimeout(()=> {
                this.$store.commit(types.MESSAGE_SHIFT, '正在同步')
              }, 2000);
            }, 2000);
          } else if (val === 1 && oldVal === 0) {
            this.showing = true;
            setTimeout(()=> {
              this.$store.commit(types.MESSAGE_SHIFT, '正在同步')
            }, 2000);
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: absolute;
    top: 50%;
    right: 0;
    color: #FFF;
    box-sizing: border-box;
    padding: 2px 5px;
    height: 25px;
    width: auto;
    margin-top: -12.5px;
    line-height: 21px;
    border-radius: 3px;
    background-color: #4fc08d;
    vertical-align: middle;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    transition: top .5s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    top: -25px;
  }

</style>
