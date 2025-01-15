
const $ = (selector) => document.querySelector(selector)
const area = () => $('#area')
const score = () => $('#score')
const age = () => $('#age')
const price_predicted = () => $('#price_predicted')
const price_actual = () => $('#price_actual')
const price_accuracy = () => $('#price_accuracy')
const progress = () => $('#progress')

export function ui(bus) {
	
	init_ranges()
	listen()
	
	function init_ranges() {
		
		area().min = 1500
		area().max = 4500
		area().step = 1
		area().value = 3000
		score().min = 0
		score().max = 100
		score().step = 1
		score().value = 100
		age().min = 0
		age().max = 100
		age().step = 1
		age().value = 0
	}
	
	function listen() {
		
		area().addEventListener('input', (event) => changed(event.target))
		score().addEventListener('input', (event) => changed(event.target))
		age().addEventListener('input', (event) => changed(event.target))
		
		const currency = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		})
		
		const percent = new Intl.NumberFormat('en-US', {
			style: 'percent',
			signDisplay: 'exceptZero',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		})
		
		bus.on('price', (price) => {
			price_predicted().innerText = currency.format(price.predicted)
			price_actual().innerText = currency.format(price.actual)
			price_accuracy().innerText = percent.format(price.predicted / price.actual)
		})
		
		bus.on('training-epoch', ({ index, epoch_size }) => {
			if (! progress()) return
			progress().value = index
			progress().max = epoch_size
		})
	}
	
	function changed(element) {
		
		let value = element.value
		if (element.id == 'area') value = `${value} square feet`
		if (element.id == 'score') value = `${value} / 100`
		if (element.id == 'age') value = `${value} years`
		element.dataset.tooltip = value
		
		bus.emit('price-request', {
			area: area().value,
			score: score().value,
			age: age().value
		})
	}
}
