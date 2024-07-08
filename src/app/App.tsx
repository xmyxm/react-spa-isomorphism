import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { createStore } from './store/note'
import Head from './component/head'
import Foot from './component/foot'
import router from './router'
import '../style/note.less'

const initialState = typeof window === 'object' ? (window as any).__INITIAL_STATE__ : {}

const store = createStore(initialState)

export function Note() {
	return (
		<Provider store={store}>
			<Head title="React Rematch SSR" />
			<Router>{renderRoutes(router.routes)}</Router>
			<Foot />
		</Provider>
	)
}
