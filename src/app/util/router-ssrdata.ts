const { matchRoutes } = require('react-router-config')
import router from '../router'

export default async function initStore(ctx, store) {
	const matchs = matchRoutes(router.routes, ctx.path)
	await Promise.all(
		matchs.map(({ route }) => {
			// @ts-ignore
			if (route.component.sslLoad) {
				// @ts-ignore
				return route.component.sslLoad(null, store)
				// @ts-ignore
			} else if (route.component.load) {
				// @ts-ignore
				return route.component.load().then(res => {
					return res.default.sslLoad ? res.default.sslLoad(null, store) : null
				})
			}
			return Promise.resolve()
		}),
	)
}
