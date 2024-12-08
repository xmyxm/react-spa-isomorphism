const Loading = () => <div>Loading...</div>

const withLoadable = comp => {
	return require('react-loadable')({
		loader: comp,
		loading: Loading,
	})
}

export default withLoadable
