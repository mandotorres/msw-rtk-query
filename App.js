import { Provider as StoreProvider } from 'react-redux';

import store from './store';
import Container from './container';

export default function App () {
  return (
    <StoreProvider store={store}>
      <Container />
    </StoreProvider>
  );
};
