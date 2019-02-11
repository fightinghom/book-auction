<template>
	<div>
		<input id="picUpload" type="file" value="上传图片" accept="image/gif, image/jpeg, image/jpg, image/png" @change="picChange()">
	</div>
</template>
<script>
import http from '@/utils/api/index'
export default {
	data() {
		return {
			data: {},
			pic: ''
		}
	},
	methods: {
		test() {
			let self = this
			http.system.getUserList({})
			.then((res) => {
				console.log(res)
			})
			.catch((value) => {
				console.log(value)
			})
		},
		picChange() {

			let data = ''
			let id = '201510801007'
			let reader = new FileReader()
			reader.onload = e => {
				data = reader.result.split(',')[1]
				console.log(data)
				http.system.savePic({
					id: id,
					data: data
				})
				.then(res => {
					console.log(res)
				})
				.catch(value => {
					console.log(value)
				})
			}
			reader.readAsDataURL(document.getElementById('picUpload').files[0])
		}
	}
}
</script>
<style lang="scss" scoped>

</style>
