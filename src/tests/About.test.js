import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testa o componente About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const text1 = screen
      .getByText(/this application simulates a pokédex, a digital encyclopedia contain/i);
    const text2 = screen
      .getByText(/one can filter pokémons by type, and see more details for each one o/i);
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
