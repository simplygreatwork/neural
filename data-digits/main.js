
export function Data() {
	
	const groups = {}
	const size = [28, 28]
	const data = {}
	return Object.assign(data, {
		size: size,
		area: size[0] * size[1],
		load: (then) => {
			load_mnist((mnist) => {
				data.mnist = mnist
				groups['training'] = group('training', mnist['train_images'], mnist['train_labels'])
				groups['testing'] = group('testing', mnist['test_images'], mnist['test_labels'])
				then(data)
			})
			return data
		},
		groups: () => Object.keys(groups).map((key) => groups[key]),
		group: (name) => groups[name],
		make: (mode, size) => make(data.group(mode), size),
		make_data_url: (image_array) => image_array_to_data_url(data, image_array)
	})
	
	function make(group, size) {
		
		const inputs = [], outputs = []
		const { more, next } = group.entries(size)
		while ( more ()) {
			next((image, label) => {
				inputs.push(image)
				outputs.push(label)
			})
		}
		return { inputs, outputs }
	}
	
	function group(name, images, labels) {
		
		const canvases = create_canvases()
		const group = {}
		return Object.assign(group, {
			name: name,
			rendered: [],
			length: () => labels.length,
			image: (i) => false ? group.rendered[i].small.pixels : images[i],
			url: (i) => group.rendered[i] ? group.rendered[i].large.url : null,
			label: (i) => labels[i],
			entries: (size) => {
				let i = 0
				return {
					more: () => i < size,
					next: (fn) => {
						if (! group.rendered[i]) group.rendered[i] = render(group.image(i), canvases)
						return fn(group.rendered[i].large.pixels, group.label(i), group.url(i++))
					}
				}
			}
		})
	}
	
	function create_canvases() {
		
		const large = create_canvas(28, 28)
		const small = create_canvas(14, 14)
		const enlarged = create_canvas(28, 28)
		return { large, small, enlarged }
		
		function create_canvas(width, height) {
			
			const canvas = document.createElement('canvas')
			canvas.width = width
			canvas.height = height
			const context = canvas.getContext('2d')
			return { canvas, context }
		}
	}
	
	function render(pixels, { large, small, enlarged }) {
		
		const container = document.querySelector('#debug-canvas')
		if (container) {
			container.appendChild(large.canvas)
			container.appendChild(small.canvas)
			container.appendChild(enlarged.canvas)
		}
		
		large.pixels = pixels
		const image_data = pixels_into_image_data(large.pixels, large.context.createImageData(28, 28))
		large.context.clearRect(0, 0, large.canvas.width, large.canvas.height)
		large.context.putImageData(image_data, 0, 0)
		if (false) large.pixels = image_data_into_pixels(large.context.getImageData(0, 0, 28, 28), [])
		large.url = large.canvas.toDataURL()
		small.context.clearRect(0, 0, small.canvas.width, small.canvas.height)
		small.context.drawImage(large.canvas, 0, 0, 14, 14)
		small.pixels = image_data_into_pixels(small.context.getImageData(0, 0, 14, 14), [])
		small.url = small.canvas.toDataURL()
		small.context.clearRect(0, 0, small.canvas.width, small.canvas.height)
		small.context.putImageData(pixels_into_image_data(small.pixels, small.context.getImageData(0, 0, 14, 14)), 0, 0)
		enlarged.context.clearRect(0, 0, enlarged.canvas.width, enlarged.canvas.height)
		enlarged.context.drawImage(small.canvas, 0, 0, 28, 28)
		enlarged.pixels = image_data_into_pixels(enlarged.context.getImageData(0, 0, 28, 28), [])
		enlarged.url = enlarged.canvas.toDataURL()
		
		return {
			large: { pixels: large.pixels, url: large.url },
			small: { pixels: small.pixels, url: small.url },
			enlarged: { pixels: enlarged.pixels, url: enlarged.url }
		}
		
		function image_data_into_pixels(image_data, pixels) {
			
			pixels.splice(0, pixels.length)
			const data = image_data.data
			let length = data.length
			for (let i = 0; i < length; i++) {
				if (i % 4 == 0) pixels.push(data[i])
			}
			return pixels
		}
		
		function pixels_into_image_data(pixels, image_data) {
			
			for (let i = 0; i < pixels.length; i++) {
				let brightness = pixels[i]
				let index = i * 4
				image_data.data[index + 0] = 255
				image_data.data[index + 1] = 255
				image_data.data[index + 2] = 255
				image_data.data[index + 3] = brightness
			}
			return image_data
		}
	}
}

// From: https://github.com/CodingTrain/Toy-Neural-Network-JS/blob/master/examples/mnist/mnist.js

export function load_mnist(callback) {
	
	let result = {}
	let files = {
		train_images: '../data-digits/mnist/train-images.idx3-ubyte',
		train_labels: '../data-digits/mnist/train-labels.idx1-ubyte',
		test_images: '../data-digits/mnist/t10k-images.idx3-ubyte',
		test_labels: '../data-digits/mnist/t10k-labels.idx1-ubyte'
	}
	return Promise.all(Object.keys(files).map(async key => {
		result[key] = await loadFile(files[key])
	}))
	.then(() => callback(result))
}

async function loadFile(file) {
	
	let buffer = await fetch(file).then(result => result.arrayBuffer())
	let headerCount = 4
	let headerView = new DataView(buffer, 0, 4 * headerCount)
	let headers = new Array(headerCount).fill().map((_, i) => headerView.getUint32(4 * i, false))
	let type, length
	if (headers[0] == 2049) {
		type = 'label'
		length = 1
		headerCount = 2
	} else if (headers[0] == 2051) {
		type = 'image'
		length = headers[2] * headers[3]
	} else {
		throw new Error("Unknown file type " + headers[0])
	}
	
	let data = new Uint8Array(buffer, headerCount * 4)
	if (type == 'image') {
		let array = []
		for (let i = 0; i < headers[1]; i++) {
			array.push(data.subarray(length * i, length * (i + 1)))
		}
		return array
	}
	return data
}
