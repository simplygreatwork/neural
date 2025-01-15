
export function make_points(range, quantity, fn) {
	
	const points = []
	const step = (range[1] - range[0]) / quantity
	let x = range[0]
	while (x <= range[1]) {
		const y = fn(x)
		points.push([x, y])
		x = x + step
	}
	return points
}

export function points_to_split(points) {
	
	const inputs = []
	const outputs = []
	points.forEach((point) => {
		inputs.push([point[0]])
		outputs.push(point[1])
	})
	return { inputs, outputs }
}
