<template>
	<ba-table
	:header="tableHeader"
	:obj="'purchase'"
	:params="paginationBody"
	>
		<tr v-for="item of tableData" :key="item.id" @click="toBook(item.book.id)">
			<td>{{item.book.id}}</td>
			<td>{{item.book.name}}</td>
			<td>{{item.book.author}}</td>
			<td>{{item.book.ownerId}}</td>
			<td><ba-timer type="book" :end="item.book.endTime"></ba-timer></td>
			<td>
				<el-button size="small" type="primary" @click.stop="toBook(item.book.id)">查看详情</el-button>
			</td>
		</tr>
	</ba-table>
</template>
<script>
import Table from '@/components/Table.vue'
import Timer from '@/components/timer/timer.vue'
import bookStatusCode from '@/utils/bookStatusCode'
import http from '@/utils/api/index'
import {mapActions, mapGetters} from 'vuex'
export default {
	components: {
		BaTable: Table,
		BaTimer: Timer
	},
	data() {
		return {
			tableHeader: ['拍品编号', '拍品名称', '作者', '出售者', '剩余时长','操作'],
			tableData: [],
			updatePagination: false,
			paginationBody: {
				nowPage: 1,
				number: 8,
				bookStatus: bookStatusCode.getStatusCode('auctioning'),
				bidderId: ''
			},
			queryEnrollList() {
				let self = this
				http.purchase.getBidderOfBookList(this.paginationBody)
				.then(rs => {
					self.tableData = rs
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	computed: {
		...mapGetters(['getUserinfo'])
	},
	methods: {
		toBook(id) {
			this.$router.push('/book_detail/' + id)
		}
	},
	mounted(){
		this.paginationBody.bidderId = this.getUserinfo.id
		this.queryEnrollList()
	}
}
</script>
<style lang="scss" scoped>
	td {
		width: 16%;
		&:first-child {
			width: 20%;
		}
	}
</style>
