    import NavBar from "../components/NavBar";
    import Search from "../components/Search";
    import { Outlet } from 'react-router-dom';

    function DoorContainer() {
        return (
            <>
            <NavBar />
            <main>
                <h1>Here is our current inventory</h1>
                <Search />
                <Outlet />
            </main>
            </>
        )
    }

    export default DoorContainer;