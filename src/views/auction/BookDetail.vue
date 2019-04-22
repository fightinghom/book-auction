<template>
	<!-- book:{{$route.params.bid}} -->
	<div class="book-detail">
		<div class="back" @click="back"><i class="fas fa-chevron-left fa-3x"></i></div>
		<!-- 书籍信息 -->
		<div class="book-info">
			<!-- 书籍图片集 -->
			<ba-img-list v-if="undefined != book.img" :imgList="book.img"></ba-img-list>
	<!-- 	基本信息 -->
			<div class="basic-info">
				<div class="mar-btm-5 book-name">{{book.name}}</div>
				<div class="pad-top-10  mar-btm-5 book-desc" v-html="book.desc"></div>
				<div class="pad-top-10  mar-btm-5">作者: {{book.author}}</div>
				<div class="pad-top-10  mar-btm-5" v-if="book.category">分类: {{book.category.name}}</div>
				<div class="z mar-top-10">
					<div class="mar-btm-5 book-clock">
						<i class="far fa-clock fa-2x icon"></i>
						<span>正在拍卖</span>
						<ba-timer v-if="undefined != book.endTime" :type="'bookDetail'" :end="book.endTime" @timeover="timeover($event)">距离结束&nbsp;</ba-timer>
					</div>
					<div class="pad-top-10  mar-btm-5 book-test"><span>起始价格</span>￥<span>{{book.startPrice}}</span></div>
					<div class="pad-top-10  mar-btm-5 book-test"><span>加价幅度</span>￥<span>{{book.increaseRange}}</span></div>
					<div class="pad-top-10  mar-btm-5 book-test"><span>当前价格</span>￥<span>{{bid.showMaxPrice}}</span></div>
					<div class="pad-top-10  mar-btm-5 book-test" v-if="1 === btnStatus"><span>我的出价</span>￥<span>{{myPrice}}</span></div>
				</div>
				<div class="pad-top-10  mar-btm-5 bidding" v-if="1 === btnStatus">
					<div  @click="setPrice('minus')"><i class="fas fa-minus"></i></div>
					<input v-model="bid.price" type="number">
					<div @click="setPrice('plus')"><i class="fas fa-plus"></i></div>
					<div class="tips">您可以选择自主输入价格，也可以选择增减加价幅度值的倍数</div>
				</div>
				<el-button v-if="1 === btnStatus" type="primary" @click="uploadBid()">我要出价</el-button>
				<el-button v-if="0 === btnStatus && 1 === book.status" type="primary" @click="enroll()">我要报名</el-button>
				<div class="pad-top-10" v-if="2 === btnStatus">您是出售者，不能进行报名和出价</div>
				<div class="pad-top-10" v-if="3 === btnStatus">拍卖已结束</div>
			</div>
		</div>
		<!-- 卖家信息 -->
		<div class="seller-info" v-if="book.owner">
			<img :src="book.owner.pic" :alt="book.owner.id" @click="showUser = true">
			<div class="info">
				<div class="item">
					<el-rate
						disabled
						v-model="book.owner.avgStars"
						show-score
						text-color="#ff9900"
						score-template="{value}">
					</el-rate>
					<span>( {{book.owner.evaluationCount}}人评价 )</span>
				</div>
				<div class="item">卖家编号: {{book.owner.id}}</div>
				<div class="item">卖家昵称: {{book.owner.nikename}}</div>
			</div>
		</div>
		<ba-show-user  v-if="book.owner" :showIt="showUser" :userId="book.owner.id" :title="'卖家信息'" @handle-close="showUser = $event"></ba-show-user>
		<!-- 叫价记录 -->
		<div class="auction-record" v-if="$route.params.bid !== 'add'">
			<div class="art pad-tb-10">实时拍卖记录</div>
			<table>
				<tr>
					<td>出价者</td>
					<td>出价时间</td>
					<td>出价金额</td>
				</tr>
				<tr v-for="item of record" :key="item.id">
					<td>{{item.user}}</td>
					<td>{{item.datetime}}</td>
					<td>{{item.price}}</td>
				</tr>
			</table>
			<div class="pagination">
				<el-pagination
					background
					layout="prev, pager, next"
					:page-count="pageCount"
					@current-change="currentPage">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import timer from '@/components/timer/timer.vue'
