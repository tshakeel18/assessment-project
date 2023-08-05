import { useEffect, useRef, useState } from 'react';

const usePullToRefresh = () => {
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState<number | undefined>();
  const refreshCont = useRef<HTMLDivElement | null>(null);

  const pullStart = (e: TouchEvent) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };

  const pull = (e: TouchEvent) => {
    const touch = e.targetTouches[0];
    const { screenY } = touch;
    const pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
  };

  const initLoading = () => {
    if (refreshCont.current) {
      refreshCont.current.classList.add('loading');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const endPull = () => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange && pullChange > 220) initLoading();
  };

  useEffect(() => {
    window.addEventListener('touchstart', pullStart);
    window.addEventListener('touchmove', pull);
    window.addEventListener('touchend', endPull);
    return () => {
      window.removeEventListener('touchstart', pullStart);
      window.removeEventListener('touchmove', pull);
      window.removeEventListener('touchend', endPull);
    };
  }, [pullChange]);

  return {
    refreshCont,
    pullChange
  };
};

export default usePullToRefresh;
