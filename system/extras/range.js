
export const range = (from, to, increment = 1) => {
	
	const length = Math.ceil((to - from) / increment)
	const array = [...Array(length).keys()]
	return array.map((i) => from + i * increment)
}
