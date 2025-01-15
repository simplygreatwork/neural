
import { Value } from '../system/src/engine.js'
import { Model } from '../system/src/network.js'
import { Layer } from '../system/src/network.js'
import { mean_standard_error_1 } from '../system/src/loss.js'
import { mean_standard_error } from '../system/src/loss.js'
import { Trainer } from '../system/extras/trainer.js'
import { Config } from '../system/extras/config.js'
import { make_training_entries } from '../data-housing/main.js'
import { make_testing_entries } from '../data-housing/main.js'
import { entries_to_dataset } from '../data-housing/main.js'
import { scale_in, scale_out } from '../data-housing/main.js'
import { calculate } from '../data-housing/main.js'

export function core(bus) {
	
	let trainer
	
	const {
		config, title, training, testing, dataset,
		epoch_size, batch_size, cost, learning_rate, optimizer
	} = Config()
	
	title('housing')
	training(5000)
	testing(1)
	dataset(entries_to_dataset(make_training_entries()))
	epoch_size(50)
	batch_size(32)
	cost((prediction, output) => mean_standard_error(logits, new Value(output)).data)
	learning_rate(0.035)																// 0.00127
	optimizer((adam) => 'adam')
	
	const model = new Model([
		new Layer({ inputs: 3, neurons: 10, activation: 'relu' }),
		new Layer({ inputs: 10, neurons: 1, activation: 'sigmoid' })
	])
	
	function train() {
		
		model.reset()
		trainer = Trainer(bus, config, epochs => {
			epochs((epoch, batches) => {
				batches((batch, iterations) => {
					iterations((input, output, index) => {
						let logits = model.forward(input)
						let loss = mean_standard_error(logits, new Value(output[0]))
						epoch.predictions.push({ prediction: logits.data, output: output[0], index })
						batch.loss = batch.loss.add(loss)
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
			bus.emit('training-start-requested')
		})
		bus.on('training-start-requested', () => {
			if (trainer) trainer.stop()
			train()
		})
		bus.on('training-epoch', ({ index, loss }) => {
			console.log(`epoch ${index} loss of ${loss.toFixed(8)}`)
		})
		bus.on('training-done', () => {
			console.log(`training-done`)
			let { inputs, outputs } = entries_to_dataset(make_testing_entries(), dataset().scales)
			if (false) test(inputs, outputs)
		})
		bus.on('price-request', (input) => {
			const actual = calculate(input.area, input.score, input.age)
			const indices = () => { return { area: 0, score: 1, age: 2, price: 3 }}
			const { area, score, age, price } = indices()
			const scales = dataset().scales
			bus.emit('price', {
				predicted: test_one([
					scales[area].in(input.area),
					scales[score].in(input.score),
					scales[age].in(input.age)
				], [actual]).predicted,
				actual: actual
			})
		})
	}
	
	function test(inputs, outputs) {
		
		inputs.forEach((input, index) => {
			const { predicted, actual } = test_one(input, outputs[index])
			if (true) console.log(`predicted: ${predicted} actual: ${actual}`)
		})
	}
	
	function test_one(input, output) {
		
		const logits = model.forward(input).data
		const scales = dataset().scales
		const indices = () => { return { area: 0, score: 1, age: 2, price: 3 }}
		const { area, score, age, price } = indices()
		const predicted = scales[price].out(logits)
		const actual = scales[price].out(output[0])
		return { predicted, actual }
	}
}
