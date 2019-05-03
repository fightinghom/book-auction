$(()=> {
	//prototypeTest() // 9
	/* useCache()
	useCache1() */ // 35
	//testLazySum() // 68
	//doPow() // 93
	//testPeople() // 110
	testStudent() //150
})

//闭包测试
//用于封装对象，对象拥有独立的状态
prototypeTest = ()=> {
	let person = () => {
		let name = ''
		return {
			getName(){
				return name
			},
			setName(v) {
				name = v
			}
		}
	}

	let p1 = person()
	let p2 = person()
	p1.setName('杨皓')
	p2.setName('李冲')

	console.log(p1.getName())
	console.log(p2.getName())

	console.log(p1.name)
}

//用于缓存
cacheTest = () => {
	let cache = {}
	return {
		getCache(propoty) {
			if(propoty in cache){
				return cache[propoty]
			}
			return undefined
		},
		clearCache(propoty) {
			if(propoty in cache) {
				delete cache[propoty]
			}
		},
		setCache(propoty, value) {
			cache[propoty] = value

		}
	}
}
let thisCache = cacheTest()
useCache = () => {
	thisCache.setCache('url', 'www.baidu.com')
	console.log(thisCache.getCache('url'))

}
useCache1 = () => {
	thisCache.clearCache('url')
	console.log(thisCache.getCache('url'))

}

//用于延迟操作(不需要立即操作)
sum = (arr) => {  //做一个求和运算
	return arr.reduce((x, y) => {
		return x + y
	})
}

lazy_sum = (arr) => { //需要执行时才进行计算
	let sum = null
	sum = ()=> {
		return arr.reduce((x, y) => { //reduce累加器
			return x + Math.pow(y,2)
		})
	}
	return sum
}

testLazySum = () => {

	console.log('sum',sum([1,2,3]))
	let lazySum  = lazy_sum([1,2,3,4])
	console.log('lazySum', lazySum) //在被调用之前lazySum只是一个function
	console.log('lazySum', lazySum()) //被调用后执行函数
}

//闭包将多参数函数变为但参数函数
create_pow = (n) => {
	let pow
	pow = (x) => {
		return Math.pow(x, n)
	}
	return pow
}

doPow = () => {
	let pow2 = create_pow(2) //创建一个二次方
	let pow3 = create_pow(3) //创建一个三次方
	console.log('3的平方', pow2(3))
	console.log('3的立方', pow3(3))
}

//原型和原型链
var people = {      //创建一个原型people
	role: 'people',
	name: '',
	id: '',
	createPeople: function(name, id) {
		this.name = name
		this.id = id
	},
	printPeople: function(){
		//console.log( `${name} is a ${this.role}`)
		return `${this.name} is a ${this.role}`
	},
	getName: function() {
		return this.name
	},
	setName: function(newName) {
		this.name  = newName
	},
}

testPeople = () => {
	let p1 = {
		__proto__: people
	}

	let p2 = {
		__proto__: people
	}

	p1.createPeople('范文科', '11')
	p2.createPeople('杨皓', '07')
	console.log('p1 id', p1.id)
	console.log('print p1:', p1.printPeople())
	console.log('p2 id', p2.id)
	console.log('print p2:', p2.printPeople())
	p1.setName('李冲')
	console.log('p1 name', p1.getName())
	console.log('p2 name', p2.getName())
}

//JS自定义类
Student = function(name, age, clas) {
	this.name = name
	this.age = age
	this.clas = clas
	this.printStudent = function() {
		console.log(`${this.name}---${this.age}---${this.clas}`)
	}
}

testStudent = () => {
	let stu = new Student('杨皓', 22, '计科')
	console.log(stu)
	let stu2 = new Student('李冲', 23, '计科')
	stu.printStudent()
	stu2.printStudent()
}
