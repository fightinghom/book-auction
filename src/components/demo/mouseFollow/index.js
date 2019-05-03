let wapper
let count = 0
$(() => {
	wapper = document.getElementsByClassName('wapper')[0]
		setInterval(function() {
			for(let i = 0; i < 5; i++) {
				if(count < 30) {
					let x = Math.random() * (wapper.clientWidth - 2 * 25) + 1
					let cicle = new Cicle(25, 'red', x)
					cicle.createCicle()
					count ++
				}
			}
		}, 2000)

})

Cicle = function(radius, color, x) {
	this.radius = radius
	this.color = color
	this.x = x
	this.timer = null
	this.createCicle = function() {
		let cicle = this.initCicle()
		wapper.appendChild(cicle)
		cicle.click()
	}
	this.initCicle = function() {
		let width,height,radius
		radius  = this.radius
		width = 2 * radius
		height = 2 * radius
		let cicle  = document.createElement('div')
		cicle.className = 'cicle'
		cicle.style = `width:${width}px;height:${height}px;border-radius:${radius}px;background:${this.color}`
		cicle.style.left = x + 'px'
		cicle.style.top = -2 * radius
		cicle.setAttribute('data-radius', radius)
		cicle.addEventListener('click', getPosition)
		cicle.timer = null
		return cicle
	}
}

getPosition = function() {
	let self = this
	let containerW = wapper.clientWidth
	let containerH = wapper.clientHeight
	let speed
	speed = Math.random() * 60 + 5
	self.timer = setInterval(function() {
		/* if(self.offsetLeft > containerW) {
			clearInterval(self.timer)
			self.parentNode.removeChild(self)
		} */if (self.offsetTop > containerH) {
			clearInterval(self.timer)
			self.parentNode.removeChild(self)
			count --
		}
	/* 	self.style.left = self.offsetLeft + 2 + 'px' */
		self.style.top = self.offsetTop + 2 + 'px'
	}, speed)
}
