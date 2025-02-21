import { useCallback, useState } from 'react';

export type StatusType = 'idle' | 'loading' | 'error' | 'done';

export function useStatusWithAsyncMethod(
  action: () => Promise<void>,
  onError?: (err: any) => void,
  onDone?: () => void
) {
  const [status, setStatus] = useState<StatusType>('idle');
  const method = useCallback(async () => {
    let status: StatusType = 'loading';
    setStatus(status);
    try {
      await action();
      status = 'done';
      onDone && onDone();
    } catch (err) {
      onError && onError(err);
      status = 'error';
    } finally {
      setStatus(status);
    }
  }, [action, setStatus]);

  return {
    method,
    status,
  };
}
