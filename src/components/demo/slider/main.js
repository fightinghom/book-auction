$(document).ready( () => {
	let index = 1
	let imgs = document.getElementById('slider-img')
	let prev = $('.prev')[0]
	let next = $('.next')[0]
	let animated=false;
	prev.onclick = () => {
		move(600)
	}
	next.onclick = () => {
		if (!animated) {
			if (index==5) {
				index=1;
			}else {
				index +=1;
			}
			move(-600);
		}
	}

	var move = (dist) => {
		let time = 300
		let inteval = 10
		let speed =  dist/(time/inteval)
		let left = (isNaN(parseInt(imgs.style.left)) ? 0 : parseInt(imgs.style.left))
		animated = true
		let newLeft = left + dist
		go = () => {
			if ((speed > 0 && left < newLeft) || (speed < 0 && left > newLeft)) {
				imgs.style.left = left + speed + 'px';
				setTimeout(go, inteval);
			} else {
				animated=false
				if (newLeft < -3000) {
					imgs.style.left = -600 + 'px'
				}
				if (newLeft > -600) {
					imgs.style.left = -3000 + 'px'
				}
			}
		}
		go()
	}
})
