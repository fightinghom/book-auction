<template>
	<div class="auction-ca">
		<!-- 该页商品 -->
		<div class="ca-book">
			<ba-book v-for="item of bookList" :key="item.id" :book="item"></ba-book>
			<div v-if="bookList.length == 0">
				暂无商品
			</div>
		</div>
		<!-- 分页组件 -->
		<div class="ca-pagination fl">
			<el-pagination
				background
				layout="prev, pager, next"
				:page-count="pages"
				@current-change="currentPage">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import Book from '@/components/auction/Book'
import http from '@/utils/api/index'
import bookStatusCode from '@/utils/bookStatusCode'
export default {
	data() {
		return {
			bookCategory: '',
			bookNumber: 20,
			nowPage: 1,
			bookStatus: 'auctioning',
			bookList: [],
			pages: 1,
			queryBook() {
				let self = this
				http.auction.getBoookList({
					nowPage: self.nowPage,
					bookNumber: self.bookNumber,
					bookStatus: bookStatusCode.getStatusCode(self.bookStatus),
					bookCategory: self.bookCategory
				})
				.then(res => {
					res.map(item => {
						item.img = JSON.parse(item.img)[0]
					})
					self.bookList = res
				})
				.catch(value => {
					console.log(value)
				})
			},
			getTotalPage() {
				let self = this
				http.auction.getBookTotalPage({
					bookStatus: bookStatusCode.getStatusCode(self.bookStatus),
					bookNumber: self.bookNumber,
					bookCategory: self.bookCategory
				})
				.then(res => {
					self.pages = res
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	components: {
		BaBook: Book
	},
	methods: {
		currentPage(page) {
			this.nowPage = page
			this.queryBook()
		},
	},
	/**
	 *
	 * 解决跳转不刷新问题
	 */
	watch: {
		'$route' (to, from) {
			this.bookCategory = to.params.cid
			this.queryBook()
		    this.getTotalPage()
		}
	},
	mounted() {
		this.bookCategory = this.$route.params.cid
		this.queryBook()
		this.getTotalPage()
	}
}
</script>
<style lang="scss" scoped>
	.auction-ca {
		width: 966px;
		margin: 0 auto;
		padding: 20px 0;
		.ca-pagination {
			width: 100%;
			margin-top: 20px;
		}
	}
</style>
