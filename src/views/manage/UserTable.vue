<template>
	<div class="user-table">
		<ba-table :header="tableHeader">
			<tr v-for="item of tableData" :key="item.id">
				<td>{{item.u_id}}</td>
				<td><input type="text" :disabled="editId !== item.u_id" class="tx-c" :class="{'on-edit': editId === item.u_id}" v-model="item.u_name"/></td>
				<td><input type="text" :disabled="editId !== item.u_id" class="tx-c" :class="{'on-edit': editId === item.u_id}" v-model="item.u_nikename"/></td>
				<td><input type="text" :disabled="editId !== item.u_id" class="tx-c" :class="{'on-edit': editId === item.u_id}" v-model="item.u_phone"/></td>
				<td><input type="text" :disabled="editId !== item.u_id" class="tx-c" :class="{'on-edit': editId === item.u_id}" v-model="item.u_power"/></td>
				<td>
					<el-button
					type="primary"
					size="small"
					:disabled="editId !== item.u_id && editId !== ''"
					@click="editId === item.u_id ? save(item) : edit(item.u_id)"
					v-text="editId === item.u_id ? '保存' : '编辑'">
					</el-button>
					<el-button
					size="small"
					@click="cancel()"
					v-if="editId === item.u_id">
						取消
					</el-button>
					<el-button
					size="small"
					type="danger"
					@click="remove(item.u_id)"
					v-if="editId !== item.u_id">
						注销
					</el-button>
				</td>
			</tr>
		</ba-table>
	</div>
</template>
<script>
import Table from '@/components/Table.vue'
import http from '@/utils/api/index'
export default {
	components: {
		BaTable: Table
	},
	data() {
		return {
			tableHeader: ['学号', '姓名', '昵称', '联系方式', '权限等级', '操作'],
			tableData: [],
			editId: '',
			userOnEdit: '',
			queryUserList() {
				let self = this
				http.system.getUserList({})
				.then(res => {
					self.tableData = res
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	methods: {
		edit(id) {
			this.editId = id
		},
		save(user) {
			let self = this
			http.system.saveUser({
				id: user.u_id,
				name: user.u_name,
				nikename: user.u_nikename,
				phone: user.u_phone,
				power: user.u_power
			})
			.then(res => {
				if(res) {
					self.$message({
						message: '修改用户' + user.u_id + '成功',
						type: 'success'
					})
					self.editId = ''
					self.userOnEdit =''
				}
			})
			.catch(value => {
				console.log(value)
			})
		},
		cancel() {
			this.editId = ''
			this.queryUserList()
		},
		remove(id) {
			let self = this
			http.system.deleteUserById({
				id: id
			})
			.then(res => {
				if(res) {
					self.$message({
						message: '注销用户' + id + '成功',
						type: 'success'
					})
					self.queryUserList()
				}
			})
			.catch(value => {
				console.log(value)
			})
		}
	},
	mounted() {
		this.queryUserList()
	}
}
</script>
<style lang="scss" scoped>
	.tx-c {
		text-align: center;
		border: none;
		background: transparent;
		//border-bottom: 1px #b9beda solid;
		height: 30px;
		width: 100px;
	}
	.on-edit {
		border-bottom: 1px #b9beda solid;
	}
</style>
