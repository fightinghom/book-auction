<template>
	<div class="show-need">
		<div class="show">
			<div class="page">
				<div class="left fl" @click="toPage('prev')"><i class="fas fa-chevron-left"></i></div>
				<span>{{paginationBody.nowPage + '/' + countPage}}</span>
				<div class="right fr" @click="toPage('next')"><i class="fas fa-chevron-right"></i></div>
			</div>
			<div class="item" v-for="item of proposalList" :key="item.id">
				<div class="content">{{item.content}}</div>
				<div class="up-user">---- {{item.createTime.split(' ')[0]}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import http from '@/utils/api/index'
export default {
	data() {
		return {
			countPage: 0,
			paginationBody: {
				type: 3,
				nowPage: 1,
				number: 8,
				status: 1
			},
			proposalList: [],
			queryList() {
				let self = this
				http.system.selectProposalList(self.paginationBody)
				.then(rs => {
					self.proposalList = rs
				})
				.catch(value => {
					console.log(value)
				})
			},
			queryPage() {
				let self = this
				http.system.selectProposalPage(self.paginationBody)
				.then(rs => {
					self.countPage = rs
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	methods: {
		toPage(v) {
			console.log(v)

			if('prev' === v) {
				if(this.paginationBody.nowPage != 1) {
					this.paginationBody.nowPage--
				}
			}
			if('next' === v) {
				if(this.paginationBody.nowPage != this.countPage){
					this.paginationBody.nowPage++
				}
			}
		}
	},
	watch: {
		'paginationBody.nowPage'(v) {
			this.queryPage()
			this.queryList()
		}
	},
	created() {
		this.queryPage()
		this.queryList()
	},
}
</script>
<style lang="scss" scoped>
	.show-need {
		position: relative;
		.show {
			min-height: 200px;
			.item {
				border-bottom: 1px #040c04 solid;
				padding: 5px 0;
				.content {
					text-align: left;
				}
				.up-user {
					text-align: right;
					font-size: 16px;
				}
			}
		}
		.page {
			margin-bottom: 10px;
			height: 30px;
			line-height: 30px;
			span {
				font-size: 18px;
			}
			.left, .right {
				width: 30px;
				&:hover {
					background: rgba($color: #666, $alpha: 0.5);
					color: #fff;
					cursor: pointer;
				}
			}
		}
	}
</style>
