<template>
	<div class="manage-proposal">
		<el-form>
			<el-form-item :label="'问题类型 :'" label-width="100px">
				<el-select v-model="paginationBody.type">
					<el-option :value="0" label="全部"></el-option>
					<el-option :value="1" label="BUG"></el-option>
					<el-option :value="2" label="改进意见"></el-option>
					<el-option :value="3" label="需求书籍"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item :label="'需求状态'" label-width="100px" v-if="paginationBody.type === 3">
				<el-select v-model="paginationBody.status">
					<el-option :value="0" label="全部"></el-option>
					<el-option :value="1" label="已发布"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div class="header">
			<div class="type">类型</div>
			<div class="content">问题描述</div>
			<div class="people">用户</div>
			<div class="opreate">操作</div>
		</div>
		<div class="item" v-for="item of proposalList" :key="item.id">
			<div class="type">
				<el-tag
				:type="1 === item.type ? 'danger' : (2 === item.type ? 'primary' : 'success')">
				{{ 1 === item.type ? 'BUG' : (2 === item.type ? '改进意见': '需求书籍') }}
				</el-tag></div>
			<div class="content">{{item.content}}</div>
			<div class="people">{{item.userId}}</div>
			<div class="opreate">
				<el-button type="primary" size="mini" v-if="item.type === 3 && item.status == 0" @click="publish(item.id)">发布</el-button>
				<el-button type="warning" size="mini" v-if="item.type === 3 && item.status == 1" @click="noPublish(item.id)">撤回</el-button>
			</div>
		</div>
		<el-pagination
			background
			layout="prev, pager, next"
			:page-count="pageCount"
			@current-change="currentPage">
		</el-pagination>
	</div>
</template>
<script>
import http from '@/utils/api/index'
export default {
	data() {
		return {
			proposalList: [],
			paginationBody: {
				type: 0,
				nowPage: 1,
				number: 8,
				status: 0
			},
			pageCount: 0,
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
					self.pageCount = rs
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	methods: {
		currentPage(v) {
			this.paginationBody.nowPage = v
			this.queryList();
		},
		publish(id) {
			let self = this
			http.manage.proposalPublish({
				id: id
			})
			.then(rs => {
				if(rs) {
					self.$message.success('发布成功!')
					self.queryList()
					self.queryPage()
				} else {
					self.$message.error('发布失败!')
				}
			})
			.catch(value => {
				console.log(value)
			})
		},
		noPublish(id) {
			let self = this
			http.manage.proposalNoPublish({
				id: id
			})
			.then(rs => {
				if(rs) {
					self.$message.success('撤回成功!')
					self.queryList()
					self.queryPage()
				} else {
					self.$message.error('撤回失败!')
				}
			})
			.catch(value => {
				console.log(value)
			})
		},

	},
	watch: {
		'paginationBody.type'(v) {
			this.paginationBody.status = 0
			this.paginationBody.nowPage = 1
			this.queryList()
			this.queryPage()
		},
		'paginationBody.status'(v) {
			this.paginationBody.nowPage = 1
			this.queryList()
			this.queryPage()
		}
	},
	mounted() {
		this.queryList()
		this.queryPage()
	}
}
</script>
<style lang="scss" scoped>
	.manage-proposal {
		margin-top: 20px;
		.header, .item {
			display: flex;
			box-sizing: border-box;
			.type {
				width: 100px;
				box-sizing: inherit;
				border-right: 1px #c0c4cc solid;
				padding: 10px 0;
			}
			.content {
				flex: 1 1;
				box-sizing: inherit;
				border-right: 1px #c0c4cc solid;
				padding: 10px;
			}
			.people, .opreate {
				padding: 10px 0;
				width: 150px;
			}
			.people {
				border-right: 1px #c0c4cc solid;
				box-sizing: inherit;
			}
		}
		.header {
			margin-top: 20px;
			border: 1px #c0c4cc solid;
			font-size: 20px;
		}
		.item {
			font-size: 14px;
			border-right: 1px #c0c4cc solid;
			border-left: 1px #c0c4cc solid;
			border-bottom: 1px #c0c4cc solid;
			&:hover {
				background: #e4e7ed;
			}
			.content {
				text-align: left;
			}
		}
		.el-pagination {
			margin-top: 20px;
		}
		.el-form {
			width: 300px;
		}

	}
</style>
