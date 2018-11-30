<template>
	<div class="wapper vertical-center">
		<div class="bg-cover"></div>
		<el-container>
			<el-header class="ba-basic-color-aph" height="50px">
				<div class="vertical-center fl icon"><i class="fas fa-book-open fa-2x"></i></div>
				<div class="plafrom-title fl">攀枝花学院二手图书拍卖平台</div>
				<div class="fr user-info" @mouseout="userFunc = !userFunc"  @mouseover="userFunc = !userFunc" :style="{'height': userFunc ? '200px' : '50px'}">
					<div class="user-account">admin</div>
					<div class="user-account ba-basic-color-aph">个人资料</div>
					<div class="user-account ba-basic-color-aph" @click="logout">注销登录</div>
				</div>
			</el-header>
			<el-container>
				<el-aside width="50px">
					<ba-menu></ba-menu>
				</el-aside>
				<el-main>neirong</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
import Menu from '@/components/Menu.vue'
export default {
	data() {
		return {
			userFunc: false
		}
	},
	components: {
		BaMenu: Menu
	},
	methods: {
		logout() {
			this.$router.push('/')
		}
	}
}
</script>
<style lang="scss" scoped>
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
				padding-left: 30px;
			}
			.user-info {
				width: 200px;
				position: relative;
				overflow: hidden;
				z-index: 9999;
				transition: all 0.5s;
				.user-account {
					height: 50px;
					line-height: 50px;
					&:hover {
						background: #647bec;
						cursor: pointer;
					}
				}
			}
		}
		.el-aside {
			height: 100%;
		}
	}
</style>

