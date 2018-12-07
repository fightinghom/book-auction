<template>
	<div class="slider">
		<div class="slider-img fl">
			<ul id="sImg">
				<li v-for="(item, index) of 5" :key="item" @mouseenter="toFocus(index)" @mouseleave="removeFocus(index)">{{item}}{{item}}{{item}}{{item}}{{item}}{{item}}{{item}}</li>
			</ul>
		</div>
		<div class="slider-title fl">
			<ul id="sTitle">
				<li v-for="(item, index) of 5" :key="item" @mouseenter="toFocus(index)" @mouseleave="removeFocus(index)"><p>{{item}}{{item}}{{item}}{{item}}{{item}}{{item}}{{item}}</p></li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			focusIndex: 0,
			timer: '',
			sliderList: [5,5,5,5,5]
		}
	},
	methods: {
		setFocus() {
			let index = this.focusIndex
			let list = document.getElementById('sTitle').getElementsByTagName('li')
			this.move(index)
			index ++
			if(index >= list.length) {
				index = 0
			}
			this.focusIndex = index
		},
		toFocus(n) {
			clearInterval(this.timer)
			let index = n
			this.move(index)
			this.focusIndex = index
		},
		removeFocus(n) {
			this.timer = setInterval(this.setFocus, 2000)
		},
		move(n) {
			let index = n
			let list = document.getElementById('sTitle').getElementsByTagName('li')
			let imgList = document.getElementById('sImg')
			for (let item of list) {
				item.className = null
			}
			for (let item of imgList.getElementsByTagName('li')) {
				item.style.opacity = 0
			}
			list[index].className = 'on'
			imgList.getElementsByTagName('li')[index].style.opacity = 1
			imgList.style.marginLeft = -600 * index + 'px'
		}
	},
	mounted() {
		this.move(0)
		this.timer = setInterval(this.setFocus, 2000)
	}
}
</script>
<style lang="scss" scoped>
	.on {
		background: rgb(0, 42, 255);
		color: #eaedfa;
	}
	.slider {
		height: 300px;
		margin: 0 auto;
		.slider-img {
			width: 600px;
			height: 100%;
			overflow: hidden;
			ul {
				width: 9999px;
				height: 100%;
				background: #fcfcfc;
				li {
					width: 600px;
					height: 100%;
					float: left;
					transition: all 1.5s;
					&:nth-child(odd) {
						background: #999;
					}
				}
			}
		}
		.slider-title {
			height: 100%;
			width: 326px;
			ul {
				height: 100%;
				background: #fcfcfc8a;
				li {
					padding: 0 20px;
					p {
						height: 60px;
						line-height: 60px;
					}
					&:hover {
						background: rgb(0, 42, 255);
						color: #eaedfa;
					}
				}
			}
		}
	}
</style>
