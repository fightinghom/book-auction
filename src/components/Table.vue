<template>
	<div>
		<table>
			<tr>
				<td v-for="item of header" :key="item">{{item}}</td>
			</tr>
			<slot></slot>
		</table>
		<div class="pagination">
			<el-pagination
				background
				layout="prev, pager, next"
				:page-count="totalPage"
				@current-change="currentPage">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import http from '@/utils/api/index'
export default {
	props: ['header','params', 'obj', 'update'],
	data() {
		return {
			totalPage: 0,
			/* getTotalPage() {
				let self = this
				http.auction.getBookTotalPage(self.params)
				.then(res => {
					self.totalPage = res
				})
				.catch(value => {
					console.log(value)
				})
			},
			getTotalPageOfUser() {
				let self = this
				http.system.getUserTotalPage(self.params)
				.then(res => {
					self.totalPage = res
				})
				.catch(value => {
					console.log(value)
				})
			} */
			getTotalPage(moduleName, api) {
				let self = this
				http[moduleName][api](self.params)
				.then(res => {
					self.totalPage = res
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	methods: {
		currentPage(page) {
			this.$emit('setPage', page)
		},
		updatePage() {
			switch(this.obj) {
				case 'book':
					this.getTotalPage('auction', 'getBookTotalPage')
					break;
				case 'user':
					this.getTotalPage('system', 'getUserTotalPage')
					break;
				case 'purchaseBidding':
					this.getTotalPage('purchase', 'getPages')
					break;
				case 'purchaseOrder':
					this.getTotalPage('purchase', 'getOrderPages')
					break;
				case 'sellOrder' :
					this.getTotalPage('sell', 'getOrderPages')
					break;
				case 'feedbackMine' :
					this.getTotalPage('feedback', 'getPages')
					break;
				default:
					break;
			}
		}
	},
	watch: {
		update(v) {
			if (v) {
				this.updatePage()
				this.$emit('updateSuc', false)
			}
		}
	},
	mounted() {
		this.updatePage()
	}
}
</script>

<style lang="scss" scoped>
	$row-height: 40px;
	table {
		font-size: 16px;
		width: 100%;
		border-spacing: 0px;
		tr {
			width: 100%;
			transition: background-color 0.3s ease;
			&:nth-child(2n-1) {
				background: #eaedfa;
			}
			&:first-child {
				background: #fcfcfc;
				td {
					color: #b9beda;
					font-size: 20px;
					border-bottom: 1px solid #b9beda;
				}
			}
			&:hover {
				background: #e4e4e4;
			}
			td {
				//height: $row-height;
				box-sizing: border-box;
				padding: 5px 20px;
			}
		}
	}
	.pagination {
		text-align: center;
		width: 100%;
		margin-top: 20px;
	}
</style>
