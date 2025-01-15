
import { add_event_listener } from '../example-shared/events.js'

const $ = (selector) => document.querySelector(selector)
const progress = () => $('#progress')

export function ui(bus) {
	
	const container = document.querySelector('#graph')
	if (! container) return console.log('no container found')
	const data = { actual: [], learned: [] }
	const tau = Math.PI * 2
	let plot
	
	listen()
	
	function plot_points(mode, points, then) {
		
		if (mode == 'actual') plot_points_(points, data.actual, false, then)
		else if (mode == 'learned') plot_points_(points, data.learned, false, then)
	}
	
	function plot_points_(src, dest, animate, then) {			// todo: with easing
		
		if (animate) {
			dest.splice(0, dest.length)
			const next = (i) => {
				Array.from({ length: 4 }).forEach(() => {
					dest.push(src.shift())
				})
				render()
				if (i < src.length) {
					const id = setTimeout(() => next(++i), 1)
				} else if (then) then()
			}
			next(0)
		} else {
			dest.splice(0, dest.length)
			src.forEach((point) => dest.push(point))
			render()
			if (then) then()
		}
	}
	
	function render() {
		
		if (plot) plot.remove()
		container.appendChild(
			plot = Plot.plot({
				x: {
					label: null,
					grid: true,
					inset: 0
				},
				y: {
					label: null,
					grid: true,
					inset: 0,
					domain: [-1, 1]
				},
				height: 300,
				width: 1000,
				marks: [
					Plot.axisY({ticks: []}),
					Plot.axisX({ticks: []}),
					Plot.ruleX([]),
					Plot.ruleY([]),
					Plot.gridX({
						stroke: 'hsl(217, 27%, 86%)',
						strokeOpacity: 0
					}),
					Plot.gridY({
						stroke: 'hsl(217, 27%, 86%)',
						strokeOpacity: 0
					}),
					Plot.line(data.actual, {
						x: (d) => d[0],
						y: (d) => d[1],
						stroke: 'green',
						strokeOpacity: 1,
						strokeDasharray: [10, 10]
					}),
					Plot.line(data.learned, {
						x: (d) => d[0],
						y: (d) => d[1],
						stroke: 'red'
					}),
				]
			})
		)
	}
	
	function listen() {
		
		bus.on('points', (mode, points) => plot_points(mode, points))
		add_event_listeners($('#sine_a'), 0)
		add_event_listeners($('#sine_b'), 1)
		add_event_listeners($('#cosine_a'), 2)
		add_event_listeners($('#cosine_b'), 3)
		
		bus.on('training-epoch', ({ index, epoch_size }) => {
			if (! progress()) return
			progress().value = index
			progress().max = epoch_size
		})
	}
	
	function add_event_listeners(element, index) {
		
		add_event_listener(element, 'helddown', (event) => bus.emit('training-start-requested', index))
		add_event_listener(element, 'heldup', (event) => bus.emit('training-stop-requested', index))
		add_event_listener(element, 'clicked', (event) => bus.emit('testing-start-requested', index))
	}
}