<template>
	<div class="auction-ca">
		<!-- 该页商品 -->
		<div class="ca-book">
			<ba-book v-for="item of 20" :key="item" :book="item"></ba-book>
		</div>
		<!-- 分页组件 -->
		<div class="ca-pagination fl">
			<el-pagination
				background
				layout="prev, pager, next"
				:page-count="100"
				@current-change="currentPage">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import Book from '@/components/auction/Book'
export default {
	data() {
		return {

		}
	},
	components: {
		BaBook: Book
	},
	methods: {
		currentPage(page) {

		},
		/**
		 *根据当前页码请求该页的可拍书籍
		 *
		 */
		nowPage(page) {
			console.log('page',page)
		},
	},
	created() {
		this.nowPage(1)
	}
}
</script>
<style lang="scss" scoped>
	.auction-ca {
		.ca-pagination {
			width: 100%;
			margin-top: 20px;
		}
	}
</style>
