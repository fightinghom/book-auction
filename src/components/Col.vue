<template>
	<div :id="_uid" class="ba-col">
		<slot></slot>
	</div>
</template>
<script>
export default {
	props: {
		//默认的宽度为100%
		'span': {
			type: Number,
			default: 24
		}
	},
	data() {
		return {

		}
	},
	methods: {
		setWidth(w) {
			document.getElementById(this._uid).style.width = w
		}
	},
	computed: {
		width() {
			let span = this.span
			let w =  span / 24 * 100
			return w + '%'
		}
	},
	mounted() {
		this.setWidth(this.width)
	}
}
</script>
<style lang="scss" scoped>
	.ba-col {
		display: inline-block;
	}
</style>
