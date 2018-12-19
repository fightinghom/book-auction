<template>
	<div class="book fl ba-bg-color" @click="toBook('10000' + book)">
		<!-- 图书照片 -->
		<div class="book-img"></div>
		<!-- 图书名称 -->
		<p class="book-name">书的名字</p>
		<!-- 图书当前最高价 -->
		<div class="book-price">书的价格</div>
		<!-- 剩余拍卖时间 -->
		<div class="book-time">3天1时20分20秒</div>
	</div>
</template>
<script>
export default {
	props: ['book'],
	methods: {
		toBook(id) {
			this.$router.push('/book_detail/' + id)
		}
	}
}
</script>
<style lang="scss" scoped>
	.book {
		//width: calc(20% - 1px);
		width: 20%;
		height: 100%;
		//border-right: 1px #99a9bf solid;
		transition: all 0.3s;
		&:hover {
			box-shadow: 0 0 20px 2px #5c6783a3;
			cursor: pointer;
			position: relative;
		}
		.book-img {
			width: 150px;
			height: 150px;
			background: #666;
			margin: 20px auto;
		}
		.book-name {
			padding: 0 20px;
			margin-bottom: 10px;
		}
		.book-price {
			padding: 0 20px;
			margin-bottom: 10px;
		}
	}
</style>
