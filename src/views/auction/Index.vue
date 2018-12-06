<template>
	<div class="auction">
		<el-container>
			<el-header height="36px">
				<auction-menu></auction-menu>
			</el-header>
			<el-main>
				<auction-main></auction-main>
			</el-main>
		</el-container>
	</div>
</template>
<script>
import Menu from '@/components/auction/Menu.vue'
import Main from '@/components/auction/Main.vue'
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
			}
		}
		/* .el-main {
			padding: 0;
		} */
	}
</style>
