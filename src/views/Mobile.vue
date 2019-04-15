<template>
	<div class="wapper">
		<div class="header" v-if="'order' === mode || 'detail' === mode">
			<div class="back vertical-center" @click="back()"><i class="fas fa-chevron-left fa-2x"></i></div>
			<div class="title">{{'order' === mode? '订单' : ('detail' === mode ? '详情' : '用户')}}</div>
		</div>
		<div class="main">
			<router-view></router-view>
		</div>
		<div class="footer">
			<div
			class="item vertical-center"
			:class="{'on' : 'order' === mode}"
			@click="toMode('order')"
			>
				<i class="fas fa-list fa-2x"></i>
			</div>
			<div
			class="item vertical-center"
			:class="{'on' : 'user' === mode}"
			@click="toMode('user')"
			>
			<i class="fas fa-user fa-2x"></i>
			</div>
		</div>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import http from '@/utils/api/index'
export default {
	data () {
		return {
			mode: '',
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
		}
	},
	methods: {
		...mapActions(['setUserinfo']),
		toMode(mode) {
			this.mode = mode
			this.$router.push('/' + mode)
		},
		back() {
			this.$router.go(-1)
		}
	},
	computed: {
		...mapGetters(['getUserinfo'])
	},
	watch: {
		'$route' (v) {
			this.mode = v.meta.mode
		}
	},
	mounted() {
		let id = this.getUserinfo.id
		this.queryUserById(id)
		this.mode = this.$route.meta.mode
	}
}
</script>
<style lang="scss" scoped>
	@import '@/assets/css/theme.scss';
	.wapper {
		width: 100%;
		height: 100%;
		position: relative;
		background: #fcfcfc;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		.header {
			height: 30px;
			position: relative;
			background: $basic-color;
			color: #ffffff;
			padding: 10px 5px;
			.back {
				position: absolute;
				width: 30px;
				height: inherit;
			}
			.title {
				width: inherit;
				font-size: 20px;
				height: inherit;
				line-height: 30px;

			}
		}
		.main {
			flex: 1 1;
			box-sizing: border-box;
			overflow: auto;
		}
		.footer {
			height: 50px;
			display: flex;
			box-sizing: border-box;
			border-top: 1px #b9beda solid;
			color: #b9beda;
			.item {
				flex: 1;
				&:first-child {
					border-right: 1px #b9beda solid;
				}
			}
		}
	}
	.on {
		color: $basic-color;
	}
</style>
