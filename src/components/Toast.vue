<template>
  <transition name="fade">
    <div class="toast" v-if="showing">
      {{messageList[0]}}
    </div>
  </transition>
</template>

<script>
  export default {
    data: function () {
      return {
        showing: false
      }
    },
    props: {
      messageList: Array
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
                that.$emit('shiftMessage');
              }, 2000);
            }, 2000);
          } else if (val === 1 && oldVal === 0) {
            this.showing = true;
            setTimeout(()=> {
              that.$emit('shiftMessage');
            }, 2000);
          }
//          else if(val === 0 && oldVal === 1){
//            this.showing = true;
//          }
          console.log(val);
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

  .showing {
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
