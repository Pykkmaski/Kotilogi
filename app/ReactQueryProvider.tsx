'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function ReactQueryProvider({ children }) {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}
