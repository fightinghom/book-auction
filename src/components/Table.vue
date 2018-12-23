<template>
	<div>
		<table>
			<tr>
				<td v-for="item of header" :key="item">{{item}}</td>
			</tr>
			<slot></slot>
		</table>
		<div class="pagination">
			<el-pagination
				background
				layout="prev, pager, next"
				:page-count="100"
				@current-change="currentPage">
			</el-pagination>
		</div>
	</div>
</template>
<script>
export default {
	props: ['header'],
	methods: {
		currentPage(page) {

		},
	}
}
</script>

<style lang="scss" scoped>
	$row-height: 40px;
	table {
		font-size: 16px;
		width: 100%;
		border-spacing: 0px;
		tr {
			width: 100%;
			transition: background-color 0.3s ease;
			&:nth-child(2n-1) {
				background: #eaedfa;
			}
			&:first-child {
				background: #fcfcfc;
				td {
					color: #b9beda;
					font-size: 20px;
					border-bottom: 1px solid #b9beda;
				}
			}
			&:hover {
				background: #e4e4e4;
			}
			td {
				//height: $row-height;
				padding: 5px 20px;
			}
		}
	}
	.pagination {
		text-align: center;
		width: 100%;
		margin-top: 20px;
	}
</style>
