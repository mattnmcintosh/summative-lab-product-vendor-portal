import { useState } from "react";

export function useAddDoor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const addDoor = async (doorData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/doors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doorData),
      });

      if (!response.ok) {
        throw new Error("Failed to add new door.");
      }

      const newDoor = await response.json();
      setIsSubmitting(false);
      return newDoor;
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
      throw err;
    }
  };

  return { addDoor, isSubmitting, error };
}