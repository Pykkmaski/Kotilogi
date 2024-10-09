import { useEffect } from 'react';

export function useSaveToSessionStorage<T>(key: string, data: T, timeout: number = 700) {
  useEffect(() => {
    const t = setTimeout(() => {
      sessionStorage.setItem(key, JSON.stringify(data));
    }, timeout);

    return () => {
      clearTimeout(t);
      sessionStorage.removeItem(key);
    };
  });
}
