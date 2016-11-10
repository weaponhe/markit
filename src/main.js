import Vue from 'vue'
import VueResource  from 'vue-resource'
import App from './App'
import store from './store'
import  * as types from './store/mutation-types'
Vue.use(VueResource);

import MessageBox from './components/message-box'
import Toast from './components/toast'

Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$toast = Toast
Vue.prototype.$success = Toast.success
Vue.prototype.$info = Toast.info
Vue.prototype.$warning = Toast.warning
Vue.prototype.$error = Toast.error


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
