// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource  from 'vue-resource'
import App from './App'
import store from './store'
import  * as types from './store/mutation-types'
Vue.use(VueResource);

import MessageBox from './components/message-box'
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  created()
  {
    var access_token;
    var queryStr = location.search.slice(1);
    if (queryStr) {
      var query = JSON.parse('{"' + decodeURI(queryStr).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
      this.$store.commit(types.USERNAME, query.username)
      this.$store.commit(types.TOKEN, query.token)
      this.$store.dispatch('getUser')
    }
  }
})
