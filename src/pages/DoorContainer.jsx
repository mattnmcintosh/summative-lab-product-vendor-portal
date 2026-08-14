    import NavBar from "../components/NavBar";
    import Search from "../components/Search";
    import { Outlet } from 'react-router-dom';
    import { useEffect, useState } from 'react';
    import { useDoors } from "../hooks/useDoors";

    function DoorContainer() {

        const { doors, isLoading, error } = useDoors();

        if (isLoading) return <h2>Loading doors...</h2>;
        if (error) return <h2>Error: {error}</h2>;

        return (
            <>
            <NavBar />
            <main>
                <h1>Here is our current inventory</h1>
                <Search />
                <Outlet context={{doors}} />
            </main>
            </>
        )
    }

    export default DoorContainer;