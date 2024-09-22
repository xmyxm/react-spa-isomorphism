import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { Routes, Route } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import { ReactElement } from 'react'
import router from '../router'

const parentRoutePath = ''

export const CHAR_FORWARD_SLASH = 47

function join(parentPath: string = '', path: string = '') {
    if (path.charCodeAt(0) === CHAR_FORWARD_SLASH) {
        if (parentPath.charCodeAt(parentPath.length - 1) === CHAR_FORWARD_SLASH) {
            return parentPath + path.slice(1)
        }
    } else {
        if (parentPath.charCodeAt(parentPath.length - 1) !== CHAR_FORWARD_SLASH) {
            return parentPath + '/' + path
        }
    }
    return parentPath + path
}

function render(route: RouteConfig, parentRoutePath: string, props: RouteConfigComponentProps): React.ReactNode {
    const Component = route.component
    const routes = renderRoutes(route.routes, parentRoutePath)

    if (Component) {
        return <Component {...props} > {routes} </Component>
    }

    return routes
}


export default function RouterRender(): ReactElement {
    return (
        <Routes>
            {
                router.routes.map((route: RouteConfig, idx) => (
                    <Route
                        key={idx}
                        path={join(parentRoutePath, route.path as string)}
                        // @ts-ignore
                        element={(props: RouteConfigComponentProps<{}>) => render(route, join(parentRoutePath, route.path as string), props)}
                    />
                ))
            }
        </Routes>
    )
}
