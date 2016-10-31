<template>
  <transition name="fade">
    <div class="modal-wrapper">
      <div class="modal-mask">
        <div class="modal-box">

          <div class="modal-header">
            <slot name="header">
              {{title}}
            </slot>
          </div>

          <div class="modal-body">
            {{message}}
          </div>

          <div class="modal-footer">

          </div>
        </div>
      </div>
    </div>

  </transition>
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
        show: false,
        handle: null
      }
    }
  }
</script>

<style>
  .modal-wrapper {
    position: absolute;
    z-index: 100000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all .2s ease
  }

  .modal-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all .2s ease
  }

  .modal-box {
    position: absolute;
    top: 200px;
    left: 50%;
    width: 500px;
    margin-left: -250px;
    background-color: #FFF;
    transition: all .2s ease
  }

  .modal-header {
    border-bottom: 1px solid #eee;
    padding: 10px 10px;
  }

  .modal-header h3 {
    margin: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-footer {
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #eee;
    text-align: right;
    padding: 0 10px;
  }

  .button {
    height: 30px;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    letter-spacing: 2px;
    text-align: center;
    padding: 0 10px;
  }

  .button-success {
    background-color: #42b983;
    border: 1px solid #42b983;
    color: #fff;
  }

  .button-success:hover {
    background-color: #398439;
    border: 1px solid #398439;
  }

  .button-default {
    background-color: #fff;
    border: 1px solid #ccc;
    color: #666;
  }

  .button-default:hover {
    border: 1px solid #adadad;;
    color: #333;
    background-color: #e6e6e6;
  }

  .button-danger {
    background-color: #d43f3a;
    border: 1px solid #d43f3a;
    color: #FFF;
  }

  .button-danger:hover {
    border: 1px solid #b3221d;
    background-color: #b3221d;
  }

  .fade-enter, .fade-leave-active {
    transform: scale(1.1);
    opacity: 0;
  }
</style>
