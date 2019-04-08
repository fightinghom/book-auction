<template>
	<!-- :style="{'height': showCategory ? 36 * (categoryList.length + 1) + 'px' : '36px'}" -->
	<div class="auction-menu ba-basic-color-aph" :class="{'hidden-menu' : !showCategory}">
		<div class="category" @mouseover="showCategory = !showCategory"  @mouseout="showCategory = !showCategory">
			<div class="z fl">
				图书分类
			</div>
			<div class="fr"><i class="fas fa-angle-down"></i></div>
		</div>
		<div class="category-item ba-basic-color-aph"  @mouseover="showCategory = !showCategory"  @mouseout="showCategory = !showCategory">
			<el-row v-for="item of categoryList" :key="item.id">
				<div class="level-1 fl">
					<div class="z fl">
						{{item.name}}
					</div>
					<div class="fr"><i class="fas fa-angle-right"></i></div>
				</div>
				<div class="level-2 fl"><div class="fl child-link" v-for="child of item.children" :key="child.id"><span @click="toCategory(child.id)">{{child.name}}</span></div></div>
			</el-row>
		</div>
	</div>
</template>
<script>
import { list } from '@/utils/category.js'
import {mapActions, mapGetters} from 'vuex'

export default {
	data() {
		return {
			categoryList: '',
			showCategory: false
		}
	},
	methods: {
		toCategory(id) {
			this.$router.push('/book_category/' + id)
		},
		/**递归版 */
		/* fn(data, pid) {
			let result = [] , temp
			data.forEach(item => {
				if (item.pid == pid) {
					result.push(item)
					temp = this.fn(data, item.id)
					if(temp.length > 0) {
						item.children=temp
					} else {
						item.children = []
					}
				}
			})
			return result

		} */
	},
	computed: {
		...mapGetters(['getBookCategory','getUserinfo']),
	},
	mounted() {
		let list = JSON.parse(JSON.stringify(this.getBookCategory))
		list.map(item => {
			item.children.push({
				id: item.id,
				name: '其他'
			})
		})
		this.categoryList = list
	}
}
</script>
<style lang="scss" scoped>
	.hidden-menu {
		overflow: hidden;
	}
	.auction-menu {
		width: 100%;
		color: #eaedfa;
		height: 36px;
		line-height: 36px;
		.category {
			width: 80px;
			height: 36px;
			line-height: 36px;
			padding: 0 10px;
		}
		.category-item {
			width: 100%;
			text-align: left;
			.el-row {
				border-bottom: #eaedfa 1px solid;
			}
			.level-1 {
				width: 80px;
				text-align: right;
				padding: 0 10px;
				.z {
					width: 56px;
				}
			}
			.level-2 {
				width: calc(100% - 100px);
				.child-link {
					span {
						padding: 0 30px;
						border-left: #eaedfa 1px solid;
					};
					span:hover {
						cursor: pointer;
						text-decoration-line: underline;
					}
				}
			}
		}
	}
</style>
