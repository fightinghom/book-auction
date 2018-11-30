<template>
	<div class="menu ba-basic-color-aph" :style="{'width': firstMenu ? '200px' : '50px'}">
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu">
			<div class="vertical-center menu-icon fl"><i class="fas fa-shopping-bag "></i></div>
			<div class="menu-name fl">
				<span>拍卖会</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu">
			<div class="vertical-center menu-icon fl"><i class="fas fa-book "></i></div>
			<div class="menu-name fl">
				<span>我的竞卖</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu">
			<div class="vertical-center menu-icon fl"><i class="fas fa-shopping-cart "></i></div>
			<div class="menu-name fl">
				<span>我的竞购</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu">
			<div class="vertical-center menu-icon fl"><i class="fas fa-comments "></i></div>
			<div class="menu-name fl">
				<span>互评记录</span>
				<div class="vertical-center menu-icon fr"><i class="fas fa-angle-right "></i></div>
			</div>
		</div>
		<div class="menu-item"  @mouseout="firstMenu = !firstMenu"  @mouseover="firstMenu = !firstMenu">
			<div class="vertical-center menu-icon fl"><i class="fas fa-users "></i></div>
			<div class="menu-name fl">
				<span>用户论坛</span>
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
	}
}
</script>
<style lang="scss" scoped>
	.menu {
		height: 100%;
		position: absolute;
		overflow: hidden;
		transition: all 0.5s;
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
