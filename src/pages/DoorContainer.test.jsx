import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DoorContainer from './DoorContainer';
import * as useDoorsModule from '../hooks/useDoors';

describe('DoorContainer Conditional Branches', () => {
  it('renders loading state when isLoading is true', () => {
    vi.spyOn(useDoorsModule, 'useDoors').mockReturnValue({
      doors: [],
      isLoading: true,
      error: null,
      addDoorToList: vi.fn(),
      updateDoorInList: vi.fn(),
      removeDoorFromList: vi.fn(),
    });

    render(
      <MemoryRouter>
        <DoorContainer />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading doors.../i)).toBeInTheDocument();
  });

  it('renders error message when error state exists', () => {
    vi.spyOn(useDoorsModule, 'useDoors').mockReturnValue({
      doors: [],
      isLoading: false,
      error: 'Failed to fetch doors',
      addDoorToList: vi.fn(),
      updateDoorInList: vi.fn(),
      removeDoorFromList: vi.fn(),
    });

    render(
      <MemoryRouter>
        <DoorContainer />
      </MemoryRouter>
    );

    expect(screen.getByText(/error: failed to fetch doors/i)).toBeInTheDocument();
  });
});