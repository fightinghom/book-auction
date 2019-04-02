<template>
	<li>
		<div class="line"></div>
		<div class="cycle">1</div>
		<div class="step-item-text">
			<slot></slot>
		</div>
	</li>
</template>
<script>
export default {
	props:['type'],
	methods: {
		typeOfCss(v) {
			if('success' === v) {
				this.$el.children[0].classList.add('line-on')
				this.$el.children[1].classList.add('cycle-on')
				this.$el.children[2].classList.add('step-item-text-on')
			}
			if('on' === v) {
				this.$el.children[0].classList.add('line-in')
				this.$el.children[1].classList.add('cycle-in')
				this.$el.children[2].classList.add('step-item-text-in')
			}
			if('failed' === v) {
				this.$el.children[0].classList.add('line-fail')
				this.$el.children[1].classList.add('cycle-fail')
				this.$el.children[2].classList.add('step-item-text-fail')
			}
			if('warning' === v) {
				this.$el.children[0].classList.add('line-warning')
				this.$el.children[1].classList.add('cycle-warning')
				this.$el.children[2].classList.add('step-item-text-warning')
			}
		}
	},
	mounted() {
		let type = this.type
		this.typeOfCss(type)
	}
}
</script>
<style lang="scss" scoped>
	li {
		position: relative;
		flex: 1;
		.cycle {
			width: 40px;
			height: 40px;
			background: #cccccc;
			margin: 0 auto;
			border-radius: 50%;
			line-height: 40px;
			position: relative;
			z-index: 3;
		}
		.line {
			width: 100%;
			height: 2px;
			background: #cccccc;
			position: absolute;
			top: 20px;
			z-index: 2;
		}
	}
	.step-item-text {
		padding: 10px 0;
		color: #cccccc;
	}
	li:first-child {
		.line {
			width: 50%;
			left: 50%;
		}
	}
	li:last-child {
		.line {
			width: 50%;
		}
	}

	.line-on {
		background: #67c23a !important;
	}
	.cycle-on {
		background: #67c23a !important;
	}
	.step-item-text-on {
		padding: 10px 0;
		color: #67c23a;
	}
	.step-item-text-in {
		padding: 10px 0;
		color: #002aff;
	}
	.cycle-in {
		background: #002aff !important;
	}
	.line-in {
		background: #002aff !important;
	}
	.step-item-text-warning {
		padding: 10px 0;
		color: #e6a23c;
	}
	.cycle-warning {
		background: #e6a23c !important;
	}
	.line-warning {
		background: #e6a23c !important;
	}
	.step-item-text-fail {
		padding: 10px 0;
		color: #f56c6c;
	}
	.cycle-fail {
		background: #f56c6c !important;
	}
	.line-fail {
		background: #f56c6c !important;
	}
</style>
