<template>
	<div class="tabs">
		<div class="tabs-header">
			<div class="header-name fl" v-for="(item, index) of header" :key="item" @click="activeTab(index)">{{item}}</div>
		</div>
		<div class="tabs-item" v-for="(item, index) of header" :key="item" v-if="activeName == index">
			<slot :name="index"></slot>
		</div>
	</div>
</template>
<script>
export default {
	props: ['header'],
	data() {
		return {
			activeName: 0
		}
	},
	methods: {
		activeTab(tab) {
			this.activeName = tab
		},
		focusOn(tab) {
			document.getElementsByClassName('header-name')[tab].style.color = '#002aff'
		},
		foucsLeave(tab) {
			document.getElementsByClassName('header-name')[tab].style.color = ''
		}
	},
	watch: {
		activeName(newTab, oldTab) {
			this.focusOn(newTab)
			this.foucsLeave(oldTab)
		}
	},
	mounted() {
		this.focusOn(0)
	}
}
</script>
<style lang="scss" scoped>
	.tabs {
		padding: 20px 20px;
		box-sizing:border-box;
		.tabs-header {
			height: 38px;
			border-bottom: 2px solid #e4e7ed;
			.header-name {
				padding: 0 20px;
				height: 38px;
				line-height: 38px;
				&:first-child {
					padding-left: 0;
				}
				&:last-child {
					padding-right: 0;
				}
				&:hover {
					cursor: pointer;
					color: #002aff;
				}
			}
		}
		.tabs-item {
			padding-top: 20px;
		}
	}
</style>
