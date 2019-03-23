import Auction from '@/views/auction/Index'


import AuctionChild from './router'

const auctionIndex = [
	{
		path: '/auction',
		name: 'Auction',
		component: Auction,
		redirect: '/auction_main',
		children: AuctionChild
	}
]

export default auctionIndex
