"use client"

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query"
import { useState, type PropsWithChildren } from "react"

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())
  const dehydratedState = dehydrate(queryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}
