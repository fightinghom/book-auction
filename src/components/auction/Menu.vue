<template>
	<!-- :style="{'height': showCategory ? 36 * (categoryList.length + 1) + 'px' : '36px'}" -->
	<div class="auction-menu ba-basic-color-aph" :class="{'hidden-menu' : !showCategory}">
		<div class="category">
			<div class="open"  @mouseover="showCategory = !showCategory"  @mouseout="showCategory = !showCategory">
				<div>
				图书分类
				</div>
				<div class="icon"><i class="fas fa-angle-down"></i></div>
			</div>
			<div class="ca-name">
				{{categoryName}}
			</div>
			<div class="select">
				<div class="select-box">
					<input type="text" placeholder="请输入关键字" v-model="searchText" @keyup.enter="search()"/>
				</div>
				<div class="icon" @click="search()"><i class="fas fa-search"></i></div>
			</div>
		</div>
		<div class="category-item ba-basic-color-aph"  @mouseover="showCategory = !showCategory"  @mouseout="showCategory = !showCategory">
			<el-row v-for="item of categoryList" :key="item.id">
				<div class="level-1 fl">
					<div class="z fl">
						{{item.name}}
					</div>
					<div class="fr"><i class="fas fa-angle-right"></i></div>
				</div>
				<div class="level-2 fl"><div class="fl child-link" v-for="child of item.children" :key="child.id"><span @click="toCategory(child.id, child.name)">{{child.name}}</span></div></div>
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
			searchText: '',
			showCategory: false,
			categoryName: ''
		}
	},
	methods: {
		toCategory(id,name) {
			this.categoryName = name
			this.$router.push('/book_category/' + id)
		},
		search() {
			let searchText = this.searchText
			if(this.searchText != '') {
				this.categoryName = searchText
				this.$router.push({path: '/book_category/search', query: {search: searchText}})
			}
		}
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
	watch: {
		getBookCategory(v) {

			let list = JSON.parse(JSON.stringify(v))
			if (v != null) {
				list.map(item => {
					item.children.push({
						id: item.id,
						name: '其他'
					})
				})
				this.categoryList = list
			}
		},
		'$route' (to, from) {
			console.log(to.name)
			if (to.name === 'AuctionMain') {
				this.categoryName = ''
			}
		}
	},
	mounted() {
		let list = JSON.parse(JSON.stringify(this.getBookCategory))
		if (this.getBookCategory != null) {
			list.map(item => {
				item.children.push({
					id: item.id,
					name: '其他'
				})
			})
			this.categoryList = list
		}
	}
}
</script>
<style lang="scss" scoped>
	.hidden-menu {
		overflow: hidden;
	}
	.auction-menu {
		width: 70%;
		min-width: 966px;
		color: #eaedfa;
		height: 36px;
		line-height: 36px;
		margin: 0 auto;
		.category {
			height: 36px;
			padding: 0 10px;
			display: flex;
			.open {
				display: flex;
				width: 80px;
				padding: 0 10px;
				.icon {
					padding: 0 5px;
				}
			}
			.select {
				display: flex;
				flex: 1 1;
				justify-content: flex-end;
				.select-box {
					width: 256px;
				}
				.icon {
					box-sizing: border-box;
					width: 36px;
					padding: 0 10px;
					&:hover {
						cursor: pointer;
						background: rgba($color: #666, $alpha: 0.5);
					}
				}
			}
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
	input {
		width: inherit;
		height: 30px;
		box-sizing: border-box;
		transform: translateY(-2px);
		background: transparent;
		color: #eaedfa;
		border-bottom: 1px #eaedfa solid;
		padding: 0 5px;
	}

	input::-webkit-input-placeholder{
            color:#eaedfa;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#eaedfa;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#eaedfa;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
            color:#eaedfa;
        }
</style>
