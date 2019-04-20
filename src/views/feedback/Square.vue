<template>
	<div class="square">
		<div class="feedback">

		</div>
	</div>
</template>
<script>
import http from '@/utils/api/index'
export default {
	data() {
		return {
			feedbackList: [],
			paginationBody: {
				user: '',
				status: 2,
				otherSide: '',
				nowPage: 1,
				number: 8
			},
			queryFeedbackList() {
				let self = this
				http.feedback.getFeedbackList(self.paginationBody)
				.then(rs => {
					rs.map(item => {
						item.order.bookDetail.img = JSON.parse(item.order.bookDetail.img)
					})
					self.feedbackList = rs
					console.log(self.feedbackList)
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	mounted() {
		this.queryFeedbackList()
	}
}
</script>
<style lang="scss" scoped>
	.square {
		.feedback {
			display: flex;
		}
	}
</style>
