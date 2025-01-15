
import { range }  from './range.js'
import { Value }  from '../src/engine.js'

export function Trainer(bus, config, init) {
	
	const trainer = {}
	const loss_history = []
	const timeout = 10
	let running = true
	let id
	let epoch_iterator
	let epoch_fn
	
	const { epoch_size, batch_size, dataset } = config
	
	init(epochs)
	
	return Object.assign(trainer, {
		start, stop, done, next_epoch, on, run: start
	})
	
	function start() {
		
		bus.emit('training-started')
		running = true
		loss_history.splice(0, loss_history.length)
		epoch_iterator = make_epoch_iterator(epoch_size())
		next_epoch()
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
	
	function next_epoch() {
		
		if (! running) return
		const { more, next } = epoch_iterator
		if (! more()) trainer.done()
		else id = setTimeout(() => {
			const epoch = next()
			epoch_fn(epoch, batches(epoch))
			bus.emit('training-epoch', {
				index: epoch.index,
				epoch_size: epoch_size(),
				loss: epoch.loss.data,
				predictions: epoch.predictions
			})
			next_epoch()
		}, timeout)
	}
	
	function epochs(fn) {
		epoch_fn = fn
	}
	
	function make_epoch_iterator() {
		
		let i = 0
		return {
			more: () => i < epoch_size(),
			next: () => {
				i = i + 1
				return {
					index: i,
					loss: new Value(0),
					predictions: []
				}
			}
		}
	}
	
	function batches(epoch) {
		
		return (fn) => {
			let counter = 0
			const { more, next } = make_batch_iterator()
			let batch
			while (more()) {
				batch = next()
				fn(batch, iterations(batch))
			}
			epoch.loss = epoch.loss.div(new Value(batch.index + 1))
		}
	}
	
	function make_batch_iterator() {
		
		const { inputs, outputs } = dataset()
		const indices = range(0, inputs.length).sort(() => Math.random() - 0.5)
		let i = 0
		return {
			more: () => i * batch_size() < indices.length,
			next: () => {
				const from = i * batch_size()
				const to = (i + 1) * batch_size()
				return {
					index: i++,
					indices: indices.slice(from, to),
					loss: new Value(0)
				}
			}
		}
	}
	
	function iterations(batch) {
		
		const { index, indices } = batch
		const offset = index * batch_size()
		const { inputs, outputs } = dataset()
		return function(fn) {
			indices.forEach((indice, i) => {
				let index = offset + i
				fn(inputs[index], outputs[index], index)
			})
			batch.loss = batch.loss.div(new Value(batch.indices.length))
		}
	}
	
	function on(key, fn) {
		
		bus.on(key, fn)
		return trainer
	}
}
