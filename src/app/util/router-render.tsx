import { Routes, Route } from 'react-router-dom'
import { ReactElement } from 'react'
import { RouterInfoType } from '../router'

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

function deepRender(route: any, parentRoutePath: string): ReactElement {
	return (
		<Routes>
			{route.routes.map((route: any, idx) => (
				<Route
					key={idx}
					path={join(parentRoutePath, route.path as string)}
					// @ts-ignore
					element={(props: RouteConfigComponentProps<{}>) =>
						deepRender(route, join(parentRoutePath, route.path as string))
					}
				/>
			))}
		</Routes>
	)
}

function render(route: any, parentRoutePath: string, props: any): React.ReactNode {
	const Component = route.component
	const routes = route.routes ? deepRender(route.routes, parentRoutePath) : null

	if (Component) {
		return <Component {...props}> {routes} </Component>
	}

	return routes
}

export interface RouterRenderPropsType {
	router: RouterInfoType
}

export default function RouterRender(props: RouterRenderPropsType): ReactElement {
	return (
		<Routes>
			{props.router.routes.map((route: any, idx) => (
				<Route
					key={idx}
					path={join(parentRoutePath, route.path as string)}
					// @ts-ignore
					element={(props: RouteConfigComponentProps<{}>) =>
						render(route, join(parentRoutePath, route.path as string), props)
					}
				/>
			))}
		</Routes>
	)
}
