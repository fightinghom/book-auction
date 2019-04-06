<template>
	<div class="write">
		<!-- 写评论 -->
		<div class="evaluate" v-if="detail.status == 1">
			<div class="tips">评价须知</div>
			<el-form label-width="100px">
				<el-form-item label="交易评分:">
					<el-rate
						class="mar-btm-5 pad-top-10"
						v-model="publish.rate"
						show-score
						text-color="#ff9900"
						score-template="{value}">
					</el-rate>
				</el-form-item>
				<el-form-item label="交易评价:">
					<el-input type="textarea" rows="8" v-model="publish.content" placeholder="请评价..."></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="upload()">发表评价</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="show" v-if="detail.status == 2">
			<el-form label-width="100px">
				<el-form-item label="交易评分:">
					<el-rate
						class="mar-btm-5 pad-top-10"
						disabled
						v-model="detail.rate"
						show-score
						text-color="#ff9900"
						score-template="{value}">
					</el-rate>
				</el-form-item>
				<el-form-item label="交易评价:">
					<div>{{detail.content}}</div>
				</el-form-item>
			</el-form>
		</div>
		<!-- 对方信息 -->
		<div class="other-side" v-if="detail.otherSideUser">
			<img :src="detail.otherSideUser.pic" alt="对方未添加头像">
			<div class="info">
				<div class="number"><span>用户编号:</span>{{detail.otherSideUser.id}}</div>
				<div class="name"><span>姓名:</span>{{detail.otherSideUser.name}}</div>
				<div class="phone"><span>电话:</span>{{detail.otherSideUser.phone}}</div>
			</div>
		</div>
		<!-- 商品信息 -->
		<div class="book-info" v-if="detail.order.bookDetail">
			<img :src="detail.order.bookDetail.img[0]" alt="111">
			<div class="info">
				<div class="number"><span>图书编号:</span>{{detail.order.bookDetail.id}}</div>
				<div class="name"><span>书名:</span>{{detail.order.bookDetail.name}}</div>
				<div class="category"><span>分类:</span>{{detail.order.bookDetail.category.name}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import http from '@/utils/api/index'
import orderStatusUtils from '@/utils/orderStatus.js'
export default {
	data() {
		return {
			detail: {},
			params: {
				orderNo: '',
				userId: ''
			},
			publish: {
				rate: 0,
				content: ''
			},
			queryFeedback() {
				let self = this
				http.feedback.getFeedbackOne(self.params)
				.then(rs => {
					rs.order.bookDetail.img = JSON.parse(rs.order.bookDetail.img)
					self.detail = rs
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	methods: {
		orderTag(v) {

			let tag = orderStatusUtils.orderTag(v)
			return tag
		},
		upload() {
			let self = this
			let params = Object.assign(self.params, self.publish)
			http.feedback.publishFeedback(params)
			.then(rs => {
				self.$message({
					type: rs.type,
					message: rs.message
				})
				self.queryFeedback()
			})
			.catch(value => {
				console.log(value)
			})
		}
	},
	mounted() {
		/* this.queryFeedback() */
	},
	created() {
		this.params.orderNo = this.$route.query.oid
		this.params.userId = this.$route.query.userId
		this.queryFeedback()
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
	.write {
		padding: 10px;
		.other-side, .book-info, .evaluate, .show{
			padding: 10px 0;
			position: relative;
			margin-top: 20px;
			box-shadow: 0 0 10px 0 #cccccc;;
			&::before {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				height: 2px;
				background: $basic-color;
				top: -2px;
			}
		}

		.other-side, .book-info  {
			display: flex;
			flex-direction: row;
			img {
				padding: 10px;
				width: 80px;
				height: 80px;
			}
			.info {
				padding: 10px 0;
				text-align: left;
				flex-grow: 1;
				span {
					display: inline-block;
					width: 100px;
				}
			}
		}
		.evaluate, .show {
			padding: 10px;
		}

		.tips {
			position: absolute;
			right: 10px;
		}

	}
</style>
