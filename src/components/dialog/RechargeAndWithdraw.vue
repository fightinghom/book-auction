<template>
	<el-dialog
	:title="'充值和提现'"
	:visible.sync="dialogVisible"
	width="600px"
	:before-close="handleClose">
		<el-tabs v-model="type" @tab-click="handleClick">
			<el-tab-pane label="充值" name="1">
				<el-input type="number" v-model="amount"></el-input>
			</el-tab-pane>
			<el-tab-pane type="number" label="提现" name="2">
				<el-input v-model="amount"></el-input>
			</el-tab-pane>
		</el-tabs>
		<div slot="footer">
				<span style="float:left">余额: {{getUserinfo.balance}} 元</span>
				<el-button size="mini" @click="handleClose()">取消</el-button>
				<el-button size="mini" @click="update()" type="primary">{{'1' === type ? '充值' : '提现'}}</el-button>
		</div>
	</el-dialog>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import http from '@/utils/api/index'
export default {
	props: ['showIt'],
	data() {
		return {
			dialogVisible: false,
			type: '1',
			userId: '',
			amount: '',
			queryUserById() {
				let self = this
				http.system.getUserById({
					id: self.userId
				})
				.then((res) => {
					console.log(res)
					self.setUserinfo(res)
				})
				.catch((value) => {
					console.log(value)
				})
			},
		}
	},
	methods: {
		...mapActions(['setUserinfo']),
		handleClose() {
			this.$emit('handle-close', false)
		},
		update() {
			let self = this
			let canUp = false
			let type = self.type
			let op = '1' === type ? '充值' : '提现'
			let amount = self.amount
			if (amount > 0) {
				canUp = true
			}
			let param = {
				type: type,
				amount: amount,
				userId: self.userId
			}
			self.$confirm('你确定要' + op + amount + '元', op , {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'primary'
			})
			.then(() => {
				if (canUp) {
					http.system.updateMoney(param)
					.then(rs => {
						console.log(rs)
						if(rs) {
							self.$message.success(op + '成功！')
							self.queryUserById()
						} else {
							self.$message.error(op + '失败！')
						}
					})
					.catch(value => {

					})
				} else {
					self.$message.error('金额应大于0')
				}
			})
		},
		handleClick() {
			this.amount = ''
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
