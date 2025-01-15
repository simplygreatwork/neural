
import { Value } from '../system/src/engine.js'
import { Model } from '../system/src/network.js'
import { Layer } from '../system/src/network.js'
import { probable } from '../system/src/utility.js'
import { cross_entropy_loss } from '../system/src/utility.js'
import { one_hot_encode } from '../system/src/utility.js'
import { one_hot_decode } from '../system/src/utility.js'
import { Trainer } from '../system/extras/trainer.js'
import { Config } from '../system/extras/config.js'
import { Data } from '../data-digits/main.js'

export function core(bus) {
	
	let trainer
	let model
	
	const {
		config, title, training, testing, dataset, epoch_size, batch_size,
		cost, learning_rate, optimizer, classes, alpha, lambda
	} = Config().define(['classes', 'alpha', 'lambda'])
	
	Data().load((data) => {
		
		title('mnist')
		classes(10)
		training(100)
		testing(100)
		dataset(data.make('training', training()))
		epoch_size(500)
		batch_size(32)
		cost((prediction, output) => cross_entropy_loss(prediction, one_hot_encode(output, classes())))
		learning_rate(0.001)
		learning_rate(0.009)										// slow but steady
		optimizer((adam) => 'adam')
		alpha(1e-2)
		lambda(1e-3)
		
		const size = dataset().inputs[0].length
		model = new Model([
			new Layer({ inputs: size, neurons: classes(), activation: 'sigmoid' }),
			new Layer({ inputs: classes(), neurons: classes(), activation: 'softmax' })
		], {})
		
		listen()
		bus.emit('ready')
	})
	
	function train() {
		
		model.reset()
		trainer = Trainer(bus, config, epochs => {
			epochs((epoch, batches) => {
				batches((batch, iterations) => {
					iterations((input, output, index) => {
						let logits = model.forward(input)
						let loss = cross_entropy_loss(logits, one_hot_encode(output, classes()))
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
	
	function listen() {
		
		bus.on('training-start-requested', () => train())
		bus.on('training-stop-requested', () => trainer.stop())
		bus.on('training-epoch', ({ index, loss }) => console.log(`epoch ${index} loss of ${loss}`))
		bus.on('training-epoch', ({ index, predictions }) => {
			let score = 0
			predictions.forEach(({ prediction, output, index }) => {
				const correct = prediction == output
				bus.emit('validation', index, correct)
				score = correct ? score + 1 : score
			})
			console.log(`accuracy: ${score / predictions.length }`)
		})
		bus.on('training-started', () => console.log('training started'))
		bus.on('training-stopped', () => console.log('training stopped'))
		bus.on('training-done', () => console.log('training done'))
	}
}
