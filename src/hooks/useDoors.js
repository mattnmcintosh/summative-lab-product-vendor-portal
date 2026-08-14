import { useState, useEffect } from "react";

export function useDoors() {
  
  const [doors, setDoors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/doors")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch doors.");
        return r.json();
      })
      .then((data) => {
        setDoors(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Helper function to append a new door locally after POST
  const addDoorToList = (newDoor) => {
    setDoors((prev) => [...prev, newDoor]);
  };

  return { doors, isLoading, error };
}