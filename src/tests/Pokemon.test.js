import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByText(/pikachu/i);
    expect(pikachuName).toBeDefined();

    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toHaveTextContent(/electric$/i);

    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pikachuWeight).toBeInTheDocument();

    const pikachuMugShot = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuMugShot).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pikachuMugShot).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa o link do card de detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Testa se existe o icone de estrela quando o pokemon e favorito', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const favButton = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favButton);

    const favStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favStar).toHaveAttribute('src', '/star-icon.svg');
    expect(favStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
