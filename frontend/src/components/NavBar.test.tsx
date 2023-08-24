import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const linkElement = screen.getByText('Subscriptions Services');
    expect(linkElement).toBeInTheDocument();
  });

  it('logs out when the logout button is clicked', () => {
    // Mock localStorage
    const mockRemoveItem = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        removeItem: mockRemoveItem,
      },
      writable: true,
    });

    // Mock useNavigate
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toHaveClass('logout-btn');
    fireEvent.click(logoutButton);

    expect(mockRemoveItem).toHaveBeenCalledWith('token'); 
  });
});
