<template>
	<canvas ref="vertifycode" class="vertify-code" @click="changeCode()">

	</canvas>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		createCode() {
			let code = []
			let codeLength = 6
			for(let i = 0 ; i < codeLength ; i ++) {
				code.push(Math.round(Math.random() * 9))
			}

			return code
		},
		drawCode() {
			let code = this.createCode()
			console.log(code)

			let canvas = this.$refs.vertifycode
			let width = canvas.width
			let height = canvas.height
			let ctx
			console.log(width, height)
			if(canvas.getContext) {
				ctx = canvas.getContext('2d')
				ctx.clearRect(0,0,width, height)
			}
			let positionX = 1
			let returnCode = ''
			code.map(item => {
				let positionY = Math.random()
				ctx.font = "88px serif";
				ctx.textBaseline = "hanging";
				if(positionY > 0.5) {
					ctx.fillText(item, positionX, 50+10);
				} else {
					ctx.fillText(item, positionX, 50-10);
				}
				positionX += 50
				returnCode += item
			})

			this.drawLine(ctx)
			console.log(returnCode)
			this.$emit('getCode', returnCode)
		},
		drawLine(ctx) {
			let startX = 0
			let starty = Math.round(Math.random() * 150)
			let endX =300
			let endY = Math.round(Math.random() * 150)
			ctx.lineWidth = 5
			ctx.beginPath()
			ctx.strokeStyle = "blue"
			ctx.moveTo(startX ,starty)
			ctx.lineTo(endX, endY)
			ctx.stroke()

			ctx.strokeStyle = "blue"
			ctx.moveTo(endY ,endX)
			ctx.lineTo(starty, startX)
			ctx.stroke()
		},
		changeCode() {
			this.drawCode()
		}
	},
	mounted() {
		this.drawCode()
	},
}
</script>
<style lang="scss" scoped>
	.vertify-code {
		width: 100px;
		height: 40px;
		box-sizing: border-box;
		border: 1px solid #b9beda;
		text-align: center;
		font-size: 20px;
		&:hover {
			cursor: pointer;
			border: 1px solid #002aff;
		}
	}
</style>
