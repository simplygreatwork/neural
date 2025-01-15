
import { range } from '../system/extras/range.js'
import { generate_combinations } from '../system/extras/combos.js'

export const calculate = (area, score, age) => (area * 300) + (score * 1500) - (age * 1000)

export function make_training_entries() {
	
	const entries = []
	generate_combinations([
		range(1001, 5501, 100),
		range(0, 101, 10),
		range(0, 101, 10),
	], (array, index) => {
		entries.push({
			area: array[0],
			score: array[1],
			age: array[2],
			price: calculate(array[0], array[1], array[2])
		})
	})
	return entries
}

export function make_testing_entries() {
	
	const entries = []
	generate_combinations([
		range(1001, 5001, 53),
		range(0, 101, 5),
		range(0, 101, 5),
	], (array, index) => {
		entries.push({
			area: array[0],
			score: array[1],
			age: array[2],
			price: calculate(array[0], array[1], array[2])
		})
	})
	return entries
}

export function entries_to_dataset(entries, scales) {
	
	entries = flatten_entries(entries)
	scales = scales || make_scales(entries)
	entries = scale_in(entries, scales)
	return {
		inputs: entries.map((entry) => [entry[0], entry[1], entry[2]]),
		outputs: entries.map((entry) => [entry[3]]),
		scales: scales
	}
}

function flatten_entries(entries) {
	return entries.map((entry) => [entry.area, entry.score, entry.age, entry.price])
}

function make_scales(entries) {
	
	let scales = []
	entries[0].forEach((each, index) => {
		scales.push(scale(entries, index))
	})
	return scales
}

function scale(array, index) {
	
	array = array.map((each) => each[index])
	const min = Math.min(...array)
	const max = Math.max(...array)
	return {
		in: (value) => (value - min) / (max - min),
		out: (value) => value * (max - min) + min
	}
}

export function scale_in(data, scales) {
	
	return data.map((entry) => {
		return entry.map((each, i) => {
			return scales[i].in(each)
		})
	})
}

export function scale_out(data, scales) {
	
	return data.map((entry) => {
		return entry.map((each, i) => {
			return scales[i].out(each)
		})
	})
}
