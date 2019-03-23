<template>
	<div class="category-picker">
		<span v-for="item of list" :key="item.id">
			<el-option
				:class="{'pad-lf-20': item.pid !==0, 'split': item.pid ===0}"
				:label="item.name"
				:value="item.id">
			</el-option>
			<span v-if="item.children.length > 0">
				<category-picker-option :list="item.children"></category-picker-option>
			</span>
		</span>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
	name:'CategoryPickerOption',
	props: ['list'],
}
</script>
<style lang="scss" scoped>
	.split {
		border-bottom: 1px solid #000;
	}
</style>
