import { truncateSync } from 'fs';
import { useEffect } from 'react';

export function useSaveToSessionStorage<T>(
  key: string,
  data: T,
  { timeout = 700, enabled = true }: { timeout?: number; enabled?: boolean } = {
    timeout: 700,
    enabled: true,
  }
) {
  useEffect(() => {
    if (!enabled || !data) return;

    const t = setTimeout(() => {
      sessionStorage.setItem(key, JSON.stringify(data));
    }, timeout);

    return () => {
      clearTimeout(t);
      sessionStorage.removeItem(key);
    };
  }, [data, key, timeout, enabled]);
}
