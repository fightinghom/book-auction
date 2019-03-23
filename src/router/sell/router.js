import CreateBook from '@/views/sell/CreateBook'
import AuctionTable from '@/views/sell/AuctionTable'
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
			title: '正在拍卖'
		}
	}
]

export default sell
