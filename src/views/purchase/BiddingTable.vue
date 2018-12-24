<template>
	<ba-table :header="tableHeader">
		<tr v-for="item of tableData" :key="item.id" @click="toBook(item.id)">
			<td>{{item.name}}</td>
			<td>{{item.id}}</td>
			<td><ba-timer type="book"></ba-timer></td>
			<td>100</td>
			<td>100</td>
			<td>
				<el-button size="small" type="primary" @click.stop="premium(item.id)">我要加价</el-button>
				<el-button size="small" type="warning" @click.stop="cancelBid(item.id)">退出竞拍</el-button>
			</td>
		</tr>
	</ba-table>
</template>
<script>
import Table from '@/components/Table.vue'
import Timer from '@/components/timer/timer.vue'
export default {
	components: {
		BaTable: Table,
		BaTimer: Timer
	},
	data() {
		return {
			tableHeader: ['拍品名称', '拍品编号', '剩余时长', '当前出价','我的出价','操作'],
			tableData: [
				{
					name: '认知迭代',
					id: '1001',
					time: '00 : 00 : 00'
				},
				{
					name: '认知迭代',
					id: '1002',
					time: '00 : 00 : 00'
				},
				{
					name: '认知迭代',
					id: '1003',
					time: '00 : 00 : 00'
				},
				{
					name: '认知迭代',
					id: '1004',
					time: '00 : 00 : 00'
				},
				{
					name: '认知迭代',
					id: '1005',
					time: '00 : 00 : 00'
				},
				{
					name: '认知迭代',
					id: '1006',
					time: '00 : 00 : 00'
				},
				{
					name: '认知迭代',
					id: '1007',
					time: '00 : 00 : 00'
				},
				{
					name: '认知迭代',
					id: '1008',
					time: '00 : 00 : 00'
				},
				{
					name: '认知迭代',
					id: '1009',
					time: '00 : 00 : 00'
				},
			]
		}
	},
	methods: {
		premium(v) {
			console.log(v)
		},
		cancelBid(v) {
			console.log(v)
		},
		toBook(id) {
			this.$router.push('/book_detail/' + id)
		}
	}
}
</script>
<style lang="scss" scoped>
	td {
		width: 15%;
		&:last-child {
			width: 25%;
		}
	}
</style>
