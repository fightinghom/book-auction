<template>
	<div class="wapper vertical-center">
		<div class="bg-cover"></div>
		<el-container>
			<el-header class="ba-basic-color-aph" height="50px">
				<div class="vertical-center fl icon"><i class="fas fa-book-open fa-2x"></i></div>
				<div class="plafrom-title fl">攀枝花学院二手图书拍卖平台</div>
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
			</el-header>
			<el-container>
				<el-aside width="50px">
					<ba-menu></ba-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
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
export default {
	data() {
		return {
			userFunc: false,
			defaultImg: require('@/assets/image/default.gif'),
			userInfo: false,
			user: {}
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
			let nickname = self.user.nickname
			let stuId = self.user.stuId
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
		...mapActions(['setUserinfo', 'setLoginStatus']),
		logout() {
			this.setUserinfo({})
			this.setLoginStatus(false)
			this.$router.push('/')
		},
		closeDialog(val) {
			if (val) {
				this.userInfo = false
			}
		}
	},
	mounted() {
		this.user = this.getUserinfo
	}
}
</script>
<style lang="scss" scoped>
	@import '@/assets/css/theme.scss';
	.icon {
		width: 50px;
		height: 50px;
	}
	.el-container {
		height: 100%;
		position: relative;
		z-index: 99;
		.el-header {
			padding: 0;
			color: #eaedfa;
			.plafrom-title {
				line-height: 50px;
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
						width: 150px;
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
		.el-aside {
			height: 100%;
			/* position: relative;
			z-index: 999; */
		}
		.el-main {
			padding-bottom: 0;
			padding-right: 0;
			overflow-y: auto;
		}
	}
</style>

