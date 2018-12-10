<template>
	<div class="auction-ca">
		<!-- 该页商品 -->
		<div class="ca-book">
			<div class="book fl ba-bg-color" v-for="item of 20" :key="item">
				<!-- 图书照片 -->
				<div class="book-img"></div>
				<!-- 图书名称 -->
				<p class="book-name">书的名字</p>
				<!-- 图书当前最高价 -->
				<div class="book-price">书的价格</div>
				<!-- 剩余拍卖时间 -->
				<div class="book-time">3天1时20分20秒</div>
			</div>
		</div>
		<!-- 分页组件 -->
		<div class="ca-pagination fl">
			<el-pagination
				background
				layout="prev, pager, next"
				:page-count="100">
			</el-pagination>
		</div>
	</div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
	.auction-ca {
		.ca-book {
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
		}
		.ca-pagination {
			width: 100%;
			margin-top: 20px;
		}
	}
</style>
