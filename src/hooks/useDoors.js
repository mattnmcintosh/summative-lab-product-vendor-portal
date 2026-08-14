import { useState, useEffect } from "react";

export function useDoors() {
  
  const [doors, setDoors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/doors")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch doors.");
        return r.json();
      })
      .then((data) => {
        setDoors(data);
      })
      .catch((err) => {
        setError(err.message);
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

  return { doors, error, addDoorToList, updateDoorInList, removeDoorFromList };
}