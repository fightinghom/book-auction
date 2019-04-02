<template>
	<div class="order-detail">
		<!-- 步骤条 -->
		<div class="item item-shadow">
			<ba-step :active="active" v-if="-1 != active">
				<ba-step-item>买家完善订单</ba-step-item>
				<ba-step-item>卖家确认订单</ba-step-item>
				<ba-step-item>正在交易</ba-step-item>
				<ba-step-item v-if="order.status < 90">交易完成</ba-step-item>
				<ba-step-item v-if="order.status == 96">交易停滞</ba-step-item>
				<ba-step-item v-if="order.status > 96">交易失败</ba-step-item>
			</ba-step>
		</div>
		<!-- 订单信息 -->
		<div class="item item-shadow">
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
					<div class="column">成交价格:</div>
					<div class="value"><span class="focus">{{order.actualPrice}}</span><span class="focus">￥</span> </div>
				</div>
			</div>
		</div>
		<!-- 商品信息 -->
		<div class="item item-shadow"  v-if="order.bookDetail">
			<div class="title">商品信息</div>
			<div class="info">
				<div class="info-item">
					<div class="column">商品编号:</div>
					<div class="value">{{order.bookId}}</div>
				</div>
				<div class="info-item">
					<div class="column">商品名称:</div>
					<div class="value">{{order.bookDetail.name}}</div>
				</div>
				<div class="info-item">
					<div class="column">作者:</div>
					<div class="value">{{order.bookDetail.author}}</div>
				</div>
				<div class="info-item">
					<div class="column">最高价格:</div>
					<div class="value"><span class="focus">{{order.bookDetail.getterPrice}}</span><span class="focus">￥</span></div>
				</div>
			</div>
		</div>
		<!-- 卖家信息 -->
		<div class="item item-shadow"  v-if="seller">
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
		<!-- 约见信息 -->
		<div class="item item-shadow"  v-if="seller">
			<div class="title">约见信息</div>
			<div class="info">
				<div class="info-item">
					<div class="column">约见时间:</div>
					<div class="value">{{order.meetTime}}</div>
				</div>
				<div class="info-item">
					<div class="column">约见地点:</div>
					<div class="value">{{order.meetAddress}}</div>
				</div>
			</div>
			<div class="tip focus" v-if="!(null != order.meetAddress && null != order.meetTime)">
				请尽快完善约见信息，否则将视作放弃交易。如果造成交易关闭，您的保证金将作为卖家的赔偿，并且得到信誉度惩罚!
			</div>
		</div>
		<!-- 操作按钮 -->
		<div class="item item-shadow">
			<div class="btn">
				<el-button type="primary">完善订单</el-button>
				<el-button type="warning">取消订单</el-button>
			</div>
			<div class="tip focus">如果您取消订单，您的保证金会作为卖家的赔偿!</div>
		</div>
	</div>
</template>
<script>
import BaStep from '@/components/step/Step'
import BaStepItem from '@/components/step/StepItem'
import http from '@/utils/api/index'
import orderStatusUtils from '@/utils/orderStatus.js'
export default {
	data() {
		return {
			active: -1,
			orderNo: '',
			order: {},
			getter: {},
			seller: {},
			queryOrderDetail() {
				let self = this
				http.purchase.getOrderDetail({
					orderNo: self.orderNo
				})
				.then(rs => {
					self.order = rs.order
					self.stepNow(rs.order.status)
					self.getter = rs.getter
					self.seller = rs.seller
				})
				.catch(value => {
					console.log(value)
				})
			}
		}
	},
	components: {
		BaStep,
		BaStepItem
	},
	methods: {
		stepNow(v) {
			switch(v) {
				case 1:
					this.active = 0
					break;
				case 2:
					this.active = 1
					break;
				case 3:
					this.active = 2
					break;
				case 4:
					this.active = 3
					break;
			/* 	case 96:
					this.active = 4
					break; */
				default :
					this.active = 4
			}
		}
	},
	computed: {
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
	}

	.item-shadow {
		box-shadow: 0 0 10px 0 #cccccc;;
	}

	.focus {
		color: red;
	}
</style>

