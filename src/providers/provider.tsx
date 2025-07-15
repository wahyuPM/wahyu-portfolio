"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { DehydratedState } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}

/**
 * Providers component sets up the React Query environment for the application.
 * It initializes a QueryClient and uses QueryClientProvider to make it available
 * throughout the component tree. It also uses HydrationBoundary to manage the
 * hydration of server-side rendered data.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @param {DehydratedState} [props.dehydratedState] - Optional dehydrated state for server-side rendering.
 *
 * @example
 * <Providers dehydratedState={initialDehydratedState}>
 *   <YourComponent />
 * </Providers>
 */
