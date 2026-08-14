import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAddDoor } from './useAddDoor';

describe('useAddDoor custom hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('submits a POST request and returns the created door', async () => {
    const doorPayload = { material: 'Fiberglass', manufacturer: 'Therma-Tru', height: 80, width: 36, price: 650 };
    const createdDoor = { id: 10, ...doorPayload };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => createdDoor,
    });

    const { result } = renderHook(() => useAddDoor());

    let response;
    await act(async () => {
      response = await result.current.addDoor(doorPayload);
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/doors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doorPayload),
    });

    expect(response).toEqual(createdDoor);
    expect(result.current.isSubmitting).toBe(false);
  });
});