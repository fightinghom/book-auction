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
			<el-form-item :label="'创建时间 :'" label-width="80px">
				 <el-date-picker
					v-model="timeRange"
					type="daterange"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<ba-table
		:header="tableHeader"
		:obj="'sellOrder'"
		:params="paginationBody"
		:update="updatePagination"
		@updateSuc="updatePagination = $event"
		@setPage="getPage($event)">
			<tr v-for="item of tableData" :key="item.id" @click="deal(item.oNumber, item.sellerId, item.getterId)">
				<td>{{item.oNumber}}</td>
				<td>{{item.bookDetail.name}}</td>
				<td>{{item.createTime.split('.')[0]}}</td>
				<td>{{item.actualPrice}}</td>
				<td>{{item.getterId}}</td>
				<td v-if="item.status">
					<el-tag
					:type="orderTag(item.status).type">
					{{ orderTag(item.status).text }}
					</el-tag>
				</td>
				<td><el-button size="small" type="primary" @click.stop="deal(item.oNumber, item.sellerId, item.getterId)">查看订单</el-button></td>
			</tr>
			<div v-if="tableData.length === 0" slot="nodata">暂无订单</div>
		</ba-table>
	</div>
</template>
<script>
import Table from '@/components/Table.vue'
import http from '@/utils/api/index'
import orderStatusUtils from '@/utils/orderStatus.js'

import {mapActions, mapGetters} from 'vuex'
export default {
	components: {
		BaTable: Table,
	},
	data() {
		return {
			tableHeader: ['订单编号','拍品名称', '创建时间', '成交价格','竞得者', '订单状态','操作'],
			tableData: [],
			timeRange: '',
			paginationBody: {
				orderStauts: 0,
				number: 8,
				nowPage: 1,
				timeRange: ''
			},
			updatePagination: false,
			queryOrderList() {
				let self = this
				http.sell.getOrderList(self.paginationBody)
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
		...mapGetters(['getUserinfo', 'getMemoryPage'])
	},
	watch: {
		'paginationBody.orderStauts'(v) {
			this.updatePagination = true
			this.queryOrderList()
		},
		'timeRange'(v) {
			if(v !== null) {

				let timeRange  = v
				let timeStr = ''
				timeRange = timeRange.map(item => {
					item = new Date(item).getTime()
					/* item = item.split('T')[0] */
					return item
				})
				timeStr = timeRange[0] + ',' + timeRange[1]
				this.paginationBody.timeRange = timeStr
			} else {
				this.paginationBody.timeRange = ''
			}
			this.updatePagination = true
			this.queryOrderList()
		}
	},
	methods: {
		deal(v, seller, getter) {
			let pageInfo = {}
			pageInfo.paginationBody = this.paginationBody
			pageInfo.componentName = this.$route.name
			let str = 'manage'
			if(this.getUserinfo.id === seller) {
				str = 'sell'
			}
			if(this.getUserinfo.id === getter) {
				str = 'purchase'
			}
			this.$router.push({path: '/' + str + '/order/' + v, query: {prevPage: pageInfo}})
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
	created() {
		let memory = this.getMemoryPage
		if('undefined' !== typeof memory) {
			if(memory.componentName === this.$route.name) {
				this.paginationBody = memory.paginationBody
				if(this.paginationBody.timeRange != '') {
					this.timeRange = this.paginationBody.timeRange.split(',').map(item => {
						return parseInt(item)
					})
				}
			}
		}
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
			width: 26%;
		}
	}
</style>
