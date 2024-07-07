import { ReactElement } from 'react'
import withLoadable from '../util/withLoadable'

const Index = withLoadable(() => import('../page/index'))
const Note = withLoadable(() => import('../page/note'))
const NotFound = withLoadable(() => import('../component/notFound'))
const Cooperation = withLoadable(() => import('../component/cooperation'))

interface routerInfoType {
	path: string
	exact: boolean
	component: ReactElement
	title: string
	meta: object
	routes: routerInfoType[] | undefined | null
}

const router: { routes: routerInfoType[] } = {
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
