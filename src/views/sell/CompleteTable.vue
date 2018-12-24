<template>
	<ba-table :header="tableHeader">
		<tr v-for="item of tableData" :key="item.id" @click="toBook(item.id)">
			<td>{{item.name}}</td>
			<td>{{item.id}}</td>
			<td>{{item.purchaser}}</td>
			<td>交易成功</td>
			<td><el-button size="small" type="primary" @click.stop="toFeedback(item.id)">互评反馈</el-button></td>
		</tr>
	</ba-table>
</template>
<script>
import Table from '@/components/Table.vue'
export default {
	components: {
		BaTable: Table,
	},
	data() {
		return {
			tableHeader: ['拍品名称', '拍品编号', '竞得者','交易情况' ,'操作'],
			tableData: [
				{
					name: '认知迭代',
					id: '1001',
					purchaser: '1'
				},
				{
					name: '认知迭代',
					id: '1002',
					purchaser: '2'
				},
				{
					name: '认知迭代',
					id: '1003',
					purchaser: '3'
				},
				{
					name: '认知迭代',
					id: '1004',
					purchaser: '4'
				},
				{
					name: '认知迭代',
					id: '1005',
					purchaser: '5'
				},
				{
					name: '认知迭代',
					id: '1006',
					purchaser: '6'
				},
				{
					name: '认知迭代',
					id: '1007',
					purchaser: '7'
				},
				{
					name: '认知迭代',
					id: '1008',
					purchaser: '7'
				},
				{
					name: '认知迭代',
					id: '1009',
					purchaser: '8'
				},
			]
		}
	},
	methods: {
		toFeedback(v) {
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
