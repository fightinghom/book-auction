<template>
	<div>
		<el-form>
			<el-form-item :label="'订单状态'" label-width="80px">
				<el-select v-model="paginationBody.orderStauts" placeholder="请选择">
					<el-option :label="'全部'" :value="0"></el-option>
					<el-option :label="'待完善'" :value="1"></el-option>
					<el-option :label="'待确认'" :value="2"></el-option>
					<el-option :label="'交易中'" :value="3"></el-option>
					<el-option :label="'交易完成'" :value="4"></el-option>
					<el-option :label="'交易取消'" :value="5"></el-option>
					<el-option :label="'交易停滞'" :value="96"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<ba-table
		:header="tableHeader"
		:obj="'purchaseOrder'"
		:params="paginationBody"
		:update="updatePagination"
		@updateSuc="updatePagination = $event"
		@setPage="getPage($event)">
			<tr v-for="item of tableData" :key="item.id" @click="toOrder(item.oNumber)">
				<td>{{item.oNumber}}</td>
				<td v-if="item.bookDetail">{{item.bookDetail.name}}</td>
				<td>{{item.actualPrice}}</td>
				<td>{{item.createTime.split('.')[0]}}</td>
				<td>{{item.sellerId}}</td>
				<td v-if="item.status">
					<el-tag
					:type="orderTag(item.status).type">
					{{ orderTag(item.status).text }}
					</el-tag>
				</td>
				<td>
					<el-button size="small" type="primary" @click.stop="toOrder(item.oNumber)">查看订单</el-button>
				</td>
			</tr>
		</ba-table>
	</div>
</template>
<script>
import Table from '@/components/Table.vue'
import Timer from '@/components/timer/timer.vue'
import http from '@/utils/api/index'
import orderStatusUtils from '@/utils/orderStatus.js'
import {mapActions, mapGetters} from 'vuex'
export default {
	components: {
		BaTable: Table,
		BaTimer: Timer
	},
	data() {
		return {
			tableHeader: ['订单编号', '拍品名称', '成交价格', '创建时间','卖家','订单状态' ,'操作'],
			tableData: [],
			paginationBody: {
				orderStauts: 0,
				getterId: '',
				number: 8,
				nowpage: 1
			},
			updatePagination: false,
			queryOrderList() {
				let self = this
				http.purchase.getBidderOfOrderList(self.paginationBody)
				.then(rs => {
					self.tableData = rs
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	computed: {
		...mapGetters(['getUserinfo']),
	},
	methods: {
		toOrder(v) {
			this.$router.push('/purchase/order/'+v)
		},
		getPage(val) {
			this.paginationBody.nowPage = val
			this.queryOrderList()
		},
		orderTag(v) {

			let tag = orderStatusUtils.orderTag(v)
			return tag
		}
	},
	watch: {
		'paginationBody.orderStauts'(v) {
			this.updatePagination = true
			this.queryOrderList()
		}
	},
	created() {
		this.paginationBody.getterId = this.getUserinfo.id
		this.queryOrderList()
	}
}
</script>
<style lang="scss" scoped>
	.el-form {
		width: 300px;
	}
	td {
		width: 12%;
		word-wrap:break-word;
		word-break: break-all;
		&:first-child {
			width: 16%;
		}
	}
</style>
