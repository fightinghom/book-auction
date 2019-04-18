<template>
	<div class="auction-main">
		<!-- 轮播图 -->
		<ba-slider
		:books="home.slider"></ba-slider>
		<!-- 按分类推荐 -->
		<div class="recommend">
			<!-- 分类名称 -->
			<div class="rec-title">
				<div class="line fl"></div>
				<div class="rec-name fl">文学</div>
				<div class="line fl"></div>
			</div>
			<!-- 推荐图书 -->
			<div class="rec-book">
				<ba-book v-for="item of home.literature" :key="item.id" :book="item" @click.native="toBook(item.id)"></ba-book>
				<!-- 更多同类图书 -->
				<!-- <div class="book fl vertical-center ba-bg-color" @click="toCategory(item.id)">
					<div class="more">
						<p class="fl">更多</p>
						<div class="more-icon vertical-center fr"><i class="fas fa-chevron-circle-right fa-4x"></i></div>
					</div>
				</div> -->
			</div>
		</div>
		<div class="recommend">
			<!-- 分类名称 -->
			<div class="rec-title">
				<div class="line fl"></div>
				<div class="rec-name fl">人文社科</div>
				<div class="line fl"></div>
			</div>
			<!-- 推荐图书 -->
			<div class="rec-book">
				<ba-book v-for="item of home.socialScience" :key="item.id" :book="item" @click.native="toBook(item.id)"></ba-book>
			</div>
		</div>
		<div class="recommend">
			<!-- 分类名称 -->
			<div class="rec-title">
				<div class="line fl"></div>
				<div class="rec-name fl">学习</div>
				<div class="line fl"></div>
			</div>
			<!-- 推荐图书 -->
			<div class="rec-book">
				<ba-book v-for="item of home.study" :key="item.id" :book="item" @click.native="toBook(item.id)"></ba-book>
			</div>
		</div>
		<div class="recommend">
			<!-- 分类名称 -->
			<div class="rec-title">
				<div class="line fl"></div>
				<div class="rec-name fl">杂志期刊</div>
				<div class="line fl"></div>
			</div>
			<!-- 推荐图书 -->
			<div class="rec-book">
				<ba-book v-for="item of home.magazine" :key="item.id" :book="item" @click.native="toBook(item.id)"></ba-book>
			</div>
		</div>
		<div class="recommend">
			<!-- 分类名称 -->
			<div class="rec-title">
				<div class="line fl"></div>
				<div class="rec-name fl">其他书籍</div>
				<div class="line fl"></div>
			</div>
			<!-- 推荐图书 -->
			<div class="rec-book">
				<ba-book v-for="item of home.other" :key="item.id" :book="item" @click.native="toBook(item.id)"></ba-book>
			</div>
		</div>
	</div>
</template>
<script>
import { list } from '@/utils/category.js'
import Slider from '@/components/auction/Slider'
import Book from '@/components/auction/Book'
import http from '@/utils/api/index'
export default {
	data() {
		return {
			home:{},
			name: 'home',
			querySetting() {
				let self = this
				http.system.getSetting({
					name: self.name
				})
				.then(rs => {
					self.home = JSON.parse(rs.jsonStr)
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	methods: {
		toCategory(cid) {
			this.$router.push('/book_category/' + cid)
		},
		toBook(id) {
			this.$router.push('/book_detail/' + id)
		},
	},
	components: {
		BaSlider: Slider,
		BaBook: Book
	},
	created() {
		this.querySetting()
	}
}
</script>
<style lang="scss" scoped>
	.auction-main {
		width: 966px;
		margin: 0 auto;
		padding: 20px 0;
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
