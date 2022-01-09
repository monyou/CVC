import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error: any) {
        if (error.status === 404) return false;
        else if (failureCount < 1) return true;
        else return false;
      },
    },
  },
});

const ServerCacheProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

ServerCacheProvider.displayName = "ServerCacheProvider";
export default ServerCacheProvider;
