<template>
	<div class="auction">
		<el-container>
			<el-header height="36px" v-if="showMenu">
				<auction-menu></auction-menu>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>
<script>
import Menu from '@/components/auction/Menu.vue'
import Main from './Main.vue'
export default {
	data() {
		return {
			showMenu: true
		}
	},
	components: {
		AuctionMenu: Menu,
		AuctionMain: Main
	},
	watch: {
		'$route' (to, from) {
			if (to.name === 'AuctionBook') {
				this.showMenu = false
			} else {
				this.showMenu = true
			}
		}
	},
	mounted() {
		if (this.$route.name === 'AuctionBook') {
				this.showMenu = false
			} else {
				this.showMenu = true
			}

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
		.el-main {
			width: 70%;
			min-width: 966px;
			margin: 0 auto;
			padding: 0;
		}
	}
</style>
