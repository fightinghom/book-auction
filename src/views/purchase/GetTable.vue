<template>
	<ba-table :header="tableHeader">
		<tr v-for="item of tableData" :key="item.id" @click="toBook(item.id)">
			<td>{{item.name}}</td>
			<td>{{item.id}}</td>
			<td>100</td>
			<td>卖家{{item.id}}</td>
			<td>
				<el-button size="small" type="primary" @click.stop="deal(item.id)">处理订单</el-button>
				<el-button size="small" type="warning" @click.stop="connect(item.id)">联系卖家</el-button>
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
			tableHeader: ['拍品名称', '拍品编号', '成交价格','卖家' ,'操作'],
			tableData: [
				{
					name: '认知迭代',
					id: '1001',
				},
				{
					name: '认知迭代',
					id: '1002',
				},
				{
					name: '认知迭代',
					id: '1003',
				},
				{
					name: '认知迭代',
					id: '1004',
				},
				{
					name: '认知迭代',
					id: '1005',
				},
				{
					name: '认知迭代',
					id: '1006',
				},
				{
					name: '认知迭代',
					id: '1007',
				},
				{
					name: '认知迭代',
					id: '1008',
				},
				{
					name: '认知迭代',
					id: '1009',
				},
			]
		}
	},
	methods: {
		deal(v) {
			console.log(v)
		},
		connect(v) {
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
		width: 18.75%;
		&:last-child {
			width: 25%;
		}
	}
</style>
