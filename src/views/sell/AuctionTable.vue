<template>
	<ba-table
	:header="tableHeader"
	:obj="'book'"
	:params="paginationBody"
	:update="updatePagination"
	@updateSuc="updatePagination = $event"
	@setPage="getPage($event)"

	>
		<tr v-for="item of tableData" :key="item.id" @click="toBook(item.id)">
			<td>{{item.id}}</td>
			<td>{{item.name}}</td>
			<td>{{item.category.name}}</td>
			<td><ba-timer type="book" :end="item.endTime"></ba-timer></td>
			<td><el-button size="small" type="primary" @click.stop="cancelBook(item.id)">取消上架</el-button></td>
		</tr>
	</ba-table>
</template>
<script>
import Table from '@/components/Table.vue'
import Timer from '@/components/timer/timer.vue'

import http from '@/utils/api/index.js'
import bookStatusCode from '@/utils/bookStatusCode'
import {mapActions, mapGetters} from 'vuex'
export default {
	components: {
		BaTable: Table,
		BaTimer: Timer
	},
	data() {
		return {
			tableHeader: ['拍品编号', '拍品名称','类别', '剩余时长', '操作'],
			tableData: [],
			paginationBody: {
				nowPage: 1,
				bookNumber: 8,
				bookStatus: bookStatusCode.getStatusCode('auctioning'),
				bookCategory: 0,
				userId: ''
			},
			updatePagination: false,
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
		cancelBook(v) {
			console.log(v)
		},
		toBook(id) {
			this.$router.push('/book_detail/' + id)
		},
		getPage(v){
			console.log(v)
		}
	},
	computed: {
		...mapGetters(['getUserinfo'])
	},
	mounted() {
		this.paginationBody.userId = this.getUserinfo.id
		this.queryBook()
	}
}
</script>
<style lang="scss" scoped>
	td {
		width: 25%;
	}
</style>
