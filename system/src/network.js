
import { Value } from './engine.js'

export class Model {
	
	constructor(layers = [], options = {}) {
		this.layers = layers
	}
	
	add(layer) {
		this.layers.push(layer)
	}
	
	forward(inputs) {
		
		return transform({
			subject: inputs,
			using: this.layers,
			transform: (subject, layer) => layer.forward(subject)
		})
	}
	
	parameters() {
		return this.layers.flatMap((layer) => layer.parameters())
	}
	
	zero_grad() {
		this.parameters().forEach((param) => param.grad = 0)
	}
	
	learn(learning_rate) {
		this.parameters().forEach((p) => p.data -= learning_rate * p.grad)
	}
	
	weights() {
		
		return this.layers.map((layer) =>
			layer.neurons.map((neuron) => ({
				weights: neuron.weights.map((weight) => weight.data),
				bias: neuron.bias.data,
			}))
		)
	}
	
	reset() {
		
		this.layers.map((layer) =>
			layer.neurons.map((neuron) => {
				neuron.reset()
			})
		)
	}
	
	toString() {
		return `Model of [${this.layers.map((layer) => layer.toString()).join(', ')}]`
	}
}

export class Layer {
	
	constructor({ neurons, inputs, activation = 'relu', initialization, random = Math.random }) {
		
		this.activation = activation
		this.neurons = make_neurons(neurons, inputs, activation, random, initialization)
	}
	
	forward(inputs) {
		
		let outputs = this.neurons.map((neuron) => neuron.forward(inputs))
		if (this.activation === 'softmax') outputs = Value.softmax(outputs)
		return outputs.length === 1 ? outputs[0] : outputs
	}
	
	parameters() {
		return this.neurons.flatMap((neuron) => neuron.parameters())
	}
	
	toString() {
		return `Layer of [${this.neurons.map((neuron) => neuron.toString()).join(', ')}]`
	}
}

export class Neuron {
	
	constructor({ inputs = 1, activation = 'relu', initialization, weights, bias = 0, random = Math.random }) {
		
		const make_random = make_random_fn(initialization, random, inputs)
		this.origin = Object.assign({}, { inputs, activation, weights, bias, make_random })
		this.activation = activation
		this.reset()
	}
	
	reset() {
		
		const { weights, bias, make_random, inputs } = this.origin
		this.weights = ensure_weights(weights, make_random, inputs)
		this.bias = ensure_bias(bias, make_random)
	}
	
	forward(inputs) {
		
		return this.activate(this.activation, transform({
			subject: this.bias,
			using: this.weights,
			transform: (subject, weight, i) => subject.add(weight.mul(inputs[i]))
		}))
	}
	
	activate(activation, value) {
		
		if (activation === 'none') return value
		if (activation === 'linear') return value.linear()
		if (activation === 'relu') return value.relu()
		if (activation === 'leakyRelu') return value.leakyRelu()
		if (activation === 'tanh') return value.tanh()
		if (activation === 'sigmoid') return value.sigmoid()
		if (activation === 'softmax') return value
		throw new Error(`Unsupported activation function: ${activation}`)
	}
	
	parameters() {
		return [...this.weights, this.bias]
	}
	
	toString() {
		return `${this.activation.toUpperCase()}Neuron(${this.weights.length})`
	}
}

function make_random_fn(initialization, random, inputs) {
	
	return () => {
		if (initialization === 'he') return (random() - 0.5) * Math.sqrt(2 / inputs)
		else return random() * 2 - 1
	}
}

function ensure_weights(weights, make_random, length) {
	return weights || Array.from({ length }, () => new Value(make_random()))
}

function ensure_bias(bias, make_random) {
	return bias === undefined ? new Value(make_random()) : new Value(bias)
}

function make_neurons(neurons, inputs, activation, random, initialization) {
	return Array.from({ length: neurons }, () => new Neuron({ inputs, activation, random, initialization }))
}

function transform({ subject, using, transform }) {
	return using.reduce(transform, subject)
}

function invoke(fn) {
	return fn()
}
