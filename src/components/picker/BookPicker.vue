<template>
	<div class="book-picker">
		<div @click="openPicker()">
			<i class="fas fa-plus"></i>
			添加
		</div>
		<el-dialog
		title="选择图书"
		:visible.sync="dialogVisible"
		width="600px">
			<ba-category-picker
			@getCategoryValue="getCategory($event)"></ba-category-picker>
			<ba-table
			:header="tableHeader"
			:obj="'book'"
			:params="paginationBody"
			@setPage="getPage($event)"
			:update="updatePagination"
			@updateSuc="updatePagination = $event"
			>
				<tr v-for="item of tableData" :key="item.id" @click="choiceBook(item)">
					<td>{{item.name}}</td>
					<td>{{item.category.name}}</td>
					<td>
						<el-button size="small" type="primary" @click.stop="choiceBook(item)">选择</el-button>
					</td>
				</tr>
			</ba-table>
		</el-dialog>
	</div>
</template>
<script>
import Table from '@/components/Table.vue'
import CategoryPicker from './CategoryPicker'
import bookStatusCode from '@/utils/bookStatusCode'
import http from '@/utils/api/index'
export default {
	data() {
		return {
			dialogVisible: false,
			updatePagination: false,
			tableData: [],
			tableHeader: ['图书', '分类', '操作'],
			paginationBody: {
				nowPage: 1,
				bookNumber: 8,
				bookStatus: bookStatusCode.getStatusCode('auctioning'),
				bookCategory: 0
			},
			queryBook() {
				let self = this
				http.auction.getBoookList(self.paginationBody)
				.then(res => {
					res.map(item => {
						item.img = JSON.parse(item.img)[0]
					})
					self.tableData = res
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	components: {
		BaTable: Table,
		BaCategoryPicker: CategoryPicker
	},
	methods: {
		openPicker() {
			this.dialogVisible = true
		},
		getPage(v) {
			this.paginationBody.nowPage = v
			this.queryBook()
		},
		getCategory(v) {
			this.paginationBody.bookCategory = v
			this.updatePagination = true
			this.queryBook()
		},
		choiceBook(v) {
			let value = {
				id: v.id,
				name: v.name,
				img: v.img,
				endTime: v.endTime
			}
			this.$emit('getBook', value)
			this.dialogVisible = false
		}
	},
	mounted() {
		this.queryBook()
	}
}
</script>
<style lang="scss" scoped>
	@import '@/assets/css/theme.scss';
	.book-picker {
		display:inline-block;
		padding: 5px;
		box-sizing: border-box;
		border-radius: 20px;
		color: $basic-color;
		transition: all 0.3s;
		&:hover {
			cursor: pointer;
			background: $basic-color;
			color: #fff;
		}
		.category-picker {
			margin-bottom: 10px;
		}
	}
</style>
