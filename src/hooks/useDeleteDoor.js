import { useState } from "react";

export function useDeleteDoor() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteDoor = async (id) => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/doors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete door with ID ${id}.`);
      }

      setIsDeleting(false);
      return id; // Return ID so you know which door was deleted locally
    } catch (err) {
      setError(err.message);
      setIsDeleting(false);
      throw err;
    }
  };

  return { deleteDoor, isDeleting, error };
}