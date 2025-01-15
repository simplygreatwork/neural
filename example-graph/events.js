
export function add_event_listener(element, type, fn) {
	
	if (element.ready) return element.addEventListener(type, fn)
	let timer
	let mouse = 'off'
	element.addEventListener('mousedown', (event) => {
		mouse = 'down'
		timer = setTimeout(() => {
			if (mouse == 'up') return
			clearTimeout(timer)
			timer = null
		}, 300)
	})
	element.addEventListener('mouseup', (event) => {
		mouse = 'up'
		if (timer) {
			element.dispatchEvent(new CustomEvent('clicked'))
			clearTimeout(timer)
			timer = null
		} else {
			element.dispatchEvent(new CustomEvent('held'))
		}
	})
	element.ready = true
	element.addEventListener(type, fn)
}
