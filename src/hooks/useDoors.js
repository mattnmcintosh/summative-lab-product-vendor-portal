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

  const addDoorToList = (newDoor) => {
    setDoors((prev) => [...prev, newDoor]);
  };

  const updateDoorInList = (updatedDoor) => {
    setDoors((prev) =>
      prev.map((door) => (door.id === updatedDoor.id ? updatedDoor : door))
    );
  };

  const removeDoorFromList = (id) => {
    setDoors((prev) => prev.filter((door) => door.id !== id));
  };

  return { doors, isLoading, error, addDoorToList, updateDoorInList, removeDoorFromList };
}