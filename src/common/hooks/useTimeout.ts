import { useEffect, useRef } from "react";

function useTimeout(
  callback: () => void,
  dependencies: any[],
  delay: number = 0
): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const callLatestCallback = () => savedCallback.current();
    const id = setTimeout(callLatestCallback, delay);
    return () => clearTimeout(id);
  }, [...dependencies, delay]);
}

export default useTimeout;
