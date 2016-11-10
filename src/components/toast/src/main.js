import Vue from 'vue';
import toastVue from './main.vue';
let
  msgQueue = []

const
  ToastConstructor = Vue.extend(toastVue);

const showNextMsg = () => {
  let instance = new ToastConstructor({
    el: document.createElement('div')
  });
  let currentMsg = msgQueue.shift();
  Object.assign(instance, currentMsg.options);

  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.show = true;
    if (instance.duration !== 0) {
      setTimeout(()=> {
        instance.show = false;
      }, instance.duration)
    }
  });
}

const Toast = function (options) {
  msgQueue.push({
    options
  });
  showNextMsg();
}

Toast.success = (message)=> {
  Toast({
    type: 'success',
    message
  });
}

Toast.info = (message)=> {
  Toast({
    type: 'info',
    message
  });
}

Toast.warning = (message)=> {
  Toast({
    type: 'warning',
    message
  });
}

Toast.error = (message)=> {
  Toast({
    type: 'error',
    message
  });
}

export default Toast;
export {Toast};
