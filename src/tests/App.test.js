import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App', () => {
  it('Testa se a apicação é redirecionada ao clicar no botão Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se a aplicação é redirecionada ao clicar no botão About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(aboutLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada ao clicar no botão Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(favoriteLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');

    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se a aplicação é redirecionada à página de Not Found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/cwecwecwec');
    });

    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});
