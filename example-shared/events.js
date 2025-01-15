
export function add_event_listener(element, type, fn) {
	
	if (! ['helddown', 'heldup', 'clicked'].includes(type)) console.error('wrong type')
	if (element.ready) return element.addEventListener(type, fn)
	let timer
	let mouse = 'off'
	
	element.addEventListener('mousedown', (event) => {
		mouse = 'down'
		timer = setTimeout(() => {
			if (mouse == 'up') return
			clearTimeout(timer)
			timer = null
			element.dispatchEvent(new CustomEvent('helddown'))
		}, 300)
	})
	
	element.addEventListener('mouseup', (event) => {
		mouse = 'up'
		if (timer) {
			element.dispatchEvent(new CustomEvent('clicked'))
			clearTimeout(timer)
			timer = null
		} else {
			element.dispatchEvent(new CustomEvent('heldup'))
		}
	})
	
	element.ready = true
	element.addEventListener(type, fn)
}
