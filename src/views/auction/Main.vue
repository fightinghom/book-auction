<template>
	<div class="auction-main">
		<!-- 轮播图 -->
		<ba-slider
		:books="home.slider"></ba-slider>
		<div class="recommend-wapper">
			<div class="hot-new">
				<div class="hot">
					<div class="title">热门推荐<span>HOT</span></div>
					<div class="hot-book" v-for="item of hotList" :key="item.id" @click="toBook(item.id)">
						<img :src="item.img" :alt="item.id">
						<div class="book-name vertical-center">
							<p>{{item.name}}</p>
						</div>
					</div>
				</div>
				<div class="new">
					<div class="title">最新上架<span>NEW</span></div>
					<div class="new-book"  v-for="item of newList" :key="item.id" @click="toBook(item.id)">
						<img :src="item.img" :alt="item.id">
						<div class="book-name vertical-center">
							<p>{{item.name}}</p>
						</div>
					</div>
				</div>
				<div class="need">
					<div class="title">买家需求<span>NEED</span></div>
				</div>
			</div>
			<div class="ca-recommend">
				<!-- 按分类推荐 -->
				<div class="recommend" v-for="(item, key, index) of home" :key="index" v-if="'slider' !== key">
					<!-- 分类名称 -->
					<div class="rec-title">
						<div class="rec-name">{{key | getCategoryName(getBookCategory)}}</div>
					</div>
					<!-- 推荐图书 -->
					<div class="rec-book">
						<ba-book v-for="citem of home[key]" :key="citem.id" :book="citem" @click.native="toBook(citem.id)"></ba-book>
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
import http from '@/utils/api/index'
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			home:{},
			name: 'home',
			hotList: [],
			newList: [],
			ready: false,
			querySetting() {
				let self = this
				http.system.getSetting({
					name: self.name
				})
				.then(rs => {
					rs =  JSON.parse(rs.jsonStr)
					for(let key in rs) {
						if(typeof self.home[key] !== 'undefined'){

							self.home[key] = rs[key]
						}
					}
					self.ready = true
				})
				.catch(value => {
					console.log(value)
				})
			},
			qeuryHotBooks() {
				let self = this
				http.auction.getTopOfBooks({
					type: 'biddingCount'
				})
				.then(rs => {
					rs = rs.map(book => {
						book.img = JSON.parse(book.img)[0]
						return book
					})
					self.hotList = rs
				})
				.catch(value => {

				})
			},
			queryNewBook() {
				let self = this
				http.auction.getTopOfBooks({
					type: 'startTime'
				})
				.then(rs => {
					rs = rs.map(book => {
						book.img = JSON.parse(book.img)[0]
						return book
					})
					self.newList = rs
				})
				.catch(value => {

				})
			}
		}
	},
	methods: {
		toCategory(cid) {
			this.$router.push('/book_category/' + cid)
		},
		toBook(id) {
			console.log(id)
			this.$router.push('/book_detail/' + id)
		},
	},
	components: {
		BaSlider: Slider,
		BaBook: Book
	},
	computed: {
		...mapGetters(['getBookCategory'])
	},
	filters: {
		getCategoryName(v, list) {
			let name = ''
			list.map(ca => {
				if (v === ca.mark) {
					name = ca.name
				}
			})
			if(name === '') {
				name = '轮播图'
			}
			return name
		}
	},
	created() {
		let home = {
			slider: []
		}
		this.getBookCategory.map(ca => {
			home[ca.mark] = []
		})
		this.home = home
		this.querySetting()
		this.queryNewBook()
		this.qeuryHotBooks()
	}
}
</script>
<style lang="scss" scoped>
	.auction-main {
		width: 966px;
		margin: 0 auto;
		padding: 20px 0;
		background: #fcfcfc;
		.recommend-wapper {
			display: flex;
			.hot-new {
				flex: 1;
				.hot, .new, .need {
					padding: 0 10px;
					.title {
						font-size: 25px;
						text-align: left;
						padding: 5px 0 5px 0;
						span {
							font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
							padding: 0 5px;
							font-style: italic;
						}
					}
					.hot-book, .new-book {
						display: flex;
						padding: 10px 0;
						box-sizing: border-box;
						transition: all 0.3s;
						&:hover {
							box-shadow: 0 0 20px 2px #5c6783a3;
							cursor: pointer;
							position: relative;
						}
						img {
							width: 80px;
							height: 80px;
						}
						.book-name {
							flex: 1;
							padding: 0 5px;
						}
					}
				}
				.hot .title span {
					color: red;
				}
				.new .title span {
					color: lightgreen;
				}
				.need .title span {
					color: blue;
				}
			}
			.ca-recommend {
				width: 725px;
				padding-right:10px;
				.recommend {
					.rec-title {
						font-size: 25px;
						text-align: left;
						padding-left: 10px;
						border-left: 2px #002aff solid;
						.rec-name {
							padding-right:10px;
							border-bottom: 2px #002aff solid;
							padding: 5px 0;
						}
					}
					.rec-book {
						height: 220px;
						padding: 5px 0;
						border-left: 2px #002aff solid;
						padding-left:10px;
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
		}
	}
</style>
