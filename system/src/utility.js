
import { Value } from './engine.js'

export const probable = probabilities => one_hot_decode(probabilities.map(each => each.data))
export const one_hot_decode = (probs) => probs.indexOf(Math.max(...probs))
export const one_hot_encode = (label, numClasses) => {
	const encoding = Array(numClasses).fill(0)
	encoding[label] = 1
	return encoding
}

export const cross_entropy_loss = (predictedProbabilities, labels) => {
	return predictedProbabilities
	.map((p, j) => new Value(-labels[j]).mul(p.log()))
	.reduce((a, b) => a.add(b), new Value(0))
}
