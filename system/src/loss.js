
import { Value } from './engine.js'

export const mean_standard_error_1 = (pred, y) => pred.sub(y).pow(2)

export const mean_standard_error = (predictions, target) => {
	
	predictions = predictions.length > 0 ? predictions : [predictions]
	target = target.length > 0 ? target : [target]
	
	let sum = new Value(0)
	let n = target.length
	for (let i = 0; i < n; i++) {
		let y = target[i]
		let pred = predictions[i]
		sum = sum.add((y.sub(pred)).pow(2))
	}
	return sum.div(new Value(n))
}
