<template>
	<div class="create-book" v-loading="getLoading">
		<el-form
		:model="bookDetail"
		label-width="90px"
		:rules="rule"
		ref="form1"
		:hide-required-asterisk="true">
			<el-form-item label="书名 :" prop="name">
				<el-input v-model.trim="bookDetail.name" maxlength="50"></el-input>
			</el-form-item>
			<el-form-item label="作者 :" prop="author">
				<el-input v-model.trim="bookDetail.author"  maxlength="50"></el-input>
			</el-form-item>
			<el-form-item label="保证金 :" prop="deposit">
				<el-input type="number" v-model="bookDetail.deposit"></el-input>
			</el-form-item>
		</el-form>
		<el-form
		:model="bookDetail"
		label-width="90px"
		:rules="rule"
		ref="form2"
		:hide-required-asterisk="true">
			<el-form-item label="类别 :" prop="category">
				<category-picker :category="bookDetail.category" @getCategoryValue="getCaValue($event)"></category-picker>
			</el-form-item>
			<el-form-item label="起拍价 :"  prop="startPrice">
				<el-input type="number" v-model="bookDetail.startPrice"></el-input>
			</el-form-item>
			<el-form-item label="加价幅度 :"  prop="increaseRange">
				<el-input type="number" v-model="bookDetail.increaseRange"></el-input>
			</el-form-item>
		</el-form>
		<el-form
		:model="bookDetail"
		label-width="90px"
		:rules="rule"
		ref="form3"
		:hide-required-asterisk="true">
			<!-- <el-form-item>
				<el-radio-group v-model="auctionTimeModel" size="medium">
					<el-radio label="0">按结束日期</el-radio>
					<el-radio label="1" :disabled="true">按选择时长</el-radio>
				</el-radio-group>
			</el-form-item> -->
			 <!-- v-if="auctionTimeModel == 0" -->
			<el-form-item label="结束时间 :" prop="endTime">
				<el-date-picker
				v-model="bookDetail.endTime"
				type="datetime"
				placeholder="选择日期时间"
				prefix-icon="icon">
				</el-date-picker>
			</el-form-item>
			<!-- <el-form-item label="拍卖时间 :"  v-if="auctionTimeModel == 1">
				<el-input v-model="bookDetail.duration" placeholder="按选择时长"></el-input>
			</el-form-item> -->
		</el-form>
		<el-form
		:model="bookDetail"
		label-width="90px"
		:rules="rule"
		ref="form4"
		:hide-required-asterisk="true">
			<el-form-item label="描述 :" prop="description">
				<el-input type="textarea" rows="5" v-model.trim="bookDetail.description"></el-input>
			</el-form-item>
			<el-form-item label="商品图片 :" prop="imgs">
				<book-add-img-list  :imgList="bookDetail.imgs" @imgs="getImgs($event)"></book-add-img-list>
			</el-form-item>
		</el-form>
		<div class="create-btn">
			<el-button @click="upload(['form1', 'form2', 'form3', 'form4'])" type="primary" :disabled="!getInfoComplete">创建拍品</el-button>
			<div class="comp-info" v-if="!getInfoComplete">请先完善个人信息</div>
		</div>
	</div>
</template>
<script>
import BookAddImgList from '@/components/img/BookAddImgList.vue'
import CategoryPicker from '@/components/picker/CategoryPicker.vue'
import http from '@/utils/api/index.js'
import {mapActions, mapGetters} from 'vuex'
import {validate} from '@/utils/validate.js'

export default {
	data() {
		return {
			showImg: require('@/assets/image/default-book-img.jpg'),

			bookDetail: {
				name: '',
				author: '',
				category: '',
				description: '',
				duration: '',
				startPrice: '',
				endTime: '',
				imgs: [],
				sellerId:'',
				deposit:'',
				increaseRange: ''

			},
			rule: {
				name: validate.book.name,
				author: validate.book.author,
				category: validate.book.category,
				description: validate.book.description,
				startPrice: validate.book.startPrice,
				endTime: validate.book.endTime,
				imgs: validate.book.img,
				deposit: validate.book.deposit,
				increaseRange: validate.book.increaseRange
			},
			auctionTimeModel: '0',
		}
	},
	components: {
		BookAddImgList,
		CategoryPicker
	},
	computed: {
		...mapGetters(['getUserinfo', 'getLoading', 'getInfoComplete'])
	},
	methods: {
		...mapActions(['setLoading']),
		upload(forms) {
			let self = this
			let bookDetail = JSON.parse(JSON.stringify(this.bookDetail))
			let resultList = []
			/**
			 * 多表单同时验证，运用Promise.all全部resolve才会通过验证
			 */
			forms.map(form => {
				resultList.push(self.valid(form))
			})

			self.setLoading(true)
			Promise.all(resultList)
			.then(() => {
				bookDetail.sellerId =  this.getUserinfo.id
				bookDetail.endTime = new Date(bookDetail.endTime).getTime()
				bookDetail.description = bookDetail.description.replace(/\n|\r|↵/g, '<br />')
				bookDetail.imgs = bookDetail.imgs.map(item => {
					return item.split(',')[1]
				})
				http.sell.addBook(bookDetail)
				.then(rs => {
					self.setLoading(false)
					self.$message({
						message: rs.message,
						type: rs.type
					})
					if(rs.type === 'success'){
						forms.map(form => {
						self.$refs[form].resetFields()
					})
						self.bookDetail.imgs = []
						self.bookDetail.category = ''
						}
					})
				.catch(value => {
					self.setLoading(false)
					console.log(value)
				})
			})
			.catch(() => {
				self.setLoading(false)
			})
		},
		getImgs(v) {
			this.bookDetail.imgs = v
		},
		getCaValue(v) {
			this.bookDetail.category = v
		},
		valid(form) {
			let self = this
			let result = new Promise((resolve, reject) => {
				self.$refs[form].validate(valid => {
					if(valid) {
						resolve()
					} else {
						reject()
					}
				})
			})
			return result
		},
	},
	mounted() {
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
.el-form {
	width: 340px;
	margin: 0 auto;
	display: inline-block;
	margin-top: 30px;
}
.el-form:nth-child(n+3){
	width: 680px;
	display: block;
}
.el-input__inner {
	text-align: center !important;
}
.el-button {
	width: 680px;
}
.create-book {
	width: 70%;
	margin: 0 auto;
	min-width: 966px;
	background: $panel-bg-color;
	padding: 20px 0;
	.create-btn {
		padding-left: 20px;
	}

}

.comp-info {
	padding: 10px 0;
	color: red;
}
</style>
