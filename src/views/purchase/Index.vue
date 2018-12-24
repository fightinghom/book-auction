<template>
	<div class="purchase">
		<ba-tabs :header="tabsHeader">
			<div slot="0"><bidding-table></bidding-table></div>
			<div slot="1"><get-table></get-table></div>
			<div slot="2"><complete-table></complete-table></div>
		</ba-tabs>
	</div>
</template>
<script>
import Tabs from '@/components/Tabs.vue'
import BiddingTable from './BiddingTable.vue'
import GetTable from './GetTable.vue'
import CompleteTable from './CompleteTable.vue'
export default {
	data() {
		return {
			tabsHeader: ['正在参拍', '我已拍得', '交易情况']
		}
	},
	components: {
		BaTabs:Tabs,
		BiddingTable,
		GetTable,
		CompleteTable
	}
}
</script>
<style lang="scss" scoped>
	.purchase {
		width: 70%;
		min-width: 966px;
		margin: 0 auto;
		background: #fcfcfc;
	}
</style>
