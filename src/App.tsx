import React from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import RootNavigator from "./navigation/RootNavigator";
import {AppProps} from "./navigation/types";

export type {AppProps};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 phút
    },
  },
});

export default function App(props: AppProps): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationIndependentTree>
        <NavigationContainer
          onUnhandledAction={(action) => {
            if (action.type === "GO_BACK" && props.onBack) {
              props.onBack();
            }
          }}
        >
          <RootNavigator {...props} />
        </NavigationContainer>
      </NavigationIndependentTree>
    </QueryClientProvider>
  );
}
