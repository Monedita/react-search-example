import { useRef, useEffect } from 'react';

export function useDebounceCallback<T>(callback: (value: T) => void, value: T, delay: number) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callbackRef.current(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
}