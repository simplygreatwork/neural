
import { range }  from './range.js'

export function Trainer(bus, config, more) {
	
	const trainer = {}
	const loss_history = []
	const timeout = 10
	let running = true
	let step_ = 0
	let id
	
	return Object.assign(trainer, {
		start, stop, done, next, on, run: start
	})
	
	function start() {
		
		bus.emit('training-started')
		running = true
		next()
		return trainer
	}
	
	function stop() {
		
		if (id) clearTimeout(id)
		bus.emit('training-stopped')
		running = false
	}
	
	function done() {
		
		bus.emit('training-done')
		running = false
		return trainer
	}
		
	function next() {
		
		if (! running) return
		if (step_ >= config.steps()) trainer.done()
		else id = setTimeout(() => {
			id = null
			const each = (fn) => {
				const { inputs, outputs } = config.dataset()
				range(0, inputs.length).sort(() => Math.random() - 0.5).forEach((index, i) => {
					return fn(inputs[index], outputs[index], index, i)
				})
			}
			const predictions = []
			let losses = []
			const result = more.step(++step_, each, predictions, losses)
			losses = result ? result : losses
			const loss = (losses.reduce((sum, loss) => sum + loss, 0) / losses.length)
			loss_history.push(loss)
			bus.emit('training-step', { step: step_, loss, predictions })
			next()
		}, timeout)
	}
	
	function on(key, fn) {
		
		bus.on(key, fn)
		return trainer
	}
}
