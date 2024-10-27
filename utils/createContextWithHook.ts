import { createContext } from 'react';
import { createUseContextHook } from './createUseContextHook';

export function createContextWithHook<T>(name: string) {
  const Ctx = createContext<T | null>(null);
  const useCtx = createUseContextHook(name, Ctx);
  return [Ctx, useCtx] as const;
}
