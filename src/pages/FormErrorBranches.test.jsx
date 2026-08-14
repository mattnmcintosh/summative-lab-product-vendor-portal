import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import DoorCard from './DoorCard';
import DoorForm from './DoorForm';
import DoorEditForm from './DoorEditForm';

// Mocks to trigger catch blocks
const mockDeleteFail = vi.fn().mockRejectedValue(new Error('Delete error'));
const mockAddFail = vi.fn().mockRejectedValue(new Error('Add error'));
const mockPatchFail = vi.fn().mockRejectedValue(new Error('Patch error'));

vi.mock('../hooks/useDeleteDoor', () => ({
  useDeleteDoor: () => ({ deleteDoor: mockDeleteFail, isDeleting: false, error: 'Delete error' }),
}));

vi.mock('../hooks/useAddDoor', () => ({
  useAddDoor: () => ({ addDoor: mockAddFail, isSubmitting: false, error: 'Add error' }),
}));

vi.mock('../hooks/usePatchDoor', () => ({
  usePatchDoor: () => ({ patchDoor: mockPatchFail, isUpdating: false, error: 'Patch error' }),
}));

describe('Form and Card Error Catch Branches', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error during expected errors
  });

  it('DoorCard handles catch block when delete fails', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const mockDoor = { id: 1, material: 'Oak', manufacturer: 'JELD-WEN', height: 80, width: 36, price: 400 };

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Outlet context={{ removeDoorFromList: vi.fn() }} />}>
            <Route index element={<DoorCard door={mockDoor} />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /delete door/i }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Delete failed:', expect.any(Error));
    });
  });

  it('DoorForm handles catch block on submit error', async () => {
    render(
      <MemoryRouter>
        <DoorForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/material/i), { target: { value: 'Oak' } });
    fireEvent.change(screen.getByPlaceholderText(/manufacturer/i), { target: { value: 'JELD-WEN' } });
    fireEvent.change(screen.getByPlaceholderText(/height/i), { target: { value: '80' } });
    fireEvent.change(screen.getByPlaceholderText(/width/i), { target: { value: '36' } });
    fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: '400' } });

    fireEvent.click(screen.getByRole('button', { name: /add door/i }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  it('DoorEditForm handles catch block on patch submit error', async () => {
    const mockDoors = [{ id: 1, material: 'Oak', manufacturer: 'JELD-WEN', height: 80, width: 36, price: 400 }];

    render(
      <MemoryRouter initialEntries={['/store/1/edit']}>
        <Routes>
          <Route path="/store" element={<Outlet context={{ doors: mockDoors, updateDoorInList: vi.fn() }} />}>
            <Route path=":id/edit" element={<DoorEditForm />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Failed to patch door:', expect.any(Error));
    });
  });
});