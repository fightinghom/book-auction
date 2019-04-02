<template>
	<div class="step">
		<ul>
			<slot></slot>
		</ul>
	</div>
</template>
<script>
export default {
	props: ['active'],
	mounted() {
		let list = document.getElementsByTagName('li')
		let len = list.length
		let active = this.active
		Array.map( list , (item, index) => {
			item.children[1].innerText = index + 1
			/* if(index + 1 < active) {
				if ('交易停滞' === item.children[2].innerText) {
					item.children[0].classList.add('line-warning')
					item.children[1].classList.add('cycle-warning')
					item.children[2].classList.add('step-item-text-warning')
				} else if ('交易失败' === item.children[2].innerText.split('(')[0]) {
					item.children[0].classList.add('line-fail')
					item.children[1].classList.add('cycle-fail')
					item.children[2].classList.add('step-item-text-fail')
				} else {
					item.children[0].classList.add('line-on')
					item.children[1].classList.add('cycle-on')
					item.children[2].classList.add('step-item-text-on')
				}
			}
			if(index === active) {
				item.children[0].classList.add('line-in')
				item.children[1].classList.add('cycle-in')
				item.children[2].classList.add('step-item-text-in')
			} */
		})

	}
}
</script>
<style lang="scss" scoped>
	ul {
		display: flex;
		li {
			color: azure;
		}
	}
</style>
