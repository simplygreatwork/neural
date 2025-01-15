
export const activations = {
	none,
	linear,
	relu,
	leakyRelu,
	tanh,
	sigmoid,
	softmax
}

function none() {
	return this
}

function linear() {
	return this
}

function relu() {												// range 0 to 1
	
	const data = this.data < 0 ? 0 : this.data
	const out = new Value(data, [this], 'ReLU')
	out._backward = () => {
		this.grad = this.data > 0 ? out.grad : 0
	}
	return out
}

function leakyRelu(alpha = 1e-2) {						// range 0 to 1
	
	const data = this.data < 0 ? alpha * this.data : this.data
	const out = new Value(data, [this], 'LeakyReLU')
	out._backward = () => {
		this.grad = this.data > 0 ? out.grad : alpha * out.grad
	}
	return out
}

function tanh() {												// range -1 to 1
	
	const data = (Math.exp(2 * this.data) - 1) / (Math.exp(2 * this.data) + 1)
	const out = new Value(data, [this], 'tanh')
	out._backward = () => {
		this.grad = (1 - t ** 2) * out.grad
	}
	return out
}

function sigmoid() {											// range 0 to 1
	
	const data = 1 / (1 + Math.exp(-this.data))
	const out = new Value(data, [this], 'sigmoid')
	out._backward = () => {
		this.grad += out.data * (1 - out.data) * out.grad
	}
	return out
}

function softmax(values) {									// sum 0 to 1
	
	const maxVal = Math.max(...values.map((val) => val.data))
	const expValues = values.map((val) => val.sub(maxVal).exp())
	const sumExpValues = expValues.reduce((a, b) => a.add(b), new Value(0))
	const outValues = expValues.map((expVal, i) => {
		const out = expVal.div(sumExpValues)
		out._backward = () => {
			const softmaxVal = out.data
			values.forEach((val, j) => {
				if (i === j) {
					val.grad += softmaxVal * (1 - softmaxVal) * out.grad
				} else {
					val.grad += -softmaxVal * (expValues[j].data / sumExpValues.data) * out.grad
				}
			})
		}
		return out
	})
	return outValues
}

const softmax2 = (logits) => {
	const max = Math.max(...logits)
	const expArr = logits.map(x => Math.exp(x - max))
	const sum = expArr.reduce((a, b) => a + b, 0)
	return expArr.map(x => x / sum)
}

