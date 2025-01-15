
import { Data } from '../data-digits/main.js'

export function ui(bus) {
	
	const container = document.querySelector('#digits')
	if (! container) return console.log('no container found')
	const rows = 5, columns = 20, gap = 2
	const images = []
	
	const data = Data().load((data) => {
		
		const [ width, height ] = data.size
		create_images()
		create_plot()
		
		function create_images() {
			
			// todo: switch back to 'testing' data here after starting test group in core.js
			
			const { more, next } = data.group('training').entries(100)	// need to mirror core.js
			while ( more() ) {
				next((image, label, url) => {
					images.push(url)
				})
			}
		}
		
		function create_plot() {
			
			const data = images.map((image, index) => {
				return {
					src: image,
					fill: 'darkred',
					x: index % columns + 1,
					y: Math.floor(index / columns) + 1,
				}
			})
			
			let plot
			function render() {
				
				if (plot) plot.remove()
				container.appendChild(
					plot = Plot.plot({
						width: 800,
						height: 200,
						grid: false,
						marks: [
							Plot.axisY({ticks: []}),
							Plot.axisX({ticks: []}),
							Plot.ruleY([]),
							Plot.ruleX([]),
							Plot.rect(data, {
								x1: d => d['x'],
								y1: d => d['y'],
								fill: d => d['fill'],
								width: 36,
								height: 36
							}),
							Plot.image(data, {
								x: (d) => d['x'],
								y: (d) => d['y'],
								src: (d) => d['src'],
								width: 36,
								height: 36
							})
						]
					})
				)
			}
			
			render()
			
			bus.on('validation', (index, state) => {
				if (data[index]) data[index].fill = state ? 'green' : 'darkred'
				render()
			})
		}
	})
}

function grid(x, y, fn) {
	
	let i = 0
	for (let x_ = 0; x_ < x; x_++) {
		for (let y_ = 0; y_ < x; y_++) {
			fn(x_, y_, i++)
		}
	}
}
