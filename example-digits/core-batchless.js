
import { Value } from '../system/src/engine.js'
import { Model } from '../system/src/network.js'
import { Layer } from '../system/src/network.js'
import { probable } from '../system/src/utility.js'
import { cross_entropy_loss } from '../system/src/utility.js'
import { one_hot_encode } from '../system/src/utility.js'
import { one_hot_decode } from '../system/src/utility.js'
import { Trainer } from '../system/extras/trainer-batchless.js'
import { Config } from '../system/extras/config-batchless.js'
import { Data } from '../data-digits/main.js'

export function core(bus) {
	
	let trainer
	let model
	
	const {
		config, title, training, testing, dataset, steps, batches,
		cost, learning_rate, optimizer, classes, alpha, lambda
	} = Config().define(['classes', 'alpha', 'lambda'])
	
	Data().load((data) => {
		
		title('mnist')
		classes(10)
		training(100)
		testing(100)
		dataset(data.make('training', training()))
		steps(500)
		batches(1)
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
		
		trainer = Trainer(bus, config, {
			step: (step, loop, predictions, losses) => {
				let logits, loss
				loop((input, output, index) => {
					logits = model.forward(input)
					predictions.push({ prediction: probable(logits), output, index })
					losses.push((loss = cross_entropy_loss(logits, one_hot_encode(output, classes()))).data)
					model.zero_grad()
					loss.backward()
					model.learn(learning_rate())
				})
			},
			batch: () => {}
		}).run()
	}
	
	function listen() {
		
		bus.on('training-start-requested', () => train())
		bus.on('training-stop-requested', () => trainer.stop())
		bus.on('training-step', ({ step, loss }) => console.log(`step ${step} loss of ${loss}`))
		bus.on('training-step', ({ step, predictions }) => {
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
