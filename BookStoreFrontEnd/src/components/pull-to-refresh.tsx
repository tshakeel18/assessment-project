import RefreshLoader from './refresh-loader';
import usePullToRefresh from '../hooks/use-pull-to-refresh';

const PullToRefresh = () => {
  const { refreshCont, pullChange } = usePullToRefresh();

  return (
    <div
      ref={refreshCont}
      className="refresh-container w-fit -mt-10 m-auto"
      style={{ marginTop: pullChange && pullChange > 0 ? pullChange / 3.118 : '' }}>
      <RefreshLoader pullChange={pullChange}></RefreshLoader>
    </div>
  );
};

export default PullToRefresh;
