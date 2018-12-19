<template>
	<div class="auction-main">
		<!-- 轮播图 -->
		<ba-slider></ba-slider>
		<!-- 按分类推荐 -->
		<div class="recommend" v-for="item of categoryList" :key="item.id">
			<!-- 分类名称 -->
			<div class="rec-title">
				<div class="line fl"></div>
				<div class="rec-name fl">{{item.name}}</div>
				<div class="line fl"></div>
			</div>
			<!-- 推荐图书 -->
			<div class="rec-book">
				<ba-book v-for="item of 4" :key="item" :book="item"></ba-book>
				<!-- 更多同类图书 -->
				<div class="book fl vertical-center ba-bg-color" @click="toCategory(item.id)">
					<div class="more">
						<p class="fl">更多</p>
						<div class="more-icon vertical-center fr"><i class="fas fa-chevron-circle-right fa-4x"></i></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { list } from '@/utils/category.js'
import Slider from '@/components/auction/Slider'
import Book from '@/components/auction/Book'
export default {
	data() {
		return {
			categoryList: list,
		}
	},
	methods: {
		toCategory(cid) {
			this.$router.push('/book_category/' + cid)
		}
	},
	components: {
		BaSlider: Slider,
		BaBook: Book
	}
}
</script>
<style lang="scss" scoped>
	.auction-main {
		width: 100%;
		/* .el-carousel__item h3 {
			color: #475669;
			opacity: 0.75;
			line-height: 300px;
			margin: 0;
		}

		.el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		}

		.el-carousel__item:nth-child(2n+1) {
			background-color: #d3dce6;
		} */
		.recommend {
			width: 100%;
			.rec-title {
				display: block;
				font-size: 30px;
				margin: 0 auto;
				width: 250px;
				height: 50px;
				padding: 10px 0;
				.rec-name {
					width: 150px;
					height: 50px;
					line-height: 50px;
				}
				.line {
					width: 50px;
					height: 24px;
					border-bottom: 2px #383b4a solid;
				}
			}
			.rec-book {
				height: 275px;
				//padding: 0 10px;
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
					.more {
						width: 150px;
						p {
							height: 80px;
							line-height: 80px;
							font-size: 30px;
							padding: 0 10px;
						}
						.more-icon {
							height: 80px;
							color: #002aff;
						}
					}
				}
			}
		}
	}
</style>
