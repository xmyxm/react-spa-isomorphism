import Weather from '../component/weather'
import TripMenu from '../component/tripmenu'
import Head from '../component/head'
import Foot from '../component/foot'
import '../style/index.less'

export function Index() {
	return (
		<>
			<Head title="React Rematch SPA SSR" />
			<Weather />
			<TripMenu />
			<Foot />
		</>
	)
}

Index.sslLoad = async (store, ctx) => {
	await Promise.all([store.dispatch.weather.getWeatherInfo(ctx), store.dispatch.tripMenu.getTripMenuList(ctx)])
}

Index.sslState = (store): any => {
	const state = store.getState()
	return state
}

export default Index
