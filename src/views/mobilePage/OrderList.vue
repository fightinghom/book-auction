<template>
	<div class="list">
		<div class="type">
			<div class="item" @click="changeType('purchase')">
				<span :class="{'on': 'purchase' === type}">竞购</span>
			</div>
			<div class="item" @click="changeType('sell')">
				<span :class="{'on': 'sell' === type}">竞卖</span>
			</div>
			<div class="item" @click="changeType('manage')" v-if="getUserinfo.power > 0">
				<span :class="{'on': 'manage' === type}">管理</span>
			</div>
		</div>
		<div class="choice">
			<el-select v-model="paginationBody.orderStauts" placeholder="请选择" @change="statusChange()">
				<el-option :label="'全部'" :value="0"></el-option>
				<el-option :label="'待完善'" :value="1"></el-option>
				<el-option :label="'待确认'" :value="2"></el-option>
				<el-option :label="'交易中'" :value="3"></el-option>
				<el-option :label="'交易完成'" :value="6"></el-option>
				<el-option :label="'交易取消'" :value="7"></el-option>
				<el-option :label="'交易停滞'" :value="96"></el-option>
			</el-select>
		</div>
		<div class="data-list" v-loading="getLoading">
			<div class="item item-shadow"
			v-if="'manage' === type ? ((item.sellerId == paginationBody.userId || item.getterId == paginationBody.userId) ? false : true) : true"
			v-for="item of orderList"
			:key="item.oNumber"
			@click="toOrder(item.oNumber)">
				<div class="time">{{item.createTime.split(' ')[0]}}</div>
				<div class="book">
					<img :src="item.bookDetail.img" :alt="item.bookDetail.name">
					<div class="info">
						<div class="text">{{item.bookDetail.name}}</div>
						<div class="text">{{item.bookDetail.author}}</div>
					</div>
				</div>
				<div class="btn" v-if="'manage' != type">
					<el-button  v-if="item.status == 3" type="info" size="mini" @click.stop="getCode(item.oNumber, 'get')">获取交易码</el-button>
					<el-button  v-if="item.status == 3" type="primary" size="mini" @click.stop="vertifyCode(item.oNumber, 'vertify')">填写交易码</el-button>
					<el-button  v-if="item.status != 6 && item.status != 7" type="warning" size="mini">联系管理</el-button>
				</div>
				<div class="code" :class="{'code-open': item.oNumber === codeOp.oNumber}" @click.stop="'#'">
					<div class="header-bar">
						<div class="title">{{codeOp.title}}</div>
						<div class="narrow vertical-center" @click="narrow()">
							<i class="fas fa-times"></i>
						</div>
					</div>
					<div class="get-code" v-if="codeOp.type === 'get'">
						<p>{{codeOp.value}}</p>
					</div>
					<div class="vertify-code vertical-center" v-if="codeOp.type === 'vertify'">
						<input v-model="codeOp.enter" type="number" placeholder="请输入6位验证码">
					</div>
					<div class="footer-bar">
						<el-button  v-if="codeOp.type === 'vertify'" type="primary" size="mini" @click="comformCode(this)">确定</el-button>
						<el-button type="info" size="mini"  @click="narrow()">取消</el-button>
					</div>
				</div>
			</div>
			<div class="loadmore can-click" @click="loadmore()" v-if="!nomore">点击继续加载</div>
			<div class="loadmore" v-if="nomore">没有数据了</div>
		</div>
	</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import http from '@/utils/api/index'
