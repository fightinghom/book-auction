import CreateBook from '@/views/sell/CreateBook'
import AuctionTable from '@/views/sell/AuctionTable'
import SellDealing from '@/views/sell/DealingTable'
import OrderDetail from '@/components/detail/OrderDetail'
const sell = [
	{
		path: 'create',
		name: 'CreateBook',
		component: CreateBook,
		meta: {
			title: '创建拍品'
		}
	},
	{
		path: 'auction',
		name: 'AuctionTable',
		component: AuctionTable,
		meta: {
			title: '我的拍卖'
		}
	},
	{
		path: 'dealing',
		name: 'SellDealing',
		component: SellDealing,
		meta: {
			title: '订单管理'
		}
	},
	{
		path: 'order/:oid',
		name: 'SellOrderDetail',
		component: OrderDetail,
		meta: {
			title: '订单详情'
		}
	}
]

export default sell
