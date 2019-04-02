<template>
	<div class="meet">
		<el-form
		ref="meetForm"
		:model="meet"
		:rules="meetRule">
			<el-form-item label="约见地址" prop="address">
				<el-input v-model="meet.address"></el-input>
			</el-form-item>
			<el-form-item label="约见时间" prop="time">
				<el-date-picker
				v-model="meet.time"
				type="datetime"
				placeholder="选择日期时间"
				prefix-icon="icon">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<div class="tip">
			<p>Tips:确定之后约见信息将无法更改，建议和卖家联系一下再进行填写，以免发纠纷!</p>
			<p>Tips:如果已经填写，也可以联系卖家商量解决方法!</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['comform'],
	data() {
		return {
			meet: {
				address: '',
				time: ''
			},
			meetRule: {
				address:[{
					required: true,
					message: '请填写地址',
					trigger: blur
				}],
				time: [{
					required: true,
					message: '请填写时间',
					trigger: blur
				}]
			}
		}
	},
	watch: {
		comform(v) {
			if (v) {
				this.$refs.meetForm.validate((valid) => {
					if (valid) {
						this.$emit('getMeetInfo', this.meet)
					} else {
						console.log('fail')
						return false
					}
				})
			}
		}
	}
}
</script>
<style lang="scss" scoped>
	.meet .tip {
		color: red;
		text-align: left;
	}
</style>

