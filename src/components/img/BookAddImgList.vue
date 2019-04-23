<template>
	<div class="book-add-img">
		<div class="img"  v-for="(item, index) of imgs" :key="index">
			<div class="remove" @click="remove(item)">
				<div class="icon vertical-center">
					<i class="far fa-trash-alt fa-2x"></i>
				</div>
			</div>
			<img :src="item" alt="">
		</div>
		<div class="add-img vertical-center" @click="addImg" v-if="imgs.length < imgNum">
			<i class="fas fa-plus fa-2x"></i>
			<input ref="imgInput" type="file" accept="image/*" @change="pushImg"/>
		</div>
	</div>
</template>
<script>
import imgUtils from '@/utils/imgHelper'
export default {
	props:{
		imgNum: {
			type: Number,
			default: 5
		},
		imgList: {
			type: Array
		}
	},
	data() {
		return {
			imgs:[],
			imgNumber: 0
		}
	},
	methods: {
		addImg() {
			let input = this.$refs.imgInput
			input.click()
		},
		pushImg() {
			let self = this
			let img = self.$refs.imgInput.files[0]
			imgUtils.toBase64(img, rs => {
				self.imgs.push(rs)
			})
		},
		remove(v) {
			let arr = this.imgs
			let index = arr.indexOf(v)
			arr.splice(index, 1)
		}
	},
	watch: {
		imgs(v) {
			this.$emit('imgs', v)
		},
		imgList(v) {
			this.imgs = v
		},
	},
	created() {
		this.imgNumber = this.imgNum
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
	.book-add-img{
		width: 600px;
		height: 100px;
		display: flex;
		justify-content: start;
		.img, .add-img {
			width: 100px;
			height: 100px;
			color: #adb5bd;
			margin: 0 1px;
			position: relative;
			img {
				width: 100px;
				height: 100px;
			}
		}
		.img {
			&:hover {
				.remove {
					display: block;
					cursor: pointer;
				}
			}
			.remove {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 5;
				background-color:rgba($color: #666, $alpha: 0.4);
				display: none;
				color: #fff;
				.icon {
						width: 100%;
						height: 100%;
				}
			}
		}
		.add-img {
			border: 1px #adb5bd solid;
			box-sizing: border-box;
			&:hover {
				border-color: $basic-color;
				color: $basic-color;
				cursor: pointer;
			}
			input {
				display: none;
			}
		}
	}
</style>
