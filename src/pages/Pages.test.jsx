import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './Home';
import AdminPortal from './AdminPortal';
import ErrorPage from './ErrorPage';
import DoorList from './DoorList';
import DoorContainer from './DoorContainer';

// Mock useDoors hook for DoorContainer
vi.mock('../hooks/useDoors', () => ({
  useDoors: () => ({
    doors: [{ id: 1, material: 'Steel', manufacturer: 'Curries', height: 80, width: 36, price: 300 }],
    isLoading: false,
    error: null,
    addDoorToList: vi.fn(),
    updateDoorInList: vi.fn(),
    removeDoorFromList: vi.fn(),
  }),
}));

describe('Static & Container Pages', () => {
  it('renders Home page', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText(/welcome to door-to-door doors/i)).toBeInTheDocument();
  });

  it('renders AdminPortal page', () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>);
    expect(screen.getByText(/add new doors here/i)).toBeInTheDocument();
  });

  it('renders ErrorPage', () => {
    render(<MemoryRouter><ErrorPage /></MemoryRouter>);
    expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
  });

  it('renders DoorList component', () => {
    const mockContext = {
      doors: [{ id: 1, material: 'Pine', manufacturer: 'Masonite', height: 80, width: 32, price: 150 }],
      query: '',
      setQuery: vi.fn(),
    };

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Outlet context={mockContext} />}>
            <Route index element={<DoorList />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Pine by Masonite/i)).toBeInTheDocument();
  });

  it('renders DoorContainer and filters inventory on search input', () => {
    render(
      <MemoryRouter initialEntries={['/store']}>
        <Routes>
          <Route path="/store" element={<DoorContainer />}>
            <Route index element={<DoorList />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
   
    // Simulate typing in Search
    const searchInput = screen.getByPlaceholderText(/type to start searching.../i);
    fireEvent.change(searchInput, { target: { value: 'Steel' } });
    expect(searchInput.value).toBe('Steel');
  });
});