<template>
	<div class="slider" @mouseenter="stop()" @mouseleave="play()">
		<ul>
			<!-- <li style="background:red"></li>
			<li style="background:yellow"></li>
			<li style="background:blue"></li>
			<li style="background:gray"></li>
			<li style="background:green"></li> -->
			<li v-for="(item, index) of 5" :key="item">
				<img v-if="bookList.length > 0" :src="bookList[index].img" :alt="bookList[index].name" @click="toBook(bookList[index].id)">
			</li>
		</ul>
		<div class="btn">
			<div class="left" @click="prev()"><i class="fas fa-chevron-left fa-3x"></i></div>
			<div class="right" @click="next()"><i class="fas fa-chevron-right fa-3x"></i></div>
		</div>
			<!-- <div class="left" @click="prev()"><i class="fas fa-chevron-left fa-3x"></i></div>
			<div class="right" @click="next()"><i class="fas fa-chevron-right fa-3x"></i></div> -->
		<div class="point">
			<div class="item" v-for="(item, index) of 5" :key="item" @click="toPoint(index)"></div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['books'],
	data() {
		return {
			style:['img-1','img-2', 'img-3', 'img-4', 'img-5' ],
			list: [],
			point: [],
			focusIndex: 0,
			timer: null,
			bookList: []
		}
	},
	methods: {
		next() {
			let style = this.style
			style.splice(0, 0, style[4])
			style.pop()
			this.focus('next')
		},
		prev() {
			let style = this.style
			style.push(style[0])
			style.shift()
			this.focus('prev')
		},
		focus(model) {
			if('next' === model) {
				if(this.focusIndex != 4) {
					this.focusIndex += 1
				} else {
					this.focusIndex = 0
				}
			}
			if('prev' === model) {
				if(this.focusIndex != 0) {
					this.focusIndex -= 1
				} else {
					this.focusIndex = 4
				}
			}
			this.pointChange()
			let style = this.style
			let list = this.list
			list.map((item, index) => {
				item.className = style[index]
			})
		},
		play() {
			let self = this
			this.timer = setInterval(() => {
				self.next()
			}, 2000)
		},
		stop() {
			clearInterval(this.timer)
		},
		pointChange() {
			this.point.map(item => {
				item.classList.remove('on')
			})
			this.point[this.focusIndex].classList.add('on')
		},
		toPoint(index) {
			let sub = index - this.focusIndex
			if(sub < 0) {
				for(let i = 0; i< Math.abs(sub); i++) {
					this.prev()
				}
			}
			if(sub > 0) {
				for(let i = 0; i < sub; i++) {
					this.next()
				}
			}
		},
		toBook(id) {
			this.$router.push('/book_detail/' + id)
		},
	},
	watch: {
		books(v) {
			this.bookList = JSON.parse(JSON.stringify(this.books))
		}
	},
	mounted() {
		/* let style = this.style */
		this.point = Array.prototype.slice.call(document.getElementsByClassName('item'))
		this.list = Array.prototype.slice.call(document.getElementsByTagName('li'))
		/* let list = this.list */
		/* for(let item of dom) {
			this.list.push(item)
		} */
		this.play()
	},
	destroyed() {
		this.stop()
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
	.on {
			background: $basic-color !important;
	}
	.slider {
		position: relative;
		.btn {
			padding:0 2px;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			z-index: 5;
			color: #000;
			.left, .right {
				display: inline-block;
			}
			.left {
				float: left;
			}
			.right {
				float: right;
			}
			.left:hover, .right:hover{
				background: rgba($color: #666, $alpha: 0.5);
				color: #fff;
				cursor: pointer;
			}
		}
		ul {
			height: 350px;
			position: relative;
			overflow: hidden;
			li {
				transition: all 0.5s;
				img {
					transition: all 0.5s;
					&:hover{
						cursor: pointer;
					}
				}
			}
		}
		.point {
			position: absolute;
			z-index: 5;
			bottom: 3px;
			left: 50%;
			transform: translateX(-50%);
			.item {
				width: 20px;
				height: 5px;
				margin: 0 5px;
				background: #666;
				display: inline-block;
				&:hover {
					cursor: pointer;
					background: $basic-color;
				}
			}
		}
		.img-1 {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 300px;
			height: 300px;
			z-index: 3;
			transform: translate(-50%, -50%);
			img {
				width: 300px;
				height: 300px;
			}
		}
		.img-2 {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 250px;
			height: 250px;
			z-index: 2;
			transform: translate(-50% + 100, -50%);
			img {
				width: 250px;
			height: 250px;
			}
		}
		.img-5 {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 250px;
			height: 250px;
			z-index: 2;
			transform: translate(-50% - 100, -50%);
			img {
				width: 250px;
			height: 250px;
			}
		}
		.img-3 {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 150px;
			height: 150px;
			z-index: 1;
			transform: translate(-50% + 270, -50%);
			img {
				width: 150px;
			height: 150px;
			}
		}
		.img-4 {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 150px;
			height: 150px;
			z-index: 1;
			transform: translate(-50% - 270, -50%);
			img {
				width: 150px;
			height: 150px;
			}
		}
	}
</style>
