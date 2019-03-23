<template>
	<div class="sell">
		<div class="back" @click="back"><i class="fas fa-chevron-left fa-3x"></i></div>
		<div class="title">{{title}}</div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {
			title: ''
		}
	},
	methods: {
		addBook() {
			this.$router.push('/book/create')
		},
		back() {
			this.$router.go(-1)
		}
	},
	updated() {
		this.title = this.$route.meta.title
	},
	mounted() {
		this.title = this.$route.meta.title
	}
}
</script>
<style lang="scss" scoped>
	.sell {
		width: 70%;
		min-width: 966px;
		margin: 0 auto;
		background: #fcfcfc;
		padding: 10px;
		.back {
			color: #b9beda;
			text-align: left;
			&:hover {
				cursor: pointer;
			}
		}
		.title {
			color: #1f2f3d;
			font-size: 28px;
			padding: 10px 0;
		}
	}
</style>
