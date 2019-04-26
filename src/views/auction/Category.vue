<template>
	<div class="auction-ca">
		<!-- 该页商品 -->
		<div class="ca-book">
			<ba-book v-for="item of bookList" :key="item.id" :book="item" @click.native="toBook(item.id)"></ba-book>
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
				@current-change="currentPage"
				:current-page="nowPage">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import Book from '@/components/auction/Book'
import http from '@/utils/api/index'
import bookStatusCode from '@/utils/bookStatusCode'
import {mapGetters} from 'vuex'
export default {
	data() {
		return {
			bookCategory: '',
			search: '',
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
					bookCategory: self.bookCategory,
					search: self.search
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
					bookCategory: self.bookCategory,
					search: self.search
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
		toBook(id) {
			let pageInfo = {}
			pageInfo.componentName = this.$route.name
			pageInfo.nowPage = this.nowPage
			pageInfo.category = this.bookCategory
			this.$router.push({path: '/book_detail/' + id,query: {prevPage: pageInfo}})
		},
	},
	computed: {
		...mapGetters(['getMemoryPage'])
	},
	/**
	 *
	 * 解决跳转不刷新问题
	 */
	watch: {
		'$route' (to, from) {
			if(to.path !== '/book_category/search') {
				this.bookCategory = to.params.cid
			} else {
				this.bookCategory = 0
				this.search = to.query.search
			}
			this.queryBook()
			this.getTotalPage()

		}
	},
	mounted() {
		if(this.$route.path !== '/book_category/search') {
			this.bookCategory = this.$route.params.cid
		} else {
			this.bookCategory = 0
			this.search = this.$route.query.search
		}

		let memory = this.getMemoryPage
		if(memory.componentName === this.$route.name && typeof memory.componentName !== 'undefined') {
			if(memory.category === this.bookCategory) {
				this.nowPage = memory.nowPage
			}
		}
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
