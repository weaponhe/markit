<template>
  <div class="message-box__wrapper" v-if="show">
    <transition name="fade">
      <div class="message-box__mask">
        <div class="message-box__box">
          <div class="message-box__header clearfix" v-if=" title !== '' ">
            <div class="message-box__title"><h3>{{title}}</h3></div>
            <i class="iconfont message-box__close" @click="handleAction('cancel')" v-if="showClose">&#xe60b;</i>
          </div>
          <div class="message-box__content">
            <div class="message-box__message" v-if=" message !== '' ">{{message}}</div>
            <div class="message-box__input" v-if="showInput">
              <input type="text">
            </div>
          </div>
          <div class="message-box__footer">
            <button v-if="showConfirmButton" @click="handleAction('comfirm')">确定</button>
            <button v-if="showCancelButton" @click="handleAction('cancel')">取消</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        message: '',
        type: '',
        showConfirmButton: true,
        showCancelButton: false,
        showInput: false,
        show: false,
        handle: null
      }
    },
    methods: {
      handleAction(action){
        this.show = false;
        this.handle(action);
      }
    }
  }
</script>

<style>
  .message-box__wrapper {
    position: absolute;
    z-index: 100000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all .2s ease
  }

  .message-box__mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all .2s ease
  }

  .message-box__box {
    position: absolute;
    top: 200px;
    left: 50%;
    width: 500px;
    margin-left: -250px;
    padding: 15px;
    background-color: #FFF;
    transition: all .2s ease
  }

  .message-box__header {
    /*border-bottom: 1px solid #eee;*/
    /*padding: 10px 10px;*/
  }

  .message-box__title {
    float: left;
    color: #42b983;
  }

  .message-box__title h3 {
    margin: 0;
  }

  .message-box__close {
    float: right;
  }

  .message-box__content {
    margin: 20px 0;
  }

  .message-box__footer {
    /*height: 50px;*/
    /*line-height: 50px;*/
    /*border-top: 1px solid #eee;*/
    text-align: right;
    /*padding: 0 10px;*/
  }

  /*.button {*/
    /*height: 30px;*/
    /*border-radius: 3px;*/
    /*font-size: 16px;*/
    /*font-weight: bold;*/
    /*cursor: pointer;*/
    /*letter-spacing: 2px;*/
    /*text-align: center;*/
    /*padding: 0 10px;*/
  /*}*/

  /*.button-success {*/
    /*background-color: #42b983;*/
    /*border: 1px solid #42b983;*/
    /*color: #fff;*/
  /*}*/

  /*.button-success:hover {*/
    /*background-color: #398439;*/
    /*border: 1px solid #398439;*/
  /*}*/

  /*.button-default {*/
    /*background-color: #fff;*/
    /*border: 1px solid #ccc;*/
    /*color: #666;*/
  /*}*/

  /*.button-default:hover {*/
    /*border: 1px solid #adadad;;*/
    /*color: #333;*/
    /*background-color: #e6e6e6;*/
  /*}*/

  /*.button-danger {*/
    /*background-color: #d43f3a;*/
    /*border: 1px solid #d43f3a;*/
    /*color: #FFF;*/
  /*}*/

  /*.button-danger:hover {*/
    /*border: 1px solid #b3221d;*/
    /*background-color: #b3221d;*/
  /*}*/

  .fade-enter, .fade-leave-active {
    transform: scale(1.1);
    opacity: 0;
  }
</style>
