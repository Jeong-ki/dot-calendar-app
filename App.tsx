import React from 'react';
import { ErrorBoundary } from '@/components/layout';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from '@/store';
import AppInner from './AppInner';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NavigationContainer>
          <AppInner />
        </NavigationContainer>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
