
export function generate_combinations(arrays, fn, index = 0, current = []) {
	
	if (index === arrays.length) return fn(current)	
	for (const element of arrays[index]) {
		generate_combinations(arrays, fn, index + 1, [...current, element])
	}
}
