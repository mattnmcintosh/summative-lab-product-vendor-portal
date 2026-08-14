import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDeleteDoor } from './useDeleteDoor';

describe('useDeleteDoor custom hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('sends a DELETE request with the door ID', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
    });

    const { result } = renderHook(() => useDeleteDoor());

    let deletedId;
    await act(async () => {
      deletedId = await result.current.deleteDoor(5);
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/doors/5', {
      method: 'DELETE',
    });
    expect(deletedId).toBe(5);
  });
});