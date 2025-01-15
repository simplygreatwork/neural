
export const Config = () => {
	
	const config = {}
	return Object.assign(config, {
		define: (names) => {
			names.forEach((name) => config[name] = prop())
			return config
		},
		config,
		title: prop(),
		training: prop(),
		testing: prop(),
		dataset: prop(),
		steps: prop(),
		batches: prop(),
		cost: prop(),
		learning_rate: prop(),
		optimizer: prop()
	})
}

const prop = () => {
	
	let value
	return (value_) => {
		if (value_) value = value_
		else return value
	}
}
