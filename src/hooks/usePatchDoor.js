import { useState } from "react";

export function usePatchDoor() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const patchDoor = async (id, updatedFields) => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/doors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error(`Failed to update door with ID ${id}.`);
      }

      const updatedDoor = await response.json();
      setIsUpdating(false);
      return updatedDoor;
    } catch (err) {
      setError(err.message);
      setIsUpdating(false);
      throw err;
    }
  };

  return { patchDoor, isUpdating, error };
}