<template>
	<div class="manage">
		<ba-tabs :header="tabsHeader">
			<div slot="0"><check-table></check-table></div>
			<div slot="1"><user-table></user-table></div>
			<div slot="2">2</div>
			<div slot="3">3</div>
		</ba-tabs>
	</div>
</template>
<script>
import BaTabs from '@/components/Tabs.vue'
import CheckTable from './CheckTable.vue'
import UserTable from './UserTable.vue'
export default {
	data() {
		return {
			tabsHeader: ['书籍审核', '用户列表', '交易订单', '意见反馈']
		}
	},
	components: {
		BaTabs,
		CheckTable,
		UserTable
	},
}
</script>
<style lang="scss" scoped>
	.manage {
		width: 70%;
		min-width: 966px;
		margin: 0 auto;
		background: #fcfcfc;
	}
</style>
