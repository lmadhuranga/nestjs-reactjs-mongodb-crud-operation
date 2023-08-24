import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { act } from 'react-dom/test-utils';

describe('Login', () => {
    it('displays error message when submitting with empty fields', async () => {
        const { getByText } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const loginButton = getByText('Login');
        fireEvent.click(loginButton);

        await waitFor(() => {
            const errorMessage = getByText('Please fill in all fields.');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('displays error message when login fails', async () => {

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ message: 'Login failed' }),
        });

        const { getByText, getByLabelText } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const emailInput = getByLabelText('Email:');
        const passwordInput = getByLabelText('Password:');
        const loginButton = getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            const errorMessage = getByText('Login failed');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('navigates to /services after successful login', async () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        const mockSetItem = jest.spyOn(window.localStorage.__proto__, 'setItem');

        render(
            <MemoryRouter> { }
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Login'));


        expect(mockSetItem).toHaveBeenCalledWith('token', 'fakeToken');
        expect(mockNavigate).toHaveBeenCalledWith('/services');
    });
});
