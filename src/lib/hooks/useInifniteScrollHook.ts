import { useEffect, useRef } from 'react';

type UseInfiniteScrollHookProps = {
  container: React.MutableRefObject<HTMLDivElement | null>;
  callback: () => void;
  offset?: number;
};

export default function useInfiniteScrollHook({
  container,
  callback,
  offset = 0,
}: UseInfiniteScrollHookProps) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleScroll = () => {
    if (
      container.current &&
      container.current.scrollTop + container.current.clientHeight >=
        container.current.scrollHeight - offset
    ) {
      callbackRef.current();
    }
  };

  useEffect(() => {
    if (!container) return;

    if (container.current) {
      container.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container.current) {
        container.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [container?.current, offset]);
}
