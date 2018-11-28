<template>
	<div class="wapper vertical-center">
		<div class="bg-cover"></div>
		<div class="login-container">
			<div class="login-banner ba-shadow">
				<div class="banner-bg">
					<div class="banner banner-left fl" v-if="isLogin">
						<div class="title">攀枝花学院二手图书交易平台</div>
						<div class="by">By Hao.Yang</div>
					</div>
					<div class="banner banner-right fr vertical-center" v-if="!isLogin">
						<div>
							<p>明德砺志</p>
							<p>博学笃行</p>
						</div>
					</div>
				</div>
			</div>
			<div class="login-panel ba-shadow-btm" :style="{'right': isLogin ? 0 : 545+'px'}">
				<div class="switch-btn">
					<div class="btn" @click="change(isLogin ? 'loginForm' : 'registerForm')">
						<div class="is-register" :class="{'is-checked': !isLogin}">注册</div>
						<div class="is-login lf" :class="{'is-checked': isLogin}">登录</div>
					</div>
				</div>
				<!-- 登录和注册 -->
				<div class="login" v-show="isLogin">
					<div class="z">
						<el-form
						ref="loginForm"
						:model="loginForm"
						:rules="loginRule">
							<el-form-item class="mar-top-20 param-name-color">
								<span class="param-name-color">学 号</span>
							</el-form-item>
							<el-form-item prop="stuId">
								<el-input type="text" v-model="loginForm.stuId" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item class="mar-top-20">
								<span class="param-name-color">密 码</span>
							</el-form-item>
							<el-form-item prop="password">
								<el-input type="password" v-model="loginForm.password" autocomplete="off" @keyup.enter.native="login('loginForm')"></el-input>
							</el-form-item>
							<el-form-item class="mar-top-30">
								<el-button @click="login('loginForm')">登 录</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div class="register" v-show="!isLogin">
					<div class="z">
						<el-form
						ref="registerForm"
						:model="registerForm"
						:rules="registerRule">
							<el-form-item class="mar-top-20 param-name-color">
								<span class="param-name-color">学 号</span>
							</el-form-item>
							<el-form-item prop="stuId">
								<el-input v-model="registerForm.stuId" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item class="mar-top-20">
								<span class="param-name-color">手 机</span>
							</el-form-item>
							<el-form-item prop="mobile">
								<el-input v-model="registerForm.mobile" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item class="mar-top-20">
								<span class="param-name-color">密 码</span>
							</el-form-item>
							<el-form-item prop="password">
								<el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item class="mar-top-20">
								<span class="param-name-color">确认密码</span>
							</el-form-item>
							<el-form-item prop="comfirmPwd">
								<el-input type="password" v-model="registerForm.comfirmPwd" autocomplete="off" @keyup.enter.native="register('registerForm')"></el-input>
							</el-form-item>
							<el-form-item class="mar-top-30">
								<el-button @click="register('registerForm')">注 册</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {validate} from '@/utils/validate.js'
export default {
	data() {
		return {
			isLogin: true,
			loginForm: {
				stuId: '',
				password: ''
			},
			registerForm: {
				stuId: '',
				mobile: '',
				password: '',
				comfirmPwd: ''
			},
			loginRule: {
				stuId: validate.userId,
				password: validate.password
			},
			registerRule: {
				stuId: validate.userId,
				mobile: validate.register.mobile,
				password: validate.password,
				comfirmPwd: validate.register.comfirmPwd
			}
		}
	},
	methods: {
		change(form) {
			this.isLogin = !this.isLogin
			this.$refs[form].resetFields()
		},
		login(form) {
			let self = this
			let param = self.loginForm
			self.$refs[form].validate((valid) => {
				if (valid) {
					if( param.stuId === 'admin' && param.password === '123456') {
						self.$router.push('/home')
					}
				} else {
					console.log('验证失败')
				}
			})
		},
		register(form) {
			let self = this
			self.$refs[form].validate((valid) => {
				if (valid) {
					console.log('验证成功')
				} else {
					console.log('验证失败')
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>
	.wapper {
		.login-container {
			position: relative;
			width: 998px;
			height: 662px;
			.login-banner {
				position: absolute;
				width: 100%;
				height: 500px;
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
					.banner {
						width: 505px;
						height: 100%;
						color: #ffffff;
						padding: 0 20px;
						font-size: 35px;
					}
					.banner-left {
						text-align: left;
						.title {
							margin-top: 40px;
						}
						.by {
							font-size: 20px;
							text-align: right;
							margin-top: 10px;
						}
					}
					.banner-right {
						text-align: center;
						div {
							width: 280px;
							text-align: right;
							:first-child {
								text-align: left;
							}
						}
					}
				}
			}
			.login-panel {
				position: absolute;
				height: 100%;
				width: 453px;
				z-index: 99;
				background: #fcfcfc;
				transition: all .7s;
				.switch-btn {
					height: 40px;
					line-height: 40px;
					padding: 0 20px;
					margin-top: 30px;
					.btn {
						float: right;
						font-size: 25px;
						color: #002aff;
						border-radius: 20px;
						cursor: pointer;
						div	{
							padding: 0 10px;
							float: right;
							transition: all .7s;
							border: 1px solid #002aff;
							border-radius: 0px 20px 20px 0px;
						}
						.is-checked {
							background: #002aff;
							color: #fcfcfc;
						}
						.lf {
								border-radius: 20px 0px 0px 20px;
						}
					}
				}
				.login, .register {
					height: 522px;
					.z {
						width: 100%;
						.el-form {
							.el-form-item {
								margin-bottom: 0;
								text-align: left;
								padding: 0 20px;
							}
						}
					}
					.el-button {
						width: 100%;
						height: 40px;
						line-height: 40px;
						padding: 0;
						background: #002aff;
						color: #fcfcfc;
						font-size: 25px;
						border-radius: 20px;
						&:hover {
							background: #647bec;
						}
					}
				}
			}
		}
	}
</style>
