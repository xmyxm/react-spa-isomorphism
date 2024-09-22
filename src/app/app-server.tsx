import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { createStore } from './store/note'
import RouterRender from './util/router-render'
import '../style/note.less'

const initialState = typeof window === 'object' ? (window as any).__INITIAL_STATE__ : {}

const store = createStore(initialState)

export function Note(ctx) {
	const url = ctx.href
	const path = ctx.path
	return (
		<Provider store={store}>
			<StaticRouter location={url} basename={path}>
				<RouterRender />
			</StaticRouter>
		</Provider>
	)
}