export default {
	data() {
		return {
			mode: 'newList',
			type: 'purchase',
			role: 'getter',
			orderList: [],
			nomore: false,
			codeOp: {
				oNumber: '',
				type: '',
				value: '',
				title: '',
				enter: ''
			},
			paginationBody: {
				orderStauts: 0,
				userId: '',
				number: 8,
				nowPage: 1,
			},
			queryOrderList() {
				let self = this
				let type = self.type
				let mode = self.mode
				let params = {
					orderStauts: self.paginationBody.orderStauts,
					number: self.paginationBody.number,
					nowPage: self.paginationBody.nowPage
				}
				if( 'purchase' === type ) {
					params.getterId = self.paginationBody.userId
				}
				if('sell' === type) {
					params.sellerId = self.paginationBody.userId
				}
				self.setLoading(true)
				http.sell.getOrderList(params)
				.then(rs => {
					if(rs.length != self.paginationBody.number) {
						this.nomore = true
					}
					rs.map(item => {
						item.bookDetail.img = JSON.parse(item.bookDetail.img)[0]
					})
					if('newList' === mode) {
						self.orderList = rs
					}
					if('pushList' === mode) {
						self.orderList = self.orderList.concat(rs)
					}
					self.setLoading(false)
				})
				.catch(value => {
					self.setLoading(false)
					console.log(value)
				})
			}
		}
	},
	methods: {
		...mapActions(['setLoading', 'setMemoryPage']),
		changeType(v) {
			this.nomore = false
			this.type = v
			this.role = 'purchase' === v ? 'getter' : ('sell' === v ? 'seller' : 'manager')
			console.log(v)
			this.paginationBody.orderStauts = 0
			this.paginationBody.nowPage = 1
			this.mode = 'newList'
			this.queryOrderList()
		},
		statusChange() {
			this.nomore = false
			this.mode = 'newList'
			this.paginationBody.nowPage = 1
			this.queryOrderList()
		},
		loadmore() {
			this.nomore = false
			this.mode = 'pushList'
			this.paginationBody.nowPage += 1
			console.log(this.paginationBody.nowPage)
			this.queryOrderList()
		},
		getCode(orderNo, type) {
			let self = this
			self.codeOp.oNumber = orderNo
			self.codeOp.type = type
			self.codeOp.title = 'getter' === self.role ? '收货码' : '送货码'
			let params = {
				type: self.role,
				no: orderNo
			}
			http.common.getOrderCode(params)
			.then(rs => {
				self.codeOp.value = rs

			})
			.catch(value => {
				console.log(value)
			})
		},
		vertifyCode(orderNo, type) {
			let self = this
			self.codeOp.oNumber = orderNo
			self.codeOp.type = type
			self.codeOp.title = 'getter' === self.role ? '请输入送货码' : '请输入收货码'
		},
		comformCode() {
			let self = this
			let code = self.codeOp.enter
			if(6 == code.length) {
				let params = {
					type: self.role,
					no: self.codeOp.oNumber,
					code: code
				}
				http.common.vertiryOrderCode(params)
				.then(rs => {
					self.$message[rs.type](rs.message)
					if('success' === rs.type) {
						self.narrow()
					}
				})
				.catch(value => {
					console.log(value)
				})
			} else {
				self.$message.warning('验证码位数不正确!')
			}

		},
		toOrder(v) {
			let pageInfo = {}
			pageInfo.componentName = this.$route.name
			pageInfo.mode = this.mode
			pageInfo.type = this.type
			pageInfo.role = this.role
			pageInfo.nomore = this.nomore
			pageInfo.paginationBody = this.paginationBody
			this.$router.push({path: '/detail/'+ v, query: {prevPage: pageInfo}})
		},
		narrow() {
			this.codeOp.oNumber = ''
			this.codeOp.enter = ''
			this.codeOp.value = ''
			this.codeOp.title = ''
			this.codeOp.type = ''
		}
	},
	computed: {
		...mapGetters(['getUserinfo', 'getLoading', 'getMemoryPage'])
	},
	mounted() {
		let memory = this.getMemoryPage
		this.nomore = false
		if(this.$route.name == memory.componentName) {
			this.mode = memory.mode
			this.type = memory.type
			this.role = memory.role
			this.nomore = memory.nomore
			this.paginationBody = JSON.parse(JSON.stringify(memory.paginationBody))
			if(memory.paginationBody.nowPage > 1) {
				this.paginationBody.nowPage = 0
				for(let i = 0; i < memory.paginationBody.nowPage; i++) {
					this.loadmore()
				}
			} else {
				this.queryOrderList()
			}
			return ;
		} else {
			this.paginationBody.userId = this.getUserinfo.id
			this.queryOrderList()
		}
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
	.list {
		display: flex;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		flex-direction: column;
		position: relative;

		.type {
			height: 10.66vw;
			width: inherit;
			display: flex;
			color: #b9beda;
			line-height:10.66vw;
			.item {
				flex: 1;
				font-size: 5.33vw;
				border-bottom: 1px #b9beda solid;
				border-left: 1px #b9beda solid;
				&:first-child {
					border-left: none;
				}
			}
		}
		.data-list {
			flex: 1 1;
			.loadmore {
				padding: 2.66vw;
				font-size: 5.33vw;
			}
			.can-click {
				&:hover {
					cursor: pointer;
				}
			}
			.item {
				margin-top: 10px;
				box-sizing: border-box;
				position: relative;
				.time {
					padding: 0 5px;
					text-align: left;
					font-size: 5vw;
					background: $basic-color;
					color: #fff;
				}
				.book {
					display: flex;
					padding: 10px 0;
					img {
						width: 23vw;
						height: 23vw;
					}
					.info {
						flex: 1;
						.text {
							text-align: left;
							&:first-child {
								font-size: 5vw;
							}
						}
					}
				}
				.btn {
					padding: 10px 5px;
					text-align: left;
				}
			}
		}
		.choice, .data-list {
			padding: 5px;
		}
	}
	.on {
		color: $basic-color;
		border-bottom: 2px $basic-color solid;
	}
	.item-shadow {
		box-shadow: 0 0 10px 0 #cccccc;;
	}
	.code {
		position: absolute;
		top: 0;
		width: 0px;
		bottom: 0;
		z-index: 3;
		transition: 0.2s;
		overflow: hidden;
		background: rgba($color: #ffffff, $alpha: 0.9);
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding-bottom: 10px;
		.header-bar {
			height: 30px;
			background: rgba($color: $basic-color, $alpha: 0.9);
			line-height: 30px;
			color: #fff;
			.title {
				float: left;
				padding: 0 10px;
				font-size: 20px;
			}
			.narrow {
				width: 30px;
				height: inherit;
				float: right;
				&:hover {
					cursor: pointer;
				}
			}
		}
		.footer-bar {
			height: 30px;
			text-align: right;
			padding: 0 10px;
		}
		.get-code, .vertify-code {
			flex: 1 1;
		/* 	display: flex;
			flex-direction: column; */
		}
		.get-code {
			p{
				/* flex: 1 1; */
				font-size: 50px;
				color: red;
				padding: 20px;
				box-sizing: border-box;
			}
		}
	}
	.code-open {
		width: 100%;
	}
	input {
		width: 150px;
		height: 50px;
		background: transparent;
		font-size: 20px;
		text-align: center;
	}
</style>

