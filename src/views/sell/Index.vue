<template>
	<div class="sell">
		<div class="btn-w">
			<el-button type="primary" @click="addBook()">创建拍品</el-button>
		</div>
		<ba-tabs :header="tabsHeader">
			<div slot="0">
				<auction-table></auction-table>
			</div>
			<div slot="1">
				<dealing-table></dealing-table>
			</div>
			<div slot="2">
				<complete-table></complete-table>
			</div>
		</ba-tabs>
	</div>
</template>
<script>
import Tabs from '@/components/Tabs.vue'
import AuctionTable from './AuctionTable.vue'
import DealingTable from './DealingTable.vue'
import CompleteTable from './CompleteTable.vue'
export default {
	data() {
		return {
			tabsHeader: ['正在拍卖', '等待处理', '交易历史'],
		}
	},
	components: {
		BaTabs: Tabs,
		AuctionTable,
		DealingTable,
		CompleteTable
	},
	methods: {
		addBook() {
			this.$router.push('/book_detail/' + 'add')
		}
    }
}
</script>
<style lang="scss" scoped>
	.sell {
		width: 70%;
		min-width: 966px;
		margin: 0 auto;
		background: #fcfcfc;
		.btn-w {
			height: 40px;
			padding: 10px 20px 0px 20px;
			.el-button {
				float: left;
				background: #002aff;
			}
		}
	}
</style>
