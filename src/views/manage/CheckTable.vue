<template>
	<ba-table :header="tableHeader">
		<tr v-for="item of tableData" :key="item.id" @click="toBook(item.id)">
			<td>{{item.name}}</td>
			<td>{{item.id}}</td>
			<td></td>
			<td>
				<el-button size="small" type="primary" @click.stop="pass(item.id)">审核通过</el-button>
				<el-button size="small" type="warning" @click.stop="fail(item.id)">不允通过</el-button>
			</td>
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
			tableHeader: ['拍品名称', '拍品编号', '卖家', '操作'],
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
		pass(v) {
			console.log(v)
		},
		fail(v) {
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
		width: 25%;
	}
</style>
