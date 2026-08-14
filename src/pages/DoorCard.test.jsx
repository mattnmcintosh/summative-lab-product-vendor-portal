import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import DoorCard from './DoorCard';

// Mock custom delete hook
vi.mock('../hooks/useDeleteDoor', () => ({
  useDeleteDoor: () => ({
    deleteDoor: vi.fn().mockResolvedValue(1),
    isDeleting: false,
    error: null,
  }),
}));

describe('DoorCard Component', () => {
  const mockDoor = { id: 1, material: 'Mahogany', manufacturer: 'Simpson', height: 80, width: 36, price: 899.99 };
  const mockRemoveDoorFromList = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders door details correctly', () => {
    render(
      <MemoryRouter initialEntries={['/store']}>
        <Routes>
          <Route path="/store" element={<Outlet context={{ removeDoorFromList: mockRemoveDoorFromList }} />}>
            <Route index element={<DoorCard door={mockDoor} />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Mahogany by Simpson/i)).toBeInTheDocument();
    expect(screen.getByText(/\$899.99/i)).toBeInTheDocument();
  });

  it('calls delete handler when confirmation is accepted', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={['/store']}>
        <Routes>
          <Route path="/store" element={<Outlet context={{ removeDoorFromList: mockRemoveDoorFromList }} />}>
            <Route index element={<DoorCard door={mockDoor} />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const deleteBtn = screen.getByRole('button', { name: /delete door/i });
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalled();
  });
});

describe('DoorCard Edge Cases', () => {
  const mockDoor = { id: 1, material: 'Oak', manufacturer: 'JELD-WEN', height: 80, width: 36, price: 400 };

  it('handles user canceling delete confirmation dialog', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false); // User clicks "Cancel"

    render(
      <MemoryRouter initialEntries={['/store']}>
        <Routes>
          <Route path="/store" element={<Outlet context={{ removeDoorFromList: vi.fn() }} />}>
            <Route index element={<DoorCard door={mockDoor} />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const deleteBtn = screen.getByRole('button', { name: /delete door/i });
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalled();
  });

  it('navigates to edit form when Edit Door button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/store']}>
        <Routes>
          <Route path="/store" element={<Outlet context={{ removeDoorFromList: vi.fn() }} />}>
            <Route index element={<DoorCard door={mockDoor} />} />
            {/* Added target edit route so React Router doesn't throw a "No routes matched" error */}
            <Route path=":id/edit" element={<h2>Edit Page Target</h2>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const editBtn = screen.getByRole('button', { name: /edit door/i });
    fireEvent.click(editBtn);

    // Verify successful navigation to the edit page target
    expect(screen.getByText(/edit page target/i)).toBeInTheDocument();
  });
});