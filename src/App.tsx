import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';

import RootNavigator from './navigation/RootNavigator';
import { AppProps } from './navigation/types';

export type { AppProps };

export default function App(props: AppProps): React.ReactElement {
  return (
    <NavigationIndependentTree>
      <NavigationContainer
        onUnhandledAction={(action) => {
          if (action.type === 'GO_BACK' && props.onBack) {
            props.onBack();
          }
        }}>
        <RootNavigator {...props} />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
