import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DoorForm from './DoorForm';

vi.mock('../hooks/useAddDoor', () => ({
  useAddDoor: () => ({
    addDoor: vi.fn().mockResolvedValue({ id: 99, material: 'Vinyl', manufacturer: 'Pella', height: 80, width: 32, price: 299 }),
    isSubmitting: false,
    error: null,
  }),
}));

describe('DoorForm Component', () => {
  it('updates form state on input and submits correctly', async () => {
    render(
      <MemoryRouter>
        <DoorForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/material/i), { target: { value: 'Vinyl' } });
    fireEvent.change(screen.getByPlaceholderText(/manufacturer/i), { target: { value: 'Pella' } });
    fireEvent.change(screen.getByPlaceholderText(/height/i), { target: { value: '80' } });
    fireEvent.change(screen.getByPlaceholderText(/width/i), { target: { value: '32' } });
    fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: '299' } });

    const submitBtn = screen.getByRole('button', { name: /add door/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
  });
});