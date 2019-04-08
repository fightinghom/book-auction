<template>
	<div class="home-set">
		<div class="btn">
			<el-button type="primary" @click="upload()">保存修改</el-button>
		</div>
		<!-- 设置轮播图 -->
		<div class="item">
			<div class="title">
				轮播图设置
				<book-picker
				@getBook="getBook($event, 'slider')">
				</book-picker>
			</div>
			<div class="book-show">
				<div class="book"
					v-if="home.slider.length > 0"
					v-for="item of home.slider"
					:key="item.id">
					<img :src="item.img" :alt="item.name">
					<div class="name">{{item.name}}</div>
					<div class="remove" @click="remove(item, 'slider')">
						<div class="icon vertical-center">
							<i class="far fa-trash-alt fa-2x"></i>
						</div>
					</div>
				</div>
				<div class="no-book" v-if="home.slider.length == 0">
					暂无图书
				</div>
			</div>
		</div>
		<!-- 设置各分类 -->
		<!-- 文学 -->
		<div class="item">
			<div class="title">
				文学设置
				<book-picker
				@getBook="getBook($event, 'literature')">
				</book-picker>
			</div>
			<div class="book-show">
				<div class="book"
					v-if="home.literature.length > 0"
					v-for="item of home.literature"
					:key="item.id">
					<img :src="item.img" :alt="item.name">
					<div class="name">{{item.name}}</div>
					<div class="remove" @click="remove(item, 'literature')">
						<div class="icon vertical-center">
							<i class="far fa-trash-alt fa-2x"></i>
						</div>
					</div>
				</div>
				<div class="no-book" v-if="home.literature.length == 0">
					暂无图书
				</div>
			</div>
		</div>
		<!-- 人文社科 -->
		<div class="item">
			<div class="title">
				人文社科设置
				<book-picker
				@getBook="getBook($event, 'socialScience')">
				</book-picker>
			</div>
			<div class="book-show">
				<div class="book"
					v-if="home.socialScience.length > 0"
					v-for="item of home.socialScience"
					:key="item.id">
					<img :src="item.img" :alt="item.name">
					<div class="name">{{item.name}}</div>
					<div class="remove" @click="remove(item, 'socialScience')">
						<div class="icon vertical-center">
							<i class="far fa-trash-alt fa-2x"></i>
						</div>
					</div>
				</div>
				<div class="no-book" v-if="home.socialScience.length == 0">
					暂无图书
				</div>
			</div>
		</div>
		<!-- 学习 -->
		<div class="item">
			<div class="title">
				学习设置
				<book-picker
				@getBook="getBook($event, 'study')">
				</book-picker>
			</div>
			<div class="book-show">
				<div class="book"
					v-if="home.study.length > 0"
					v-for="item of home.study"
					:key="item.id">
					<img :src="item.img" :alt="item.name">
					<div class="name">{{item.name}}</div>
					<div class="remove" @click="remove(item, 'study')">
						<div class="icon vertical-center">
							<i class="far fa-trash-alt fa-2x"></i>
						</div>
					</div>
				</div>
				<div class="no-book" v-if="home.study.length == 0">
					暂无图书
				</div>
			</div>
		</div>
		<!-- 杂志期刊 -->
		<div class="item">
			<div class="title">
				杂志期刊设置
				<book-picker
				@getBook="getBook($event, 'magazine')">
				</book-picker>
			</div>
			<div class="book-show">
				<div class="book"
					v-if="home.magazine.length > 0"
					v-for="item of home.magazine"
					:key="item.id">
					<img :src="item.img" :alt="item.name">
					<div class="name">{{item.name}}</div>
					<div class="remove" @click="remove(item, 'magazine')">
						<div class="icon vertical-center">
							<i class="far fa-trash-alt fa-2x"></i>
						</div>
					</div>
				</div>
				<div class="no-book" v-if="home.magazine.length == 0">
					暂无图书
				</div>
			</div>
		</div>
		<!-- 其他分类 -->
		<div class="item">
			<div class="title">
				其他分类设置
				<book-picker
				@getBook="getBook($event, 'other')">
				</book-picker>
			</div>
			<div class="book-show">
				<div class="book"
					v-if="home.other.length > 0"
					v-for="item of home.other"
					:key="item.id">
					<img :src="item.img" :alt="item.name">
					<div class="name">{{item.name}}</div>
					<div class="remove" @click="remove(item, 'other')">
						<div class="icon vertical-center">
							<i class="far fa-trash-alt fa-2x"></i>
						</div>
					</div>
				</div>
				<div class="no-book" v-if="home.other.length == 0">
					暂无图书
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import BookPicker from '@/components/picker/BookPicker.vue'
import http from '@/utils/api/index'
export default {
	data() {
		return {
			name: 'home',
			home: {
				slider: [],
				literature: [],
				socialScience: [],
				study: [],
				magazine: [],
				other: []
			},
			querySetting() {
				let self = this
				http.system.getSetting({
					name: self.name
				})
				.then(rs => {
					self.home = JSON.parse(rs.jsonStr)
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
	mounted() {
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
