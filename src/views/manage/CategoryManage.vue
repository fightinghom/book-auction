<template>
	<div class="ca-manage">
		<div class="operate">
			<div class="add-level-1">
				<div class="title">添加父级分类</div>
				<el-form  :model="addParentCa"  ref="addParentCaForm" :rules="addParentCaRule" :hide-required-asterisk="true">
					<el-form-item  label-width="80px" label="分类ID :" prop="id">
						<el-input v-model="addParentCa.id" type="number"></el-input>
					</el-form-item>
					<el-form-item   label-width="80px" label="分类名称 :"  prop="name">
						<el-input  v-model="addParentCa.name"></el-input>
					</el-form-item>
					<el-form-item>
						<div class="space-item"></div>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addCategory('addParentCaForm', addParentCa)">添加父级分类</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="add-level-2">
				<div class="title">添加子级分类</div>
				<el-form  :model="addChildCa" ref="addChildCaForm" :rules="addChildCaRule" :hide-required-asterisk="true">
					<el-form-item  label-width="80px" label="分类ID :" prop="id">
						<el-input v-model="addChildCa.id"></el-input>
					</el-form-item>
					<el-form-item label-width="80px" label="父级分类 :" prop="pid">
						<el-select  v-model="addChildCa.pid">
							<el-option v-for="item of categoryTree" :value="item.id" :label="item.name" :key="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item   label-width="80px" label="分类名称 :"  prop="name">
						<el-input  v-model="addChildCa.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addCategory('addChildCaForm', addChildCa)">添加子级分类</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="show">
			<div class="level-1">
				<div class="title">一级分类</div>
				<div class="row">
					<div class="col">分类ID</div>
					<div class="col">分类名称</div>
					<div class="col">仅显示该类二级分类</div>
				</div>
				<div class=" row" v-for="item of categoryTree" :key="item.id">
					<div class="col">{{item.id}}</div>
					<div class="col">{{item.name}}</div>
					<div class="col"><el-radio v-model="showChild" :label="item.id" @mouseup.native="showAll(item.id)">{{''}}</el-radio></div>
				</div>
				<div class="ca-tip">请勿添加重复的ID</div>
			</div>
			<div class="split"></div>
			<div class="level-2">
				<div class="title">二级分类</div>
				<div class="row">
					<div class="col">分类ID</div>
					<div class="col">父类ID</div>
					<div class="col">分类名称</div>
				</div>
				<div class=" row" v-for="citem of categoryChildList" :key="citem.id" v-if="showChild === citem.pid || showChild === ''">
					<div class="col">{{citem.id}}</div>
					<div class="col">{{citem.pid}}</div>
					<div class="col">{{citem.name}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import http from '@/utils/api/index'
export default {
	data() {
		return {
			categoryTree: [],
			categoryChildList: [],
			showChild: '',
			type: 'addParentCaForm',
			addParentCa: {
				id: '',
				name: ''
			},
			addChildCa: {
				id: '',
				pid: '',
				name: ''
			},
			addParentCaRule: {
				id: [
					{ required: true, message: '请输入id', trigger: 'blur'},
				],
				name: [
					{ required: true, message: '请输入名称', trigger: 'blur'},
				]
			},
			addChildCaRule: {
				id: [
					{ required: true, message: '请输入id', trigger: 'blur'},
				],
				pid: [
					{ required: true, message: '请选择父级分类', trigger: 'change'},
				],
				name: [
					{ required: true, message: '请输入名称', trigger: 'blur'},
				]
			}
		}
	},
	methods: {
		...mapActions(['setBookCategory']),
		showAll(id) {
			if(id === this.showChild) {
				this.showChild = ''
			}
		},
		addCategory(form, data) {
			let self = this
			self.$refs[form].validate((valid) => {
				if(valid) {
					//发送添加请求
					http.system.addCategory(data)
					.then(rs => {
						if(rs) {
							self.categoryChildList = []
							self.$message({
								message: '添加成功!',
								type: 'success'
							})
							self.updateCategory(form)
						} else {
							self.$message({
								message: '添加失败!',
								type: 'error'
							})
						}
					})
					.catch(value => {
						console.log(value)
					})
				} else {

				}
			})
		},
		//用于当前界面更新分类显示
		updateCategory(form) {
			if( 'addParentCaForm' === form ) {
				let data = JSON.parse(JSON.stringify(this.addParentCa))
				data.children = []
				data.pid = 0
				this.categoryTree.push(data)
				this.setBookCategory(this.categoryTree)
			}
			if( 'addChildCaForm' === form) {
				let data = JSON.parse(JSON.stringify(this.addChildCa))
				this.categoryTree = this.categoryTree.map(item => {
					if(item.id === data.pid) {
						item.children.push(data)
					}
					return item
				})
				this.updateCategoryChildList()
				this.setBookCategory(this.categoryTree)
			}
			this.$refs[form].resetFields()
		},
		updateCategoryChildList() {
			let list = []
			this.categoryTree.forEach(item => {
				item.children.map(citem => {
					list.push(citem)
				})
			})
			this.categoryChildList = list
		}
	},
	computed: {
		...mapGetters(['getBookCategory'])
	},
	created() {
		this.categoryTree = JSON.parse(JSON.stringify(this.getBookCategory))
		this.updateCategoryChildList()
	}
}
</script>
<style lang="scss" scoped>
	.operate {
		display: flex;
		.add-level-1, .add-level-2 {
			flex: 1;
			padding: 0 50px;
			.title {
				text-align: left;
				font-size: 18px;
				padding: 5px 0;
				color: #647bec;
			}
		}
	}
	.show {
		display: flex;
		display: -webkit-flex;
		padding-bottom: 20px;
		 .level-1, .level-2 {
			 flex: 1;
			 .title {
				 height: 40px;
				 line-height: 40px;
				  border: 1px #c0c4cc solid;
				  font-size: 20px;
				  color: #647bec;
			 }
			 .row {
				 height: 30px;
				 display: flex;
				 line-height: 30px;
				 border-bottom: 1px #c0c4cc solid;
				 .col {
					 flex: 1;
					 box-sizing: border-box;
					 border-right: 1px #c0c4cc solid;
					 &:first-child {
						 border-left: 1px #c0c4cc solid;
					 }
				 }
			 }
			 .ca-tip {
				 padding: 10px 0;
				 font-size: 20px;
				 color: red;
			 }
		 }
	 }
	 .split {
			 width: 2px;
			 margin: 0 5px;
	}
	.el-button {
		width: 100%;
	}

	.space-item {
		height: 40px;
	}
</style>
