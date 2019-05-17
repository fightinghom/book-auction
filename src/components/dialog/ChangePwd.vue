<template>
	<el-dialog
	:title="'密码修改'"
	:visible.sync="dialogVisible"
	width="600px"
	:before-close="handleClose">
		<el-form
		ref="pwd"
		:model="pwd"
		:rules="pwdRule"
		label-width="100px">
			<el-form-item label="旧的密码 :" prop="oldPwd">
				<el-input type="password" v-model="pwd.oldPwd"></el-input>
			</el-form-item>
			<el-form-item label="新的密码 :" prop="newPwd">
				<el-input type="password" v-model="pwd.newPwd"></el-input>
			</el-form-item>
			<el-form-item label="确认密码 :" prop="comformPwd">
				<el-input type="password" v-model="pwd.comformPwd"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
				<el-button size="mini" @click="handleClose()">取消</el-button>
				<el-button size="mini" @click="update()" type="primary">确定</el-button>
		</div>
	</el-dialog>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import http from '@/utils/api/index'
import {validate} from '@/utils/validate.js'
import crypto from "crypto-js"
export default {
	props: ['showIt'],
	data() {
		var validatePass2 = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('密码至少6位'));
			} else if (value !== this.pwd.newPwd) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		 };
		 var notSimple =(rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('密码至少6位'));
			} else if(value === this.pwd.oldPwd) {
				callback(new Error('新密码和旧密码相同了'))
			 } else {
				callback();
			 }
		 };
		return {
			dialogVisible: false,
			userId: '',
			pwd: {
				oldPwd: '',
				newPwd: '',
				comformPwd: '',
			},
			pwdRule: {
				oldPwd: validate.password,
				newPwd: [
					{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					},
					{
						validator: notSimple,
						trigger: 'blur'
					}
				],
				comformPwd: [
					{
						required: true,
						message: '请再次输入密码',
						trigger: 'blur'
					},
					{
						validator: validatePass2,
						trigger: 'blur'
					}
				]
			}
		}
	},
	methods: {
		handleClose() {
			this.$emit('handle-close', false)
		},
		update() {
			let self = this
			let pwd = {
				oldPwd: crypto.MD5(self.pwd.oldPwd).toString(),
				newPwd: crypto.MD5(self.pwd.newPwd).toString(),
				userId: self.userId
			}
			self.$refs.pwd.validate(valid => {
				if(valid) {
					http.system.updatePwd(pwd)
					.then(rs => {
						self.$message({
							type: rs.type,
							message: rs.message
						})
						if(rs.type === 'success') {
							self.$emit('handle-close', false)
						}
					})
					.catch(value => {
						console.log(value)
					})
				}
			})

		}
	},
	computed: {
		...mapGetters(['getUserinfo'])
	},
	watch: {
		showIt(v) {
			this.dialogVisible = v
		}
	},
	mounted() {
		this.userId = this.getUserinfo.id
	},
}
</script>
<style lang="scss" scoped>

</style>
