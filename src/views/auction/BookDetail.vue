<template>
	<!-- book:{{$route.params.bid}} -->
	<div class="book-detail">
		<!-- 书籍信息 -->
		<div class="book-info">
			<!-- 书籍图片集 -->
			<div class="book-img">
				<div class="show">
					<img :src="showImg" alt="">
				</div>
				<div class="list">
					<div class="to-left fl vertical-center">
						<i class="fas fa-chevron-left fa-2x"></i>
					</div>
					<div class="img-list fl">
						<ul>
							<li class="fl" v-for="item of 7" :key="item">
								<img :src="showImg" alt="">
							</li>
						</ul>
					</div>
					<div class="to-right fl vertical-center">
						<i class="fas fa-chevron-right fa-2x"></i>
					</div>
				</div>
			</div>
	<!-- 	基本信息 -->
			<div class="basic-info">
				<div class="pad-top-10  mar-btm-5 book-name">书籍名称</div>
				<div class="pad-top-10  mar-btm-5 book-desc">商品简介简介简介商品简介简介简介商品简介简介简介商品简介简介简介商品简介简介简介</div>
				<div class="pad-top-10  mar-btm-5 book-auth">作家名 著</div>
				<div class="pad-top-10  mar-btm-5 book-test"><span>计时器</span><span></span></div>
				<div class="pad-top-10  mar-btm-5 book-test"><span>起始价格</span>￥<span>20</span></div>
				<div class="pad-top-10  mar-btm-5 book-test"><span>当前价格</span>￥<span>30</span></div>
				<div class="pad-top-10  mar-btm-5 book-test"><span>我的出价</span>￥<span>30</span></div>
				<el-button type="primary">我要出价</el-button>
			</div>
		</div>
		<!-- 叫价记录 -->
		<div class="auction-record">
			<div class="art pad-tb-10">实时拍卖记录</div>
			<table>
				<tr>
					<td>出价者</td>
					<td>出价时间</td>
					<td>出价金额</td>
				</tr>
				<tr v-for="item of 10" :key="item">
					<td>出价者{{item}}</td>
					<td>2018-10-10 16-40-30</td>
					<td>300</td>
				</tr>
			</table>
			<div class="pagination">
				<el-pagination
					background
					layout="prev, pager, next"
					:page-count="100"
					@current-change="currentPage">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			record: [],
			showImg: require('@/assets/image/default-book-img.jpg'),
		}
	}
}
</script>
<style lang="scss" scoped>
	@import '@/assets/css/theme.scss';
	$row-height: 40px;
	$big-img-width: 350px;
	$sm-img-width: 50px;
	$total-img-width: 270px;

	.book-detail {
		background: #fff;
		.book-info {
			display: flex;
			.book-img {
				width: $big-img-width + 2px;
				.show {
					border: 1px #b9beda solid;
					margin-bottom: 20px;
					height: $big-img-width;
					img{
						width: $big-img-width;
					}
				}
				.list {
					height: 54px;
					.to-left, .to-right {
						width: ($big-img-width + 2 - $total-img-width) / 2;
						height: 100%;
						color: #b9beda;
						&:hover {
							color: #666;
							cursor: pointer;
						}
					}
					.img-list {
						width: $total-img-width;
						height: $sm-img-width + 4px;
						overflow: hidden;
						ul {
							width: 2000px;
							height: $sm-img-width + 4px;
							li {
								padding:2px;
								height: $sm-img-width;
								&:hover {
									padding: 0px;
									border: 2px $basic-color solid;
									cursor: pointer;
								}
								img {
									width: $sm-img-width;
								}
							}
						}
					}
				}
			}
			.basic-info {
				flex:1 1 auto;
				text-align: left;
				padding: 0 20px;
				padding-bottom: 20px;
				.book-name {
					font-size: 24px;
					color: #666;
				}
				.book-desc {
					color: #e3393c;
				}
				.book-auth {
					color: #666;

				}
				.book-test {
					color: #e3393c;
					padding: 0 20px;
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
				.el-button {
					width: 100%;
					height: 40px;
					margin-top: 10px;
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
</style>
