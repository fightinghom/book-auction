<template>
	<ba-table :header="tableHeader">
		<tr v-for="item of tableData" :key="item.id" @click="toBook(item.id)">
			<td>{{item.name}}</td>
			<td>{{item.id}}</td>
			<td>{{item.seller}}</td>
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
			tableHeader: ['拍品名称', '拍品编号', '卖家','交易情况' ,'操作'],
			tableData: [
				{
					name: '认知迭代',
					id: '1001',
					seller: '1'
				},
				{
					name: '认知迭代',
					id: '1002',
					seller: '2'
				},
				{
					name: '认知迭代',
					id: '1003',
					seller: '3'
				},
				{
					name: '认知迭代',
					id: '1004',
					seller: '4'
				},
				{
					name: '认知迭代',
					id: '1005',
					seller: '5'
				},
				{
					name: '认知迭代',
					id: '1006',
					seller: '6'
				},
				{
					name: '认知迭代',
					id: '1007',
					seller: '7'
				},
				{
					name: '认知迭代',
					id: '1008',
					seller: '7'
				},
				{
					name: '认知迭代',
					id: '1009',
					seller: '8'
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
