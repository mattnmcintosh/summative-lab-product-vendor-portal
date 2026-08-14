    import NavBar from "../components/NavBar";
    import Search from "../components/Search";
    import { Outlet } from 'react-router-dom';
    import { useEffect, useState } from 'react';

    function DoorContainer() {

        const [doors, setDoors] = useState([]);

        useEffect(() => {
            fetch("http://localhost:4000/doors")
                .then(r => {
                    if (!r.ok) { throw new Error("failed to fetch doors") }
                    return r.json()
                })
                .then(setDoors)
                .catch(console.log)
        }, [])

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

    /*
    import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const DirectorContainer = () => {
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/directors")
        .then(r => {
            if (!r.ok) { throw new Error("failed to fetch directors") }
            return r.json()
        })
        .then(setDirectors)
        .catch(console.log)
    }, [])

    function handleAddMovie(updatedDirector) {
        setDirectors((prev) =>
            prev.map((d) => (d.id === updatedDirector.id ? updatedDirector : d))
        );
    }

    function handleAddDirector(newDirector) {
        setDirectors((prev) => [...prev, newDirector]);
  }

    return (
        <>
            <NavBar />
            <main>
                <h1>Welcome to the Director's Directory!</h1>
                <Outlet context={{ directors, onAddMovie: handleAddMovie, onAddDirector: handleAddDirector }}/>
            </main>
        </>
    );
}

export default DirectorContainer;

*/