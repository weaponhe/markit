import Vue from 'vue';
import msgboxVue from './main.vue';
let merge = require('../../../util/merge');
let
  instance,
  msgQueue = [],
  currentMsg

const
  MessageBoxConstructor = Vue.extend(msgboxVue);

const handle = action => {
  if (action === 'confirm') {
    if (instance.type === 'prompt') {
      currentMsg.resolve({action, value: instance.inputContent})
    } else {
      currentMsg.resolve(action)
    }
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

const MessageBox = function (options = {}) {
  return new Promise((resolve, reject) => {
    msgQueue.push({
      options,
      resolve,
      reject
    });
    showNextMsg();
  });
}

MessageBox.alert = (title, message, options = {})=> {
  return MessageBox(merge({
    type: 'alert',
    title: title,
    message: message,
  }, options));
}
MessageBox.confirm = (title, message, options = {})=> {
  return MessageBox(merge({
    type: 'confirm',
    title: title,
    message: message,
    showCancelButton: true,
  }, options));
}

MessageBox.prompt = (title, message, options = {})=> {
  return MessageBox(merge({
    type: 'prompt',
    title: title,
    message: message,
    showCancelButton: true,
    showInput: true
  }, options));
}


export default MessageBox;
export {MessageBox};
