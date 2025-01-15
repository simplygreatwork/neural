
import { Value } from '../system/src/engine.js'
import { Model } from '../system/src/network.js'
import { Layer } from '../system/src/network.js'
import { mean_standard_error_1 } from '../system/src/loss.js'
import { mean_standard_error } from '../system/src/loss.js'
import { Trainer } from '../system/extras/trainer.js'
import { Config } from '../system/extras/config.js'
import { make_points, points_to_split } from '../data-graph/main.js'

export function core(bus) {
	
	const tau = Math.PI * 2
	let trainer
	let model
	let fn
	
	const {
		config, title, training, testing, dataset,
		epoch_size, batch_size, cost, learning_rate, optimizer
	} = Config()
	
	title('graphing')
	training(200)
	testing(11)
	epoch_size(1000)
	batch_size(1)
	cost((prediction, output) => mean_standard_error(logits, new Value(output)).data)
	learning_rate(0.00126)
	optimizer((adam) => 'adam')
	
	const models = Array.from({ length: 4 }).map(() => {
		return new Model([
			new Layer({ inputs: 1, neurons: 10, activation: 'tanh' }),
			new Layer({ inputs: 10, neurons: 10, activation: 'tanh' }),
			new Layer({ inputs: 10, neurons: 1, activation: 'linear' })
		], {})
	})
	stage(0)	
	
	function train() {
		
		model.reset()
		trainer = Trainer(bus, config, epochs => {
			epochs((epoch, batches) => {
				batches((batch, iterations) => {
					iterations((input, output, index) => {
						let logits = model.forward(input)
						let loss = mean_standard_error(logits, new Value(output))
						batch.loss = batch.loss.add(loss)
						epoch.predictions.push({ prediction: logits.data, output, index })
					})
					model.zero_grad()
					batch.loss.backward()
					model.learn(learning_rate())
					epoch.loss = epoch.loss.add(batch.loss)
				})
			})
		}).run()
	}
	
	listen()
	
	function listen() {
		
		bus.on('ready', () => {
			stage(0)
			const points = make_points([-tau, tau], 200, fn)
			bus.emit('points', 'actual', points)
			bus.emit('training-start-requested', 0)
		})
		bus.on('training-start-requested', (index) => {
			stage(index)
			if (trainer) trainer.stop()
			train()
		})
		bus.on('training-stop-requested', (index) => {
			stage(index)
			trainer.stop()
		})
		bus.on('training-epoch', ({ index, loss }) => {
			test(training() + 100)
		})
		bus.on('training-epoch', ({ index, loss }) => {
			console.log(`epoch ${index} loss of ${loss.toFixed(8)}`)
		})
		bus.on('testing-start-requested', (index) => {
			stage(index)
			test(testing())
		})
		bus.on('training-start-requested', (index) => console.log(`training-start-requested: ${index}`))
		bus.on('training-stop-requested', (index) => console.log(`training-stop-requested: ${index}`))
		bus.on('training-started', () => console.log('training started'))
		bus.on('training-stopped', () => console.log('training stopped'))
		bus.on('training-done', () => console.log('training done'))
	}
	
	function stage(i) {
		
		const sine = (x) => Math.sin(x), cosine = (x) => Math.cos(x)
		const fns = [sine, sine, cosine, cosine]
		if (i < 0 || i > fns.length) return
		model = models[i]
		fn = fns[i]
		const points = make_points([-tau, tau], 200, fn)
		dataset(points_to_split(points))
		bus.emit('points', 'actual', points)
	}
	
	function test(size) {
		
		const fn = (x) => model.forward([x]).data
		const points = make_points([-tau, tau], size, fn)
		bus.emit('points', 'learned', points)
	}
}
