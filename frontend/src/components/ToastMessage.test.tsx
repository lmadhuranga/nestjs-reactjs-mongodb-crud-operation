import React from 'react';
import { render, screen } from '@testing-library/react';
import ToastMessage from './ToastMessage';

describe('ToastMessage', () => {
  it('renders success message', () => {
    render(<ToastMessage type="success" message="Success message" />);

    const toastElement = screen.getByText('Success message');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveClass('bg-green-500');
  });

  it('renders error message', () => {
    render(<ToastMessage type="error" message="Error message" />);

    const toastElement = screen.getByText('Error message');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveClass('bg-red-500');
  });
});
