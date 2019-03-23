<template>
	<div class="user">
		<div class="info-back" v-show="!cropperStatus">
			<div class="info-name">{{displayName}}</div>
		</div>
		<div class="info-panel"  v-show="!cropperStatus">
			<div class="photo vertical-center">
				<div class="info-image">
					<img :src="userinfo.img ? userinfo.img : defaultImg" alt="">
					<input ref="imgInput" type="file" accept="image/*" @change="openCropper()"/>
				</div>
			</div>
			<div class="change-photo">
				<a href="javascript:void(0)" @click="imageChoice()" v-if="editInfo">更改头像</a>
			</div>
			<el-form label-width="80px">
				<el-form-item label="学号:">
					<div>{{userinfo.id}}</div>
				</el-form-item>
				<el-form-item label="姓名:">
					<el-input v-model="userinfo.name" :disabled="!editInfo"></el-input>
				</el-form-item>
				<el-form-item label="昵称:">
					<el-input v-model="userinfo.nikename" :disabled="!editInfo"></el-input>
				</el-form-item>
				<el-form-item label="手机:">
					<el-input v-model="userinfo.phone" :disabled="!editInfo"></el-input>
				</el-form-item>
			</el-form>
			<el-form>
				<el-form-item>
					<el-button @click="editInfo ? saveInfo() : (editInfo = !editInfo)">{{editInfo ? '保存修改' :'编辑信息'}}</el-button>
				</el-form-item>
				<el-form-item v-if="editInfo">
					<el-button @click="cancelEdit">取消编辑</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="cropper-wapper" v-if="cropperStatus">
			<vue-cropper
			ref="cropper"
			:img="preImg"
			:outputType="'png'"
			:autoCrop="true"
			:autoCropWidth="300"
			:autoCropHeight="300"
			:fixed="true"
			:fixedBox="true"
			>
			</vue-cropper>
		</div>
		<div class="cropper-btn" slot="footer" v-if="cropperStatus">
				<el-button @click="comfirmCrop">确定</el-button>
				<el-button @click="concelCrop">取消</el-button>
		</div>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {VueCropper} from 'vue-cropper'
import http from '@/utils/api/index'
import imgUtil from '@/utils/imgHelper'
export default {
	data() {
		return {
			defaultImg: require('@/assets/image/default.gif'),
			userinfo: {},
			editInfo: false,
			cropperStatus: false,
			preImg: '',
		}
	},
	components: {
		VueCropper
	},
	computed: {
		...mapGetters(['getUserinfo']),
		displayName() {
			let self = this
			let name = self.userinfo.name
			let nickname = self.userinfo.nikename
			let stuId = self.userinfo.id
			if (nickname) {
				return nickname
			}
			if (name) {
				return name
			}
			if (stuId) {
				return stuId
			}
		}
	},
	methods: {
		...mapActions(['setUserinfo']),
		imageChoice() {
			this.$refs.imgInput.click()
		},
		openCropper() {
			let self = this
			imgUtil.toBase64(this.$refs.imgInput.files[0], rs => {
				self.preImg = rs
				self.cropperStatus = true
			})
		},
		saveInfo() {
			let self = this
			http.system.saveUser(self.userinfo)
			.then(res => {
				if (res) {
					self.setUserinfo(self.userinfo)
					self.editInfo = false
				}
			})
			.catch(value => {
				console.log(value)
			})
		},
		cancelEdit() {
			this.userinfo = this.getUserinfo
			this.editInfo = false
		},
		/**
		 * 确定截图暨去获取截图数据
		 */
		comfirmCrop() {
			let self = this
			self.$refs.cropper.getCropData((data) => {
				let imgData = data.split(',')[1]
				http.system.savePic({
					id: self.userinfo.id,
					data: imgData
				})
				.then(res => {
					self.userinfo.img = res
				})
				.catch(value => {
					console.log(value)
				})
				self.cropperStatus = false
			})
		},
		/**
		 * 取消截图
		 */
		concelCrop() {
			this.cropperStatus = false
		}
	},
	mounted() {
		this.userinfo = this.getUserinfo
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
		.cropper-wapper {
			width: 100%;
			height: 600px;
		}
		.el-form {
			width: 100%;
			margin: 0 auto;
			text-align: left;
		}
		.cropper-btn {
			margin-top: 10px;
			.el-button {
				width: 100px !important;
				height: 40px !important;
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
		border-radius: 20px;
		&:hover {
			background: #647bec;
		}
	}
	.el-input__inner {
		background-color: #fcfcfc !important;
	}
</style>
