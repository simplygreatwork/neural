
export class Value {
	
	constructor(data, _children = [], _op = '') {
		
		this.data = Value.limit_precision(data)
		this.grad = 0
		this._backward = () => {}
		this._prev = new Set(_children)
		this._op = _op
	}
	
	static limit_precision(value) {
		return +value.toFixed(8)
	}
	
	static ensure_value(value) {
		return value instanceof Value ? value : new Value(value)
	}
	
	add(value) {
		
		value = Value.ensure_value(value)
		const out = new Value(this.data + value.data, [this, value], '+')
		out._backward = () => {
			this.grad += out.grad
			value.grad += out.grad
		}
		return out
	}
	
	sub(value) {
		
		value = Value.ensure_value(value)
		return this.add(value.neg())
	}
	
	neg() {
		return this.mul(-1)
	}
	
	mul(value) {
		
		value = Value.ensure_value(value)
		const out = new Value(this.data * value.data, [this, value], '*')
		out._backward = () => {
			this.grad += value.data * out.grad
			value.grad += this.data * out.grad
		}
		return out
	}
	
	div(value) {
		
		value = Value.ensure_value(value)
		return this.mul(value.pow(-1))
	}
	
	exp() {
		
		const out = new Value(Math.exp(this.data), [this], 'exp')
		out._backward = () => {
			this.grad += out.data * out.grad
		}
		return out
	}
	
	pow(value) {
		
		if (typeof value !== 'number') throw new Error('only supporting int/float powers for now')
		const out = new Value(this.data ** value, [this], `**${value}`)
		out._backward = () => {
			this.grad += value * this.data ** (value - 1) * out.grad
		}
		return out
	}
	
	log(epsilon = 1e-8) {
		
		if (! this.data) this.data = epsilon
		const out = new Value(Math.log(this.data), [this], 'log')
		out._backward = () => {
			this.grad += (1 / this.data) * out.grad
		}
		return out
	}
	
	linear() {
		return this
	}
	
	relu() {												// range 0 to 1
		
		const data = this.data < 0 ? 0 : this.data
		const out = new Value(data, [this], 'ReLU')
		out._backward = () => {
			this.grad = this.data > 0 ? out.grad : 0
		}
		return out
	}
	
	leakyRelu(alpha = 1e-2) {						// range 0 to 1
		
		const data = this.data < 0 ? alpha * this.data : this.data
		const out = new Value(data, [this], 'LeakyReLU')
		out._backward = () => {
			this.grad = this.data > 0 ? out.grad : alpha * out.grad
		}
		return out
	}
	
	tanh() {												// range -1 to 1
		
		const data = (Math.exp(2 * this.data) - 1) / (Math.exp(2 * this.data) + 1)
		const out = new Value(data, [this], 'tanh')
		out._backward = () => {
			this.grad = (1 - data ** 2) * out.grad
		}
		return out
	}
	
	sigmoid() {											// range 0 to 1
		
		const data = 1 / (1 + Math.exp(-this.data))
		const out = new Value(data, [this], 'sigmoid')
		out._backward = () => {
			this.grad += out.data * (1 - out.data) * out.grad
		}
		return out
	}
	
	static softmax(values) {						// sum 0 to 1
		
		const maxVal = Math.max(...values.map((val) => val.data))
		const expValues = values.map((val) => val.sub(maxVal).exp())
		const sumExpValues = expValues.reduce((a, b) => a.add(b), new Value(0))
		let outValues = expValues.map((expVal, i) => {
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
	
	backward() {
		
		const topo = []
		const visited = new Set()
		const addedToTopo = new Set()
		const stack = [this]
		while (stack.length > 0) {
			const node = stack[stack.length - 1]
			if (! visited.has(node)) {
				visited.add(node)
				let allChildrenVisited = true
				Array.from(node._prev)
				.reverse()
				.forEach((child) => {
					if (! visited.has(child)) {
						stack.push(child)
						allChildrenVisited = false
					}
				})
				if (allChildrenVisited) {
					stack.pop()
					if (! addedToTopo.has(node)) {
						topo.push(node)
						addedToTopo.add(node)
					}
				}
			} else {
				stack.pop()
				if (! addedToTopo.has(node)) {
					topo.push(node)
					addedToTopo.add(node)
				}
			}
		}
		this.grad = 1
		topo.reverse().forEach((v) => v._backward())
	}
	
	toString() {
		return this._op
		? `Value(data=${this.data}, grad=${this.grad}, op=${this._op})`
		: `Value(data=${this.data}, grad=${this.grad})`
	}
}
