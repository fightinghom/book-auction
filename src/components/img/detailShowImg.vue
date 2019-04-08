<template>
	<div class="book-img">
		<div class="show">
			<img :src="showImg" alt="">
		</div>
		<div class="list">
			<div class="to-left fl vertical-center" @click="nextImg('left')">
				<i class="fas fa-chevron-left fa-2x"></i>
			</div>
			<div class="img-list fl">
				<ul>
					<li class="fl" :class="{'on': focusOnIndex == index}" v-for="(item, index) of list" :key="item" @click="showThis(index)">
						<img :src="item" alt="">
					</li>
				</ul>
			</div>
			<div class="to-right fl vertical-center" @click="nextImg('right')">
				<i class="fas fa-chevron-right fa-2x"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['imgList'],
	data() {
		return {
			showImg: '',
			list: [],
			focusOnIndex: 0
		}
	},
	methods: {
		nextImg(op) {
			if ('left' === op) {
				if(0 == this.focusOnIndex) {
					this.focusOnIndex = this.list.length - 1
				} else {
					this.focusOnIndex -= 1
				}
			}

			if ('right' === op) {
				if(this.list.length - 1 == this.focusOnIndex) {
					this.focusOnIndex = 0
				} else {
					this.focusOnIndex += 1
				}

			}

			this.showImg = this.list[this.focusOnIndex]
		},
		showThis(v) {
			this.focusOnIndex = v
			this.showImg = this.list[this.focusOnIndex]
		}

	},
	mounted() {
		this.list = JSON.parse(this.imgList)
		this.showImg = this.list[0]
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
$big-img-width: 350px;
$sm-img-width: 50px;
$total-img-width: 270px;
.book-img {
	width: $big-img-width + 2px;
	.show {
		border: 1px #b9beda solid;
		margin-bottom: 20px;
		height: $big-img-width;
		img{
			width: $big-img-width;
		}
	}
	.list {
		height: 54px;
		.to-left, .to-right {
			width: ($big-img-width + 2 - $total-img-width) / 2;
			height: 100%;
			color: #b9beda;
			&:hover {
				color: #666;
				cursor: pointer;
			}
		}
		.img-list {
			width: $total-img-width;
			height: $sm-img-width + 4px;
			overflow: hidden;
			ul {
				width: 2000px;
				height: $sm-img-width + 4px;
				li {
					padding:2px;
					height: $sm-img-width;
					&:hover {
						opacity: 0.3;
						cursor: pointer;
					}
					img {
						width: $sm-img-width;
					}
				}
			}
		}
	}
}
.on {
	opacity: 0.3;
}
</style>
