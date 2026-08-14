import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock API call in useDoors so App mounts smoothly
vi.mock('./hooks/useDoors', () => ({
  useDoors: () => ({
    doors: [],
    isLoading: false,
    error: null,
    addDoorToList: vi.fn(),
    updateDoorInList: vi.fn(),
    removeDoorFromList: vi.fn(),
  }),
}));

describe('App Component', () => {
  it('renders the main app without crashing', () => {
    render(<App />);
    expect(screen.getByText(/welcome to door-to-door doors/i)).toBeInTheDocument();
  });
});