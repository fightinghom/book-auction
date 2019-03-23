<template>
	<div>
		<input type="datetime-local" v-model="time" @change="timeChange()">
	</div>
</template>
<script>
import http from '@/utils/api/index'
import {validate} from '@/utils/validate.js'
export default {
	data() {
		return {
			time: ''
		}
	},
	methods: {
		timeChange() {
			console.log((new Date(this.time)).getTime())
		}
	}
}
</script>
<style lang="scss" scoped>

</style>
