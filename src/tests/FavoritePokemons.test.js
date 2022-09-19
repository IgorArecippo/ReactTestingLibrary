import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../pages';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const noFavorites = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const botaoFavorito = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(botaoFavorito);
    const noFavorites = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();

    const homeButton = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeButton);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);
    const favoritar = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoritar);

    userEvent.click(botaoFavorito);
    expect(noFavorites).not.toBeInTheDocument();
  });
});
