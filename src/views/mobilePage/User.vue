<template>
	<div class="user">
		<div class="photo-wapper vertical-center">
			<div class="photo">
				<div class="uid">{{user.id}}</div>
				<img v-if="user" :src="user.img" :alt="user.id">
				<div class="name">{{user.nikename}}</div>
			</div>
			<div class="wallet">
				<div class="item vertical-center">
					<div class="z">
						<div class="column">可用余额</div>
						<div class="value">{{user.balance}}</div>
					</div>
				</div>
				<div class="item vertical-center">
					<div  class="z">
						<div class="column">锁定余额</div>
						<div class="value">{{user.lock}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="show">
			<div class="item">
				<span class="param">真实姓名:</span>
				<span>{{user.name}}</span>
			</div>
			<div class="item">
				<span class="param">联系电话:</span>
				<span>{{user.phone}}</span>
			</div>
		</div>
		<el-button type="text" @click="logout()">
			注销登录
		</el-button>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			user: {}
		}
	},
	methods: {
		...mapActions(['setLoginStatus', 'setUserinfo']),
		logout() {
			this.setUserinfo({})
			this.setLoginStatus(false)
			this.$router.push('/')
		}
	},
	computed: {
		...mapGetters(['getUserinfo'])
	},
	mounted() {
		this.user = this.getUserinfo
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
	.user {
		width: 100%;
		height: 100%;
		.photo-wapper {
			width: 100vw;
			height: 100vw;
			position: relative;
			background-image: url('../../assets/image/user-back.jpg');
			background-repeat: no-repeat;
			background-size: cover;
			.photo {
				img {
					width: 33.33vw;
					border-radius: 50%;
				}
				.name {
					padding: 10px 0;
					color: #fff;
					font-size: 6.3vw;
				}
				.uid {
					padding: 10px 0;
					color: #fff;
					font-size: 5vw;
				}
			}
			.wallet {
				height: 19vw;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				display: flex;
				.item {
					flex: 1;
					color: #fff;
					.column {
						font-size: 5vw;
					}
					.value {
						padding: 5px 0;
						font-size: 4vw;
					}
				}
			}
		}
		.show {
			.item {
				padding: 20px 10px;
				font-size: 5vw;
				text-align: left;
				color: rgb(183, 183, 183) !important;
				border-bottom: 1px rgb(183, 183, 183) solid;
				span {
					display: inline-block;
				}
				.param {
					width: 100px;
				}
			}
		}
		.el-button {
			margin-top: 20px;
			width: 100vw;
			font-size: 6vw;
			color: $basic-color;
		}
	}
</style>

