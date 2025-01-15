
export function plot(bus) {
	
	const container = document.querySelector('#loss')
	if (! container) return console.log('no container found')
	const history = []
	let plot
	
	bus.on('training-started', () => {
		history.splice(0, history.length)
	})
	
	bus.on('training-step', ({ loss }) => {
		history.push(loss)
		render()
	})
	
	function render() {
		
		if (plot) plot.remove()
		container.appendChild(
			plot = Plot.plot({
				x: { label: 'steps', grid: true, inset: 10 },
				y: { label: 'loss rate', grid: true, inset: 10 },
				width: 200,
				height: 200,
				marks: [
					Plot.lineY(history, {
						curve: 'catmull-rom',
						stroke: 'royalblue'
					})
				]
			})
		)
	}
}
