import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import SubscriptionPackages from './SubscriptionPackages';

describe('SubscriptionPackages', () => {
  it('renders subscription packages', async () => {
    const mockPackages = [
      { _id: '1', name: 'Package 1', description: 'Description 1', subscribes: [] },
      { _id: '2', name: 'Package 2', description: 'Description 2', subscribes: [] },
    ];
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPackages,
    });

    render(
      <MemoryRouter> { }
        <SubscriptionPackages showToast={() => { }} />
      </MemoryRouter>
    );

    const package1 = await screen.findByText('Package 1');
    const package2 = await screen.findByText('Package 2');

    expect(package1).toBeInTheDocument();
    expect(package2).toBeInTheDocument();
  });

  it('handles subscription button click', async () => {
    const mockPackages = [
      { _id: '1', name: 'Package 1', description: 'Description 1', subscribes: [] },
    ];

    (global as any).fetch = jest.fn().mockResolvedValue({
      status: 201,
      ok: true,
      json: async () => mockPackages,
    });

    const showToastMock = jest.fn();
    render(
      <MemoryRouter> {}
        <SubscriptionPackages showToast={showToastMock} />
      </MemoryRouter>
    );

    const subscribeButton = await screen.findByText('Subscribe');
    fireEvent.click(subscribeButton);

    await waitFor(() => {
      expect(showToastMock).toHaveBeenCalledWith({ type: 'success', message: 'Subscribed successfully' });
    });
  });

  it('handles unsubscription button click', async () => {
    const mockPackages = [
      {
        _id: '1', name: 'Package 1', description: 'Description 1', subscribes: [
          {
            action: "SUBSCRIBED",
            serviceId: "64e6d8c763ff4d01b825713e",
            userId: "64e39d915288517d3975f802",
            _id: "64e6f9c68bb50b5c23d3719f",
          }
        ]
      },
    ];

    (global as any).fetch = jest.fn().mockResolvedValue({
      status: 201,
      ok: true,
      json: async () => mockPackages,
    });

    const showToastMock = jest.fn();
    render(
      <MemoryRouter> {}
        <SubscriptionPackages showToast={showToastMock} />
      </MemoryRouter>
    );

    const subscribeButton = await screen.findByText('Unsubscribe');
    fireEvent.click(subscribeButton); 

    await waitFor(() => {
      expect(showToastMock).toHaveBeenCalledWith({ type: 'success', message: 'Unsubscribed successfully' });
    });
  });

});
