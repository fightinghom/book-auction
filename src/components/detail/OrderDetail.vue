<template>
	<div class="order-detail">
		<!-- 步骤条 -->
		<div class="item item-shadow animated delay-1">
			<ba-step v-if="step.length > 0 && stepUpdate">
				<ba-step-item
				v-for="(item, index) of step"
				:key="index"
				:type="item.type">
				{{item.text}}{{item.type === 'failed' ? '(' + item.reason + ')' : ''}}
				</ba-step-item>
			</ba-step>
		</div>
		<!-- 订单信息 -->
		<div class="item item-shadow animated delay-2">
			<div class="title">订单信息</div>
			<div class="info">
				<div class="info-item">
					<div class="column">订单编号:</div>
					<div class="value">{{order.oNumber}}</div>
				</div>
				<div class="info-item">
					<div class="column">订单状态:</div>
					<div class="value">{{statusText}}</div>
				</div>
				<div class="info-item">
					<div class="column focus">成交价格:</div>
					<div class="value"><span class="focus">{{order.actualPrice}}</span><span class="focus">￥</span> </div>
				</div>
			</div>
		</div>
		<!-- 图书信息 -->
		<div class="item item-shadow  animated delay-3"  v-if="order.bookDetail">
			<div class="title">图书信息</div>
			<div class="info">
				<div class="info-item">
					<div class="column">图书编号:</div>
					<div class="value">{{order.bookId}}</div>
				</div>
				<div class="info-item">
					<div class="column">图书名称:</div>
					<div class="value">{{order.bookDetail.name}}</div>
				</div>
				<div class="info-item">
					<div class="column">作者:</div>
					<div class="value">{{order.bookDetail.author}}</div>
				</div>
				<div class="info-item">
					<div class="column focus">最高价格:</div>
					<div class="value"><span class="focus">{{order.bookDetail.getterPrice}}</span><span class="focus">￥</span></div>
				</div>
			</div>
		</div>
		<!-- 卖家信息 -->
		<div class="item item-shadow animated delay-4"  v-if="'getter' === role">
			<div class="title">卖家信息</div>
			<div class="info">
				<div class="info-item">
					<div class="column">卖家编号:</div>
					<div class="value">{{seller.id}}</div>
				</div>
				<div class="info-item">
					<div class="column">卖家名称:</div>
					<div class="value">{{seller.name}}</div>
				</div>
				<div class="info-item">
					<div class="column">联系方式:</div>
					<div class="value">{{seller.phone}}</div>
				</div>
			</div>
		</div>
		<!-- 买家信息 -->
		<div class="item item-shadow animated delay-5"  v-if="'seller' === role">
			<div class="title">买家信息</div>
			<div class="info">
				<div class="info-item">
					<div class="column">买家编号:</div>
					<div class="value">{{getter.id}}</div>
				</div>
				<div class="info-item">
					<div class="column">买家名称:</div>
					<div class="value">{{getter.name}}</div>
				</div>
				<div class="info-item">
					<div class="column">联系方式:</div>
					<div class="value">{{getter.phone}}</div>
				</div>
			</div>
		</div>
		<!-- 约见信息 -->
		<div class="item item-shadow animated delay-6"  v-if="seller">
			<div class="title">约见信息</div>
			<div class="info">
				<div class="info-item">
					<div class="column">约见时间:</div>
					<div class="value">{{order.meetTime ? order.meetTime.split('.')[0] : ''}}</div>
				</div>
				<div class="info-item">
					<div class="column">约见地点:</div>
					<div class="value">{{order.meetAddress}}</div>
				</div>
			</div>
			<div class="tip focus" v-if="!(null != order.meetAddress && null != order.meetTime)  && 'getter' == role">
				Tips:请尽快完善约见信息，否则将视作放弃交易。如果造成交易关闭，您的保证金将作为卖家的赔偿，并且得到信誉度惩罚!
			</div>
			<div class="tip focus" v-if="'seller' === role">
				Tips:请先确认约见时间和地点是否合理，如不合理，联系买家进行商量,若合理，请尽快确认订单，以免超时!
			</div>
		</div>
		<!-- 操作按钮 -->
		<div class="item item-shadow animated delay-7">
			<div class="btn">
				<el-button type="primary" v-if="1 == order.status && 'getter' == role" @click="meetInfo = true">完善订单</el-button>
				<el-button type="success" v-if="2 == order.status && 'seller' == role" @click="comformOrder()">确认订单</el-button>
				<el-button type="primary" v-if="3 == order.status && 'seller' == role" @click="getCode()">获取送货码</el-button>
				<el-button type="primary" v-if="3 == order.status && 'getter' == role" @click="getCode()">获取收货码</el-button>
				<el-button type="success" v-if="3 == order.status && 'getter' == role" @click="vertifyCode()">填写送货码</el-button>
				<el-button type="success" v-if="3 == order.status && 'seller' == role" @click="vertifyCode()">填写收货码</el-button>
				<el-button type="info" >联系管理</el-button>
				<el-button type="danger" v-if="order.status <= 4" @click="cancelOrder()">取消订单</el-button>
				<el-button type="primary" v-if="order.status <= 4 && 'manager' === role" @click="breakOrder('seller')">卖家违约</el-button>
				<el-button type="warning" v-if="order.status <= 4 && 'manager' === role" @click="breakOrder('getter')">买家违约</el-button>
			</div>
			<div class="tip focus">	Tips:如果您取消订单，您的保证金会作为卖家的赔偿!</div>
		</div>
		<el-dialog
		width="100%"
		:visible.sync="meetInfo"
		title="约见信息"
		custom-class="ba-bg-color max-w-600">
			<ba-meet
			:comform="meetComform"
			@getMeetInfo="getMeetInfo($event)">
			</ba-meet>
			<div slot="footer">
				<el-button type="primary" @click="meetComform = true">确定</el-button>
				<el-button @click="meetInfo = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import BaStep from '@/components/step/Step'
