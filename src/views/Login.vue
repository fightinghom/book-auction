<template>
	<div class="login-wapper vertical-center">
		<div class="login-container">
			<div class="login-banner ba-shadow">
				<div class="banner-bg">
					<div class="banner-left fl">
						<div class="title">攀枝花学院二手图书交易平台</div>
						<div class="by">By Hao.Yang</div>
					</div>
					<div class="banner-right fr" v-if="false"></div>
				</div>
			</div>
			<div class="login-panel ba-shadow"></div>
		</div>
	</div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
	.login-wapper {
		width: 100%;
		height: 100%;
		.login-container {
			position: relative;
			width: 998px;
			height: 662px;
			.login-banner {
				position: absolute;
				width: 100%;
				height: 564px;
				z-index: 9;
				top: 50%;
				-webkit-transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				-o-transform: translateY(-50%);
				-moz-transform: translateY(-50%);
				transform: translateY(-50%);
				background-image: url('../assets/image/login-bg.jpg');
				background-repeat: no-repeat;
				background-size: cover;
				.banner-bg {
					width: 100%;
					height: 100%;
					background: rgba($color: #002aff, $alpha: 0.7);
					.banner-left {
						width: 505px;
						height: 100%;
						color: #ffffff;
						padding: 0 20px;
						text-align: left;
						.title {
							font-size: 35px;
							margin-top: 40px;
						}
						.by {
							font-size: 20px;
							text-align: right;
							margin-top: 10px;
						}
					}
				}
			}
			.login-panel {
				position: absolute;
				height: 100%;
				width: 453px;
				z-index: 99;
				right: 0;
				background: $panel-bg-color;
			}
		}
	}
</style>
