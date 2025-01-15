
const source = Symbol('inside')

export function spawn_worker(url, fn, bus) {
	
	bus.on('*', (...array) => {
		if (array.at(-1) == source) return
		worker.postMessage(array)
	})
	const url_ = new URL('./worker-main.js', import.meta.url)
	const worker = new Worker(url_.toString(), { type: 'module' })
	worker.postMessage(['worker', { url: url.toString(), fn }])
	worker.onmessage = (event) => bus.emit.apply(bus, [...event.data, source])
	return new Promise((resolve, reject) => bus.on('worker-ready', () => resolve()))	
}
