import { rest } from 'msw'
import { Provider } from 'react-redux'
import App from './App'
import { server } from './test/server'
import store from './store'
import { render } from '@testing-library/react-native';

const loading = 'Loading...'

describe('App', () => {
  it('handles default response', async () => {
    const component = (
      <Provider store={store}>
        <App />
      </Provider>
    )

    const { findByText, getByLabelText, getByText } = render(component);
    expect(getByText(loading)).toBeOnTheScreen();

    await findByText('bulbasaur')

    const image = getByLabelText('bulbasaur');
    expect(image).toBeOnTheScreen();
    expect(image.props.source.uri).toEqual('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png');
  });

  it('handles error response', async () => {
    // force msw to return error response
    server.use(
      rest.get(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur',
        (req, res, ctx) => {
          return res(ctx.status(500))
        }
      )
    )

    const component = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    const { findByText, getByText } = render(component);
    expect(getByText(loading)).toBeOnTheScreen();
    await findByText('Oh no, there was an error');
    expect(true).toBeTruthy();
  });

  it('handles mock response', async () => {
    const name = 'pikachu'
    const front_shiny = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png'

    // force msw to return error response
    server.use(
      rest.get(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur',
        (req, res, ctx) => {
          return res(ctx.json({
            species: {
              name,
            },
            sprites: {
              front_shiny,
            },
          }))
        }
      )
    )

    const component = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    const { findByText, getByLabelText, getByText } = render(component);
    expect(getByText(loading)).toBeOnTheScreen();
    await findByText(name)

    const image = getByLabelText(name);
    expect(image).toBeOnTheScreen();
    expect(image.props.source.uri).toEqual(front_shiny);
  });
})