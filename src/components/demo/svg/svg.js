var el
var wapper
var svgNs = 'http://www.w3.org/2000/svg'
window.onload = () => {
	wapper = document.getElementsByClassName('wapper')[0]
}

var positionX
var positionY
var dragging = false
var startMove = (element) => {
	dragging = true
	el = element
	console.dir(el)
}

var stopMove = () => {
	dragging = false
	el = null
}

var onMove = ( ev) => {
	positionX = ev.clientX
	positionY = ev.clientY
	if(dragging) {
		if(positionX < 40) {
			positionX = 40
		}
		if(positionY < 40) {
			positionY = 40
		}
		if (positionX > wapper.offsetWidth - 40) {
			positionX = wapper.offsetWidth - 40
		}
		if (positionY > wapper.offsetHeight - 40) {
			positionY = wapper.offsetHeight - 40
		}
		el.style.left = positionX - 30 + 'px'
		el.style.top = positionY - 30 + 'px'
	}
}

var menu = ['主页', '个人', '好友']

var menuX
var menuY
var menuExHeight
var direction = 'top'
var itemx
var itemY
var expand = (ev) => {
	var position = ev.getBoundingClientRect()
	menuX = position.x
	menuY = position.y
	menuExHeight = menu.length * 70
	/* if(menuExHeight + 30 > menuY) {
		direction = 'bottom'
	} */
	if(menuExHeight < menuY) {
		direction = 'top'
	}

	if('top' === direction) {
		menu.map((item, index) => {
			itemx = menuX
			itemy = menuY - 70 * (index + 1)
			var menuItem = document.createElementNS(svgNs,'svg')
			menuItem.classList.add('menu-item')
			var itemG = document.createElementNS(svgNs,'g')
			var itemC = document.createElementNS(svgNs,'circle')
			var itemT = document.createElementNS(svgNs,'text')
			itemC.setAttribute('cx', '30')
			itemC.setAttribute('cy', '30')
			itemC.setAttribute('r', '25')
			itemC.setAttribute('stroke-width', '1')
			itemC.setAttribute('stroke', 'black')
			itemC.setAttribute('fill', 'transparent')
			itemG.appendChild(itemC)
			itemT.setAttribute('x', '13.8')
			itemT.setAttribute('Y', '40.4')
			itemT.setAttribute('font-size', '16')
			itemT.innerHTML = item
			itemG.appendChild(itemT)
			menuItem.style.left = itemx + 'px'
			menuItem.style.top = itemy + 'px'
			menuItem.appendChild(itemG)
			menuItem.addEventListener( 'click', function() {
				console.log(item)
			})
			wapper.appendChild(menuItem)
		})
	}

}
