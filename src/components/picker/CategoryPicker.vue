<template>
	<div class="category-picker">
		<el-select v-model="selectValue" placeholder="请选择">
			<category-picker-option :list="catagoryList"></category-picker-option>
		</el-select>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import CategoryPickerOption from './CategoryPickerOption'
export default {
	props: ['category'],
	data() {
		return {
			catagoryList: [],
			selectValue: ''
		}
	},
	components: {
		CategoryPickerOption
	},
	computed: {
		...mapGetters(['getBookCategory'])
	},
	watch: {
		selectValue(v) {
			this.$emit('getCategoryValue', v)
		},
		category(v) {
			this.selectValue = v
		}
	},
	mounted() {
		this.catagoryList = this.getBookCategory
	}
}
</script>
<style lang="scss" scoped>

</style>
