// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'

//引用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入fontawesome图标库
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

//引用axios
import Qs from 'qs'
const axios = require('axios')
Vue.prototype.axios = axios
Vue.prototype.qs = Qs

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
	/* store.getters.getLoginStatus ? next() : next('/') */
	/* if ( store.getters.getLoginStatus) {
		next()
	} else {
		next({path: '/'})
	} */
	if (to.path === '/login' || to.path === '/') {
		next()
		//return
	} else {
		store.getters.getLoginStatus ? next() : next('/')
	}
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
