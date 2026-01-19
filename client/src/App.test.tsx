import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { initialState } from './store/rootReducer';
import App from './App';

test('renders app without crashing', () => {
  const { store } = configureStore(initialState);
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(container).toBeInTheDocument();
});