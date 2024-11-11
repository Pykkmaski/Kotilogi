import { useCallback, useState } from 'react';

export type StatusType = 'idle' | 'loading' | 'error' | 'done';

export function useStatusWithAsyncMethod(
  action: () => Promise<void>,
  onError?: (err: any) => void,
  onDone?: () => void
) {
  const [status, setStatus] = useState<StatusType>('idle');
  const method = useCallback(async () => {
    setStatus('loading');
    try {
      await action();
      setStatus('done');
      onDone && onDone();
    } catch (err) {
      onError && onError(err);
      setStatus('error');
    } finally {
      setStatus(prev => (prev === 'loading' ? 'idle' : prev));
    }
  }, [action, setStatus]);

  return {
    method,
    status,
  };
}
