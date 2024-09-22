import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from './store/note'
import RouterRender from './util/router-render'
import '../style/note.less'

const initialState = typeof window === 'object' ? (window as any).__INITIAL_STATE__ : {}

const store = createStore(initialState)

export function Note() {
	return (
		<Provider store={store}>
			<BrowserRouter basename={window['__ASTRO_PROJECT_ROUTER__']}>
				<RouterRender />
			</BrowserRouter>
		</Provider>
	)
}


// const container = document.getElementById('main')
// if (container) {
// 	const root = createRoot(container)
// 	root.render(<Index />)
// }