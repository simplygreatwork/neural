
import { highlightText } from '../library/speed-highlight/index.js'
import { loadLanguage } from '../library/speed-highlight/index.js'
import { detectLanguage } from '../library/speed-highlight/detect.js'

export async function display_files(array) {
	
	const path = array.shift()
	const file = path.split('/').reverse().filter((each, index) => index == 0)
	fetch(path)
	.then((response) => response.text())
	.then(async (text) => {
		const element = document.querySelector('#files')
		const html = await highlightText(text, detectLanguage(text), true, { hideLineNumbers: true })
		element.insertAdjacentHTML('beforeend', `
		<div class="file-label">
			<span class="file-name">${file}</span>
			<span class="path-name">${path}</span>
		</div>
		`)
		element.insertAdjacentHTML('beforeend', `<div class="shj-lang-js">${html}</div>`)
		if (array.length > 0) display_files(array)
	})
}
