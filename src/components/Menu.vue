<template>
	<div
	class="menu ba-basic-color-aph"
	@mouseout="firstMenu = !firstMenu"
	@mouseover="firstMenu = !firstMenu"
	:style="{'width': firstMenu ? '200px' : '50px'}">
		<div class="menu-item"
		v-for="item of menu"
		:key="item.mark"
		v-if="'Manage' !== item.mark ? true : (1 == getUserinfo.power ? true : false)"
		@click="item.child.length > 0 ? '' : routeTo(item.path, '')">
			<div class="first-menu" @click="expend(item.mark)" :class="{'on': item.mark === firstMenuName}">
				<div class="vertical-center menu-icon fl"><i class="fas" :class="item.icon"></i></div>
				<div class="menu-name fl">
					<span>{{item.name}}</span>
					<div class="vertical-center menu-icon fr" :class="{'icon-trans': item.mark === firstMenuName && item.child.length > 0}"><i class="fas fa-angle-right "></i></div>
				</div>
			</div>
			<div class="item-child" v-show="item.mark === firstMenuName">
				<div
				v-for="(citem, index) of item.child"
				:key="index"
				class="child"
				:class="{'on': focusChildName === citem.mark}"
				@click="routeTo(item.path+citem.path, citem.mark)">
				{{citem.name}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
	data() {
		return {
			firstMenu: false,
			firstMenuName: '',
			focusChildName: '',
			menu: [
				{
					name: '正在拍卖',
					mark: 'Auction',
					path: '/auction',
					icon: 'fa-shopping-bag',
					child: [],
				},
				{
					name: '我的竞卖',
					mark: 'Sell',
					path: '/sell',
					icon: 'fa-box-open',
					child: [
						{
							name: '创建拍品',
							path: '/create',
							mark: 'CreateBook',
						},
						{
							name: '我的拍卖',
							path: '/auction',
							mark: 'AuctionTable',
						},
						{
							name: '订单管理',
							path: '/dealing',
							mark: 'SellDealing'
						},
					]
				},
				{
					name: '我的竞购',
					path: '/purchase',
					mark: 'Purchase',
					icon: 'fa-shopping-cart',
					child: [
						{
							name: '我正在拍',
							path: '/bidding',
							mark: 'PurchaseBidding'
						},
						{
							name: '订单管理',
							path: '/get',
							mark: 'PurchaseGet'

						},
					]
				},
				{
					name: '互评记录',
					path: '/feedback',
					mark: 'feedback',
					icon: 'fa-comments',
					child: [
						{
							name: '我的评价',
							path: '/wait',
							mark: 'FeedBackWait'
						},
						{
							name: '关于我的',
							path: '/aboutme',
							mark: 'FeedBackAboutMe'
						},
						{
							name: '评价广场',
							path: '/square',
							mark: 'FeedBackSquare'
						}
					]
				},
				{
					name: '管理平台',
					path: '/manage',
					mark: 'Manage',
					icon: 'fa-lock',
					child: [
						{
							name: '图书管理',
							path: '/check',
							mark: 'ManageCheck'
						},
						{
							name: '用户列表',
							path: '/user',
							mark: 'ManageUser'
						},
						{
							name: '交易订单',
							path: '/order',
							mark: 'ManageOrder'
						},
						{
							name: '首页设置',
							path: '/homeset',
							mark: 'ManageHomeSet'
						}
					]
				},
			]
		}
	},
	computed: {
		...mapGetters(['getUserinfo']),
	},
	methods: {
		routeTo(rn, mark) {
			if(mark === '') {
				this.focusChildName = ''
			} else {
				this.focusChildName = mark
			}
			this.$router.push(rn)
		},
		expend(v) {
			this.firstMenuName = v
		},
	},
	watch: {
		'$route' (to, from) {
			let matched = to.matched
			let pName = matched[1].name
			let name = matched[2].name
			this.firstMenuName = pName
			this.focusChildName = name
			console.log(pName, name)
		}
	},
	mounted() {
		let matched = this.$route.matched
		let pName = matched[1].name
		let name = matched[2].name
		this.firstMenuName = pName
		this.focusChildName = name
	}
}
</script>
<style lang="scss" scoped>
	.on {
		background: #647bec;
	}
	.icon-trans {
		transition: all 0.5s;
		transform: rotate(90deg);
	}
	.menu {
		height: 100%;
		position: absolute;
		overflow: hidden;
		transition: all 0.5s;
		overflow-y: auto;
		.menu-item {
			transition: all 0.5s;
			width: 200px;
			color: #eaedfa;
			&:first-child {
				height: 48px;
				border-color: #eaedfa;
				border-top: 1px solid;
				border-bottom: 1px solid;
			}
			.first-menu {
				height: 50px;
				&:hover {
					background: #647bec;
					cursor: pointer;
				}
				.menu-icon {
					width: 50px;
					height: 100%;
				}
				.menu-name {
					width: 150px;
					height: 100%;
					text-align: left;
					span {
						line-height: 50px;
						padding-left: 20px;
					}
				}
			}
			.item-child{
				transition: all 5s;
				.child {
					padding: 8px 0;
					&:hover {
						background: #647bec;
						cursor: pointer;
					}
				}
			}

		}
	}
</style>
