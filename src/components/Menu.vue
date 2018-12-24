<template>
	<div class="menu ba-basic-color-aph" :style="{'width': firstMenu ? '200px' : '50px'}">
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu" @click="routeTo('/auction')">
			<div class="vertical-center menu-icon fl"><i class="fas fa-shopping-bag "></i></div>
			<div class="menu-name fl">
				<span>正在拍卖</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu"  @click="routeTo('/sell')">
			<div class="vertical-center menu-icon fl"><i class="fas fa-box-open "></i></div>
			<div class="menu-name fl">
				<span>我的竞卖</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu"  @click="routeTo('/purchase')">
			<div class="vertical-center menu-icon fl"><i class="fas fa-shopping-cart "></i></div>
			<div class="menu-name fl">
				<span>我的竞购</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu" @click="routeTo('/feedback')">
			<div class="vertical-center menu-icon fl"><i class="fas fa-comments "></i></div>
			<div class="menu-name fl">
				<span>互评记录</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu" @click="routeTo('/forum')" v-if="false">
			<div class="vertical-center menu-icon fl"><i class="fas fa-users "></i></div>
			<div class="menu-name fl">
				<span>用户论坛</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu" @click="routeTo('/manage')">
			<div class="vertical-center menu-icon fl"><i class="fas fa-lock"></i></div>
			<div class="menu-name fl">
				<span>管理平台</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			firstMenu: false
		}
	},
	methods: {
		routeTo(rn) {
			this.$router.push(rn)
		}
	}
}
</script>
<style lang="scss" scoped>
	.menu {
		height: 100%;
		position: absolute;
		overflow: hidden;
		transition: all 0.5s;
		//border-right: #eaedfa 1px solid;
		overflow-y: auto;
		.menu-item {
			height: 50px;
			width: 200px;
			color: #eaedfa;
			&:first-child {
				height: 48px;
				border-color: #eaedfa;
				border-top: 1px solid;
				border-bottom: 1px solid;
			}
			&:hover {
				background: #647bec;
				cursor: pointer;
			}
			.menu-icon {
				width: 50px;
				height: 100%;
			}
			.menu-name {
				width: 150px;
				height: 100%;
				text-align: left;
				span {
					line-height: 50px;
					padding-left: 20px;
				}
			}
		}
	}
</style>
