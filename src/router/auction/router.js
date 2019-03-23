import AuctionMain from '@/views/auction/Main'
import AuctionCategory from '@/views/auction/Category'
import AuctionBook from '@/views/auction/BookDetail'

const auction = [
	{
		path: '/auction_main',
		name: 'AuctionMain',
		component: AuctionMain,
	},
	{
		path: '/book_category/:cid',
		component: AuctionCategory
	},
	{
		path: '/book_detail/:bid',
		name: 'AuctionBook',
		component: AuctionBook
	},
]

export default auction
