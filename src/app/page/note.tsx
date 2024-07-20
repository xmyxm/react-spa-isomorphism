import TripDetail from '../component/tripdetail'
import '../style/note.less'

export function Note() {
	return <TripDetail />
}

Note.sslLoad = async (store, ctx) => {
	await store.dispatch.tripDetail.getTripDetailList(ctx)
}

Note.sslState = (store): any => {
	const state = store.getState()
	return state
}

export default Note
