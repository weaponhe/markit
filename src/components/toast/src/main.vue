<template>
  <transition name="fade">
    <div class="toast" v-show="show">
      <span class="toast-type iconfont" v-html="mark"></span>
      <span class="toast-message">{{message}}</span>
    </div>
  </transition>
</template>

<script>

  export default {
    data: function () {
      return {
        show: false,
        message: '通知',
        type: 'success',//success/warning/info/error
        duration: 2000,
        showClose: false,
        onClose: null
      }
    },
    computed: {
      mark(){
        switch (this.type) {
          case 'success':
            return '&#xe632;'
        }
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: absolute;
    z-index: 10000;
    top: 5px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    min-width: 200px;
    padding: 0;
    height: 40px;
    line-height: 40px;
    background-color: #FFF;
    vertical-align: middle;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
    transition: all .5s;
  }

  .toast-type {
    float: left;
    height: 100%;
    width: 40px;
    background-color: #4fc08d;
    color: #FFF;
    text-align: center;
  }

  .toast-message {
    padding: 0 10px;
    color: #666;
    font-size: 15px;
  }

  .fade-enter-active, .fade-leave-active {
    top: 5px;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    top: -40px;
  }

</style>
