<template>
	<div class="sell">
		<div class="btn-w">
			<el-button type="primary" @click="addBook()">创建拍品</el-button>
		</div>
		<ba-tabs :header="tabsHeader">
			<div slot="0">1</div>
			<div slot="1">2</div>
			<div slot="2">3</div>
		</ba-tabs>
	</div>
</template>
<script>
import Tabs from '@/components/Tabs.vue'
export default {
	data() {
		return {
			tabsHeader: ['正在拍卖', '等待处理', '交易完成']
		}
	},
	components: {
		BaTabs: Tabs
	},
	methods: {
		addBook() {
			this.$router.push('/book_detail/' + 'add')
		}
    }
}
</script>
<style lang="scss" scoped>
	.sell {
		background: #fcfcfc;
		.btn-w {
			height: 40px;
			padding: 10px 20px 0px 20px;
			.el-button {
				float: left;
				height: 40px;
				background: #002aff;
			}
		}
	}
</style>
