<template>
	<div class="book-add-img">
		<div class="img"  v-for="(item, index) of imgs" :key="index">
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
	},
	watch: {
		imgs(v) {
			this.$emit('imgs', v)
		}
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
			img {
				width: 100px;
				height: 100px;
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
