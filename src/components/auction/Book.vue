<template>
	<div class="book fl ba-bg-color">
		<!-- 图书照片 -->
		<div class="book-img">
			<img :src="bookInfo.img" alt="">
		</div>
		<!-- 图书名称 -->
		<p class="book-name">{{bookInfo.name}}</p>
		<!-- 图书当前最高价 -->
		<div class="book-price">{{bookInfo.maxPrice}}</div>
		<!-- 剩余拍卖时间 -->
		<ba-timer
		:type="'book'"
		:end="bookInfo.endTime"
		@timeover="timeover"
		v-if="!auctionEnd">
		</ba-timer>
		<div class="end-text" v-if="auctionEnd">拍卖已结束!</div>
	</div>
</template>
<script>
import timer from '@/components/timer/timer.vue'
export default {
	props: ['book'],
	components: {
		BaTimer: timer
	},
	data() {
		return {
			bookInfo: {},
			auctionEnd: false
		}
	},
	methods: {
		timeover(v) {
			if(v) {
				this.auctionEnd = true
			}
		}
	},
	created() {
		this.bookInfo = JSON.parse(JSON.stringify(this.book))
	}
}
</script>
<style lang="scss" scoped>
	.book {
		transition: all 0.3s;
		padding: 20px 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		&:hover {
			box-shadow: 0 0 20px 2px #5c6783a3;
			cursor: pointer;
			position: relative;
		}
		.book-img {
			width: 100%;
			img {
				width: 75%;
				border: 1px #b9beda solid;
			}
		}
		.book-name {
			width: 75%;
			height: 40px;
			line-height: 20px;
			overflow:hidden;
			margin: 0 auto;
		}
		.book-price {
		}
		.timer {
			height: 25px;
			line-height: 25px;
		}

	}
</style>
