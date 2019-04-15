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
			<td><el-button size="small" type="primary" @click.stop="toBook(item.id)">查看图书</el-button></td>
		</tr>
		<div v-if="tableData.length === 0" slot="nodata">暂无拍品</div>
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
			let pageInfo = {}
			pageInfo.paginationBody = this.paginationBody
			pageInfo.componentName = this.$route.name
			this.$router.push({path: '/book_detail/' + id, query: {prevPage: pageInfo}})
		},
		getPage(v){
			this.paginationBody.nowPage = v
			this.queryBook()
		}
	},
	computed: {
		...mapGetters(['getUserinfo', 'getMemoryPage'])
	},
	mounted() {
		this.paginationBody.userId = this.getUserinfo.id
		this.queryBook()
	},
	created() {
		let memory = this.getMemoryPage
		if(memory.componentName === this.$route.name) {
			this.paginationBody = memory.paginationBody
		}
	}
}
</script>
<style lang="scss" scoped>
	td {
		width: 25%;
		word-wrap:break-word;
		word-break: break-all;
	}
</style>
