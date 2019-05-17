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
		bookCategory: JSON.parse(sessionStorage.getItem('bookCategory')),
		loading: false /* sessionStorage.getItem('loading') */,
		memroyPage: {
			componentName: ''
		},
		infoComplete: false
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
		},
		getLoading: ({loading}) => {
			return loading
		},
		getMemoryPage: ({memroyPage}) => {
			return memroyPage
		},
		getInfoComplete: ({infoComplete}) => {
			return infoComplete
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
		},
		[types.Loading](state, loading) {
			state.loading = loading
			/* sessionStorage.setItem('loading', loading) */
		},
		[types.Memory_Page](state, memroyPage) {
			state.memroyPage = memroyPage
		},
		[types.Info_Complete](state, infoComplete) {
			state.infoComplete = infoComplete
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
		},
		setLoading: ({commit}, loading) => {
			return commit(types.Loading, loading)
		},
		setMemoryPage: ({commit}, memoryPage) => {
			return commit(types.Memory_Page, memoryPage)
		},
		setInfoComplete: ({commit}, infoComplete) => {
			return  commit(types.Info_Complete, infoComplete)
		}
	}

})

export default store
