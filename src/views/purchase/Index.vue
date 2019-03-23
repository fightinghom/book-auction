<template>
	<div class="purchase">
		<div class="back" @click="back"><i class="fas fa-chevron-left fa-3x"></i></div>
		<div class="title">{{title}}</div>
		<router-view></router-view>
		<!-- <ba-tabs :header="tabsHeader">
			<div slot="0"><bidding-table></bidding-table></div>
			<div slot="1"><get-table></get-table></div>
			<div slot="2"><complete-table></complete-table></div>
		</ba-tabs> -->
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
			title: ''
		}
	},
	methods: {
		back() {
			this.$router.go(-1)
		}
	},
	updated() {
		this.title = this.$route.meta.title
	},
	mounted() {
		this.title = this.$route.meta.title
	}
}
</script>
<style lang="scss" scoped>
	.purchase {
		width: 70%;
		min-width: 966px;
		margin: 0 auto;
		background: #fcfcfc;
		padding: 20px 20px;
		.back {
			color: #b9beda;
			text-align: left;
			&:hover {
				cursor: pointer;
			}
		}
		.title {
			color: #1f2f3d;
			font-size: 28px;
			padding: 10px 0;
		}
	}
</style>
