<template>
	<div class="book fl ba-bg-color" @click="toBook( bookInfo.id)">
		<!-- 图书照片 -->
		<div class="book-img">
			<img :src="showImg" alt="">
		</div>
		<!-- 图书名称 -->
		<p class="book-name">{{bookInfo.name}}</p>
		<!-- 图书当前最高价 -->
		<div class="book-price">{{bookInfo.startPrice}}</div>
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
			showImg: '',
			auctionEnd: false
		}
	},
	methods: {
		toBook(id) {
			this.$router.push('/book_detail/' + id)
		},
		timeover(v) {
			if(v) {
				this.auctionEnd = true
			}
		}
	},
	created() {
		this.bookInfo = JSON.parse(JSON.stringify(this.book))
		this.bookInfo.img = JSON.parse(this.bookInfo.img)
		this.showImg = this.bookInfo.img[0]
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
			img {
				width: 100%;
				height: 100%;
				border: 1px #b9beda solid;
			}
		}
		.book-name {
			padding: 0 20px;
			margin-bottom: 10px;
		}
		.book-price {
			padding: 0 20px;
			margin-bottom: 10px;
		}
		.timer {
			height: 25px;
		}

	}
</style>
