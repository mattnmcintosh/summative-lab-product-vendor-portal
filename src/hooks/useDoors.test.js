import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDoors } from './useDoors';

describe('useDoors custom hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches doors successfully on mount', async () => {
    const mockDoors = [
      { id: 1, material: 'Oak', manufacturer: 'JELD-WEN', height: 80, width: 36, price: 400 },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockDoors,
    });

    const { result } = renderHook(() => useDoors());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.doors).toEqual(mockDoors);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch failure gracefully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useDoors());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch doors.');
  });

  it('adds, updates, and removes doors locally in state', async () => {
    const initialDoors = [
      { id: 1, material: 'Pine', manufacturer: 'Masonite', height: 80, width: 32, price: 150 },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => initialDoors,
    });

    const { result } = renderHook(() => useDoors());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Test addDoorToList
    const newDoor = { id: 2, material: 'Steel', manufacturer: 'Curries', height: 84, width: 36, price: 500 };
    act(() => {
      result.current.addDoorToList(newDoor);
    });
    expect(result.current.doors).toHaveLength(2);

    // Test updateDoorInList
    const updatedDoor = { id: 1, material: 'Pine (Painted)', manufacturer: 'Masonite', height: 80, width: 32, price: 175 };
    act(() => {
      result.current.updateDoorInList(updatedDoor);
    });
    expect(result.current.doors.find((d) => d.id === 1).material).toBe('Pine (Painted)');

    // Test removeDoorFromList
    act(() => {
      result.current.removeDoorFromList(2);
    });
    expect(result.current.doors).toHaveLength(1);
    expect(result.current.doors.find((d) => d.id === 2)).toBeUndefined();
  });
});