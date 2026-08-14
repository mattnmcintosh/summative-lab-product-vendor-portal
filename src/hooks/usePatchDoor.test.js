import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePatchDoor } from './usePatchDoor';

describe('usePatchDoor custom hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('sends a PATCH request and returns the updated door object', async () => {
    const updatedPayload = { price: 420.00 };
    const returnedDoor = { id: 1, material: 'Oak', manufacturer: 'JELD-WEN', height: 80, width: 36, price: 420.00 };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => returnedDoor,
    });

    const { result } = renderHook(() => usePatchDoor());

    let response;
    await act(async () => {
      response = await result.current.patchDoor(1, updatedPayload);
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/doors/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayload),
    });

    expect(response).toEqual(returnedDoor);
  });
});