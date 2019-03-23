
var dialog
var in1, in2, in3
var p1, p2, p3
/**
 * 你要向弹窗里放的数据
 */
var text = {}
window.onload = () => {
	dialog = document.getElementById('dialog')
	in1 = document.getElementById('in1')
	in2 = document.getElementById('in2')
	in3 = document.getElementById('in3')
}


function openDialog() {
	p1 = document.getElementById('p1')
	p2 = document.getElementById('p2')
	p3 = document.getElementById('p3')

	dialog.style.display = 'flex'
	/**
	 * 传入弹窗的数据
	 */
	text.text1 = in1.value
	text.text2 = in2.value
	text.text3 = in3.value

	/**
	 *
	 * 将text中的数据显示到弹窗的p标签中
	 */
	p1.innerHTML = text.text1
	p2.innerHTML = text.text2
	p3.innerHTML = text.text3
}

function closeDialog() {
	dialog.style.display = 'none'
	text = {}
}

function maxDialog() {
	var maxBtn = document.getElementsByClassName('toMax')[0]
	if (maxBtn.innerText == '↗') {
		dialog.style.width='100%'
		dialog.style.height='100%'
		maxBtn.innerText = '↙'
	} else {
		dialog.style.width='400px'
		dialog.style.height='300px'
		maxBtn.innerText = '↗'
	}
}

function output() {
	/**
	 * 确定后的逻辑
	 */
	console.log(text)
	dialog.style.display = 'none'
}
