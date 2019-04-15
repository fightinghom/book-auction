<template>
	<div>
		<ba-table
		:header="tableHeader"
		:obj="'book'"
		:params="paginationBody"
		:update="updatePagination"
		@updateSuc="updatePagination = $event"
		@setPage="getPage($event)">
			<tr v-for="item of tableData" :key="item.id" @click="toBook(item.id)">
				<td>{{item.name}}</td>
				<td>{{item.id}}</td>
				<td>{{item.ownerId}}</td>
				<td>{{item.startPrice}}</td>
				<td>
					<el-button size="small" type="primary" @click.stop="pass(item.id)">审核通过</el-button>
					<el-button size="small" type="warning" @click.stop="fail(item.id)">不允通过</el-button>
				</td>
			</tr>
			<div v-if="tableData.length === 0" slot="nodata">暂无图书</div>
		</ba-table>
	</div>
</template>
<script>
import Table from '@/components/Table.vue'
import bookStatusCode from '@/utils/bookStatusCode'
import http from '@/utils/api/index'
import {mapGetters} from 'vuex'
export default {
	components: {
		BaTable: Table,
	},
	data() {
		return {
			tableHeader: ['拍品名称', '拍品编号', '卖家', '起拍价', '操作'],
			tableData: [],
			updatePagination: false,
			paginationBody: {
				nowPage: 1,
				bookNumber: 8,
				bookStatus: bookStatusCode.getStatusCode('check'),
				bookCategory: 0
			},
			queryBook() {
				let self = this
				http.auction.getBoookList(self.paginationBody)
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
		pass(v) {
			let self = this
			http.manage.approve({
				bookId: v
			})
			.then(rs => {
				self.$message({
					type: 'success',
					message: rs
				})
				self.queryBook()
				self.updatePagination = true
			})
			.catch(value => {
				console.log(value)
			})
		},
		fail(v) {
			let self = this
			http.manage.fail({
				bookId: v
			})
			.then(rs => {
				self.$message({
					type: 'warning',
					message: rs
				})
				self.queryBook()
				self.updatePagination = true
			})
			.catch(value => {
				console.log(value)
			})
		},
		toBook(id) {
			let pageInfo = {}
			pageInfo.paginationBody = this.paginationBody
			pageInfo.componentName = this.$route.name
			this.$router.push({path: '/book_detail/' + id, query: {prevPage: pageInfo}})
		},
		getPage(val) {
			this.paginationBody.nowPage = val
			this.queryBook()
		},
	},
	computed: {
		...mapGetters(['getUserinfo', 'getMemoryPage'])
	},
	mounted() {
		let memory = this.getMemoryPage
		if(memory.componentName === this.$route.name) {
			this.paginationBody = memory.paginationBody
		}
		this.queryBook()
	}
}
</script>
<style lang="scss" scoped>
	td {
/* 		width: 25%; */
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
