<template>
	<div class="user-table">
		<ba-table
		:header="tableHeader"
		:obj="'user'"
		:params="paginationBody"
		@setPage="getPage($event)"
		:update="updatePagination"
		@updateSuc="updatePagination = $event">
			<tr v-for="item of tableData" :key="item.id">
				<td>{{item.id}}</td>
				<td><input type="text" :disabled="editId !== item.id" class="tx-c" :class="{'on-edit': editId === item.id}" v-model="item.name"/></td>
				<td><input type="text" :disabled="editId !== item.id" class="tx-c" :class="{'on-edit': editId === item.id}" v-model="item.nikename"/></td>
				<td><input type="text" :disabled="editId !== item.id" class="tx-c" :class="{'on-edit': editId === item.id}" v-model="item.phone"/></td>
				<td><input type="text" :disabled="editId !== item.id" class="tx-c" :class="{'on-edit': editId === item.id}" v-model="item.power"/></td>
				<td v-if="getUserinfo.power > 1">
					<el-button
					type="primary"
					size="small"
					:disabled="editId !== item.id && editId !== ''"
					@click="editId === item.id ? save(item) : edit(item.id)"
					v-text="editId === item.id ? '保存' : '编辑'">
					</el-button>
					<el-button
					size="small"
					@click="cancel()"
					v-if="editId === item.id">
						取消
					</el-button>
					<el-button
					size="small"
					type="danger"
					@click="remove(item.id)"
					v-if="editId !== item.id">
						注销
					</el-button>
				</td>
				<td v-else>
					权限不足
				</td>
			</tr>
		</ba-table>
	</div>
</template>
<script>
import Table from '@/components/Table.vue'
import http from '@/utils/api/index'
import {mapActions, mapGetters} from 'vuex'
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
			updatePagination: false,
			paginationBody: {
				userNumber: 8,
				nowPage: 1,
			},
			queryUserList() {
				let self = this
				http.system.getUserList(self.paginationBody)
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
				id: user.id,
				name: user.name,
				nikename: user.nikename,
				phone: user.phone,
				power: user.power
			})
			.then(res => {
				if(res) {
					self.$message({
						message: '修改用户' + user.id + '成功',
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
		},
		getPage(val) {
			this.paginationBody.nowPage = val
			this.queryUserList()
		},
	},
	computed: {
		...mapGetters(['getUserinfo'])
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