import BaStepItem from '@/components/step/StepItem'
import BaMeet from '@/components/dialog/CompleteMeet'
import orderStep from '@/components/step/OrderDetailStep'

import http from '@/utils/api/index'
import orderStatusUtils from '@/utils/orderStatus.js'
import {mapActions, mapGetters} from 'vuex'
export default {
	data() {
		return {
			active: -1,
			orderNo: '',
			order: {},
			getter: {},
			seller: {},
			role: '',
			meetInfo: false,
			meetComform: false,
			stepUpdate: true,
			step:[],
			queryOrderDetail() {
				let self = this
				http.purchase.getOrderDetail({
					orderNo: self.orderNo
				})
				.then(rs => {
					self.order = rs.order
					self.step = orderStep.initStep(rs.order.status, rs.order.cancelReason)
					self.getter = rs.getter
					self.seller = rs.seller
					if(rs.getter.id === self.getUserinfo.id) {
						self.role = 'getter'
					} else if(rs.seller.id === self.getUserinfo.id) {
						self.role = 'seller'
					} else if(self.getUserinfo.power > 0) {
						self.role = 'manager'
					}
					self.stepReset()
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	components: {
		BaStep,
		BaStepItem,
		BaMeet
	},
	methods: {
		getMeetInfo(v) {
			let self = this
			self.meetInfo = false
			self.meetComform = false
			let meetTime = v.time.getTime()


			let params = {
				no: self.orderNo,
				meetAddress: v.address,
				meetTime: meetTime,
			}

			http.purchase.updateMeet(params)
			.then(rs => {
				if (rs) {
					console.log('已完善')
					self.queryOrderDetail()
				} else {
					console.log('failed')
				}
			})
			.catch(value => {
				console.log(value)
			})
		},
		comformOrder() {
			let self = this
			let params = {
				type: 'sellerComform',
				no: self.orderNo,
				status: self.order.status
			}

			http.sell.comformOrder(params)
			.then(rs => {
				if(rs) {
					console.log('已确认')
					self.queryOrderDetail()
				}
			})
			.catch(value => {
				console.log(value)
			})
		},
		stepReset() {
			this.stepUpdate = false
			this.$nextTick(() => {
				this.stepUpdate = true
			})
		},
		getCode() {
			let self = this
			let params = {
				type: self.role,
				no: self.orderNo
			}
			http.common.getOrderCode(params)
			.then(rs => {
				self.$alert(rs, 'getter' === self.role ? '收货码' : '送货码', {
					confirmButtonText: '确定',
					callback: action => {

					}
				})
			})
			.catch(value => {
				console.log(value)
			})
		},
		vertifyCode() {
			let self = this

			self.$prompt('请输入' + ('getter' === self.role ? '送货码' : '收货码'),'验证', {
				confirmButtonText: '确定',
				 cancelButtonText: '取消',
				 inputType: 'number',
				 inputPattern: /^\d{6}$/,
				 inputErrorMessage: '验证码为6为数字'
			})
			.then(value => {
				let params = {
					type: self.role,
					no: self.orderNo,
					code: value.value
				}
				http.common.vertiryOrderCode(params)
				.then(rs => {
					self.$message[rs.type](rs.message)
				})
				.catch(value => {
					console.log(value)
				})
			})
			.catch(() => {

			})
		},
		cancelOrder() {
			let self = this
			let params = {
				type: self.role + 'Cancel',
				no: self.orderNo,
				status: self.order.status
			}

			http.common.cancelOrder(params)
			.then(rs => {
				if(rs) {
					console.log('已取消')
					self.queryOrderDetail()
				}
			})
			.catch(value => {
				console.log(value)
			})
		},
		breakOrder(v) {
			let self = this
			let params = {
				type: v + 'Break',
				no: self.orderNo
			}

			http.manage.break(params)
			.then(rs => {
				if(rs) {
					console.log('违约')
					self.queryOrderDetail()
				}
			})
			.catch(value => {
				console.log(value)
			})
		},
	},
	computed: {
		...mapGetters(['getUserinfo']),
		statusText() {
			return orderStatusUtils.getOrderStatusText(this.order.status)
		}
	},
	created() {
		this.orderNo = this.$route.params.oid
		this.queryOrderDetail()

	}
}
</script>
<style lang="scss" scoped>
	@import '@/assets/css/theme.scss';
	.order-detail {
		.item {
			padding: 20px 0;
			box-sizing: border-box;
			margin-top: 20px;
			position: relative;
			z-index: 3;
			transform: translateX(1500px);
			.title {
				padding: 10px 20px;
				text-align: left;
				font-size: 20px;
				color: $basic-color
			}
			.info {
				padding: 10px 20px;
				display: flex;
				text-align: left;
				flex-wrap: wrap;
				.info-item {
					width: 33.333%;
					.column {
						float: left;
						padding-right:  10px;
						box-sizing: border-box;
						width: 30%;
					}
					.value {
						float: left;
						padding: 0 10px;
						box-sizing: border-box;
						width: 70%;
						word-break: break-all;
					}
				}
			}
			.tip {
				padding: 10px 20px;
				text-align: left;
			}
			.btn {
				padding: 10px 20px;
				text-align: left;
			}
		}
		.item::before {
			content: '';
			position: absolute;
			background: $basic-color;
			top: -2px;
			height: 2px;
			left: 0;
			right: 0;
		}
	}

	.item-shadow {
		box-shadow: 0 0 10px 0 #cccccc;;
	}

	.focus {
		color: red !important;
	}

	.animated{
		-webkit-animation: animate 0.5s 1;
		-webkit-animation-fill-mode: forwards;

	}

	@-webkit-keyframes animate{
		from{
			transform: translateX(1500px);
		}
		to{
			transform: translateX(0px);
		}
	}

	.delay-1{
		-webkit-animation-delay: 0.5s;
	}
	.delay-2{
		-webkit-animation-delay: 0.75s;
	}
	.delay-3{
		-webkit-animation-delay: 1s;
	}
	.delay-4{
		-webkit-animation-delay: 1.25s;
	}
	.delay-5{
		-webkit-animation-delay: 1.5s;
	}
	.delay-6{
		-webkit-animation-delay: 1.75s;
	}
	.delay-7{
		-webkit-animation-delay: 2s;
	}

</style>

