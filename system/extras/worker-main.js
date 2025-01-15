
import { Bus } from './bus.js'

const source = Symbol('outside')
const bus = Bus()

bus.on('*', (...array) => {
	if (array.at(-1) == source) return
	postMessage(array)
})

onmessage = (event) => {
	const [ key, value ] = event.data
	if (key == 'worker') install(value.url, value.fn)
	bus.emit.apply(bus, [...event.data, source])
}

function install(url, fn) {
	
	import(url).then(module => {
		module[fn](bus, false)
		bus.emit('worker-ready')
	})
}
