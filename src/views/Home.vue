<template>
	<div class="wapper vertical-center">
		<div class="bg-cover"></div>
		<div class="header ba-basic-color-aph">
			<div class="vertical-center icon"><i class="fas fa-book-open fa-2x"></i></div>
			<div class="plafrom-title">攀枝花学院二手图书拍卖平台</div>
			<div class="vallet" @click="updateMoney()">可用余额: {{user.balance}} ￥</div>
			<div class="fr personal-info" @mouseout="userFunc = !userFunc"  @mouseover="userFunc = !userFunc" :style="{'height': userFunc ? '150px' : '50px'}">
				<div class="user-account">
					<div class="user-name fl">{{displayName}}</div>
					<div class="user-image fl">
						<img :src="displayImg" alt="">
					</div>
				</div>
				<div class="user-account ba-basic-color-aph" @click="userInfo = true">个人资料</div>
				<div class="user-account ba-basic-color-aph" @click="logout">注销登录</div>
			</div>
		</div>
		<div class="content">
			<div class="content-wapper">
				<div class="aside ba-basic-color-aph">
					<ba-menu></ba-menu>
				</div>
				<div class="main">
					<router-view></router-view>
				</div>
			</div>

		</div>
		<el-dialog
		width="100%"
		:visible.sync="userInfo"
		title="个人资料"
		custom-class="ba-bg-color max-w-600">
			<ba-user-info @closeDialog="closeDialog"></ba-user-info>
		</el-dialog>
	</div>
</template>
<script>
import Menu from '@/components/Menu.vue'
import UserInfo from '@/components/UserInfo.vue'
import {mapActions, mapGetters} from 'vuex'
import http from '@/utils/api/index'
export default {
	data() {
		return {
			userFunc: false,
			defaultImg: require('@/assets/image/default.gif'),
			userInfo: false,
			user: {},
			queryUserById(stuId) {
				let self = this
				http.system.getUserById({
					id: stuId
				})
				.then((res) => {
					self.user = res
					self.setUserinfo(self.user)
				})
				.catch((value) => {
					console.log(value)
				})
			},
			queryBookCaList() {
				let self = this
				http.auction.getBookCategoryList({})
				.then(res => {
					self.setBookCategory(self.fn(res, 0))
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	components: {
		BaMenu: Menu,
		BaUserInfo: UserInfo
	},
	computed: {
		...mapGetters(['getUserinfo']),
		displayName() {
			let self = this
			let name = self.user.name
			let nickname = self.user.nikename
			let stuId = self.user.id
			if (nickname) {
				return nickname
			}
			if (name) {
				return name
			}
			if (stuId) {
				return stuId
			}

		},
		displayImg() {
			let self = this
			let img = self.user.img
			return img ? img : self.defaultImg
		}
	},
	methods: {
		...mapActions(['setUserinfo', 'setLoginStatus', 'setBookCategory']),
		logout() {
			this.setUserinfo({})
			this.setLoginStatus(false)
			this.$router.push('/')
		},
		closeDialog(val) {
			if (val) {
				this.userInfo = false
			}
		},
		fn(data, pid) {
			let result = [] , temp
			data.forEach(item => {
				if (item.pid == pid) {
					result.push(item)
					temp = this.fn(data, item.id)
					if(temp.length > 0) {
						item.children=temp
					} else {
						item.children = []
					}
				}
			})
			return result

		},
		updateMoney() {
			let id = this.getUserinfo.id
			this.queryUserById(id)
		}
	},
	mounted() {
		let id = this.getUserinfo.id
		this.queryUserById(id)
		this.queryBookCaList()
		//this.user = this.getUserinfo
	}
}
</script>
<style lang="scss" scoped>
	@import '@/assets/css/theme.scss';
	.wapper {
		width: 100%;
		height: 100%;
		position: relative;
		.header {
			position: absolute;
			display: flex;
			z-index: 999;
			left: 0;
			top: 0;
			height: 50px;
			right: 0;
			color: #eaedfa;
			.icon {
				width: 50px;
				height: 50px;
			}
			.plafrom-title {
				line-height: 50px;
				flex: 1 1;
				text-align: left;
			}
			.vallet {
				line-height: 50px;
				width: 150px;
				.icon {
					display: inline-block;
				}
				&:hover {
					background: #647bec;
					cursor: pointer;
				}
			}
			.personal-info {
				position: relative;
				overflow: hidden;
				z-index: 9999;
				transition: all 0.5s;
				.user-account {
					height: 50px;
					line-height: 50px;
					padding: 0 10px;
					&:hover {
						background: #647bec;
						cursor: pointer;
					}
					.user-name {
						text-align: right;
						padding-right: 10px;
						width: 150px;
						text-overflow: ellipsis;
						word-break:keep-all;
						white-space:nowrap;
						overflow:hidden;
					}
					.user-image {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						//padding: 5px;
						margin-top: 5px;
						background: #eaedfa;
						img {
							width: 40px;
							height: 40px;
							border-radius: 20px;
						}
					}
				}
			}
		}
		.content {
			position: absolute;
			left: 0;
			right: 0;
			top: 50px;
			bottom: 0;
			.content-wapper {
				width: 100%;
				height: 100%;
				position: relative;
				.aside {
					position: absolute;
					width: 50px;
					top: 0;
					bottom: 0;
					z-index: 999;
				}
				.main {
					position: absolute;
					left: 50px;
					top: 0;
					bottom: 0;
					right: 0;
					overflow: auto;
					//z-index: 2;
					padding: 20px 20px;
				}
			}
		}
	}

</style>

