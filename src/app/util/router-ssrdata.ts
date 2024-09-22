const { matchRoutes } = require("react-router-config");
import router from '../router'

export default async function initStore(ctx, store) {
    const matchs = matchRoutes(router.routes, ctx.path)
    await Promise.all(
        matchs.map(({ route }) => {
            // @ts-ignore
            if (route.component.asyncData) {
                // @ts-ignore
                return route.component.asyncData(null, store)
                // @ts-ignore
            } else if (route.component.load) {
                // @ts-ignore
                return route.component.load().then(res => {
                    return res.default.asyncData ? res.default.asyncData(null, store) : null
                })
            }
            return Promise.resolve()
        })
    )
}
