<template>
	<div>
		<el-form>
			<el-form-item :label="'评价状态'" label-width="80px">
				<el-select v-model="paginationBody.status" placeholder="请选择">
					<el-option :label="'全部'" :value="0"></el-option>
					<el-option :label="'待评价'" :value="1"></el-option>
					<el-option :label="'已评价'" :value="2"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<ba-table
		:header="tableHeader"
		:obj="'feedbackMine'"
		:params="paginationBody"
		:update="updatePagination"
		@updateSuc="updatePagination = $event"
		@setPage="getPage($event)"
		>
			<tr v-for="item of tableData" :key="item.id">
				<td>
					<div class="order">
						<div class="time">{{item.order.createTime.split(" ")[0]}}</div>
					</div>
					<div class="book">
						<img :src="item.order.bookDetail.img[0]" alt="加载">
						<div class="desc">
							<div class="name">书名: {{item.order.bookDetail.name}}</div>
							<div class="category">类别: {{item.order.bookDetail.category.name}}</div>
						</div>
					</div>
				</td>
				<td>{{item.order.actualPrice}}</td>
				<td>{{item.otherSide}}</td>
				<td v-if="item.order.status">
					<el-tag
					:type="orderTag(item.order.status).type">
					{{ orderTag(item.order.status).text }}
					</el-tag>
				</td>
				<td>
					<el-button type="primary" size="mini" @click="toWrite(item.order.oNumber)">评价</el-button>
					<el-button type="info" size="mini" @click="toOrder(item.order.oNumber)">详情</el-button>
				</td>
			</tr>
		</ba-table>
	</div>
</template>
<script>
import Table from '@/components/Table.vue'
import http from '@/utils/api/index'
import {mapActions,mapGetters} from 'vuex'
import orderStatusUtils from '@/utils/orderStatus.js'
export default {
	data() {
		return {
			tableHeader: ['图书', '成交价格', '交易对象','交易状态', '操作'],
			tableData: [],
			paginationBody: {
				user: '',
				status: 0,
				otherSide: '',
				nowPage: 1,
				number: 8
			},
			updatePagination: false,
			queryFeedbackList() {
				let self = this
				http.feedback.getFeedbackList(self.paginationBody)
				.then(rs => {
					rs.map(item => {
						item.order.bookDetail.img = JSON.parse(item.order.bookDetail.img)
					})
					self.tableData = rs
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	components: {
		BaTable: Table
	},
	computed: {
		...mapGetters(['getUserinfo'])
	},
	methods: {
		orderTag(v) {

			let tag = orderStatusUtils.orderTag(v)
			return tag
		},
		toOrder(v) {
			this.$router.push('/purchase/order/'+v)
		},
		getPage(val) {
			this.paginationBody.nowPage = val
			this.queryFeedbackList()
		},
		toWrite(v) {
			this.$router.push({path: 'write', query: {oid: v, userId: this.getUserinfo.id}})
		}
	},
	watch: {
		'paginationBody.status'(v) {
			this.updatePagination = true
			this.queryFeedbackList()
		}
	},
	created() {
		this.paginationBody.user = this.getUserinfo.id
		this.queryFeedbackList()
	}
}
</script>

<style lang="scss" scoped>
	.el-form {
		width: 300px;
	}
	td {
		width: 15%;
		&:first-child {
			width: 36%;
		}
		&:last-child {
			width: 19%;
		}
		.order{
			width: 100%;
			.time {
				font-weight: bold;
				text-align: left;
			}
		}
		.book {
			width: 100%;
			display: flex;
			flex-direction: row;
			img{
				width: 80px;
				height: 80px;
			}
			.desc {
				width: 80%;
				text-align: left;
				box-sizing: border-box;
				padding: 0 10px;
			}
		}
	}
</style>
