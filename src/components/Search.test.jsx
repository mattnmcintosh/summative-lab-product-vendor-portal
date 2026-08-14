import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Search from './Search';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useRef: () => ({ current: null }), // Force ref.current to be null
  };
});

describe('Search Component', () => {
  it('auto-focuses the input on mount using useRef and calls onSearchChange on typing', () => {
    const handleSearchChange = vi.fn();

    render(<Search query="Pine" onSearchChange={handleSearchChange} />);

    const input = screen.getByPlaceholderText(/type to start searching.../i);

    // Verify useRef auto-focus
    expect(input).toHaveFocus();
    expect(input.value).toBe('Pine');

    // Verify typing triggers change event
    fireEvent.change(input, { target: { value: 'Oak' } });
    expect(handleSearchChange).toHaveBeenCalledWith('Oak');
  });
});

describe('Search Branch Coverage', () => {
  it('handles null ref safely on mount', () => {
    render(<Search query="" onSearchChange={vi.fn()} />);
    
    const input = screen.getByPlaceholderText(/type to start searching.../i);
    expect(input).toBeInTheDocument();
  });
});