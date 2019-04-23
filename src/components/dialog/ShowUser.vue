<template>
	<el-dialog
	:title="title"
	:visible.sync="dialogVisible"
	width="600px"
	:before-close="handleClose">
		<div class="info-wapper">
			<!-- 用户基本信息 -->
			<div class="user">
				<img :src="user.img" :alt="user.nikename">
				<div class="info">
					<div>用户编号:  {{user.id}}</div>
					<div>用户姓名:  {{user.name}}</div>
					<div>用户昵称:  {{user.nikename}}</div>
					<div>用户手机:  {{user.phone}}</div>
				</div>
			</div>
			<!-- 用户评价列表 -->
			<div class="eval">
				<div class="title">累计评价</div>
				<div class="item" v-for="item of evaluations" :key="item.id">
					<div class="content">{{item.content}}</div>
					<div class="people">{{item.user}}</div>
					<div class="book" v-if="item.order.bookDetail">
						<img :src="item.order.bookDetail.img[0]" :alt="item.order.bookDetail.bookId">
						<div class="book-info">
							<div class="param">{{item.order.bookDetail.name}}</div>
							<div class="param">{{item.order.bookDetail.author}}</div>
							<div class="param">{{item.order.bookDetail.category.name}}</div>
						</div>
					</div>
					<div class="footer">
						<el-rate
							disabled
							v-model="item.rate"
							show-score
							text-color="#ff9900"
							score-template="{value}">
						</el-rate>
						<div class="time">{{item.createTime.split('.')[0]}}</div>
					</div>
				</div>
				<div class="item" v-if="evaluations.length == 0">暂无评价</div>
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
	</el-dialog>
</template>
<script>
import http from '@/utils/api/index'
import Table from '@/components/Table.vue'
export default {
	props: {
		title: {
			type: String,
			default: '用户信息'
		},
		userId: {
			type: String,
			required: true
		},
		showIt: {
			type: Boolean,
			required: true
		},
	},
	data() {
		return {
			dialogVisible: false,
			id: '',
			user: {},
			evaluations: [],
			pageCount: 100,
			paginationBody: {
				user: '',
				status: 2,
				otherSide: '',
				nowPage: 1,
				number: 8
			},
			queryUserById() {
				let self = this
				http.system.getUserById({
					id: self.id
				})
				.then((res) => {
					self.user = res
				})
				.catch((value) => {
					console.log(value)
				})
			},
			queryFeedbackList() {
				let self = this
				http.feedback.getFeedbackList(self.paginationBody)
				.then(rs => {
					rs.map(item => {
						item.order.bookDetail.img = JSON.parse(item.order.bookDetail.img)
					})
					self.evaluations = rs
				})
				.catch(value => {
					console.log(value)
				})
			},
			queryFeedbackPage() {
				let self = this
				http.feedback.getPages(self.paginationBody)
				.then(rs => {
					self.pageCount = rs
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	methods: {
		handleClose() {
			this.$emit('handle-close', false)
		},
		currentPage(page) {
			this.paginationBody.nowPage = page
		}
	},
	watch: {
		showIt(v) {
			this.dialogVisible = v
			if(this.userId != '') {
				this.id = this.userId
				this.paginationBody.otherSide = this.userId
				this.queryUserById()
				this.queryFeedbackPage()
				this.queryFeedbackList()
			}
		},
		'paginationBody.nowPage' () {
			this.queryFeedbackList()
		},
	},
	computed: {

	},
	beforeMount() {

	},
	created() {

	},
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
	.info-wapper {
		.user {
			display: flex;
			img {
				width: 120px;
				height: 120px;
			}
			.info {
				flex: 1 1;
				text-align: left;
				padding: 0 10px;
				font-size: 15px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
		.eval {
			.title {
				margin-top: 20px;
				text-align: left;
				font-size: 18px;
				color: $basic-color;
				position: relative;
				&::before {
					content: '';
					position: absolute;
					left: 0;
					right: 0;
					bottom: -2px;
					height: 2px;
					background: $basic-color;
				}
			}
			.item {
				padding: 10px 0;
				display: flex;
				align-content: flex-start;
				flex-wrap: wrap;
				text-align: left;
				.people, .content, .book, .footer {
					box-sizing: border-box;
					padding: 5px;
				}
				.content {

					flex-basis: calc(100% - 100px);
				}
				.book, .footer{
					flex-basis: 100%;
				}
				.book {
					display: flex;
					img {
						width: 60px;
						height: 60px;
					}
					.book-info {
						padding: 0 5px;
						box-sizing: border-box;
						flex-grow: 1;
						.param {

						}
					}
				}
				.footer {
					border-bottom:1px solid #ccc;
					display: flex;
					.el-rate {
						flex-grow: 1;
					}
				}
				.people {
					width: 100px;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
