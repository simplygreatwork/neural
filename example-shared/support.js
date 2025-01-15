
import { display_files } from './files.js'

export function enhance(key) {
	
	inject()
	let entry = entries(key)
	if (entry) display_files(entry.sources)
}

function inject() {
	return
}

function entries(key) {
	
	const entries = {
		graph: {
			sources: [
				'../example-graph/index.html',
				'../example-graph/core.js',
				'../example-graph/ui.js',
				'../example-graph/plot.js',
				'../data-graph/main.js',
				'../system/src/engine.js',
				'../system/src/network.js',
				'../system/src/loss.js',
				'../system/src/activation.js',
				'../system/extras/trainer.js',
				'../system/extras/config.js',
				'../system/extras/range.js',
				'../system/extras/bus.js'
			],
			scripts: [
				'../library/d3.umd.js',
				'../library/plot.umd.js'
			],
			stylesheets: [
				'../example-shared/main.css',
				'https://unpkg.com/@speed-highlight/core/dist/themes/default.css',
				'https://unpkg.com/@speed-highlight/core/dist/themes/github-dim.css'
			]
		},
		housing: {
			sources: [
				'../example-housing/index.html',
				'../example-housing/core.js',
				'../example-housing/ui.js',
				'../example-housing/plot.js',
				'../data-housing/main.js',
				'../system/src/engine.js',
				'../system/src/network.js',
				'../system/src/loss.js',
				'../system/src/activation.js',
				'../system/extras/trainer.js',
				'../system/extras/config.js',
				'../system/extras/range.js',
				'../system/extras/bus.js'
			],
			scripts: [
				'../library/d3.umd.js',
				'../library/plot.umd.js'
			],
			stylesheets: [
				'../example-shared/main.css',
				'https://unpkg.com/@speed-highlight/core/dist/themes/default.css',
				'https://unpkg.com/@speed-highlight/core/dist/themes/github-dim.css'
			]
		}
	}
	
	return entries[key]
}