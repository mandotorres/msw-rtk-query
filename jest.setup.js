import '@testing-library/jest-native/extend-expect';

import { server } from './test/server'
import store from './store'
import { pokemonApi } from './services/pokemon';
import { waitFor } from '@testing-library/react-native';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterAll(() => {
  server.close()
})

afterEach(async () => {
  server.resetHandlers()
  // Clear RTK Query cache after each test
  await waitFor(() => store.dispatch(pokemonApi.util.resetApiState()));
}) 