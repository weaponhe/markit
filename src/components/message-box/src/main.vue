<template>
  <transition name="fade">
    <div class="message-box__wrapper" v-if="show">
      <div class="message-box__mask">
        <div class="message-box__box">
          <div class="message-box__header clearfix" v-if=" title !== '' ">
            <div class="message-box__title"><h3>{{title}}</h3></div>
            <i class="iconfont message-box__close" @click="handleAction('cancel')" v-if="showClose">&#xe736;</i>
          </div>
          <div class="message-box__content">
            <div class="message-box__message" v-if=" message !== '' ">{{message}}</div>
            <div class="message-box__input" v-if="showInput">
              <input v-model="inputContent" type="text">
            </div>
          </div>
          <div class="message-box__footer">
            <my-button v-if="showConfirmButton" @click="handleAction('confirm')" type="primary">确定</my-button>
            <my-button v-if="showCancelButton" @click="handleAction('cancel')">取消</my-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import myButton from '../../Button'
  export default {
    components: {
      myButton
    },
    data () {
      return {
        title: '',
        message: '',
        type: '',
        showConfirmButton: true,
        showCancelButton: false,
        showInput: false,
        inputContent: '',
        showClose: true,
        show: false,
        handle: null,
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
    transition: all .2s ease;
    color: #475669;
  }

  .message-box__header {

  }

  .message-box__title {
    float: left;
    color: #42b983;
  }

  .message-box__title h3 {
    margin: 0;
  }

  .message-box__close {
    cursor: pointer;
    float: right;
    font-size: 20px;
  }

  .message-box__close:hover {
    color: #CCC;
  }

  .message-box__content {
    margin: 20px 0;
  }

  .message-box__input input {
    border: 1px solid #CCC;
    height: 35px;
    line-height: 25px;
    font-size: 16px;
    margin: 20px 0;
    width: 95%;
    border-radius: 3px;
    text-indent: 10px;
  }

  .message-box__footer {
    text-align: right;
  }

  .fade-enter, .fade-leave-active {
    transform: scale(1.1);
    opacity: 0;
  }
</style>
