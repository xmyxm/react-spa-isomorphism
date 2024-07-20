import Weather from '../component/weather'
import TripMenu from '../component/tripmenu'
import '../style/index.less'

export function Index() {
	return (
		<>
			<Weather />
			<TripMenu />
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
