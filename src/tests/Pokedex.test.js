import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Testa o botão de próximo pokémon', () => {
    renderWithRouter(<App />);
    const currentPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    const nextPokeminBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(currentPokemon).toBeInTheDocument();
    expect(nextPokeminBtn).toBeInTheDocument();

    userEvent.click(nextPokeminBtn);

    const pokemon = screen.queryByRole('img', { name: /pikachu sprite/i });
    expect(pokemon).toBeNull();
  });

  it('Testa se o botão de próximo próximo pokémon volta ao início', () => {
    renderWithRouter(<App />);
    const nextPokeminBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(nextPokeminBtn);
    userEvent.click(nextPokeminBtn);
    userEvent.click(nextPokeminBtn);
    userEvent.click(nextPokeminBtn);
    userEvent.click(nextPokeminBtn);
    userEvent.click(nextPokeminBtn);
    userEvent.click(nextPokeminBtn);
    userEvent.click(nextPokeminBtn);
    userEvent.click(nextPokeminBtn);
    const pokemon = screen.queryByRole('img', { name: /pikachu sprite/i });
    expect(pokemon).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokename = screen.getByTestId('pokemon-name');
    const charmander = screen.queryByRole('img', { name: /charmander sprite/i });
    expect(pokename).toBeInTheDocument();
    expect(charmander).not.toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const botao = screen.getAllByTestId('pokemon-type-button');
    expect(botao).toBeDefined();
    const pikapika = screen.queryByText(/pikachu/i);
    expect(pikapika).toBeDefined();

    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);

    const pikachu = screen.queryByText(/pikachu/i);
    expect(pikachu).not.toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/fire$/i);

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);
    expect(allButton).toBeVisible();
  });
});
