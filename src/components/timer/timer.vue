<template>
	<div class="timer">
		<div class="t-wapper">
			<span>距离结束 </span><span>{{hh}}</span> : <span>{{mm}}</span> : <span>{{ss}}</span>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			hh: '',
			mm: '',
			ss: '',
			timer: ''
		}
	},
	methods: {
		assignTime(h, m, s) {
			let self = this
			self.timer = setInterval(function() {
				self.hh = h < 10 ? '0' + h : h
				self.mm = m < 10 ? '0' + m : m
				self.ss = s < 10 ? '0' + s : s
				if (s != 0 || m != 0 || h != 0) {
					if (s == 0) {
						if ( m != 0) {
							m -= 1
							s = 59
						}
						if (h != 0) {
							h -=1
							m = 59
							s = 59
						}
					} else {
						s -= 1
					}

				} else {
					clearInterval(self.timer)
					self.timer = null
				}
			},1000)
		}
	},
	mounted() {
		let t1 = new Date(2015,1,1,10,30,0);
		let t2 = new Date(2015,1,1,10,30,10);
		let t3 = t2 - t1
		let t = t3 / 1000
		let h = parseInt(t / 3600)
		let m = parseInt((t - h * 3600) / 60)
		let s = parseInt(t - h * 3600 - m * 60)
		this.assignTime(h, m, s)
	},
	destroyed() {
		if ( this.timer != null) {
			clearInterval(this.timer)
		}
	}
}
</script>
<style lang="scss" scoped>
	.timer {
		.t-wapper {
			float: right;
			span {
				font-size: 20px;
				&:first-child {
					font-size: 14px;
				}
			}
		}
	}
</style>
