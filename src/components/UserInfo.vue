<template>
	<div class="user">
		<div class="info-back">
			<div class="info-name">冲儿子是个大傻逼</div>
		</div>
		<div class="info-panel">
			<div class="photo vertical-center">
				<div class="info-image">
					<img :src="defaultImg" alt="">
					<input ref="imgInput" type="file" accept="image/*"/>
				</div>
			</div>
			<div class="change-photo"><a href="javascript:void(0)" @click="imageUp()">更改头像</a></div>
			<el-form>
				<el-form-item label="学号:">
					<div>{{userinfo.stuId}}</div>
				</el-form-item>
				<el-form-item label="姓名:">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="昵称:">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="手机:">
					<el-input></el-input>
				</el-form-item>
				<el-form-item>
					<el-button>保存修改</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			defaultImg: require('@/assets/image/default.gif'),
			userinfo: {
				stuId: '201510801007',
				name: '',
				nickname: '',
				phone: '',
				img: ''
			}
		}
	},
	methods: {
		imageUp() {
			this.$refs.imgInput.click()
		}
	}
}
</script>
<style lang="scss" scoped>
	.user {
		//position: relative;
		.info-back {
			height: 100px;
			position: absolute;
			z-index: 999;
			left: 0;
			right: 0;
			border-radius: 0px 0px 50px 50px;
			background: #002aff;
			color: #fcfcfc;
			.info-name {
				padding: 15px 0;
				font-size: 20px;
			}
		}
		.info-panel {
			width: 100%;
			padding-top: 50px;
			position: relative;
			z-index: 9999;
			.photo {
				height: 100px;
				.info-image {
					width: 90px;
					height: 90px;
					border-radius: 45px;
					background: #ffffff;
					box-shadow: 0 0 15px 0 #002aff;
					img {
						width: 90px;
						height: 90px;
						border-radius: 45px;
					}
					input {
						display: none;
					}
				}
			}
		}
		.el-form {
			width: 100%;
			margin: 0 auto;
			text-align: left;
		}
	}
	.el-button {
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding: 0;
		background: #002aff;
		color: #fcfcfc;
		border-radius: 20px;
		&:hover {
			background: #647bec;
		}
	}
	.el-input__inner {
		background-color: #fcfcfc !important;
	}
</style>