import imgList from '@/components/img/detailShowImg.vue'
import http from '@/utils/api/index'
import ShowUser from '@/components/dialog/ShowUser.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			bookId: '',
			record: [],
			book: {},
			bidders: [],
			myPrice: 0,
			bid: {
				user: '',
				price: 0,
				bookId: '',
				ownerPrice: 0,
				showMaxPrice: 0,
				increaseRange: 0
			},
			page: {
				number: 8,
				page: 1,
				bookId: '',
				userId: ''
			},
			pageCount: 0,
			btnStatus: 0,
			showUser: false,
			queryBookById() {
				let self = this
				http.auction.getBookById({
					bookId: self.bookId
				})
				.then(rs => {
					self.book = rs
					self.bid.price = self.book.startPrice
					self.bid.ownerPrice = self.book.startPrice
					self.bid.increaseRange = self.book.increaseRange

					if (self.bid.user === rs.ownerId) {
						self.btnStatus = 2
					}
				})
				.catch(value => {
					console.log(value)
				})

			},
			queryBidderList() {
				let self = this
				http.auction.getBidders({
					bookId: self.bookId
				})
				.then(rs => {
					self.bidders = rs

					rs.map(id => {
						if (id === self.bid.user) {
							self.btnStatus = 1
						}
					})
				})
				.catch(value => {
					console.log(value)
				})
			},
			queryRecordTotalPage() {
				let self = this
				http.auction.getRecordTotalPages(self.page)
				.then(rs => {
					self.pageCount = rs
				})
				.catch(value => {
					console.log(value)
				})
			},
			queryRecordsOfPage() {
				let self = this
				http.auction.getRecordsOfPage(self.page)
				.then(rs => {
					self.record = rs.list
					self.bid.showMaxPrice = rs.maxPrice
					self.bid.price = rs.maxPrice
					self.myPrice = rs.myPrice
				})
				.catch(value => {
					console.log(value)
				})
			}

		}
	},
	components: {
		BaTimer: timer,
		BaImgList: imgList,
		BaShowUser: ShowUser
	},
	computed: {
		...mapGetters(['getUserinfo']),
	},
	watch: {
		record(v) {
			if(v.length != 0){
				v.map(item => {
					item.datetime = item.datetime.split('.')[0]
				})
			}
		}
	},
	methods: {
		...mapActions(['setMemoryPage']),
		currentPage(page) {
			this.page.page = page
			this.queryRecordsOfPage()
		},
		/**
		 * 通过加减号设置价格
		 */
		setPrice(op) {
			if ('plus' === op) {
				this.bid.price = parseInt(this.bid.price) + this.book.increaseRange
			}
			if ('minus' === op) {
				this.bid.price -= this.book.increaseRange
			}
			if (this.bid.price < this.bid.showMaxPrice) {
				this.bid.price = this.bid.showMaxPrice
			}
		},
		/**
		 * 报名
		 */
		enroll() {
			let self = this

			http.auction.toEnroll({
			userId: self.bid.user,
			bookId: self.bookId,
			deposit: self.book.deposit
			})
			.then(rs => {
				if (0 == rs) {
					self.$message({
						message: "报名失败，请重试，或者联系管理员!",
						type: 'error'
					})
				}
				if (1 == rs) {
					self.$message({
						message: "报名成功!",
						type: 'success'
					})
					self.btnStatus = 1
				}
				if (2 == rs) {
					self.$message({
						message: "余额不足，无法缴纳保证金，请先确保余额足够参加竞拍!",
						type: 'warning'
					})
				}
				if(3 == rs) {
					self.$message({
						message: "用户已经报名了，无需再次报名!",
						type: 'warning'
					})
					self.btnStatus = 1
				}
			})
			.catch(value => {
				console.log(value)
			})
		},
		/**
		 * 上传出价
		 */
		uploadBid() {
			let self = this
			let canBid = true
			let bid = self.bid
			let book = self.book
			if (bid.price < book.startPrice) {
				canBid = false
				self.$notify({
					title: '警告',
					message: '您的出价小于了起始价格',
					type: 'warning'
				})
				return ;
			}

			if (bid.price < bid.showMaxPrice) {
				canBid = false
				self.$notify({
					title: '警告',
					message: '您的出价小于了当前的最高价',
					type: 'warning'
				})
				return ;
			}

			if (bid.price - bid.showMaxPrice < book.increaseRange) {
				canBid = false
				self.$notify({
					title: '警告',
					message: '您的加价幅度小于预设加价幅度',
					type: 'warning'
				})
				return ;
			}

			if (canBid) {
				http.auction.bid(bid)
				.then(rs => {
					self.$notify({
						title: '提示',
						message: rs.msg,
						type: rs.type
					})
					self.queryRecordTotalPage()
					self.queryRecordsOfPage()
				})
				.catch(value => {
					console.log(value)
				})
			}
		},
		back() {
			this.$router.go(-1)
		},
		timeover(v) {
			this.btnStatus = 3
		}
	},
	mounted() {

	},
	created() {
		this.setMemoryPage(this.$route.query.prevPage)
		this.bookId = this.$route.params.bid
		this.bid.bookId = this.bookId
		this.page.bookId = this.bookId
		this.page.userId = this.getUserinfo.id
		this.bid.user = this.getUserinfo.id
		this.queryBookById()
		this.queryBidderList()
		this.queryRecordTotalPage()
		this.queryRecordsOfPage()
	}
}
</script>
<style lang="scss" scoped>
	@import '@/assets/css/theme.scss';
	$row-height: 40px;
	.book-detail {
		width: 966px;
		margin: 0 auto;
		padding: 20px 20px;
		background: #fff;
		.back {
			color: #b9beda;
			text-align: left;
			&:hover {
				cursor: pointer;
			}
		}
		.book-info {
			padding-top: 20px;
			display: flex;
			.basic-info {
				flex:1 1 auto;
				text-align: left;
				padding: 0 0 20px 20px;
				min-width: 614px;
				box-sizing: border-box;
				display: flex;
				flex-flow: column;
				.book-name {
					font-size: 24px;
					color: #666;
				}
				.book-desc {
					color: #e3393c;
				}
				.book-auth {
					color: #666;
					height: 20px;

				}
				.z {
					background: #f3f3f3;
					.book-test {
						color: #e3393c;
						padding: 0 30px;
						span {
							&:first-child {
								color: #666;
								padding-right: 30px;
							}
							&:last-child {
								font-size: 30px;
							}
						}
					}
					.book-clock {
						color: #fff;
						background: $basic-color;
						display: flex;
						height: 35px;
						align-items: center;
						.icon {
							padding: 0 5px;
						}
						.timer {
							flex: 1 1 auto;
							padding: 0 5px;
						}
					}
				}
				.el-button {
					width: 100%;
					height: 40px;
					margin-top: 10px;
					background: $basic-color;
				}
			}
			.bidding {
				font-size: 20px;
				display: flex;
				justify-items: baseline;
				align-items: center;
				svg {
					padding: 5px;
					color: $basic-color;
				}
				svg:hover {
					background: $basic-color;
					color: #fff;
					cursor: pointer;
				}
				.tips {
					color: #e3393c;
					font-size: 15px;
					padding: 0 10px;
				}
			}
		}
		.seller-info {
			display: flex;
			padding: 10px 0;
			img {
				width: 100px;
				height: 100px;
				&:hover {
					cursor: pointer;
				}
			}
			.info {
				flex: 1 1;
				display: flex;
				flex-direction: column;
				text-align: left;
				padding-left: 30px;
				.item {
					padding-top: 10px;
					&:first-child {
						display: flex;
						span {
							padding: 0 10px;
						}
					}
				}
			}
		}
		.auction-record {
			margin-top: 20px;
			//background: #fcfcfc;
			text-align: left;
			.art {
				font-size: 30px;
				color: #b9beda;
				text-align: center;
			}
			table {
				font-size: 16px;
				width: 100%;
				border-spacing: 0px;
				tr {
					width: 100%;
					transition: background-color 0.3s ease;
					&:nth-child(2n-1) {
						background: #eaedfa;
					}
					&:first-child {
						background: #fff;
						td {
							color: #b9beda;
							font-size: 20px;
							border-bottom: 1px solid #b9beda;
						}
					}
					&:hover {
						background: #e4e4e4;
					}
					td {
						width: 33.33%;
						height: $row-height;
						padding: 0 20px;
					}
				}
			}
			.pagination {
				text-align: center;
				width: 100%;
				margin-top: 20px;
			}
		}
	}
	input {
		text-align: center;
	}
</style>
