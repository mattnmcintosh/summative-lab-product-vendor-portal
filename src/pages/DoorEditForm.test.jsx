import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import DoorEditForm from './DoorEditForm';

const mockUpdateDoorInList = vi.fn();
const mockDoors = [
  { id: 1, material: 'Oak', manufacturer: 'JELD-WEN', height: 80, width: 36, price: 400 },
];

vi.mock('../hooks/usePatchDoor', () => ({
  usePatchDoor: () => ({
    patchDoor: vi.fn().mockResolvedValue({ id: 1, material: 'Oak', manufacturer: 'JELD-WEN', height: 80, width: 36, price: 450 }),
    isUpdating: false,
    error: null,
  }),
}));

describe('DoorEditForm Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('pre-populates form from context and updates on submit', async () => {
    render(
      <MemoryRouter initialEntries={['/store/1/edit']}>
        <Routes>
          <Route path="/store" element={<Outlet context={{ doors: mockDoors, updateDoorInList: mockUpdateDoorInList }} />}>
            <Route path=":id/edit" element={<DoorEditForm />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Verify inputs pre-populate
    const materialInput = screen.getByPlaceholderText(/material/i);
    expect(materialInput.value).toBe('Oak');

    // Change price and submit
    const priceInput = screen.getByPlaceholderText(/price/i);
    fireEvent.change(priceInput, { target: { value: '450' } });

    const submitBtn = screen.getByRole('button', { name: /save changes/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateDoorInList).toHaveBeenCalled();
    });
  });

  it('cancels edit and navigates away', () => {
    render(
      <MemoryRouter initialEntries={['/store/1/edit']}>
        <Routes>
          <Route path="/store" element={<Outlet context={{ doors: mockDoors, updateDoorInList: mockUpdateDoorInList }} />}>
            <Route path=":id/edit" element={<DoorEditForm />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);
  });
});