<template>
	<div class="ba-col" :class="className">
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
			className: ''
		}
	},
	methods: {
		setWidth(w) {
			console.log(this)
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
		this.className = 'el-col-' + this._uid
		console.log(this.className)
		this.setWidth(this.width)
	}
}
</script>
<style lang="scss" scoped>
	.ba-col {
		display: inline-block;
	}
</style>
