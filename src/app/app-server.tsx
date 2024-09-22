import { StaticRouter } from 'react-router-dom/server'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import RouterRender from './util/router-render'
import initStore from './util/router-ssrdata'
import { createStore } from './store/note'
import router from './router/index'
import '../style/note.less'

const store = createStore({})

function Index(url) {
	return (
		<Provider store={store}>
			<StaticRouter location={url} basename={router.baseName}>
				<RouterRender router={router} />
			</StaticRouter>
		</Provider>
	)
}

export default async function render(ctx) {
	const { url, path } = ctx
	await initStore(ctx, store)
	const root = ReactDOMServer.renderToString(<Index url={url} path={path} />)
	return root
}
