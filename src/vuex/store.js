import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations'

//挂载vuex
Vue.use(Vuex)

const store = new Vuex.Store({
	//状态值
	state: {
		userinfo: JSON.parse(sessionStorage.getItem('user')),
		loginStatus: sessionStorage.getItem('loginStatus'),
		bookCategory: JSON.parse(sessionStorage.getItem('bookCategory'))
	},


	//获取状态值
	getters: {
		getUserinfo: ({userinfo}) => {
			return userinfo
		},
		getLoginStatus: ({loginStatus}) => {
			return loginStatus
		},
		getBookCategory: ({bookCategory}) => {
			return bookCategory
		}
	},


	//改变状态值
	mutations: {
		[types.User_Info](state, userinfo) {
			state.userinfo = userinfo
			sessionStorage.setItem('user', JSON.stringify(userinfo))
		},
		[types.Login_Status](state, status) {
			state.loginStatus = status
			sessionStorage.setItem('loginStatus', status)
		},
		[types.Book_Category](state, bookCategory) {
			state.bookCategory = bookCategory
			sessionStorage.setItem('bookCategory', JSON.stringify(bookCategory))
		}
	},


	//调用改变状态值方法
	actions: {
		setUserinfo: ({commit}, info) => {
			return commit(types.User_Info, info)
		},
		setLoginStatus: ({commit}, status) => {
			return commit(types.Login_Status, status)
		},
		setBookCategory: ({commit}, category) => {
			return commit(types.Book_Category, category)
		}
	}

})

export default store
