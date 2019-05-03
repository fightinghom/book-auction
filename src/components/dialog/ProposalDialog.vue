<template>
		<el-dialog
		:title="'问题反馈'"
		:visible.sync="dialogVisible"
		width="600px"
		:before-close="handleClose">
			<el-form
			ref="proposalForm"
			:model="proposal"
			:rules="proposalRule"
			label-width="100px">
				<el-form-item label="问题类型: " prop="type">
					<el-select v-model="proposal.type" placeholder="请选择">
						<el-option :label="'BUG'" :value="1"></el-option>
						<el-option :label="'改进意见'" :value="2"></el-option>
						<el-option :label="'需求书籍'" :value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="问题描述: " prop="content">
					<el-input  v-model="proposal.content" placeholder="请输入问题描述" maxlength="500" type="textarea" rows="4"></el-input>
				</el-form-item>
			</el-form>
			<p style="text-align: left; color: red">问题反馈联系QQ: 1401078599 或 发送邮件到 1401078599@qq.com!</p>
			<div slot="footer">
				<el-button @click="upload('proposalForm')" type="primary">提交问题</el-button>
			</div>
	</el-dialog>
</template>
<script>
import {validate} from '@/utils/validate.js'
import http from '@/utils/api/index'
import {mapGetters} from 'vuex'
export default {
	props: ['showIt'],
	data() {
		return {
			dialogVisible: false,
			proposal: {
				type: '',
				content: '',
				userId: ''
			},
			proposalRule: {
				type: validate.proposal.type,
				content: validate.proposal.content,
			}
		}
	},
	methods: {
		handleClose() {
			this.$emit('handle-close', false)
		},
		upload(form) {
			let self = this
			self.$refs[form].validate((valid) => {
				if(valid) {
					http.system.uploadProposal(self.proposal)
					.then(rs => {
						self.$message({
							type: rs.type,
							message: rs.message
						})
						self.$refs[form].resetFields()
						this.$emit('handle-close', false)
					})
					.catch (value => {
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
			if(v && this.$refs.proposalForm) {
				this.$refs.proposalForm.resetFields()
			}
		},
	},
	mounted() {
		this.proposal.userId = this.getUserinfo.id
	}

}
</script>
<style lang="scss" scoped>
.proposal {
	.el-input__inner, .el-textarea__inner {
		background: #ffffff !important;
	}
}

</style>
