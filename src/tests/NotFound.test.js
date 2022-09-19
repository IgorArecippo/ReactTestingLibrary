import { render, screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages';

describe('Testa o componente <NotFound.js />', () => {
  it('Testa o heading da página', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  it('Testa a imagem', () => {
    render(<NotFound />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
