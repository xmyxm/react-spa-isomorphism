import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const withLoadable = (comp) => {
  return Loadable({
    loader: comp,
    loading: Loading
  })
};

export default withLoadable;
