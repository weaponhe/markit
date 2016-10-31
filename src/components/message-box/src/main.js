import Vue from 'vue';
import msgboxVue from './main.vue';
let merge = require('../../../util/merge');
let
  instance,
  msgQueue = [],
  currentMsg,

  defaults = {
    title: '提示',
    message: '消息',
    showClose: true,
    showConfirmButton: true,
    showCancelButton: false
  };

const
  MessageBoxConstructor = Vue.extend(msgboxVue);

const handle = action => {
  if (action === 'comfirm') {
    currentMsg.resolve(action)
  } else if (action === 'cancel') {
    currentMsg.reject(action)
  }
}

const showNextMsg = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  });
  instance.handle = handle;
  currentMsg = msgQueue.shift();
  merge(instance, currentMsg.options);

  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.show = true;
  });
}

const MessageBox = function (options) {
  return Promise((resolve, reject) => {
    msgQueue.push({
      options: merge({}, defaults, options),
      resolve: resolve,
      reject: reject
    });
    showNextMsg();
  });
}
MessageBox.alert = (title, message, options)=> {
  return MessageBox(merge({
    title: title,
    message: message,
    type: 'alert'
  }, options));
}
MessageBox.confirm = (title, message, options)=> {
  MessageBox();
}

MessageBox.prompt = (title, message, options)=> {
  MessageBox();
}

export default MessageBox;
export {MessageBox};
