import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import Login from './Login';
import { createMemoryHistory } from 'history';

describe('Login', () => {
    // fit('renders login form and handles successful login', async () => {

    //     (global as any).fetch = jest.fn().mockResolvedValue({
    //         status: 200,
    //         ok: true,
    //         json: async () => ({ access_token: 'mockAccessToken' }),
    //     });
    //     const navigateMock = jest.fn();

    //     render(
    //         <MemoryRouter>
    //             <Login navigate={navigateMock} />
    //         </MemoryRouter>
    //     );

    //     const emailInput = screen.getByLabelText('Email:');
    //     const passwordInput = screen.getByLabelText('Password:');
    //     const loginButton = screen.getByText('Login');

    //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    //     fireEvent.change(passwordInput, { target: { value: 'password123' } });

    //     fireEvent.click(loginButton);

    //     await waitFor(() => {
    //         expect(navigateMock).toHaveBeenCalledWith('/services'); 
    //     });
    // });

    it('handles login failure', async () => {

        (global as any).fetch = jest.fn().mockResolvedValue({
            status: 401,
            ok: false,
            json: async () => ({ message: 'Invalid credentials' }),
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );


        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');
        const loginButton = screen.getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});
