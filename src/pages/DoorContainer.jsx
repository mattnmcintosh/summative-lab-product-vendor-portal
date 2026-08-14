    import NavBar from "../components/NavBar";
    import { Outlet } from 'react-router-dom';
    import { useState } from 'react';
    import { useDoors } from "../hooks/useDoors";

    function DoorContainer() {

        const { doors, isLoading, error, addDoorToList, updateDoorInList, removeDoorFromList } = useDoors();
        const [query, setQuery] = useState("");

        const filteredDoors = doors.filter((door) => {
            const term = query.toLowerCase();
            const materialMatch = door.material.toLowerCase().includes(term);
            const manufacturerMatch = door.manufacturer.toLowerCase().includes(term);
            return materialMatch || manufacturerMatch;
        })

        if (isLoading) return <h2>Loading doors...</h2>;
        if (error) return <h2>Error: {error}</h2>;

        return (
            <>
            <NavBar />
            <main>
                <Outlet context={{ doors: filteredDoors, query, setQuery, addDoorToList, updateDoorInList, removeDoorFromList }} />
            </main>
            </>
        )
    }

    export default DoorContainer;