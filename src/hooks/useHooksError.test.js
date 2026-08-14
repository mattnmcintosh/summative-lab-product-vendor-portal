import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAddDoor } from './useAddDoor';
import { useDeleteDoor } from './useDeleteDoor';
import { usePatchDoor } from './usePatchDoor';

describe('Custom Hooks Error Branches', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('useAddDoor handles API failure (!response.ok and fetch catch)', async () => {
    // 1. Test !response.ok branch
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    const { result } = renderHook(() => useAddDoor());

    await act(async () => {
      await expect(result.current.addDoor({})).rejects.toThrow('Failed to add new door.');
    });

    expect(result.current.error).toBe('Failed to add new door.');

    // 2. Test Network Catch branch
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await act(async () => {
      await expect(result.current.addDoor({})).rejects.toThrow('Network error');
    });

    expect(result.current.error).toBe('Network error');
  });

  it('useDeleteDoor handles API failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    const { result } = renderHook(() => useDeleteDoor());

    await act(async () => {
      await expect(result.current.deleteDoor(1)).rejects.toThrow('Failed to delete door with ID 1.');
    });

    expect(result.current.error).toBe('Failed to delete door with ID 1.');
  });

  it('usePatchDoor handles API failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    const { result } = renderHook(() => usePatchDoor());

    await act(async () => {
      await expect(result.current.patchDoor(1, {})).rejects.toThrow('Failed to update door with ID 1.');
    });

    expect(result.current.error).toBe('Failed to update door with ID 1.');
  });
});