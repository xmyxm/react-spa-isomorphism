import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import RouterRender from './util/router-render'
import { createStore } from './store/index'
import router from './router/index'

const initialState = typeof window === 'object' ? (window as any).__INITIAL_STATE__ : {}

const store = createStore(initialState)

export function Index() {
	return (
		<Provider store={store}>
			<BrowserRouter basename={router.baseName}>
				<RouterRender router={router} />
			</BrowserRouter>
		</Provider>
	)
}

const container = document.getElementById('main')
if (container) {
	const root = createRoot(container)
	root.render(<Index />)
}
