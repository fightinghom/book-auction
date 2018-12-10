<template>
	<div class="auction">
		<el-container>
			<el-header height="36px">
				<auction-menu></auction-menu>
			</el-header>
			<el-main>
				<!-- <auction-main></auction-main> -->
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>
<script>
import Menu from '@/components/auction/Menu.vue'
import Main from './Main.vue'
export default {
	components: {
		AuctionMenu: Menu,
		AuctionMain: Main
	}
}
</script>
<style lang="scss" scoped>
	.auction {
		width: 70%;
		min-width: 966px;
		margin: 0 auto;
		.el-header {
			padding: 0;
			&:hover {
				position: relative;
				z-index: 999;
			}
		}
		/* .el-main {
			padding: 0;
		} */
	}
</style>
