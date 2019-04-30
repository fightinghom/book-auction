<template>
	<div class="home-set" v-if="ready">
		<div class="btn">
			<el-button type="primary" @click="upload()">保存修改</el-button>
		</div>
		<!-- 设置各分类 -->
		<div class="item" v-for="(item, key, index) of home" :key="index">
			<div class="title">
				{{ key|getCategoryName(getBookCategory)}}设置
				<book-picker
				@getBook="getBook($event, key)">
				</book-picker>
			</div>
			<div class="book-show">
				<div class="book"
					v-if="home[key].length > 0"
					v-for="item of home[key]"
					:key="item.id">
					<img :src="item.img" :alt="item.name">
					<div class="name">{{item.name}}</div>
					<div class="remove" @click="remove(item, key)">
						<div class="icon vertical-center">
							<i class="far fa-trash-alt fa-2x"></i>
						</div>
					</div>
				</div>
				<div class="no-book" v-if="home[key].length == 0">
					暂无图书
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import BookPicker from '@/components/picker/BookPicker.vue'
import http from '@/utils/api/index'
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			name: 'home',
			home: {

			},
			ready: false,
			querySetting() {
				let self = this
				http.system.getSetting({
					name: self.name
				})
				.then(rs => {
					rs =  JSON.parse(rs.jsonStr)
					for(let key in rs) {
						console.log(self.home[key])
						if(typeof self.home[key] !== 'undefined'){

							self.home[key] = rs[key]
						}
					}
					self.ready = true
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	components: {
		BookPicker
	},
	methods: {
		//v为图书ID，c为图片所放区域
		getBook(v, c) {
			let self = this
			let arr = self.home[c]
			let exit = arr.some(item => {
				return item.id === v.id
			})
			if( !exit ) {
				self.home[c].push(v)
			}
		},

		upload() {
			let self = this
			let jsonStr = JSON.stringify(self.home)
			http.system.updateSetting({
				name: self.name,
				set: jsonStr
			})
			.then(rs => {
				self.$message({
					type: rs.type,
					message: rs.message
				})
				self.querySetting()
			})
			.catch(value => {
				console.log(value)
			})
		},
		remove(v, c) {
			let arr = this.home[c]
			let index = arr.indexOf(v)
			arr.splice(index, 1)
		}
	},
	computed: {
		...mapGetters(['getBookCategory'])
	},
	filters: {
		getCategoryName(v, list) {
			let name = ''
			list.map(ca => {
				if (v === ca.mark) {
					name = ca.name
				}
			})
			if(name === '') {
				name = '轮播图'
			}
			return name
		}
	},
	mounted() {
		let home = {
			slider: []
		}
		this.getBookCategory.map(ca => {
			home[ca.mark] = []
		})
		this.home = home
		this.querySetting()
	}
}
</script>
<style lang="scss" scoped>
	.btn {
		padding: 10px;
		text-align: left;
	}
	.item {
		.title {
			font-size: 20px;
			text-align: left;
			padding: 10px;
		}
		.book-show {
			text-align: left;
			.book {
				padding: 10px;
				width: 100px;
				display: inline-block;
				overflow: hidden;
				position: relative;
				&:hover {
					.remove {
						display: block;
						cursor: pointer;
					}
				}
				img {
					width: 100px;
					height: 100px;
				}
				.name {
					width: 100%;
					word-break:keep-all;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
					text-align: center;

				}
				.remove {
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					z-index: 5;
					background-color:rgba($color: #666, $alpha: 0.4);
					display: none;
					color: #fff;
					.icon {
						width: 100%;
						height: 100%;
					}
				}
			}
			.no-book {
				width: 100px;
				text-align: center;
			}
		}
	}
</style>
