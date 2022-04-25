import {useEffect} from "react";

export function useInterval(fetch: () => any, delay: number = 10000, deps = []) {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch();
    }, delay);

    fetch();

    return () => {
      clearInterval(interval);
    };
  }, deps);
}
