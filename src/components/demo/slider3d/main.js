/**
 * 3d轮播图的思想是样式的交换
 *
 *
 */


$(() => {
	/**
	 * cssList: 初始化时的样式数组，我们通过改变这个数组中的值的顺序来改变对应li的样式
	 * liList: 用于轮播的li列表
	 * container: 用于监听当前class为li1和li3的是否被点击
	 * points: 获取轮播图下的点列表
	 * index: 当前被激活的点
	 * timer: 计时器，用于启动和停止自动播放
	 */
	let cssList = ['li2', 'li3', 'li4', 'li5', 'li6', 'li1']
	let liList = $('ul.imgs li')
	let container = $('div.wapper')
	let points = $('div.points span')
	let index = 0
	let timer

	/**初始绑定下方点的点击 */
	points.map(item => {
		points.eq(item).hover(() => {
			//需要移动的次数是目标点和当前点的下标差值
			let n = item - index
			/**
			 * n>0时向后移动
			 * n<0时向前移动
			 * 移动次数是n次
			*/
			if (n < 0) {
				for( let i = 0; i < Math.abs(n); i++) {
					prev()
				}
			}
			if (n > 0) {
				for( let i = 0; i < n; i++) {
					next()
				}
			}
		} ,function(){})
	})

	/**移动到后一张 */
	next = () => {
		cssList.splice(0, 0, cssList[5]) //将最后一个样式复制插入到数组的第一个位置
		cssList.pop() //删除最后一个样式
		goChange()
		index ++
		if (index > 5) {
			index = 0
		}
		pointChange()
	}

	/**移动到前一张 */
	prev = () => {
		cssList.push(cssList[0]) //将第一个样式复制插入到最后位置
		cssList.shift() //删除第一个样式
		goChange()
		index --
		if (index < 0) {
			index = 5
		}
		pointChange()
	}

	/**
	 * 先重置所有点的样式
	 * 在改变激活的点的样式
	 */
	pointChange = () => {
		points.map(item => {
			points[item].className = ''
		})
		points[index].className = 'on'
	}

	/**
	 * 为每一个li重新设置样式，对应的是目前cssList
	 */
	goChange = () => {
		liList.map(item => {
			liList[item].className = cssList[item]
		})
	}

	/**
	 * 自动播放
	 */
	autoPlay = () => {
		timer = setInterval(() => {
			next()
		}, 2000)
	}

	autoPlay()

	/**
	 * 当鼠标进入div.wapper时关闭自动播放
	 */
	container.mouseover(() => {
		clearInterval(timer)
	})

	/**
	 * 离开时启动
	 */
	container.mouseleave(() => {
		autoPlay()
	})

	/**
	 * 监听当前点击的是li1还是li3
	 * li1向前移动
	 * li3向后移动
	 */
	container.click((event) => {
		if (event.target.className === 'li3') {
			next()
		}

		if(event.target.className === 'li1') {
			prev()
		}
	})
})
