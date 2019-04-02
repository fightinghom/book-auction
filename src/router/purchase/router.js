import BidddingTable from '@/views/purchase/BiddingTable'
import GetTable from '@/views/purchase/GetTable'
import OrderDetail from '@/components/detail/OrderDetail'

const purchase = [

	{
		path: 'bidding',
		name: 'PurchaseBidding',
		component: BidddingTable,
		meta: {
			title: '我正在拍'
		}
	},
	{
		path: 'get',
		name: 'PurchaseGet',
		component: GetTable,
		meta: {
			title: '订单处理'
		}
	},
	{
		path: 'order/:oid',
		name: 'PurchaseOrderDetail',
		component: OrderDetail,
		meta: {
			title: '订单详情'
		}
	}
]

export default purchase
