import { RouteConfig } from 'react-router-config'
import withLoadable from '../util/withLoadable'

const Index = withLoadable(() => import('../page/index'))
const Note = withLoadable(() => import('../page/note'))
const NotFound = withLoadable(() => import('../component/notFound'))
const Cooperation = withLoadable(() => import('../component/cooperation'))

export interface RouterInfoType {
	baseName: string
	routes: RouteConfig[]
}

const router: RouterInfoType = {
	baseName: '/',
	routes: [
		{
			path: '/',
			exact: true,
			component: Index,
			title: '首页',
			meta: {},
			routes: undefined,
		},
		{
			path: '/note',
			exact: true,
			component: Note,
			title: '详情页',
			meta: {},
			routes: [
				{
					path: '/note/cooperation',
					exact: true,
					component: Cooperation,
					title: '友情合作',
					meta: { icon: 'home', keepAlive: true },
					routes: undefined,
				},
			],
		},
		{
			path: '/404',
			component: NotFound,
			meta: {},
			exact: false,
			title: '',
			routes: undefined,
		},
	],
}

export default router
