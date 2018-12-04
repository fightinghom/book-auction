import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations'

//挂载vuex
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userinfo: JSON.parse(sessionStorage.getItem('user')),
		loginStatus: sessionStorage.getItem('loginStatus')
	},
	getters: {
		getUserinfo: ({userinfo}) => {
			return userinfo
		},
		getLoginStatus: ({loginStatus}) => {
			return loginStatus
		}
	},
	mutations: {
		[types.User_Info](state, userinfo) {
			state.userinfo = userinfo
			sessionStorage.setItem('user', JSON.stringify(userinfo))
		},
		[types.Login_Status](state, status) {
			state.loginStatus = status
			sessionStorage.setItem('loginStatus', status)
		}
	},
	actions: {
		setUserinfo: ({commit}, info) => {
			return commit(types.User_Info, info)
		},
		setLoginStatus: ({commit}, status) => {
			return commit(types.Login_Status, status)
		}
	}

})

export default store
